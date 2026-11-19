export const SMARTRUN_SMS_OTP_EVENT = 'smartrun:sms-otp';

export interface SmartRunOtpBridge {
  startListening?: () => void;
  stopListening?: () => void;
  isSupported?: () => boolean;
}

export interface NativeSmsOtpEventDetail {
  code?: string;
  rawMessage?: string;
}

declare global {
  interface Window {
    SmartRunOtp?: SmartRunOtpBridge;
  }
}

/**
 * Extracts up to 6 OTP digits from user input, OS autofill, WebOTP, or pasted SMS text.
 * Avoids grabbing the leading 6 digits of a 10-digit phone number when a full SMS is provided,
 * while preserving partial manual typing (e.g., "123").
 */
export const extractOtpDigits = (raw: string): string => {
  const text = String(raw || '').trim();
  if (!text) return '';

  // Pure digit input (normal typing / standard OS autofill)
  if (/^\d+$/.test(text)) {
    return text.slice(0, 6);
  }

  // Prioritize explicit WebOTP / Firebase / SMS markers
  const explicitOtp =
    text.match(/#(\d{6})\b/) ||
    text.match(/\b(?:otp|code|pin|passcode)\s*(?:is|:|-)?\s*(\d{6})\b/i) ||
    text.match(/\bG-(\d{6})\b/i);
  if (explicitOtp && explicitOtp[1]) {
    return explicitOtp[1];
  }

  // Isolated 6-digit token (skips 10-digit phone numbers)
  const isolatedSix = text.match(/(?:^|[^\d])(\d{6})(?:[^\d]|$)/);
  if (isolatedSix && isolatedSix[1]) {
    return isolatedSix[1];
  }

  // Spaced or hyphenated 3+3 format (e.g. "482 910" or "482-910")
  const splitSix = text.match(/(?:^|[^\d])(\d{3})[\s-](\d{3})(?:[^\d]|$)/);
  if (splitSix && splitSix[1] && splitSix[2]) {
    return `${splitSix[1]}${splitSix[2]}`;
  }

  return text.replace(/\D/g, '').slice(0, 6);
};

/**
 * Strict SMS OTP extractor used for automated SMS autofill bridges (Google Play Services
 * SMS User Consent API & WebOTP). Returns a 6-digit OTP only when a clear 6-digit code
 * is present, ignoring unrelated messages or 10-digit helpline numbers.
 */
export const extractOtpFromSmsMessage = (raw: string): string => {
  const text = String(raw || '').trim();
  if (!text) return '';

  if (/^\d{6}$/.test(text)) {
    return text;
  }

  const explicitOtp =
    text.match(/#(\d{6})\b/) ||
    text.match(/\b(?:otp|code|pin|passcode)\s*(?:is|:|-)?\s*(\d{6})\b/i) ||
    text.match(/\bG-(\d{6})\b/i);
  if (explicitOtp && explicitOtp[1]) {
    return explicitOtp[1];
  }

  const isolatedSix = text.match(/(?:^|[^\d])(\d{6})(?:[^\d]|$)/);
  if (isolatedSix && isolatedSix[1]) {
    return isolatedSix[1];
  }

  const splitSix = text.match(/(?:^|[^\d])(\d{3})[\s-](\d{3})(?:[^\d]|$)/);
  if (splitSix && splitSix[1] && splitSix[2]) {
    return `${splitSix[1]}${splitSix[2]}`;
  }

  return '';
};

/**
 * Checks whether the native Android Google Play Services SMS User Consent bridge is available.
 */
export const isNativeSmsAutofillSupported = (win: Window | undefined = typeof window !== 'undefined' ? window : undefined): boolean => {
  if (!win?.SmartRunOtp || typeof win.SmartRunOtp.startListening !== 'function') {
    return false;
  }
  try {
    if (typeof win.SmartRunOtp.isSupported === 'function') {
      return Boolean(win.SmartRunOtp.isSupported());
    }
    return true;
  } catch {
    return false;
  }
};

/**
 * Arms Google Play Services SMS User Consent API on Android so that when an OTP SMS arrives,
 * Google's native bottom-sheet autofill prompt ("Allow SmartRun to read the message below
 * and enter the code?") appears automatically, identical to Uber's login flow.
 */
export const startNativeSmsOtpAutofill = (win: Window | undefined = typeof window !== 'undefined' ? window : undefined): boolean => {
  if (!isNativeSmsAutofillSupported(win)) {
    return false;
  }
  try {
    win!.SmartRunOtp!.startListening!();
    return true;
  } catch {
    return false;
  }
};

/**
 * Stops the native Android Google Play Services SMS User Consent listener.
 */
export const stopNativeSmsOtpAutofill = (win: Window | undefined = typeof window !== 'undefined' ? window : undefined): void => {
  try {
    win?.SmartRunOtp?.stopListening?.();
  } catch {
    // Ignore teardown errors
  }
};

/**
 * Subscribes to OTP codes delivered by the native Android Google SMS User Consent bridge.
 */
export const subscribeNativeSmsOtpAutofill = (
  onOtp: (code: string, rawMessage?: string) => void,
  win: Window | undefined = typeof window !== 'undefined' ? window : undefined
): (() => void) => {
  if (!win || typeof win.addEventListener !== 'function') {
    return () => {};
  }

  const handleEvent = (event: Event) => {
    const detail = (event as CustomEvent<NativeSmsOtpEventDetail>)?.detail;
    if (!detail) return;
    const candidate = detail.code ? extractOtpFromSmsMessage(detail.code) : '';
    const extracted = candidate.length === 6 ? candidate : extractOtpFromSmsMessage(detail.rawMessage || '');
    if (extracted.length === 6) {
      onOtp(extracted, detail.rawMessage);
    }
  };

  win.addEventListener(SMARTRUN_SMS_OTP_EVENT, handleEvent as EventListener);
  return () => {
    win.removeEventListener(SMARTRUN_SMS_OTP_EVENT, handleEvent as EventListener);
  };
};
