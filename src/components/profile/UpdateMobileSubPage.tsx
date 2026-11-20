import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { UserProfile } from '../../types';
import { saveUserProfile, cleanPhoneAutofill } from '../../services/supabaseService';
import {
  sendFirebasePhoneOtp,
  verifyPhoneOtpOnly,
  resetRecaptchaVerifier,
  clearPendingPhoneOtpSession
} from '../../services/firebaseAuthService';
import { parseIndianMobileNumber } from '../../utils/firebaseAuthDomain';
import { extractOtpDigits } from '../../utils/otpAutofill';
import { showToast } from '../../utils/toast';
import { ProfileSubPageNavbar } from './ProfileSubPageNavbar';

interface UpdateMobileSubPageProps {
  userProfile: UserProfile | null;
  onBack: () => void;
  onProfileUpdated?: (updated: UserProfile) => void;
}

export const UpdateMobileSubPage: React.FC<UpdateMobileSubPageProps> = ({
  userProfile,
  onBack,
  onProfileUpdated
}) => {
  const currentPhone = userProfile?.phone ? cleanPhoneAutofill(userProfile.phone) : '';
  const [newPhone, setNewPhone] = useState('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const digitInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const isMountedRef = useRef(true);
  const isVerifyingRef = useRef(false);

  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const parsedNewPhone = parseIndianMobileNumber(newPhone);
  const cleanNewPhone = parsedNewPhone.valid ? parsedNewPhone.clean10 : cleanPhoneAutofill(newPhone.trim());
  const isValidLength = parsedNewPhone.valid;
  const isSameAsCurrent = Boolean(cleanNewPhone && cleanNewPhone === currentPhone);

  // Clean up reCAPTCHA and pending profile-update OTP session on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      resetRecaptchaVerifier('recaptcha-container');
      clearPendingPhoneOtpSession();
    };
  }, []);

  // Countdown timer for OTP
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (timer > 0) {
      t = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(t);
  }, [timer]);

  const persistVerifiedPhone = async (verifiedClean10: string) => {
    if (!isMountedRef.current) return;
    setIsVerified(true);
    setIsSaving(true);
    clearPendingPhoneOtpSession();
    resetRecaptchaVerifier('recaptcha-container');

    try {
      await saveUserProfile({
        name: userProfile?.name,
        phone: verifiedClean10,
        phoneVerified: true,
        email: userProfile?.email,
        dob: userProfile?.dob,
        photoURL: userProfile?.photoURL
      });

      const updatedProfile: UserProfile = {
        ...userProfile,
        name: userProfile?.name || 'Customer',
        phone: verifiedClean10,
        phoneVerified: true,
        email: userProfile?.email || '',
        refundBalance: userProfile?.refundBalance || 0,
        cashbackBalance: userProfile?.cashbackBalance || 0,
        walletBalance: userProfile?.walletBalance || 0
      };

      if (onProfileUpdated) {
        onProfileUpdated(updatedProfile);
      }
      showToast('Mobile number updated successfully!', 'success');
      setTimeout(() => {
        if (isMountedRef.current) {
          onBack();
        }
      }, 1200);
    } finally {
      if (isMountedRef.current) {
        setIsSaving(false);
      }
    }
  };

  // Dispatch OTP via Google Firebase Phone Auth
  const handleSendOtp = async () => {
    if (!parsedNewPhone.valid) {
      setError(parsedNewPhone.error || 'Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (isSameAsCurrent) {
      setError('New mobile number cannot be the same as your current number.');
      return;
    }

    const targetClean10 = parsedNewPhone.clean10;
    setError(null);
    setIsSendingOtp(true);

    try {
      const res = await sendFirebasePhoneOtp(targetClean10, 'recaptcha-container', {
        purpose: 'profile_update',
        onAutoFillOtp: (autoCode) => {
          if (!isMountedRef.current || isVerifyingRef.current) return;
          const six = extractOtpDigits(autoCode).slice(0, 6);
          if (six.length === 6) {
            setIsOtpSent(true);
            setOtpDigits(six.split(''));
            handleVerifyOtp(six, targetClean10);
          }
        },
        onNativeVerificationCompleted: async () => {
          if (!isMountedRef.current || isVerifyingRef.current) return;
          isVerifyingRef.current = true;
          setIsVerifying(true);
          try {
            await persistVerifiedPhone(targetClean10);
          } catch (saveErr: any) {
            if (isMountedRef.current) {
              setIsVerified(false);
              setError(saveErr?.message || 'Failed to save verified mobile number.');
            }
          } finally {
            isVerifyingRef.current = false;
            if (isMountedRef.current) {
              setIsVerifying(false);
            }
          }
        }
      });

      if (!isMountedRef.current) return;

      if (!res.success) {
        setError(res.error || 'Failed to dispatch verification code via Firebase. Please try again.');
      } else if (res.autoVerified) {
        setIsOtpSent(true);
        setTimer(60);
      } else {
        setIsOtpSent(true);
        setTimer(60);
        setOtpDigits(['', '', '', '', '', '']);
        showToast(`OTP sent to +91 ${targetClean10}`, 'info');
        setTimeout(() => digitInputRefs.current[0]?.focus(), 150);
      }
    } catch (err: any) {
      if (isMountedRef.current) {
        setError(err?.message || 'Could not send Firebase OTP.');
      }
    } finally {
      if (isMountedRef.current) {
        setIsSendingOtp(false);
      }
    }
  };

  // Verify OTP via Firebase Phone Auth
  const handleVerifyOtp = async (codeOverride?: string, phoneOverride?: string) => {
    if (isVerifyingRef.current) return;
    const code = extractOtpDigits(codeOverride || otpDigits.join(''));
    if (code.length !== 6) {
      setError('Please enter the full 6-digit OTP code.');
      return;
    }

    const targetClean10 = phoneOverride || cleanNewPhone;
    const parsedTarget = parseIndianMobileNumber(targetClean10);
    if (!parsedTarget.valid) {
      setError(parsedTarget.error || 'Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setError(null);
    isVerifyingRef.current = true;
    setIsVerifying(true);

    try {
      const res = await verifyPhoneOtpOnly(code, parsedTarget.e164);
      if (!isMountedRef.current) return;

      if (!res.success) {
        setError(res.error || 'Invalid or expired OTP. Please check the code.');
        return;
      }

      await persistVerifiedPhone(parsedTarget.clean10);
    } catch (err: any) {
      if (isMountedRef.current) {
        setIsVerified(false);
        setError(err?.message || 'Firebase verification failed. Please try again.');
      }
    } finally {
      isVerifyingRef.current = false;
      if (isMountedRef.current) {
        setIsVerifying(false);
      }
    }
  };

  const applyPastedOrAutofilledDigits = (raw: string) => {
    const cleaned = extractOtpDigits(raw);
    if (!cleaned) return false;
    const six = cleaned.slice(0, 6).split('');
    const next = ['', '', '', '', '', ''];
    for (let i = 0; i < six.length; i++) next[i] = six[i];
    setOtpDigits(next);
    setError(null);
    if (six.length === 6) {
      handleVerifyOtp(six.join(''));
    } else {
      digitInputRefs.current[Math.min(six.length, 5)]?.focus();
    }
    return true;
  };

  const handleDigitChange = (index: number, val: string) => {
    const cleaned = val.replace(/\D/g, '');
    if (!cleaned) {
      const next = [...otpDigits];
      next[index] = '';
      setOtpDigits(next);
      return;
    }

    if (cleaned.length > 1) {
      applyPastedOrAutofilledDigits(cleaned);
      return;
    }

    const next = [...otpDigits];
    next[index] = cleaned;
    setOtpDigits(next);
    setError(null);

    if (index < 5) {
      digitInputRefs.current[index + 1]?.focus();
    } else {
      const full = [...next];
      full[5] = cleaned;
      if (full.every((d) => d.length === 1)) {
        handleVerifyOtp(full.join(''));
      }
    }
  };

  const handleDigitPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData?.getData('text') || '';
    const digits = extractOtpDigits(pasted);
    if (digits.length >= 2) {
      e.preventDefault();
      applyPastedOrAutofilledDigits(digits);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      digitInputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 overflow-x-clip">
      <ProfileSubPageNavbar
        title="Mobile No. Update"
        onBack={onBack}
        backTitle="Back to Security"
        backAriaLabel="Back to Security"
      />

      <div
        className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-4 sm:py-6 space-y-5"
        style={{
          paddingLeft: 'max(1rem, var(--safe-area-left, env(safe-area-inset-left, 0px)))',
          paddingRight: 'max(1rem, var(--safe-area-right, env(safe-area-inset-right, 0px)))'
        }}
      >
        {/* Current Phone Status */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Current Mobile Number
          </p>
          <p className="text-base font-bold text-slate-900 flex items-center gap-2 tabular-nums">
            <Smartphone className="w-4 h-4 text-slate-600 shrink-0" />
            <span>{currentPhone ? `+91 ${currentPhone}` : 'No phone number linked'}</span>
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span className="min-w-0 flex-1 break-words">{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {isVerified && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Mobile number updated successfully!</span>
          </div>
        )}

        {/* New Mobile Number Input Form */}
        {!isVerified && (
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                New Mobile Number
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-xs font-bold text-slate-500 select-none">
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  disabled={isOtpSent || isSaving}
                  value={newPhone}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setNewPhone(digits);
                    setError(null);
                  }}
                  placeholder="Enter 10-digit number"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 bg-white disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>
            </div>

            {/* Send OTP Button (when OTP not yet sent) */}
            {!isOtpSent && (
              <button
                type="button"
                disabled={!isValidLength || isSendingOtp || isSameAsCurrent}
                onClick={handleSendOtp}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer disabled:opacity-40 flex items-center justify-center gap-2"
              >
                {isSendingOtp ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Sending Firebase OTP...</span>
                  </>
                ) : (
                  <span>Send Firebase OTP</span>
                )}
              </button>
            )}

            {/* OTP Verification Section (after OTP is sent) */}
            {isOtpSent && (
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs text-slate-600 font-medium min-w-0 flex-1 break-words">
                    Enter the 6-digit code sent to <strong className="text-slate-900 whitespace-nowrap">+91 {cleanNewPhone}</strong>
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      clearPendingPhoneOtpSession();
                      resetRecaptchaVerifier('recaptcha-container');
                      setIsOtpSent(false);
                      setTimer(0);
                      setOtpDigits(['', '', '', '', '', '']);
                      setError(null);
                    }}
                    className="text-[11px] text-slate-500 hover:text-slate-900 font-bold underline cursor-pointer shrink-0"
                  >
                    Change
                  </button>
                </div>

                {/* 6 Responsive OTP boxes */}
                <div className="grid grid-cols-6 gap-1.5 sm:gap-2.5 max-w-sm">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => { digitInputRefs.current[idx] = el; }}
                      type="text"
                      inputMode="numeric"
                      autoComplete={idx === 0 ? 'one-time-code' : 'off'}
                      maxLength={idx === 0 ? 6 : 1}
                      value={digit}
                      onChange={(e) => handleDigitChange(idx, e.target.value)}
                      onPaste={handleDigitPaste}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      aria-label={`OTP digit ${idx + 1}`}
                      className="w-full h-11 sm:h-12 text-center text-base sm:text-lg font-black tabular-nums rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white shadow-2xs"
                    />
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <button
                    type="button"
                    disabled={timer > 0 || isSendingOtp}
                    onClick={handleSendOtp}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-40 cursor-pointer tabular-nums"
                  >
                    {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
                  </button>

                  <button
                    type="button"
                    disabled={otpDigits.some((d) => !d) || isVerifying || isSaving}
                    onClick={() => handleVerifyOtp()}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs transition-all shadow-xs cursor-pointer disabled:opacity-40 flex items-center gap-1.5 shrink-0"
                  >
                    {isVerifying || isSaving ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <span>Verify &amp; Update</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
