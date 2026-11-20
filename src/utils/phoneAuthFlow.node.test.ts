import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseIndianMobileNumber,
  shouldResetOtpSessionOnIdentifierChange,
  shouldRestorePendingOtpSession,
  isExpiredOtpErrorCode,
  isRateLimitErrorCode,
  normalizeNativeFirebaseAuthError,
  buildRecaptchaSlotId,
  isRecaptchaAlreadyRenderedError,
} from './firebaseAuthDomain';
import { extractOtpDigits } from './otpAutofill';

test('parseIndianMobileNumber accepts valid Indian formats and rejects overlong/invalid inputs', () => {
  assert.deepEqual(parseIndianMobileNumber('9876543210'), {
    valid: true,
    clean10: '9876543210',
    e164: '+919876543210',
  });
  assert.equal(parseIndianMobileNumber('+91 87774 00280').e164, '+918777400280');
  assert.equal(parseIndianMobileNumber('07001234567').clean10, '7001234567');

  // Regression: never silently truncate 13-digit numbers to a different phone
  assert.equal(parseIndianMobileNumber('9876543210123').valid, false);
  // Regression: reject non-Indian mobile prefixes 0-5
  assert.equal(parseIndianMobileNumber('1234567890').valid, false);
  assert.equal(parseIndianMobileNumber('5999999999').valid, false);
  // Reject email strings
  assert.equal(parseIndianMobileNumber('test9876543210@smartrun.in').valid, false);
});

test('shouldResetOtpSessionOnIdentifierChange invalidates stale OTP when phone changes', () => {
  assert.equal(
    shouldResetOtpSessionOnIdentifierChange({
      otpSent: true,
      sentToPhone: '+919876543210',
      nextIdentifier: '9876543210',
    }),
    false
  );
  assert.equal(
    shouldResetOtpSessionOnIdentifierChange({
      otpSent: true,
      sentToPhone: '+919876543210',
      nextIdentifier: '+91 9876543210',
    }),
    false
  );
  assert.equal(
    shouldResetOtpSessionOnIdentifierChange({
      otpSent: true,
      sentToPhone: '+919876543210',
      nextIdentifier: '9876543219',
    }),
    true
  );
  assert.equal(
    shouldResetOtpSessionOnIdentifierChange({
      otpSent: true,
      sentToPhone: '+919876543210',
      nextIdentifier: 'user@example.com',
    }),
    true
  );
});

test('shouldRestorePendingOtpSession blocks focus hijacking and profile_update leakage', () => {
  assert.equal(
    shouldRestorePendingOtpSession({
      authStep: 'primary',
      hasCompletedAuth: false,
      isBusy: false,
      currentIdentifier: '',
      pendingPhone: '+919876543210',
      pendingPurpose: 'login',
    }),
    true
  );
  assert.equal(
    shouldRestorePendingOtpSession({
      authStep: 'primary',
      hasCompletedAuth: false,
      isBusy: true,
      currentIdentifier: '9876543210',
      pendingPhone: '+919876543210',
      pendingPurpose: 'login',
    }),
    false
  );
  assert.equal(
    shouldRestorePendingOtpSession({
      authStep: 'primary',
      hasCompletedAuth: false,
      isBusy: false,
      currentIdentifier: '',
      pendingPhone: '+919876543210',
      pendingPurpose: 'profile_update',
    }),
    false
  );
  assert.equal(
    shouldRestorePendingOtpSession({
      authStep: 'primary',
      hasCompletedAuth: false,
      isBusy: false,
      currentIdentifier: '9999988888',
      pendingPhone: '+919876543210',
      pendingPurpose: 'login',
    }),
    false
  );
});

test('OTP error classification and SMS digit extraction behave accurately', () => {
  assert.equal(isExpiredOtpErrorCode('auth/code-expired'), true);
  assert.equal(isExpiredOtpErrorCode('auth/session-expired'), true);
  assert.equal(isRateLimitErrorCode('auth/too-many-requests'), true);
  assert.equal(isRateLimitErrorCode('auth/quota-exceeded'), true);
  assert.equal(
    normalizeNativeFirebaseAuthError({
      message: 'The sms code has expired. Please re-send the verification code.',
    }).code,
    'auth/code-expired'
  );
  assert.equal(
    extractOtpDigits('482910 is your SmartRun verification code. @www.smartrun.in #482910'),
    '482910'
  );
  assert.notEqual(
    buildRecaptchaSlotId('recaptcha-container', 1),
    buildRecaptchaSlotId('recaptcha-container', 2)
  );
  assert.equal(
    isRecaptchaAlreadyRenderedError(new Error('reCAPTCHA has already been rendered in this element')),
    true
  );
});
