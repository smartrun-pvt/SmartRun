import React from 'react';
import { ProfileSubPageNavbar } from './ProfileSubPageNavbar';

interface ServicesSubPageProps {
  onBack: () => void;
}

export const ServicesSubPage = ({ onBack }: ServicesSubPageProps) => {
  return (
    <div className="min-h-screen bg-white text-black pb-20 overflow-x-clip">
      <ProfileSubPageNavbar
        title="Services"
        onBack={onBack}
        backTitle="Back to Profile"
        backAriaLabel="Back to Profile"
      />

      <div
        className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-24 flex items-center justify-center text-center"
        style={{
          paddingLeft: 'max(1rem, var(--safe-area-left, env(safe-area-inset-left, 0px)))',
          paddingRight: 'max(1rem, var(--safe-area-right, env(safe-area-inset-right, 0px)))'
        }}
      >
        <h2 className="text-2xl sm:text-3xl font-medium text-black">
          Coming Soon
        </h2>
      </div>
    </div>
  );
};
