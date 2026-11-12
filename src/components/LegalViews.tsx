import React from 'react';
import { Link } from 'react-router-dom';
import { RefundPolicy } from './RefundPolicy';
import { ReturnPolicyPage } from './ReturnPolicyPage';
import { ShippingPolicy } from './ShippingPolicyPage';
import { PrivacyPolicyPage } from './PrivacyPolicyPage';
import { TermsOfServicePage } from './TermsOfServicePage';
import { FAQPage } from './FAQPage';
import { Footer } from './Footer';
import {
  ChevronLeft,
  ShieldCheck,
  FileText,
  Lock,
  Mail,
  Phone,
  MapPin,
  RotateCcw,
  Truck,
  HelpCircle,
  Building2,
  CheckCircle2,
  Globe,
  ExternalLink,
  Scale,
  AlertTriangle,
  Zap,
  Users
} from 'lucide-react';
import { SEOHead } from './SEOHead';
import { trackPlayStoreClick } from '../utils/analytics';

export type LegalPageType = 'privacy' | 'terms' | 'refund' | 'return' | 'shipping' | 'about' | 'faqs';

interface LegalViewProps {
  onBack: () => void;
  type: LegalPageType;
}

export const LegalView = ({ onBack, type }: LegalViewProps) => {
  const effectiveDate = 'October 11, 2026';

  // Always reset scroll to top when legal view opens or changes type
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [type]);

  const getPageMeta = () => {
    switch (type) {
      case 'about':
        return {
          title: 'About Us',
          subtitle: 'Kolkata’s Premier Express Electricals & Quick Commerce Building Supplies Depot',
          icon: Building2,
          badge: 'Company Profile'
        };
      case 'faqs':
        return {
          title: 'Frequently Asked Questions (FAQ)',
          subtitle: 'Quick answers about ordering, 60-min delivery, bulk contractor pricing & GST tax invoices',
          icon: HelpCircle,
          badge: 'Help Center'
        };
      case 'refund':
        return {
          title: 'Refund Policy',
          subtitle: 'Instant direct-to-source refunds, ₹0 cancellation deductions, and transparent Razorpay SLAs',
          icon: RotateCcw,
          badge: 'Customer Protection'
        };
      case 'return':
        return {
          title: 'Return Policy',
          subtitle: '7-day hassle-free doorstep returns, 100% free reverse pickup, and instant replacements',
          icon: RotateCcw,
          badge: 'Customer Protection'
        };
      case 'shipping':
        return {
          title: 'Shipping Policy',
          subtitle: '60-Minute rapid bike dispatch and calibrated heavy freight site delivery across Kolkata',
          icon: Truck,
          badge: 'Logistics Policy'
        };
      case 'privacy':
        return {
          title: 'Privacy Policy',
          subtitle: 'DPDP Act 2023 & IT Act Compliant — How SmartRun protects, encrypts, and handles your data',
          icon: Lock,
          badge: 'Legal & Compliance'
        };
      case 'terms':
      default:
        return {
          title: 'Terms of Service',
          subtitle: 'Statutory rules, copyright protections, anti-framing policies, and conditions of use',
          icon: Scale,
          badge: 'Legal & Compliance'
        };
    }
  };

  if (type === 'refund') {
    return <RefundPolicy onBack={onBack} />;
  }

  if (type === 'return') {
    return <ReturnPolicyPage onBack={onBack} />;
  }

  if (type === 'shipping') {
    return <ShippingPolicy onBack={onBack} />;
  }

  if (type === 'faqs') {
    return <FAQPage onBack={onBack} />;
  }

  if (type === 'privacy') {
    return <PrivacyPolicyPage onBack={onBack} />;
  }

  if (type === 'terms') {
    return <TermsOfServicePage onBack={onBack} />;
  }

  const meta = getPageMeta();
  const IconComponent = meta.icon;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">
      <SEOHead
        title={`${meta.title} | SmartRun`}
        description={meta.subtitle}
      />
      {/* Top Header */}
      <div
        className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-2xs"
        style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), var(--safe-area-top, 0px))' }}
      >
        <div className="max-w-3xl mx-auto px-4 py-2.5 sm:py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="p-1.5 -ml-1 rounded-full hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
              title="Back"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
            </button>
            <div className="flex items-center gap-2">
              <IconComponent className="w-5 h-5 text-[#00875a]" />
              <h1 className="text-base sm:text-lg font-black text-slate-900">
                {meta.title}
              </h1>
            </div>
          </div>

          {meta.badge ? (
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
              {meta.badge}
            </span>
          ) : null}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Banner Card */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#00875a] text-white rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2.5 bg-white/20 rounded-xl backdrop-blur-xs">
              <IconComponent className="w-6 h-6 text-white" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black">
                {meta.title}
              </h2>
              <p className="text-xs text-emerald-100">
                SmartRun Quick Commerce (https://www.smartrun.in) • Last Updated: {effectiveDate}
              </p>
            </div>
          </div>
          <p className="text-xs text-white/90 leading-relaxed mt-2">
            {meta.subtitle}
          </p>
        </div>

        {/* Dynamic Content */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-8 text-xs text-slate-700 leading-relaxed">
          
          {/* =========================================================================
              1. ABOUT US VIEW
              ========================================================================= */}
          {type === 'about' && (
            <div className="space-y-6">
              <section className="space-y-2">
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00875a]"></span>
                  Who We Are
                </h2>
                <p>
                  <strong>SmartRUN</strong> (legally operated by <strong>SmartRun Materials Pvt. Ltd.</strong> at <em>https://www.smartrun.in</em>) is a quick-commerce construction and electrical materials delivery platform serving Kolkata and Howrah, West Bengal, India. From our central dispatch depot in Kasba (Kolkata 700107) and registered corporate office at Kheyadah Village, Bhagabanpur (Kolkata 700150), we connect homeowners, site supervisors, licensed contractors, and real estate developers with OEM-sourced electrical and building supplies with automated GST tax invoicing and live GPS delivery tracking.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00875a]"></span>
                  What SmartRUN Provides
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <Link to="/electrical" className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm">⚡ Electrical Wires, Cables &amp; Switchgear</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      ISI/BIS certified wires &amp; cables from Polycab, Havells, RR Kabel, Finolex, Schneider Electric MCBs/RCBOs, and Legrand modular switches.
                    </p>
                  </Link>
                  <Link to="/construction" className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm">🏗️ Construction &amp; Building Supplies</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      UltraTech &amp; ACC cement, Tata Tiscon 550D TMT rebars, Dr. Fixit waterproofing, tile adhesives, plywood, and UPVC/CPVC plumbing pipes.
                    </p>
                  </Link>
                  <Link to="/technicians" className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm">👨‍🔧 Verified Electricians &amp; Contractors</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Directory of licensed electricians for diagnostics, short-circuit troubleshooting, switchboard fitting, and full home wiring work in Kolkata.
                    </p>
                  </Link>
                  <Link to="/delivery-areas" className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm">🚀 60-Min Kasba Dispatch &amp; Site Freight</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Rapid two-wheeler dispatch for urgent electricals and scheduled commercial vehicles for heavy building materials across Kolkata 700001–700160 &amp; Howrah 711101–711106.
                    </p>
                  </Link>
                </div>
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    to="/app"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-emerald-700 hover:underline"
                  >
                    <span>SmartRUN Android App Guide</span>
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-emerald-700 hover:underline"
                  >
                    <span>Contact Support &amp; Contractor Desk</span>
                  </Link>
                  <a
                    href="https://play.google.com/store/apps/details?id=in.smartrun.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackPlayStoreClick('about_page')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Download Official SmartRun Android App on Google Play</span>
                  </a>
                </div>
              </section>
            </div>
          )}



          {/* =========================================================================
              CONTACT & COMPANY DETAILS (Physical Address & Support)
              ========================================================================= */}
          <div className="pt-6 border-t border-slate-200/80 bg-slate-50/80 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 sm:p-8 rounded-b-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Official Entity &amp; Support Contact
              </h4>
              <span className="text-[11px] text-[#00875a] font-bold">
                https://www.smartrun.in
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00875a] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Registered Office &amp; Depot</p>
                  <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                    SmartRun materials pvt. ltd, Kheyadah Village, Bhagabanpur, Kolkata 700150, West Bengal, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Support &amp; WhatsApp</p>
                  <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                    <a href="https://wa.me/918777400280" className="text-emerald-700 hover:underline font-medium" target="_blank" rel="noreferrer">
                      +91 87774 00280
                    </a><br />
                    <a href="tel:+919007168561" className="text-slate-700 hover:underline">
                      +91 90071 68561
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Official Email Desk</p>
                  <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                    <a href="mailto:team@smartrun.in" className="text-blue-700 hover:underline font-medium">
                      team@smartrun.in
                    </a><br />
                    <a href="mailto:grievance@smartrun.in" className="text-slate-600 hover:underline">
                      grievance@smartrun.in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};
