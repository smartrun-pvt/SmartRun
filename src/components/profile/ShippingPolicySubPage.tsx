import React from 'react';
import { ShippingPolicy } from '../ShippingPolicyPage';

interface ShippingPolicySubPageProps {
  onBack: () => void;
  onContactSupport?: () => void;
}

export const ShippingPolicySubPage = ({
  onBack,
  onContactSupport
}: ShippingPolicySubPageProps) => {
  return (
    <ShippingPolicy
      onBack={onBack}
      onContactSupport={onContactSupport}
    />
  );
};
