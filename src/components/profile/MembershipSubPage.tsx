import React from 'react';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';

interface MembershipSubPageProps {
  totalSavings: number;
  onBack: () => void;
}

export const MembershipSubPage = ({
  totalSavings,
  onBack
}: MembershipSubPageProps) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <div
        className="sticky top-0 z-30 bg-[#74c69d] border-b border-[#52b788] shadow-xs [transform:translateZ(0)] [backface-visibility:hidden] will-change-transform min-h-[64px] sm:min-h-[68px] flex flex-col justify-center transition-all"
        style={{
          backgroundColor: '#74c69d',
          paddingTop: 'max(env(safe-area-inset-top, 0px), var(--safe-area-top, 0px))'
        }}
      >
        <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <button
              onClick={onBack}
              className="p-1.5 -ml-1 rounded-full hover:bg-black/10 active:bg-black/15 text-slate-900 transition-colors cursor-pointer shrink-0"
              title="Back to Profile"
              aria-label="Back"
            >
              <ChevronLeft className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </button>
            <h1
              className="text-xl sm:text-2xl text-slate-950 font-normal leading-tight font-playfair tracking-normal"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
            >
              Membership
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-4">
        <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 text-slate-950 rounded-3xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-black uppercase tracking-wider bg-slate-950 text-yellow-300 px-2.5 py-0.5 rounded-full">
              Active Member
            </span>
          </div>
          <h2 className="text-2xl font-black">₹{totalSavings} Saved This Year</h2>
          <p className="text-xs font-bold text-slate-900/80 mt-1">
            Unlimited free 60-min express deliveries &amp; 5% instant cashback.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900">Your Pro Benefits</h3>
          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero delivery fees on all electrical material orders above ₹299</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Direct priority dispatch from Giriraj Power Kasba central distribution hub</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Instant refund to Giriraj Wallet on returns with 0 questions asked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
