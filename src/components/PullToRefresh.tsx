import React from 'react';
import { ArrowDown, RefreshCw, CheckCircle2 } from 'lucide-react';
import { usePullToRefresh } from '../hooks/usePullToRefresh';

export interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  pullingText?: string;
  releaseText?: string;
  refreshingText?: string;
  completeText?: string;
}

export const PullToRefresh = ({
  onRefresh,
  children,
  disabled = false,
  className = '',
  pullingText = 'Pull down to refresh',
  releaseText = 'Release to update catalog & orders',
  refreshingText = 'Syncing live catalog & orders...',
  completeText = 'Up to date'
}: PullToRefreshProps) => {
  const {
    isPulling,
    isRefreshing,
    pullDistance,
    progress,
    canRelease,
    containerRef
  } = usePullToRefresh({
    onRefresh,
    threshold: 65,
    maxPull: 110,
    disabled
  });

  const showIndicator = pullDistance > 0 || isRefreshing;
  const isActivePull = isPulling || isRefreshing;

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
    >
      {/* Pull to refresh floating indicator */}
      {showIndicator && (
        <div
          className="absolute left-0 right-0 top-0 z-40 flex items-center justify-center pointer-events-none transition-[transform,opacity] duration-150 ease-out"
          style={{
            transform: `translate3d(0, ${Math.max(0, pullDistance - 48)}px, 0)`,
            opacity: Math.min(1, Math.max(0, (pullDistance - 10) / 30))
          }}
        >
          <div className="flex items-center gap-2.5 px-4 py-2 bg-slate-900/95 text-white rounded-full shadow-xl border border-slate-700/80 text-xs font-semibold">
            {isRefreshing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span className="text-amber-300">{refreshingText}</span>
              </>
            ) : canRelease ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">{releaseText}</span>
              </>
            ) : (
              <>
                <ArrowDown
                  className="w-3.5 h-3.5 text-slate-300 transition-transform duration-200"
                  style={{ transform: `rotate(${progress * 180}deg)` }}
                />
                <span className="text-slate-200">{pullingText}</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Content shifted down smoothly during pull (no permanent GPU layer bloat when idle) */}
      <div
        className={`w-full ${isActivePull ? 'transition-transform duration-150 ease-out will-change-transform' : ''}`}
        style={
          isActivePull
            ? { transform: `translate3d(0, ${pullDistance * 0.35}px, 0)` }
            : undefined
        }
      >
        {children}
      </div>
    </div>
  );
};
