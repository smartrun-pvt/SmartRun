import React from 'react';
import { OrderHistoryView } from '../OrderHistoryView';
import { Order, UserProfile } from '../../types';
import { ProfileSubPageNavbar } from './ProfileSubPageNavbar';

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
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28 sm:pb-24 overflow-x-clip">
      <ProfileSubPageNavbar
        title="Orders"
        onBack={onBack}
        backTitle="Back to Profile"
        backAriaLabel="Back to Profile"
        rightContent={
          orders.length > 0 ? (
            <span className="text-xs sm:text-sm font-medium text-slate-900/80 tabular-nums whitespace-nowrap">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'}
            </span>
          ) : null
        }
      />

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
