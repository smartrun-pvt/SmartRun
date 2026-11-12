import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronLeft,
  Search,
  X,
  ChevronDown,
  ShieldAlert,
  HelpCircle,
  ExternalLink,
  PhoneCall,
  Mail
} from 'lucide-react';
import { SEOHead } from './SEOHead';
import { Footer } from './Footer';
import { ENRICHED_FAQ_LIST, FAQ_CATEGORIES, FAQItem } from '../data/faqData';

export { ENRICHED_FAQ_LIST, FAQ_CATEGORIES };
export type { FAQItem };

interface FAQPageProps {
  onBack: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onBack }) => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const targetedItemRef = useRef<HTMLElement | null>(null);

  // Read URL hash on load or route change (e.g., #security-login-alerts)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const rawHash = (location.hash || window.location.hash || '').replace('#', '').trim();
    if (rawHash) {
      const match = ENRICHED_FAQ_LIST.find(
        (f) => f.id.toLowerCase() === rawHash.toLowerCase() || rawHash.includes(f.id)
      );
      if (match) {
        setSelectedCategory('all');
        setExpandedId(match.id);
        setHighlightedId(match.id);

        // Smooth scroll to targeted question
        setTimeout(() => {
          const el = document.getElementById(match.id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 350);

        // Clear highlight ring after 5s
        const timer = setTimeout(() => {
          setHighlightedId(null);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [location.hash]);

  // Filter FAQs based on category and search query
  const filteredFAQs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return ENRICHED_FAQ_LIST.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!query) return true;
      return (
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query)
      );
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans antialiased">
      <SEOHead
        title="Frequently Asked Questions (FAQ) | SmartRun Express Electricals"
        description="Find answers to all questions regarding SmartRun 60-minute express delivery in Kolkata, security login alerts, genuine wire authenticity, GST invoices, and return policies."
      />

      {/* Sticky Top Header with Tailless Arrow Back Button and Simple Heading on exact same line */}
      <header
        className="sticky top-0 z-30 bg-[#74c69d] border-b border-[#52b788] shadow-xs [transform:translateZ(0)] [backface-visibility:hidden] will-change-transform min-h-[64px] sm:min-h-[68px] flex flex-col justify-center transition-all"
        style={{
          backgroundColor: '#74c69d',
          paddingTop: 'max(env(safe-area-inset-top, 0px), var(--safe-area-top, 0px))'
        }}
      >
        <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <button
              type="button"
              onClick={onBack}
              className="p-1.5 -ml-1 rounded-full hover:bg-black/10 active:bg-black/15 text-slate-900 transition-colors cursor-pointer shrink-0"
              title="Back"
              aria-label="Back"
            >
              <ChevronLeft className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </button>
            <h1
              className="text-xl sm:text-2xl text-slate-950 font-normal leading-tight font-playfair tracking-normal"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
            >
              Help &amp; FAQ
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Search & Title Section */}
      <section className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-5 sm:py-7">
        <div className="max-w-3xl mx-auto text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            How can we help you today?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            Answers on 60-min express deliveries, account login security alerts, genuine brand guarantees, and GST tax invoices.
          </p>

          {/* Quick Search Box */}
          <div className="relative mt-4">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g. login alert, delivery, wire, refund, GST invoice)..."
              className="w-full h-11 pl-10 pr-9 text-xs sm:text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-slate-400 rounded-xl outline-hidden transition-all text-slate-900 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full cursor-pointer"
                title="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main FAQ List Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-5 pb-10">
        {/* Results Counter & Toggle Options */}
        <div className="flex items-center justify-between mb-3 text-xs text-slate-500 font-medium">
          <span>
            Showing <strong className="text-slate-900">{filteredFAQs.length}</strong> questions
            {searchQuery ? ` matching "${searchQuery}"` : ''}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (expandedId === 'all') {
                  setExpandedId(null);
                } else {
                  setExpandedId('all');
                }
              }}
              className="text-blue-600 hover:text-blue-800 font-bold hover:underline cursor-pointer"
            >
              {expandedId === 'all' ? 'Collapse All' : 'Expand All'}
            </button>
          </div>
        </div>

        {/* Empty State */}
        {filteredFAQs.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center my-6 shadow-2xs">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-900">No matching questions found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't find an answer matching "{searchQuery}". Try a different keyword or contact our Kolkata helpline directly.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* FAQ Accordion List */}
        <div className="space-y-2.5">
          {filteredFAQs.map((faq) => {
            const isExpanded = expandedId === 'all' || expandedId === faq.id;
            const isHighlighted = highlightedId === faq.id;

            return (
              <article
                key={faq.id}
                id={faq.id}
                ref={isHighlighted ? (el) => { targetedItemRef.current = el; } : undefined}
                className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
                  isHighlighted
                    ? 'border-blue-500 shadow-md ring-2 ring-blue-500/30'
                    : 'border-slate-200/90 shadow-2xs hover:border-slate-300'
                }`}
              >
                {/* Question Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleExpand(faq.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left px-4 sm:px-5 py-3.5 flex items-start justify-between gap-3 cursor-pointer select-none group"
                >
                  <div className="flex-1">
                    {faq.category === 'security' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200/70 px-2 py-0.5 rounded-sm uppercase tracking-wide mb-1.5">
                        <ShieldAlert className="w-2.5 h-2.5" /> Security Alert
                      </span>
                    )}
                    <h2 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                      {faq.question}
                    </h2>
                  </div>

                  <span
                    className={`p-1 rounded-full text-slate-400 group-hover:text-slate-600 transition-transform duration-200 shrink-0 mt-0.5 ${
                      isExpanded ? 'rotate-180 text-blue-600' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {/* Answer Content Body */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    <p className="whitespace-pre-line">{faq.answer}</p>

                    {faq.actionLink && (
                      <div className="mt-3 pt-2">
                        <Link
                          to={faq.actionLink.url}
                          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          <span>{faq.actionLink.text}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Support Help Card */}
        <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-md mb-2">
                ⚡ 24/7 Priority Support
              </div>
              <h3 className="text-base sm:text-lg font-bold">Still have a question?</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Our Kasba warehouse operations desk is available to assist you with active orders, accounts, or bulk inquiries.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href="tel:8777400280"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-yellow-400 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Helpline</span>
              </a>

              <a
                href="mailto:team@smartrun.in"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer border border-white/10"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Support</span>
              </a>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <span>SmartRun materials pvt. ltd • Kheyadah Village, Bhagabanpur, Kolkata 700150</span>
            <span>Helpline: +91 87774 00280</span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
