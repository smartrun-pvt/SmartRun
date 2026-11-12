# API_CONTRACTS.md (Strict Schema Lock)

## 1. POST `/api/auth/send-welcome-email`
- **Request Payload**:
  ```json
  {
    "email": "user@example.com",
    "name": "Customer Name",
    "userId": "uuid-or-phone",
    "isNewAccount": true,
    "force": false
  }
  ```
- **Response**:
  - `200 OK`: `{"success": true, "message": "Welcome email successfully dispatched."}`
  - `200 OK`: `{"success": true, "message": "Welcome email skipped: user already has an established account.", "alreadySent": true}`
- **Sender**: `SmartRun <welcome@smartrun.in>`

## 2. POST `/api/auth/login-notification`
- **Request Payload**:
  ```json
  {
    "email": "user@example.com",
    "name": "Customer Name",
    "userId": "uuid-or-phone",
    "phone": "8777400280",
    "loginMethod": "Phone Number & OTP",
    "isNewAccount": false
  }
  ```
- **Response**:
  - `200 OK`: `{"success": true, "message": "Security login notification successfully dispatched."}`
- **Sender**: `SmartRun Security <alert@smartrun.in>`

## 3. POST `/api/send-email` (Order Delivered & Tax Invoice PDF)
- **Request Payload**:
  ```json
  {
    "type": "order_delivered",
    "to": "customer@example.com",
    "customerName": "Customer Name",
    "order": { "id": "DE7A0E6C", "status": "delivered", "totalAmount": 1450 }
  }
  ```
- **Response**:
  - `200 OK`: `{"success": true, "message": "Email sent successfully"}`
- **Sender**: `SmartRun Orders <order@smartrun.in>`
- **Attachment**: `SmartRun-Invoice-DE7A0E6C.pdf`

## 4. POST `/api/auth/logout`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{"success": true, "message": "Logged out successfully"}`
- **Cookies**: Clears `smartrun_session` httpOnly cookie.

## 5. GET `/api/version` & `/version.json`
- **Response**:
  ```json
  {
    "success": true,
    "version": "1.1.3",
    "versionCode": 14,
    "buildId": "v1.1.3-14",
    "builtAt": "2026-10-23T18:41:00.000Z",
    "serverStartedAt": "...",
    "environment": "development|production",
    "timestamp": 1792780860000
  }
  ```

## 6. GET `/healthz`, `/api/health`, `/api/healthz`
- **Response**:
  ```json
  {
    "status": "ok",
    "app": "SmartRun Kolkata Express",
    "uptime": 12.345,
    "timestamp": 1794354220870
  }
  ```

## 7. GET `/sitemap.xml` (Dynamic Search Engine XML Sitemap)
- **Response**: `200 OK`
- **Content-Type**: `application/xml; charset=utf-8`
- **Cache-Control**: `public, max-age=3600`
- **Payload**: Dynamically generated XML containing all static hubs, policy routes, certified technician profile URLs (`/technicians/:id`), and 50+ individual catalog products with `<image:image>` tags and automated daily `lastmod` timestamps. Disallowed private URLs (`/login`, `/account-deletion`, `/personal-info`) are strictly omitted.

## 8. GET SSR Micro-Prerender Routes (Direct Crawler / Browser Hit)
- **Routes Covered**:
  - `/` (Homepage: LocalBusiness + WebSite schemas + BreadcrumbList)
  - `/electrical` & `/construction` (Marketplace category hubs: CollectionPage + OfferCatalog + BreadcrumbList)
  - `/technicians` & `/technicians/:id` (Directory & Individual profiles: Person + ProfessionalService + hasCredential + BreadcrumbList)
  - `/electrical/product/:id` & `/construction/product/:id` (Product detail pages: Product + Offer + MerchantReturnPolicy + OfferShippingDetails + BreadcrumbList)
  - `/how-to-use` (HowTo schema with 5 ordered steps + BreadcrumbList)
  - `/about` (AboutPage linked to Organization + BreadcrumbList)
  - `/faqs` (FAQPage with verified questions & answers + BreadcrumbList)
  - `/shipping` & `/shipping-policy` (WebPage + OfferShippingDetails + BreadcrumbList)
  - `/return` & `/return-policy` (WebPage + MerchantReturnPolicy + BreadcrumbList)
  - `/refund-policy` (WebPage + MerchantReturnPolicy + BreadcrumbList)
  - `/terms`, `/privacy`, `/sitemap` (WebPage / CollectionPage + BreadcrumbList)
- **Response**: `200 OK`
- **Content-Type**: `text/html; charset=utf-8`
- **Cache-Control**: `no-cache, no-store, must-revalidate`
- **Payload**: Full HTML document with dynamically injected `<title>`, `<meta name="description">`, `<meta name="keywords">`, `<link rel="canonical">`, multi-aspect ratio OpenGraph preview images, and Schema.org JSON-LD `<script id="server-prerender-schema">` containing the unified `@graph`.
- **Deduplication Rule**: Upon client-side hydration, `SEOHead.tsx` removes `#server-prerender-schema` from `<head>` to maintain exactly one authoritative dynamic JSON-LD node (`#smartrun-dynamic-jsonld`) and prevent duplicate entity warnings.
- **Google Anti-Spam Compliance**: `aggregateRating` and `review` objects are generated strictly when verified ratings/reviews exist; hardcoded fallback dummy ratings are prohibited.

## 9. GET `/rss.xml`, `/feed.xml` (RSS 2.0 Product & News Syndication Feed)
- **Response**: `200 OK`
- **Content-Type**: `application/xml; charset=utf-8`
- **Cache-Control**: `public, max-age=3600, s-maxage=7200`
- **Payload**: Standard RSS 2.0 XML containing channel information (`SmartRun (Smart Run) - Kolkata Express Electrical & Construction Supplies Feed`), `<atom:link>`, and `<item>` entries with canonical followed permalinks for all active catalog products.

