import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { hapticLight, hapticMedium } from '../utils/haptics';

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onClick?: () => void;
}

export const ZoomableImage = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  onSwipeLeft,
  onSwipeRight,
  onClick
}: ZoomableImageProps) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastTouchTime = useRef(0);
  const initialDistance = useRef(0);
  const startPos = useRef({ x: 0, y: 0 });
  const initialScale = useRef(1);
  const dragStart = useRef({ x: 0, y: 0 });
  const singleTouchStart = useRef({ x: 0, y: 0, time: 0 });
  const didTouchGestureRef = useRef(false);

  const isZoomed = scale > 1.05;

  // Reset inline zoom cleanly whenever active image or colour variant changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);
  }, [src]);

  const handleResetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    hapticLight();
  }, []);

  const handleDoubleTap = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;
      hapticMedium();

      if (isZoomed) {
        handleResetZoom();
      } else {
        const rect = containerRef.current.getBoundingClientRect();
        const offsetX = clientX - rect.left - rect.width / 2;
        const offsetY = clientY - rect.top - rect.height / 2;

        setScale(2.4);
        setPosition({
          x: -offsetX * 1.2,
          y: -offsetY * 1.2
        });
      }
    },
    [handleResetZoom, isZoomed]
  );

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    didTouchGestureRef.current = false;
    if (e.touches.length === 2) {
      // Pinch to zoom initiation
      didTouchGestureRef.current = true;
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialDistance.current = dist;
      initialScale.current = scale;
      startPos.current = { ...position };
    } else if (e.touches.length === 1) {
      const now = Date.now();
      const touch = e.touches[0];

      singleTouchStart.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: now
      };

      // Check for double tap
      if (now - lastTouchTime.current < 300) {
        didTouchGestureRef.current = true;
        handleDoubleTap(touch.clientX, touch.clientY);
        lastTouchTime.current = 0;
        return;
      }
      lastTouchTime.current = now;

      if (isZoomed) {
        setIsDragging(true);
        dragStart.current = {
          x: touch.clientX - position.x,
          y: touch.clientY - position.y
        };
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && initialDistance.current > 0) {
      // Handle pinch zoom
      didTouchGestureRef.current = true;
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / initialDistance.current;
      const newScale = Math.min(3.5, Math.max(1, initialScale.current * factor));
      setScale(newScale);

      if (newScale <= 1.05) {
        setPosition({ x: 0, y: 0 });
      }
    } else if (e.touches.length === 1 && isZoomed && isDragging) {
      // Pan while zoomed
      didTouchGestureRef.current = true;
      const touch = e.touches[0];
      const maxOffset = (scale - 1) * 120;
      const newX = Math.max(-maxOffset, Math.min(maxOffset, touch.clientX - dragStart.current.x));
      const newY = Math.max(-maxOffset, Math.min(maxOffset, touch.clientY - dragStart.current.y));
      setPosition({ x: newX, y: newY });
    } else if (e.touches.length === 1) {
      const touch = e.touches[0];
      const movedDist = Math.hypot(
        touch.clientX - singleTouchStart.current.x,
        touch.clientY - singleTouchStart.current.y
      );
      if (movedDist > 12) {
        didTouchGestureRef.current = true;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(false);
    initialDistance.current = 0;

    if (scale < 1.1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }

    // Horizontal swipe detection if not zoomed
    if (!isZoomed && e.changedTouches.length === 1) {
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - singleTouchStart.current.x;
      const deltaY = Math.abs(touch.clientY - singleTouchStart.current.y);
      const duration = Date.now() - singleTouchStart.current.time;

      if (Math.abs(deltaX) > 18 || deltaY > 18) {
        didTouchGestureRef.current = true;
      }

      if (duration < 600 && Math.abs(deltaX) > 40 && deltaY < 75) {
        didTouchGestureRef.current = true;
        if (deltaX < 0 && onSwipeLeft) {
          hapticLight();
          onSwipeLeft();
        } else if (deltaX > 0 && onSwipeRight) {
          hapticLight();
          onSwipeRight();
        }
      }
    }

    if (didTouchGestureRef.current) {
      setTimeout(() => {
        didTouchGestureRef.current = false;
      }, 350);
    }
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={() => {
        if (didTouchGestureRef.current) {
          didTouchGestureRef.current = false;
          return;
        }
        if (!isZoomed && onClick) {
          onClick();
        }
      }}
      className={`relative select-none overflow-hidden touch-pan-y flex items-center justify-center ${containerClassName}`}
    >
      <img
        src={src}
        alt={alt}
        className={`transition-transform duration-100 ease-out will-change-transform ${className}`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
          cursor: isZoomed ? 'grab' : 'zoom-in'
        }}
        draggable={false}
      />

      {/* Reset Zoom Indicator (only appears when actively zoomed in) */}
      {isZoomed && (
        <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 pointer-events-auto">
          <button
            type="button"
            onClick={handleResetZoom}
            className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold shadow-md border border-white/20 flex items-center gap-1 active:scale-90 transition-transform cursor-pointer"
            title="Reset Zoom"
          >
            <ZoomOut className="w-3 h-3 text-amber-400" />
            <span>{(scale).toFixed(1)}x Reset</span>
          </button>
        </div>
      )}
    </div>
  );
};
