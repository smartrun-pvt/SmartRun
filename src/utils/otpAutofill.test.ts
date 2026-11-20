import { describe, it, expect, vi } from 'vitest';
import {
  SMARTRUN_SMS_OTP_EVENT,
  extractOtpDigits,
  extractOtpFromSmsMessage,
  isNativeSmsAutofillSupported,
  startNativeSmsOtpAutofill,
  stopNativeSmsOtpAutofill,
  subscribeNativeSmsOtpAutofill,
  getNativePendingPhoneVerification,
  clearNativePendingPhoneVerification
} from './otpAutofill';

describe('otpAutofill utilities', () => {
  describe('extractOtpDigits', () => {
    it('extracts pure digits and limits to 6 characters for typing', () => {
      expect(extractOtpDigits('482')).toBe('482');
      expect(extractOtpDigits('482910')).toBe('482910');
      expect(extractOtpDigits('48291099')).toBe('482910');
    });

    it('extracts 6-digit OTP from Firebase WebOTP and SMS templates', () => {
      expect(extractOtpDigits('482910 is your verification code for smartrun.in.\n\n@smartrun.in #482910')).toBe('482910');
      expect(extractOtpDigits('Your SmartRun OTP is 915204. Valid for 5 minutes.')).toBe('915204');
      expect(extractOtpDigits('G-739102 is your Google verification code.')).toBe('739102');
      expect(extractOtpDigits('Use code: 604819 to sign in.')).toBe('604819');
    });

    it('ignores 10-digit phone numbers in SMS and grabs the isolated 6-digit OTP', () => {
      expect(
        extractOtpDigits('Call 8777400280 for help. 518392 is your SmartRun verification code.')
      ).toBe('518392');
    });

    it('handles spaced or hyphenated 3+3 OTP formats', () => {
      expect(extractOtpDigits('Your verification code is 482 910.')).toBe('482910');
      expect(extractOtpDigits('Enter 482-910 to continue.')).toBe('482910');
    });
  });

  describe('extractOtpFromSmsMessage', () => {
    it('returns empty string for promotional SMS with only a 10-digit phone number', () => {
      expect(extractOtpFromSmsMessage('Call 8777400280 now for electrical wholesale offers!')).toBe('');
      expect(extractOtpFromSmsMessage('Order #42 dispatched')).toBe('');
    });

    it('extracts valid 6-digit OTPs accurately from full SMS payloads', () => {
      expect(extractOtpFromSmsMessage('651920 is your verification code for smartrun.in.')).toBe('651920');
      expect(extractOtpFromSmsMessage('SmartRun OTP: 309412. Do not share with anyone.')).toBe('309412');
    });
  });

  describe('native Android Google SMS User Consent bridge', () => {
    it('reports unsupported safely when bridge is absent', () => {
      const mockWin = {} as unknown as Window;
      expect(isNativeSmsAutofillSupported(mockWin)).toBe(false);
      expect(startNativeSmsOtpAutofill(mockWin)).toBe(false);
      expect(() => stopNativeSmsOtpAutofill(mockWin)).not.toThrow();
    });

    it('invokes startListening and stopListening when bridge is present', () => {
      const startListening = vi.fn();
      const stopListening = vi.fn();
      const mockWin = {
        SmartRunOtp: {
          isSupported: () => true,
          startListening,
          stopListening
        }
      } as unknown as Window;

      expect(isNativeSmsAutofillSupported(mockWin)).toBe(true);
      expect(startNativeSmsOtpAutofill(mockWin)).toBe(true);
      expect(startListening).toHaveBeenCalledTimes(1);

      stopNativeSmsOtpAutofill(mockWin);
      expect(stopListening).toHaveBeenCalledTimes(1);
    });

    it('subscribes to smartrun:sms-otp events and extracts the 6-digit OTP', () => {
      const listeners = new Map<string, EventListener>();
      const mockWin = {
        addEventListener: (name: string, fn: EventListener) => listeners.set(name, fn),
        removeEventListener: (name: string) => listeners.delete(name)
      } as unknown as Window;

      const onOtp = vi.fn();
      const unsubscribe = subscribeNativeSmsOtpAutofill(onOtp, mockWin);

      const handler = listeners.get(SMARTRUN_SMS_OTP_EVENT);
      expect(handler).toBeDefined();

      // Dispatch raw SMS message without pre-parsed code
      handler!({
        detail: {
          rawMessage: 'Your SmartRun login code is 841920. Do not share.'
        }
      } as unknown as Event);

      expect(onOtp).toHaveBeenCalledTimes(1);
      expect(onOtp).toHaveBeenCalledWith('841920', 'Your SmartRun login code is 841920. Do not share.');

      // Unrelated SMS without 6-digit code should be ignored
      handler!({
        detail: {
          rawMessage: 'Support helpline: 8777400280'
        }
      } as unknown as Event);
      expect(onOtp).toHaveBeenCalledTimes(1);

      unsubscribe();
      expect(listeners.has(SMARTRUN_SMS_OTP_EVENT)).toBe(false);
    });

    it('hydrates and clears native SharedPreferences pending Firebase verificationId across restarts', () => {
      const clearPendingVerification = vi.fn();
      const now = Date.now();
      const validWin = {
        SmartRunOtp: {
          getPendingVerification: () =>
            JSON.stringify({
              verificationId: 'verif-abc-123',
              phone: '+919876543210',
              timestamp: now - 30_000
            }),
          clearPendingVerification
        }
      } as unknown as Window;

      expect(getNativePendingPhoneVerification(validWin)).toEqual({
        verificationId: 'verif-abc-123',
        phone: '+919876543210',
        timestamp: now - 30_000
      });

      // Expired (>10 min) verificationId must be ignored
      const expiredWin = {
        SmartRunOtp: {
          getPendingVerification: () =>
            JSON.stringify({
              verificationId: 'verif-old',
              phone: '+919876543210',
              timestamp: now - 15 * 60 * 1000
            })
        }
      } as unknown as Window;
      expect(getNativePendingPhoneVerification(expiredWin)).toBeNull();

      // Malformed JSON should safely return null
      const brokenWin = {
        SmartRunOtp: {
          getPendingVerification: () => '{bad json'
        }
      } as unknown as Window;
      expect(getNativePendingPhoneVerification(brokenWin)).toBeNull();

      clearNativePendingPhoneVerification(validWin);
      expect(clearPendingVerification).toHaveBeenCalledTimes(1);

      // Extract OTP cleanly from Firebase fallback SMS format
      expect(
        extractOtpFromSmsMessage('231710 is your verification code for gen-lang-client-0708778333.firebaseapp.com.')
      ).toBe('231710');
    });
  });
});
