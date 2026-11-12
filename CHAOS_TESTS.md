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


