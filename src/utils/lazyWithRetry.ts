import React, { ComponentType } from 'react';

const RELOAD_STORAGE_KEY = 'smartrun_dynamic_import_reload_ts';
const RELOAD_COOLDOWN_MS = 15000;

/**
 * Checks whether an error was caused by a failed ES dynamic import / Vite chunk fetch
 * (e.g., transient network error, Vite dev re-optimization, or stale hashed chunk after deploy).
 */
export function isDynamicImportError(error: unknown): boolean {
  if (!error) return false;
  const message =
    typeof error === 'string'
      ? error
      : typeof (error as any)?.message === 'string'
      ? (error as any).message
      : '';
  const name = typeof (error as any)?.name === 'string' ? (error as any).name : '';

  return (
    name === 'ChunkLoadError' ||
    /Failed to fetch dynamically imported module/i.test(message) ||
    /Importing a module script failed/i.test(message) ||
    /error loading dynamically imported module/i.test(message) ||
    /Loading chunk [\d\w-]+ failed/i.test(message) ||
    /Unable to preload CSS/i.test(message)
  );
}

/**
 * Performs a loop-protected page reload (at most once per 15 seconds) when online,
 * allowing Vite / production assets to re-fetch fresh module manifests and hashes.
 */
export function triggerStaleModuleReload(): boolean {
  if (typeof window === 'undefined') return false;
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return false;

  try {
    const now = Date.now();
    const lastReloadRaw = window.sessionStorage?.getItem(RELOAD_STORAGE_KEY);
    const lastReloadAt = lastReloadRaw ? Number(lastReloadRaw) : 0;

    if (Number.isFinite(lastReloadAt) && lastReloadAt > 0 && now - lastReloadAt < RELOAD_COOLDOWN_MS) {
      return false;
    }

    window.sessionStorage?.setItem(RELOAD_STORAGE_KEY, String(now));
    window.location.reload();
    return true;
  } catch {
    return false;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Drop-in replacement for React.lazy that retries transient module fetch failures
 * with short exponential backoff and auto-recovers once from stale chunk hashes.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  maxRetries = 2
): React.LazyExoticComponent<T> {
  return React.lazy(async () => {
    let lastError: unknown;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await factory();
      } catch (err) {
        lastError = err;

        if (!isDynamicImportError(err)) {
          throw err;
        }

        if (attempt < maxRetries) {
          await sleep(350 * (attempt + 1));
        }
      }
    }

    if (triggerStaleModuleReload()) {
      // Wait briefly while the browser navigates/reloads; reject after 4s if blocked by container.
      await sleep(4000);
    }

    throw lastError;
  });
}
