export const PRODUCTION_APP_ORIGIN = 'https://www.smartrun.in';
export const PRODUCTION_FIREBASE_AUTH_DOMAIN = 'www.smartrun.in';

export interface AuthDomainResolutionContext {
  configuredDomain?: string;
  isNativePlatform: boolean;
  windowHostname?: string;
  fallbackAuthDomain: string;
}

export interface PublicOriginContext {
  isNativePlatform?: boolean;
  windowOrigin?: string;
  windowHostname?: string;
}

/**
 * Strips any protocol/path from a Firebase authDomain value so both Web SDK and
 * Android FirebaseAuth.setCustomAuthDomain(...) always receive a bare hostname
 * (e.g. "www.smartrun.in").
 */
export function normalizeAuthDomainHostname(rawDomain: string): string {
  const trimmed = String(rawDomain || '').trim();
  if (!trimmed) return '';
  return trimmed
    .replace(/^https?:\/\//i, '')
    .replace(/\/.*$/, '')
    .trim()
    .toLowerCase();
}

/**
 * Resolves the canonical public SmartRun origin (`https://www.smartrun.in`) for
 * redirects, password reset links, OAuth callbacks, and share URLs across
 * native Android/iOS APK builds and web deployments.
 */
export function resolvePublicAppOrigin(ctx?: PublicOriginContext): string {
  const isNative = Boolean(ctx?.isNativePlatform);
  const origin = String(ctx?.windowOrigin || '').trim();
  const host = String(ctx?.windowHostname || '').trim().toLowerCase();

  if (
    isNative ||
    !origin ||
    origin.startsWith('capacitor://') ||
    origin.startsWith('ionic://') ||
    origin.startsWith('file://') ||
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '10.0.2.2' ||
    host === 'smartrun.in' ||
    host === 'www.smartrun.in' ||
    host.endsWith('.smartrun.in') ||
    host.includes('girirajpower') ||
    host.endsWith('.firebaseapp.com') ||
    host.endsWith('.run.app')
  ) {
    return PRODUCTION_APP_ORIGIN;
  }

  return PRODUCTION_APP_ORIGIN;
}

/**
 * Resolves the Firebase Auth domain so production web and native Android/iOS APK
 * builds always use the canonical public SmartRun domain (`www.smartrun.in`)
 * rather than the default Firebase subdomain (`*.firebaseapp.com`) or `localhost`.
 */
export function resolveFirebaseAuthDomainForEnv(ctx: AuthDomainResolutionContext): string {
  const configured = normalizeAuthDomainHostname(ctx.configuredDomain || '');
  if (configured) {
    return configured;
  }

  if (ctx.isNativePlatform) {
    return PRODUCTION_FIREBASE_AUTH_DOMAIN;
  }

  const host = String(ctx.windowHostname || '').trim().toLowerCase();
  if (host === 'smartrun.in' || host === 'www.smartrun.in') {
    return PRODUCTION_FIREBASE_AUTH_DOMAIN;
  }

  return normalizeAuthDomainHostname(ctx.fallbackAuthDomain) || PRODUCTION_FIREBASE_AUTH_DOMAIN;
}

/**
 * Normalizes native Android / iOS Capacitor Firebase Phone Auth error payloads
 * (which often arrive with raw FirebaseException messages or uppercase codes
 * instead of Web SDK `auth/*` codes) into standard `auth/*` error codes.
 */
export function normalizeNativeFirebaseAuthError(err: unknown): { code: string; message: string } {
  const rawCode = String((err as { code?: string } | null)?.code ?? '').trim();
  const rawMessage = String(
    (err as { message?: string } | null)?.message ?? (typeof err === 'string' ? err : '')
  ).trim();
  const lowerCode = rawCode.toLowerCase();
  const lowerMsg = rawMessage.toLowerCase();

  if (lowerCode.startsWith('auth/')) {
    return { code: lowerCode, message: rawMessage };
  }

  if (
    lowerCode.includes('missing_client_identifier') ||
    lowerMsg.includes('missing a valid app identifier') ||
    lowerMsg.includes('play integrity') ||
    lowerMsg.includes('safetynet') ||
    lowerMsg.includes('missing_client_identifier')
  ) {
    return { code: 'auth/missing-client-identifier', message: rawMessage };
  }

  if (
    lowerCode.includes('app_not_authorized') ||
    lowerMsg.includes('not authorized to use firebase authentication') ||
    lowerMsg.includes('correct package name and sha-1')
  ) {
    return { code: 'auth/app-not-authorized', message: rawMessage };
  }

  if (
    lowerCode.includes('invalid_app_credential') ||
    lowerMsg.includes('invalid_app_credential') ||
    lowerMsg.includes('invalid app credential')
  ) {
    return { code: 'auth/invalid-app-credential', message: rawMessage };
  }

  if (
    lowerCode.includes('captcha_check_failed') ||
    lowerMsg.includes('captcha') ||
    lowerMsg.includes('recaptcha')
  ) {
    return { code: 'auth/captcha-check-failed', message: rawMessage };
  }

  if (
    lowerCode.includes('invalid_verification_code') ||
    lowerMsg.includes('verification code from sms/topt is invalid') ||
    lowerMsg.includes('sms verification code used to create the phone auth credential is invalid') ||
    lowerMsg.includes('invalid verification code')
  ) {
    return { code: 'auth/invalid-verification-code', message: rawMessage };
  }

  if (
    lowerCode.includes('session_expired') ||
    lowerCode.includes('code_expired') ||
    lowerMsg.includes('sms code has expired') ||
    lowerMsg.includes('session expired')
  ) {
    return { code: 'auth/code-expired', message: rawMessage };
  }

  if (
    lowerCode.includes('too_many_requests') ||
    lowerMsg.includes('blocked all requests from this device') ||
    lowerMsg.includes('unusual activity') ||
    lowerMsg.includes('too many requests')
  ) {
    return { code: 'auth/too-many-requests', message: rawMessage };
  }

  if (lowerCode.includes('quota_exceeded') || lowerMsg.includes('quota')) {
    return { code: 'auth/quota-exceeded', message: rawMessage };
  }

  if (
    lowerCode.includes('operation_not_allowed') ||
    lowerMsg.includes('operation is not allowed') ||
    lowerMsg.includes('sms unable to be sent until this region enabled')
  ) {
    return { code: 'auth/operation-not-allowed', message: rawMessage };
  }

  if (
    lowerCode.includes('network_request_failed') ||
    lowerMsg.includes('network error') ||
    lowerMsg.includes('unable to resolve host') ||
    lowerMsg.includes('timeout')
  ) {
    return { code: 'auth/network-request-failed', message: rawMessage };
  }

  if (lowerCode.includes('invalid_phone_number') || lowerMsg.includes('invalid phone number')) {
    return { code: 'auth/invalid-phone-number', message: rawMessage };
  }

  return { code: rawCode, message: rawMessage };
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

/**
 * Generates a unique virgin child DOM slot ID under the reCAPTCHA host container
 * so Google reCAPTCHA never sees a previously rendered DOM element on retries or resends.
 */
export function buildRecaptchaSlotId(baseContainerId: string, sequence: number): string {
  const safeBase = String(baseContainerId || 'recaptcha-container')
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '') || 'recaptcha-container';
  const safeSeq = Math.max(1, Math.floor(Number(sequence) || 1));
  return `${safeBase}-slot-${safeSeq}`;
}

/**
 * Detects Google reCAPTCHA / Firebase Web SDK duplicate-element render errors
 * so the service can automatically allocate a fresh virgin DOM slot and retry once.
 */
export function isRecaptchaAlreadyRenderedError(err: unknown): boolean {
  const msg = String(
    (err as { message?: string } | null)?.message ?? err ?? ''
  ).toLowerCase();
  return (
    msg.includes('already been rendered') ||
    msg.includes('already rendered') ||
    msg.includes('recaptcha-already-rendered')
  );
}
