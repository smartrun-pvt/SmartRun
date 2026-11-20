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

patchBridgeJava();
