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
- **Payload**: Dynamically generated XML containing canonical static hubs (`/`, `/electrical`, `/construction`, `/technicians`, `/app`, `/delivery-areas`, `/contact`, `/about`, `/faqs`, `/how-to-use`, `/sitemap`), policy routes (`/shipping`, `/return`, `/refund-policy`, `/privacy`, `/terms`), certified technician profile URLs (`/technicians/:id`), and catalog products with `<image:image>` tags. Duplicate route aliases (`/about-us`, `/shipping-policy`, `/return-policy`) and disallowed private URLs (`/login`, `/account-deletion`, `/personal-info`) are strictly omitted.

## 8. GET SSR Micro-Prerender Routes (Direct Crawler / Browser Hit)
- **Routes Covered**:
  - `/` (Homepage: LocalBusiness/#store + Kasba Dispatch Depot/#depot-kasba + WebSite + MobileApplication/#android-app + BreadcrumbList, zero unverified `aggregateRating`)
  - `/electrical` & `/construction` (Marketplace category hubs: CollectionPage + OfferCatalog + BreadcrumbList)
  - `/technicians` & `/technicians/:id` (Directory & Individual profiles: Person + ProfessionalService + hasCredential + BreadcrumbList)
  - `/electrical/product/:id` & `/construction/product/:id` (Product detail pages: Product + Offer + MerchantReturnPolicy + OfferShippingDetails + BreadcrumbList)
  - `/app` & alias `/download` (MobileApplication + SoftwareApplication schema linked to `#store`)
  - `/delivery-areas` & alias `/service-areas` (WebPage + Service covering Kolkata `700001–700160` & Howrah `711101–711106`)
  - `/contact`, `/contact-us`, `/support` (ContactPage linked to `#store`)
  - `/how-to-use` (HowTo schema with 5 ordered steps + BreadcrumbList)
  - `/about` & alias `/about-us` (AboutPage linked to `#store` + BreadcrumbList)
  - `/faqs` & alias `/faq` (FAQPage synced to all 23 `ENRICHED_FAQ_LIST` entries + BreadcrumbList)
  - `/shipping`, `/return`, `/refund-policy`, `/terms`, `/privacy`, `/sitemap` (normalized canonicals via `CANONICAL_ALIAS_MAP`)
- **Response**: `200 OK`
- **Content-Type**: `text/html; charset=utf-8`
- **Cache-Control**: `no-cache, no-store, must-revalidate`
- **Payload**: Full HTML document with canonicalized `<link rel="canonical">`, XSS-safe `<script id="server-prerender-schema">` (`\u003c` escaped), and semantic `<main id="ssr-seo-shell" data-ssr-geo="true">` inside `<div id="root">` containing `<h1>`, entity facts, and crawlable `<a href>` links for zero-JS AI/search retrieval engines.
- **Deduplication Rule**: Upon client-side hydration, React `createRoot` replaces `#root` children cleanly and `SEOHead.tsx` removes `#server-prerender-schema` from `<head>` to maintain one authoritative JSON-LD node (`#smartrun-dynamic-jsonld`).
- **Content Negotiation (`Accept: text/markdown`)**: All SSR prerender routes emit `Vary: Accept` and `Link: </.well-known/ard.json>; rel="ard"; type="application/json", </llms.txt>; rel="alternate"; type="text/markdown"`. When the request `Accept` header includes `text/markdown` (without `text/html`), the server responds `200 OK` with `Content-Type: text/markdown; charset=utf-8` generated by `renderMarkdownRepresentation()`.
- **Google Anti-Spam Compliance**: `aggregateRating` and `review` objects are generated strictly when verified ratings/reviews exist; hardcoded fallback dummy ratings (`4.8`/`18`, `4.9`) are prohibited.

## 9. GET `/rss.xml`, `/feed.xml` (RSS 2.0 Product & News Syndication Feed)
- **Response**: `200 OK`
- **Content-Type**: `application/xml; charset=utf-8`
- **Cache-Control**: `public, max-age=3600, s-maxage=7200`
- **Payload**: Standard RSS 2.0 XML containing channel information (`SmartRun (Smart Run) - Kolkata Express Electrical & Construction Supplies Feed`), `<atom:link>`, and `<item>` entries with canonical followed permalinks for all active catalog products.

## 10. GET `/api/ai/openapi.json` (AI Discovery & Agent OpenAPI 3.1.0 Spec)
- **Response**: `200 OK`
- **Content-Type**: `application/json; charset=utf-8`
- **Cache-Control**: `public, max-age=3600`
- **Payload**: Valid OpenAPI 3.1.0 JSON matching `/.well-known/ai-plugin.json` and `/.well-known/ai-agent-manifest.json`, describing public read-only catalog search (`/api/products`), health (`/healthz`), and sitemap (`/sitemap.xml`) endpoints.

## 11. GET `/llms.txt` (AI Search Engine Plaintext Entity Summary)
- **Response**: `200 OK`
- **Content-Type**: `text/plain; charset=utf-8`
- **Headers**: `Access-Control-Allow-Origin: *`, `Link: </.well-known/ard.json>; rel="ard"; type="application/json"`, `Cache-Control: public, max-age=86400`
- **Payload**: Machine-readable Markdown summary of SmartRUN (`SmartRun Materials Pvt. Ltd.`), verified Kolkata/Howrah PIN coverage, Kasba Dispatch Depot vs Bhagabanpur Registered Office distinction, OEM brands, Play Store package (`in.smartrun.app`), and public discovery feeds (`/sitemap.xml`, `/rss.xml`, `/api/feeds/google-merchant.xml`).

## 12. GET `/.well-known/ard.json` (Agentic Resource Discovery Manifest)
- **Response**: `200 OK`
- **Content-Type**: `application/json; charset=utf-8`
- **Headers**: `Access-Control-Allow-Origin: *`, `Cache-Control: public, max-age=3600`
- **Payload**: Structured ARD discovery index pointing agents to `llms.txt`, `/api/products`, `/api/ai/openapi.json`, `/.well-known/ai-agent-manifest.json`, `/sitemap.xml`, `/rss.xml`, `/api/feeds/google-merchant.xml`, Markdown content-negotiation routes, and WebMCP read-only tool capabilities (`search_smartrun_products`, `get_smartrun_product_details`, `check_kolkata_pincode_delivery`, `list_kolkata_electricians`).
