import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { requestPushNotificationPermission } from '../../services/pushNotificationService';

interface NotificationsSubPageProps {
  mobileAlerts: boolean;
  whatsappAlerts: boolean;
  smsAlerts: boolean;
  emailAlerts: boolean;
  onToggleMobileAlerts: (next: boolean) => void;
  onToggleWhatsappAlerts: (next: boolean) => void;
  onToggleSmsAlerts: (next: boolean) => void;
  onToggleEmailAlerts: (next: boolean) => void;
  onBack: () => void;
  onContactSupport?: () => void;
  userProfile?: any;
}

export const NotificationsSubPage = ({
  mobileAlerts,
  whatsappAlerts,
  smsAlerts,
  emailAlerts,
  onToggleMobileAlerts,
  onToggleWhatsappAlerts,
  onToggleSmsAlerts,
  onToggleEmailAlerts,
  onBack
}: NotificationsSubPageProps) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <div
        className="sticky top-0 z-30 bg-[#74c69d] border-b border-[#52b788] shadow-xs [transform:translateZ(0)] [backface-visibility:hidden] will-change-transform min-h-[64px] sm:min-h-[68px] flex flex-col justify-center transition-all"
        style={{
          backgroundColor: '#74c69d',
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
              Settings
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-3">
        {/* Normal heading in starting alone Notification heading without any background box or any other design */}
        <h2 className="text-base sm:text-lg font-bold text-slate-900 px-0.5">
          Notification
        </h2>

        {/* Setting Buttons Container - Kept same button design */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs divide-y divide-slate-100">
          {/* 1. Push notification */}
          <div className="flex items-center justify-between gap-4 pb-4">
            <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
              Push notification
            </p>

            <button
              id="toggle-mobile-notifications"
              type="button"
              role="switch"
              aria-checked={mobileAlerts}
              aria-label="Toggle Push notification"
              onClick={async () => {
                const nextState = !mobileAlerts;
                onToggleMobileAlerts(nextState);
                if (nextState) {
                  await requestPushNotificationPermission().catch(() => {});
                }
              }}
              className={`relative inline-flex h-[32px] w-[58px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                mobileAlerts
                  ? 'bg-[#00B050] shadow-[inset_0_3px_4px_rgba(0,0,0,0.22)]'
                  : 'bg-[#C8CCD0] shadow-[inset_0_3px_4px_rgba(0,0,0,0.2)]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-[26px] w-[26px] rounded-full bg-[#ECEEF0] shadow-[0_2px_4px_rgba(0,0,0,0.28)] ring-0 transition-transform duration-200 ease-in-out ${
                  mobileAlerts ? 'translate-x-[29px] translate-y-[3px]' : 'translate-x-[3px] translate-y-[3px]'
                }`}
              />
            </button>
          </div>

          {/* 2. WhatsApp */}
          <div className="flex items-center justify-between gap-4 py-4">
            <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
              WhatsApp
            </p>

            <button
              id="toggle-whatsapp-tracking"
              type="button"
              role="switch"
              aria-checked={whatsappAlerts}
              aria-label="Toggle WhatsApp"
              onClick={() => onToggleWhatsappAlerts(!whatsappAlerts)}
              className={`relative inline-flex h-[32px] w-[58px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                whatsappAlerts
                  ? 'bg-[#00B050] shadow-[inset_0_3px_4px_rgba(0,0,0,0.22)]'
                  : 'bg-[#C8CCD0] shadow-[inset_0_3px_4px_rgba(0,0,0,0.2)]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-[26px] w-[26px] rounded-full bg-[#ECEEF0] shadow-[0_2px_4px_rgba(0,0,0,0.28)] ring-0 transition-transform duration-200 ease-in-out ${
                  whatsappAlerts ? 'translate-x-[29px] translate-y-[3px]' : 'translate-x-[3px] translate-y-[3px]'
                }`}
              />
            </button>
          </div>

          {/* 3. SMS */}
          <div className="flex items-center justify-between gap-4 py-4">
            <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
              SMS
            </p>

            <button
              id="toggle-sms-updates"
              type="button"
              role="switch"
              aria-checked={smsAlerts}
              aria-label="Toggle SMS"
              onClick={() => onToggleSmsAlerts(!smsAlerts)}
              className={`relative inline-flex h-[32px] w-[58px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                smsAlerts
                  ? 'bg-[#00B050] shadow-[inset_0_3px_4px_rgba(0,0,0,0.22)]'
                  : 'bg-[#C8CCD0] shadow-[inset_0_3px_4px_rgba(0,0,0,0.2)]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-[26px] w-[26px] rounded-full bg-[#ECEEF0] shadow-[0_2px_4px_rgba(0,0,0,0.28)] ring-0 transition-transform duration-200 ease-in-out ${
                  smsAlerts ? 'translate-x-[29px] translate-y-[3px]' : 'translate-x-[3px] translate-y-[3px]'
                }`}
              />
            </button>
          </div>

          {/* 4. Email */}
          <div className="flex items-center justify-between gap-4 pt-4">
            <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
              Email
            </p>

            <button
              id="toggle-email-updates"
              type="button"
              role="switch"
              aria-checked={emailAlerts}
              aria-label="Toggle Email"
              onClick={() => onToggleEmailAlerts(!emailAlerts)}
              className={`relative inline-flex h-[32px] w-[58px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                emailAlerts
                  ? 'bg-[#00B050] shadow-[inset_0_3px_4px_rgba(0,0,0,0.22)]'
                  : 'bg-[#C8CCD0] shadow-[inset_0_3px_4px_rgba(0,0,0,0.2)]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-[26px] w-[26px] rounded-full bg-[#ECEEF0] shadow-[0_2px_4px_rgba(0,0,0,0.28)] ring-0 transition-transform duration-200 ease-in-out ${
                  emailAlerts ? 'translate-x-[29px] translate-y-[3px]' : 'translate-x-[3px] translate-y-[3px]'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
