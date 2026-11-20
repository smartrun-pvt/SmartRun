import { describe, it, expect } from 'vitest';
import {
  ANDROID_CERT_SHA256_FINGERPRINTS,
  decodeBase64UrlToUtf8,
  formatPasskeyError,
  getAndroidApkKeyHashOrigins,
  hexSha256ToAndroidApkKeyHashOrigin,
  resolveWebAuthnRpConfig,
} from './passkeyHelper';

describe('passkeyHelper', () => {
  it('converts SHA-256 hex fingerprints to valid android:apk-key-hash base64url origins', () => {
    const origin = hexSha256ToAndroidApkKeyHashOrigin(ANDROID_CERT_SHA256_FINGERPRINTS[0]);
    expect(origin.startsWith('android:apk-key-hash:')).toBe(true);
    const hashPart = origin.replace('android:apk-key-hash:', '');
    // 32 bytes in base64url without padding is always 43 chars
    expect(hashPart.length).toBe(43);
    expect(hashPart).not.toContain('+');
    expect(hashPart).not.toContain('/');
    expect(hashPart).not.toContain('=');

    const allOrigins = getAndroidApkKeyHashOrigins();
    expect(allOrigins.length).toBe(ANDROID_CERT_SHA256_FINGERPRINTS.length);
  });

  it('resolves rpID smartrun.in and includes Android origins for production web domain', () => {
    const cfg = resolveWebAuthnRpConfig({
      host: 'www.smartrun.in',
      origin: 'https://www.smartrun.in',
    });
    expect(cfg.rpID).toBe('smartrun.in');
    expect(cfg.expectedOrigins).toContain('https://www.smartrun.in');
    expect(cfg.expectedOrigins).toContain('https://smartrun.in');
    expect(cfg.expectedOrigins.some((o) => o.startsWith('android:apk-key-hash:'))).toBe(true);
  });

  it('uses browser origin host instead of internal proxy host on Cloud Run preview URLs', () => {
    const cfg = resolveWebAuthnRpConfig({
      host: 'localhost:3000',
      origin: 'https://ais-dev-example.asia-southeast1.run.app',
    });
    expect(cfg.rpID).toBe('ais-dev-example.asia-southeast1.run.app');
    expect(cfg.expectedOrigins).toContain('https://ais-dev-example.asia-southeast1.run.app');
  });

  it('resolves rpID smartrun.in for native Android Capacitor requests', () => {
    const cfg = resolveWebAuthnRpConfig({
      host: 'www.smartrun.in',
      origin: 'https://localhost',
      isNativeAndroid: true,
    });
    expect(cfg.rpID).toBe('smartrun.in');
    expect(cfg.expectedRPIDs).toContain('smartrun.in');
    expect(cfg.expectedOrigins.some((o) => o.startsWith('android:apk-key-hash:'))).toBe(true);
  });

  it('resolves localhost cleanly during local browser development', () => {
    const cfg = resolveWebAuthnRpConfig({
      host: 'localhost:3000',
      origin: 'http://localhost:3000',
    });
    expect(cfg.rpID).toBe('localhost');
    expect(cfg.expectedOrigins).toContain('http://localhost:3000');
  });

  it('decodes base64url userHandle back to UTF-8 userId', () => {
    const sampleId = 'user-12345-abc';
    const b64url = Buffer.from(sampleId, 'utf8').toString('base64url');
    expect(decodeBase64UrlToUtf8(b64url)).toBe(sampleId);
    expect(decodeBase64UrlToUtf8('')).toBe('');
  });

  it('distinguishes instant NotAllowedError rejections from real user cancellations', () => {
    const instantReject = formatPasskeyError(
      { name: 'NotAllowedError', message: 'The operation either timed out or was not allowed.' },
      { mode: 'login', elapsedMs: 60 }
    );
    expect(instantReject.isCancelled).toBe(false);
    expect(instantReject.message).toContain('Profile → Security → Passkey');

    const userDismiss = formatPasskeyError(
      { name: 'NotAllowedError', message: 'The operation either timed out or was not allowed.' },
      { mode: 'login', elapsedMs: 2200 }
    );
    expect(userDismiss.isCancelled).toBe(true);
    expect(userDismiss.message).toBeNull();

    const noCred = formatPasskeyError(
      { noCredential: true, code: 'NO_CREDENTIAL', message: 'No credentials available' },
      { isNativeApp: true, mode: 'login' }
    );
    expect(noCred.isCancelled).toBe(false);
    expect(noCred.message).toContain('No passkey is saved on this device');
  });
});
