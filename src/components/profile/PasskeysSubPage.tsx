import React, { useState, useEffect } from 'react';
import { Fingerprint, KeyRound, Plus, Trash2, CheckCircle2, AlertCircle, Loader2, Laptop, Smartphone } from 'lucide-react';
import { UserProfile } from '../../types';
import { apiUrl } from '../../lib/apiBase';
import { supabase } from '../../lib/supabaseClient';
import { ProfileSubPageNavbar } from './ProfileSubPageNavbar';
import {
  createPasskeyCredential,
  getPasskeyPlatformTag,
  isPasskeySupported
} from '../../services/passkeyService';
import { formatPasskeyError } from '../../utils/passkeyHelper';
import { isNativePhoneApp } from '../../utils/platformDetection';

interface PasskeyItem {
  id: string;
  deviceName?: string;
  createdAt: string;
  lastUsedAt?: string;
}

interface PasskeysSubPageProps {
  userProfile: UserProfile | null;
  onBack: () => void;
}

export const PasskeysSubPage: React.FC<PasskeysSubPageProps> = ({ userProfile, onBack }) => {
  const [passkeys, setPasskeys] = useState<PasskeyItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const userId = userProfile?.id || '';
  const isNativeApp = isNativePhoneApp();

  // Check WebAuthn / Native Android Credential Manager support
  useEffect(() => {
    try {
      setIsSupported(isPasskeySupported());
    } catch {
      setIsSupported(false);
    }
  }, []);

  // Fetch registered passkeys for this user (both server-side and Supabase Auth)
  const loadPasskeys = async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      let combined: PasskeyItem[] = [];

      // 1. Fetch from server passkey store
      try {
        const res = await fetch(apiUrl(`/api/auth/passkey/list?userId=${encodeURIComponent(userId)}`));
        const data = await res.json().catch(() => null);
        if (data && data.success && Array.isArray(data.credentials)) {
          combined = [...data.credentials];
        }
      } catch (err) {
        console.debug('[Server Passkeys] Load error:', err);
      }

      // 2. Fetch from Supabase native passkey API if enrolled
      try {
        if ((supabase.auth as any)?.passkey?.list) {
          const { data: sbPasskeys } = await (supabase.auth as any).passkey.list();
          if (sbPasskeys && Array.isArray(sbPasskeys)) {
            const existingIds = new Set(combined.map((c) => c.id));
            sbPasskeys.forEach((pk: any) => {
              if (!existingIds.has(pk.id)) {
                combined.push({
                  id: pk.id,
                  deviceName: pk.friendly_name || pk.nickname || 'Supabase Passkey',
                  createdAt: pk.created_at || new Date().toISOString(),
                  lastUsedAt: pk.last_used_at
                });
              }
            });
          }
        }
      } catch (sbErr) {
        console.debug('[Supabase Passkeys] List notice:', sbErr);
      }

      setPasskeys(combined);
    } catch (e) {
      console.debug('[Passkeys] Load error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPasskeys();
  }, [userId]);

  // Create a new passkey on this device (WebAuthn Browser or Native Android Credential Manager)
  const handleCreatePasskey = async () => {
    if (!userId) {
      setMessage({ type: 'error', text: 'You must be signed in to set up a passkey.' });
      return;
    }
    setMessage(null);
    setIsRegistering(true);
    const platformTag = getPasskeyPlatformTag();
    const startTs = Date.now();

    try {
      // 1. Get registration options from server
      const optRes = await fetch(apiUrl('/api/auth/passkey/register-options'), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-smartrun-platform': platformTag
        },
        body: JSON.stringify({
          userId,
          email: userProfile?.email || undefined,
          phone: userProfile?.phone || undefined,
          fullName: userProfile?.name || 'Customer',
          platform: platformTag
        })
      });

      const optData = await optRes.json().catch(() => null);
      if (!optData || !optData.success || !optData.options) {
        throw new Error(optData?.error || 'Failed to start passkey setup.');
      }

      // 2. Trigger native device biometric prompt (Android Credential Manager, Touch ID, Windows Hello, Face ID)
      const promptStartTs = Date.now();
      let regResp;
      try {
        regResp = await createPasskeyCredential(optData.options);
      } catch (promptErr: any) {
        const formatted = formatPasskeyError(promptErr, {
          isNativeApp,
          mode: 'register',
          elapsedMs: Date.now() - promptStartTs
        });
        if (formatted.message) {
          setMessage({ type: 'error', text: formatted.message });
        }
        return;
      }

      // 3. Determine device label
      let deviceLabel = 'This Device';
      if (platformTag === 'android_native') {
        deviceLabel = 'Android App (Biometric Passkey)';
      } else if (typeof navigator !== 'undefined') {
        const ua = navigator.userAgent;
        if (/Android/i.test(ua)) deviceLabel = 'Android Phone / Tablet';
        else if (/iPhone|iPad/i.test(ua)) deviceLabel = 'Apple Device (Face ID / Touch ID)';
        else if (/Macintosh|Mac OS/i.test(ua)) deviceLabel = 'MacBook (Touch ID)';
        else if (/Windows/i.test(ua)) deviceLabel = 'Windows PC (Windows Hello)';
        else deviceLabel = 'Browser Passkey';
      }

      // 4. Verify on server
      const verifyRes = await fetch(apiUrl('/api/auth/passkey/register-verify'), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-smartrun-platform': platformTag
        },
        body: JSON.stringify({
          userId,
          response: regResp,
          challengeToken: optData.challengeToken,
          deviceName: deviceLabel,
          email: userProfile?.email || undefined,
          phone: userProfile?.phone || undefined,
          fullName: userProfile?.name || 'Customer',
          platform: platformTag
        })
      });

      const verifyData = await verifyRes.json().catch(() => null);
      if (!verifyData || !verifyData.success) {
        throw new Error(verifyData?.error || 'Failed to save passkey on server.');
      }

      setMessage({
        type: 'success',
        text: isNativeApp
          ? 'Passkey saved! Next time you sign in on SmartRun, tap Passkey to unlock instantly with your fingerprint or screen lock.'
          : 'Passkey saved! Next time you sign in, tap Passkey or select it from your browser autofill bar.'
      });
      await loadPasskeys();
    } catch (err: any) {
      const formatted = formatPasskeyError(err, {
        isNativeApp,
        mode: 'register',
        elapsedMs: Date.now() - startTs
      });
      if (formatted.message) {
        setMessage({ type: 'error', text: formatted.message });
      }
    } finally {
      setIsRegistering(false);
    }
  };

  // Delete a passkey (inline two-tap confirmation — avoids blocked window.confirm in WebView/iframes)
  const handleDeletePasskey = async (id: string) => {
    if (confirmDeleteId !== id) {
      setConfirmDeleteId(id);
      return;
    }
    setConfirmDeleteId(null);
    try {
      try {
        if ((supabase.auth as any)?.passkey?.delete) {
          await (supabase.auth as any).passkey.delete({ id });
        }
      } catch (sbErr) {
        console.debug('[Supabase Passkey Delete notice]:', sbErr);
      }

      const res = await fetch(
        apiUrl(`/api/auth/passkey/${encodeURIComponent(id)}?userId=${encodeURIComponent(userId)}`),
        {
          method: 'DELETE',
          credentials: 'include'
        }
      );
      const data = await res.json().catch(() => null);
      if (data && data.success) {
        setPasskeys((prev) => prev.filter((p) => p.id !== id));
        setMessage({ type: 'success', text: 'Passkey removed.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete passkey.' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16 overflow-x-clip">
      <ProfileSubPageNavbar
        title="Passkey"
        onBack={onBack}
        backTitle="Back to Security"
        backAriaLabel="Back to Security"
      />

      <div
        className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-4 sm:py-6 space-y-4"
        style={{
          paddingLeft: 'max(1rem, var(--safe-area-left, env(safe-area-inset-left, 0px)))',
          paddingRight: 'max(1rem, var(--safe-area-right, env(safe-area-inset-right, 0px)))'
        }}
      >
        {/* Feedback Alert if any */}
        {message && (
          <div
            className={`p-3.5 rounded-2xl text-xs font-semibold flex items-start gap-2.5 animate-in fade-in ${
              message.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            )}
            <span className="leading-relaxed min-w-0 flex-1 break-words">{message.text}</span>
          </div>
        )}

        {/* Browser Support Notice if unsupported */}
        {!isSupported && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Your current browser does not support WebAuthn Passkeys. Please try Chrome, Edge, or Safari.</span>
          </div>
        )}

        {/* Registered passkeys section with Plus sign button (no text on button) */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-3">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 min-w-0">
              <KeyRound className="w-4 h-4 text-slate-600 shrink-0" />
              <span className="truncate tabular-nums">Registered passkeys ({passkeys.length})</span>
            </h2>

            {/* Plus sign button to add passkey (don't add text) */}
            <button
              type="button"
              id="btn-add-passkey"
              onClick={handleCreatePasskey}
              disabled={isRegistering || !isSupported}
              title="Add passkey"
              aria-label="Add passkey"
              className="w-10 h-10 rounded-full bg-slate-900 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 disabled:opacity-50 shrink-0 shadow-xs"
            >
              {isRegistering ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
              )}
            </button>
          </div>

          {passkeys.length === 0 ? (
            <div className="p-6 text-center space-y-1.5">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Fingerprint className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">No passkeys created yet</p>
              <p className="text-[11px] text-slate-400">
                Tap the + button above to add a passkey on this device.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {passkeys.map((pk) => {
                const isMobile = pk.deviceName?.toLowerCase().includes('android') || pk.deviceName?.toLowerCase().includes('iphone');
                return (
                  <div key={pk.id} className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                        {isMobile ? <Smartphone className="w-4.5 h-4.5" /> : <Laptop className="w-4.5 h-4.5" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{pk.deviceName || 'Saved Passkey'}</p>
                        <p className="text-[11px] text-slate-500 truncate tabular-nums">
                          Added: {new Date(pk.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    {confirmDeleteId === pk.id ? (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleDeletePasskey(pk.id)}
                          className="px-2.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleDeletePasskey(pk.id)}
                        className="min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer shrink-0"
                        title="Remove passkey"
                        aria-label="Remove passkey"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* How Passkey work? Section */}
        <div className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200/70 text-xs text-slate-600 space-y-2">
          <p className="font-bold text-slate-900 text-xs sm:text-sm">How Passkey work?</p>
          <ul className="list-disc pl-4 space-y-1.5 text-slate-600 leading-relaxed text-[11px] sm:text-xs">
            <li>When you sign in, selecting your email or username automatically displays your saved passkey in the autofill bar.</li>
            <li>Use your fingerprint, Face ID, or device screen lock to sign in instantly without typing passwords or waiting for SMS OTPs.</li>
            <li>Passkeys are protected by your device&apos;s biometric security chip and safely synced across devices via Google Password Manager, Apple iCloud, or Windows Hello.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
