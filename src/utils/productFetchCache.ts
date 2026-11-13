export interface CachedLoaderOptions {
  forceRefresh?: boolean;
}

export interface InFlightCachedLoader<T> {
  load: (options?: CachedLoaderOptions) => Promise<T>;
  clear: () => void;
}

/**
 * Deduplicates concurrent callers into a single in-flight promise and caches
 * non-empty/successful results for `ttlMs` to prevent mount request storms.
 * Rejected fetches never poison the cache.
 */
export function createInFlightCachedLoader<T>(
  fetcher: () => Promise<T>,
  ttlMs = 30_000,
  shouldCacheValue: (val: T) => boolean = () => true,
  nowFn: () => number = () => Date.now()
): InFlightCachedLoader<T> {
  let cachedValue: T | null = null;
  let cachedAt = 0;
  let inFlight: Promise<T> | null = null;

  const clear = () => {
    cachedValue = null;
    cachedAt = 0;
  };

  const load = async (options?: CachedLoaderOptions): Promise<T> => {
    const forceRefresh = Boolean(options?.forceRefresh);
    const now = nowFn();

    if (!forceRefresh && cachedValue !== null && now - cachedAt < ttlMs) {
      return cachedValue;
    }

    if (!forceRefresh && inFlight) {
      return inFlight;
    }

    const request = (async () => {
      try {
        const result = await fetcher();
        if (shouldCacheValue(result)) {
          cachedValue = result;
          cachedAt = nowFn();
        }
        return result;
      } finally {
        if (inFlight === request) {
          inFlight = null;
        }
      }
    })();

    if (!inFlight) {
      inFlight = request;
    }

    return request;
  };

  return { load, clear };
}
