import React from 'react';
import { Link } from 'react-router-dom';
import { trackPlayStoreClick } from '../utils/analytics';

export interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenInstallApp?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center mt-8 text-xs text-slate-600">
      <div className="max-w-5xl mx-auto space-y-3">
        {/* Clean, single-line internal crawl links (Hubs & Directories) */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs font-semibold text-slate-700">
          <Link to="/" className="hover:text-black hover:underline transition-colors">Home</Link>
          <span className="text-slate-300">•</span>
          <Link to="/electrical" className="hover:text-black hover:underline transition-colors">Electrical Goods</Link>
          <span className="text-slate-300">•</span>
          <Link to="/construction" className="hover:text-black hover:underline transition-colors">Construction Materials</Link>
          <span className="text-slate-300">•</span>
          <Link to="/technicians" className="hover:text-black hover:underline transition-colors">Certified Electricians</Link>
          <span className="text-slate-300">•</span>
          <Link to="/faqs" className="hover:text-black hover:underline transition-colors">FAQs</Link>
          <span className="text-slate-300">•</span>
          <Link to="/how-to-use" className="hover:text-black hover:underline transition-colors">How to Use App</Link>
          <span className="text-slate-300">•</span>
          <Link to="/sitemap" className="hover:text-black hover:underline transition-colors">Sitemap</Link>
        </div>

        {/* Clean trust, policy & legal links */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-slate-500">
          <Link to="/shipping" className="hover:text-black hover:underline transition-colors">Shipping & 60-Min Delivery</Link>
          <span className="text-slate-300">•</span>
          <Link to="/return" className="hover:text-black hover:underline transition-colors">7-Day Return Policy</Link>
          <span className="text-slate-300">•</span>
          <Link to="/refund-policy" className="hover:text-black hover:underline transition-colors">Refund Policy</Link>
          <span className="text-slate-300">•</span>
          <Link to="/terms" className="hover:text-black hover:underline transition-colors">Terms of Service</Link>
          <span className="text-slate-300">•</span>
          <Link to="/privacy" className="hover:text-black hover:underline transition-colors">Privacy Policy</Link>
          <span className="text-slate-300">•</span>
          <Link to="/about" className="hover:text-black hover:underline transition-colors">About Us</Link>
        </div>

        {/* Contextual Google Play Store App Discovery Link */}
        <div className="flex items-center justify-center pt-0.5">
          <a
            href="https://play.google.com/store/apps/details?id=in.smartrun.app"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackPlayStoreClick('footer')}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 hover:underline transition-colors"
          >
            <span>Get SmartRun on Google Play (Android App)</span>
          </a>
        </div>

        {/* Minimalist Copyright */}
        <p className="text-xs sm:text-sm text-black font-normal tracking-wide pt-1">
          2026 SmartRun Materials Pvt. Ltd. All right reserved.
        </p>
      </div>
    </footer>
  );
};


