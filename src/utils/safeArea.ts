export interface NativeInsetsSnapshot {
  top: number;
  bottom: number;
  left?: number;
  right?: number;
  ready?: boolean;
}

export interface ResolveSafeAreaInput {
  nativeInsets?: NativeInsetsSnapshot | null;
  envTopPx?: number | null;
  envBottomPx?: number | null;
  devicePixelRatio?: number;
  isAndroidApp: boolean;
}

export interface ResolvedSafeAreaCss {
  top: string;
  bottom: string;
  left: string;
  right: string;
  source: 'native-bridge' | 'android-dpr-normalized' | 'css-env';
}

const MAX_PLAUSIBLE_ANDROID_TOP_DP = 56;
const MAX_PLAUSIBLE_ANDROID_BOTTOM_DP = 64;

function sanitizeDp(value: unknown, maxBound = 80): number {
  const num = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(num) || num <= 0) return 0;
  return Math.min(Math.round(num), maxBound);
}

/**
 * Resolves authoritative CSS values for `--safe-area-top` and `--safe-area-bottom`.
 *
 * Precedence:
 * 1. Native Android `SmartRunInsets` bridge (`MainActivity.java`) — density-normalized DP
 *    measured directly from `WindowInsetsCompat.Type.statusBars() | displayCutout()`.
 * 2. Fallback normalization if an older APK runs without the bridge and Android WebView
 *    leaks raw physical pixels into CSS `env(safe-area-inset-top)` (e.g. `96px` at dpr=3 -> `32px`).
 * 3. Standard `env(safe-area-inset-*, 0px)` for Web browsers, Desktop, and iOS PWA.
 */
export function resolveSafeAreaInsets(input: ResolveSafeAreaInput): ResolvedSafeAreaCss {
  const {
    nativeInsets,
    envTopPx,
    envBottomPx,
    devicePixelRatio = 1,
    isAndroidApp
  } = input;

  const dpr = Number.isFinite(devicePixelRatio) && devicePixelRatio > 0 ? devicePixelRatio : 1;

  if (nativeInsets && (nativeInsets.ready !== false)) {
    let topDp = sanitizeDp(nativeInsets.top, 200);
    let bottomDp = sanitizeDp(nativeInsets.bottom, 200);
    const leftDp = sanitizeDp(nativeInsets.left ?? 0, 120);
    const rightDp = sanitizeDp(nativeInsets.right ?? 0, 120);

    // Defensive safeguard if an unscaled physical pixel value ever enters
    if (topDp > MAX_PLAUSIBLE_ANDROID_TOP_DP && dpr >= 1.5) {
      topDp = sanitizeDp(topDp / dpr, MAX_PLAUSIBLE_ANDROID_TOP_DP);
    }
    if (bottomDp > MAX_PLAUSIBLE_ANDROID_BOTTOM_DP && dpr >= 1.5) {
      bottomDp = sanitizeDp(bottomDp / dpr, MAX_PLAUSIBLE_ANDROID_BOTTOM_DP);
    }

    return {
      top: `${topDp}px`,
      bottom: `${bottomDp}px`,
      left: `${leftDp}px`,
      right: `${rightDp}px`,
      source: 'native-bridge'
    };
  }

  if (isAndroidApp) {
    const rawTop = typeof envTopPx === 'number' && Number.isFinite(envTopPx) ? Math.max(0, envTopPx) : 0;
    const rawBottom = typeof envBottomPx === 'number' && Number.isFinite(envBottomPx) ? Math.max(0, envBottomPx) : 0;

    // Detect Chromium Android WebView physical-pixel bug where env(safe-area-inset-top)
    // evaluates to raw physical px (~72-144px) instead of CSS dp (~24-48px)
    const normalizedTop =
      rawTop > MAX_PLAUSIBLE_ANDROID_TOP_DP && dpr >= 1.5
        ? Math.min(Math.round(rawTop / dpr), MAX_PLAUSIBLE_ANDROID_TOP_DP)
        : Math.round(rawTop);

    const normalizedBottom =
      rawBottom > MAX_PLAUSIBLE_ANDROID_BOTTOM_DP && dpr >= 1.5
        ? Math.min(Math.round(rawBottom / dpr), MAX_PLAUSIBLE_ANDROID_BOTTOM_DP)
        : Math.round(rawBottom);

    if (rawTop > MAX_PLAUSIBLE_ANDROID_TOP_DP || rawBottom > MAX_PLAUSIBLE_ANDROID_BOTTOM_DP) {
      return {
        top: `${normalizedTop}px`,
        bottom: `${normalizedBottom}px`,
        left: 'env(safe-area-inset-left, 0px)',
        right: 'env(safe-area-inset-right, 0px)',
        source: 'android-dpr-normalized'
      };
    }
  }

  return {
    top: 'env(safe-area-inset-top, 0px)',
    bottom: 'env(safe-area-inset-bottom, 0px)',
    left: 'env(safe-area-inset-left, 0px)',
    right: 'env(safe-area-inset-right, 0px)',
    source: 'css-env'
  };
}

