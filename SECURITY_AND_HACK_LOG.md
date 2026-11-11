# SECURITY_AND_HACK_LOG.md (Adversarial Red-Team Checklist)

## Threat 1: Welcome Email Flooding / Spool Exhaustion
- **Attack Vector**: An adversary repeatedly calls `/api/auth/send-welcome-email` or triggers repeated app-launch profile synchronizations to exhaust Resend API quota or send spam emails to existing users.
- **Defense**:
  1. Complete removal of email dispatch from profile synchronization endpoint `/api/user-profile`.
  2. Multi-tier database guard in `/api/auth/send-welcome-email`: queries Supabase `user_profiles` and Firebase Firestore. If an account was created more than 5 minutes ago or is already recorded as welcomed in the cloud database, the request is permanently short-circuited with `alreadySent: true`.
  3. Client-side durable storage flags in Capacitor Preferences and localStorage prevent duplicate triggers.

## Threat 2: Credential & Token Resurfacing from Local Storage / IndexedDB
- **Attack Vector**: An attacker gains access to a shared computer or mobile device after a user clicks "Sign Out". The attacker inspects IndexedDB or cached storage to retrieve stale Supabase/Firebase session tokens and impersonate the user.
- **Defense**:
  1. `purgeAllUserCacheAndStorage()` systematically nukes all `localStorage`, `sessionStorage`, all Cache Storage API containers, all IndexedDB databases via `window.indexedDB.databases()`, cookies, and Capacitor Native Preferences.
  2. Cloud Run server terminates the session via `/api/auth/logout`.
  3. UI state is flushed synchronously with `flushSync` and navigated immediately to `/login`.

## Threat 3: R8 Missing Class Halts & Android Build Vulnerabilities
- **Attack Vector**: Building production release APKs with minification enabled crashes due to missing ProGuard rules in third-party plugins.
- **Defense**:
  1. Added `missing_rules.txt` in `android/app/` and root `android/`.
  2. Configured universal `-dontwarn **` and `-ignorewarnings` in `android/app/proguard-rules.pro`.

## Threat 4: Static Test OTP Backdoor & Account Takeover
- **Attack Vector**: An attacker submits any victim's mobile number or admin number (`8777400280`) with `123456` or `582914`, completely bypassing OTP verification and gaining full account and admin control.
- **Defense**:
  1. Removed all static bypass codes in `src/services/firebaseAuthService.ts` and `server.ts`.
  2. In non-production testing, test codes are strictly restricted to an explicit dummy virtual sandbox number (`9999900000`). All real customer phone numbers and the admin number strictly require genuine cryptographic HMAC verification tokens or Firebase Phone Auth.

## Threat 5: Unthrottled Credential Stuffing & Brute-Force Password Guessing
- **Attack Vector**: An attacker scripts automated bot requests against `/api/auth/login` guessing passwords across stolen email/phone dictionaries at high speed.
- **Defense**:
  1. Attached dedicated `loginRateLimiter` (max 15 requests / 15 minutes per IP).
  2. Implemented `failedLoginTracker` with automated account lockout: 5 consecutive failed attempts on an account locks it for 15 minutes.
  3. Injected 300–500ms artificial timing jitter on failed password evaluations to neutralize side-channel timing analysis.

## Threat 6: PII Scraping via Unauthenticated Account Resolution
- **Attack Vector**: An unauthenticated scraper calls `/api/auth/resolve-google-user` with victim email addresses to harvest real names, unmasked phone numbers, and wallet/refund balances.
- **Defense**:
  1. Attached `accountLookupLimiter` (max 25 requests / 10 minutes per IP).
  2. For unauthenticated queries, the server masks phone numbers (`+91 ******3210`) and strips all financial balances and order address history.

## Threat 7: Plaintext Password Exposure on Phone Session Provisioning
- **Attack Vector**: Probing `/api/auth/phone-login-session` returned the internal formulaic password in the response body.
- **Defense**:
  1. Stripped `password` from the JSON response of `/api/auth/phone-login-session`.
  2. Added `phoneResolveLimiter` to the endpoint.

## Threat 8: XSS and XML Entity Injection via Product Titles & Descriptions
- **Attack Vector**: An attacker injecting special characters (`<script>`, quotes, or `&`) into product names or descriptions in the database causes unescaped script execution during SSR micro-prerendering or XML corruption in `/sitemap.xml`.
- **Defense**:
  1. Built strict sanitization helpers `escapeHtml` and `escapeXml` in `src/utils/seoHelper.ts`.
  2. All titles, meta tags, and OpenGraph contents undergo full character entity substitution (`&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#039;`).
  3. JSON-LD scripts are serialized with standard `JSON.stringify`, preventing breakout attacks before client hydration.
  4. Unit tested against malicious payloads in `src/utils/seoHelper.test.ts`.
