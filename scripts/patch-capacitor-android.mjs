#!/usr/bin/env node
/**
 * Permanent Null-Safety Patch for Capacitor Android Bridge.java
 *
 * Fixes Firebase Crashlytics NullPointerException:
 *   java.lang.NullPointerException: Attempt to invoke interface method
 *   'int java.lang.CharSequence.length()' on a null object reference
 *   at java.util.regex.Matcher.reset(Matcher.java)
 *   at com.getcapacitor.Bridge.isMinimumWebViewInstalled(Bridge.java:336)
 *
 * On Android 8-15 devices (especially during System WebView / Chrome updates or OEM ROMs),
 * WebView.getCurrentWebViewPackage() can return null or a PackageInfo with a null versionName.
 * Passing null into Pattern.matcher(info.versionName) crashes in Matcher.reset(CharSequence).
 *
 * This script is idempotent and runs automatically on npm postinstall, cap:sync, and cap:build.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const bridgePath = path.join(
  projectRoot,
  'node_modules',
  '@capacitor',
  'android',
  'capacitor',
  'src',
  'main',
  'java',
  'com',
  'getcapacitor',
  'Bridge.java'
);

const PATCH_MARKER = '// [SmartRun Null-Safety Patch] Guard null PackageInfo / versionName before Pattern.matcher';

function patchBridgeJava() {
  if (!fs.existsSync(bridgePath)) {
    console.log('[patch-capacitor-android] Bridge.java not found (skipping).');
    return;
  }

  let content = fs.readFileSync(bridgePath, 'utf8');

  if (content.includes(PATCH_MARKER)) {
    console.log('[patch-capacitor-android] Bridge.java already patched.');
    return;
  }

  const originalBlock = `        // Check getCurrentWebViewPackage() directly if above Android 8
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            PackageInfo info = WebView.getCurrentWebViewPackage();
            Pattern pattern = Pattern.compile("(\\\\d+)");
            Matcher matcher = pattern.matcher(info.versionName);
            if (matcher.find()) {
                String majorVersionStr = matcher.group(0);
                int majorVersion = Integer.parseInt(majorVersionStr);
                if (info.packageName.equals("com.huawei.webview")) {
                    return majorVersion >= config.getMinHuaweiWebViewVersion();
                }
                return majorVersion >= config.getMinWebViewVersion();
            } else {
                return false;
            }
        }`;

  const patchedBlock = `        ${PATCH_MARKER}
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            PackageInfo info = null;
            try {
                info = WebView.getCurrentWebViewPackage();
            } catch (Throwable ignored) {}
            if (info == null) {
                try {
                    info = WebViewCompat.getCurrentWebViewPackage(getContext());
                } catch (Throwable ignored) {}
            }
            String safeVersionName = (info != null && info.versionName != null) ? info.versionName : "";
            if (!safeVersionName.isEmpty()) {
                Pattern pattern = Pattern.compile("(\\\\d+)");
                Matcher matcher = pattern.matcher(safeVersionName);
                if (matcher.find()) {
                    String majorVersionStr = matcher.group(0);
                    if (majorVersionStr != null && !majorVersionStr.isEmpty()) {
                        try {
                            int majorVersion = Integer.parseInt(majorVersionStr);
                            if ("com.huawei.webview".equals(info.packageName)) {
                                return majorVersion >= config.getMinHuaweiWebViewVersion();
                            }
                            return majorVersion >= config.getMinWebViewVersion();
                        } catch (NumberFormatException ignored) {}
                    }
                }
                return false;
            }
            // If WebView package info or versionName was null (e.g., mid-update OEM WebView),
            // fall through to manual package lookup instead of crashing in Matcher.reset(null).
        }`;

  if (!content.includes(originalBlock)) {
    // Fallback regex replacement in case whitespace/line endings differ across Capacitor minor versions
    const fallbackRegex =
      /\/\/ Check getCurrentWebViewPackage\(\) directly if above Android 8[\s\S]*?if \(Build\.VERSION\.SDK_INT >= Build\.VERSION_CODES\.O\) \{[\s\S]*?Matcher matcher = pattern\.matcher\(info\.versionName\);[\s\S]*?return false;\s*\}\s*\}/;
    if (!fallbackRegex.test(content)) {
      console.warn('[patch-capacitor-android] Could not locate target block in Bridge.java; verify manually.');
      return;
    }
    content = content.replace(fallbackRegex, patchedBlock.trimStart());
  } else {
    content = content.replace(originalBlock, patchedBlock);
  }

  // Also null-guard legacy fallback lookups in Bridge.java so info.versionName.split() never throws NPE
  content = content.replace(
    /PackageInfo info = InternalUtils\.getPackageInfo\(pm, "com\.android\.chrome"\);\s*String majorVersionStr = info\.versionName\.split\("\\\\\."\)\[0\];/g,
    `PackageInfo info = InternalUtils.getPackageInfo(pm, "com.android.chrome");
            if (info != null && info.versionName != null) {
                String majorVersionStr = info.versionName.split("\\\\.")[0];
                int majorVersion = Integer.parseInt(majorVersionStr);
                return majorVersion >= config.getMinWebViewVersion();
            }`
  );

  content = content.replace(
    /if \(info != null && info\.versionName != null\) \{\s*String majorVersionStr = info\.versionName\.split\("\\\\\."\)\[0\];\s*int majorVersion = Integer\.parseInt\(majorVersionStr\);\s*return majorVersion >= config\.getMinWebViewVersion\(\);\s*\}\s*int majorVersion = Integer\.parseInt\(majorVersionStr\);\s*return majorVersion >= config\.getMinWebViewVersion\(\);/g,
    `if (info != null && info.versionName != null) {
                String majorVersionStr = info.versionName.split("\\\\.")[0];
                int majorVersion = Integer.parseInt(majorVersionStr);
                return majorVersion >= config.getMinWebViewVersion();
            }`
  );

  content = content.replace(
    /final PackageInfo info = InternalUtils\.getPackageInfo\(pm, webViewPackageName\);\s*final String majorVersionStr = info\.versionName\.split\("\\\\\."\)\[0\];/,
    `final PackageInfo info = InternalUtils.getPackageInfo(pm, webViewPackageName);
            if (info == null || info.versionName == null) {
                return 0;
            }
            final String majorVersionStr = info.versionName.split("\\\\.")[0];`
  );

  fs.writeFileSync(bridgePath, content, 'utf8');
  console.log('[patch-capacitor-android] Successfully patched Bridge.java with null-safe WebView version matching.');
}

const phoneHandlerPath = path.join(
  projectRoot,
  'node_modules',
  '@capacitor-firebase',
  'authentication',
  'android',
  'src',
  'main',
  'java',
  'io',
  'capawesome',
  'capacitorjs',
  'plugins',
  'firebase',
  'authentication',
  'handlers',
  'PhoneAuthProviderHandler.java'
);

const PHONE_PATCH_MARKER = '// [SmartRun PhoneAuth Persistence, CustomDomain & UI-Thread Safety Patch v2]';

function patchPhoneAuthProviderHandler() {
  if (!fs.existsSync(phoneHandlerPath)) {
    console.log('[patch-capacitor-android] PhoneAuthProviderHandler.java not found (skipping).');
    return;
  }

  const content = fs.readFileSync(phoneHandlerPath, 'utf8');
  if (content.includes(PHONE_PATCH_MARKER)) {
    console.log('[patch-capacitor-android] PhoneAuthProviderHandler.java already patched (v2).');
    return;
  }

  const patchedFile = `package io.capawesome.capacitorjs.plugins.firebase.authentication.handlers;

${PHONE_PATCH_MARKER}
import android.app.Activity;
import android.content.Context;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.google.firebase.FirebaseException;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.PhoneAuthCredential;
import com.google.firebase.auth.PhoneAuthOptions;
import com.google.firebase.auth.PhoneAuthProvider;
import io.capawesome.capacitorjs.plugins.firebase.authentication.FirebaseAuthentication;
import io.capawesome.capacitorjs.plugins.firebase.authentication.FirebaseAuthenticationPlugin;
import io.capawesome.capacitorjs.plugins.firebase.authentication.classes.ConfirmVerificationCodeOptions;
import io.capawesome.capacitorjs.plugins.firebase.authentication.classes.LinkWithPhoneNumberOptions;
import io.capawesome.capacitorjs.plugins.firebase.authentication.classes.PhoneVerificationCompletedEvent;
import io.capawesome.capacitorjs.plugins.firebase.authentication.classes.SignInOptions;
import io.capawesome.capacitorjs.plugins.firebase.authentication.classes.SignInResult;
import io.capawesome.capacitorjs.plugins.firebase.authentication.classes.SignInWithPhoneNumberOptions;
import io.capawesome.capacitorjs.plugins.firebase.authentication.interfaces.NonEmptyResultCallback;
import java.util.concurrent.TimeUnit;

public class PhoneAuthProviderHandler {

    private static final String PREFS_NAME = "smartrun_phone_auth";
    private static final String KEY_VERIFICATION_ID = "verification_id";
    private static final String KEY_PHONE_NUMBER = "phone_number";
    private static final String KEY_TIMESTAMP = "timestamp";
    private static final String SMARTRUN_AUTH_DOMAIN = "www.smartrun.in";

    private FirebaseAuthentication pluginImplementation;

    @Nullable
    private PhoneAuthProvider.ForceResendingToken forceResendingToken;

    private boolean signInOnConfirm = true;
    private boolean skipNativeAuthOnConfirm = false;

    public PhoneAuthProviderHandler(FirebaseAuthentication pluginImplementation) {
        this.pluginImplementation = pluginImplementation;
    }

    private void persistPendingVerification(@Nullable String verificationId, @Nullable String phoneNumber) {
        try {
            if (verificationId == null || verificationId.isEmpty()) return;
            Context ctx = pluginImplementation.getPlugin().getContext();
            if (ctx == null) return;
            ctx.getApplicationContext()
                .getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
                .edit()
                .putString(KEY_VERIFICATION_ID, verificationId)
                .putString(KEY_PHONE_NUMBER, phoneNumber != null ? phoneNumber : "")
                .putLong(KEY_TIMESTAMP, System.currentTimeMillis())
                .apply();
        } catch (Throwable ignored) {}
    }

    private void clearPendingVerification() {
        try {
            Context ctx = pluginImplementation.getPlugin().getContext();
            if (ctx == null) return;
            ctx.getApplicationContext()
                .getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
                .edit()
                .clear()
                .apply();
        } catch (Throwable ignored) {}
    }

    public void signIn(@NonNull final SignInWithPhoneNumberOptions options) throws Exception {
        signInOnConfirm = true;
        skipNativeAuthOnConfirm = options.getSkipNativeAuth();
        verifyPhoneNumber(options, false);
    }

    public void link(@NonNull final LinkWithPhoneNumberOptions options) throws Exception {
        signInOnConfirm = false;
        skipNativeAuthOnConfirm = options.getSkipNativeAuth();
        verifyPhoneNumber(options, true);
    }

    public void confirmVerificationCode(@NonNull ConfirmVerificationCodeOptions options, @NonNull NonEmptyResultCallback callback) {
        try {
            PhoneAuthCredential credential = PhoneAuthProvider.getCredential(options.getVerificationId(), options.getVerificationCode());
            NonEmptyResultCallback wrappedCallback = new NonEmptyResultCallback<SignInResult>() {
                @Override
                public void success(SignInResult result) {
                    clearPendingVerification();
                    callback.success(result);
                }

                @Override
                public void error(Exception exception) {
                    callback.error(exception);
                }
            };
            if (signInOnConfirm) {
                pluginImplementation.signInWithCredential(new SignInOptions(skipNativeAuthOnConfirm), credential, wrappedCallback);
            } else {
                pluginImplementation.linkWithCredential(credential, wrappedCallback);
            }
        } catch (Exception ex) {
            callback.error(ex);
        } catch (Throwable t) {
            callback.error(new Exception(t.getMessage() != null ? t.getMessage() : "Failed to verify OTP code.", t));
        }
    }

    private void verifyPhoneNumber(@NonNull SignInWithPhoneNumberOptions options, boolean isLink) throws Exception {
        final Activity activity = pluginImplementation.getPlugin().getActivity();
        if (activity == null || activity.isFinishing() || activity.isDestroyed()) {
            throw new Exception("App activity is not ready for phone verification. Please try again.");
        }
        final FirebaseAuth firebaseAuth = pluginImplementation.getFirebaseAuthInstance();
        try {
            firebaseAuth.setCustomAuthDomain(SMARTRUN_AUTH_DOMAIN);
        } catch (Throwable ignored) {}

        PhoneAuthOptions.Builder builder = PhoneAuthOptions.newBuilder(firebaseAuth)
            .setPhoneNumber(options.getPhoneNumber())
            .setTimeout(options.getTimeout(), TimeUnit.SECONDS)
            .setActivity(activity)
            .setCallbacks(createCallbacks(options, isLink));
        if (options.getResendCode()) {
            if (forceResendingToken == null) {
                throw new Exception(FirebaseAuthenticationPlugin.ERROR_PHONE_RESEND_TOKEN_MISSING);
            }
            builder.setForceResendingToken(forceResendingToken);
        }
        final PhoneAuthOptions phoneAuthOptions = builder.build();
        // Capacitor executes @PluginMethod calls on a background HandlerThread.
        // Dispatching verifyPhoneNumber on the Android UI thread prevents Activity / RecaptchaActivity
        // launch issues and ensures Play Integrity + Custom Tabs callbacks bind cleanly.
        activity.runOnUiThread(() -> {
            if (activity.isFinishing() || activity.isDestroyed()) {
                pluginImplementation.handlePhoneVerificationFailed(
                    new Exception("App activity closed before phone verification could start.")
                );
                return;
            }
            try {
                PhoneAuthProvider.verifyPhoneNumber(phoneAuthOptions);
            } catch (Exception ex) {
                pluginImplementation.handlePhoneVerificationFailed(ex);
            } catch (Throwable t) {
                pluginImplementation.handlePhoneVerificationFailed(
                    new Exception(t.getMessage() != null ? t.getMessage() : "Failed to start phone verification.", t)
                );
            }
        });
    }

    private PhoneAuthProvider.OnVerificationStateChangedCallbacks createCallbacks(
        @NonNull final SignInWithPhoneNumberOptions options,
        boolean isLink
    ) {
        return new PhoneAuthProvider.OnVerificationStateChangedCallbacks() {
            @Override
            public void onVerificationCompleted(PhoneAuthCredential credential) {
                if (credential == null) return;
                try {
                    NonEmptyResultCallback callback = new NonEmptyResultCallback<SignInResult>() {
                        @Override
                        public void success(SignInResult result) {
                            try {
                                clearPendingVerification();
                                if (result == null) return;
                                PhoneVerificationCompletedEvent event = new PhoneVerificationCompletedEvent(
                                    result.getUser(),
                                    result.getCredential(),
                                    result.getAdditionalUserInfo(),
                                    credential.getSmsCode()
                                );
                                pluginImplementation.handlePhoneVerificationCompleted(event);
                            } catch (Throwable ignored) {}
                        }

                        @Override
                        public void error(Exception exception) {
                            try {
                                pluginImplementation.handlePhoneVerificationFailed(
                                    exception != null ? exception : new Exception("Phone verification failed.")
                                );
                            } catch (Throwable ignored) {}
                        }
                    };
                    if (isLink) {
                        pluginImplementation.linkWithCredential(credential, callback);
                    } else {
                        pluginImplementation.signInWithCredential(options, credential, callback);
                    }
                } catch (Throwable t) {
                    try {
                        pluginImplementation.handlePhoneVerificationFailed(
                            new Exception(t.getMessage() != null ? t.getMessage() : "Phone verification failed.", t)
                        );
                    } catch (Throwable ignored) {}
                }
            }

            @Override
            public void onVerificationFailed(FirebaseException exception) {
                try {
                    pluginImplementation.handlePhoneVerificationFailed(
                        exception != null ? exception : new Exception("Phone verification failed.")
                    );
                } catch (Throwable ignored) {}
            }

            @Override
            public void onCodeSent(@NonNull String verificationId, @NonNull PhoneAuthProvider.ForceResendingToken token) {
                try {
                    forceResendingToken = token;
                    persistPendingVerification(verificationId, options.getPhoneNumber());
                    pluginImplementation.handlePhoneCodeSent(verificationId);
                } catch (Throwable ignored) {}
            }
        };
    }
}
`;

  fs.writeFileSync(phoneHandlerPath, patchedFile, 'utf8');
  console.log('[patch-capacitor-android] Successfully patched PhoneAuthProviderHandler.java (v2: www.smartrun.in custom authDomain + UI-thread safety + persistence).');
}

const pluginJavaPath = path.join(
  projectRoot,
  'node_modules',
  '@capacitor-firebase',
  'authentication',
  'android',
  'src',
  'main',
  'java',
  'io',
  'capawesome',
  'capacitorjs',
  'plugins',
  'firebase',
  'authentication',
  'FirebaseAuthenticationPlugin.java'
);

const PLUGIN_AUTHDOMAIN_MARKER = '// [SmartRun Custom AuthDomain Config Patch]';

function patchFirebaseAuthenticationPlugin() {
  if (!fs.existsSync(pluginJavaPath)) {
    console.log('[patch-capacitor-android] FirebaseAuthenticationPlugin.java not found (skipping).');
    return;
  }

  let content = fs.readFileSync(pluginJavaPath, 'utf8');
  if (content.includes(PLUGIN_AUTHDOMAIN_MARKER)) {
    console.log('[patch-capacitor-android] FirebaseAuthenticationPlugin.java already patched.');
    return;
  }

  const targetBlock = `    private FirebaseAuthenticationConfig getFirebaseAuthenticationConfig() {
        FirebaseAuthenticationConfig config = new FirebaseAuthenticationConfig();

        boolean skipNativeAuth = getConfig().getBoolean("skipNativeAuth", config.getSkipNativeAuth());
        config.setSkipNativeAuth(skipNativeAuth);
        String[] providers = getConfig().getArray("providers", config.getProviders());
        config.setProviders(providers);

        return config;
    }`;

  const patchedBlock = `    ${PLUGIN_AUTHDOMAIN_MARKER}
    private FirebaseAuthenticationConfig getFirebaseAuthenticationConfig() {
        FirebaseAuthenticationConfig config = new FirebaseAuthenticationConfig();

        boolean skipNativeAuth = getConfig().getBoolean("skipNativeAuth", config.getSkipNativeAuth());
        config.setSkipNativeAuth(skipNativeAuth);
        String[] providers = getConfig().getArray("providers", config.getProviders());
        config.setProviders(providers);
        String authDomain = getConfig().getString("authDomain", "www.smartrun.in");
        if (authDomain != null) {
            authDomain = authDomain.trim().replaceFirst("^https?://", "").replaceFirst("/.*$", "");
        }
        if (authDomain == null || authDomain.isEmpty()) {
            authDomain = "www.smartrun.in";
        }
        config.setAuthDomain(authDomain);

        return config;
    }`;

  if (!content.includes(targetBlock)) {
    console.warn('[patch-capacitor-android] Could not locate getFirebaseAuthenticationConfig() in FirebaseAuthenticationPlugin.java.');
    return;
  }

  content = content.replace(targetBlock, patchedBlock);
  fs.writeFileSync(pluginJavaPath, content, 'utf8');
  console.log('[patch-capacitor-android] Successfully patched FirebaseAuthenticationPlugin.java to read authDomain (www.smartrun.in).');
}

patchBridgeJava();
patchPhoneAuthProviderHandler();
patchFirebaseAuthenticationPlugin();


