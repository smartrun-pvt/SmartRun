# SmartRun — Backlink Architecture, Geo-Targeting & Play Store ASO Dominance Master

> **Official Web Domain**: `https://www.smartrun.in`  
> **Official Android Package**: `in.smartrun.app`  
> **Google Play Store URL**: `https://play.google.com/store/apps/details?id=in.smartrun.app`  
> **Registered Entity**: `SmartRun materials pvt. ltd`  
> **Central Depot Hub**: `Kasba Industrial Estate, Kolkata 700107 / Kheyadah Village, Kolkata 700150`  
> **Official Support Helpline**: `+91 8777400280` | `team@smartrun.in`  

---

## 1. Technical In-App & Cross-Platform Backlink Architecture

### A. Digital Asset Links (Google App Indexing 2-Way Cryptographic Backlink)
- **File Location**: `https://www.smartrun.in/.well-known/assetlinks.json`
- **Function**: Verifies to Google Search and Google Play Store algorithms that `https://www.smartrun.in` and `in.smartrun.app` are the same authoritative entity. When Googlebot indexes web products, it automatically ranks the Android application in mobile search results and Play Store app packs.
- **Verification Rule**: Served with `Content-Type: application/json` and `Access-Control-Allow-Origin: *` via `server.ts`.

### B. App Indexing Alternate Deep Links
Every web route and product page dynamically serves App Indexing deep-link backlinks:
```html
<link rel="alternate" href="android-app://in.smartrun.app/smartrun/electrical/product/p1" />
<link rel="canonical" href="https://www.smartrun.in/electrical/product/p1" />
<link rel="author" href="https://www.smartrun.in/about" />
<link rel="publisher" href="https://play.google.com/store/apps/details?id=in.smartrun.app" />
```

### C. Authoritative Cross-Entity Graph Links (`sameAs` in JSON-LD)
Schema.org structured graphs on `index.html` and dynamic product pages link search engines directly to the Play Store listing and verified profiles:
```json
{
  "@type": ["Organization", "ElectricalSupplyStore", "LocalBusiness"],
  "name": "SmartRun",
  "alternateName": ["Smart Run", "SmartRun App", "Smart Run App", "SmartRun materials pvt. ltd"],
  "url": "https://www.smartrun.in/",
  "sameAs": [
    "https://play.google.com/store/apps/details?id=in.smartrun.app",
    "https://www.smartrun.in/"
  ],
  "hasMap": "https://maps.google.com/?q=22.5145,88.3882"
}
```

---

## 2. High-DA External Backlink & Citation Strategy (NAP Consistency)

For Google to rank SmartRun #1 for "Smart Run", "kolkata online delivery app for electrical products", and "buy Polycab wire in Kolkata", strict **NAP consistency (Name, Address, Phone)** across high Domain Authority (DA 80+) business directories is essential.

### Exact Directory Citation Profile (Copy-Paste Ready)
| Directory / Platform | Target URL / Backlink | Anchor Text | Category |
|---|---|---|---|
| **Google Business Profile (GBP)** | `https://www.smartrun.in` | SmartRun (Smart Run) - Kolkata Express Electricals | Electrical Supply Store / Contractor |
| **IndiaMART** | `https://www.smartrun.in/electrical` | Buy Electrical Goods Online Kolkata | Wholesale Electrical Equipment |
| **Justdial Kolkata** | `https://www.smartrun.in` | SmartRun Electricals & Building Materials | Electrical Shops, Cable Dealers |
| **TradeIndia** | `https://www.smartrun.in/construction` | UltraTech Cement & Tata TMT Steel Kolkata | Building Material Suppliers |
| **Sulekha Kolkata** | `https://www.smartrun.in/technicians` | Licensed Electricians & House Wiring Kolkata | Electrical Contractors & Electricians |
| **LinkedIn Company** | `https://www.smartrun.in` | SmartRun materials pvt. ltd | Quick Commerce & Construction Supplies |
| **Crunchbase** | `https://www.smartrun.in` | SmartRun Quick Commerce | E-Commerce, Logistics & Supply Chain |
| **GitHub Organization** | `https://www.smartrun.in` | SmartRun Open Source / App Links | Developer / Platform |

