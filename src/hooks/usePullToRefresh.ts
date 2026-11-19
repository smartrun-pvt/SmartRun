import { useState, useRef, useEffect, useCallback } from 'react';
import { hapticLight, hapticSuccess } from '../utils/haptics';

export interface UsePullToRefreshOptions {
  /** Async callback executed when user pulls past the threshold and releases */
  onRefresh: () => Promise<void> | void;
  /** Distance in pixels required to trigger refresh. Default is 70 */
  threshold?: number;
  /** Maximum distance in pixels the container can be pulled down. Default is 110 */
  maxPull?: number;
  /** Disable the pull-to-refresh interaction */
  disabled?: boolean;
}

export interface UsePullToRefreshReturn {
  isPulling: boolean;
  isRefreshing: boolean;
  pullDistance: number;
  progress: number; // 0 to 1
  canRelease: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  handleTouchStart: (e: React.TouchEvent | TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent | TouchEvent) => void;
  handleTouchEnd: () => void;
}

export function usePullToRefresh({
  onRefresh,
  threshold = 70,
  maxPull = 110,
  disabled = false,
}: UsePullToRefreshOptions): UsePullToRefreshReturn {
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [canRelease, setCanRelease] = useState(false);

  const startYRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const isPullingRef = useRef(false);
  const pullDistanceRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const hasTriggeredHapticRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Check if at the top of scroll
  const isAtTop = useCallback(() => {
    if (containerRef.current) {
      return containerRef.current.scrollTop <= 0 && window.scrollY <= 0;
    }
    return (window.pageYOffset || document.documentElement.scrollTop || 0) <= 0;
  }, []);

  const resetPullState = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (isPullingRef.current || pullDistanceRef.current !== 0) {
      isPullingRef.current = false;
      pullDistanceRef.current = 0;
      setPullDistance(0);
      setIsPulling(false);
      setCanRelease(false);
    }
    hasTriggeredHapticRef.current = false;
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent | TouchEvent) => {
      if (disabled || isRefreshing) return;
      if (!isAtTop()) return;

      const touch = 'touches' in e ? e.touches[0] : null;
      if (!touch) return;

      startYRef.current = touch.clientY;
      isDraggingRef.current = true;
      hasTriggeredHapticRef.current = false;
    },
    [disabled, isRefreshing, isAtTop]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent | TouchEvent) => {
      if (disabled || isRefreshing || !isDraggingRef.current || startYRef.current === null) return;
      if (!isAtTop()) {
        isDraggingRef.current = false;
        resetPullState();
        return;
      }

      const touch = 'touches' in e ? e.touches[0] : null;
      if (!touch) return;

      const deltaY = touch.clientY - startYRef.current;
      if (deltaY > 8) {
        const damped = Math.min(maxPull, Math.pow(deltaY, 0.82) * 1.6);
        pullDistanceRef.current = damped;

        if (rafIdRef.current === null) {
          rafIdRef.current = requestAnimationFrame(() => {
            rafIdRef.current = null;
            const currentDamped = pullDistanceRef.current;
            if (!isPullingRef.current) {
              isPullingRef.current = true;
              setIsPulling(true);
            }
            setPullDistance(currentDamped);

            const ready = currentDamped >= threshold;
            setCanRelease(ready);

            if (ready && !hasTriggeredHapticRef.current) {
              hapticLight();
              hasTriggeredHapticRef.current = true;
            } else if (!ready && hasTriggeredHapticRef.current) {
              hasTriggeredHapticRef.current = false;
            }
          });
        }
      } else if (deltaY < -4) {
        // User is scrolling down normally: immediately stop tracking so scrolling triggers zero state updates
        isDraggingRef.current = false;
        resetPullState();
      }
    },
    [disabled, isRefreshing, isAtTop, maxPull, threshold, resetPullState]
  );

  const handleTouchEnd = useCallback(async () => {
    if (!isDraggingRef.current || disabled) return;
    isDraggingRef.current = false;
    startYRef.current = null;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    const finalPull = pullDistanceRef.current;
    isPullingRef.current = false;
    setIsPulling(false);

    if (finalPull >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      pullDistanceRef.current = 55;
      setPullDistance(55); // Hold at active spinner height
      hapticSuccess();

      try {
        await onRefresh();
      } catch (err) {
        console.warn('Pull-to-refresh error:', err);
      } finally {
        setTimeout(() => {
          setIsRefreshing(false);
          pullDistanceRef.current = 0;
          setPullDistance(0);
          setCanRelease(false);
          hasTriggeredHapticRef.current = false;
        }, 350);
      }
    } else {
      resetPullState();
    }
  }, [disabled, threshold, isRefreshing, onRefresh, resetPullState]);

  // Bind single set of passive touch listeners to window
  useEffect(() => {
    const handleWindowTouchStart = (e: TouchEvent) => {
      if (isAtTop()) {
        handleTouchStart(e);
      }
    };

    const handleWindowTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current) {
        handleTouchMove(e);
      }
    };

    const handleWindowTouchEnd = () => {
      if (isDraggingRef.current) {
        handleTouchEnd();
      }
    };

    window.addEventListener('touchstart', handleWindowTouchStart, { passive: true });
    window.addEventListener('touchmove', handleWindowTouchMove, { passive: true });
    window.addEventListener('touchend', handleWindowTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleWindowTouchEnd, { passive: true });

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('touchstart', handleWindowTouchStart);
      window.removeEventListener('touchmove', handleWindowTouchMove);
      window.removeEventListener('touchend', handleWindowTouchEnd);
      window.removeEventListener('touchcancel', handleWindowTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, isAtTop]);

  const progress = Math.min(1, pullDistance / threshold);

  return {
    isPulling,
    isRefreshing,
    pullDistance,
    progress,
    canRelease,
    containerRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
