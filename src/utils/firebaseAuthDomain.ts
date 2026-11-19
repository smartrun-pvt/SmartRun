export const PRODUCTION_FIREBASE_AUTH_DOMAIN = 'smartrun.in';

export interface AuthDomainResolutionContext {
  configuredDomain?: string;
  isNativePlatform: boolean;
  windowHostname?: string;
  fallbackAuthDomain: string;
}

/**
 * Resolves the Firebase Auth domain so production web and native Android/iOS APK
 * builds always use the public SmartRun domain (`smartrun.in`) rather than the
 * default Google AI Studio / Firebase project subdomain (`*.firebaseapp.com`).
 */
export function resolveFirebaseAuthDomainForEnv(ctx: AuthDomainResolutionContext): string {
  const configured = String(ctx.configuredDomain || '').trim();
  if (configured) {
    return configured;
  }

  if (ctx.isNativePlatform) {
    return PRODUCTION_FIREBASE_AUTH_DOMAIN;
  }

  const host = String(ctx.windowHostname || '').trim().toLowerCase();
  if (host === 'smartrun.in' || host === 'www.smartrun.in') {
    return host;
  }

  return ctx.fallbackAuthDomain;
}

/**
 * Determines whether the native Android Google Play Services SMS User Consent
 * listener should be armed. It must ONLY run after Firebase has finished any
 * verification/captcha step and dispatched the SMS (`otpSent && showSecondField`),
 * preventing background Activity launches while a verification screen is active.
 */
export function shouldArmNativeSmsConsent(params: {
  authStep: string;
  isPhone: boolean;
  otpSent: boolean;
  showSecondField: boolean;
  otpAttemptId: number;
}): boolean {
  return (
    params.authStep === 'primary' &&
    params.isPhone &&
    params.otpSent &&
    params.showSecondField &&
    params.otpAttemptId > 0
  );
}
