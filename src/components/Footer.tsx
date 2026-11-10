import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  CreditCard,
  Building2,
  CheckCircle2,
  Lock
} from 'lucide-react';

export interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenInstallApp?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 font-sans border-t border-slate-800 mt-12">
      {/* Trust & Guarantee Badges Banner */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">60-Min Express</p>
              <p className="text-[11px] text-slate-400">Kasba Hub Fast Dispatch</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">100% Genuine</p>
              <p className="text-[11px] text-slate-400">Direct Brand Warranty</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">7-Day Hassle-Free</p>
              <p className="text-[11px] text-slate-400">Direct-to-Source Refund</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">Secure Checkout</p>
              <p className="text-[11px] text-slate-400">256-bit SSL &amp; Razorpay</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Company Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">

          {/* Col 1 & 2: Entity & Description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-white tracking-tight">SmartRun</span>
              <span className="text-[10px] font-bold uppercase bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                Express Kolkata
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-0 sm:pr-4">
              Operated by <strong>SmartRun materials pvt. ltd</strong>. Kolkata’s trusted quick-commerce depot supplying 100% genuine electrical goods, copper wires, modular switches, UltraTech cement, and certified electrician wiring services with 60-minute express doorstep delivery.
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-1">
              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Legal Entity:</strong> SmartRun materials pvt. ltd
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Registered Office:</strong> Kheyadah Village, Bhagabanpur, Kolkata 700150, West Bengal, India
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Fulfillment Hub:</strong> Bediadanga 1st Lane, Nator Park, Kasba, Kolkata 700039
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Customer Policies
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/shipping-policy" className="text-slate-400 hover:text-white transition-colors">
                  Shipping &amp; Delivery Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-slate-400 hover:text-white transition-colors">
                  Return &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-400 hover:text-white transition-colors">
                  FAQs &amp; Help Desk
                </Link>
              </li>
              <li>
                <Link to="/account-deletion" className="text-slate-400 hover:text-white transition-colors">
                  Account Deletion Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Catalog & Hubs */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Explore Depot
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/electrical" className="text-slate-400 hover:text-white transition-colors">
                  Electrical Supplies &amp; Wires
                </Link>
              </li>
              <li>
                <Link to="/construction" className="text-slate-400 hover:text-white transition-colors">
                  Construction &amp; Building Materials
                </Link>
              </li>
              <li>
                <Link to="/technicians" className="text-slate-400 hover:text-white transition-colors">
                  Book Licensed Electricians
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-slate-400 hover:text-white transition-colors">
                  HTML Sitemap Directory
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  XML Product Sitemap
                </a>
              </li>
              <li>
                <a href="/api/feeds/google-merchant.xml" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300 transition-colors font-medium">
                  Google Merchant Feed (XML)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Help Helpline */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Support Desk
            </h3>
            <div className="space-y-3 text-xs">
              <a
                href="tel:+918777400280"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-white transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <p className="font-bold text-white text-xs">+91 87774 00280</p>
                  <p className="text-[10px] text-slate-400">Daily 8:00 AM – 10:00 PM</p>
                </div>
              </a>

              <a
                href="mailto:support@smartrun.in"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="min-w-0">
                  <p className="font-bold text-white text-xs truncate">support@smartrun.in</p>
                  <p className="text-[10px] text-slate-400">Official Customer Desk</p>
                </div>
              </a>

              <div className="pt-2">
                <p className="text-[11px] font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                  Accepted Payment Methods
                </p>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-slate-300">
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">UPI (GPay / PhonePe / Paytm)</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Debit / Credit Cards</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Net Banking</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Cash on Delivery</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} <strong>SmartRun materials pvt. ltd</strong>. All rights reserved. Registered under Companies Act, India.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/shipping-policy" className="hover:text-white transition-colors">Shipping</Link>
            <span>•</span>
            <Link to="/refund-policy" className="hover:text-white transition-colors">Returns &amp; Refunds</Link>
            <span>•</span>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <span>•</span>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
