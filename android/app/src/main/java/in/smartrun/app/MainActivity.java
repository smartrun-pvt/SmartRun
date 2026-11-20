package in.smartrun.app;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ApplicationInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import androidx.lifecycle.Lifecycle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebViewClient;
import com.google.android.gms.auth.api.phone.SmsRetriever;
import com.google.android.gms.common.api.CommonStatusCodes;
import com.google.android.gms.common.api.Status;
import com.google.firebase.auth.FirebaseAuth;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.json.JSONObject;

public class MainActivity extends BridgeActivity {
    private volatile int latestTopDp = 0;
    private volatile int latestBottomDp = 0;
    private volatile int latestLeftDp = 0;
    private volatile int latestRightDp = 0;
    private volatile boolean hasMeasuredInsets = false;
    private boolean isSmsConsentReceiverRegistered = false;
    private Intent pendingConsentIntent = null;
    private String pendingSmsOtpMessage = null;
    private boolean isLaunchingSmsConsent = false;
    private volatile boolean isActivityResumed = false;

    private static final Pattern OTP_HASH_PATTERN = Pattern.compile("#(\\d{6})\\b");
    private static final Pattern OTP_KEYWORD_PATTERN =
        Pattern.compile("\\b(?:otp|code|pin|passcode)\\s*(?:is|:|-)?\\s*(\\d{6})\\b", Pattern.CASE_INSENSITIVE);
    private static final Pattern OTP_GOOGLE_PATTERN =
        Pattern.compile("\\bG-(\\d{6})\\b", Pattern.CASE_INSENSITIVE);
    private static final Pattern OTP_ISOLATED_PATTERN =
        Pattern.compile("(?:^|[^\\d])(\\d{6})(?:[^\\d]|$)");
    private static final Pattern OTP_SPLIT_PATTERN =
        Pattern.compile("(?:^|[^\\d])(\\d{3})[\\s-](\\d{3})(?:[^\\d]|$)");

    private final ActivityResultLauncher<Intent> smsConsentLauncher =
        registerForActivityResult(new ActivityResultContracts.StartActivityForResult(), result -> {
            isLaunchingSmsConsent = false;
            pendingConsentIntent = null;
            unregisterSmsConsentReceiver();
            try {
                if (result != null && result.getResultCode() == Activity.RESULT_OK && result.getData() != null) {
                    String message = result.getData().getStringExtra(SmsRetriever.EXTRA_SMS_MESSAGE);
                    if (message != null && !message.isEmpty()) {
                        // ActivityResult callbacks run BEFORE onResume() finishes on Android.
                        // Defer dispatching to WebView until MainActivity is fully resumed so
                        // Android AutofillManager / InputMethodManager transitions never crash WebView.
                        if (isActivityResumed && getLifecycle().getCurrentState().isAtLeast(Lifecycle.State.RESUMED)) {
                            dispatchSmsOtpToWebView(message);
                        } else {
                            pendingSmsOtpMessage = message;
                        }
                    }
                }
            } catch (Throwable ignored) {}
        });

