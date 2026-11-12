import React from 'react';
import { FAQPage } from '../FAQPage';

interface FAQSubPageProps {
  onBack: () => void;
}

export const FAQSubPage: React.FC<FAQSubPageProps> = ({ onBack }) => {
  return <FAQPage onBack={onBack} />;
};
