import React, { useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft,
  Smartphone,
  ExternalLink,
  Zap,
  Hammer,
  MapPin,
  FileText,
  Wrench,
  CreditCard,
  ShieldCheck,
  Palette,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { SEOHead } from './SEOHead';
import { Footer } from './Footer';
import { trackPlayStoreClick } from '../utils/analytics';
import { useEdgeSwipeBack } from '../hooks/useEdgeSwipeBack';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=in.smartrun.app';

export const SmartRunAppPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const handleBack = useCallback(() => {
    if (typeof window !== 'undefined' && window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEdgeSwipeBack({ onBack: handleBack, disabled: false });

  useEffect(() => {
    const handleHardwareBack = (e: Event) => {
      e.preventDefault();
      handleBack();
    };
    window.addEventListener('smartrun:hardware-back', handleHardwareBack);
    return () => window.removeEventListener('smartrun:hardware-back', handleHardwareBack);
  }, [handleBack]);

  const verifiedFeatures = [
    {
      icon: Zap,
      title: '60-Minute Express Electrical Delivery',
      description:
        'Order house wiring cables (Polycab, Havells, RR Kabel, Finolex), Schneider Electric MCBs, Legrand modular switches, LED lights, and tools dispatched from SmartRun Kasba Central Depot across serviceable Kolkata PIN codes.'
    },
    {
      icon: Palette,
      title: 'IS 694 Wire Colour & Variant Selector',
      description:
        'Pick exact wire colours (Red, Black, Blue, Yellow, Green, White, Grey) and conduit sizes with variant-specific images, pricing, and stock status before checkout.'
    },
    {
      icon: Hammer,
      title: 'Direct Construction & Building Materials',
      description:
        'Schedule site delivery for UltraTech and ACC cement bags, Tata Tiscon TMT rebars, Dr. Fixit waterproofing chemicals, plywood sheets, tiles, and Astral plumbing pipes.'
    },
    {
      icon: MapPin,
      title: 'Live Delivery Partner GPS Tracking',
      description:
        'Monitor dispatched orders in real time on an interactive delivery map with assigned rider contact details and vehicle registration verification.'
    },
    {
      icon: FileText,
      title: 'GST Tax Invoices for ITC Claims',
      description:
        'Every completed order generates an A4 PDF GST tax invoice containing HSN/SAC codes, CGST/SGST tax breakdown, and your registered GSTIN.'
    },
    {
      icon: Wrench,
      title: 'Licensed Electrician Discovery',
      description:
        'Browse West Bengal Electrical Licensing Board (WBELB) verified electricians and wiring contractors serving your neighbourhood in Kolkata.'
    },
    {
      icon: CreditCard,
      title: 'UPI, Cards, Net Banking & COD',
      description:
        'Complete checkout securely via Razorpay (UPI, RuPay/Visa/MasterCard, Net Banking) or choose Cash on Delivery on eligible orders.'
    },
    {
      icon: ShieldCheck,
      title: 'Unified Web & Android Account Sync',
      description:
        'Sign in with Mobile OTP or Google Account on both smartrun.in and the Android app to share your cart, saved site addresses, and order history seamlessly.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      <SEOHead
        title="SmartRUN: Materials Delivery Android App (in.smartrun.app) | SmartRun Kolkata"
        description="Download SmartRUN: Materials Delivery on Google Play (in.smartrun.app) or order online at smartrun.in for 60-min electrical supplies, building materials, live GPS tracking & GST invoices in Kolkata."
        keywords="SmartRUN app, Smart Run Android app, in.smartrun.app, electrical supplies app Kolkata, construction materials ordering app, Play Store SmartRun"
      />

      {/* Sticky Header */}
      <header
        className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-2xs"
        style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), var(--safe-area-top, 0px))' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={handleBack}
              className="p-1.5 -ml-1 rounded-full hover:bg-slate-100 text-slate-800 transition-colors cursor-pointer shrink-0"
              aria-label="Go back"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
            </button>
            <div className="flex items-center gap-2 min-w-0">
              <Smartphone className="w-5 h-5 text-emerald-700 shrink-0" />
              <span className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                SmartRUN Android App
              </span>
            </div>
          </div>

          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackPlayStoreClick('app_page_header')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold whitespace-nowrap transition-colors shrink-0"
          >
            <span>Google Play</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Hero Overview */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <img
                src="/SmartRun.png"
                alt="SmartRUN: Materials Delivery Official Android App Icon"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-slate-200 bg-white object-contain p-1.5 shrink-0"
              />
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  Official Mobile &amp; Web Platform • in.smartrun.app
                </p>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                  SmartRUN: Materials Delivery App
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                  Built by <strong>SmartRun Materials Pvt. Ltd.</strong> for homeowners, electricians, builders, and site engineers in Kolkata and Howrah. Order electrical wires, switchgear, building supplies, and licensed electrical services from one account.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackPlayStoreClick('app_page_hero')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-colors"
            >
              <span>Download on Google Play</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              to="/electrical"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs sm:text-sm font-black transition-colors"
            >
              <span>Order on Web Storefront</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/how-to-use"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-semibold transition-colors"
            >
              <span>Ordering Guide</span>
            </Link>
          </div>

          {/* Factual App Verification Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 text-xs">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70">
              <p className="text-[11px] font-semibold text-slate-500">App Name</p>
              <p className="font-bold text-slate-900 mt-0.5">SmartRUN: Materials Delivery</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70">
              <p className="text-[11px] font-semibold text-slate-500">Android Package ID</p>
              <p className="font-mono font-bold text-slate-900 mt-0.5">in.smartrun.app</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70">
              <p className="text-[11px] font-semibold text-slate-500">Primary Service Region</p>
              <p className="font-bold text-slate-900 mt-0.5">Kolkata &amp; Howrah (700001–711106)</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70">
              <p className="text-[11px] font-semibold text-slate-500">Publisher</p>
              <p className="font-bold text-slate-900 mt-0.5">SmartRun Materials Pvt. Ltd.</p>
            </div>
          </div>
        </section>

        {/* Verified App Capabilities */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-5">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              What You Can Do in the SmartRUN App
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Every capability listed below is active in both the Android app (<code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">in.smartrun.app</code>) and web store (<code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">www.smartrun.in</code>).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {verifiedFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <article
                  key={feat.title}
                  className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 flex items-start gap-3"
                >
                  <div className="p-2 rounded-xl bg-white border border-slate-200 text-emerald-700 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">{feat.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Cross-Platform Workflows & Quick Navigation */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
          <h2 className="text-lg font-black text-slate-900">Explore Platform Catalogs &amp; Policies</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <li>
              <Link
                to="/electrical"
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition-colors font-bold text-slate-900"
              >
                <span>Electrical Materials Store</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
            </li>
            <li>
              <Link
                to="/construction"
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition-colors font-bold text-slate-900"
              >
                <span>Construction Materials</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
            </li>
            <li>
              <Link
                to="/delivery-areas"
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition-colors font-bold text-slate-900"
              >
                <span>Check Delivery Service Areas</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
            </li>
            <li>
              <Link
                to="/technicians"
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition-colors font-bold text-slate-900"
              >
                <span>Certified Electricians</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
            </li>
            <li>
              <Link
                to="/faqs"
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition-colors font-bold text-slate-900"
              >
                <span>Frequently Asked Questions</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition-colors font-bold text-slate-900"
              >
                <span>Contact &amp; Contractor Desk</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
            </li>
          </ul>
          <div className="flex items-start gap-2 pt-2 text-xs text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              Android App Links (<code className="font-mono text-[11px]">smartrun://</code> and HTTPS verified links) open product pages and live order tracking directly inside the installed Android application.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
