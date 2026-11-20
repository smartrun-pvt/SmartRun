/**
 * Unified Passkey (WebAuthn / FIDO2) Client Service
 *
 * - On Web Browsers: uses @simplewebauthn/browser with clean abort handling so
 *   conditional autofill never collides with manual "Passkey" button clicks.
 * - On Native Android App (Capacitor APK): invokes MainActivity's native
 *   `window.SmartRunPasskey` bridge backed by Jetpack Credential Manager
 *   (`androidx.credentials`), bypassing Android WebView's lack of WebAuthn support.
 */

import {
  startRegistration,
  startAuthentication,
  browserSupportsWebAuthn,
  browserSupportsWebAuthnAutofill,
  WebAuthnAbortService,
} from '@simplewebauthn/browser';
import type {
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
  AuthenticationResponseJSON,
} from '@simplewebauthn/browser';
import { Capacitor } from '@capacitor/core';
import { isNativePhoneApp } from '../utils/platformDetection';

interface NativePasskeyBridge {
  isSupported?: () => boolean;
  createPasskey?: (requestId: string, optionsJson: string) => void;
  getPasskey?: (requestId: string, optionsJson: string) => void;
  cancel?: () => void;
}

interface NativePasskeyCallbackPayload {
  success: boolean;
  responseJson?: string;
  errorType?: string;
  errorMessage?: string;
  domError?: string;
  isCancelled?: boolean;
  noCredential?: boolean;
  code?: string;
}

declare global {
  interface Window {
    SmartRunPasskey?: NativePasskeyBridge;
    __smartrunPasskeyCallback?: (requestId: string, payloadJson: string) => void;
  }
}

type PendingResolver = {
  resolve: (value: any) => void;
  reject: (err: any) => void;
  timeoutId: ReturnType<typeof setTimeout>;
};

const pendingNativeRequests = new Map<string, PendingResolver>();

function ensureNativeCallbackRegistered(): void {
  if (typeof window === 'undefined') return;
  if (window.__smartrunPasskeyCallback) return;

  window.__smartrunPasskeyCallback = (requestId: string, payloadJson: string) => {
    const pending = pendingNativeRequests.get(requestId);
    if (!pending) return;
    pendingNativeRequests.delete(requestId);
    clearTimeout(pending.timeoutId);

    try {
      const payload: NativePasskeyCallbackPayload =
        typeof payloadJson === 'string' ? JSON.parse(payloadJson) : payloadJson;

      if (payload?.success && payload.responseJson) {
        const parsedResponse =
          typeof payload.responseJson === 'string'
            ? JSON.parse(payload.responseJson)
            : payload.responseJson;

        // Ensure standard SimpleWebAuthn optional fields exist
        if (parsedResponse && typeof parsedResponse === 'object') {
          if (!parsedResponse.clientExtensionResults) {
            parsedResponse.clientExtensionResults = {};
          }
          if (!parsedResponse.type) {
            parsedResponse.type = 'public-key';
          }
        }
        pending.resolve(parsedResponse);
      } else {
        const err: any = new Error(
          payload?.errorMessage || payload?.domError || 'Passkey operation could not be completed.'
        );
        err.name = payload?.domError || payload?.errorType || 'NativePasskeyError';
        err.code = payload?.code || (payload?.noCredential ? 'NO_CREDENTIAL' : payload?.isCancelled ? 'USER_CANCELLED' : undefined);
        err.isCancelled = Boolean(payload?.isCancelled);
        err.noCredential = Boolean(payload?.noCredential);
        err.domError = payload?.domError;
        pending.reject(err);
      }
    } catch (parseErr: any) {
      pending.reject(new Error(parseErr?.message || 'Invalid response from Android Credential Manager.'));
    }
  };
}

export function isNativeAndroidPasskeyBridgeAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  const bridge = window.SmartRunPasskey;
  if (!bridge || typeof bridge.createPasskey !== 'function' || typeof bridge.getPasskey !== 'function') {
    return false;
  }
  try {
    return typeof bridge.isSupported === 'function' ? Boolean(bridge.isSupported()) : true;
  } catch {
    return false;
  }
}

export function getPasskeyPlatformTag(): 'android_native' | 'web' {
  if (isNativeAndroidPasskeyBridgeAvailable()) {
    return 'android_native';
  }
  if (typeof window !== 'undefined' && Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android') {
    return 'android_native';
  }
  return 'web';
}

