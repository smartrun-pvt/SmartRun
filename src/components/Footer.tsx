import React from 'react';

export interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenInstallApp?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center mt-8">
      <p className="text-xs sm:text-sm text-black font-normal tracking-wide">
        2026 SmartRun Materials Pvt. Ltd. All right reserved.
      </p>
    </footer>
  );
};

