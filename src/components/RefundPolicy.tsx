import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  PhoneCall,
  MoreVertical,
  User,
  Truck,
  RotateCcw,
  Clock,
  HelpCircle,
  Home
} from 'lucide-react';
import { SEOHead } from './SEOHead';
import { useEdgeSwipeBack } from '../hooks/useEdgeSwipeBack';

export interface RefundPolicyProps {
  onBack?: () => void;
  isEmbedded?: boolean;
  onContactSupport?: () => void;
}

export const RefundPolicy = ({
  onBack,
  isEmbedded = false,
  onContactSupport
}: RefundPolicyProps) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close 3-dot dropdown menu when tapping outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Robust back navigation to profile or preceding page
  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
    } else if (typeof window !== 'undefined' && window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/profile');
    }
  }, [onBack, navigate]);

  // Mobile gesture support: Swipe from left edge of screen to go back to profile
  useEdgeSwipeBack({
    onBack: handleBack,
    disabled: false
  });

  // Android native hardware back button support
  useEffect(() => {
    const handleHardwareBack = (e: Event) => {
      e.preventDefault();
      handleBack();
    };
    window.addEventListener('smartrun:hardware-back', handleHardwareBack);
    return () => {
      window.removeEventListener('smartrun:hardware-back', handleHardwareBack);
    };
  }, [handleBack]);

  return (
    <div
      id="refund-policy-container"
      className="min-h-screen bg-white text-slate-900 pb-20 font-sans"
    >
      <SEOHead
        title="Refund Policy | SmartRun Kolkata"
        description="SmartRun 7-day direct refund & replacement policy: 100% genuine guarantees, direct-to-source instant refunds, and transparent SLAs."
        keywords="smartrun refund policy, return policy, replacement guarantee, order cancellation"
      />

      {/* Top Navbar: Simple Heading 'Refund Policy', Back Button & 3-Dot Menu */}
      <header
        className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 pb-3.5 shadow-2xs"
        style={{ paddingTop: 'calc(0.875rem + max(env(safe-area-inset-top, 0px), var(--safe-area-top, 0px)))' }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3 relative">
          {/* Left: Back Button & Title */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <button
              id="btn-refund-policy-back"
              type="button"
              onClick={handleBack}
              className="p-1.5 -ml-1.5 rounded-full hover:bg-slate-100 active:bg-slate-200 text-slate-700 transition-colors cursor-pointer flex items-center justify-center shrink-0"
              aria-label="Go back to profile"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight whitespace-nowrap truncate">
              Refund Policy
            </h1>
          </div>

          {/* Right: Mobile Navigation 3-Dot Overflow Menu */}
          <div className="relative shrink-0" ref={menuRef}>
            <button
              id="btn-refund-policy-menu"
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="p-1.5 -mr-1.5 rounded-full hover:bg-slate-100 active:bg-slate-200 text-slate-700 transition-colors cursor-pointer flex items-center justify-center"
              aria-label="Navigation menu options"
              aria-expanded={isMenuOpen}
            >
              <MoreVertical className="w-5 h-5 text-slate-700" />
            </button>

            {/* 3-Dot Dropdown Menu Modal */}
            {isMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-52 sm:w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150 origin-top-right divide-y divide-slate-100"
              >
                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/profile');
                    }}
                    className="w-full px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Back to Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/shipping');
                    }}
                    className="w-full px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer transition-colors"
                  >
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>Shipping Policy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/return');
                    }}
                    className="w-full px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 text-amber-600" />
                    <span>Return Policy</span>
                  </button>
                </div>

                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/orders');
                    }}
                    className="w-full px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer transition-colors"
                  >
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>Order History</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (onContactSupport) {
                        onContactSupport();
                      } else {
                        navigate('/profile?sub=help');
                      }
                    }}
                    className="w-full px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-purple-500" />
                    <span>Help Center</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/');
                    }}
                    className="w-full px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer transition-colors"
                  >
                    <Home className="w-4 h-4 text-slate-500" />
                    <span>Storefront</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area - Clean Article Layout without unnecessary background boxes */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        
        {/* Article 1: 100% Direct to Source Account */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              1. Direct-to-Source Refund Guarantee
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold whitespace-nowrap shrink-0">
              100% Refund
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            SmartRun does <strong>not</strong> withhold your funds as locked in-app store credits or non-withdrawable wallet points. When an eligible order cancellation or return is confirmed, the full amount is returned directly through the <strong>Razorpay Payment Gateway</strong> to the original payment source you used (your original UPI handle, bank account, or debit/credit card).
          </p>

          {/* Highlight Box: Direct Refund Security */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold whitespace-nowrap">
                Zero Deduction
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[11px] font-bold whitespace-nowrap">
                Direct Bank Transfer
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-normal">
              ₹0 cancellation charges or processing fees are deducted when cancellations occur within the approved window.
            </p>
          </div>
        </section>

        {/* Article 2: The 2-Minute Cancellation Window */}
        <section className="space-y-3 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              2. Order Cancellation Rules
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold whitespace-nowrap shrink-0">
              60-Min Express
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Because our express delivery partners dispatch materials within minutes of placement, order processing begins immediately at our Kasba warehouse:
          </p>

          <div className="space-y-3 text-sm text-slate-700">
            <div className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
              <div>
                <strong className="text-slate-900">Cancelled Within 2 Minutes:</strong> You can cancel directly from the order screen. A 100% full refund is initiated automatically with an instant Razorpay Refund ID.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
              <div>
                <strong className="text-slate-900">After 2 Minutes:</strong> Once materials are packed or our delivery rider has departed, automatic in-app cancellation locks to protect warehouse operations. For urgent issues, please reach out to customer support immediately.
              </div>
            </div>
          </div>
        </section>

        {/* Article 3: Clearing Timelines by Payment Method */}
        <section className="space-y-3 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              3. Bank Clearing Timelines
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-semibold whitespace-nowrap shrink-0">
              Standard Banking SLA
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Refunds are released into the banking network immediately by Razorpay. Settlement into your account follows Indian banking turnaround schedules:
          </p>

          <div className="divide-y divide-slate-100 text-sm">
            <div className="py-3 flex items-center justify-between gap-3">
              <div>
                <p className="font-bold text-slate-900">UPI Payments</p>
                <p className="text-xs text-slate-500">Google Pay, PhonePe, Paytm, BHIM, CRED</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold whitespace-nowrap shrink-0">
                Instant – 24 Hours
              </span>
            </div>

            <div className="py-3 flex items-center justify-between gap-3">
              <div>
                <p className="font-bold text-slate-900">Debit &amp; Credit Cards</p>
                <p className="text-xs text-slate-500">Visa, MasterCard, RuPay (All issuing banks)</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold whitespace-nowrap shrink-0">
                5 to 7 Working Days
              </span>
            </div>

            <div className="py-3 flex items-center justify-between gap-3">
              <div>
                <p className="font-bold text-slate-900">Net Banking</p>
                <p className="text-xs text-slate-500">SBI, HDFC, ICICI, Axis, PNB &amp; others</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold whitespace-nowrap shrink-0">
                2 to 4 Working Days
              </span>
            </div>

            <div className="py-3 flex items-center justify-between gap-3">
              <div>
                <p className="font-bold text-slate-900">Cash on Delivery (COD)</p>
                <p className="text-xs text-slate-500">Payment not yet made</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold whitespace-nowrap shrink-0">
                ₹0 Charged
              </span>
            </div>
          </div>
        </section>

        {/* Article 4: Razorpay Refund ID & Bank ARN Tracking */}
        <section className="space-y-3 pt-6 border-t border-slate-100">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            4. Tracking Your Refund
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every refund initiated generates an official <strong>Razorpay Refund ID</strong> (e.g., <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-xs font-bold">rfnd_P18xyz9482</code>) and an <strong>Acquiring Bank Reference Number (ARN)</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
            <li><strong>Automated SMS &amp; Email:</strong> Razorpay dispatches notification messages directly to your registered contact upon fund release.</li>
            <li><strong>Bank Branch Trace:</strong> In the rare event a credit is delayed beyond the standard banking SLA, your bank manager can instantly locate the transaction using the ARN reference.</li>
          </ul>
        </section>

        {/* Article 5: 7-Day Return & Replacement Policy */}
        <section className="space-y-3 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              5. 7-Day Return &amp; Replacement Policy
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold whitespace-nowrap shrink-0">
              7-Day Window
            </span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Customers have up to <strong>7 calendar days from the date of delivery</strong> to return or replace products. If you receive an item that is defective, damaged during transit, or incorrect compared to your order:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
            <li><strong>Eligibility Criteria:</strong> Unused products with original manufacturer packaging, tags, barcodes, and accessories intact are 100% eligible for return or replacement.</li>
            <li><strong>How to Initiate a Return:</strong> Contact our Kolkata dispatch desk via phone/WhatsApp at <strong>+91 87774 00280</strong> or email <strong>support@smartrun.in</strong> with your 8-digit Order ID (e.g. <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded font-mono text-xs">#DE7A0E6C</code>).</li>
            <li><strong>Doorstep Pickup:</strong> Our delivery partner will pick up the item directly from your address at zero additional courier cost for verified defects or wrong items.</li>
            <li><strong>Refund Timeline:</strong> Once the returned item is verified at our Kasba hub, your full refund is processed within <strong>24 to 48 hours</strong> back to your original payment method (bank account, UPI, or card) via Razorpay, with zero restocking fees.</li>
            <li><strong>Non-Returnable Exceptions:</strong> Custom cut-to-length wires or opened paint/chemical buckets cannot be returned once unsealed or altered.</li>
          </ul>
        </section>

        {/* Highlight Box: Need Help / Support Section */}
        <section className="pt-6 border-t border-slate-100">
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Have questions about a refund?
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold whitespace-nowrap shrink-0">
                Daily 9 AM – 9 PM
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our Kolkata finance and dispatch desk is ready to help you track references or answer questions.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                id="link-call-helpline"
                href="tel:+918777400280"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl transition-all shadow-2xs whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Support (+91 87774 00280)</span>
              </a>
              {onContactSupport && (
                <button
                  type="button"
                  onClick={onContactSupport}
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Open Help Center</span>
                </button>
              )}
            </div>
            <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-500">
              <strong>SmartRun materials pvt. ltd</strong> • Kheyadah Village, Bhagabanpur, Kolkata 700150
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
