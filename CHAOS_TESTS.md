# CHAOS_TESTS.md (Edge-Case & cURL Test Suite)

## 1. Test Existing Account Welcome Email Rejection
```bash
curl -X POST http://localhost:3000/api/auth/send-welcome-email \
  -H "Content-Type: application/json" \
  -d '{"email":"gauravgiri123344@gmail.com","name":"Gaurav Giri","isNewAccount":false}'
# Expectation: 200 OK with {"success":true,"message":"Welcome email skipped: user already has an established account.","alreadySent":true}
```

## 2. Test Dedicated Email Senders Dispatch
```bash
# Test Order Confirmation Email (Sender: order@smartrun.in)
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"type":"order_confirmation","to":"test@example.com","customerName":"Ramesh Kumar","order":{"id":"DE7A0E6C","status":"confirmed","totalAmount":1500,"address":"Kasba","area":"South Kolkata","pincode":"700042"}}'

# Test Security Login Notification (Sender: alert@smartrun.in)
curl -X POST http://localhost:3000/api/auth/login-notification \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Ramesh Kumar","phone":"9876543210","loginMethod":"Email & Password","isNewAccount":false}'
```

## 3. Test Server-Authoritative Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Content-Type: application/json"
# Expectation: 200 OK with {"success":true,"message":"Logged out successfully"} and Set-Cookie clearing smartrun_session
```

## 4. Test Cloud Run / Container Readiness Probe
```bash
curl -I http://localhost:3000/healthz
# Expectation: HTTP/1.1 200 OK with {"status":"ok","app":"SmartRun Kolkata Express"}
```

## 5. Test Dynamic XML Sitemap Generation with Images
```bash
curl -s http://localhost:3000/sitemap.xml | head -n 45
# Expectation: Valid XML starting with <?xml version="1.0" encoding="UTF-8"?>
# Contains all static routes, 50+ catalog products, <image:image> tags, and today's date in <lastmod>
```

## 6. Test Product SSR Micro-Prerender (Direct Crawler Hit)
```bash
curl -s http://localhost:3000/electrical/product/05e97d96-5942-4e67-a5e6-5907426f0767 | grep -C 3 "<title>"
# Expectation: Immediate HTTP 200 with exact product name, brand, Kolkata price, and Kasba Central Depot Schema.org Product JSON-LD in <head>
```

## 7. Test Certified Technician SSR Micro-Prerender & Schema
```bash
curl -s http://localhost:3000/technicians/tech-001 | grep -C 3 "<title>"
# Expectation: Immediate HTTP 200 with "Er. Rajesh Mukherjee" in title, ProfessionalService + Person JSON-LD, and service area Kolkata
```

## 8. Test Static Sitemap & Disallow Integrity
```bash
# Verify technician profiles present and disallowed private pages absent
curl -s http://localhost:3000/sitemap.xml | grep -E "tech-001|account-deletion|login"
# Expectation: tech-001 is present; account-deletion and login are NOT present
```

## 9. Test Robots.txt Disallow Directives
```bash
curl -s http://localhost:3000/robots.txt | grep -E "Disallow: /delete|Disallow: /account-deletion|Disallow: /personal-info"
# Expectation: All sensitive routes disallowed under both Googlebot/AhrefsBot blocks and User-agent: *
```

## 10. Test Schema.org @graph on Product Detail Route
```bash
curl -s http://localhost:3000/electrical/product/p1 | grep -o '{"@type":"Product"[^}]*}'
# Expectation: Valid Product JSON-LD with SKU, price: 3065, Kolkata areaServed, and BreadcrumbList in @graph
```

## 11. Test HowTo & AboutPage Schema Injection
```bash
# Verify HowTo steps on guide route
curl -s http://localhost:3000/how-to-use | grep -o '"@type":"HowTo"'

