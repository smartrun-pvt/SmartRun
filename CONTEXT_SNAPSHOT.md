# CONTEXT_SNAPSHOT.md (Multi-AI Handoff Brain)

## Current Tech Stack & Core Runtime
- **Frontend**: React 19 SPA, Vite 6, Tailwind CSS 4, React Router 7, TypeScript 5.8
- **Mobile Runtime**: Capacitor 8 Native Android App (`in.smartrun.app`), Gradle 8, Android SDK 35 (Android 15 Production)
- **Backend**: Express 4 Node.js server (`server.ts`), tsx dev server, Cloud Run production container (`0.0.0.0:8080`)
- **Database & Auth**: Supabase PostgreSQL + Firebase Firestore + Fast2SMS OTP Gateway + Resend Email Gateway

## Directory Tree Overview
- `/src`: App entry (`App.tsx`), UI components (`/components`), services (`/services`), utils (`/utils`), types (`types.ts`)
- `/android`: Capacitor Android native project (`/android/app/build.gradle`, `/android/app/proguard-rules.pro`, `/android/app/missing_rules.txt`, `/android/app/src/main/assets/public`)
- `server.ts`: Cloud Run backend API, Resend email dispatcher, Razorpay payments, SMS OTP, delivery & order tracking
- `Dockerfile`: Multi-stage Cloud Run production container build

## Completed UI & Backend Phases
- **Phase 1 UI**: Storefront (Electrical & Construction), Live GPS Tracking Map, Order History, Product Detail, Cart, Refund, Account Deletion, Edit Profile.
- **Phase 2 Integrations**: Dedicated email subdomains (`welcome@smartrun.in`, `alert@smartrun.in`, `order@smartrun.in`), Instant sign-out with total client cache purge, Android R8 missing rules fix, Zero-gap Android status bar separation, Full-screen camera cutout & notch safe-area protection, Upgraded release version to **15 (1.1.4)** across Android Gradle and backend metadata, Live auto-location GPS fetch, Separated individual Shipping Policy (`/shipping`) and Return Policy (`/return`) buttons, eliminated Home Header on policy routes, created standalone policy top navbars with 3-dot mobile overflow menus (`MoreVertical`), left-edge swipe gesture support, Cloud Run readiness probe `/healthz`, minimalist white background footer, synchronized fresh Capacitor assets in `android/app/src/main/assets/public`, full Android 15 Google Play Edge-to-Edge compliance using `EdgeToEdge.enable(this)` with zero deprecated APIs, and Comprehensive Login Threat Hardening (eradication of test OTP backdoors, `loginRateLimiter`, 15-min account lockout on 5 consecutive failures, anti-timing jitter, `accountLookupLimiter` with PII masking, disposable email domain blocking, and updated Privacy Policy Section 4 & Terms Section 10).

## Immediate Next Build Step
- Generate signed Android App Bundle (AAB/APK) for Release 15 (1.1.4) and upload to Google Play Console.




