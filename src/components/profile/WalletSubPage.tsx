import React from 'react';
import { Wallet, RefreshCw, Gift } from 'lucide-react';
import { WalletTransaction } from '../../types';
import { ProfileSubPageNavbar } from './ProfileSubPageNavbar';

interface WalletSubPageProps {
  totalWalletBalance: number;
  filteredTransactions: WalletTransaction[];
  onBack: () => void;
}

export const WalletSubPage = ({
  totalWalletBalance,
  filteredTransactions,
  onBack
}: WalletSubPageProps) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 overflow-x-clip">
      <ProfileSubPageNavbar
        title="Wallet"
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
        {/* Main Wallet Balance Card */}
        <div className="bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-950 text-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-200 flex items-center gap-1.5">
                <Wallet className="w-4 h-4 shrink-0" />
                <span>Wallet Balance</span>
              </span>
            </div>

            <div className="text-3xl sm:text-4xl font-black tracking-tight tabular-nums">
              ₹{totalWalletBalance.toLocaleString('en-IN')}.00
            </div>
          </div>
        </div>

        {/* Transaction Statement */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
            Transaction History
          </h2>

          {filteredTransactions.length === 0 ? (
            <div className="py-8 text-center text-slate-400">
              <Wallet className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-bold text-slate-600">No Recent Transactions</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Refunds and wallet credits will appear here.</p>
            </div>
          ) : (
            <div className="space-y-2.5 pt-1">
              {filteredTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        tx.type === 'refund' ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {tx.type === 'refund' ? <RefreshCw className="w-4 h-4" /> : <Gift className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black text-slate-900 break-words">{tx.title}</p>
                      <p className="text-[11px] text-slate-500 break-words">{tx.description}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 tabular-nums">{tx.date}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-600 shrink-0 whitespace-nowrap tabular-nums">
                    + ₹{tx.amount}.00
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
