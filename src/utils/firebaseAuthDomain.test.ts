import { describe, it, expect } from 'vitest';
import {
  PRODUCTION_APP_ORIGIN,
  PRODUCTION_FIREBASE_AUTH_DOMAIN,
  normalizeAuthDomainHostname,
  resolvePublicAppOrigin,
  resolveFirebaseAuthDomainForEnv,
  normalizeNativeFirebaseAuthError,
  shouldArmNativeSmsConsent,
  buildRecaptchaSlotId,
  isRecaptchaAlreadyRenderedError,
  parseIndianMobileNumber,
  shouldResetOtpSessionOnIdentifierChange,
  shouldRestorePendingOtpSession,
  isExpiredOtpErrorCode,
  isRateLimitErrorCode,
} from './firebaseAuthDomain';

describe('firebaseAuthDomain helpers', () => {
  it('defines canonical www.smartrun.in origin and authDomain', () => {
    expect(PRODUCTION_APP_ORIGIN).toBe('https://www.smartrun.in');
    expect(PRODUCTION_FIREBASE_AUTH_DOMAIN).toBe('www.smartrun.in');
  });

  it('normalizes authDomain hostnames by stripping protocol and paths', () => {
    expect(normalizeAuthDomainHostname('https://www.smartrun.in/')).toBe('www.smartrun.in');
    expect(normalizeAuthDomainHostname('http://www.smartrun.in/login')).toBe('www.smartrun.in');
    expect(normalizeAuthDomainHostname('  WWW.SMARTRUN.IN  ')).toBe('www.smartrun.in');
  });

  it('always resolves canonical public app origin to https://www.smartrun.in', () => {
    expect(
      resolvePublicAppOrigin({
        isNativePlatform: true,
        windowOrigin: 'https://localhost',
        windowHostname: 'localhost',
      })
    ).toBe('https://www.smartrun.in');

    expect(
      resolvePublicAppOrigin({
        isNativePlatform: false,
        windowOrigin: 'https://smartrun.in',
        windowHostname: 'smartrun.in',
      })
    ).toBe('https://www.smartrun.in');

    expect(
      resolvePublicAppOrigin({
        isNativePlatform: false,
        windowOrigin: 'https://gen-lang-client-0708778333.firebaseapp.com',
        windowHostname: 'gen-lang-client-0708778333.firebaseapp.com',
      })
    ).toBe('https://www.smartrun.in');
  });

  it('uses www.smartrun.in on native Android/iOS builds instead of firebaseapp.com', () => {
    expect(
      resolveFirebaseAuthDomainForEnv({
        configuredDomain: '',
        isNativePlatform: true,
        windowHostname: 'localhost',
        fallbackAuthDomain: 'gen-lang-client-0708778333.firebaseapp.com',
      })
    ).toBe('www.smartrun.in');
  });

  it('respects explicit VITE_FIREBASE_AUTH_DOMAIN override and strips protocol', () => {
    expect(
      resolveFirebaseAuthDomainForEnv({
        configuredDomain: 'https://auth.smartrun.in/',
        isNativePlatform: true,
        windowHostname: 'localhost',
        fallbackAuthDomain: 'gen-lang-client-0708778333.firebaseapp.com',
      })
    ).toBe('auth.smartrun.in');
  });

  it('unifies smartrun.in and www.smartrun.in on production web to www.smartrun.in', () => {
    expect(
      resolveFirebaseAuthDomainForEnv({
        configuredDomain: '',
        isNativePlatform: false,
        windowHostname: 'www.smartrun.in',
        fallbackAuthDomain: 'gen-lang-client-0708778333.firebaseapp.com',
      })
    ).toBe('www.smartrun.in');

    expect(
      resolveFirebaseAuthDomainForEnv({
        configuredDomain: '',
        isNativePlatform: false,
        windowHostname: 'smartrun.in',
        fallbackAuthDomain: 'gen-lang-client-0708778333.firebaseapp.com',
      })
    ).toBe('www.smartrun.in');
  });

  it('keeps fallback authDomain on local dev web preview', () => {
    expect(
      resolveFirebaseAuthDomainForEnv({
        configuredDomain: '',
        isNativePlatform: false,
        windowHostname: 'localhost',
        fallbackAuthDomain: 'gen-lang-client-0708778333.firebaseapp.com',
      })
    ).toBe('gen-lang-client-0708778333.firebaseapp.com');
  });

  it('normalizes native Android Firebase Phone Auth error payloads into standard auth/* codes', () => {
    expect(
      normalizeNativeFirebaseAuthError({
        message: 'This request is missing a valid app identifier, meaning that Play Integrity checks, and reCAPTCHA checks were unsuccessful.',
      }).code
    ).toBe('auth/missing-client-identifier');

    expect(
      normalizeNativeFirebaseAuthError({
        message: 'This app is not authorized to use Firebase Authentication. Please verify that the correct package name and SHA-1 are configured.',
      }).code
    ).toBe('auth/app-not-authorized');

    expect(
      normalizeNativeFirebaseAuthError({
        code: 'ERROR_INVALID_VERIFICATION_CODE',
        message: 'The sms verification code used to create the phone auth credential is invalid.',
      }).code
    ).toBe('auth/invalid-verification-code');

    expect(
      normalizeNativeFirebaseAuthError({
        message: 'The sms code has expired. Please re-send the verification code to try again.',
      }).code
    ).toBe('auth/code-expired');

    expect(
      normalizeNativeFirebaseAuthError({
        message: 'We have blocked all requests from this device due to unusual activity. Try again later.',
      }).code
    ).toBe('auth/too-many-requests');
  });

  it('arms native SMS User Consent ONLY after OTP is sent and OTP input is shown', () => {
    expect(
      shouldArmNativeSmsConsent({
        authStep: 'primary',
        isPhone: true,
        otpSent: false,
        showSecondField: false,
        otpAttemptId: 1,
      })
    ).toBe(false);

    expect(
      shouldArmNativeSmsConsent({
        authStep: 'primary',
        isPhone: true,
        otpSent: true,
        showSecondField: true,
        otpAttemptId: 1,
      })
    ).toBe(true);

    expect(
      shouldArmNativeSmsConsent({
        authStep: 'personal_info',
        isPhone: true,
        otpSent: true,
        showSecondField: true,
        otpAttemptId: 1,
      })
    ).toBe(false);
    expect(
      shouldArmNativeSmsConsent({
        authStep: 'primary',
        isPhone: false,
        otpSent: true,
        showSecondField: true,
        otpAttemptId: 1,
      })
    ).toBe(false);
  });

  it('generates distinct sequential DOM slot IDs so reCAPTCHA never reuses a rendered element', () => {
    const slot1 = buildRecaptchaSlotId('recaptcha-container', 1);
    const slot2 = buildRecaptchaSlotId('recaptcha-container', 2);
    expect(slot1).toBe('recaptcha-container-slot-1');
    expect(slot2).toBe('recaptcha-container-slot-2');
    expect(slot1).not.toBe(slot2);
  });

  it('detects duplicate reCAPTCHA render errors accurately', () => {
    expect(
      isRecaptchaAlreadyRenderedError(
        new Error('reCAPTCHA has already been rendered in this element')
      )
    ).toBe(true);
    expect(
      isRecaptchaAlreadyRenderedError('Firebase Phone Auth: reCAPTCHA has already been rendered in this element')
    ).toBe(true);
    expect(
      isRecaptchaAlreadyRenderedError(new Error('auth/too-many-requests'))
    ).toBe(false);
  });

  it('strictly parses Indian mobile numbers and rejects overlong or invalid prefixes', () => {
    expect(parseIndianMobileNumber('9876543210')).toEqual({
      valid: true,
      clean10: '9876543210',
      e164: '+919876543210',
    });
    expect(parseIndianMobileNumber('09876543210').e164).toBe('+919876543210');
    expect(parseIndianMobileNumber('+91 98765-43210').e164).toBe('+919876543210');

    // Must reject 13-digit input instead of silently slicing last 10 digits
    expect(parseIndianMobileNumber('9876543210123').valid).toBe(false);
    // Must reject invalid Indian mobile starting digit (1-5)
    expect(parseIndianMobileNumber('1234567890').valid).toBe(false);
    expect(parseIndianMobileNumber('5123456789').valid).toBe(false);
    // Must reject emails
    expect(parseIndianMobileNumber('user9876543210@example.com').valid).toBe(false);
  });

  it('resets active OTP session when user edits phone number away from sentToPhone', () => {
    expect(
      shouldResetOtpSessionOnIdentifierChange({
        otpSent: true,
        sentToPhone: '+919876543210',
        nextIdentifier: '9876543210',
      })
    ).toBe(false);

    expect(
      shouldResetOtpSessionOnIdentifierChange({
        otpSent: true,
        sentToPhone: '+919876543210',
        nextIdentifier: '9876543211',
      })
    ).toBe(true);

    expect(
      shouldResetOtpSessionOnIdentifierChange({
        otpSent: true,
        sentToPhone: '+919876543210',
        nextIdentifier: '987654321',
      })
    ).toBe(true);

    expect(
      shouldResetOtpSessionOnIdentifierChange({
        otpSent: false,
        sentToPhone: '+919876543210',
        nextIdentifier: '9876543211',
      })
    ).toBe(false);
  });

  it('guards pending OTP restoration against active requests, different identifiers, and profile_update OTPs', () => {
    expect(
      shouldRestorePendingOtpSession({
        authStep: 'primary',
        hasCompletedAuth: false,
        isBusy: false,
        currentIdentifier: '',
        pendingPhone: '+919876543210',
        pendingPurpose: 'login',
      })
    ).toBe(true);

    // Must NOT clobber mid-send or mid-verify
    expect(
      shouldRestorePendingOtpSession({
        authStep: 'primary',
        hasCompletedAuth: false,
        isBusy: true,
        currentIdentifier: '9876543210',
        pendingPhone: '+919876543210',
        pendingPurpose: 'login',
      })
    ).toBe(false);

    // Must NOT leak profile_update OTP into LoginPage
    expect(
      shouldRestorePendingOtpSession({
        authStep: 'primary',
        hasCompletedAuth: false,
        isBusy: false,
        currentIdentifier: '',
        pendingPhone: '+919876543210',
        pendingPurpose: 'profile_update',
      })
    ).toBe(false);

    // Must NOT hijack when user typed an email or another number
    expect(
      shouldRestorePendingOtpSession({
        authStep: 'primary',
        hasCompletedAuth: false,
        isBusy: false,
        currentIdentifier: 'alice@smartrun.in',
        pendingPhone: '+919876543210',
        pendingPurpose: 'login',
      })
    ).toBe(false);

    expect(
      shouldRestorePendingOtpSession({
        authStep: 'primary',
        hasCompletedAuth: false,
        isBusy: false,
        currentIdentifier: '9123456789',
        pendingPhone: '+919876543210',
        pendingPurpose: 'login',
      })
    ).toBe(false);
  });

  it('identifies expired OTP and rate-limit Firebase error codes', () => {
    expect(isExpiredOtpErrorCode('auth/code-expired')).toBe(true);
    expect(isExpiredOtpErrorCode('auth/session-expired')).toBe(true);
    expect(isExpiredOtpErrorCode('auth/invalid-verification-code')).toBe(false);

    expect(isRateLimitErrorCode('auth/too-many-requests')).toBe(true);
    expect(isRateLimitErrorCode('auth/quota-exceeded')).toBe(true);
    expect(isRateLimitErrorCode('auth/network-request-failed')).toBe(false);
  });
});