# Verify AboutPage on about route
curl -s http://localhost:3000/about | grep -o '"@type":"AboutPage"'
```

## 12. Test Homepage WebSite & Organization Brand Entity Graph
```bash
# Verify WebSite search action and Organization with Smart Run alternate names and Kasba depot address
curl -s http://localhost:3000/ | grep -E '"@type":"WebSite"|"@type":\["Organization"|"Smart Run"|SmartRUN Kolkata'
# Expectation: Immediate HTTP 200 with WebSite potentialAction, Organization logo, phone, sameAs, and Kolkata areas
```

## 13. Test Single Authoritative H1 Heading on Homepage
```bash
# Verify exactly one H1 tag exists on Homepage pointing to brand identity
curl -s http://localhost:3000/ | grep -o '<h1[^>]*>' | wc -l
# Expectation: Exactly 1 H1 element rendered, matching "SmartRUN (Smart Run) — Express Electrical & Construction Materials Delivery in Kolkata"
```

## 14. Test OpenAPI 3.1.0 AI Discovery Endpoint
```bash
curl -s http://localhost:3000/api/ai/openapi.json | head -n 20
# Expectation: 200 OK JSON with "openapi":"3.1.0" and paths "/api/products", "/healthz"
```

## 15. Test Homepage MobileApplication Schema & Zero Fake AggregateRating
```bash
curl -s http://localhost:3000/ | grep -E '"MobileApplication"|"aggregateRating"'
# Expectation: "MobileApplication" is present; "aggregateRating" is NOT present on unrated homepage entities
```

## 16. Test Robots.txt Disallows Private Auth Routes
```bash
curl -s http://localhost:3000/robots.txt | grep -E "Disallow: /login"
# Expectation: Disallow: /login present under both priority crawlers and wildcard User-agent
```

## 17. Test `/llms.txt` & AI Bot Directives in `robots.txt`
```bash
curl -s http://localhost:3000/llms.txt | head -n 20
curl -s http://localhost:3000/robots.txt | grep -E "OAI-SearchBot|PerplexityBot|Google-Extended|ClaudeBot"
# Expectation: 200 OK text/plain at /llms.txt; explicit Allow/Disallow rules for AI crawlers
```

## 18. Test SSR Semantic Body Shell & Zero-JS Crawler Extraction
```bash
for route in "/" "/electrical" "/construction" "/app" "/delivery-areas" "/contact" "/about" "/faqs"; do
  echo "=== $route ==="
  curl -s "http://localhost:3000${route}" | grep -oE '<title>.*</title>|id="ssr-seo-shell"|<h1>.*</h1>'
done
# Expectation: Every route returns status 200 with a distinct title, main#ssr-seo-shell, and visible H1 in raw HTML
```

## 19. Test Canonical Normalization & Sitemap Alias Deduplication
```bash
curl -s http://localhost:3000/about-us | grep 'rel="canonical"'
curl -s http://localhost:3000/sitemap.xml | grep -E "/about-us|/shipping-policy|/return-policy|/delivery-areas|/app|/contact"
# Expectation: /about-us canonical points to https://www.smartrun.in/about; sitemap includes /app, /delivery-areas, /contact and excludes duplicate alias paths
```

## 20. Test Full FAQ JSON-LD Parity
```bash
curl -s http://localhost:3000/faqs | grep -o '"@type":"Question"' | wc -l
# Expectation: Matches ENRICHED_FAQ_LIST.length (23 Question entries)
```

## 21. Test Agentic Resource Discovery (`/.well-known/ard.json`) & `robots.txt` Agentmap
```bash
curl -sI http://localhost:3000/.well-known/ard.json
curl -s http://localhost:3000/robots.txt | grep -E "ard\.json|Agentmap"
# Expectation: 200 OK application/json with CORS *, valid resources & webmcp entries; robots.txt allows and references ard.json
```

## 22. Test `Accept: text/markdown` Content Negotiation & `Vary: Accept` Header
```bash
curl -s -D - -H "Accept: text/markdown" http://localhost:3000/electrical/product/p1 | head -n 25
curl -s -D - -H "Accept: text/html" http://localhost:3000/ | grep -iE "^(link|vary):"
# Expectation: text/markdown request returns 200 text/markdown; charset=utf-8 with Vary: Accept and Link: </.well-known/ard.json>; rel="ard"
```

## 23. Test Zero Blocking Launch Modal & Zero Supabase/Imgur Console Errors
```bash
# Run headless browser on http://localhost:3000/ without granted geolocation:
# Expectation: #device-location-prompt-sheet is NOT rendered on initial load, 0 console errors, 0 HTTP 400/403 errors
```
