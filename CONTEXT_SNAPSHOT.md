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
- **Phase 1 UI**: Storefront (Electrical & Construction), Live GPS Tracking Map, Order History, Product Detail, Cart, Refund, Account Deletion, Edit Profile.
- **Phase 2 Integrations**: Dedicated email subdomains, Instant sign-out, Android R8 missing rules fix, Zero-gap Android status bar separation, Full-screen camera cutout & notch safe-area protection, Release 15 (1.1.4), Separated Shipping Policy (`/shipping`) & Return Policy (`/return`) routes, Edge-to-Edge compliance, Login threat hardening, Comprehensive SEO & Geo-Targeting Optimization, and Android Gradle AAR Metadata Resolution (`compileSdkVersion = 36`, `targetSdkVersion = 35`, and normalized `androidx.browser:browser:1.8.0`).

## Immediate Next Build Step
- Generate signed Android App Bundle (AAB/APK) for Release 15 (1.1.4) in Android Studio without AAR metadata compileSdk conflicts.




