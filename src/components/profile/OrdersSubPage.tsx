import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { OrderHistoryView } from '../OrderHistoryView';
import { Order, UserProfile } from '../../types';

interface OrdersSubPageProps {
  orders: Order[];
  userProfile: UserProfile | null;
  onOpenShop: () => void;
  onBack: () => void;
}

export const OrdersSubPage: React.FC<OrdersSubPageProps> = ({
  orders,
  userProfile,
  onOpenShop,
  onBack
}) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28 sm:pb-24">
      {/* Sticky Top Navbar: #74c69d with standard height & Playfair title */}
      <div
        className="sticky top-0 z-30 bg-[#74c69d] border-b border-[#52b788] shadow-xs [transform:translateZ(0)] [backface-visibility:hidden] will-change-transform min-h-[64px] sm:min-h-[68px] flex flex-col justify-center transition-all"
        style={{
          backgroundColor: '#74c69d',
          paddingTop: 'max(env(safe-area-inset-top, 0px), var(--safe-area-top, 0px))'
        }}
      >
        <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <button
              onClick={onBack}
              className="p-1.5 -ml-1 rounded-full hover:bg-black/10 active:bg-black/15 text-slate-900 transition-colors cursor-pointer shrink-0"
              title="Back to Profile"
              aria-label="Back"
            >
              <ChevronLeft className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </button>
            <div className="flex items-center gap-2.5">
              <h1
                className="text-xl sm:text-2xl text-slate-950 font-normal leading-tight font-playfair tracking-normal"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
              >
                Orders
              </h1>
              {orders.length > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-white/70 text-slate-900 text-xs font-semibold border border-black/10">
                  {orders.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <OrderHistoryView
        orders={orders}
        userProfile={userProfile}
        onOpenShop={onOpenShop}
        onBack={onBack}
        hideHeader={true}
      />
    </div>
  );
};
