import React from 'react';
import { ChevronLeft } from 'lucide-react';

export interface ProfileSubPageNavbarProps {
  title: string;
  onBack: () => void;
  backAriaLabel?: string;
  backTitle?: string;
  backButtonId?: string;
  headerId?: string;
  rightContent?: React.ReactNode;
  containerMaxWidthClass?: string;
  containerPaddingClass?: string;
  headerBackgroundColor?: string;
  headerBorderColor?: string;
}

export const ProfileSubPageNavbar: React.FC<ProfileSubPageNavbarProps> = ({
  title,
  onBack,
  backAriaLabel = 'Back',
  backTitle = 'Back',
  backButtonId,
  headerId,
  rightContent,
  containerMaxWidthClass = 'max-w-3xl',
  containerPaddingClass = 'px-4 sm:px-6',
  headerBackgroundColor = '#74c69d',
  headerBorderColor = '#52b788'
}) => {
  return (
    <header
      id={headerId}
      className="sticky top-0 z-30 shrink-0 border-b shadow-xs [transform:translateZ(0)] [backface-visibility:hidden] will-change-transform transition-all"
      style={{
        backgroundColor: headerBackgroundColor,
        borderColor: headerBorderColor,
        paddingTop: 'var(--safe-area-top, env(safe-area-inset-top, 0px))',
        paddingLeft: 'var(--safe-area-left, env(safe-area-inset-left, 0px))',
        paddingRight: 'var(--safe-area-right, env(safe-area-inset-right, 0px))'
      }}
    >
      <div
        className={`${containerMaxWidthClass} mx-auto w-full ${containerPaddingClass} min-h-[64px] sm:min-h-[68px] py-2 flex items-center justify-between gap-3 relative`}
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <button
            id={backButtonId}
            type="button"
            onClick={onBack}
            className="relative z-20 pointer-events-auto touch-manipulation min-w-[40px] min-h-[40px] -ml-2 rounded-full hover:bg-black/10 active:bg-black/15 text-slate-900 transition-colors cursor-pointer flex items-center justify-center shrink-0"
            title={backTitle}
            aria-label={backAriaLabel}
          >
            <ChevronLeft className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.2]" />
          </button>
          <h1
            className="text-[19px] sm:text-2xl text-slate-950 font-normal leading-tight font-playfair tracking-normal truncate min-w-0"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
          >
            {title}
          </h1>
        </div>

        {rightContent ? (
          <div className="flex items-center gap-2 shrink-0">
            {rightContent}
          </div>
        ) : null}
      </div>
    </header>
  );
};
