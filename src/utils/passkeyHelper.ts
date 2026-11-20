/**
 * Shared pure WebAuthn / Passkey helpers used across both server.ts and client components.
 * Supports Web Browsers (Chrome, Safari, Edge, Firefox) AND Native Android Credential Manager.
 */

export const ANDROID_APP_PACKAGE = 'in.smartrun.app';
export const PRODUCTION_RP_ID = 'smartrun.in';
export const PRODUCTION_WEB_ORIGINS = [
  'https://www.smartrun.in',
  'https://smartrun.in',
] as const;

/**
 * Verified SHA-256 signing certificate fingerprints from public/.well-known/assetlinks.json.
 * Used to compute valid `android:apk-key-hash:<base64url>` origins for Android Credential Manager.
 */
export const ANDROID_CERT_SHA256_FINGERPRINTS: readonly string[] = [
  '83:35:6B:EA:95:7A:69:7A:BB:7D:A4:4F:C3:B1:96:AE:7A:9F:65:CC:46:00:56:52:FA:12:42:6B:CC:F2:A7:DE',
  '23:B9:84:0D:7F:F5:08:E9:87:61:C5:F5:9C:B6:2C:22:60:75:30:27:68:20:1B:D6:B9:A0:EA:94:C9:D4:06:8C',
  '14:6D:E9:7D:0C:6D:77:E5:EE:DE:28:B6:F0:4B:92:47:FD:B3:36:CF:BE:0C:F0:7C:1E:58:E6:C3:FF:11:EB:7B',
  '91:E1:44:1D:A9:F0:1B:BA:B7:7E:33:E5:14:7C:A6:AE:7E:5B:0A:ED:AB:EC:C2:6F:DD:0E:DF:C6:84:72:7A:E5',
  'DB:D8:FC:92:9D:5C:47:E2:0C:1F:D3:58:EE:91:C4:85:AB:3A:CB:33:CD:09:6F:B4:7A:1D:6B:B7:64:85:00:3A',
];

const BASE64URL_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

function bytesToBase64Url(bytes: Uint8Array): string {
  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i];
    const hasB1 = i + 1 < bytes.length;
    const hasB2 = i + 2 < bytes.length;
    const b1 = hasB1 ? bytes[i + 1] : 0;
    const b2 = hasB2 ? bytes[i + 2] : 0;

    out += BASE64URL_ALPHABET[b0 >> 2];
    out += BASE64URL_ALPHABET[((b0 & 0x03) << 4) | (b1 >> 4)];
    if (hasB1) {
      out += BASE64URL_ALPHABET[((b1 & 0x0f) << 2) | (b2 >> 6)];
    }
    if (hasB2) {
      out += BASE64URL_ALPHABET[b2 & 0x3f];
    }
  }
  return out;
}

/**
 * Convert a colon-separated SHA-256 hex certificate fingerprint (from assetlinks.json)
 * into the Android Credential Manager WebAuthn origin format:
 * `android:apk-key-hash:<base64url-without-padding>`
 */
export function hexSha256ToAndroidApkKeyHashOrigin(hexFingerprint: string): string {
  const cleanHex = String(hexFingerprint || '').replace(/[^0-9a-fA-F]/g, '');
  if (cleanHex.length !== 64) {
    throw new Error(`Invalid SHA-256 fingerprint length: expected 64 hex chars, got ${cleanHex.length}`);
  }
  const bytes = new Uint8Array(32);
  for (let i = 0; i < 32; i++) {
    bytes[i] = parseInt(cleanHex.slice(i * 2, i * 2 + 2), 16);
  }
  return `android:apk-key-hash:${bytesToBase64Url(bytes)}`;
}

/**
 * Compute all trusted `android:apk-key-hash:...` origins from built-in and optional extra fingerprints.
 */
export function getAndroidApkKeyHashOrigins(extraFingerprints: string[] = []): string[] {
  const all = [...ANDROID_CERT_SHA256_FINGERPRINTS, ...extraFingerprints];
  const seen = new Set<string>();
  const origins: string[] = [];
  for (const fp of all) {
    try {
      const origin = hexSha256ToAndroidApkKeyHashOrigin(fp);
      if (!seen.has(origin)) {
        seen.add(origin);
        origins.push(origin);
      }
    } catch {
      // Ignore malformed fingerprint entry
    }
  }
  return origins;
}

export interface ResolveWebAuthnRpParams {
  host?: string;
  forwardedHost?: string;
  origin?: string;
  isNativeAndroid?: boolean;
  extraAndroidFingerprints?: string[];
}

export interface ResolvedWebAuthnRpConfig {
  rpID: string;
  expectedRPIDs: string[];
  expectedOrigins: string[];
}

function parseHostnameFromOrigin(origin?: string): { hostname: string; normalizedOrigin: string } | null {
  if (!origin || typeof origin !== 'string') return null;
  const trimmed = origin.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) return null;
  try {
    const parsed = new URL(trimmed);
    return {
      hostname: parsed.hostname.toLowerCase(),
      normalizedOrigin: parsed.origin,
    };
  } catch {
    return null;
  }
}

