import React from 'react';
import { Fingerprint, Smartphone, Mail, ChevronRight } from 'lucide-react';
import { ProfileSubPageNavbar } from './ProfileSubPageNavbar';

interface SecuritySubPageProps {
  onBack: () => void;
  onOpenPasskeys: () => void;
  onOpenMobileUpdate: () => void;
  onOpenEmailUpdate: () => void;
}

export const SecuritySubPage: React.FC<SecuritySubPageProps> = ({
  onBack,
  onOpenPasskeys,
  onOpenMobileUpdate,
  onOpenEmailUpdate
}) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 overflow-x-clip">
      <ProfileSubPageNavbar
        title="Security"
        onBack={onBack}
        backTitle="Back to Profile"
        backAriaLabel="Back to Profile"
      />

      <div
        className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-4 sm:py-6 space-y-4"
        style={{
          paddingLeft: 'max(1rem, var(--safe-area-left, env(safe-area-inset-left, 0px)))',
          paddingRight: 'max(1rem, var(--safe-area-right, env(safe-area-inset-right, 0px)))'
        }}
      >
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {/* 1. Passkey Button */}
          <button
            id="btn-security-passkey"
            type="button"
            onClick={onOpenPasskeys}
            className="w-full p-4 sm:p-4.5 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 border border-indigo-200 text-indigo-700 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Fingerprint className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-base sm:text-lg font-normal text-slate-800 truncate">Passkey</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0" />
          </button>

          {/* 2. Mobile No. Update Button */}
          <button
            id="btn-security-mobile-update"
            type="button"
            onClick={onOpenMobileUpdate}
            className="w-full p-4 sm:p-4.5 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-base sm:text-lg font-normal text-slate-800 truncate">Mobile No. Update</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0" />
          </button>

          {/* 3. Email Update Button */}
          <button
            id="btn-security-email-update"
            type="button"
            onClick={onOpenEmailUpdate}
            className="w-full p-4 sm:p-4.5 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-2xl bg-sky-100 border border-sky-200 text-sky-700 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-base sm:text-lg font-normal text-slate-800 truncate">Email Update</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
