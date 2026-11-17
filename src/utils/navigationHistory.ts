import type { NavigateFunction } from 'react-router-dom';

/**
 * Tracks real in-session SPA navigation depth and previous in-app paths.
 * Unlike `window.history.state.idx`, which persists across full page reloads,
 * external redirects, or sandboxed iframe resets, this counter accurately reflects
 * whether the user navigated within the active JS session.
 */
let inAppNavDepth = 0;
let currentRecordedPath = '';
const pathStack: string[] = [];
let lastBackTimestamp = 0;

export function recordAppRouteVisit(fullPath: string): void {
  if (!fullPath) return;
  if (!currentRecordedPath) {
    currentRecordedPath = fullPath;
    pathStack.push(fullPath);
    return;
  }
  if (fullPath !== currentRecordedPath) {
    inAppNavDepth += 1;
    currentRecordedPath = fullPath;
    pathStack.push(fullPath);
    if (pathStack.length > 30) {
      pathStack.shift();
    }
  }
}

export function getInAppNavigationDepth(): number {
  return inAppNavDepth;
}

export function getPreviousInAppPath(currentPathWithSearch: string): string | null {
  for (let i = pathStack.length - 1; i >= 0; i -= 1) {
    if (pathStack[i] && pathStack[i] !== currentPathWithSearch) {
      return pathStack[i];
    }
  }
  return null;
}

/**
 * Executes reliable back navigation that never gets stuck on a subpage when
 * `history.state.idx` is stale across reloads or when `history.back()` is a no-op
 * inside embedded WebViews/iframes.
 */
export function navigateBackSafely(
  navigate: NavigateFunction,
  fallbackPath: string
): void {
  const now = Date.now();
  if (now - lastBackTimestamp < 180) {
    return;
  }
  lastBackTimestamp = now;

  if (typeof window === 'undefined') {
    navigate(fallbackPath, { replace: true });
    return;
  }

  const originPathWithSearch = window.location.pathname + window.location.search;
  const previousPath = getPreviousInAppPath(originPathWithSearch);

  if (inAppNavDepth > 0 && previousPath) {
    navigate(-1);
    // Safety watchdog: if history.back() didn't change the location (e.g. iframe history trap),
    // deterministically navigate to the recorded previous in-app path or fallback.
    window.setTimeout(() => {
      const stillSameLocation =
        window.location.pathname + window.location.search === originPathWithSearch;
      if (stillSameLocation) {
        navigate(previousPath || fallbackPath, { replace: true });
      }
    }, 80);
    return;
  }

  navigate(fallbackPath);
}