function stripPort(hostHeader?: string): string {
  if (!hostHeader) return '';
  const first = String(hostHeader).split(',')[0].trim();
  return first.split(':')[0].toLowerCase();
}

/**
 * Resolves the authoritative WebAuthn Relying Party ID (`rpID`) and allowed `expectedOrigins`
 * for both Web Browsers (including Cloud Run / reverse proxies / localhost) and Native Android App.
 */
export function resolveWebAuthnRpConfig(params: ResolveWebAuthnRpParams): ResolvedWebAuthnRpConfig {
  const androidOrigins = getAndroidApkKeyHashOrigins(params.extraAndroidFingerprints);
  const originSet = new Set<string>([
    ...PRODUCTION_WEB_ORIGINS,
    ...androidOrigins,
  ]);
  const rpIdSet = new Set<string>();

  const parsedOrigin = parseHostnameFromOrigin(params.origin);
  const rawOrigin = String(params.origin || '').trim();
  const isCapacitorWebViewOrigin =
    rawOrigin === 'https://localhost' ||
    rawOrigin === 'http://localhost' ||
    rawOrigin.startsWith('capacitor://') ||
    rawOrigin.startsWith('ionic://') ||
    rawOrigin.startsWith('android:apk-key-hash:');

  const forwardedHostClean = stripPort(params.forwardedHost);
  const hostClean = stripPort(params.host);

  let rpID = PRODUCTION_RP_ID;

  if (params.isNativeAndroid || isCapacitorWebViewOrigin) {
    // Native Android Credential Manager validates against https://smartrun.in/.well-known/assetlinks.json
    rpID = PRODUCTION_RP_ID;
    rpIdSet.add(PRODUCTION_RP_ID);
    rpIdSet.add('www.smartrun.in');
  } else if (parsedOrigin) {
    const oHost = parsedOrigin.hostname;
    originSet.add(parsedOrigin.normalizedOrigin);

    if (oHost === 'smartrun.in' || oHost.endsWith('.smartrun.in')) {
      rpID = PRODUCTION_RP_ID;
      rpIdSet.add(PRODUCTION_RP_ID);
      rpIdSet.add('www.smartrun.in');
      originSet.add(`https://${oHost}`);
    } else if (oHost === 'localhost' || oHost === '127.0.0.1') {
      rpID = oHost;
      rpIdSet.add(oHost);
      rpIdSet.add('localhost');
      originSet.add('http://localhost:3000');
      originSet.add('http://127.0.0.1:3000');
      originSet.add('https://localhost:3000');
    } else {
      // Cloud Run preview (*.run.app), staging, or custom domains:
      // Browser WebAuthn requires rpID to match or be a registrable suffix of the page origin hostname.
      rpID = oHost;
      rpIdSet.add(oHost);
      originSet.add(`https://${oHost}`);
      originSet.add(`http://${oHost}`);
    }
  } else {
    const effectiveHost = forwardedHostClean || hostClean || 'www.smartrun.in';
    if (effectiveHost === 'smartrun.in' || effectiveHost.endsWith('.smartrun.in')) {
      rpID = PRODUCTION_RP_ID;
      rpIdSet.add(PRODUCTION_RP_ID);
      rpIdSet.add('www.smartrun.in');
    } else if (effectiveHost === 'localhost' || effectiveHost === '127.0.0.1') {
      rpID = effectiveHost;
      rpIdSet.add(effectiveHost);
      rpIdSet.add('localhost');
      originSet.add('http://localhost:3000');
      originSet.add('http://127.0.0.1:3000');
    } else {
      rpID = effectiveHost;
      rpIdSet.add(effectiveHost);
      originSet.add(`https://${effectiveHost}`);
    }
  }

  if (rawOrigin && !originSet.has(rawOrigin)) {
    originSet.add(rawOrigin);
  }

  rpIdSet.add(rpID);

  return {
    rpID,
    expectedRPIDs: Array.from(rpIdSet),
    expectedOrigins: Array.from(originSet),
  };
}

/**
 * Decode a base64url string (such as WebAuthn `response.response.userHandle`) to UTF-8 text.
 * Returns empty string if input is empty or invalid.
 */
export function decodeBase64UrlToUtf8(base64url?: string | null): string {
  if (!base64url || typeof base64url !== 'string') return '';
  try {
    const normalized = base64url.replace(/-/g, '+').replace(/_/g, '/');
    const padLength = (4 - (normalized.length % 4)) % 4;
    const padded = normalized + '='.repeat(padLength);
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(padded, 'base64').toString('utf8');
    }
    if (typeof atob === 'function') {
      const binary = atob(padded);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return new TextDecoder().decode(bytes);
    }
    return '';
  } catch {
    return '';
  }
}

export interface FormattedPasskeyError {
  message: string | null;
  isCancelled: boolean;
}

/**
 * Translates raw browser WebAuthn and Android Credential Manager exceptions into
 * clear, actionable user-facing messages (never silently hiding real failures).
 */
