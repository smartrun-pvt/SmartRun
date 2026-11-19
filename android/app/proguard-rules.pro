# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.

# Keep Capacitor Bridge, Plugins, and Plugin Methods
-keep public class * extends com.getcapacitor.Plugin
-keep public class * extends com.getcapacitor.Bridge
-keep public class * extends com.getcapacitor.BridgeActivity
-keep public class * extends com.getcapacitor.PluginConfig

# Keep JavaScript Interfaces
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep Capacitor internals and Cordova plugins
-keep class com.getcapacitor.** { *; }
-keep interface com.getcapacitor.** { *; }
-dontwarn com.getcapacitor.**

-keep class org.apache.cordova.** { *; }
-dontwarn org.apache.cordova.**

# Preserve annotations and line numbers for crash reports
-keepattributes *Annotation*
-keepattributes JavascriptInterface
-keepattributes SourceFile,LineNumberTable

# Firebase Crashlytics
-keepattributes SourceFile,LineNumberTable
-keep public class * extends java.lang.Exception
-keepclassmembers class com.google.firebase.crashlytics.** { *; }
-dontwarn com.google.firebase.crashlytics.**

# Firebase Cloud Messaging & Capacitor Push Notifications
-keep class com.google.firebase.messaging.** { *; }
-dontwarn com.google.firebase.messaging.**
-keep class com.capacitorjs.plugins.pushnotifications.** { *; }
-dontwarn com.capacitorjs.plugins.pushnotifications.**

# Google Play Services SMS User Consent API (OTP Autofill) & Parcelable Status
-keep class in.smartrun.app.MainActivity$* { *; }
-keep class com.google.android.gms.auth.api.phone.** { *; }
-keep class com.google.android.gms.common.api.** { *; }
-keep class com.google.android.gms.tasks.** { *; }
-dontwarn com.google.android.gms.auth.api.phone.**

# Silent Phone Verification (Play Integrity, reCAPTCHA Enterprise, Firebase Auth)
-keep class com.google.android.play.core.integrity.** { *; }
-keep class com.google.android.recaptcha.** { *; }
-keep class com.google.firebase.auth.** { *; }
-keep class io.capawesome.capacitorjs.plugins.firebase.authentication.** { *; }

# Strip verbose/debug Android logs in release builds
-assumenosideeffects class android.util.Log {
    public static int v(...);
    public static int d(...);
}

# Suppress R8 missing class warnings across all third-party libraries & plugins
-dontwarn **
-ignorewarnings
