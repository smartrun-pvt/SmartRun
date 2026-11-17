import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
  Trash2,
  X,
  UserX,
  Loader2,
  Copy,
  Check,
  LogIn
} from 'lucide-react';
import { UserProfile, Order } from '../types';
import { API_BASE_URL } from '../lib/apiBase';
import { showToast } from '../utils/toast';
import { supabase } from '../lib/supabaseClient';
import { purgeAllUserCacheAndStorage, signOutUser } from '../services/supabaseService';
import { clearServerAuthToken, getServerAuthToken } from '../services/serverAuthService';
import { SEOHead } from './SEOHead';
import { useEdgeSwipeBack } from '../hooks/useEdgeSwipeBack';
import { ProfileSubPageNavbar } from './profile/ProfileSubPageNavbar';
import { navigateBackSafely } from '../utils/navigationHistory';

interface AccountDeletionPageProps {
  userProfile?: UserProfile | null;
  orders?: Order[];
  onOpenAuth?: () => void;
  onBack?: () => void;
}

export const AccountDeletionPage = ({
  userProfile,
  orders = [],
  onOpenAuth,
  onBack
}: AccountDeletionPageProps) => {
  const navigate = useNavigate();

  const isSignedIn = Boolean(userProfile && (userProfile.id || userProfile.email || userProfile.phone));

  // Signed in email / identifier
  const userIdentifier =
    userProfile?.email ||
    (userProfile?.phone ? `${userProfile.phone}` : '') ||
    userProfile?.name ||
    userProfile?.id ||
    '';

  // Section 1: Direct Self-Service Deletion State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedDelete, setCopiedDelete] = useState(false);

  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
    } else {
      navigateBackSafely(navigate, isSignedIn ? '/profile' : '/');
    }
  }, [onBack, navigate, isSignedIn]);

  // Swipe from left edge on touch screens to return to profile
  useEdgeSwipeBack({
    onBack: handleBack,
    disabled: false
  });

  // Android native hardware back button support & modal escape/scroll lock
  useEffect(() => {
    const handleHardwareBack = (e: Event) => {
      if (showDeleteModal) {
        e.preventDefault();
        if (!isDeleting) {
          setShowDeleteModal(false);
          setDeleteConfirmText('');
        }
        return;
      }
      e.preventDefault();
      handleBack();
    };
    window.addEventListener('smartrun:hardware-back', handleHardwareBack);
    return () => {
      window.removeEventListener('smartrun:hardware-back', handleHardwareBack);
    };
  }, [handleBack, showDeleteModal, isDeleting]);

  useEffect(() => {
    if (!showDeleteModal || typeof document === 'undefined') return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isDeleting) {
        setShowDeleteModal(false);
        setDeleteConfirmText('');
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [showDeleteModal, isDeleting]);

  // Handler to copy "DELETE" confirmation text like GitHub/Vercel
  const handleCopyDeleteText = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const textToCopy = 'DELETE';
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedDelete(true);
      showToast('Copied "DELETE" to clipboard', 'success');
      setTimeout(() => setCopiedDelete(false), 2000);
    } catch (err) {
      console.warn('Failed to copy DELETE text:', err);
    }
  };

  // Handler to navigate signed-out user to login and return to /delete
  const handleLoginToDelete = useCallback(() => {
    try {
      sessionStorage.setItem('auth_redirect_target', '/delete');
    } catch {
      // ignore storage availability errors
    }
    if (onOpenAuth) {
      onOpenAuth();
    } else {
      navigate('/login?redirect=/delete');
    }
  }, [onOpenAuth, navigate]);

  // Handler for direct self-service delete
  const handleDirectSelfServiceDelete = async () => {
    if (!isSignedIn || deleteConfirmText.trim() !== 'DELETE' || isDeleting) return;

    setIsDeleting(true);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    try {
      let accessToken: string | null = null;
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        accessToken = sessionData?.session?.access_token || null;
      } catch {
        accessToken = null;
      }
      if (!accessToken) {
        accessToken = getServerAuthToken();
      }

      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      const res = await fetch(`${API_BASE_URL}/api/account/delete-account`, {
        method: 'POST',
        credentials: 'include',
        headers,
        signal: controller.signal,
        body: JSON.stringify({
          userId: userProfile?.id,
          phone: userProfile?.phone,
          email: userProfile?.email,
          name: userProfile?.name,
          reason: 'Direct Self-Service Deletion via Deletion Portal'
        })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.success === false) {
        if (res.status === 401) {
          setShowDeleteModal(false);
          setDeleteConfirmText('');
          showToast(data?.message || 'Session expired. Please sign in again to delete your account.', 'error');
          handleLoginToDelete();
          return;
        }
        showToast(data?.message || 'Unable to delete account right now. Please try again.', 'error');
        return;
      }

      // Complete purge and sign-out on client
      clearServerAuthToken();
      await signOutUser().catch(() => {});
      await purgeAllUserCacheAndStorage().catch(() => {});

      setShowDeleteModal(false);
      setDeleteConfirmText('');
      showToast('Your account and personal data have been permanently deleted.', 'success');
      navigate('/', { replace: true });
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        showToast('Request timed out. Please check your connection and try again.', 'error');
      } else {
        showToast(err?.message || 'Failed to delete account. Please try again.', 'error');
      }
    } finally {
      window.clearTimeout(timeoutId);
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#dedcd8] text-slate-900 font-sans pb-24 overflow-x-clip" id="account-deletion-page">
      <SEOHead
        title="Account Deletion | SmartRun"
        description="Permanently delete your account and personal data in compliance with privacy guidelines."
        noIndex={true}
      />

      {/* Top Header: Unified ProfileSubPageNavbar */}
      <ProfileSubPageNavbar
        title="Account Delete"
        onBack={handleBack}
        backButtonId="btn-account-delete-back"
        backTitle="Back"
        backAriaLabel="Go back"
      />

      {/* Main Content Body */}
      <div
        style={{
          paddingLeft: 'var(--safe-area-left, env(safe-area-inset-left, 0px))',
          paddingRight: 'var(--safe-area-right, env(safe-area-inset-right, 0px))'
        }}
      >
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-10">

        {/* =========================================================================
            SECTION 1: DIRECT SELF-SERVICE DELETION (Matches Screenshot 1)
           ========================================================================= */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 min-w-0">
            <UserX className="w-5 h-5 text-[#d00036] stroke-[2.2] shrink-0" />
            <h2 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-wider uppercase min-w-0">
              DIRECT SELF-SERVICE DELETION
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Immediately and permanently delete your account, saved medications, dose history, and notification schedules.
          </p>

          {isSignedIn ? (
            <div className="pt-2">
              <p className="text-xs sm:text-sm text-slate-500 mb-0.5">
                Currently signed in as:
              </p>
              <div className="font-bold text-[#0f172a] text-sm sm:text-base pb-2 break-all">
                {userIdentifier}
              </div>
              <hr className="border-t border-slate-300/80 mb-5" />

              <button
                type="button"
                id="btn-delete-my-account"
                onClick={() => {
                  setDeleteConfirmText('');
                  setShowDeleteModal(true);
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-[#d00036] hover:bg-[#b5002f] active:bg-[#990027] text-white font-bold text-sm sm:text-base shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <Trash2 className="w-4 h-4 stroke-[2.2]" />
                <span>Delete My Account Now</span>
              </button>
            </div>
          ) : (
            <div className="pt-2">
              <p className="text-xs sm:text-sm text-slate-500 mb-0.5">
                Account Status:
              </p>
              <div className="font-bold text-[#0f172a] text-sm sm:text-base pb-2">
                Not signed in — please sign in to verify and delete your account
              </div>
              <hr className="border-t border-slate-300/80 mb-5" />

              <button
                type="button"
                id="btn-login-to-delete-account"
                onClick={handleLoginToDelete}
                className="w-full py-3.5 px-6 rounded-xl bg-[#0f172a] hover:bg-slate-800 active:bg-slate-900 text-white font-bold text-sm sm:text-base shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <LogIn className="w-4 h-4 stroke-[2.2]" />
                <span>Sign In to Delete Account</span>
              </button>
            </div>
          )}
        </section>

        <hr className="border-t border-slate-300/70" />

        {/* =========================================================================
            SECTION 2: DATA DELETION & RETENTION BREAKDOWN
           ========================================================================= */}
        <section className="space-y-3">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-wider uppercase">
              Data Deletion &amp; Retention Breakdown
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Overview of how your personal health data is processed and permanently purged upon deletion:
            </p>
          </div>

          {/* Mobile Stacked Breakdown (<640px) */}
          <div className="sm:hidden divide-y divide-slate-200/80 border border-slate-300/80 rounded-xl bg-white/80 shadow-2xs mt-3 overflow-hidden">
            {[
              {
                category: 'Account Credentials & Profile',
                action: 'Permanently purged',
                timeline: 'Immediate upon confirmation',
                immediate: true
              },
              {
                category: 'Medication Records & Vault Data',
                action: 'Irreversibly erased from server & device',
                timeline: 'Immediate',
                immediate: true
              },
              {
                category: 'Dose History & Adherence Logs',
                action: 'Complete database purge',
                timeline: 'Immediate',
                immediate: true
              },
              {
                category: 'Notification Schedules & Reminders',
                action: 'Cancelled and unlinked from messaging queue',
                timeline: 'Immediate',
                immediate: true
              },
              {
                category: 'Statutory Tax & Transaction Receipts',
                action: 'Anonymized archive (personal identifiers expunged)',
                timeline: 'Mandatory audit compliance (CGST Act)',
                immediate: false
              }
            ].map((row) => (
              <div key={row.category} className="p-3.5 space-y-1">
                <p className="text-xs font-semibold text-slate-900">{row.category}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{row.action}</p>
                <p className={`text-[11px] font-medium ${row.immediate ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {row.timeline}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop/Tablet Table (>=640px) */}
          <div className="hidden sm:block overflow-x-auto border border-slate-300/80 rounded-xl bg-white/70 shadow-2xs mt-3">
            <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
              <thead className="bg-slate-100/80 text-slate-700 font-bold">
                <tr>
                  <th className="py-3 px-4">Data Category</th>
                  <th className="py-3 px-4">Deletion Action</th>
                  <th className="py-3 px-4">Retention &amp; Purge Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    Account Credentials &amp; Profile
                  </td>
                  <td className="py-3.5 px-4">
                    Permanently purged
                  </td>
                  <td className="py-3.5 px-4 text-emerald-700 font-medium">
                    Immediate upon confirmation
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    Medication Records &amp; Vault Data
                  </td>
                  <td className="py-3.5 px-4">
                    Irreversibly erased from server &amp; device
                  </td>
                  <td className="py-3.5 px-4 text-emerald-700 font-medium">
                    Immediate
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    Dose History &amp; Adherence Logs
                  </td>
                  <td className="py-3.5 px-4">
                    Complete database purge
                  </td>
                  <td className="py-3.5 px-4 text-emerald-700 font-medium">
                    Immediate
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    Notification Schedules &amp; Reminders
                  </td>
                  <td className="py-3.5 px-4">
                    Cancelled and unlinked from messaging queue
                  </td>
                  <td className="py-3.5 px-4 text-emerald-700 font-medium">
                    Immediate
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    Statutory Tax &amp; Transaction Receipts
                  </td>
                  <td className="py-3.5 px-4">
                    Anonymized archive (personal identifiers expunged)
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    Mandatory audit compliance (CGST Act)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
      </div>

      {/* =========================================================================
          CONFIRM IRREVERSIBLE DELETION MODAL / POP UP BOX (Portaled to body)
         ========================================================================= */}
      {showDeleteModal && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-account-modal-title"
          className="fixed inset-0 z-[99999] bg-black/50 backdrop-blur-xs flex min-h-[100dvh] items-center justify-center p-4 overflow-y-auto overscroll-contain animate-in fade-in duration-200"
          onClick={() => {
            if (!isDeleting) {
              setShowDeleteModal(false);
              setDeleteConfirmText('');
            }
          }}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full my-auto max-h-[calc(100dvh-2rem)] overflow-y-auto p-5 sm:p-6 shadow-2xl space-y-4 border border-slate-200 text-left animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Title */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <h3 id="delete-account-modal-title" className="text-lg font-bold text-slate-900">
                  Confirm Irreversible Deletion
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex items-center flex-wrap gap-1.5">
                  <span>Type</span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-red-50 border border-red-200/90 font-mono font-bold text-red-600 text-xs sm:text-sm">
                    <span>DELETE</span>
                    <button
                      type="button"
                      onClick={handleCopyDeleteText}
                      title={copiedDelete ? 'Copied!' : 'Copy DELETE to clipboard'}
                      aria-label="Copy DELETE to clipboard"
                      className="p-0.5 rounded hover:bg-red-100 active:bg-red-200 text-red-500 hover:text-red-700 transition-colors cursor-pointer inline-flex items-center justify-center"
                    >
                      {copiedDelete ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 stroke-[2.2]" />
                      )}
                    </button>
                  </span>
                  <span>below to permanently erase your account and all medication vault records.</span>
                </p>
              </div>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText('');
                }}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input: Type DELETE */}
            <div>
              <input
                type="text"
                placeholder="Type DELETE"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-slate-900 bg-white"
                autoFocus
              />
            </div>

            {/* Buttons: Cancel & Confirm Delete */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText('');
                }}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-sm transition-colors cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteConfirmText.trim() !== 'DELETE' || isDeleting}
                onClick={handleDirectSelfServiceDelete}
                className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  deleteConfirmText.trim() === 'DELETE' && !isDeleting
                    ? 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  'Confirm Delete'
                )}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};