export function isPasskeySupported(): boolean {
  if (typeof window === 'undefined') return false;
  if (isNativeAndroidPasskeyBridgeAvailable()) {
    return true;
  }
  // Inside native Android WebView without our Jetpack Credential Manager bridge,
  // WebView's window.PublicKeyCredential does not work against https://localhost.
  if (isNativePhoneApp() && Capacitor.getPlatform() === 'android') {
    return false;
  }
  try {
    return browserSupportsWebAuthn();
  } catch {
    return false;
  }
}

export async function isBrowserPasskeyAutofillSupported(): Promise<boolean> {
  if (typeof window === 'undefined' || isNativePhoneApp()) return false;
  try {
    return await browserSupportsWebAuthnAutofill();
  } catch {
    return false;
  }
}

function invokeNativePasskey(
  action: 'create' | 'get',
  optionsJSON: Record<string, any>
): Promise<any> {
  ensureNativeCallbackRegistered();
  const bridge = window.SmartRunPasskey;
  if (!bridge) {
    const err: any = new Error('Native Android Credential Manager bridge is not available in this APK build.');
    err.code = 'NOT_SUPPORTED';
    return Promise.reject(err);
  }

  const requestId = `pk_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  const serialized = JSON.stringify(optionsJSON);

  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      if (pendingNativeRequests.has(requestId)) {
        pendingNativeRequests.delete(requestId);
        try {
          bridge.cancel?.();
        } catch {}
        const timeoutErr: any = new Error('Passkey prompt timed out. Please try again.');
        timeoutErr.name = 'TimeoutError';
        reject(timeoutErr);
      }
    }, 120_000);

    pendingNativeRequests.set(requestId, { resolve, reject, timeoutId });

    try {
      if (action === 'create') {
        bridge.createPasskey?.(requestId, serialized);
      } else {
        bridge.getPasskey?.(requestId, serialized);
      }
    } catch (invokeErr) {
      pendingNativeRequests.delete(requestId);
      clearTimeout(timeoutId);
      reject(invokeErr);
    }
  });
}

async function cancelActiveWebCeremonyGracefully(): Promise<void> {
  try {
    WebAuthnAbortService.cancelCeremony();
  } catch {
    // Ignore if no ceremony is active
  }
  // Brief micro-yield so Chrome/Safari clears pending conditional mediation state
  await new Promise((resolve) => setTimeout(resolve, 60));
}

export function cancelPasskeyCeremony(): void {
  try {
    WebAuthnAbortService.cancelCeremony();
  } catch {}
  try {
    window.SmartRunPasskey?.cancel?.();
  } catch {}
}

/**
 * Starts WebAuthn Passkey creation (registration) on either Native Android Credential Manager or Web Browser.
 */
export async function createPasskeyCredential(
  optionsJSON: PublicKeyCredentialCreationOptionsJSON
): Promise<RegistrationResponseJSON> {
  if (isNativeAndroidPasskeyBridgeAvailable()) {
    return (await invokeNativePasskey('create', optionsJSON as any)) as RegistrationResponseJSON;
  }

  if (isNativePhoneApp() && Capacitor.getPlatform() === 'android') {
    const err: any = new Error('Native passkey bridge is unavailable in this APK build.');
    err.code = 'NOT_SUPPORTED';
    throw err;
  }

  if (!browserSupportsWebAuthn()) {
    const err: any = new Error('WebAuthn Passkeys are not supported in this browser.');
    err.name = 'NotSupportedError';
    throw err;
  }

  await cancelActiveWebCeremonyGracefully();
  return await startRegistration({ optionsJSON });
}

/**
 * Starts WebAuthn Passkey authentication (sign-in) on either Native Android Credential Manager or Web Browser.
 */
export async function getPasskeyAssertion(
  optionsJSON: PublicKeyCredentialRequestOptionsJSON,
  opts?: { useBrowserAutofill?: boolean }
): Promise<AuthenticationResponseJSON> {
  const useBrowserAutofill = Boolean(opts?.useBrowserAutofill);

  if (!useBrowserAutofill && isNativeAndroidPasskeyBridgeAvailable()) {
    return (await invokeNativePasskey('get', optionsJSON as any)) as AuthenticationResponseJSON;
  }

  if (isNativePhoneApp() && Capacitor.getPlatform() === 'android') {
    const err: any = new Error('Native passkey bridge is unavailable in this APK build.');
    err.code = 'NOT_SUPPORTED';
    throw err;
  }

  if (!browserSupportsWebAuthn()) {
    const err: any = new Error('WebAuthn Passkeys are not supported in this browser.');
    err.name = 'NotSupportedError';
    throw err;
  }

  if (!useBrowserAutofill) {
    await cancelActiveWebCeremonyGracefully();
  }

  return await startAuthentication({
    optionsJSON,
    useBrowserAutofill,
  });
}
