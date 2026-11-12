import React from 'react';
import { ChevronLeft, Wallet, RefreshCw, Gift } from 'lucide-react';
import { WalletTransaction } from '../../types';

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
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <div
        className="sticky top-0 z-30 bg-[#f7aef8] border-b border-[#e99ee7] shadow-xs [transform:translateZ(0)] [backface-visibility:hidden] will-change-transform min-h-[64px] sm:min-h-[68px] flex flex-col justify-center transition-all"
        style={{
          backgroundColor: '#f7aef8',
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
              Wallet
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-4">
        {/* Main Wallet Balance Card */}
        <div className="bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-950 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-200 flex items-center gap-1.5">
                <Wallet className="w-4 h-4" />
                <span>Wallet Balance</span>
              </span>
            </div>

            <div className="text-3xl sm:text-4xl font-black tracking-tight">
              ₹{totalWalletBalance.toLocaleString('en-IN')}.00
            </div>
          </div>
        </div>

        {/* Transaction Statement */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
            Transaction History
          </h3>

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
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        tx.type === 'refund' ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {tx.type === 'refund' ? <RefreshCw className="w-4 h-4" /> : <Gift className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900">{tx.title}</p>
                      <p className="text-[11px] text-slate-500">{tx.description}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{tx.date}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-600 shrink-0">+ ₹{tx.amount}.00</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
