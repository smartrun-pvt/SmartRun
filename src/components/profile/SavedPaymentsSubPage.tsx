import React, { useState } from 'react';
import {
  CheckCircle2,
  Plus,
  Loader2,
  Smartphone,
  ShieldCheck,
  Trash2,
  CreditCard
} from 'lucide-react';
import { saveUpiToFirestore, deleteUpiFromFirestore } from '../../services/supabaseService';
import { ProfileSubPageNavbar } from './ProfileSubPageNavbar';

interface SavedPaymentsSubPageProps {
  savedUpi: string[];
  onBack: () => void;
}

export const SavedPaymentsSubPage = ({
  savedUpi,
  onBack
}: SavedPaymentsSubPageProps) => {
  const [newUpiId, setNewUpiId] = useState('');
  const [showAddUpi, setShowAddUpi] = useState(false);
  const [isSavingUpi, setIsSavingUpi] = useState(false);
  const [upiError, setUpiError] = useState<string | null>(null);
  const [upiSuccessNotice, setUpiSuccessNotice] = useState<string | null>(null);

  const handleSaveUpi = async () => {
    const clean = newUpiId.trim().toLowerCase();
    if (!clean) {
      setUpiError('Please enter a valid UPI ID (e.g. name@okhdfcbank or 98300xxxxx@upi)');
      return;
    }
    if (!clean.includes('@') || clean.length < 4) {
      setUpiError('Invalid UPI ID format. It must include "@" symbol.');
      return;
    }
    setUpiError(null);
    setIsSavingUpi(true);
    try {
      await saveUpiToFirestore(clean);
      setNewUpiId('');
      setShowAddUpi(false);
      setUpiSuccessNotice(`UPI ID ${clean} saved securely on server`);
      setTimeout(() => setUpiSuccessNotice(null), 4000);
    } catch {
      setUpiError('Could not save UPI ID to server. Please try again.');
    } finally {
      setIsSavingUpi(false);
    }
  };

  const handleDeleteUpi = async (upiToDelete: string) => {
    try {
      await deleteUpiFromFirestore(upiToDelete);
      setUpiSuccessNotice(`UPI ID ${upiToDelete} removed.`);
      setTimeout(() => setUpiSuccessNotice(null), 3000);
    } catch {
      setUpiError('Failed to remove UPI ID. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 overflow-x-clip">
      <ProfileSubPageNavbar
        title="Payment"
        onBack={onBack}
        backTitle="Back to Profile"
        backAriaLabel="Back to Profile"
      />

      <div
        className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-4 sm:py-6 space-y-6"
        style={{
          paddingLeft: 'max(1rem, var(--safe-area-left, env(safe-area-inset-left, 0px)))',
          paddingRight: 'max(1rem, var(--safe-area-right, env(safe-area-inset-right, 0px)))'
        }}
      >
        {/* Notification / Success / Error Toasts */}
        {upiSuccessNotice && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center justify-between gap-2 shadow-2xs">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="break-words">{upiSuccessNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setUpiSuccessNotice(null)}
              className="text-emerald-600 font-bold hover:text-emerald-800 cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center shrink-0"
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </div>
        )}

        {/* Add UPI Form (Expandable) */}
        {showAddUpi && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-indigo-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-indigo-950 min-w-0">
                Add New UPI Handle (VPA)
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowAddUpi(false);
                  setUpiError(null);
                }}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer shrink-0"
              >
                Cancel
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Enter your Google Pay, PhonePe, Paytm or bank UPI ID to save for instant checkout.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="e.g. yourname@okhdfcbank or 98300xxxxx@ybl"
                value={newUpiId}
                onChange={(e) => {
                  setNewUpiId(e.target.value);
                  if (upiError) setUpiError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveUpi();
                }}
                className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-slate-50 focus:bg-white"
                disabled={isSavingUpi}
              />
              <button
                type="button"
                onClick={handleSaveUpi}
                disabled={isSavingUpi}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-xs"
              >
                {isSavingUpi ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save UPI ID</span>
                )}
              </button>
            </div>
            {upiError && <p className="text-[11px] font-bold text-red-600 mt-1">{upiError}</p>}
          </div>
        )}

        {/* SAVED UPI HANDLES SECTION */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-500">
              Saved UPI Handles
            </h2>
            {savedUpi.length > 0 && (
              <span className="text-[11px] font-bold text-slate-400 tabular-nums whitespace-nowrap shrink-0">
                {savedUpi.length} saved
              </span>
            )}
          </div>

          {savedUpi.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 text-center shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-slate-900 mb-4">No Saved UPI Handles</h3>
              {!showAddUpi && (
                <button
                  type="button"
                  id="btn-add-upi-id-empty"
                  onClick={() => {
                    setShowAddUpi(true);
                    setUpiError(null);
                  }}
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-indigo-600/90 hover:bg-indigo-600 active:bg-indigo-700 backdrop-blur-md border border-indigo-400/40 text-white text-xs font-black rounded-xl shadow-[0_4px_16px_rgba(79,70,229,0.3),inset_0_1px_1.5px_rgba(255,255,255,0.45)] active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  <span>Add UPI ID</span>
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2.5">
              {savedUpi.map((upi, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white flex items-center justify-center font-bold text-[11px] shadow-2xs shrink-0">
                      UPI
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 break-all">{upi}</p>
                      <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="w-3 h-3 shrink-0" />
                        <span className="truncate">Saved on Server for Express Checkout</span>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteUpi(upi)}
                    className="text-slate-400 hover:text-red-500 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                    title="Remove UPI handle"
                    aria-label={`Remove ${upi}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {!showAddUpi && (
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddUpi(true);
                      setUpiError(null);
                    }}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Another UPI ID</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* AVAILABLE CHECKOUT OPTIONS */}
        <div className="pt-2 space-y-3">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-500">
            Available Checkout Options
          </h2>

          <div className="divide-y divide-slate-200">
            {/* UPI */}
            <div className="py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 via-teal-600 to-cyan-500 text-white flex items-center justify-center font-black text-xs shadow-2xs shrink-0">
                  UPI
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black text-slate-900">UPI</p>
                  <p className="text-[11px] text-slate-500 break-words">Google Pay, PhonePe, Paytm, BHIM &amp; CRED</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                Available
              </span>
            </div>

            {/* Debit Card */}
            <div className="py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-2xs shrink-0">
                  <CreditCard className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black text-slate-900">Debit Card</p>
                  <p className="text-[11px] text-slate-500 break-words">Visa, MasterCard, RuPay &amp; Maestro</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                Available
              </span>
            </div>

            {/* Credit Card */}
            <div className="py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-pink-600 to-rose-500 text-white flex items-center justify-center shadow-2xs shrink-0">
                  <CreditCard className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black text-slate-900">Credit Card</p>
                  <p className="text-[11px] text-slate-500 break-words">All Major Banks &amp; No-Cost EMI</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                Available
              </span>
            </div>

            {/* Cash on Delivery */}
            <div className="py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-yellow-500 to-amber-600 text-slate-950 flex items-center justify-center font-black text-xs shadow-2xs shrink-0">
                  ₹
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black text-slate-900">Cash on Delivery (COD)</p>
                  <p className="text-[11px] text-slate-500 break-words">Pay cash or scan QR upon delivery / site service</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
