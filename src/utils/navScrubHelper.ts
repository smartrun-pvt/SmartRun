export const NAV_SCRUB_TABS = [
  'home',
  'electrical',
  'construction',
  'technicians',
  'cart',
] as const;

export type NavScrubTab = (typeof NAV_SCRUB_TABS)[number];

export interface ScrubContainerRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const SCRUB_DRAG_THRESHOLD_PX = 8;
export const SCRUB_VERTICAL_CANCEL_MARGIN_PX = 72;
export const SCRUB_HORIZONTAL_EDGE_MARGIN_PX = 36;
export const SWIPE_PAUSE_DWELL_MS = 140;
export const SWIPE_PAUSE_STILLNESS_RADIUS_PX = 4;
export const SCRUB_TICK_COOLDOWN_MS = 45;

/**
 * Maps a pointer/finger viewport coordinate to the floating bottom navbar tab
 * underneath it. Allows slight horizontal edge overshoot (clamped to first/last
 * tab) and cancels cleanly if the finger moves far outside the bar.
 */
export function resolveScrubTabFromPoint(
  rect: ScrubContainerRect,
  clientX: number,
  clientY: number,
  tabs: readonly NavScrubTab[] = NAV_SCRUB_TABS
): NavScrubTab | null {
  if (rect.width <= 0 || rect.height <= 0 || tabs.length === 0) {
    return null;
  }

  const bottom = rect.top + rect.height;
  const right = rect.left + rect.width;

  const isOutsideVertical =
    clientY < rect.top - SCRUB_VERTICAL_CANCEL_MARGIN_PX ||
    clientY > bottom + SCRUB_VERTICAL_CANCEL_MARGIN_PX;

  const isOutsideHorizontal =
    clientX < rect.left - SCRUB_HORIZONTAL_EDGE_MARGIN_PX ||
    clientX > right + SCRUB_HORIZONTAL_EDGE_MARGIN_PX;

  if (isOutsideVertical || isOutsideHorizontal) {
    return null;
  }

  const normalizedX = (clientX - rect.left) / rect.width;
  const clamped = Math.min(Math.max(normalizedX, 0), 0.999999);
  const index = Math.floor(clamped * tabs.length);

  return tabs[index] ?? null;
}

/**
 * Determines whether a pointer sequence has transitioned from a regular tap
 * into an intentional horizontal finger-scrubbing gesture.
 */
export function isScrubDragGesture(
  startX: number,
  currentX: number,
  startTab: NavScrubTab | null,
  currentTab: NavScrubTab | null
): boolean {
  if (Math.abs(currentX - startX) >= SCRUB_DRAG_THRESHOLD_PX) {
    return true;
  }
  return startTab !== null && currentTab !== null && startTab !== currentTab;
}

/**
 * Checks if pointer movement stays within the micro-tremor stillness radius
 * so natural fingertip micro-jitter does not cancel a swipe pause.
 */
export function isWithinPauseStillnessRadius(
  anchorX: number,
  anchorY: number,
  currentX: number,
  currentY: number,
  radiusPx: number = SWIPE_PAUSE_STILLNESS_RADIUS_PX
): boolean {
  const dx = currentX - anchorX;
  const dy = currentY - anchorY;
  return dx * dx + dy * dy <= radiusPx * radiusPx;
}

/**
 * Determines whether the tactile detent haptic should fire when the user
 * pauses their swipe on a bottom navigation button.
 */
export function shouldTriggerSwipePauseHaptic(params: {
  isScrubbing: boolean;
  currentTab: NavScrubTab | null;
  lastPausedTab: NavScrubTab | null;
  dwellElapsedMs: number;
  thresholdMs?: number;
}): boolean {
  const {
    isScrubbing,
    currentTab,
    lastPausedTab,
    dwellElapsedMs,
    thresholdMs = SWIPE_PAUSE_DWELL_MS,
  } = params;

  if (!isScrubbing || currentTab === null) {
    return false;
  }
  if (lastPausedTab === currentTab) {
    return false;
  }
  return dwellElapsedMs >= thresholdMs;
}

/**
 * Guards rapid boundary-crossing haptic ticks against jitter right on a tab edge.
 */
export function shouldTriggerBoundaryTickHaptic(
  nowMs: number,
  lastTickMs: number,
  cooldownMs: number = SCRUB_TICK_COOLDOWN_MS
): boolean {
  return nowMs - lastTickMs >= cooldownMs;
}
