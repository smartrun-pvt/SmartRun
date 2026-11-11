import React from 'react';
import { ReturnPolicyPage } from '../ReturnPolicyPage';

interface ReturnPolicySubPageProps {
  onBack: () => void;
  onContactSupport?: () => void;
}

export const ReturnPolicySubPage = ({
  onBack,
  onContactSupport
}: ReturnPolicySubPageProps) => {
  return (
    <ReturnPolicyPage
      onBack={onBack}
      onContactSupport={onContactSupport}
    />
  );
};
