import { describe, it, expect } from 'vitest';
import {
  NAV_SCRUB_TABS,
  resolveScrubTabFromPoint,
  isScrubDragGesture,
  isWithinPauseStillnessRadius,
  shouldTriggerSwipePauseHaptic,
  shouldTriggerBoundaryTickHaptic,
  SCRUB_VERTICAL_CANCEL_MARGIN_PX,
  SCRUB_HORIZONTAL_EDGE_MARGIN_PX,
  SWIPE_PAUSE_DWELL_MS,
  SWIPE_PAUSE_STILLNESS_RADIUS_PX,
  SCRUB_TICK_COOLDOWN_MS,
} from './navScrubHelper';

const SAMPLE_RECT = {
  left: 20,
  top: 760,
  width: 350, // 70px per tab across 5 tabs
  height: 64,
};

describe('navScrubHelper', () => {
  it('maps center X coordinates accurately to all 5 tabs in order', () => {
    const midY = SAMPLE_RECT.top + SAMPLE_RECT.height / 2;
    const expectedCenters = [55, 125, 195, 265, 335];

    expectedCenters.forEach((x, idx) => {
      expect(resolveScrubTabFromPoint(SAMPLE_RECT, x, midY)).toBe(NAV_SCRUB_TABS[idx]);
    });
  });

  it('clamps slight horizontal edge overshoots to first and last tabs', () => {
    const midY = SAMPLE_RECT.top + SAMPLE_RECT.height / 2;

    // Slightly past left edge -> home
    expect(resolveScrubTabFromPoint(SAMPLE_RECT, SAMPLE_RECT.left - 15, midY)).toBe('home');
    // Slightly past right edge -> cart
    expect(
      resolveScrubTabFromPoint(SAMPLE_RECT, SAMPLE_RECT.left + SAMPLE_RECT.width + 15, midY)
    ).toBe('cart');
  });

  it('returns null when finger moves far outside vertical or horizontal cancel margins', () => {
    const midX = SAMPLE_RECT.left + SAMPLE_RECT.width / 2;
    const midY = SAMPLE_RECT.top + SAMPLE_RECT.height / 2;

    // Too high above bar
    expect(
      resolveScrubTabFromPoint(
        SAMPLE_RECT,
        midX,
        SAMPLE_RECT.top - SCRUB_VERTICAL_CANCEL_MARGIN_PX - 1
      )
    ).toBeNull();

    // Too low below bar
    expect(
      resolveScrubTabFromPoint(
        SAMPLE_RECT,
        midX,
        SAMPLE_RECT.top + SAMPLE_RECT.height + SCRUB_VERTICAL_CANCEL_MARGIN_PX + 1
      )
    ).toBeNull();

    // Too far left
    expect(
      resolveScrubTabFromPoint(
        SAMPLE_RECT,
        SAMPLE_RECT.left - SCRUB_HORIZONTAL_EDGE_MARGIN_PX - 1,
        midY
      )
    ).toBeNull();

    // Too far right
    expect(
      resolveScrubTabFromPoint(
        SAMPLE_RECT,
        SAMPLE_RECT.left + SAMPLE_RECT.width + SCRUB_HORIZONTAL_EDGE_MARGIN_PX + 1,
        midY
      )
    ).toBeNull();
  });

  it('keeps tracking when finger drifts moderately above the pill while sliding across tabs', () => {
    // 30px above the bar top is still inside the 72px vertical forgiveness zone
    const slightlyAboveY = SAMPLE_RECT.top - 30;
    expect(resolveScrubTabFromPoint(SAMPLE_RECT, 265, slightlyAboveY)).toBe('technicians');
    expect(resolveScrubTabFromPoint(SAMPLE_RECT, 335, slightlyAboveY)).toBe('cart');
  });

  it('returns null for degenerate zero-size rects', () => {
    expect(resolveScrubTabFromPoint({ left: 0, top: 0, width: 0, height: 64 }, 10, 10)).toBeNull();
  });

  it('distinguishes regular taps from horizontal finger-scrub gestures', () => {
    // Small finger jitter on same tab -> still a normal tap
    expect(isScrubDragGesture(100, 104, 'home', 'home')).toBe(false);
    expect(isScrubDragGesture(100, 95, 'electrical', 'electrical')).toBe(false);

    // Moved >= 8px horizontally -> scrub gesture
    expect(isScrubDragGesture(100, 108, 'home', 'home')).toBe(true);
    expect(isScrubDragGesture(100, 90, 'cart', 'cart')).toBe(true);

    // Crossed onto a different tab even with tiny movement near a boundary -> scrub gesture
    expect(isScrubDragGesture(90, 93, 'home', 'electrical')).toBe(true);
  });

  it('tolerates tiny fingertip tremor inside pause stillness radius and rejects larger slides', () => {
    expect(isWithinPauseStillnessRadius(100, 800, 100, 800)).toBe(true);
    expect(isWithinPauseStillnessRadius(100, 800, 102, 803)).toBe(true); // sqrt(13) < 4
    expect(
      isWithinPauseStillnessRadius(100, 800, 100 + SWIPE_PAUSE_STILLNESS_RADIUS_PX, 800)
    ).toBe(true);
    expect(
      isWithinPauseStillnessRadius(100, 800, 100 + SWIPE_PAUSE_STILLNESS_RADIUS_PX + 1, 800)
    ).toBe(false);
    expect(isWithinPauseStillnessRadius(100, 800, 104, 804)).toBe(false); // sqrt(32) > 4
  });

  it('triggers swipe-pause tactile haptic only once per dwell after threshold while scrubbing', () => {
    // Fires when scrubbing, on valid tab, dwell >= threshold, and not yet fired for this tab
    expect(
      shouldTriggerSwipePauseHaptic({
        isScrubbing: true,
        currentTab: 'electrical',
        lastPausedTab: null,
        dwellElapsedMs: SWIPE_PAUSE_DWELL_MS,
      })
    ).toBe(true);

    // Does not fire before dwell threshold
    expect(
      shouldTriggerSwipePauseHaptic({
        isScrubbing: true,
        currentTab: 'electrical',
        lastPausedTab: null,
        dwellElapsedMs: SWIPE_PAUSE_DWELL_MS - 1,
      })
    ).toBe(false);

    // Does not repeat if pause haptic already fired for the same tab
    expect(
      shouldTriggerSwipePauseHaptic({
        isScrubbing: true,
        currentTab: 'electrical',
        lastPausedTab: 'electrical',
        dwellElapsedMs: SWIPE_PAUSE_DWELL_MS + 300,
      })
    ).toBe(false);

    // Fires again once user moves to a different tab and pauses there
    expect(
      shouldTriggerSwipePauseHaptic({
        isScrubbing: true,
        currentTab: 'technicians',
        lastPausedTab: 'electrical',
        dwellElapsedMs: SWIPE_PAUSE_DWELL_MS,
      })
    ).toBe(true);

    // Does not fire when not scrubbing or when finger moved outside the bar
    expect(
      shouldTriggerSwipePauseHaptic({
        isScrubbing: false,
        currentTab: 'home',
        lastPausedTab: null,
        dwellElapsedMs: SWIPE_PAUSE_DWELL_MS + 100,
      })
    ).toBe(false);
    expect(
      shouldTriggerSwipePauseHaptic({
        isScrubbing: true,
        currentTab: null,
        lastPausedTab: null,
        dwellElapsedMs: SWIPE_PAUSE_DWELL_MS + 100,
      })
    ).toBe(false);
  });

  it('throttles rapid boundary tick haptics within cooldown window', () => {
    expect(shouldTriggerBoundaryTickHaptic(1000, 0)).toBe(true);
    expect(shouldTriggerBoundaryTickHaptic(1020, 1000)).toBe(false);
    expect(shouldTriggerBoundaryTickHaptic(1000 + SCRUB_TICK_COOLDOWN_MS, 1000)).toBe(true);
  });
});
