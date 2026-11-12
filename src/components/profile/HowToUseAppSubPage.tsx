import React from 'react';
import { HowToUseAppPage } from '../HowToUseAppPage';

interface HowToUseAppSubPageProps {
  onBack: () => void;
}

export const HowToUseAppSubPage: React.FC<HowToUseAppSubPageProps> = ({ onBack }) => {
  return <HowToUseAppPage onBack={onBack} />;
};
