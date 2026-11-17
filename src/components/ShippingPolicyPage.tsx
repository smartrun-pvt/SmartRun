import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Truck,
  Clock,
  ShieldCheck,
  MapPin,
  PhoneCall,
  CheckCircle2,
  PackageCheck,
  AlertCircle,
  MoreVertical,
  User,
  RotateCcw,
  Home,
  HelpCircle
} from 'lucide-react';
import { SEOHead } from './SEOHead';
import { useEdgeSwipeBack } from '../hooks/useEdgeSwipeBack';
import { ProfileSubPageNavbar } from './profile/ProfileSubPageNavbar';
import { navigateBackSafely } from '../utils/navigationHistory';

export interface ShippingPolicyProps {
  onBack?: () => void;
  onContactSupport?: () => void;
}

export const ShippingPolicy: React.FC<ShippingPolicyProps> = ({
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
    } else {
      navigateBackSafely(navigate, '/profile');
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
      id="shipping-policy-container"
      className="min-h-screen bg-[#F3EDE0] text-[#2C261E] pb-20 font-sans overflow-x-clip"
    >
      <SEOHead
        title="Shipping Policy | SmartRun Kolkata"
        description="SmartRun 60-minute express courier delivery, transparent shipping rates, service areas across Kolkata, live GPS tracking, and delivery terms."
        keywords="smartrun shipping policy, express delivery kolkata, electrical supplies delivery, 60-min delivery, shipping charges"
      />

      {/* Top Navbar: Unified ProfileSubPageNavbar with 3-Dot Mobile Menu */}
      <ProfileSubPageNavbar
        title="Shipping Policy"
        onBack={handleBack}
        backButtonId="btn-shipping-policy-back"
        backAriaLabel="Go back to profile"
        containerMaxWidthClass="max-w-6xl"
        containerPaddingClass="px-4 sm:px-6 lg:px-10"
        rightContent={
          <div className="relative shrink-0" ref={menuRef}>
            <button
              id="btn-shipping-policy-menu"
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="min-w-[40px] min-h-[40px] -mr-2 rounded-full hover:bg-black/10 active:bg-black/15 text-slate-900 transition-colors cursor-pointer flex items-center justify-center"
              aria-label="Navigation menu options"
              aria-expanded={isMenuOpen}
            >
              <MoreVertical className="w-5 h-5 text-slate-900" />
            </button>

            {/* 3-Dot Dropdown Menu Modal */}
            {isMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-52 sm:w-56 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150 origin-top-right divide-y divide-slate-100"
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
                    <User className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>Back to Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/return');
                    }}
                    className="w-full px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Return Policy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/refund-policy');
                    }}
                    className="w-full px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
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
                    <Clock className="w-4 h-4 text-blue-500 shrink-0" />
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
                    <HelpCircle className="w-4 h-4 text-purple-500 shrink-0" />
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
                    <Home className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>Storefront</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        }
      />

      {/* Main Content Area */}
      <div
        style={{
          paddingLeft: 'var(--safe-area-left, env(safe-area-inset-left, 0px))',
          paddingRight: 'var(--safe-area-right, env(safe-area-inset-right, 0px))'
        }}
      >
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-6 sm:py-8 space-y-6 sm:space-y-8">

        {/* Section 1: Overview & 60-Minute Express Delivery */}
        <section className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#2C261E] flex items-center gap-2 min-w-0">
              <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>1. Delivery Timelines &amp; Dispatch Modes</span>
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold whitespace-nowrap shrink-0">
              60-Min Express
            </span>
          </div>

          <p className="text-sm sm:text-base text-[#4A4235] leading-relaxed">
            SmartRun (operated by <strong>SmartRun materials pvt. ltd</strong>) operates a dedicated fulfillment depot and quick-commerce dispatch network located at our Kasba and Kheyadah hubs in Kolkata. We provide two distinct delivery channels:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
            <div className="border-l-2 border-emerald-600/70 pl-4 py-0.5 space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <h3 className="font-bold text-[#2C261E] text-sm">60-Minute Express Courier</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#4A4235] leading-relaxed">
                Applies to urgent electrical supplies, modular switches, copper wire coils, LED lighting, circuit breakers, and hand tools (orders up to 20 kg). Dispatched immediately via our dedicated two-wheeler delivery fleet.
              </p>
              <span className="inline-block text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                Standard Transit: 30 to 60 minutes
              </span>
            </div>

            <div className="border-l-2 border-blue-600/70 pl-4 py-0.5 space-y-2">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="font-bold text-[#2C261E] text-sm">Same-Day / Site Freight</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#4A4235] leading-relaxed">
                Applies to heavy construction raw materials including UltraTech / ACC cement bags, Tata Tiscon TMT steel rebars, sand, and long-length PVC conduits. Delivered via commercial vehicles during Kolkata municipal freight hours.
              </p>
              <span className="inline-block text-[11px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                Standard Transit: Same-Day / 24 Hours
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: Delivery Coverage Areas */}
        <section className="pt-6 sm:pt-7 border-t border-[#DFD4BC] space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#2C261E] flex items-center gap-2 min-w-0">
              <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>2. Coverage &amp; Serviceable Pincodes</span>
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-bold whitespace-nowrap shrink-0">
              Greater Kolkata
            </span>
          </div>

          <p className="text-sm sm:text-base text-[#4A4235] leading-relaxed">
            We currently provide door-to-door express delivery across Kolkata, Howrah, and South 24 Parganas, covering key pin codes including:
          </p>

          <div className="border-l-2 border-[#C7B99B] pl-4 py-0.5 space-y-1.5">
            <p className="text-xs sm:text-sm text-[#4A4235] leading-relaxed font-medium">
              <strong>Core Service Zones:</strong> Kasba (700039, 700042), Ballygunge (700019), Gariahat (700029), Jadavpur &amp; Dhakuria (700031, 700032), Ruby &amp; Anandapur (700107), Kheyadah &amp; Bhagabanpur (700150), EM Bypass, Garia (700084), Tollygunge (700033), Salt Lake (700064, 700091, 700098), and New Town (700156, 700135).
            </p>
            <p className="text-[11px] sm:text-xs text-[#6B6254]">
              Customers can confirm delivery eligibility instantly by entering their 6-digit delivery pincode on any product page.
            </p>
          </div>
        </section>

        {/* Section 3: Shipping Charges & Free Delivery Threshold */}
        <section className="pt-6 sm:pt-7 border-t border-[#DFD4BC] space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#2C261E] flex items-center gap-2 min-w-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>3. Transparent Shipping Fees</span>
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold whitespace-nowrap shrink-0">
              Zero Hidden Charges
            </span>
          </div>

          <p className="text-sm sm:text-base text-[#4A4235] leading-relaxed">
            We maintain completely transparent pricing with zero surprise charges at checkout:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-sm text-[#4A4235] leading-relaxed">
            <li>
              <strong>Standard Delivery Fee:</strong> ₹49 for standard express orders.
            </li>
            <li>
              <strong>Free Delivery Eligibility:</strong> Orders meeting the promotional cart threshold (or when free delivery is activated by the hub) receive 100% free delivery across serviceable Kolkata pincodes.
            </li>
            <li>
              <strong>Handling / Processing:</strong> Nominal ₹9 handling fee per order for protective packaging and quality audit.
            </li>
            <li>
              <strong>Special Weather / Surge:</strong> During severe monsoon downpours or municipal red alerts in Kolkata, a nominal weather fee (₹15–₹20) may apply directly to safeguard our delivery riders. Any surcharge is calculated and shown explicitly before you confirm payment.
            </li>
          </ul>
        </section>

        {/* Section 4: Live Order Tracking & Dispatch Proof */}
        <section className="pt-6 sm:pt-7 border-t border-[#DFD4BC] space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#2C261E] flex items-center gap-2 min-w-0">
              <PackageCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>4. Real-Time Order Tracking &amp; OTP Verification</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#4A4235] leading-relaxed">
            Every order placed on SmartRun is tracked end-to-end:
          </p>

          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A4235] leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Live Delivery Partner GPS:</strong> Once dispatched, track your rider in real time with our live map interface.</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A4235] leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Rider Identification:</strong> Delivery partner name, contact number, vehicle registration number, and live rating are displayed directly on your order tracking page.</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A4235] leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Secure Doorstep Handover:</strong> Orders are verified and handed over at your doorstep or job site with tamper-proof packaging.</span>
            </div>
          </div>
        </section>

        {/* Section 5: Unloading & Site Accessibility */}
        <section className="pt-6 sm:pt-7 border-t border-[#DFD4BC] space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#2C261E] flex items-center gap-2 min-w-0">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>5. Site Accessibility &amp; Material Unloading</span>
            </h2>
          </div>

          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#4A4235] leading-relaxed">
            <li>Customer must ensure suitable road access for standard delivery bikes (express items) or commercial trucks (cement, sand, TMT steel).</li>
            <li>For high-rise residential or commercial complexes without a freight elevator, material delivery is completed at the ground-floor gate or designated unloading bay.</li>
            <li>Inspect sealed packaging at the time of delivery. In the rare case of transit damage or missing items, inform the delivery rider immediately or contact our support desk.</li>
          </ul>
        </section>

        {/* Section 6: Official Support & Entity Information */}
        <section className="pt-6 sm:pt-7 border-t border-[#DFD4BC] space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm sm:text-base font-bold text-[#2C261E] min-w-0">
              Need Help with Your Delivery?
            </h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold whitespace-nowrap shrink-0">
              Daily 8:00 AM – 10:00 PM IST
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#4A4235] leading-relaxed">
            Our Kolkata operations desk is available 7 days a week to assist with order tracking, driver dispatch, and contractor scheduling.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              id="link-shipping-call"
              href="tel:+918777400280"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl transition-all shadow-2xs whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Support (+91 87774 00280)</span>
            </a>

            <a
              id="link-shipping-email"
              href="mailto:support@smartrun.in"
              className="inline-flex items-center gap-1.5 bg-[#EAE1CE] hover:bg-[#DFD4BC] border border-[#D8CCB4] text-[#2C261E] font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Email support@smartrun.in</span>
            </a>
          </div>

          <div className="pt-3 border-t border-[#DFD4BC] text-[11px] sm:text-xs text-[#6B6254] space-y-1">
            <div>
              <strong>Legal Entity:</strong> SmartRun materials pvt. ltd
            </div>
            <div>
              <strong>Registered Office:</strong> Kheyadah Village, Bhagabanpur, Kolkata, West Bengal - 700150
            </div>
          </div>
        </section>

      </main>
      </div>
    </div>
  );
};
