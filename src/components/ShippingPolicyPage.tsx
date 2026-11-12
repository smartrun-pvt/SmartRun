import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
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
  HelpCircle,
  FileText
} from 'lucide-react';
import { SEOHead } from './SEOHead';
import { useEdgeSwipeBack } from '../hooks/useEdgeSwipeBack';

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
      id="shipping-policy-container"
      className="min-h-screen bg-white text-slate-900 pb-20 font-sans"
    >
      <SEOHead
        title="Shipping Policy | SmartRun Kolkata"
        description="SmartRun 60-minute express courier delivery, transparent shipping rates, service areas across Kolkata, live GPS tracking, and delivery terms."
        keywords="smartrun shipping policy, express delivery kolkata, electrical supplies delivery, 60-min delivery, shipping charges"
      />

      {/* Top Navbar: Heading 'Shipping Policy', Back Button & 3-Dot Mobile Menu */}
      <header
        className="bg-[#f7aef8] border-b border-[#e99ee7] sticky top-0 z-30 shadow-xs [transform:translateZ(0)] [backface-visibility:hidden] will-change-transform min-h-[64px] sm:min-h-[68px] flex flex-col justify-center transition-all"
        style={{
          backgroundColor: '#f7aef8',
          paddingTop: 'max(env(safe-area-inset-top, 0px), var(--safe-area-top, 0px))'
        }}
      >
        <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-3 relative">
          {/* Left: Back Button & Title */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <button
              id="btn-shipping-policy-back"
              type="button"
              onClick={handleBack}
              className="p-1.5 -ml-1 rounded-full hover:bg-black/10 active:bg-black/15 text-slate-900 transition-colors cursor-pointer flex items-center justify-center shrink-0"
              aria-label="Go back to profile"
            >
              <ChevronLeft className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </button>
            <h1
              className="text-xl sm:text-2xl text-slate-950 font-normal leading-tight font-playfair tracking-normal whitespace-nowrap truncate"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
            >
              Shipping Policy
            </h1>
          </div>

          {/* Right: Mobile Navigation 3-Dot Overflow Menu */}
          <div className="relative shrink-0" ref={menuRef}>
            <button
              id="btn-shipping-policy-menu"
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="p-1.5 -mr-1.5 rounded-full hover:bg-black/10 active:bg-black/15 text-slate-900 transition-colors cursor-pointer flex items-center justify-center"
              aria-label="Navigation menu options"
              aria-expanded={isMenuOpen}
            >
              <MoreVertical className="w-5 h-5 text-slate-900" />
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
                      navigate('/return');
                    }}
                    className="w-full px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium text-slate-800 hover:bg-slate-50 flex items-center gap-2.5 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 text-amber-600" />
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

        {/* Section 1: Overview & 60-Minute Express Delivery */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-600" />
              1. Delivery Timelines &amp; Dispatch Modes
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold whitespace-nowrap shrink-0">
              60-Min Express
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            SmartRun (operated by <strong>SmartRun materials pvt. ltd</strong>) operates a dedicated fulfillment depot and quick-commerce dispatch network located at our Kasba and Kheyadah hubs in Kolkata. We provide two distinct delivery channels:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <h3 className="font-bold text-slate-900 text-sm">60-Minute Express Courier</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applies to urgent electrical supplies, modular switches, copper wire coils, LED lighting, circuit breakers, and hand tools (orders up to 20 kg). Dispatched immediately via our dedicated two-wheeler delivery fleet.
              </p>
              <span className="inline-block text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                Standard Transit: 30 to 60 minutes
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                <h3 className="font-bold text-slate-900 text-sm">Same-Day / Site Freight</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applies to heavy construction raw materials including UltraTech / ACC cement bags, Tata Tiscon TMT steel rebars, sand, and long-length PVC conduits. Delivered via commercial vehicles during Kolkata municipal freight hours.
              </p>
              <span className="inline-block text-[11px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                Standard Transit: Same-Day / 24 Hours
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: Delivery Coverage Areas */}
        <section className="space-y-3 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              2. Coverage &amp; Serviceable Pincodes
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-bold whitespace-nowrap shrink-0">
              Greater Kolkata
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            We currently provide door-to-door express delivery across Kolkata, Howrah, and South 24 Parganas, covering key pin codes including:
          </p>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              <strong>Core Service Zones:</strong> Kasba (700039, 700042), Ballygunge (700019), Gariahat (700029), Jadavpur &amp; Dhakuria (700031, 700032), Ruby &amp; Anandapur (700107), Kheyadah &amp; Bhagabanpur (700150), EM Bypass, Garia (700084), Tollygunge (700033), Salt Lake (700064, 700091, 700098), and New Town (700156, 700135).
            </p>
            <p className="text-[11px] text-slate-500">
              Customers can confirm delivery eligibility instantly by entering their 6-digit delivery pincode on any product page.
            </p>
          </div>
        </section>

        {/* Section 3: Shipping Charges & Free Delivery Threshold */}
        <section className="space-y-3 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              3. Transparent Shipping Fees
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold whitespace-nowrap shrink-0">
              Zero Hidden Charges
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            We maintain completely transparent pricing with zero surprise charges at checkout:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
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
        <section className="space-y-3 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-emerald-600" />
              4. Real-Time Order Tracking &amp; OTP Verification
            </h2>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Every order placed on SmartRun is tracked end-to-end:
          </p>

          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5 text-xs text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Live Delivery Partner GPS:</strong> Once dispatched, track your rider in real time with our live map interface.</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Rider Identification:</strong> Delivery partner name, contact number, vehicle registration number, and live rating are displayed directly on your order tracking page.</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Secure Doorstep Handover:</strong> Orders are verified and handed over at your doorstep or job site with tamper-proof packaging.</span>
            </div>
          </div>
        </section>

        {/* Section 5: Unloading & Site Accessibility */}
        <section className="space-y-3 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              5. Site Accessibility &amp; Material Unloading
            </h2>
          </div>

          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
            <li>Customer must ensure suitable road access for standard delivery bikes (express items) or commercial trucks (cement, sand, TMT steel).</li>
            <li>For high-rise residential or commercial complexes without a freight elevator, material delivery is completed at the ground-floor gate or designated unloading bay.</li>
            <li>Inspect sealed packaging at the time of delivery. In the rare case of transit damage or missing items, inform the delivery rider immediately or contact our support desk.</li>
          </ul>
        </section>

        {/* Section 6: Official Support & Entity Information */}
        <section className="pt-6 border-t border-slate-100">
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Need Help with Your Delivery?
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold whitespace-nowrap shrink-0">
                Daily 8:00 AM – 10:00 PM IST
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
