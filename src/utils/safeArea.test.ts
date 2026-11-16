import { describe, test, expect } from 'vitest';
import { resolveSafeAreaInsets } from './safeArea';

describe('resolveSafeAreaInsets (Android APK & Web safe-area normalization)', () => {
  test('uses exact density-normalized native bridge DP values and ignores inflated WebView env()', () => {
    const resolved = resolveSafeAreaInsets({
      nativeInsets: { top: 36, bottom: 44, left: 0, right: 0, ready: true },
      envTopPx: 108, // Simulate buggy WebView reporting raw physical pixels
      envBottomPx: 132,
      devicePixelRatio: 3,
      isAndroidApp: true
    });

    expect(resolved.source).toBe('native-bridge');
    expect(resolved.top).toBe('36px');
    expect(resolved.bottom).toBe('44px');
  });

  test('normalizes raw physical pixel env(safe-area-inset-top) on Android when native bridge is unavailable', () => {
    const resolved = resolveSafeAreaInsets({
      nativeInsets: null,
      envTopPx: 96, // Matches the ~96px gap observed on 3x/2.75x Android devices
      envBottomPx: 132,
      devicePixelRatio: 3,
      isAndroidApp: true
    });

    expect(resolved.source).toBe('android-dpr-normalized');
    expect(resolved.top).toBe('32px');
    expect(resolved.bottom).toBe('44px');
  });

  test('preserves normal DP env(safe-area-inset-top) on Android when already density-scaled', () => {
    const resolved = resolveSafeAreaInsets({
      nativeInsets: null,
      envTopPx: 38,
      envBottomPx: 42,
      devicePixelRatio: 3,
      isAndroidApp: true
    });

    expect(resolved.source).toBe('css-env');
    expect(resolved.top).toBe('env(safe-area-inset-top, 0px)');
  });

  test('passes through CSS env() untouched on desktop, mobile Chrome, and iOS PWA', () => {
    const resolved = resolveSafeAreaInsets({
      nativeInsets: null,
      envTopPx: 47,
      envBottomPx: 34,
      devicePixelRatio: 3,
      isAndroidApp: false
    });

    expect(resolved.source).toBe('css-env');
    expect(resolved.top).toBe('env(safe-area-inset-top, 0px)');
    expect(resolved.bottom).toBe('env(safe-area-inset-bottom, 0px)');
  });

  test('guards against negative, NaN, and unready native bridge inputs', () => {
    const unready = resolveSafeAreaInsets({
      nativeInsets: { top: 100, bottom: 100, ready: false },
      envTopPx: 0,
      envBottomPx: 0,
      devicePixelRatio: 3,
      isAndroidApp: true
    });
    expect(unready.source).toBe('css-env');

    const corrupted = resolveSafeAreaInsets({
      nativeInsets: { top: -15, bottom: Number.NaN, ready: true },
      devicePixelRatio: 2,
      isAndroidApp: true
    });
    expect(corrupted.source).toBe('native-bridge');
    expect(corrupted.top).toBe('0px');
    expect(corrupted.bottom).toBe('0px');
  });
});
