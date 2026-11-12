import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface ServicesSubPageProps {
  onBack: () => void;
}

export const ServicesSubPage = ({ onBack }: ServicesSubPageProps) => {
  return (
    <div className="min-h-screen bg-white text-black pb-20">
      <div
        className="sticky top-0 z-30 bg-[#f7aef8] border-b border-[#e99ee7] shadow-xs [transform:translateZ(0)] [backface-visibility:hidden] will-change-transform min-h-[64px] sm:min-h-[68px] flex flex-col justify-center transition-all"
        style={{
          backgroundColor: '#f7aef8',
          paddingTop: 'max(env(safe-area-inset-top, 0px), var(--safe-area-top, 0px))'
        }}
      >
        <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <button
              onClick={onBack}
              className="p-1.5 -ml-1 rounded-full hover:bg-black/10 active:bg-black/15 text-slate-900 transition-colors cursor-pointer shrink-0"
              title="Back to Profile"
              aria-label="Back"
            >
              <ChevronLeft className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </button>
            <h1
              className="text-xl sm:text-2xl text-slate-950 font-normal leading-tight font-playfair tracking-normal"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
            >
              Services
            </h1>
          </div>
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