### Official Business Citation Details
- **Company Name**: `SmartRun materials pvt. ltd` (Brand: `SmartRun` / `Smart Run`)
- **Primary Business Category**: `Electrical Supply Store`, `Building Materials Store`, `Electrician`
- **Street Address**: `Kasba Industrial Estate Phase 1 / Kheyadah Village, Bhagabanpur`
- **City / Locality**: `Kolkata`
- **State / Region**: `West Bengal (IN-WB)`
- **Postal Pincode**: `700107` / `700150`
- **Country**: `India (IN)`
- **Phone**: `+91 8777400280`
- **Primary Website**: `https://www.smartrun.in`
- **Play Store App**: `https://play.google.com/store/apps/details?id=in.smartrun.app`

---

## 3. Google Play Store ASO Dominance Master (Ranking #1 on "Smart Run")

### A. App Name & Title Formula (30 Characters Max)
```text
SmartRun (Smart Run): Supplies
```
*Why this ranks #1*: Contains both `SmartRun` (unspaced) and `Smart Run` (spaced) as the very first words of the title. Google Play assigns the highest algorithmic search weight to the first 15 characters of the App Title.

### B. Short Description (80 Characters Max)
```text
Smart Run (SmartRun): 60-min express electricals, wires, switches & electricians
```
*Why this ranks #1*: Matches user natural language search for "Smart Run", "express electricals", "wires", "switches", and "electricians".

### C. Play Store Search Query Dominance Matrix
| User Search Query in Play Store | Exact In-App Match / Deep Link | Target Play Store Keyword Rank |
|---|---|---|
| **"smart run"** | `smartrun://home` | **Rank #1** |
| **"smartrun"** | `smartrun://home` | **Rank #1** |
| **"smart run app"** | `smartrun://home` | **Rank #1** |
| **"kolkata online delivery app for electrical products"** | `smartrun://electrical` | **Rank #1** |
| **"kolkata online delivery app for construction products"** | `smartrun://construction` | **Rank #1** |
| **"polycab wire online kolkata"** | `smartrun://electrical/product/p1` | **Rank #1** |
| **"schneider mcb switchboard"** | `smartrun://electrical` | **Rank #1** |
| **"ultratech cement delivery kolkata"** | `smartrun://construction` | **Rank #1** |
| **"licensed electrician near me kolkata"** | `smartrun://technicians` | **Rank #1** |

### D. Android Native Package Tokenization (`strings.xml`)
- `app_name`: `SmartRun (Smart Run)`
- `title_activity_main`: `SmartRun (Smart Run)`
- On-device Google Assistant, Gemini on Android, and Samsung Finder / Pixel Launcher immediately match "Smart Run" or "SmartRun".

---

## 4. Product Name Keyword Dominance Checklist

| Product Search Query | Pre-rendered SSR Title Tag | Targeted Google Rank |
|---|---|---|
| "RR Kabel Wire FR LS 0.75 Sqmm price Kolkata" | `RR Kabel Wire FR LS 0.75 Sqmm, 200 MTR - Buy Online in Kolkata \| SmartRun (Smart Run)` | #1 Rich Snippet |
| "Polycab 2.5 sq mm copper wire 60 min delivery" | `Polycab 2.5 Sqmm FR Copper Wire - Buy Online in Kolkata \| SmartRun (Smart Run)` | #1 Product Carousel |
| "Schneider Acti9 32A DP MCB online Kolkata" | `Schneider Acti9 32A Double Pole MCB - Buy Online in Kolkata \| SmartRun (Smart Run)` | #1 Shopping Card |
| "UltraTech Super Cement 50kg bag site delivery" | `UltraTech Super Cement 50kg Bag - Buy Online in Kolkata \| SmartRun (Smart Run)` | #1 Local Pack |
| "Tata Tiscon 550D 12mm TMT rebar price Kolkata" | `Tata Tiscon 550D TMT Steel Rebars - Buy Online in Kolkata \| SmartRun (Smart Run)` | #1 Merchant Card |
| "Emergency electrician Kasba Kolkata 60 mins" | `Licensed Electricians & Wiring Contractors Kolkata \| SmartRun (Smart Run)` | #1 Map Pack |

---

## 5. Review & Rating Velocity Engine (Conversion Signal)
Google Play Store and Google Local algorithm heavily weight **Rating Velocity & Keyword-Rich Reviews**:
- After every completed delivery, the in-app dual review system (`/api/orders/:id/rider-review` and `/api/orders/:id/product-review`) prompts customers for quick feedback.
- Prompt users to mention "Smart Run", "express delivery", and "genuine wires" in their Google Play Store reviews to supercharge algorithmic keyword relevance.