    private final BroadcastReceiver smsConsentReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            try {
                if (intent == null || !SmsRetriever.SMS_RETRIEVED_ACTION.equals(intent.getAction())) {
                    return;
                }
                Bundle extras = intent.getExtras();
                if (extras == null) {
                    return;
                }
                Status smsRetrieverStatus = getStatusFromExtras(extras);
                if (smsRetrieverStatus == null) {
                    return;
                }
                switch (smsRetrieverStatus.getStatusCode()) {
                    case CommonStatusCodes.SUCCESS:
                        Intent consentIntent = getConsentIntentFromExtras(extras);
                        if (consentIntent != null) {
                            launchConsentIntentSafely(consentIntent);
                        } else {
                            unregisterSmsConsentReceiver();
                        }
                        break;
                    case CommonStatusCodes.TIMEOUT:
                        unregisterSmsConsentReceiver();
                        break;
                    default:
                        break;
                }
            } catch (Throwable ignored) {
                unregisterSmsConsentReceiver();
            }
        }
    };

    public class SmartRunInsetsBridge {
        @JavascriptInterface
        public int getTopDp() {
            return latestTopDp;
        }

        @JavascriptInterface
        public int getBottomDp() {
            return latestBottomDp;
        }

        @JavascriptInterface
        public int getLeftDp() {
            return latestLeftDp;
        }

        @JavascriptInterface
        public int getRightDp() {
            return latestRightDp;
        }

        @JavascriptInterface
        public boolean isReady() {
            return hasMeasuredInsets;
        }
    }

    public class SmartRunOtpBridge {
        private static final String PREFS_NAME = "smartrun_phone_auth";
        private static final String KEY_VERIFICATION_ID = "verification_id";
        private static final String KEY_PHONE_NUMBER = "phone_number";
        private static final String KEY_TIMESTAMP = "timestamp";
        private static final long MAX_AGE_MS = 10L * 60L * 1000L; // 10 minutes

        @JavascriptInterface
        public void startListening() {
            runOnUiThread(MainActivity.this::startSmsUserConsentListener);
        }

        @JavascriptInterface
        public void stopListening() {
            runOnUiThread(() -> {
                pendingSmsOtpMessage = null;
                unregisterSmsConsentReceiver();
            });
        }

        @JavascriptInterface
        public boolean isSupported() {
            return true;
        }

        @JavascriptInterface
        @NonNull
        public String getPendingVerification() {
            try {
                android.content.SharedPreferences prefs =
                    getApplicationContext().getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
                String verificationId = prefs.getString(KEY_VERIFICATION_ID, null);
                String phoneNumber = prefs.getString(KEY_PHONE_NUMBER, null);
                long timestamp = prefs.getLong(KEY_TIMESTAMP, 0L);
                if (verificationId == null || verificationId.isEmpty() || timestamp <= 0L) {
                    return "";
                }
                if (System.currentTimeMillis() - timestamp > MAX_AGE_MS) {
                    prefs.edit().clear().apply();
                    return "";
                }
                JSONObject json = new JSONObject();
                json.put("verificationId", verificationId);
                json.put("phone", phoneNumber != null ? phoneNumber : "");
                json.put("timestamp", timestamp);
                return json.toString();
            } catch (Throwable ignored) {
                return "";
            }
        }

        @JavascriptInterface
        public void clearPendingVerification() {
            try {
                getApplicationContext()
                    .getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
                    .edit()
                    .clear()
                    .apply();
            } catch (Throwable ignored) {}
        }
    }

    @SuppressWarnings("deprecation")
    private Status getStatusFromExtras(Bundle extras) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                return extras.getParcelable(SmsRetriever.EXTRA_STATUS, Status.class);
            }
            return extras.getParcelable(SmsRetriever.EXTRA_STATUS);
        } catch (Throwable ignored) {
            return null;
        }
    }

    @SuppressWarnings("deprecation")
    private Intent getConsentIntentFromExtras(Bundle extras) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                return extras.getParcelable(SmsRetriever.EXTRA_CONSENT_INTENT, Intent.class);
            }
            return extras.getParcelable(SmsRetriever.EXTRA_CONSENT_INTENT);
        } catch (Throwable ignored) {
            return null;
        }
    }

    private void launchConsentIntentSafely(Intent consentIntent) {
        if (consentIntent == null || isFinishing() || isDestroyed() || isLaunchingSmsConsent || !isSmsConsentReceiverRegistered) {
            return;
        }
        try {
            ComponentName resolved = consentIntent.resolveActivity(getPackageManager());
            if (resolved == null || !"com.google.android.gms".equals(resolved.getPackageName())) {
                unregisterSmsConsentReceiver();
                return;
            }
            // Strip FLAG_ACTIVITY_NEW_TASK so startActivityForResult delivers the SMS result back cleanly
            consentIntent.setFlags(consentIntent.getFlags() & ~Intent.FLAG_ACTIVITY_NEW_TASK);

            // On Android 14/15, never launch SMS consent while MainActivity is paused behind a Chrome Custom Tab / RecaptchaActivity
            if (isActivityResumed && getLifecycle().getCurrentState().isAtLeast(Lifecycle.State.RESUMED)) {
                isLaunchingSmsConsent = true;
                smsConsentLauncher.launch(consentIntent);
            } else {
                pendingConsentIntent = consentIntent;
            }
        } catch (ActivityNotFoundException | SecurityException | IllegalStateException ignored) {
            isLaunchingSmsConsent = false;
            pendingConsentIntent = null;
            unregisterSmsConsentReceiver();
        } catch (Throwable ignored) {
            isLaunchingSmsConsent = false;
            pendingConsentIntent = null;
            unregisterSmsConsentReceiver();
        }
    }

    private void startSmsUserConsentListener() {
        if (isFinishing() || isDestroyed()) {
            return;
        }
        pendingSmsOtpMessage = null;
        unregisterSmsConsentReceiver();
        try {
            IntentFilter intentFilter = new IntentFilter(SmsRetriever.SMS_RETRIEVED_ACTION);
            ContextCompat.registerReceiver(
                this,
                smsConsentReceiver,
                intentFilter,
                SmsRetriever.SEND_PERMISSION,
                null,
                ContextCompat.RECEIVER_EXPORTED
            );
            isSmsConsentReceiverRegistered = true;
            // Passing null listens for the next one-time OTP SMS from any sender (Firebase, Fast2SMS, etc.)
            // and opens Google Play Services' native one-tap consent bottom sheet (no READ_SMS permission).
            SmsRetriever.getClient(this).startSmsUserConsent(null);
        } catch (Throwable ignored) {
            unregisterSmsConsentReceiver();
        }
    }

    private void unregisterSmsConsentReceiver() {
        pendingConsentIntent = null;
        isLaunchingSmsConsent = false;
        if (!isSmsConsentReceiverRegistered) {
            return;
        }
        try {
            unregisterReceiver(smsConsentReceiver);
        } catch (IllegalArgumentException ignored) {
        } catch (Throwable ignored) {
        } finally {
            isSmsConsentReceiverRegistered = false;
        }
    }

    @NonNull
    private String extractSixDigitOtp(@Nullable String rawMessage) {
        if (rawMessage == null) return "";
        final String text = rawMessage.trim();
        if (text.isEmpty()) return "";

        try {
            Matcher hashMatcher = OTP_HASH_PATTERN.matcher(text);
            if (hashMatcher.find()) {
                String code = hashMatcher.group(1);
                if (code != null && !code.isEmpty()) return code;
            }

            Matcher keywordMatcher = OTP_KEYWORD_PATTERN.matcher(text);
            if (keywordMatcher.find()) {
                String code = keywordMatcher.group(1);
                if (code != null && !code.isEmpty()) return code;
            }

            Matcher googleMatcher = OTP_GOOGLE_PATTERN.matcher(text);
            if (googleMatcher.find()) {
                String code = googleMatcher.group(1);
                if (code != null && !code.isEmpty()) return code;
            }

            Matcher isolatedMatcher = OTP_ISOLATED_PATTERN.matcher(text);
            if (isolatedMatcher.find()) {
                String code = isolatedMatcher.group(1);
                if (code != null && !code.isEmpty()) return code;
            }

            Matcher splitMatcher = OTP_SPLIT_PATTERN.matcher(text);
            if (splitMatcher.find()) {
                String part1 = splitMatcher.group(1);
                String part2 = splitMatcher.group(2);
                if (part1 != null && part2 != null) return part1 + part2;
            }
        } catch (Throwable ignored) {}

        return "";
    }

    private void dispatchSmsOtpToWebView(@Nullable String rawMessage) {
        if (rawMessage == null || rawMessage.isEmpty() || isFinishing() || isDestroyed() || getBridge() == null || getBridge().getWebView() == null) {
            return;
        }
        final String safeMessage = rawMessage;
        final String otpCode = extractSixDigitOtp(safeMessage);
        if (otpCode.length() != 6) {
            return;
        }
        // Delay slightly after resume so Chromium WebView & Android AutofillManager finish
        // settling focus/window tokens before JS updates the OTP input or navigates.
        getBridge().getWebView().postDelayed(() -> {
            if (isFinishing() || isDestroyed() || getBridge() == null || getBridge().getWebView() == null) {
                return;
            }
            try {
                JSONObject payload = new JSONObject();
                payload.put("code", otpCode);
                payload.put("rawMessage", safeMessage);
                String js =
                    "window.dispatchEvent(new CustomEvent('smartrun:sms-otp', { detail: " +
                    payload.toString() +
                    " }));";
                getBridge().getWebView().evaluateJavascript(js, null);
            } catch (Throwable ignored) {}
        }, 180L);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        try {
            super.onNewIntent(intent);
            if (intent != null) {
                setIntent(intent);
            }
        } catch (Throwable ignored) {}
    }

    private void updateMeasuredInsets(WindowInsetsCompat windowInsets) {
        if (windowInsets == null) return;
        Insets navInsets = windowInsets.getInsets(WindowInsetsCompat.Type.navigationBars());
        Insets statusInsets = windowInsets.getInsets(
            WindowInsetsCompat.Type.statusBars() | WindowInsetsCompat.Type.displayCutout()
        );

        float density = getResources().getDisplayMetrics().density;
        int topDp = density > 0 ? Math.round(statusInsets.top / density) : statusInsets.top;
        int bottomDp = density > 0 ? Math.round(navInsets.bottom / density) : navInsets.bottom;
        int leftDp = density > 0 ? Math.round(Math.max(statusInsets.left, navInsets.left) / density) : Math.max(statusInsets.left, navInsets.left);
        int rightDp = density > 0 ? Math.round(Math.max(statusInsets.right, navInsets.right) / density) : Math.max(statusInsets.right, navInsets.right);

        latestTopDp = Math.max(topDp, 0);
        latestBottomDp = Math.max(bottomDp, 0);
        latestLeftDp = Math.max(leftDp, 0);
        latestRightDp = Math.max(rightDp, 0);
        hasMeasuredInsets = true;

        injectInsetsIntoWebView();
    }

    private void syncFromRootWindowInsets() {
        View decorView = getWindow() != null ? getWindow().getDecorView() : null;
        if (decorView == null) return;
        WindowInsetsCompat rootInsets = ViewCompat.getRootWindowInsets(decorView);
        if (rootInsets != null) {
            updateMeasuredInsets(rootInsets);
        } else {
            injectInsetsIntoWebView();
        }
    }

    private void injectInsetsIntoWebView() {
        if (isFinishing() || isDestroyed() || getBridge() == null || getBridge().getWebView() == null) {
            return;
        }
        final int topDp = latestTopDp;
        final int bottomDp = latestBottomDp;
        final int leftDp = latestLeftDp;
        final int rightDp = latestRightDp;
        final boolean ready = hasMeasuredInsets;

        getBridge().getWebView().post(() -> {
            if (isFinishing() || isDestroyed() || getBridge() == null || getBridge().getWebView() == null) {
                return;
            }
            String js =
                "(function(){" +
                "  var r=document&&document.documentElement;" +
                "  if(!r)return;" +
                (ready
                    ? "  r.style.setProperty('--safe-area-top','" + topDp + "px');" +
                      "  r.style.setProperty('--safe-area-bottom','" + bottomDp + "px');" +
                      "  r.style.setProperty('--safe-area-left','" + leftDp + "px');" +
                      "  r.style.setProperty('--safe-area-right','" + rightDp + "px');" +
                      "  r.dataset.nativeSafeArea='1';"
                    : "") +
                "})();";
            getBridge().getWebView().evaluateJavascript(js, null);
        });
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Official Android 15 Edge-to-Edge initialization for full backward compatibility across all Android versions
        androidx.activity.EdgeToEdge.enable(this);

        super.onCreate(savedInstanceState);

        // Bind native Android FirebaseAuth to our real custom domain (www.smartrun.in)
        // so Phone Auth reCAPTCHA fallback & verification handlers never use *.firebaseapp.com.
        try {
            FirebaseAuth.getInstance().setCustomAuthDomain("www.smartrun.in");
        } catch (Throwable ignored) {}

        // Enforce WebView debugging strictly OFF in release builds (Play Console security compliance)
        boolean isDebuggableApp = (getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
        WebView.setWebContentsDebuggingEnabled(isDebuggableApp);

        // Hide any native Android ActionBar or Toolbar so web app navbar is unobstructed
        if (getSupportActionBar() != null) {
            getSupportActionBar().hide();
        }
        if (getActionBar() != null) {
            getActionBar().hide();
        }

        // Configure system bars to show clear dark icons (WiFi, Network, Battery) and dark navigation buttons (Back, Home, Recents)
        WindowInsetsControllerCompat insetsController =
            WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        if (insetsController != null) {
            insetsController.setAppearanceLightStatusBars(true);
            insetsController.setAppearanceLightNavigationBars(true);
        }

        if (getBridge() != null && getBridge().getWebView() != null) {
            WebView webView = getBridge().getWebView();
            webView.addJavascriptInterface(new SmartRunInsetsBridge(), "SmartRunInsets");
            webView.addJavascriptInterface(new SmartRunOtpBridge(), "SmartRunOtp");
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                webView.setImportantForAutofill(View.IMPORTANT_FOR_AUTOFILL_YES);
            }
        }

        // Single authoritative insets handler: measure density-normalized DP insets for CSS variables
        // and zero out systemBars + displayCutout insets passed to WebView (preserving IME keyboard insets)
        // so Chromium env(safe-area-inset-*) never double-pads or leaks raw physical pixels.
        ViewCompat.setOnApplyWindowInsetsListener(getWindow().getDecorView(), (v, windowInsets) -> {
            v.setPadding(0, 0, 0, 0);
            updateMeasuredInsets(windowInsets);

            return new WindowInsetsCompat.Builder(windowInsets)
                .setInsets(
                    WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout(),
                    Insets.NONE
                )
                .build();
        });

        if (getBridge() != null && getBridge().getWebView() != null) {
            getBridge().getWebView().setWebViewClient(new BridgeWebViewClient(getBridge()) {
                @Override
                public void onPageFinished(WebView view, String url) {
                    super.onPageFinished(view, url);
                    syncFromRootWindowInsets();
                }

                @Override
                public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                    if (request != null && request.getUrl() != null) {
                        String url = request.getUrl().toString();
                        if (handleExternalScheme(url)) {
                            return true;
                        }
                    }
                    return super.shouldOverrideUrlLoading(view, request);
                }

                @SuppressWarnings("deprecation")
                @Override
                public boolean shouldOverrideUrlLoading(WebView view, String url) {
                    if (handleExternalScheme(url)) {
                        return true;
                    }
                    return super.shouldOverrideUrlLoading(view, url);
                }

                private boolean handleExternalScheme(String url) {
                    if (url == null) return false;

                    // Intercept UPI payment intents, wallet deep links, and communication schemes
                    if (url.startsWith("upi://") ||
                        url.startsWith("tez://") ||
                        url.startsWith("phonepe://") ||
                        url.startsWith("paytmmp://") ||
                        url.startsWith("bhim://") ||
                        url.startsWith("credpay://") ||
                        url.startsWith("intent://") ||
                        url.startsWith("whatsapp://") ||
                        url.startsWith("tel:") ||
                        url.startsWith("mailto:")) {
                        try {
                            Intent intent;
                            if (url.startsWith("intent://")) {
                                intent = Intent.parseUri(url, Intent.URI_INTENT_SCHEME);
                            } else {
                                intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                            }
                            if (intent != null) {
                                intent.addCategory(Intent.CATEGORY_BROWSABLE);
                                intent.setComponent(null);
                                intent.setSelector(null);
                                startActivity(intent);
                                return true;
                            }
                        } catch (Exception e) {
                            try {
                                Intent fallback = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                                startActivity(fallback);
                                return true;
                            } catch (Exception ignored) {}
                        }
                    }
                    return false;
                }
            });
        }
    }

    @Override
    public void onPause() {
        isActivityResumed = false;
        super.onPause();
    }

    @Override
    public void onResume() {
        super.onResume();
        isActivityResumed = true;
        syncFromRootWindowInsets();
        if (getWindow() != null && getWindow().getDecorView() != null) {
            ViewCompat.requestApplyInsets(getWindow().getDecorView());
        }

        // Record native resume timestamp in WebView so stray back signals right after closing
        // Google Autofill / SMS consent / Chrome Custom Tab overlays never trigger CapApp.exitApp().
        if (getBridge() != null && getBridge().getWebView() != null) {
            getBridge().getWebView().post(() -> {
                if (!isFinishing() && !isDestroyed() && getBridge() != null && getBridge().getWebView() != null) {
                    try {
                        getBridge().getWebView().evaluateJavascript(
                            "window.__SMARTRUN_LAST_RESUME_TS__=Date.now();",
                            null
                        );
                    } catch (Throwable ignored) {}
                }
            });
        }

        // Flush any SMS OTP captured via ActivityResult before onResume() completed
        if (pendingSmsOtpMessage != null) {
            final String msgToDispatch = pendingSmsOtpMessage;
            pendingSmsOtpMessage = null;
            dispatchSmsOtpToWebView(msgToDispatch);
        }

        if (pendingConsentIntent != null && !isLaunchingSmsConsent && isSmsConsentReceiverRegistered) {
            final Intent toLaunch = pendingConsentIntent;
            pendingConsentIntent = null;
            View decorView = getWindow() != null ? getWindow().getDecorView() : null;
            if (decorView != null) {
                decorView.postDelayed(() -> launchConsentIntentSafely(toLaunch), 120L);
            } else {
                launchConsentIntentSafely(toLaunch);
            }
        }
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            syncFromRootWindowInsets();
        }
    }

    @Override
    public void onDestroy() {
        isActivityResumed = false;
        pendingSmsOtpMessage = null;
        unregisterSmsConsentReceiver();
        super.onDestroy();
    }
}
