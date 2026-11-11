/**
 * Authentication & Login Security Utilities
 * Pure helper functions for input sanitization, PII masking, disposable email detection,
 * and rate-limiting guardrails.
 */

// Known disposable / temporary email domains used by automated spam bots
export const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  '10minutemail.com',
  'guerrillamail.com',
  'yopmail.com',
  'sharklasers.com',
  'trashmail.com',
  'throwawaymail.com',
  'dispostable.com',
  'fakeinbox.com',
  'getairmail.com',
  'maildrop.cc'
]);

/**
 * Validates whether an email is structurally valid and not from a known disposable provider.
 */
export function isLegitimateEmail(email: string): { valid: boolean; reason?: string } {
  const clean = String(email || '').trim().toLowerCase();
  if (!clean || !clean.includes('@')) {
    return { valid: false, reason: 'Invalid email structure.' };
  }
  const parts = clean.split('@');
  if (parts.length !== 2 || !parts[0] || !parts[1] || !parts[1].includes('.')) {
    return { valid: false, reason: 'Invalid email domain.' };
  }
  const domain = parts[1];
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return { valid: false, reason: 'Temporary or disposable email addresses are not permitted.' };
  }
  return { valid: true };
}

/**
 * Validates password strength for user registration.
 */
export function validatePasswordStrength(password: string): { valid: boolean; reason?: string } {
  const clean = String(password || '').trim();
  if (!clean) {
    return { valid: false, reason: 'Password cannot be empty.' };
  }
  if (clean.length < 6) {
    return { valid: false, reason: 'Password must be at least 6 characters long.' };
  }
  if (clean.length > 128) {
    return { valid: false, reason: 'Password cannot exceed 128 characters.' };
  }
  return { valid: true };
}

/**
 * Masks a phone number to prevent PII harvesting by unauthenticated scrapers.
 * e.g. "9876543210" -> "+91 ******3210"
 */
export function maskPhoneNumber(phone: string): string {
  const digits = String(phone || '').replace(/\D/g, '').slice(-10);
  if (digits.length < 4) return '******';
  return `+91 ******${digits.slice(-4)}`;
}

/**
 * Validates whether an OTP is legitimate (not a hardcoded backdoor code).
 * Strictly forbids test code bypasses for real users and admin numbers.
 */
export function isOtpCodePermitted(
  otp: string,
  phone: string,
  isNonProd: boolean
): boolean {
  const cleanOtp = String(otp || '').trim();
  const cleanPhone = String(phone || '').replace(/\D/g, '').slice(-10);

  // Prohibited test codes
  if (cleanOtp === '123456' || cleanOtp === '582914') {
    // Only permitted if explicitly in a non-production environment AND targeting the dedicated virtual sandbox number
    if (isNonProd && cleanPhone === '9999900000') {
      return true;
    }
    // Strictly forbidden for all real customer phone numbers and admin number 8777400280
    return false;
  }

  // Real OTPs must be 6 digits
  return /^\d{6}$/.test(cleanOtp);
}

/**
 * Evaluates whether an account or IP is locked out due to repeated failed login attempts.
 */
export interface LockoutRecord {
  count: number;
  lockedUntil: number;
}

export function evaluateLoginAttempt(
  record: LockoutRecord | undefined,
  maxAttempts: number = 5,
  lockoutDurationMs: number = 15 * 60 * 1000
): { isLocked: boolean; remainingLockoutSec: number; updatedRecord: LockoutRecord } {
  const now = Date.now();
  if (record && record.lockedUntil > now) {
    const remainingLockoutSec = Math.ceil((record.lockedUntil - now) / 1000);
    return { isLocked: true, remainingLockoutSec, updatedRecord: record };
  }

  const isLockExpired = Boolean(record && record.lockedUntil > 0 && record.lockedUntil <= now);
  const currentCount = isLockExpired ? 0 : (record?.count || 0);
  const newCount = currentCount + 1;
  const lockedUntil = newCount >= maxAttempts ? now + lockoutDurationMs : 0;

  return {
    isLocked: newCount >= maxAttempts,
    remainingLockoutSec: newCount >= maxAttempts ? Math.ceil(lockoutDurationMs / 1000) : 0,
    updatedRecord: {
      count: newCount,
      lockedUntil
    }
  };
}
