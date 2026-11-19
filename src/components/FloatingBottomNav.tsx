import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Home, Zap, Building2, ShoppingBag } from 'lucide-react';
import { hapticLight, hapticSelection } from '../utils/haptics';
import {
  NavScrubTab,
  SWIPE_PAUSE_DWELL_MS,
  isScrubDragGesture,
  isWithinPauseStillnessRadius,
  resolveScrubTabFromPoint,
  shouldTriggerBoundaryTickHaptic,
  shouldTriggerSwipePauseHaptic,
} from '../utils/navScrubHelper';

interface FloatingBottomNavProps {
  activeTab: string;
  activeCategory: string;
  onTabChange: (tab: string) => void;
  onSelectCategory: (category: string) => void;
  cartCount?: number;
  cartTotal?: number;
  onOpenCart?: () => void;
}

// Person Logo Component based strictly on user's reference logo (1.jpeg)
const PersonNavIcon = ({
  isActive,
  className = 'w-6 h-6 sm:w-6.5 sm:h-6.5 mb-1'
}: { isActive: boolean; className?: string }) => {
  if (isActive) {
    return (
      <svg
        className={`${className} transition-all`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        {/* Circular Head */}
        <circle cx="12" cy="7" r="4.25" />
        {/* Curved Shoulder/Body Base */}
        <path d="M4 20.2C4 16.2 7.58 13 12 13C16.42 13 20 16.2 20 20.2C20 20.64 19.64 21 19.2 21H4.8C4.36 21 4 20.64 4 20.2Z" />
      </svg>
    );
  }
  return (
    <svg
      className={`${className} transition-all`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Circular Head */}
      <circle cx="12" cy="7" r="4.25" />
      {/* Curved Shoulder/Body Base */}
      <path d="M4.5 20.5C4.5 16.63 7.86 13.5 12 13.5C16.14 13.5 19.5 16.63 19.5 20.5" />
    </svg>
  );
};

export const FloatingBottomNav = React.memo(({
  activeTab,
  activeCategory,
  onTabChange,
  onSelectCategory,
  cartCount = 0,
  cartTotal = 0,
  onOpenCart
}: FloatingBottomNavProps) => {
  const pillRef = useRef<HTMLDivElement | null>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const startXRef = useRef<number>(0);
  const startTabRef = useRef<NavScrubTab | null>(null);
  const isScrubbingRef = useRef<boolean>(false);
  const scrubTargetRef = useRef<NavScrubTab | null>(null);
  const suppressClickUntilRef = useRef<number>(0);
  const cleanupListenersRef = useRef<(() => void) | null>(null);

  // Tactile swipe-pause dwell tracking refs
  const pauseTimerRef = useRef<number | null>(null);
  const pauseAnchorRef = useRef<{ x: number; y: number; sinceMs: number } | null>(null);
  const lastPausedTabRef = useRef<NavScrubTab | null>(null);
  const lastBoundaryTickMsRef = useRef<number>(0);

  const [scrubPreviewTab, setScrubPreviewTab] = useState<NavScrubTab | null>(null);
  const [scrubPausedTab, setScrubPausedTab] = useState<NavScrubTab | null>(null);

  const clearPauseTimer = useCallback(() => {
    if (pauseTimerRef.current !== null) {
      window.clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }
  }, []);

  const triggerBoundaryTick = useCallback(() => {
    const now = Date.now();
    if (shouldTriggerBoundaryTickHaptic(now, lastBoundaryTickMsRef.current)) {
      lastBoundaryTickMsRef.current = now;
      hapticLight();
    }
  }, []);

  const scheduleSwipePauseHaptic = useCallback(
    (tab: NavScrubTab | null, clientX: number, clientY: number) => {
      clearPauseTimer();
      if (tab === null) {
        pauseAnchorRef.current = null;
        lastPausedTabRef.current = null;
        setScrubPausedTab(null);
        return;
      }

      const now = Date.now();
      pauseAnchorRef.current = { x: clientX, y: clientY, sinceMs: now };

      pauseTimerRef.current = window.setTimeout(() => {
        pauseTimerRef.current = null;
        const anchor = pauseAnchorRef.current;
        const elapsed = anchor ? Date.now() - anchor.sinceMs : SWIPE_PAUSE_DWELL_MS;
        if (
          shouldTriggerSwipePauseHaptic({
            isScrubbing: isScrubbingRef.current,
            currentTab: scrubTargetRef.current,
            lastPausedTab: lastPausedTabRef.current,
            dwellElapsedMs: elapsed,
          }) &&
          scrubTargetRef.current === tab
        ) {
          lastPausedTabRef.current = tab;
          setScrubPausedTab(tab);
          hapticSelection();
        }
      }, SWIPE_PAUSE_DWELL_MS);
    },
    [clearPauseTimer]
  );

  const activateTab = useCallback(
    (tab: NavScrubTab) => {
      switch (tab) {
        case 'home':
          onTabChange('home');
          onSelectCategory('all');
          break;
        case 'electrical':
          onTabChange('electrical');
          onSelectCategory('electrical');
          break;
        case 'construction':
          onTabChange('construction');
          onSelectCategory('construction');
          break;
        case 'technicians':
          onTabChange('technicians');
          break;
        case 'cart':
          if (onOpenCart) {
            onOpenCart();
          } else {
            onTabChange('cart');
          }
          break;
      }
    },
    [onTabChange, onSelectCategory, onOpenCart]
  );

  const activateTabRef = useRef(activateTab);
  activateTabRef.current = activateTab;

  const resetScrubSession = useCallback(() => {
    clearPauseTimer();
    activePointerIdRef.current = null;
    startTabRef.current = null;
    isScrubbingRef.current = false;
    scrubTargetRef.current = null;
    pauseAnchorRef.current = null;
    lastPausedTabRef.current = null;
    setScrubPreviewTab(null);
    setScrubPausedTab(null);
    if (cleanupListenersRef.current) {
      cleanupListenersRef.current();
      cleanupListenersRef.current = null;
    }
  }, [clearPauseTimer]);

  useEffect(() => {
    return () => {
      clearPauseTimer();
      if (cleanupListenersRef.current) {
        cleanupListenersRef.current();
        cleanupListenersRef.current = null;
      }
    };
  }, [clearPauseTimer]);

  const handlePillPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      const pillEl = pillRef.current;
      if (!pillEl) return;

      // Clear any previous lingering listener session
      clearPauseTimer();
      if (cleanupListenersRef.current) {
        cleanupListenersRef.current();
        cleanupListenersRef.current = null;
      }

      const rect = pillEl.getBoundingClientRect();
      const initialTab = resolveScrubTabFromPoint(rect, e.clientX, e.clientY);

      activePointerIdRef.current = e.pointerId;
      startXRef.current = e.clientX;
      startTabRef.current = initialTab;
      isScrubbingRef.current = false;
      scrubTargetRef.current = initialTab;
      pauseAnchorRef.current = null;
      lastPausedTabRef.current = null;
      setScrubPausedTab(null);

      const handleWindowPointerMove = (moveEvent: PointerEvent) => {
        if (activePointerIdRef.current !== moveEvent.pointerId) return;
        const container = pillRef.current;
        if (!container) return;

        const currentRect = container.getBoundingClientRect();
        const hoveredTab = resolveScrubTabFromPoint(
          currentRect,
          moveEvent.clientX,
          moveEvent.clientY
        );

        if (
          !isScrubbingRef.current &&
          isScrubDragGesture(
            startXRef.current,
            moveEvent.clientX,
            startTabRef.current,
            hoveredTab
          )
        ) {
          isScrubbingRef.current = true;
          scrubTargetRef.current = hoveredTab;
          setScrubPreviewTab(hoveredTab);
          if (hoveredTab !== null) {
            if (hoveredTab !== startTabRef.current) {
              triggerBoundaryTick();
            }
            scheduleSwipePauseHaptic(hoveredTab, moveEvent.clientX, moveEvent.clientY);
          }
          return;
        }

        if (!isScrubbingRef.current) return;

        if (hoveredTab !== scrubTargetRef.current) {
          scrubTargetRef.current = hoveredTab;
          setScrubPreviewTab(hoveredTab);
          if (lastPausedTabRef.current !== hoveredTab) {
            lastPausedTabRef.current = null;
            setScrubPausedTab(null);
          }
          if (hoveredTab !== null) {
            triggerBoundaryTick();
          }
          scheduleSwipePauseHaptic(hoveredTab, moveEvent.clientX, moveEvent.clientY);
          return;
        }

        // Still on the same tab: reset pause dwell timer only if finger moved beyond stillness radius
        if (hoveredTab !== null && lastPausedTabRef.current !== hoveredTab) {
          const anchor = pauseAnchorRef.current;
          if (
            !anchor ||
            !isWithinPauseStillnessRadius(
              anchor.x,
              anchor.y,
              moveEvent.clientX,
              moveEvent.clientY
            )
          ) {
            scheduleSwipePauseHaptic(hoveredTab, moveEvent.clientX, moveEvent.clientY);
          }
        }
      };

      const handleWindowPointerUp = (upEvent: PointerEvent) => {
        if (activePointerIdRef.current !== upEvent.pointerId) return;
        const container = pillRef.current;
        const finalTab = container
          ? resolveScrubTabFromPoint(
              container.getBoundingClientRect(),
              upEvent.clientX,
              upEvent.clientY
            )
          : scrubTargetRef.current;

        const didScrub =
          isScrubbingRef.current ||
          isScrubDragGesture(
            startXRef.current,
            upEvent.clientX,
            startTabRef.current,
            finalTab
          );
        const alreadyPausedOnFinalTab =
          finalTab !== null && lastPausedTabRef.current === finalTab;

        resetScrubSession();

        if (didScrub) {
          // Block the browser's synthetic trailing click after a scrub drag
          suppressClickUntilRef.current = Date.now() + 400;
          if (finalTab !== null) {
            // Subtle release click if pause detent already settled on this button,
            // or crisp selection pulse for fast flicks without pausing
            if (alreadyPausedOnFinalTab) {
              hapticLight();
            } else {
              hapticSelection();
            }
            activateTabRef.current(finalTab);
          }
        }
      };

      const handleWindowPointerCancel = (cancelEvent: PointerEvent) => {
        if (activePointerIdRef.current !== cancelEvent.pointerId) return;
        resetScrubSession();
      };

      window.addEventListener('pointermove', handleWindowPointerMove, { passive: true });
      window.addEventListener('pointerup', handleWindowPointerUp);
      window.addEventListener('pointercancel', handleWindowPointerCancel);

      cleanupListenersRef.current = () => {
        window.removeEventListener('pointermove', handleWindowPointerMove);
        window.removeEventListener('pointerup', handleWindowPointerUp);
        window.removeEventListener('pointercancel', handleWindowPointerCancel);
      };
    },
    [clearPauseTimer, resetScrubSession, scheduleSwipePauseHaptic, triggerBoundaryTick]
  );

  const handleButtonClick = useCallback(
    (tab: NavScrubTab) => {
      if (Date.now() < suppressClickUntilRef.current) {
        return;
      }
      hapticSelection();
      activateTab(tab);
    },
    [activateTab]
  );

  const isScrubbingVisual = scrubPreviewTab !== null;
  const isHomeActive = isScrubbingVisual
    ? scrubPreviewTab === 'home'
    : activeTab === 'home' || (activeTab === 'catalog' && activeCategory === 'all');
  const isElectricalActive = isScrubbingVisual
    ? scrubPreviewTab === 'electrical'
    : activeTab === 'electrical' || (activeTab === 'catalog' && activeCategory === 'electrical');
  const isConstructionActive = isScrubbingVisual
    ? scrubPreviewTab === 'construction'
    : activeTab === 'construction' || (activeTab === 'catalog' && activeCategory === 'construction');
  const isTechnicianActive = isScrubbingVisual
    ? scrubPreviewTab === 'technicians'
    : activeTab === 'technicians' || activeTab === 'technician';
  const isCartActive = isScrubbingVisual
    ? scrubPreviewTab === 'cart'
    : activeTab === 'cart';

  return (
    <nav
      id="floating-liquid-bottom-navbar"
      aria-label="Bottom Navigation"
      style={{ bottom: 'calc(var(--safe-area-bottom, env(safe-area-inset-bottom, 0px)) + 0.55rem)' }}
      className="fixed left-1/2 -translate-x-1/2 z-40 w-[93vw] max-w-[390px] sm:max-w-[430px] [transform:translateZ(0)] [backface-visibility:hidden]"
    >
      {/* Clear transparent Apple Liquid Glass floating navbar container with finger-scrubbing navigation */}
      <div
        ref={pillRef}
        data-scrub-paused={scrubPausedTab ?? ''}
        onPointerDown={handlePillPointerDown}
        className="relative flex items-center justify-between gap-1 sm:gap-1.5 px-3 py-2 sm:py-2.5 rounded-full touch-none select-none [-webkit-touch-callout:none] bg-white/30 bg-gradient-to-b from-white/50 via-white/25 to-white/38 backdrop-blur-2xl backdrop-saturate-[165%] border border-white/70 ring-1 ring-black/[0.06] shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),inset_0_-1.5px_3px_rgba(255,255,255,0.35),0_10px_30px_-6px_rgba(15,23,42,0.12),0_2px_8px_rgba(15,23,42,0.06)] before:pointer-events-none before:absolute before:inset-x-4 before:top-[2px] before:h-[40%] before:rounded-full before:bg-gradient-to-b before:from-white/60 before:via-white/15 before:to-transparent transition-shadow duration-200"
      >
        {/* 1. Home Button */}
        <button
          id="floating-nav-home"
          type="button"
          onClick={() => handleButtonClick('home')}
          title="Home"
          aria-label="Home"
          className={`flex-1 min-w-0 flex flex-col items-center justify-center py-1.5 sm:py-2 px-1 rounded-full transition-all duration-150 cursor-pointer outline-none bg-transparent ${
            isHomeActive
              ? scrubPreviewTab === 'home'
                ? 'text-emerald-600 font-bold scale-[1.1] -translate-y-0.5'
                : 'text-emerald-600 font-bold scale-[1.04]'
              : 'text-slate-700 hover:text-emerald-600 active:scale-95 font-medium'
          }`}
        >
          <Home className={`w-6 h-6 sm:w-6.5 sm:h-6.5 mb-1 transition-all ${isHomeActive ? 'stroke-[2.6] text-emerald-600' : 'stroke-[2]'}`} />
          <span className="text-[10.5px] sm:text-[11.5px] leading-tight tracking-tight whitespace-nowrap font-medium">Home</span>
        </button>

        {/* 2. Electrical Button */}
        <button
          id="floating-nav-electrical"
          type="button"
          onClick={() => handleButtonClick('electrical')}
          title="Electrical Supplies"
          aria-label="Electrical Supplies"
          className={`flex-1 min-w-0 flex flex-col items-center justify-center py-1.5 sm:py-2 px-1 rounded-full transition-all duration-150 cursor-pointer outline-none bg-transparent ${
            isElectricalActive
              ? scrubPreviewTab === 'electrical'
                ? 'text-blue-600 font-bold scale-[1.1] -translate-y-0.5'
                : 'text-blue-600 font-bold scale-[1.04]'
              : 'text-slate-700 hover:text-blue-600 active:scale-95 font-medium'
          }`}
        >
          <Zap
            className={`w-6 h-6 sm:w-6.5 sm:h-6.5 mb-1 transition-all ${isElectricalActive ? 'stroke-[2.6] fill-blue-500 text-blue-600' : 'stroke-[2]'}`}
          />
          <span className="text-[10.5px] sm:text-[11.5px] leading-tight tracking-tight whitespace-nowrap font-medium">Electrical</span>
        </button>

        {/* 3. Construction Button */}
        <button
          id="floating-nav-construction"
          type="button"
          onClick={() => handleButtonClick('construction')}
          title="Construction Materials"
          aria-label="Construction Materials"
          className={`flex-1 min-w-0 flex flex-col items-center justify-center py-1.5 sm:py-2 px-1 rounded-full transition-all duration-150 cursor-pointer outline-none bg-transparent ${
            isConstructionActive
              ? scrubPreviewTab === 'construction'
                ? 'text-amber-600 font-bold scale-[1.1] -translate-y-0.5'
                : 'text-amber-600 font-bold scale-[1.04]'
              : 'text-slate-700 hover:text-amber-600 active:scale-95 font-medium'
          }`}
        >
          <Building2 className={`w-6 h-6 sm:w-6.5 sm:h-6.5 mb-1 transition-all ${isConstructionActive ? 'stroke-[2.6] text-amber-600' : 'stroke-[2]'}`} />
          <span className="text-[10.5px] sm:text-[11.5px] leading-tight tracking-tight whitespace-nowrap font-medium">Materials</span>
        </button>

        {/* 4. Technician Tab */}
        <button
          id="floating-nav-technician"
          type="button"
          onClick={() => handleButtonClick('technicians')}
          title="Certified Technicians & Specialists"
          aria-label="Technicians"
          className={`flex-1 min-w-0 flex flex-col items-center justify-center py-1.5 sm:py-2 px-1 rounded-full transition-all duration-150 cursor-pointer outline-none bg-transparent ${
            isTechnicianActive
              ? scrubPreviewTab === 'technicians'
                ? 'text-indigo-600 font-bold scale-[1.1] -translate-y-0.5'
                : 'text-indigo-600 font-bold scale-[1.04]'
              : 'text-slate-700 hover:text-indigo-600 active:scale-95 font-medium'
          }`}
        >
          <PersonNavIcon
            isActive={isTechnicianActive}
            className={`w-6 h-6 sm:w-6.5 sm:h-6.5 mb-1 ${isTechnicianActive ? 'text-indigo-600' : 'text-slate-700'}`}
          />
          <span className="text-[10.5px] sm:text-[11.5px] leading-tight tracking-tight whitespace-nowrap font-medium">Technician</span>
        </button>

        {/* 5. Cart Tab (Primary interaction for mobile app thumb zone) */}
        <button
          id="floating-nav-cart"
          type="button"
          onClick={() => handleButtonClick('cart')}
          title={cartCount > 0 ? `Cart (${cartCount} items)` : 'View Cart'}
          aria-label="Shopping Cart"
          className={`flex-1 min-w-0 flex flex-col items-center justify-center py-1.5 sm:py-2 px-1 rounded-full transition-all duration-150 cursor-pointer outline-none bg-transparent relative ${
            isCartActive
              ? scrubPreviewTab === 'cart'
                ? 'text-emerald-600 font-bold scale-[1.1] -translate-y-0.5'
                : 'text-emerald-600 font-bold scale-[1.04]'
              : cartCount > 0
              ? 'text-slate-900 hover:text-emerald-600 active:scale-95 font-semibold'
              : 'text-slate-700 hover:text-emerald-600 active:scale-95 font-medium'
          }`}
        >
          <div className="relative">
            <ShoppingBag
              className={`w-6 h-6 sm:w-6.5 sm:h-6.5 mb-1 transition-all ${
                isCartActive
                  ? 'stroke-[2.6] text-emerald-600'
                  : cartCount > 0
                  ? 'stroke-[2.3] text-slate-900'
                  : 'stroke-[2]'
              }`}
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-gradient-to-r from-red-600 to-rose-600 text-white text-[9.5px] sm:text-[10px] font-black min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center border-2 border-white/80 shadow-xs animate-in zoom-in-50 duration-150">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </div>
          <span className="text-[10.5px] sm:text-[11.5px] leading-tight tracking-tight whitespace-nowrap font-medium">
            Cart
          </span>
        </button>
      </div>
    </nav>
  );
});
FloatingBottomNav.displayName = 'FloatingBottomNav';
