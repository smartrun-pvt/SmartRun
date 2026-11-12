import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Building2,
  Search,
  ArrowRight
} from 'lucide-react';
import { KOLKATA_AREAS, checkKolkataDeliveryService } from '../data/kolkataAreas';
import { SEOHead } from './SEOHead';
import { Footer } from './Footer';
import { useEdgeSwipeBack } from '../hooks/useEdgeSwipeBack';

const ZONE_ORDER: Array<'South' | 'East' | 'Central' | 'North' | 'West'> = [
  'South',
  'East',
  'Central',
  'North',
  'West'
];

const ZONE_TITLES: Record<string, string> = {
  South: 'South Kolkata & EM Bypass Corridor',
  East: 'Salt Lake (Sector I–V), New Town & Rajarhat',
  Central: 'Central Kolkata & Ezra Street',
  North: 'North Kolkata, Shyambazar & Dum Dum',
  West: 'Howrah & Western Riverfront'
};

export const DeliveryAreasPage: React.FC = () => {
  const navigate = useNavigate();
  const [pincodeInput, setPincodeInput] = useState('');
  const [checkResult, setCheckResult] = useState<ReturnType<typeof checkKolkataDeliveryService> | null>(null);

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

  const areasByZone = useMemo(() => {
    const grouped: Record<string, typeof KOLKATA_AREAS> = {};
    for (const z of ZONE_ORDER) {
      grouped[z] = KOLKATA_AREAS.filter((a) => a.zone === z);
    }
    return grouped;
  }, []);

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = pincodeInput.replace(/\D/g, '').slice(0, 6);
    setCheckResult(checkKolkataDeliveryService(cleaned));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      <SEOHead
        title="Kolkata & Howrah Delivery Service Areas & Pincodes | SmartRun"
        description="Check serviceable Kolkata (700001–700160) and Howrah (711101–711106) PIN codes for 60-min express electrical delivery and construction material dispatch from SmartRun Kasba Central Depot."
        keywords="SmartRun delivery areas, Kolkata electrical delivery pincodes, Kasba Central Depot, Salt Lake electrical delivery, New Town construction delivery, Howrah hardware delivery"
      />

      {/* Sticky Header */}
      <header
        className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-2xs"
        style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), var(--safe-area-top, 0px))' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
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
              <MapPin className="w-5 h-5 text-emerald-700 shrink-0" />
              <span className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                Delivery Service Areas
              </span>
            </div>
          </div>

          <Link
            to="/shipping"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline whitespace-nowrap shrink-0"
          >
            Shipping Policy
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Hero & Interactive Pincode Checker */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-5">
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              Service Coverage • West Bengal, India
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Electrical &amp; Construction Delivery Service Areas in Kolkata &amp; Howrah
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              SmartRun operates express dispatch across Kolkata municipal and metropolitan PIN codes (<strong>700001–700160</strong>) and Howrah (<strong>711101–711106</strong>). Standard electrical items ship on rapid two-wheeler couriers targeting 60-minute arrival, while heavy construction freight ships on dedicated commercial vehicles.
            </p>
          </div>

          {/* Pincode Checker Form */}
          <form onSubmit={handlePincodeSubmit} className="max-w-lg space-y-3">
            <label htmlFor="delivery-area-pincode-input" className="block text-xs font-bold text-slate-800">
              Check Serviceability by 6-Digit PIN Code
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="delivery-area-pincode-input"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setPincodeInput(digits);
                    if (!digits) setCheckResult(null);
                  }}
                  placeholder="Enter 6-digit PIN (e.g. 700107, 700091)"
                  className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-sm font-semibold text-slate-900"
                />
              </div>
              <button
                type="submit"
                className="h-11 px-5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer shrink-0"
              >
                Check PIN
              </button>
            </div>

            {checkResult && (
              <div
                id="delivery-pincode-result"
                role="status"
                className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                  checkResult.isServiceable
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                {checkResult.isServiceable ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                )}
                <div className="space-y-0.5">
                  <p className="font-bold">{checkResult.message}</p>
                  {checkResult.isServiceable && (
                    <p className="text-[11px] text-emerald-800">
                      Dispatch Hub: {checkResult.hub} • Estimated Express Transit: ~{checkResult.deliveryMins} mins
                    </p>
                  )}
                </div>
              </div>
            )}
          </form>
        </section>

        {/* Dispatch Depot vs Registered Office */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-black text-slate-900">Primary Fulfillment &amp; Dispatch Depot</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>SmartRun Kasba Central Depot</strong><br />
                Kasba Industrial Estate Phase 1, Kolkata 700107, West Bengal, India<br />
                Daily Dispatch Hours: 08:00 AM – 09:00 PM IST
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-black text-slate-900">Registered Office</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>SmartRun Materials Pvt. Ltd.</strong><br />
                Kheyadah Village, Bhagabanpur, Kolkata 700150, West Bengal, India<br />
                Corporate &amp; Billing Inquiries: <a href="mailto:team@smartrun.in" className="text-emerald-700 font-semibold hover:underline">team@smartrun.in</a>
              </p>
            </div>
          </div>
        </section>

        {/* Zone-wise Serviceable Directory */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Zone-Wise Serviceable Neighbourhoods &amp; Estimated ETA
              </h2>
              <p className="text-xs text-slate-600">
                In addition to the major hubs listed below, all valid residential and commercial PIN codes between 700001–700160 and 711101–711106 are supported.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ZONE_ORDER.map((zoneKey) => {
              const items = areasByZone[zoneKey] || [];
              if (items.length === 0) return null;
              return (
                <article
                  key={zoneKey}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3"
                >
                  <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2">
                    {ZONE_TITLES[zoneKey] || zoneKey}
                  </h3>
                  <ul className="divide-y divide-slate-100 text-xs">
                    {items.map((area) => (
                      <li key={area.pincode} className="py-2.5 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800">{area.name}</p>
                          <p className="text-[11px] text-slate-500">
                            {area.exactStreet} • Hub: {area.hub}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="inline-block font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                            {area.pincode}
                          </span>
                          <p className="text-[11px] font-semibold text-emerald-700 mt-0.5 flex items-center justify-end gap-1">
                            <Clock className="w-3 h-3" /> ~{area.deliveryMinutes}m
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        {/* Next Actions */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-base font-black text-slate-900">Ready to Place an Order in Kolkata?</h2>
            <p className="text-xs text-slate-600">
              Browse electrical supplies, construction materials, or certified electricians with live order tracking.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              to="/electrical"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black transition-colors"
            >
              <span>Shop Electrical</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/construction"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
            >
              <span>Construction Supplies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
