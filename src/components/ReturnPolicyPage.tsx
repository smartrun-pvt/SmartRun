import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Truck,
  ShieldCheck,
  PhoneCall,
  Clock,
  PackageCheck,
  MoreVertical,
  User,
  Home,
  HelpCircle,
  FileText
} from 'lucide-react';
import { SEOHead } from './SEOHead';
import { useEdgeSwipeBack } from '../hooks/useEdgeSwipeBack';

export interface ReturnPolicyProps {
  onBack?: () => void;
  onContactSupport?: () => void;
}

export const ReturnPolicyPage: React.FC<ReturnPolicyProps> = ({
  onBack,
  onContactSupport
}) => {
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
      id="return-policy-container"
      className="min-h-screen bg-white text-slate-900 pb-20 font-sans"
    >
      <SEOHead
        title="Return Policy | SmartRun Kolkata"
        description="SmartRun 7-day doorstep return policy: 100% free reverse pickup, instant replacement, and direct-to-source refunds across Kolkata."
        keywords="smartrun return policy, product returns, return window, doorstep pickup, replacement guarantee"
      />

      {/* Top Navbar: Heading 'Return Policy', Back Button & 3-Dot Mobile Menu */}
      <header
        className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 pb-3.5 shadow-2xs"
        style={{ paddingTop: 'calc(0.875rem + max(env(safe-area-inset-top, 0px), var(--safe-area-top, 0px)))' }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3 relative">
          {/* Left: Back Button & Title */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <button
              id="btn-return-policy-back"
              type="button"
              onClick={handleBack}
              className="p-1.5 -ml-1.5 rounded-full hover:bg-slate-100 active:bg-slate-200 text-slate-700 transition-colors cursor-pointer flex items-center justify-center shrink-0"
              aria-label="Go back to profile"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight whitespace-nowrap truncate">
              Return Policy
            </h1>
          </div>

          {/* Right: Mobile Navigation 3-Dot Overflow Menu */}
          <div className="relative shrink-0" ref={menuRef}>
            <button
              id="btn-return-policy-menu"
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
                      navigate('/refund-policy');
                    }}
                    className="w-full px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Refund Policy</span>
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

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">

        {/* Section 1: 7-Day Doorstep Return Window */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-amber-600" />
              1. 7-Day Doorstep Return Window
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold whitespace-nowrap shrink-0">
              7-Day Guarantee
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            At SmartRun (operated by <strong>SmartRun materials pvt. ltd</strong>), customer satisfaction is our top priority. We offer a transparent, hassle-free <strong>7-day return and replacement policy</strong> starting from the timestamp of doorstep delivery for all eligible electrical items, appliances, lighting, switchgear, tools, and construction accessories.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <h3 className="font-bold text-slate-900 text-sm">Hassle-Free Timeline</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              You have 7 full calendar days from the moment your order status changes to <em>Delivered</em> to raise a return or replacement request. Our system logs the verified OTP delivery timestamp for accurate tracking.
            </p>
          </div>
        </section>

        {/* Section 2: Return Eligibility & Conditions */}
        <section className="space-y-3 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              2. Return Eligibility &amp; Product Condition
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold whitespace-nowrap shrink-0">
              Genuine Items
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            To qualify for a return or replacement, the item must meet the following standard criteria:
          </p>

          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Defective or Transit-Damaged:</strong> Any product received broken, physically damaged during transit, or functionally non-operational out of the box.</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Wrong Item Delivered:</strong> Mismatched model, color, ampere rating, brand, or wire gauge compared to your order invoice.</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Original Packaging:</strong> Products must be returned in their original brand packaging, with manufacturer warranty cards, user manuals, and all included accessories intact.</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Uninstalled Status:</strong> Modular switches, MCBs, distribution boards, and fixtures must not have been permanently wired into walls or electrical conduits.</span>
            </div>
          </div>
        </section>

        {/* Section 3: Non-Returnable & Customized Categories */}
        <section className="space-y-3 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600" />
              3. Non-Returnable &amp; Customized Materials
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold whitespace-nowrap shrink-0">
              Exceptions
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            In accordance with industry standards and safety regulations, the following items are strictly non-returnable once accepted at delivery:
          </p>

          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
            <li><strong>Cut-to-Length Wire Coils:</strong> Electric wire or submersible cable coils cut to custom requested meter lengths upon customer order. Standard pre-packaged factory boxes (90m, 180m) remain eligible if unopened.</li>
            <li><strong>Bulk Raw Construction Materials:</strong> UltraTech / ACC cement bags and loose aggregate (sand/stone chips) once unloaded and exposed to humidity or weather conditions.</li>
            <li><strong>Opened Waterproofing &amp; Chemical Adhesives:</strong> Dr. Fixit or tile adhesives where safety foil seals have been unsealed or partially utilized.</li>
            <li><strong>Customized Color Tints:</strong> Paint or tint preparations specially machine-mixed per customer shade codes.</li>
          </ul>
        </section>

        {/* Section 4: 100% Free Reverse Courier Pickup */}
        <section className="space-y-3 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-600" />
              4. 100% Free Reverse Courier Pickup
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold whitespace-nowrap shrink-0">
              ₹0 Reverse Fee
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Unlike traditional platforms that charge return logistics fees or require customers to visit third-party courier offices, SmartRun dispatches our dedicated two-wheeler express delivery partners directly to your address:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                24-Hour Pickup SLA
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reverse courier pickup is scheduled and completed within 24 hours of return approval across all serviceable Kolkata pincodes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Zero Cost to Customer
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero pickup charges, zero reverse freight deductions, and zero handling fees apply to verified return requests.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Doorstep Inspection & Quality Check */}
        <section className="space-y-3 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-blue-600" />
              5. Doorstep Inspection &amp; Resolution
            </h2>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Our delivery partner conducts a quick 2-minute physical inspection at your doorstep:
          </p>

          <div className="space-y-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong>Option A: Immediate Replacement (Recommended)</strong> — If you need the electrical component to finish your ongoing wiring job, our hub immediately dispatches a brand-new, sealed replacement within 60 minutes.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong>Option B: 100% Direct-to-Source Refund</strong> — If you prefer a refund, 100% of the purchase amount is instantly initiated via Razorpay back to your original payment method (UPI, bank account, or card) with zero deductions.
            </div>
          </div>
        </section>

        {/* Section 6: How to Initiate a Return */}
        <section className="space-y-3 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              6. How to Initiate a Return Request
            </h2>
          </div>

          <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
            <li><strong>Via Order History:</strong> Open the SmartRun app, navigate to <em>Orders</em>, select your recent order, and tap <em>Return / Replace Item</em>.</li>
            <li><strong>Via Help Center:</strong> Navigate to Profile &gt; <em>Help Center</em> to chat with our operations desk or submit an instant return ticket with photo proof.</li>
            <li><strong>Via Phone Support:</strong> Call our Kolkata depot directly at <strong>+91 87774 00280</strong> (Daily 8:00 AM – 10:00 PM IST) with your 8-character Order ID (e.g., #DE7A0E6C).</li>
          </ol>
        </section>

        {/* Section 7: Official Support & Entity Information */}
        <section className="pt-6 border-t border-slate-100">
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Questions Regarding Returns?
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold whitespace-nowrap shrink-0">
                Daily 8:00 AM – 10:00 PM IST
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our Kolkata fulfillment and customer support team is ready to assist you with fast return pickups and immediate replacements.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                id="link-return-call"
                href="tel:+918777400280"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl transition-all shadow-2xs whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Support (+91 87774 00280)</span>
              </a>

              <a
                id="link-return-email"
                href="mailto:support@smartrun.in"
                className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Email support@smartrun.in</span>
              </a>
            </div>

            <div className="pt-3 border-t border-slate-200/80 text-[11px] text-slate-500 space-y-1">
              <div>
                <strong>Legal Entity:</strong> SmartRun materials pvt. ltd
              </div>
              <div>
                <strong>Registered Office:</strong> Kheyadah Village, Bhagabanpur, Kolkata, West Bengal - 700150
              </div>
              <div>
                <strong>Kasba Fulfillment Hub:</strong> Bediadanga 1st Lane, Nator Park, Kasba, Kolkata, West Bengal - 700039
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};
