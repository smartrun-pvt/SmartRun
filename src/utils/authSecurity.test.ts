import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isLegitimateEmail,
  validatePasswordStrength,
  maskPhoneNumber,
  isOtpCodePermitted,
  evaluateLoginAttempt
} from './authSecurity';

test('isLegitimateEmail rejects malformed or disposable emails', () => {
  assert.equal(isLegitimateEmail('valid.user@gmail.com').valid, true);
  assert.equal(isLegitimateEmail('spammer@tempmail.com').valid, false);
  assert.equal(isLegitimateEmail('bot@mailinator.com').valid, false);
  assert.equal(isLegitimateEmail('invalid-email').valid, false);
});

test('validatePasswordStrength enforces minimum 6 characters', () => {
  assert.equal(validatePasswordStrength('secret123').valid, true);
  assert.equal(validatePasswordStrength('12345').valid, false);
  assert.equal(validatePasswordStrength('').valid, false);
});

test('maskPhoneNumber properly masks customer numbers to prevent scraping', () => {
  assert.equal(maskPhoneNumber('9876543210'), '+91 ******3210');
  assert.equal(maskPhoneNumber('+91 8777400280'), '+91 ******0280');
});

test('isOtpCodePermitted rejects test bypass codes for real phone numbers', () => {
  // Prohibited for real user phone number even in non-prod
  assert.equal(isOtpCodePermitted('123456', '8777400280', true), false);
  assert.equal(isOtpCodePermitted('123456', '9876543210', false), false);
  assert.equal(isOtpCodePermitted('582914', '9830012345', false), false);

  // Only permitted for virtual sandbox number in non-prod
  assert.equal(isOtpCodePermitted('123456', '9999900000', true), true);

  // Normal 6 digit codes are permitted for real verification
  assert.equal(isOtpCodePermitted('849201', '8777400280', false), true);
});

test('evaluateLoginAttempt locks out account after 5 failed attempts', () => {
  let rec: any = undefined;
  for (let i = 1; i <= 4; i++) {
    const res = evaluateLoginAttempt(rec, 5, 60000);
    assert.equal(res.isLocked, false);
    rec = res.updatedRecord;
  }
  // 5th attempt triggers lockout
  const res5 = evaluateLoginAttempt(rec, 5, 60000);
  assert.equal(res5.isLocked, true);
  assert.ok(res5.remainingLockoutSec > 0);
});
