import React from 'react';
import { AccountDeletionPage } from '../AccountDeletionPage';
import { UserProfile, Order } from '../../types';

interface AccountDeletionSubPageProps {
  userProfile: UserProfile | null;
  orders?: Order[];
  onOpenAuth?: () => void;
  onBack: () => void;
}

export const AccountDeletionSubPage: React.FC<AccountDeletionSubPageProps> = ({
  userProfile,
  orders = [],
  onOpenAuth,
  onBack
}) => {
  return (
    <AccountDeletionPage
      userProfile={userProfile}
      orders={orders}
      onOpenAuth={onOpenAuth}
      onBack={onBack}
    />
  );
};