/**
 * Reads the computed CSS pixel value of `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`
 * via a tiny detached layout probe.
 */
export function probeCssEnvInsetsPx(doc: Document): { top: number; bottom: number } {
  if (!doc?.body && !doc?.documentElement) {
    return { top: 0, bottom: 0 };
  }

  const host = doc.body || doc.documentElement;
  const probe = doc.createElement('div');
  probe.setAttribute('aria-hidden', 'true');
  probe.style.cssText =
    'position:fixed;top:0;left:0;width:0;height:0;visibility:hidden;pointer-events:none;' +
    'padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);';

  try {
    host.appendChild(probe);
    const style = doc.defaultView?.getComputedStyle(probe);
    const top = style ? parseFloat(style.paddingTop) || 0 : 0;
    const bottom = style ? parseFloat(style.paddingBottom) || 0 : 0;
    return { top, bottom };
  } catch {
    return { top: 0, bottom: 0 };
  } finally {
    probe.remove();
  }
}

function readNativeAndroidBridge(win: Window): NativeInsetsSnapshot | null {
  try {
    const bridge = (win as any).SmartRunInsets;
    if (!bridge || typeof bridge.getTopDp !== 'function') {
      return null;
    }
    const ready = typeof bridge.isReady === 'function' ? Boolean(bridge.isReady()) : true;
    if (!ready) {
      return null;
    }
    return {
      top: Number(bridge.getTopDp()),
      bottom: Number(bridge.getBottomDp()),
      left: typeof bridge.getLeftDp === 'function' ? Number(bridge.getLeftDp()) : 0,
      right: typeof bridge.getRightDp === 'function' ? Number(bridge.getRightDp()) : 0,
      ready: true
    };
  } catch {
    return null;
  }
}

function detectAndroidWebView(win: Window): boolean {
  try {
    const ua = win.navigator?.userAgent || '';
    if (
      Boolean((win as any).SmartRunInsets) ||
      Boolean((win as any).Android) ||
      (win as any).isAndroidApp === true ||
      ua.includes('SmartRunApp') ||
      ua.includes('in.smartrun.app') ||
      (/Android/i.test(ua) && /;\s*wv\b/i.test(ua))
    ) {
      return true;
    }
    const cap = (win as any).Capacitor;
    if (cap && typeof cap.isNativePlatform === 'function' && cap.isNativePlatform()) {
      return typeof cap.getPlatform === 'function' ? cap.getPlatform() === 'android' : true;
    }
  } catch {}
  return false;
}

/**
 * Applies synchronized `--safe-area-top` and `--safe-area-bottom` properties onto `<html>`.
 * Safe to invoke synchronously before first React paint and on viewport lifecycle events.
 */
export function syncSafeAreaCssVariables(
  doc: Document | undefined = typeof document !== 'undefined' ? document : undefined,
  win: Window | undefined = typeof window !== 'undefined' ? window : undefined
): ResolvedSafeAreaCss | null {
  if (!doc || !win || !doc.documentElement) return null;

  const isAndroidApp = detectAndroidWebView(win);
  const nativeInsets = readNativeAndroidBridge(win);

  // If MainActivity already directly injected native safe area CSS values and bridge hasn't
  // changed them, avoid clobbering with css-env on Android.
  if (!nativeInsets && isAndroidApp && doc.documentElement.dataset.nativeSafeArea === '1') {
    return null;
  }

  const probed = !nativeInsets && isAndroidApp ? probeCssEnvInsetsPx(doc) : { top: 0, bottom: 0 };
  const resolved = resolveSafeAreaInsets({
    nativeInsets,
    envTopPx: probed.top,
    envBottomPx: probed.bottom,
    devicePixelRatio: win.devicePixelRatio || 1,
    isAndroidApp
  });

  doc.documentElement.style.setProperty('--safe-area-top', resolved.top);
  doc.documentElement.style.setProperty('--safe-area-bottom', resolved.bottom);
  doc.documentElement.style.setProperty('--safe-area-left', resolved.left);
  doc.documentElement.style.setProperty('--safe-area-right', resolved.right);
  return resolved;
}

export function attachSafeAreaListeners(): () => void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  const sync = () => {
    syncSafeAreaCssVariables(document, window);
  };

  sync();
  window.addEventListener('resize', sync, { passive: true });
  window.addEventListener('orientationchange', sync, { passive: true });
  document.addEventListener('visibilitychange', sync, { passive: true });

  return () => {
    window.removeEventListener('resize', sync);
    window.removeEventListener('orientationchange', sync);
    document.removeEventListener('visibilitychange', sync);
  };
}
