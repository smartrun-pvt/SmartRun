# CONTEXT_SNAPSHOT.md (Multi-AI Handoff Brain)

## Current Tech Stack & Core Runtime
- **Frontend**: React 19 SPA, Vite 6, Tailwind CSS 4, React Router 7, TypeScript 5.8
- **Mobile Runtime**: Capacitor 8 Native Android App (`in.smartrun.app`), Gradle 8, Android SDK 35 (Android 15 Production Target, CompileSdk 36)
- **Backend**: Express 4 Node.js server (`server.ts`), tsx dev server, Cloud Run production container (`0.0.0.0:8080`)
- **Database & Auth**: Supabase PostgreSQL + Firebase Firestore + Fast2SMS OTP Gateway + Resend Email Gateway

## Directory Tree Overview
- `/src`: App entry (`App.tsx`), UI components (`/components`), services (`/services`), utils (`/utils`), types (`types.ts`)
- `/android`: Capacitor Android native project (`/android/app/build.gradle`, `/android/app/proguard-rules.pro`, `/android/app/missing_rules.txt`, `/android/app/src/main/assets/public`)
- `server.ts`: Cloud Run backend API, Resend email dispatcher, Razorpay payments, SMS OTP, delivery & order tracking
- `Dockerfile`: Multi-stage Cloud Run production container build

## Completed UI & Backend Phases
- **Phase 1 UI**: Storefront (Electrical & Construction), Live GPS Tracking Map, Order History, Product Detail, Cart, Refund, Account Deletion, Universal Profile Subpages `#74c69d` Navbar Unification (64px mobile / 68px desktop height, regular Playfair typography), and Centered/Scrollable Edit Profile Modal Portal (`createPortal` escaping transformed DOM hierarchy, `max-h-[calc(100dvh-2rem)]`, `my-auto`, body scroll lock, and Escape dismiss).
- **Phase 3 Structured Data & Schema Architecture**: Comprehensive Google Search Central & Rich Results compliant JSON-LD `@graph` architecture across all public routes. Strict anti-hallucination guardrails (zero fake ratings or reviews: `aggregateRating` & `review` emitted strictly when verified ratings exist; omitted otherwise). Client hydration cleans up `#server-prerender-schema` avoiding duplicate/conflicting scripts. Unified structured data: `WebSite`, `LocalBusiness` / `ElectricalSupplyStore`, `Product` + `Offer` + `MerchantReturnPolicy` + `OfferShippingDetails`, `Person` + `ProfessionalService` + `EducationalOccupationalCredential`, `BreadcrumbList` across all routes, `HowTo` on `/how-to-use`, `AboutPage` on `/about`, `FAQPage` on `/faqs`, and `CollectionPage` on `/electrical`, `/construction`, `/technicians`, `/sitemap`.
- **Phase 4 Brand SEO & Keyword Dominance Architecture**: Implemented full brand entity alignment for "Smart Run", "SmartRUN", "SmartRUN India", "Smart Run India", "SmartRUN Kolkata", and "Smart Run construction delivery". Single authoritative, prominent `<h1>` established on homepage (`SmartRUN (Smart Run) — Express Electrical & Construction Materials Delivery in Kolkata`) with 4 core category pillar cards (`<h2>`), step-by-step ordering instructions, and followed crawl links. Synced `WebSite` and `Organization` / `ElectricalSupplyStore` / `HardwareStore` / `LocalBusiness` structured data across SSR (`seoHelper.ts`) and client hydration (`SEOHead.tsx`).
- **Phase 5 ASO, Web-to-App Discoverability & Android Quality Hardening**:
  - Standardized Play Store ASO copy (`PLAYSTORE_AI_SEARCH_LISTING.md`), tightened SERP `<title>` (57 chars) / `<meta description>` (143 chars), stripped unverified `aggregateRating` from `index.html`, and added `MobileApplication` (`@id: #android-app`) across SSR & CSR `@graph`.
  - Fixed GA4 tracking ID mismatch (`G-E3TVJRTKRP`), added `trackPlayStoreClick` + `trackAppError`, added Play Store CTAs in `Footer.tsx`, `InstallAppModal.tsx`, `LegalViews.tsx`, and `SitemapPage.tsx`.
  - Fixed `shareProduct.ts` construction deep link (`/construction/product/:id`), `HomePage.tsx` product card routing + category `<Link>` + electrician CTA (`/technicians`), and added `GET /api/ai/openapi.json` in `server.ts`.
  - Hardened Android discoverability & quality: targeted `network_security_config.xml` (`cleartext=false`), isolated `smartrun.in` `autoVerify="true"` filter in `AndroidManifest.xml`, concise `SmartRun` launcher label in `strings.xml`, lifecycle guards in `MainActivity.java`.

## Immediate Next Build Step
- Add `android/app/google-services.json` from Firebase Console, verify release keystore SHA-256 in `.well-known/assetlinks.json`, upload updated ASO copy to Play Console, and monitor Search Console & Play Acquisition KPIs.

