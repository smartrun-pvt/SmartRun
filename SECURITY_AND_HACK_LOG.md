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

## Threat 9: SSR Route Spoofing & Disallowed Route Exposure
- **Attack Vector**: Malicious crawlers or scrapers target private user endpoints (`/delete`, `/account-deletion`, `/personal-info`, `/auth`) or inject wildcard paths into SSR rendering to trigger memory exhaustion or expose unauthenticated interfaces in search indexes.
- **Defense**:
  1. `public/robots.txt` explicitly disallows `/delete`, `/account-deletion`, `/personal-info`, and `/auth` for both prioritized search crawlers (Googlebot, Bingbot, Applebot, AhrefsBot) and generic user-agents.
  2. `public/sitemap.xml` and dynamic sitemap generators strictly purge disallowed and private authentication routes.
  3. Server SSR prerender matchers operate on a strict whitelist of public routes (`/`, `/electrical`, `/construction`, `/technicians`, `/technicians/:id`, `/electrical/product/:id`, `/construction/product/:id`, `/about`, `/faqs`, `/how-to-use`, `/terms`, `/privacy`, `/sitemap`, `/shipping`, `/return`, `/refund-policy`).
  4. Non-matching or private routes bypass SSR metadata injection and fall through to standard index.html.

## Threat 10: Structured Data Spam, Fabricated AggregateRatings & Google Manual Actions
- **Attack Vector**: An adversary or naive implementation injects synthetic 5-star ratings or fabricated reviews into Schema.org JSON-LD without actual user reviews on the page. Google's Search Quality algorithms detect the discrepancy between rendered DOM content and structured data, issuing a Structured Data Manual Action penalty that de-indexes all Rich Results for the domain.
- **Defense**:
  1. Zero hardcoded fake rating fallbacks: `aggregateRating` is conditionally generated strictly when real numerical review data exists (`product.rating > 0 && product.reviewsCount > 0`). If unrated, the node is completely omitted.
  2. Genuine customer reviews (`review` array) are only embedded when real database review entries are present.
  3. Single authoritative JSON-LD instance: `#server-prerender-schema` is wiped on client mount, eliminating conflicting duplicate entity declarations across SSR and CSR.

## Threat 11: Hidden Text, Keyword Stuffing & Spam Penalties
- **Attack Vector**: A naive SEO attempt hides dense keyword lists via CSS (`display: none`, `opacity: 0`, offscreen margins) to game search algorithms, violating Google Search Essentials spam policies and resulting in a site-wide manual penalty.
- **Defense**:
  1. All brand identity statements, product categories, and Kolkata delivery localities are rendered in 100% visible, accessible semantic HTML (`<h1>`, `<h2>`, `<p>`, `<Link>`) inside a clean, styled Brand Authority section.
  2. All company claims match authentic business operations: Kasba Central Depot (PIN 700107), genuine OEM brands (Polycab, RR Kabel, Schneider Electric, UltraTech), and verified West Bengal licensing board credentials.
  3. Zero hidden text or deceptive anchor text across all pages.

## Threat 12: Global Cleartext MITM & Android 12+ App Link Verification Hijack
- **Attack Vector**: 1) Setting `android:usesCleartextTraffic="true"` globally in `AndroidManifest.xml` permits unencrypted HTTP requests in production WebView/network layers, exposing session/payment flows on hostile public Wi-Fi; 2) Mixing legacy unverified domains (`girirajpower.in`) into the same `<intent-filter android:autoVerify="true">` as `smartrun.in` causes Android 12+ Digital Asset Links verification to fail for the entire filter, allowing malicious apps or browsers to intercept `https://www.smartrun.in` links.
- **Defense**:
  1. Created `android/app/src/main/res/xml/network_security_config.xml` enforcing `cleartextTrafficPermitted="false"` globally while allowing localhost/emulator dev hosts (`localhost`, `127.0.0.1`, `10.0.2.2`). Set `cleartext: false` in Capacitor configs.
  2. Isolated `smartrun.in` and `www.smartrun.in` in their own `<intent-filter android:autoVerify="true">` block and separated legacy `girirajpower.in` hosts into a non-`autoVerify` filter.
  3. Added lifecycle guards (`isFinishing() || isDestroyed()`) around `MainActivity.java` `webView.post()` UI evaluation to prevent async crashes.

## Threat 13: SSR Body Shell & JSON-LD Script Tag Breakout XSS
- **Attack Vector**: Injecting `</script><script>alert(1)</script>` or HTML event handlers (`<img onerror=...>`) into dynamic catalog product names, brands, descriptions, or technician profiles breaks out of the SSR `<script id="server-prerender-schema">` or `<main id="ssr-seo-shell">` container during server-side rendering.
- **Defense**:
  1. `injectSeoMetadata` serializes JSON-LD via `JSON.stringify(...).replace(/</g, '\\u003c')`, neutralizing closing `</script>` sequences inside JSON blocks.
  2. `renderSsrBodyShell` passes all product, brand, category, description, and technician fields through `escapeHtml()` before interpolating inside `<main id="ssr-seo-shell">`.
  3. Automated regression check in `src/utils/seoHelper.test.ts` fuzzes `</script><script>alert(1)</script>` payloads.

## Threat 14: AI Retrieval Bot Over-Access to Authenticated / Cart / Payment Endpoints
- **Attack Vector**: Permitting `OAI-SearchBot`, `GPTBot`, `PerplexityBot`, or `ClaudeBot` to index private user routes (`/cart`, `/orders`, `/profile`, `/live-order`, `/api/auth/*`, `/api/orders/*`) could expose user session entrypoints or pollute AI citations with login-wall artifacts.
- **Defense**:
  1. `public/robots.txt` explicitly scopes `Allow:` rules to public storefront, GEO hub, and feed routes (`/electrical`, `/construction`, `/technicians`, `/app`, `/delivery-areas`, `/contact`, `/about`, `/faqs`, `/llms.txt`) while enforcing `Disallow:` on `/login`, `/cart`, `/profile`, `/orders`, `/live-order`, `/personal-info`, `/delete`, `/account-deletion`, and `/api/auth/`, `/api/orders/`, `/api/user-profile` across every AI and search user-agent block.
  2. SSR micro-prerender whitelists exclusively public crawlable routes in `server.ts`.

