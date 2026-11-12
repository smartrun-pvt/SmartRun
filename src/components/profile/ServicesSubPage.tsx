import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface ServicesSubPageProps {
  onBack: () => void;
}

export const ServicesSubPage = ({ onBack }: ServicesSubPageProps) => {
  return (
    <div className="min-h-screen bg-white text-black pb-20">
      <div
        className="sticky top-0 z-20 bg-white border-b border-slate-200"
        style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), var(--safe-area-top, 0px))' }}
      >
        <div className="px-4 py-2.5 sm:py-3 flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="p-1 -ml-1 rounded-full hover:bg-slate-100 text-slate-800 hover:text-black transition-colors cursor-pointer"
            title="Back to Profile"
            aria-label="Back"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
        </div>
      </div>

      <div className="py-24 flex items-center justify-center">
        <h1 className="text-2xl sm:text-3xl font-medium text-black">
          Coming Soon
        </h1>
      </div>
    </div>
  );
};
