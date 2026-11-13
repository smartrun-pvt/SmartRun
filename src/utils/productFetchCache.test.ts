import { describe, test, expect } from 'vitest';
import { createInFlightCachedLoader } from './productFetchCache';

describe('productFetchCache', () => {
  test('createInFlightCachedLoader deduplicates concurrent calls into a single fetcher invocation', async () => {
    let calls = 0;
    let now = 1000;
    const loader = createInFlightCachedLoader(
      async () => {
        calls += 1;
        await new Promise((r) => setTimeout(r, 15));
        return ['item-a', 'item-b'];
      },
      30_000,
      (arr) => arr.length > 0,
      () => now
    );

    const [r1, r2, r3] = await Promise.all([loader.load(), loader.load(), loader.load()]);
    expect(calls).toBe(1);
    expect(r1).toEqual(['item-a', 'item-b']);
    expect(r2).toEqual(['item-a', 'item-b']);
    expect(r3).toEqual(['item-a', 'item-b']);

    // Cached hit within TTL
    const r4 = await loader.load();
    expect(calls).toBe(1);
    expect(r4).toEqual(['item-a', 'item-b']);

    // Expired TTL triggers fresh fetch
    now += 31_000;
    await loader.load();
    expect(calls).toBe(2);

    // forceRefresh bypasses TTL
    await loader.load({ forceRefresh: true });
    expect(calls).toBe(3);
  });

  test('createInFlightCachedLoader does not cache rejected promises or empty arrays when guarded', async () => {
    let attempt = 0;
    const loader = createInFlightCachedLoader(
      async () => {
        attempt += 1;
        if (attempt === 1) throw new Error('network error');
        if (attempt === 2) return [] as string[];
        return ['ok'];
      },
      30_000,
      (arr) => arr.length > 0
    );

    await expect(loader.load()).rejects.toThrow(/network error/);
    const second = await loader.load();
    expect(second).toEqual([]);
    const third = await loader.load();
    expect(third).toEqual(['ok']);
    expect(attempt).toBe(3);
  });
});
