import React, { useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft,
  PhoneCall,
  Mail,
  MessageSquare,
  MapPin,
  Clock,
  Building2,
  ShieldAlert,
  HelpCircle,
  Truck,
  ArrowRight
} from 'lucide-react';
import { SEOHead } from './SEOHead';
import { Footer } from './Footer';
import { useEdgeSwipeBack } from '../hooks/useEdgeSwipeBack';

export const ContactSupportPage: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      <SEOHead
        title="Contact & Customer Support Desk | SmartRun Kolkata"
        description="Contact SmartRun Materials Pvt. Ltd. in Kolkata: helpline +91 87774 00280, +91 90071 68561, team@smartrun.in, Kasba Central Depot dispatch desk & Registered Office details."
        keywords="contact SmartRun, SmartRun customer care number Kolkata, SmartRun helpline, Kasba warehouse address, bulk contractor desk Kolkata"
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
              <PhoneCall className="w-5 h-5 text-emerald-700 shrink-0" />
              <span className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                Contact &amp; Support
              </span>
            </div>
          </div>

          <Link
            to="/faqs"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline whitespace-nowrap shrink-0"
          >
            Help &amp; FAQs
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Hero */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
            Official Customer &amp; Contractor Support
          </p>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Contact SmartRun Materials Pvt. Ltd. (Kolkata)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            Reach our Kolkata operations and contractor procurement team for order tracking, bulk site quotes, GST invoice corrections, returns, or account grievance redressal.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-semibold text-slate-800">
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            <span>Support &amp; Dispatch Hours: Daily 08:00 AM – 09:00 PM IST (Mon–Sun)</span>
          </div>
        </section>

        {/* Primary Contact Channels */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <article className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-2">
            <div className="p-2.5 w-fit rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-black text-slate-900">Helpline &amp; Contractor Desk</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Primary Support:{' '}
              <a href="tel:+918777400280" className="font-bold text-slate-900 hover:underline">
                +91 87774 00280
              </a>
              <br />
              Alternate Desk:{' '}
              <a href="tel:+919007168561" className="font-bold text-slate-900 hover:underline">
                +91 90071 68561
              </a>
            </p>
          </article>

          <article className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-2">
            <div className="p-2.5 w-fit rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-black text-slate-900">WhatsApp Order &amp; Bulk Quotes</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Message our Kasba dispatch team directly for construction BOQ quotes or wire coil checks.
            </p>
            <a
              href="https://wa.me/918777400280"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline pt-1"
            >
              <span>Open WhatsApp (+91 87774 00280)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </article>

          <article className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-2">
            <div className="p-2.5 w-fit rounded-xl bg-blue-50 border border-blue-200 text-blue-700">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-black text-slate-900">Official Email &amp; Grievance Officer</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Orders &amp; Procurement:{' '}
              <a href="mailto:team@smartrun.in" className="font-bold text-blue-700 hover:underline">
                team@smartrun.in
              </a>
              <br />
              Grievance Redressal:{' '}
              <a href="mailto:grievance@smartrun.in" className="font-bold text-slate-800 hover:underline">
                grievance@smartrun.in
              </a>
            </p>
          </article>
        </section>

        {/* Physical Locations */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
              <Building2 className="w-4 h-4 text-emerald-700" />
              <h2>Registered Office</h2>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>SmartRun Materials Pvt. Ltd.</strong><br />
              Kheyadah Village, Bhagabanpur<br />
              Kolkata, West Bengal 700150, India
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
              <MapPin className="w-4 h-4 text-amber-600" />
              <h2>Central Dispatch Depot</h2>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>SmartRun Kasba Central Depot</strong><br />
              Kasba Industrial Estate Phase 1<br />
              Kolkata, West Bengal 700107, India
            </p>
          </div>
        </section>

        {/* Self-Service Quick Links */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-black text-slate-900">Self-Service &amp; Policy Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <Link
              to="/delivery-areas"
              className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <span className="flex items-center gap-2 font-bold text-slate-900">
                <Truck className="w-4 h-4 text-emerald-700" /> Check Serviceable Kolkata Pincodes
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              to="/faqs"
              className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <span className="flex items-center gap-2 font-bold text-slate-900">
                <HelpCircle className="w-4 h-4 text-blue-600" /> Frequently Asked Questions
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              to="/return"
              className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <span className="flex items-center gap-2 font-bold text-slate-900">
                <ShieldAlert className="w-4 h-4 text-amber-600" /> 7-Day Return &amp; Replacement Policy
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              to="/refund-policy"
              className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <span className="flex items-center gap-2 font-bold text-slate-900">
                <ShieldAlert className="w-4 h-4 text-emerald-700" /> Direct-to-Source Refund Policy
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
