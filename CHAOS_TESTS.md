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

