import { describe, test, expect, vi, afterEach } from 'vitest';
import { trackPageView, trackPlayStoreClick, trackAppError } from './analytics';

describe('analytics GA4 attribution and measurement ID consistency', () => {
  const originalWindow = globalThis.window;

  afterEach(() => {
    globalThis.window = originalWindow;
  });

  test('sends page_view, play_store_click, and exception to G-E3TVJRTKRP', () => {
    const gtagMock = vi.fn();
    globalThis.window = {
      gtag: gtagMock
    } as unknown as Window & typeof globalThis;

    trackPageView('/electrical', 'Electrical Goods');
    trackPlayStoreClick('footer');
    trackAppError('Network timeout', false);

    expect(gtagMock).toHaveBeenCalledWith(
      'event',
      'page_view',
      expect.objectContaining({
        page_path: '/electrical',
        send_to: 'G-E3TVJRTKRP'
      })
    );

    expect(gtagMock).toHaveBeenCalledWith(
      'event',
      'play_store_click',
      expect.objectContaining({
        source: 'footer',
        app_package: 'in.smartrun.app',
        send_to: 'G-E3TVJRTKRP'
      })
    );

    expect(gtagMock).toHaveBeenCalledWith(
      'event',
      'exception',
      expect.objectContaining({
        description: 'Network timeout',
        fatal: false,
        send_to: 'G-E3TVJRTKRP'
      })
    );
  });
});