export function formatPasskeyError(
  err: unknown,
  options?: { isNativeApp?: boolean; mode?: 'login' | 'register'; elapsedMs?: number }
): FormattedPasskeyError {
  const isNativeApp = Boolean(options?.isNativeApp);
  const mode = options?.mode || 'login';
  const elapsedMs = typeof options?.elapsedMs === 'number' ? options.elapsedMs : 1000;

  const anyErr = err as {
    name?: string;
    code?: string;
    message?: string;
    isCancelled?: boolean;
    noCredential?: boolean;
    domError?: string;
  } | null;

  const name = String(anyErr?.name || '');
  const code = String(anyErr?.code || '');
  const message = String(anyErr?.message || '');
  const lowerMsg = message.toLowerCase();
  const lowerName = name.toLowerCase();

  // Explicit native cancellation or AbortError
  if (
    anyErr?.isCancelled === true ||
    lowerName === 'aborterror' ||
    code === 'USER_CANCELLED' ||
    lowerMsg.includes('user cancelled') ||
    lowerMsg.includes('user canceled') ||
    lowerMsg.includes('cancellationexception')
  ) {
    return { message: null, isCancelled: true };
  }

  // Android Credential Manager: No passkey stored on device for this domain
  if (
    anyErr?.noCredential === true ||
    code === 'NO_CREDENTIAL' ||
    lowerMsg.includes('nocredentialexception') ||
    lowerMsg.includes('no credentials available') ||
    lowerMsg.includes('no passkey found')
  ) {
    return {
      message:
        'No passkey is saved on this device yet. Sign in once with Mobile OTP or Google, then add a passkey in Profile → Security → Passkey.',
      isCancelled: false,
    };
  }

  // Android Credential Manager provider / Digital Asset Links / signing fingerprint mismatch
  if (
    code === 'PROVIDER_UNAVAILABLE' ||
    lowerMsg.includes('providerconfigurationexception') ||
    lowerMsg.includes('no create options available') ||
    lowerMsg.includes('no credential manager')
  ) {
    return {
      message:
        'Google Password Manager / Passkey service is unavailable on this device. Ensure Google Play Services and a device screen lock are enabled.',
      isCancelled: false,
    };
  }

  if (
    lowerMsg.includes('assetlinks') ||
    lowerMsg.includes('digital asset') ||
    lowerMsg.includes('incoming request cannot be validated') ||
    lowerMsg.includes('calling app') ||
    lowerMsg.includes('rp id') ||
    lowerName === 'securityerror'
  ) {
    return {
      message: isNativeApp
        ? 'Android could not verify the app signature with smartrun.in Digital Asset Links. Passkeys require a signed release/Play Store build whose SHA-256 fingerprint is registered on smartrun.in.'
        : 'Passkey security domain check failed on this URL. Please open https://www.smartrun.in directly in your browser and try again.',
      isCancelled: false,
    };
  }

  // Duplicate passkey already exists on this device during registration
  if (lowerName === 'invalidstateerror' || lowerMsg.includes('already registered') || lowerMsg.includes('authenticator was previously registered')) {
    return {
      message: 'A passkey for your SmartRun account is already saved on this device.',
      isCancelled: false,
    };
  }

  // Unsupported browser / embedded WebView / missing HTTPS
  if (
    lowerName === 'notsupportederror' ||
    code === 'NOT_SUPPORTED' ||
    lowerMsg.includes('not supported') ||
    lowerMsg.includes('publickey-credentials') ||
    lowerMsg.includes('permissions policy') ||
    lowerMsg.includes('feature is not enabled in this document')
  ) {
    return {
      message: isNativeApp
        ? 'Native passkey bridge is unavailable in this APK build. Please rebuild/update the SmartRun app or sign in with Mobile OTP / Google.'
        : 'Passkeys are blocked in this embedded view or unsupported browser. Open https://www.smartrun.in directly in Chrome, Safari, or Edge.',
      isCancelled: false,
    };
  }

  // Browser NotAllowedError:
  // If it returned almost immediately (< 350ms), the browser rejected it without giving the user a prompt
  // (e.g., cross-origin iframe, no saved passkey, or policy block) — show a helpful message instead of silently doing nothing!
  if (lowerName === 'notallowederror') {
    if (elapsedMs < 350) {
      return {
        message:
          mode === 'register'
            ? 'Your browser blocked passkey creation on this window. Open https://www.smartrun.in in a regular browser tab and ensure screen lock / biometrics is enabled.'
            : 'Passkey prompt could not open here. Make sure you have created a passkey under Profile → Security → Passkey, or open https://www.smartrun.in directly.',
        isCancelled: false,
      };
    }
    // User explicitly dismissed or timed out the biometric sheet after it opened
    if (mode === 'register') {
      return {
        message: 'Passkey setup was cancelled or timed out. Tap + to try again.',
        isCancelled: true,
      };
    }
    return { message: null, isCancelled: true };
  }

  return {
    message:
      message ||
      (mode === 'register'
        ? 'Could not register passkey on this device. Please try again.'
        : 'Could not complete passkey sign-in. Please try again or use OTP / Google.'),
    isCancelled: false,
  };
}
