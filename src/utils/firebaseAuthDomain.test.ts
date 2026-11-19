import { describe, it, expect } from 'vitest';
import {
  PRODUCTION_FIREBASE_AUTH_DOMAIN,
  resolveFirebaseAuthDomainForEnv,
  shouldArmNativeSmsConsent,
} from './firebaseAuthDomain';

describe('firebaseAuthDomain helpers', () => {
  it('uses smartrun.in on native Android/iOS builds instead of firebaseapp.com', () => {
    expect(
      resolveFirebaseAuthDomainForEnv({
        configuredDomain: '',
        isNativePlatform: true,
        windowHostname: 'localhost',
        fallbackAuthDomain: 'gen-lang-client-0708778333.firebaseapp.com',
      })
    ).toBe(PRODUCTION_FIREBASE_AUTH_DOMAIN);
  });

  it('respects explicit VITE_FIREBASE_AUTH_DOMAIN override', () => {
    expect(
      resolveFirebaseAuthDomainForEnv({
        configuredDomain: 'auth.smartrun.in',
        isNativePlatform: true,
        windowHostname: 'localhost',
        fallbackAuthDomain: 'gen-lang-client-0708778333.firebaseapp.com',
      })
    ).toBe('auth.smartrun.in');
  });

  it('uses smartrun.in / www.smartrun.in on production web', () => {
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
    ).toBe('smartrun.in');
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

  it('arms native SMS User Consent ONLY after OTP is sent and OTP input is shown', () => {
    // Before OTP is sent (e.g. while Firebase captcha/Play Integrity is still running) -> MUST NOT arm
    expect(
      shouldArmNativeSmsConsent({
        authStep: 'primary',
        isPhone: true,
        otpSent: false,
        showSecondField: false,
        otpAttemptId: 1,
      })
    ).toBe(false);

    // After OTP is sent and OTP input is active on primary step -> ARM
    expect(
      shouldArmNativeSmsConsent({
        authStep: 'primary',
        isPhone: true,
        otpSent: true,
        showSecondField: true,
        otpAttemptId: 1,
      })
    ).toBe(true);

    // Email login or post-login onboarding step -> MUST NOT arm
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
});
