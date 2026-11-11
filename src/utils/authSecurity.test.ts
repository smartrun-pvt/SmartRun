import { describe, test, expect } from 'vitest';
import {
  isLegitimateEmail,
  validatePasswordStrength,
  maskPhoneNumber,
  isOtpCodePermitted,
  evaluateLoginAttempt
} from './authSecurity';

describe('SmartRun Auth Security', () => {
  test('isLegitimateEmail rejects malformed or disposable emails', () => {
    expect(isLegitimateEmail('valid.user@gmail.com').valid).toBe(true);
    expect(isLegitimateEmail('spammer@tempmail.com').valid).toBe(false);
    expect(isLegitimateEmail('bot@mailinator.com').valid).toBe(false);
    expect(isLegitimateEmail('invalid-email').valid).toBe(false);
  });

  test('validatePasswordStrength enforces minimum 6 characters', () => {
    expect(validatePasswordStrength('secret123').valid).toBe(true);
    expect(validatePasswordStrength('12345').valid).toBe(false);
    expect(validatePasswordStrength('').valid).toBe(false);
  });

  test('maskPhoneNumber properly masks customer numbers to prevent scraping', () => {
    expect(maskPhoneNumber('9876543210')).toBe('+91 ******3210');
    expect(maskPhoneNumber('+91 8777400280')).toBe('+91 ******0280');
  });

  test('isOtpCodePermitted rejects test bypass codes for real phone numbers', () => {
    // Prohibited for real user phone number even in non-prod
    expect(isOtpCodePermitted('123456', '8777400280', true)).toBe(false);
    expect(isOtpCodePermitted('123456', '9876543210', false)).toBe(false);
    expect(isOtpCodePermitted('582914', '9830012345', false)).toBe(false);

    // Only permitted for virtual sandbox number in non-prod
    expect(isOtpCodePermitted('123456', '9999900000', true)).toBe(true);

    // Normal 6 digit codes are permitted for real verification
    expect(isOtpCodePermitted('849201', '8777400280', false)).toBe(true);
  });

  test('evaluateLoginAttempt locks out account after 5 failed attempts', () => {
    let rec: any = undefined;
    for (let i = 1; i <= 4; i++) {
      const res = evaluateLoginAttempt(rec, 5, 60000);
      expect(res.isLocked).toBe(false);
      rec = res.updatedRecord;
    }
    // 5th attempt triggers lockout
    const res5 = evaluateLoginAttempt(rec, 5, 60000);
    expect(res5.isLocked).toBe(true);
    expect(res5.remainingLockoutSec).toBeGreaterThan(0);
  });
});
