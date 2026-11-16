import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ProfileSubPageNavbar } from './ProfileSubPageNavbar';

interface MembershipSubPageProps {
  totalSavings: number;
  onBack: () => void;
}

export const MembershipSubPage = ({
  totalSavings,
  onBack
}: MembershipSubPageProps) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 overflow-x-clip">
      <ProfileSubPageNavbar
        title="Membership"
        onBack={onBack}
        backTitle="Back to Profile"
        backAriaLabel="Back to Profile"
      />

      <div
        className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-4 sm:py-6 space-y-4"
        style={{
          paddingLeft: 'max(1rem, var(--safe-area-left, env(safe-area-inset-left, 0px)))',
          paddingRight: 'max(1rem, var(--safe-area-right, env(safe-area-inset-right, 0px)))'
        }}
      >
        <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 text-slate-950 rounded-3xl p-5 sm:p-6 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-black uppercase tracking-wider bg-slate-950 text-yellow-300 px-2.5 py-0.5 rounded-full whitespace-nowrap">
              Active Member
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tabular-nums">
            ₹{totalSavings.toLocaleString('en-IN')} Saved This Year
          </h2>
          <p className="text-xs font-bold text-slate-900/80 mt-1 leading-relaxed">
            Unlimited free 60-min express deliveries &amp; 5% instant cashback.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900">Your Pro Benefits</h3>
          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="min-w-0 flex-1 leading-relaxed">Zero delivery fees on all electrical material orders above ₹299</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="min-w-0 flex-1 leading-relaxed">Direct priority dispatch from Giriraj Power Kasba central distribution hub</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="min-w-0 flex-1 leading-relaxed">Instant refund to Giriraj Wallet on returns with 0 questions asked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
