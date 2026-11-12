import React from 'react';
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
      <OrderHistoryView
        orders={orders}
        userProfile={userProfile}
        onOpenShop={onOpenShop}
        onBack={onBack}
      />
    </div>
  );
};
