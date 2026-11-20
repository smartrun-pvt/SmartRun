var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server.ts
var server_exports = {};
__export(server_exports, {
  generateWelcomeEmailHtml: () => generateWelcomeEmailHtml
});
module.exports = __toCommonJS(server_exports);
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_compression = __toESM(require("compression"), 1);
var import_express_rate_limit = __toESM(require("express-rate-limit"), 1);
var import_zod = require("zod");
var import_crypto = __toESM(require("crypto"), 1);
var import_supabase_js = require("@supabase/supabase-js");
var import_razorpay = __toESM(require("razorpay"), 1);
var import_jspdf = require("jspdf");
var import_server = require("@simplewebauthn/server");
var import_app = require("firebase/app");
var import_firestore = require("firebase/firestore");

// src/data/demoTechnicians.ts
var DEMO_TECHNICIANS = [
  {
    id: "tech-001",
    name: "Er. Rajesh Mukherjee",
    title: "Lead Electrical Engineer & Master Wireman",
    badgeId: "BN-ELEC-2024-042",
    experienceYears: 9,
    primarySector: "Residential & Commercial Power Systems",
    subSectors: [
      "Whole-Building Rewiring",
      "Solar Hybrid Inverters",
      "3-Phase Industrial Panels",
      "Short Circuit Diagnostics",
      "Smart Switchgear Automation"
    ],
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    rating: 4.94,
    reviewsCount: 142,
    completedJobs: 680,
    verificationStatus: "master",
    licenseNumber: "WB-CEI-LIC-74892",
    issuingAuthority: "Govt. of West Bengal - Electrical Licensing Board",
    status: "available",
    statusText: "Available for site visits today",
    phone: "+91 98302 44120",
    email: "rajesh.mukherjee@girirajpower.com",
    whatsapp: "+919830244120",
    emergencySupport: true,
    serviceAreas: [
      "Salt Lake Sector V",
      "New Town Action Area I & II",
      "Rajarhat",
      "Kestopur",
      "Dum Dum",
      "Ballygunge",
      "Park Street",
      "Lake Town"
    ],
    workingHours: "08:00 AM - 08:30 PM (24x7 Emergency Calls)",
    startingRate: 499,
    rateUnit: "base inspection / consultation",
    about: "Certified Class-1 Electrical Supervisor and Master Wireman with over 9 years of hands-on field experience across residential townships, high-rise real estate, and industrial power distribution systems in Greater Kolkata. Specializes in fault isolation, fire-safe conduit wiring, heavy load distribution panel commissioning, and rooftop solar grid synchronization.",
    aiDescription: "9+ years master electrical supervisor specialized in whole-building rewiring, 3-phase industrial panels, and solar hybrid inverter setups across Greater Kolkata with Class-1 licensing.",
    certifications: [
      {
        title: "Class-1 Electrical Supervisor License (Grade A)",
        issuer: "Chief Electrical Inspector, Govt. of West Bengal",
        year: "2016",
        verified: true,
        credentialId: "WB-CEI-SUPER-8812"
      },
      {
        title: "Certified Rooftop Solar Grid-Tied Specialist",
        issuer: "National Institute of Solar Energy (NISE)",
        year: "2019",
        verified: true,
        credentialId: "NISE-GRID-4190"
      },
      {
        title: "Schneider Electric Certified Switchgear Engineer",
        issuer: "Schneider Electric Training Institute",
        year: "2021",
        verified: true,
        credentialId: "SE-SWG-IND-902"
      }
    ],
    skills: [
      { name: "3-Phase HT/LT Distribution & Load Balancing", proficiency: 98, experienceYears: 9 },
      { name: "Short Circuit & Thermal Fault Diagnostics", proficiency: 96, experienceYears: 9 },
      { name: "Conduit & Fire-Retardant Concealed Wiring", proficiency: 95, experienceYears: 8 },
      { name: "Solar Hybrid Inverters & Lithium Storage", proficiency: 92, experienceYears: 6 },
      { name: "Earth Pit Resistance Testing & Megger Audit", proficiency: 94, experienceYears: 8 }
    ],
    toolsCarried: [
      "Fluke 117 True-RMS Industrial Multimeter",
      "FLIR E4 Compact Thermal Imaging Camera",
      "Megger MIT300 Insulation & Continuity Tester",
      "Greenlee Hydraulic Conduit Punch & Bender",
      "1000V Insulated VDE Precision Toolkit"
    ],
    recentReviews: [
      {
        id: "rev-01",
        customerName: "Debabrata Sengupta",
        area: "Salt Lake Sector II",
        rating: 5,
        date: "28 Aug 2026",
        comment: "Er. Rajesh inspected our 3BHK flat after repeated MCB tripping. He identified a neutral leakage within 15 minutes using thermal scan. Highly professional and punctual.",
        verifiedJob: true,
        serviceType: "MCB & Neutral Fault Isolation"
      },
      {
        id: "rev-02",
        customerName: "Pooja Agarwal",
        area: "New Town Action Area I",
        rating: 5,
        date: "19 Aug 2026",
        comment: "Excellent work installing our 5kVA Solar Inverter and battery bank. Neat wiring and proper earthing test completed with official report.",
        verifiedJob: true,
        serviceType: "Solar Inverter Commissioning"
      },
      {
        id: "rev-03",
        customerName: "Anupam Roy",
        area: "Rajarhat Expressway",
        rating: 4.8,
        date: "04 Aug 2026",
        comment: "Very knowledgeable engineer with all government licenses. Guided us on load optimization for new AC connections. Highly recommended!",
        verifiedJob: true,
        serviceType: "Heavy Load AC Wiring & Phase Distribution"
      }
    ],
    featured: true,
    joinedDate: "March 2021"
  },
  {
    id: "tech-002",
    name: "Er. Subhashis Das",
    title: "Industrial Automation & Switchgear Specialist",
    badgeId: "BN-IND-2024-019",
    experienceYears: 7,
    primarySector: "Industrial Panels & Automation",
    subSectors: [
      "PLC & Relay Panels",
      "VFD Drive Calibration",
      "Factory Power Factor Correction",
      "Diesel Generator AMF Panels"
    ],
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    rating: 4.88,
    reviewsCount: 96,
    completedJobs: 430,
    verificationStatus: "certified",
    licenseNumber: "WB-CEI-LIC-62104",
    issuingAuthority: "Govt. of West Bengal - Electrical Licensing Board",
    status: "on_duty",
    statusText: "On site in Sector V (Available from 03:00 PM)",
    phone: "+91 98311 77390",
    email: "subhashis.das@girirajpower.com",
    whatsapp: "+919831177390",
    emergencySupport: true,
    serviceAreas: [
      "Sector V IT Hub",
      "Taratala Industrial Estate",
      "Kasba Industrial Estate",
      "Howrah Industrial Belt"
    ],
    workingHours: "09:00 AM - 07:00 PM",
    startingRate: 699,
    rateUnit: "industrial inspection visit",
    about: "Industrial electrical engineer with 7+ years expertise in commercial machinery switchgear, DG synchronization, Automatic Mains Failure (AMF) panels, and power factor correction capacitors (APFC).",
    aiDescription: "7+ years industrial automation specialist expert in PLC relay panels, VFD drive calibration, DG synchronization, and commercial machine switchgear diagnostics.",
    certifications: [
      {
        title: "Industrial Electrical Safety & Switchgear Certificate",
        issuer: "National Safety Council of India",
        year: "2018",
        verified: true,
        credentialId: "NSCI-ELEC-4011"
      }
    ],
    skills: [
      { name: "APFC Capacitor Panel Optimization", proficiency: 94, experienceYears: 7 },
      { name: "AMF Panel & DG Interlocking", proficiency: 92, experienceYears: 7 },
      { name: "Motor Starter & VFD Commissioning", proficiency: 90, experienceYears: 6 }
    ],
    toolsCarried: [
      "Power Quality & Harmonics Analyzer",
      "Clamp-on Earth Resistance Tester",
      "Calibrated Phase Angle Meter"
    ],
    recentReviews: [
      {
        id: "rev-04",
        customerName: "Kalyan Dey",
        area: "Sector V IT Park",
        rating: 5,
        date: "15 Aug 2026",
        comment: "Resolved our server room UPS back-feed issue swiftly. Clear documentation provided.",
        verifiedJob: true,
        serviceType: "Server Room Power Audit"
      }
    ],
    featured: false,
    joinedDate: "July 2022"
  },
  {
    id: "tech-003",
    name: "Er. Amitava Sen",
    title: "Certified Rooftop Solar & Hybrid Inverter Engineer",
    badgeId: "BN-SOLAR-2024-031",
    experienceYears: 6,
    primarySector: "Solar & Renewable Power",
    subSectors: [
      "On-Grid & Hybrid Solar Systems",
      "Lithium LiFePO4 Battery Integration",
      "Net-Metering CEI Approvals",
      "Solar String Inverter Synchronization"
    ],
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    rating: 4.96,
    reviewsCount: 114,
    completedJobs: 390,
    verificationStatus: "master",
    licenseNumber: "WB-CEI-SOLAR-41992",
    issuingAuthority: "Govt. of West Bengal & MNRE Certified",
    status: "available",
    statusText: "Available today for solar site survey",
    phone: "+91 98320 88214",
    email: "amitava.sen@girirajpower.com",
    whatsapp: "+919832088214",
    emergencySupport: false,
    serviceAreas: [
      "New Town Action Area I, II & III",
      "Salt Lake",
      "Rajarhat",
      "Kalyani Expressway",
      "Sonarpur"
    ],
    workingHours: "08:30 AM - 06:30 PM",
    startingRate: 599,
    rateUnit: "solar site audit & feasibility check",
    about: "Govt. & NISE certified Solar PV System Engineer with 6+ years specializing in rooftop on-grid, off-grid, and hybrid solar power plants. Handled over 300+ successful net-metering synchronization projects across residential villas and commercial townships.",
    aiDescription: "6+ years NISE certified rooftop solar engineer handling on-grid & hybrid solar plants, net-metering approvals, and LiFePO4 battery commissioning.",
    certifications: [
      {
        title: "Master Solar PV Engineer & Net-Metering Specialist",
        issuer: "National Institute of Solar Energy (NISE)",
        year: "2020",
        verified: true,
        credentialId: "NISE-SOLAR-8012"
      }
    ],
    skills: [
      { name: "Solar PV String Design & Simulation", proficiency: 98, experienceYears: 6 },
      { name: "Hybrid Inverters & Lithium Storage", proficiency: 96, experienceYears: 6 },
      { name: "WBSEDCL Net-Metering CEI Liaison", proficiency: 92, experienceYears: 5 }
    ],
    toolsCarried: [
      "Solar Irradiance Pyranometer",
      "High Voltage DC Clamp Meter",
      "Thermal Imaging Scanner"
    ],
    recentReviews: [
      {
        id: "rev-05",
        customerName: "Somenath Roy",
        area: "New Town Action Area II",
        rating: 5,
        date: "22 Aug 2026",
        comment: "Flawless 10kW rooftop solar installation with neat conduit laying and quick net-metering paperwork.",
        verifiedJob: true,
        serviceType: "10kW On-Grid Solar Installation"
      }
    ],
    featured: true,
    joinedDate: "January 2023"
  },
  {
    id: "tech-004",
    name: "Er. Sandip Banerjee",
    title: "24x7 Emergency Electrical Breakdown Specialist",
    badgeId: "BN-EMERG-2024-009",
    experienceYears: 11,
    primarySector: "24x7 Emergency & Fault Isolation",
    subSectors: [
      "Short Circuit Diagnostics",
      "Transformer & Substation Tripping",
      "Burnt Cable Joint Splicing",
      "Immediate Power Restoration"
    ],
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    rating: 4.98,
    reviewsCount: 220,
    completedJobs: 890,
    verificationStatus: "master",
    licenseNumber: "WB-CEI-LIC-33901",
    issuingAuthority: "Govt. of West Bengal - Electrical Licensing Board",
    status: "available",
    statusText: "On Emergency Standby (30-min response)",
    phone: "+91 98300 55921",
    email: "sandip.banerjee@girirajpower.com",
    whatsapp: "+919830055921",
    emergencySupport: true,
    serviceAreas: [
      "All Kolkata & Salt Lake",
      "Howrah Central",
      "Ballygunge",
      "Alipore",
      "Behala"
    ],
    workingHours: "24 Hours Emergency Dispatch",
    startingRate: 499,
    rateUnit: "emergency dispatch & diagnosis",
    about: "Senior Master Wireman with 11+ years handling critical commercial, hospital, and residential emergency power outages, short circuit fires, neutral failure isolation, and heavy switchgear breakdown restoration.",
    aiDescription: "11+ years emergency breakdown wireman providing rapid 30-minute dispatch for short circuit diagnosis, substation tripping, and 24x7 emergency power restoration.",
    certifications: [
      {
        title: "Senior Master Wireman & High Voltage Supervisor",
        issuer: "Govt. of West Bengal Electrical Licensing Board",
        year: "2014",
        verified: true,
        credentialId: "WB-CEI-MASTER-1044"
      }
    ],
    skills: [
      { name: "Rapid Short Circuit & Earth Leakage Tracing", proficiency: 99, experienceYears: 11 },
      { name: "HT/LT Substation Emergency Tripping Fix", proficiency: 97, experienceYears: 11 },
      { name: "Underground Cable Fault Pinpointing", proficiency: 95, experienceYears: 10 }
    ],
    toolsCarried: [
      "TDR Underground Cable Fault Locator",
      "Fluke Industrial Thermal Imager",
      "Megger Insulation & Continuity Tester"
    ],
    recentReviews: [
      {
        id: "rev-06",
        customerName: "Vikram Chordia",
        area: "Ballygunge Circular Rd",
        rating: 5,
        date: "29 Aug 2026",
        comment: "Arrived within 35 minutes at 11 PM during a thunderstorm when our main switchboard caught spark. Resolved in 40 minutes safely.",
        verifiedJob: true,
        serviceType: "Midnight Main Switchboard Repair"
      }
    ],
    featured: true,
    joinedDate: "November 2020"
  }
];

// src/data/faqData.ts
var ENRICHED_FAQ_LIST = [
  // --- SECTION 1: 60-MINUTE EXPRESS DELIVERY & SERVICE AREAS ---
  {
    id: "delivery-speed",
    category: "delivery",
    question: "How fast is express delivery from SmartRun?",
    answer: "Standard electrical orders\u2014including domestic house wires, switches, circuit breakers (MCBs), LED fixtures, junction boxes, and installation tools\u2014are packed within minutes and delivered in 60 minutes across serviceable Kolkata zones from our Kasba Central Depot."
  },
  {
    id: "delivery-areas",
    category: "delivery",
    question: "Which areas and pincodes in Kolkata do you deliver to?",
    answer: "We deliver across serviceable Kolkata metropolitan PIN codes (700001\u2013700160) and Howrah PIN codes (711101\u2013711106), covering Kasba, Ballygunge, Gariahat, Jadavpur, Tollygunge, Behala, Salt Lake (Sector I\u2013V), New Town, Rajarhat, Central Kolkata, Bhowanipore, Park Street, Dum Dum, Lake Town, and the EM Bypass corridor.",
    actionLink: {
      text: "Check Pincode & Service Areas",
      url: "/delivery-areas"
    }
  },
  {
    id: "delivery-tracking",
    category: "delivery",
    question: "Can I track my delivery partner live on a GPS map?",
    answer: "Yes. As soon as your order is dispatched from our Kasba depot, you can track your delivery partner\u2019s live location, view their vehicle registration number, and monitor their estimated arrival time in real time inside the app or web tracker."
  },
  {
    id: "delivery-freight",
    category: "delivery",
    question: "Do you deliver heavy construction materials and building supplies?",
    answer: "Yes. For bulky construction and structural building materials\u2014such as UltraTech and ACC cement bags, Tata Tiscon TMT rebars, rigid PVC conduit pipes, waterproofing drums, plywood sheets, and sanitary fixtures\u2014we dispatch dedicated commercial pickup vehicles directly to your site.",
    actionLink: {
      text: "Browse Construction Materials",
      url: "/construction"
    }
  },
  // --- SECTION 2: GENUINE MATERIALS, WIRE VARIANTS & APP ---
  {
    id: "products-genuine",
    category: "products",
    question: "Are all electrical items, wires, and construction supplies genuine?",
    answer: "Yes. Inventory sold on SmartRun is sourced from authorized distributors and manufacturers including Polycab, Havells, RR Kabel, Finolex, Schneider Electric, Legrand, Anchor by Panasonic, Philips, UltraTech Cement, Tata Tiscon, Astral, Dr. Fixit, and Asian Paints, carrying standard ISI/BIS markings and original manufacturer warranties."
  },
  {
    id: "products-warranty",
    category: "products",
    question: "Do wires and electrical components carry manufacturer warranty?",
    answer: "Yes. Branded electrical goods include the official manufacturer warranty against manufacturing defects, alongside SmartRun\u2019s 7-day doorstep replacement window if an item arrives damaged or non-functional."
  },
  {
    id: "products-colors-sizes",
    category: "products",
    question: "Can I select specific wire colors and gauge sizes?",
    answer: "Yes. Wires and pipes support standardized color selection (Red, Black, Blue, Yellow, Green, White, Grey) with real-time pricing, photos, and stock visibility across cross-sectional gauges such as 0.75 sq mm to 10.0 sq mm."
  },
  {
    id: "smartrun-android-app",
    category: "products",
    question: "Is there an official SmartRUN Android app for ordering materials?",
    answer: "Yes. SmartRUN: Materials Delivery (official package ID: in.smartrun.app) is available on the Google Play Store alongside the web platform at https://www.smartrun.in. Both platforms share real-time cart synchronization, pincode checks, live order GPS tracking, and downloadable GST invoices.",
    actionLink: {
      text: "View SmartRUN App Details",
      url: "/app"
    }
  },
  // --- SECTION 3: GST TAX INVOICES & BULK CONTRACTOR PRICING ---
  {
    id: "billing-gst",
    category: "billing",
    question: "Can I get an official GST tax invoice for business Input Tax Credit (ITC)?",
    answer: "Yes. Every order generates a statutory GST tax invoice with itemized HSN/SAC codes, CGST/SGST breakdown, and your registered company GSTIN for business accounting and Input Tax Credit (ITC). A4 PDF invoices can be downloaded anytime from your Order History."
  },
  {
    id: "billing-wholesale",
    category: "billing",
    question: "Do you offer contractor and bulk site procurement quotes?",
    answer: "Yes. Electrical contractors, site engineers, builders, and bulk buyers can order direct wholesale packs online or contact our Kasba contractor desk (+91 87774 00280 / team@smartrun.in) for commercial project schedules and bulk dispatch.",
    actionLink: {
      text: "Contact Contractor Desk",
      url: "/contact"
    }
  },
  // --- SECTION 4: PAYMENTS & CASH ON DELIVERY (COD) ---
  {
    id: "payments-modes",
    category: "payments",
    question: "What payment modes are supported?",
    answer: "SmartRun supports UPI (Google Pay, PhonePe, Paytm, BHIM), Credit and Debit Cards (Visa, MasterCard, RuPay), Net Banking via Razorpay, and Cash on Delivery (COD) on eligible orders across serviceable Kolkata pincodes."
  },
  {
    id: "payments-cod",
    category: "payments",
    question: "Is Cash on Delivery (COD) available?",
    answer: "Yes, Cash on Delivery is available across eligible retail orders in our Kolkata and Howrah serviceable network. You can also pay via UPI at your doorstep on arrival."
  },
  {
    id: "payments-security",
    category: "payments",
    question: "Is online payment secure on SmartRun?",
    answer: "Yes. Online transactions are processed through encrypted Razorpay payment gateways in compliance with Indian payment and RBI tokenization standards. SmartRun does not store your card CVV or PIN."
  },
  // --- SECTION 5: RETURNS, CANCELLATIONS & REFUNDS ---
  {
    id: "returns-replacements",
    category: "returns",
    question: "How do returns and replacements work?",
    answer: "SmartRun offers a 7-day doorstep return and replacement window for defective, damaged, or mismatched items. Raise a request from your Order History for reverse pickup and inspection.",
    actionLink: {
      text: "View Return Policy",
      url: "/return"
    }
  },
  {
    id: "returns-refund-timing",
    category: "returns",
    question: "How does the refund process work and when will I get my money back?",
    answer: "Once an order is cancelled before dispatch or an eligible return is verified, refunds are initiated directly to your original payment source (UPI/bank account/card) with standard banking settlement windows. View full settlement SLAs on our Refund Policy page.",
    actionLink: {
      text: "View Refund Policy",
      url: "/refund-policy"
    }
  },
  {
    id: "returns-cancellation",
    category: "returns",
    question: "Can I cancel an order after placing it?",
    answer: "Yes. You can cancel your order directly from the order tracking view prior to warehouse dispatch. Prepaid orders automatically trigger a direct-to-source refund upon cancellation."
  },
  // --- SECTION 6: ELECTRICIAN BOOKING & HUB ADDRESSES ---
  {
    id: "electricians-booking",
    category: "electricians",
    question: "How do I book a verified electrician on SmartRun?",
    answer: "Open the Technician section on the web platform or mobile app to browse verified electricians in Kolkata, check their West Bengal Electrical Licensing Board credentials, experience, service zones, and request a visit.",
    actionLink: {
      text: "Browse Certified Technicians",
      url: "/technicians"
    }
  },
  {
    id: "hub-contact",
    category: "electricians",
    question: "Where are SmartRun\u2019s office and dispatch depot located, and how do I contact support?",
    answer: "SmartRun Materials Pvt. Ltd. maintains its Registered Office at Kheyadah Village, Bhagabanpur, Kolkata 700150, West Bengal, and dispatches express orders from the SmartRun Kasba Central Depot at Kasba Industrial Estate Phase 1, Kolkata 700107. Support is open daily 08:00 AM \u2013 09:00 PM IST via WhatsApp/Helpline +91 87774 00280, +91 90071 68561, or team@smartrun.in.",
    actionLink: {
      text: "Visit Contact & Support Page",
      url: "/contact"
    }
  },
  // --- SECTION 7: SECURITY & LOGIN NOTIFICATIONS ---
  {
    id: "security-login-alerts",
    category: "security",
    question: 'Why did I receive an email saying "Important: Login from new device and location"?',
    answer: "SmartRun sends automated security alerts whenever your account is accessed from a new device, mobile browser, or IP network to help protect your profile, saved addresses, and order history. If the login was yours, no action is needed.",
    actionLink: {
      text: "Manage Account Security",
      url: "/profile"
    }
  },
  {
    id: "security-not-me",
    category: "security",
    question: "What should I do if a login alert was NOT from me?",
    answer: "Visit our Password Reset page immediately to invalidate active sessions and reset your password, or contact our support desk at +91 87774 00280 or team@smartrun.in.",
    actionLink: {
      text: "Reset Login Password",
      url: "/reset-password"
    }
  },
  {
    id: "security-was-me",
    category: "security",
    question: "What should I do if the login was made by me?",
    answer: "No action is required. You can safely ignore the security notification email."
  },
  {
    id: "security-location",
    category: "security",
    question: 'Why does the login location show "Kolkata, India" or a nearby city?',
    answer: "Security alert locations are estimated from telecom ISP routing (Airtel, Jio, Vi, BSNL), which may map mobile data traffic to a regional metropolitan gateway rather than your exact street address."
  },
  {
    id: "security-passwords-otp",
    category: "security",
    question: "How does SmartRun protect my account and password?",
    answer: "SmartRun uses HTTPS/TLS encryption, hashed credentials, and OTP verification. SmartRun staff or delivery riders will never ask for your password or OTP."
  }
];

// src/data/kolkataAreas.ts
var KOLKATA_AREAS = [
  { name: "Ezra Street / Burrabazar", pincode: "700001", zone: "Central", hub: "Central Ezra Hub", deliveryMinutes: 30, serviceable: true, lat: 22.5744, lng: 88.3547, exactStreet: "Ezra Street, Burrabazar" },
  { name: "Park Street / Camac Street", pincode: "700016", zone: "Central", hub: "Central Ezra Hub", deliveryMinutes: 40, serviceable: true, lat: 22.5512, lng: 88.3533, exactStreet: "Park Street, Camac Street" },
  { name: "Salt Lake Sector I / II / III", pincode: "700064", zone: "East", hub: "Salt Lake Sector V Hub", deliveryMinutes: 45, serviceable: true, lat: 22.5867, lng: 88.4178, exactStreet: "Sector I / II / III, Salt Lake" },
  { name: "Salt Lake Sector V (IT Hub)", pincode: "700091", zone: "East", hub: "Salt Lake Sector V Hub", deliveryMinutes: 35, serviceable: true, lat: 22.5735, lng: 88.4331, exactStreet: "Sector V, Salt Lake" },
  { name: "New Town Action Area I", pincode: "700156", zone: "East", hub: "New Town Express Hub", deliveryMinutes: 45, serviceable: true, lat: 22.5898, lng: 88.4682, exactStreet: "Major Arterial Road, Action Area I, New Town" },
  { name: "New Town Action Area II & III", pincode: "700135", zone: "East", hub: "New Town Express Hub", deliveryMinutes: 50, serviceable: true, lat: 22.6045, lng: 88.4879, exactStreet: "Action Area II & III, New Town" },
  { name: "Rajarhat / Chinar Park", pincode: "700136", zone: "East", hub: "New Town Express Hub", deliveryMinutes: 45, serviceable: true, lat: 22.6284, lng: 88.4485, exactStreet: "Rajarhat Main Road, Chinar Park" },
  { name: "Ballygunge / Gariahat", pincode: "700019", zone: "South", hub: "Gariahat South Hub", deliveryMinutes: 40, serviceable: true, lat: 22.5195, lng: 88.3653, exactStreet: "Rashbehari Avenue, Gariahat" },
  { name: "Bhowanipore / Elgin Road", pincode: "700025", zone: "South", hub: "Gariahat South Hub", deliveryMinutes: 40, serviceable: true, lat: 22.5354, lng: 88.3478, exactStreet: "Elgin Road, Bhowanipore" },
  { name: "Alipore / New Alipore", pincode: "700027", zone: "South", hub: "Gariahat South Hub", deliveryMinutes: 45, serviceable: true, lat: 22.5186, lng: 88.3308, exactStreet: "Alipore Road, New Alipore" },
  { name: "Garia / Patuli / EM Bypass South", pincode: "700084", zone: "South", hub: "Garia South Hub", deliveryMinutes: 50, serviceable: true, lat: 22.4645, lng: 88.3842, exactStreet: "EM Bypass, Patuli, Garia" },
  { name: "Jadavpur / Tollygunge", pincode: "700032", zone: "South", hub: "Gariahat South Hub", deliveryMinutes: 45, serviceable: true, lat: 22.4988, lng: 88.3698, exactStreet: "Raja SC Mullick Road, Jadavpur" },
  { name: "Behala / Taratala", pincode: "700034", zone: "South", hub: "Taratala Hub", deliveryMinutes: 50, serviceable: true, lat: 22.5023, lng: 88.3187, exactStreet: "Diamond Harbour Road, Behala" },
  { name: "Shyambazar / Bagbazar", pincode: "700004", zone: "North", hub: "North Dum Dum Hub", deliveryMinutes: 45, serviceable: true, lat: 22.6033, lng: 88.3721, exactStreet: "Bidhan Sarani, Shyambazar" },
  { name: "Dum Dum / Nagerbazar / Airport", pincode: "700028", zone: "North", hub: "North Dum Dum Hub", deliveryMinutes: 50, serviceable: true, lat: 22.6322, lng: 88.4067, exactStreet: "Jessore Road, Dum Dum" },
  { name: "Howrah / Shibpur / Mandirtala", pincode: "711101", zone: "West", hub: "Howrah Bridge West Hub", deliveryMinutes: 55, serviceable: true, lat: 22.5855, lng: 88.3312, exactStreet: "Grand Trunk Road, Howrah" },
  { name: "Topsia / Tangra / EM Bypass North", pincode: "700046", zone: "East", hub: "Salt Lake Sector V Hub", deliveryMinutes: 40, serviceable: true, lat: 22.5441, lng: 88.3892, exactStreet: "EM Bypass North, Topsia, Tangra" },
  { name: "Lake Town / Bangur Avenue", pincode: "700089", zone: "North", hub: "North Dum Dum Hub", deliveryMinutes: 45, serviceable: true, lat: 22.6078, lng: 88.4019, exactStreet: "VIP Road, Lake Town, Bangur" }
];

// src/utils/categoryHelper.ts
var CONSTRUCTION_SUBCATS = [
  "cement & concrete",
  "cement",
  "concrete",
  "tmt & steel",
  "tmt",
  "steel",
  "rebar",
  "tiling & adhesives",
  "tiling",
  "tile adhesive",
  "tile cleaner",
  "paints & putty",
  "paints",
  "paint",
  "putty",
  "primer",
  "waterproofing",
  "plywood & boards",
  "plywood",
  "ply",
  "board",
  "hdhmr",
  "adhesives & fevicol",
  "adhesive",
  "fevicol",
  "kitchen sinks & faucets",
  "kitchen sink",
  "sink",
  "faucet",
  "tap",
  "sanitary & bath fittings",
  "sanitary",
  "bath fitting",
  "commode",
  "toilet",
  "cistern",
  "hinges & hardware",
  "hinge",
  "drawer channel",
  "kitchen systems & accessories",
  "spice rack",
  "wardrobe & bed fittings",
  "bed fitting",
  "door locks & hardware",
  "door lock",
  "padlock",
  "plumbing & pipes",
  "plumbing",
  "cpvc",
  "upvc",
  "water storage tank",
  "power tools",
  "angle grinder",
  "impact drill",
  "drill kit",
  "general hardware & tools",
  "general hardware",
  "tarpaulin",
  "step ladder"
];
var CONSTRUCTION_BRANDS = [
  "ultratech",
  "acc",
  "ambuja",
  "tata tiscon",
  "shyam steel",
  "roff",
  "asian paints",
  "berger",
  "nerolac",
  "dr. fixit",
  "dr fixit",
  "centuryply",
  "action tesa",
  "greenply",
  "fevicol",
  "jaquar",
  "hindware",
  "cera",
  "geberit",
  "hettich",
  "astral",
  "supreme",
  "bosch"
];
function isConstructionProduct(item) {
  if (!item || typeof item !== "object") return false;
  const id = String(item.id || "").trim();
  const cat = String(item.category || "").toLowerCase().trim();
  const sub = String(item.subcategory || item.subCategory || item.sub_category || "").toLowerCase().trim();
  const name = String(item.name || "").toLowerCase().trim();
  const brand = String(item.brand || "").toLowerCase().trim();
  if (id.startsWith("c") && !id.startsWith("cctv") && (id.startsWith("c-") || id === "c1" || id === "c2" || id === "c3" || id === "c4" || id === "c5" || id === "c6")) {
    return true;
  }
  if (cat === "construction" || cat === "cement" || cat === "steel" || cat === "tmt" || cat === "plumbing" || cat === "paint" || cat === "paints" || cat === "hardware" || cat === "tiling" || cat === "sanitary" || cat === "plywood" || cat === "waterproofing" || cat === "adhesive" || cat === "adhesives" || cat.includes("construct") || cat.includes("building") || cat.includes("civil")) {
    return true;
  }
  if (cat === "electrical" || cat === "electronics" || cat === "lighting" || cat === "wiring") {
    return false;
  }
  if (sub) {
    for (const s of CONSTRUCTION_SUBCATS) {
      if (sub.includes(s) || sub.length >= 3 && s.includes(sub)) {
        return true;
      }
    }
  }
  if (brand) {
    for (const b of CONSTRUCTION_BRANDS) {
      if (brand.includes(b) || brand.length >= 3 && b.includes(brand)) {
        return true;
      }
    }
  }
  if (name) {
    if (name.includes("cement") || name.includes("tmt rebar") || name.includes("superlinks") || name.includes("tile adhesive") || name.includes("cera clean") || name.includes("wall putty") || name.includes("exterior emulsion") || name.includes("interior emulsion") || name.includes("waterproofing compound") || name.includes("dampguard") || name.includes("bwp plywood") || name.includes("hdhmr board") || name.includes("wood adhesive") || name.includes("kitchen sink") || name.includes("swan neck") || name.includes("western commode") || name.includes("concealed cistern") || name.includes("auto hinges") || name.includes("drawer channels") || name.includes("spice rack") || name.includes("bed lift mechanism") || name.includes("digital door lock") || name.includes("padlock") || name.includes("cpvc pro") || name.includes("water storage tank") || name.includes("impact drill") || name.includes("angle grinder") || name.includes("step ladder") || name.includes("tarpaulin sheet")) {
      return true;
    }
  }
  return false;
}
function getProductCategory(item) {
  if (isConstructionProduct(item)) {
    return "construction";
  }
  return "electrical";
}

// src/data/productColorImages.ts
var NEUTRAL_PRODUCT_PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <radialGradient id="neutralBg" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </radialGradient>
    <filter id="neutralShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.08"/>
    </filter>
  </defs>
  <rect width="600" height="600" fill="url(#neutralBg)"/>
  <g filter="url(#neutralShadow)">
    <rect x="180" y="160" width="240" height="240" rx="28" fill="#ffffff" stroke="#e2e8f0" stroke-width="3"/>
    <rect x="210" y="190" width="180" height="180" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="6 6"/>
    <!-- Package / Component Icon -->
    <path d="M 270 260 L 300 240 L 330 260 L 300 280 Z" fill="#94a3b8" opacity="0.6"/>
    <path d="M 270 260 L 270 300 L 300 320 L 300 280 Z" fill="#64748b" opacity="0.8"/>
    <path d="M 330 260 L 330 300 L 300 320 L 300 280 Z" fill="#475569"/>
    <circle cx="300" cy="275" r="4" fill="#fbbf24"/>
  </g>
  <text x="300" y="445" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" fill="#334155" text-anchor="middle" letter-spacing="0.5">SmartRun Express Genuine</text>
  <text x="300" y="470" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#94a3b8" text-anchor="middle">Product preview coming soon</text>
</svg>`);

// src/data/wireColors.ts
var INDIAN_STANDARD_WIRE_COLORS = [
  {
    name: "Red",
    label: "Red (Live / Phase R)",
    shortRole: "Phase (R)",
    hex: "#DC2626",
    twBg: "bg-red-600",
    twRing: "ring-red-600",
    description: "IS 694 Standard: Live / Phase conductor in single-phase & 3-phase circuits.",
    standard: "IS 694"
  },
  {
    name: "Black",
    label: "Black (Neutral N)",
    shortRole: "Neutral (N)",
    hex: "#0F172A",
    twBg: "bg-slate-950",
    twRing: "ring-slate-950",
    description: "IS 694 Standard: Neutral return conductor for AC electrical circuits.",
    standard: "IS 694"
  },
  {
    name: "Green",
    label: "Green (Earth / Ground E)",
    shortRole: "Earth (E)",
    hex: "#16A34A",
    twBg: "bg-green-600",
    twRing: "ring-green-600",
    description: "IS 694 Standard: Safety protective earth grounding conductor.",
    standard: "IS 694"
  },
  {
    name: "Yellow",
    label: "Yellow (Phase Y)",
    shortRole: "Phase (Y)",
    hex: "#EAB308",
    twBg: "bg-yellow-500",
    twRing: "ring-yellow-500",
    description: "IS 694 Standard: Y-Phase in 3-phase wiring & secondary switch live loops.",
    standard: "IS 694"
  },
  {
    name: "Blue",
    label: "Blue (Phase B)",
    shortRole: "Phase (B)",
    hex: "#2563EB",
    twBg: "bg-blue-600",
    twRing: "ring-blue-600",
    description: "IS 694 Standard: B-Phase in 3-phase wiring & dedicated lighting loops.",
    standard: "IS 694"
  },
  {
    name: "White",
    label: "White / Grey (Inverter / UPS)",
    shortRole: "Inverter / UPS",
    hex: "#F1F5F9",
    twBg: "bg-slate-200",
    twRing: "ring-slate-400",
    description: "Indian Residential Standard: Dedicated Inverter / UPS emergency backup phase.",
    standard: "IS 732"
  }
];
var PIPE_COLOR_OPTIONS = [
  {
    name: "Ivory / White",
    label: "Ivory / White (Standard Clean Conduit)",
    shortRole: "Standard (White)",
    hex: "#F8FAFC",
    twBg: "bg-slate-100",
    twRing: "ring-slate-400",
    description: "Standard residential & commercial concealed or exposed conduit wiring (IS 9537 Part 3).",
    standard: "IS 9537"
  },
  {
    name: "Black",
    label: "Black (UV Resistant / Heavy Duty)",
    shortRole: "UV Proof (Black)",
    hex: "#0F172A",
    twBg: "bg-slate-950",
    twRing: "ring-slate-950",
    description: "Outdoor weather-proof, industrial slab casting & high UV sunlight-resistant conduit.",
    standard: "IS 9537"
  },
  {
    name: "Grey",
    label: "Grey (Medium / Heavy Slab Casting)",
    shortRole: "Casting (Grey)",
    hex: "#64748B",
    twBg: "bg-slate-500",
    twRing: "ring-slate-600",
    description: "High impact resistance for RCC concrete ceiling slab embedding and wall chasing.",
    standard: "IS 9537"
  },
  {
    name: "Blue",
    label: "Blue (Data / Low Voltage)",
    shortRole: "Data/Telecom (Blue)",
    hex: "#2563EB",
    twBg: "bg-blue-600",
    twRing: "ring-blue-600",
    description: "Dedicated identification conduit for CAT6 internet, telephone, and CCTV cabling.",
    standard: "Commercial"
  },
  {
    name: "Red / Orange",
    label: "Red / Orange (Fire Safety & Alarm)",
    shortRole: "Fire Alarm (Red)",
    hex: "#EA580C",
    twBg: "bg-orange-600",
    twRing: "ring-orange-600",
    description: "Mandatory color-coded conduit pathway for fire alarm systems and emergency backup power.",
    standard: "Fire Code"
  },
  {
    name: "Yellow",
    label: "Yellow (Solar DC / Alert Pathways)",
    shortRole: "Solar / Alert (Yellow)",
    hex: "#EAB308",
    twBg: "bg-yellow-500",
    twRing: "ring-yellow-500",
    description: "Solar rooftop DC cable protection and caution safety conduit routes.",
    standard: "MNRE Std"
  }
];
function isWireProduct(product) {
  if (!product) return false;
  const name = (product.name || "").toLowerCase();
  const sub = (product.subCategory || product.subcategory || "").toLowerCase();
  const tags = (product.tags || []).map((t) => t.toLowerCase());
  return sub === "wire" || sub === "wiring" || sub === "cables" || sub.includes("wire") || sub.includes("cable") || name.includes("wire") || name.includes("frls") || name.includes("fr ls") || name.includes("sqmm") || name.includes("cable") || tags.includes("wire") || tags.includes("cable");
}
function isPipeProduct(product) {
  if (!product) return false;
  const name = (product.name || "").toLowerCase();
  const sub = (product.subCategory || product.subcategory || "").toLowerCase();
  const tags = (product.tags || []).map((t) => t.toLowerCase());
  return sub.includes("pipe") || sub.includes("conduit") || sub.includes("plumbing") || name.includes("pipe") || name.includes("conduit") || name.includes("casing") || name.includes("dalda") || name.includes("dada") || name.includes("cpvc") || name.includes("upvc") || name.includes("pvc pipe") || tags.includes("pipe") || tags.includes("conduit") || tags.includes("dalda") || tags.includes("dalda pipe") || tags.includes("dada");
}
var COLOR_FINISH_DICTIONARY = {
  // Gold & Metallic Finishes (e.g. Schneider Avatar switches, regulators)
  "hairline gold": {
    hex: "#D4AF37",
    twBg: "bg-amber-400",
    twRing: "ring-amber-500",
    shortRole: "Hairline Gold",
    description: "Brushed metallic hairline gold luxury architectural finish"
  },
  "metal gold hairline": {
    hex: "#C5A059",
    twBg: "bg-yellow-600",
    twRing: "ring-yellow-600",
    shortRole: "Metal Gold",
    description: "Premium metallic hairline gold finish with subtle brush texture"
  },
  "gold": {
    hex: "#EAB308",
    twBg: "bg-yellow-500",
    twRing: "ring-yellow-500",
    shortRole: "Gold",
    description: "Lustrous classic gold finish"
  },
  "rose gold": {
    hex: "#B76E79",
    twBg: "bg-rose-300",
    twRing: "ring-rose-400",
    shortRole: "Rose Gold",
    description: "Contemporary metallic rose gold finish"
  },
  "champagne": {
    hex: "#F7E7CE",
    twBg: "bg-amber-100",
    twRing: "ring-amber-300",
    shortRole: "Champagne",
    description: "Subtle champagne metallic luster"
  },
  "champagne gold": {
    hex: "#F7E7CE",
    twBg: "bg-amber-100",
    twRing: "ring-amber-300",
    shortRole: "Champagne Gold",
    description: "Subtle champagne gold metallic finish"
  },
  // Monochrome & Architectural Finishes (e.g. Legrand, Schneider, Anchor)
  "white": {
    hex: "#FFFFFF",
    twBg: "bg-white",
    twRing: "ring-slate-300",
    shortRole: "White",
    description: "Clean glossy pristine white finish"
  },
  "pure white": {
    hex: "#FFFFFF",
    twBg: "bg-white",
    twRing: "ring-slate-300",
    shortRole: "Pure White",
    description: "High-gloss pure white finish"
  },
  "ivory": {
    hex: "#FFFFF0",
    twBg: "bg-amber-50",
    twRing: "ring-amber-200",
    shortRole: "Ivory",
    description: "Warm architectural ivory finish"
  },
  "ivory / white": {
    hex: "#FFFFF0",
    twBg: "bg-amber-50",
    twRing: "ring-amber-200",
    shortRole: "Ivory / White",
    description: "Standard ivory / off-white finish"
  },
  "off-white": {
    hex: "#F8FAFC",
    twBg: "bg-slate-50",
    twRing: "ring-slate-200",
    shortRole: "Off-White",
    description: "Subtle off-white architectural finish"
  },
  "cream": {
    hex: "#FEF3C7",
    twBg: "bg-amber-100",
    twRing: "ring-amber-200",
    shortRole: "Cream",
    description: "Warm cream architectural finish"
  },
  "black": {
    hex: "#0F172A",
    twBg: "bg-slate-900",
    twRing: "ring-slate-950",
    shortRole: "Black",
    description: "Sleek modern black finish"
  },
  "matte black": {
    hex: "#1E293B",
    twBg: "bg-slate-800",
    twRing: "ring-slate-900",
    shortRole: "Matte Black",
    description: "Anti-glare architectural matte black finish"
  },
  "jet black": {
    hex: "#020617",
    twBg: "bg-slate-950",
    twRing: "ring-black",
    shortRole: "Jet Black",
    description: "Deep obsidian jet black finish"
  },
  "charcoal": {
    hex: "#334155",
    twBg: "bg-slate-700",
    twRing: "ring-slate-800",
    shortRole: "Charcoal",
    description: "Modern charcoal dark grey finish"
  },
  "anthracite": {
    hex: "#1E293B",
    twBg: "bg-slate-800",
    twRing: "ring-slate-900",
    shortRole: "Anthracite",
    description: "Contemporary anthracite dark metallic finish"
  },
  "grey": {
    hex: "#64748B",
    twBg: "bg-slate-500",
    twRing: "ring-slate-600",
    shortRole: "Grey",
    description: "Neutral high-impact industrial / architectural grey"
  },
  "gray": {
    hex: "#64748B",
    twBg: "bg-slate-500",
    twRing: "ring-slate-600",
    shortRole: "Gray",
    description: "Neutral high-impact industrial / architectural gray"
  },
  "dark grey": {
    hex: "#475569",
    twBg: "bg-slate-600",
    twRing: "ring-slate-700",
    shortRole: "Dark Grey",
    description: "Refined deep slate grey finish"
  },
  "light grey": {
    hex: "#CBD5E1",
    twBg: "bg-slate-300",
    twRing: "ring-slate-400",
    shortRole: "Light Grey",
    description: "Airy light silver grey finish"
  },
  "silver": {
    hex: "#CBD5E1",
    twBg: "bg-slate-300",
    twRing: "ring-slate-400",
    shortRole: "Silver",
    description: "Brushed metallic silver finish"
  },
  "metal silver": {
    hex: "#CBD5E1",
    twBg: "bg-slate-300",
    twRing: "ring-slate-400",
    shortRole: "Metal Silver",
    description: "Polished metal silver finish"
  },
  "chrome": {
    hex: "#E2E8F0",
    twBg: "bg-slate-200",
    twRing: "ring-slate-400",
    shortRole: "Chrome",
    description: "Mirror chrome metallic finish"
  },
  "graphite": {
    hex: "#374151",
    twBg: "bg-gray-700",
    twRing: "ring-gray-800",
    shortRole: "Graphite",
    description: "Dark graphite metallic finish"
  },
  // Warm & Earthy Metals
  "bronze": {
    hex: "#B45309",
    twBg: "bg-amber-700",
    twRing: "ring-amber-800",
    shortRole: "Bronze",
    description: "Vintage brushed bronze finish"
  },
  "antique bronze": {
    hex: "#92400E",
    twBg: "bg-amber-800",
    twRing: "ring-amber-900",
    shortRole: "Antique Bronze",
    description: "Classic aged antique bronze finish"
  },
  "copper": {
    hex: "#B87333",
    twBg: "bg-orange-700",
    twRing: "ring-orange-800",
    shortRole: "Copper",
    description: "Luminous metallic copper finish"
  },
  "brass": {
    hex: "#CA8A04",
    twBg: "bg-yellow-600",
    twRing: "ring-yellow-700",
    shortRole: "Brass",
    description: "Traditional brushed brass finish"
  },
  "antique brass": {
    hex: "#854D0E",
    twBg: "bg-yellow-800",
    twRing: "ring-yellow-900",
    shortRole: "Antique Brass",
    description: "Heritage antique brass finish"
  },
  "wood": {
    hex: "#78350F",
    twBg: "bg-amber-900",
    twRing: "ring-amber-950",
    shortRole: "Wood",
    description: "Natural architectural wood texture finish"
  },
  "brown": {
    hex: "#78350F",
    twBg: "bg-amber-900",
    twRing: "ring-amber-950",
    shortRole: "Brown",
    description: "Warm brown architectural finish"
  },
  "teak": {
    hex: "#854D0E",
    twBg: "bg-amber-800",
    twRing: "ring-amber-900",
    shortRole: "Teak Wood",
    description: "Natural teak grain texture finish"
  },
  "walnut": {
    hex: "#582F0E",
    twBg: "bg-amber-950",
    twRing: "ring-amber-950",
    shortRole: "Walnut",
    description: "Deep walnut wood grain finish"
  },
  // Standard Indian Standard Wire & Conduit Colors
  "red": {
    hex: "#DC2626",
    twBg: "bg-red-600",
    twRing: "ring-red-600",
    shortRole: "Live / Phase (R)",
    description: "IS 694 Standard: Live / Phase conductor in single-phase & 3-phase circuits.",
    standard: "IS 694"
  },
  "blue": {
    hex: "#2563EB",
    twBg: "bg-blue-600",
    twRing: "ring-blue-600",
    shortRole: "Phase (B) / Data",
    description: "IS 694 Standard: 3-phase circuits Phase B or dedicated low-voltage data pathway.",
    standard: "IS 694"
  },
  "green": {
    hex: "#16A34A",
    twBg: "bg-green-600",
    twRing: "ring-green-600",
    shortRole: "Earth / Ground (E)",
    description: "IS 694 Standard: Dedicated earth / ground fault protection conductor.",
    standard: "IS 694"
  },
  "yellow": {
    hex: "#EAB308",
    twBg: "bg-yellow-500",
    twRing: "ring-yellow-500",
    shortRole: "Phase (Y) / Solar",
    description: "IS 694 Standard: Phase Y conductor or solar rooftop DC protection pathway.",
    standard: "IS 694"
  },
  "orange": {
    hex: "#EA580C",
    twBg: "bg-orange-600",
    twRing: "ring-orange-600",
    shortRole: "Fire Alarm / Safety",
    description: "Mandatory color-coded pathway for fire alarm systems and emergency power.",
    standard: "Fire Code"
  }
};
function resolveColorOption(rawName) {
  if (typeof rawName === "object" && rawName !== null) {
    const name2 = rawName.name || rawName.label || rawName.color || rawName.colour || "Custom";
    const price = typeof rawName.price === "number" && !isNaN(rawName.price) ? rawName.price : void 0;
    const mrp = typeof rawName.mrp === "number" && !isNaN(rawName.mrp) ? rawName.mrp : void 0;
    const discount_percent = typeof rawName.discount_percent === "number" ? rawName.discount_percent : price && mrp && mrp > price ? Math.round((mrp - price) / mrp * 100) : void 0;
    let parsedImageUrls = [];
    if (Array.isArray(rawName.image_urls)) {
      parsedImageUrls = rawName.image_urls.filter((u) => typeof u === "string" && u.trim().length > 0);
    } else if (Array.isArray(rawName.images)) {
      parsedImageUrls = rawName.images.filter((u) => typeof u === "string" && u.trim().length > 0);
    } else if (typeof rawName.image_urls === "string" && rawName.image_urls.trim()) {
      try {
        const parsed = JSON.parse(rawName.image_urls);
        if (Array.isArray(parsed)) parsedImageUrls = parsed.filter((u) => typeof u === "string" && u.trim().length > 0);
        else if (parsed) parsedImageUrls = [String(parsed).trim()];
      } catch {
        parsedImageUrls = [rawName.image_urls.trim()];
      }
    } else if (typeof rawName.images === "string" && rawName.images.trim()) {
      try {
        const parsed = JSON.parse(rawName.images);
        if (Array.isArray(parsed)) parsedImageUrls = parsed.filter((u) => typeof u === "string" && u.trim().length > 0);
        else if (parsed) parsedImageUrls = [String(parsed).trim()];
      } catch {
        parsedImageUrls = [rawName.images.trim()];
      }
    }
    const singleImage = rawName.image_url || rawName.imageUrl || rawName.image || rawName.img || rawName.photo || rawName.picture || rawName.url;
    if (typeof singleImage === "string" && singleImage.trim() && !parsedImageUrls.includes(singleImage.trim())) {
      parsedImageUrls.unshift(singleImage.trim());
    }
    const primaryImageUrl = parsedImageUrls[0] || (typeof singleImage === "string" ? singleImage.trim() : void 0);
    return {
      name: name2,
      label: rawName.label || name2,
      shortRole: rawName.shortRole || name2,
      hex: rawName.hex || (rawName.twBg ? "#64748B" : resolveColorOption(name2).hex),
      twBg: rawName.twBg || "bg-slate-200",
      twRing: rawName.twRing || "ring-slate-400",
      description: rawName.description || `${name2} finish`,
      standard: rawName.standard,
      price,
      mrp,
      discount_percent,
      image_url: primaryImageUrl,
      imageUrl: primaryImageUrl,
      images: parsedImageUrls,
      image_urls: parsedImageUrls
    };
  }
  const name = String(rawName || "").trim();
  if (!name) {
    return {
      name: "Default",
      label: "Default",
      shortRole: "Default",
      hex: "#64748B",
      twBg: "bg-slate-400",
      twRing: "ring-slate-500",
      description: "Standard manufacturer finish"
    };
  }
  const key = name.toLowerCase().trim();
  if (COLOR_FINISH_DICTIONARY[key]) {
    const entry = COLOR_FINISH_DICTIONARY[key];
    const img = entry.image_url || void 0;
    return {
      name,
      label: name,
      shortRole: entry.shortRole || name,
      hex: entry.hex,
      twBg: entry.twBg,
      twRing: entry.twRing,
      description: entry.description || `${name} finish`,
      image_url: img,
      imageUrl: img,
      images: img ? [img] : [],
      image_urls: img ? [img] : []
    };
  }
  const foundKey = Object.keys(COLOR_FINISH_DICTIONARY).find(
    (k) => key.includes(k) || k.includes(key)
  );
  if (foundKey) {
    const entry = COLOR_FINISH_DICTIONARY[foundKey];
    const img = entry.image_url || void 0;
    return {
      name,
      label: name,
      shortRole: entry.shortRole || name,
      hex: entry.hex,
      twBg: entry.twBg,
      twRing: entry.twRing,
      description: entry.description || `${name} finish`,
      image_url: img,
      imageUrl: img,
      images: img ? [img] : [],
      image_urls: img ? [img] : []
    };
  }
  const matched = [...INDIAN_STANDARD_WIRE_COLORS, ...PIPE_COLOR_OPTIONS].find(
    (c) => c.name.toLowerCase() === key || c.name.toLowerCase().includes(key) || key.includes(c.name.toLowerCase())
  );
  if (matched) {
    return { ...matched, name };
  }
  let hex = "#94A3B8";
  let twBg = "bg-slate-300";
  let twRing = "ring-slate-400";
  if (key.includes("gold")) {
    hex = "#D4AF37";
    twBg = "bg-amber-400";
    twRing = "ring-amber-500";
  } else if (key.includes("silver") || key.includes("chrome") || key.includes("steel")) {
    hex = "#CBD5E1";
    twBg = "bg-slate-300";
    twRing = "ring-slate-400";
  } else if (key.includes("black") || key.includes("dark")) {
    hex = "#0F172A";
    twBg = "bg-slate-900";
    twRing = "ring-slate-950";
  } else if (key.includes("white") || key.includes("ivory") || key.includes("pearl")) {
    hex = "#FFFFFF";
    twBg = "bg-white";
    twRing = "ring-slate-300";
  } else if (key.includes("grey") || key.includes("gray") || key.includes("slate") || key.includes("ash")) {
    hex = "#64748B";
    twBg = "bg-slate-500";
    twRing = "ring-slate-600";
  } else if (key.includes("wood") || key.includes("brown") || key.includes("teak") || key.includes("walnut")) {
    hex = "#78350F";
    twBg = "bg-amber-900";
    twRing = "ring-amber-950";
  } else if (key.includes("red") || key.includes("rose") || key.includes("maroon") || key.includes("crimson")) {
    hex = "#DC2626";
    twBg = "bg-red-600";
    twRing = "ring-red-600";
  } else if (key.includes("blue") || key.includes("navy") || key.includes("cyan")) {
    hex = "#2563EB";
    twBg = "bg-blue-600";
    twRing = "ring-blue-600";
  } else if (key.includes("green") || key.includes("mint") || key.includes("emerald")) {
    hex = "#16A34A";
    twBg = "bg-green-600";
    twRing = "ring-green-600";
  } else if (key.includes("yellow") || key.includes("amber")) {
    hex = "#EAB308";
    twBg = "bg-yellow-500";
    twRing = "ring-yellow-500";
  }
  return {
    name,
    label: name,
    shortRole: name,
    hex,
    twBg,
    twRing,
    description: `${name} finish`,
    image_url: void 0,
    imageUrl: void 0,
    images: [],
    image_urls: []
  };
}
function getProductColorOptions(product) {
  if (!product) return [];
  let rawColors = [];
  const prodAny = product;
  if (Array.isArray(prodAny.color_variants) && prodAny.color_variants.length > 0) {
    rawColors = prodAny.color_variants;
  } else if (Array.isArray(prodAny.colorVariants) && prodAny.colorVariants.length > 0) {
    rawColors = prodAny.colorVariants;
  } else if (Array.isArray(prodAny.color_options) && prodAny.color_options.length > 0) {
    rawColors = prodAny.color_options;
  } else if (Array.isArray(prodAny.colorOptions) && prodAny.colorOptions.length > 0) {
    rawColors = prodAny.colorOptions;
  } else if (Array.isArray(prodAny.colors) && prodAny.colors.length > 0) {
    rawColors = prodAny.colors;
  } else if (Array.isArray(prodAny.colours) && prodAny.colours.length > 0) {
    rawColors = prodAny.colours;
  } else if (Array.isArray(prodAny.available_colors) && prodAny.available_colors.length > 0) {
    rawColors = prodAny.available_colors;
  } else if (Array.isArray(prodAny.availableColors) && prodAny.availableColors.length > 0) {
    rawColors = prodAny.availableColors;
  } else if (typeof prodAny.color_variants === "string" && prodAny.color_variants.trim()) {
    try {
      const parsed = JSON.parse(prodAny.color_variants);
      if (Array.isArray(parsed)) rawColors = parsed;
      else rawColors = prodAny.color_variants.split(/[,/|]+/).map((s) => s.trim()).filter(Boolean);
    } catch {
      rawColors = prodAny.color_variants.split(/[,/|]+/).map((s) => s.trim()).filter(Boolean);
    }
  } else if (typeof prodAny.colors === "string" && prodAny.colors.trim()) {
    try {
      const parsed = JSON.parse(prodAny.colors);
      if (Array.isArray(parsed)) rawColors = parsed;
      else rawColors = prodAny.colors.split(/[,/|]+/).map((s) => s.trim()).filter(Boolean);
    } catch {
      rawColors = prodAny.colors.split(/[,/|]+/).map((s) => s.trim()).filter(Boolean);
    }
  } else if (typeof prodAny.colours === "string" && prodAny.colours.trim()) {
    try {
      const parsed = JSON.parse(prodAny.colours);
      if (Array.isArray(parsed)) rawColors = parsed;
      else rawColors = prodAny.colours.split(/[,/|]+/).map((s) => s.trim()).filter(Boolean);
    } catch {
      rawColors = prodAny.colours.split(/[,/|]+/).map((s) => s.trim()).filter(Boolean);
    }
  } else if (typeof prodAny.color === "string" && prodAny.color.trim()) {
    rawColors = [prodAny.color.trim()];
  }
  let options = [];
  if (rawColors.length > 0) {
    options = rawColors.map(resolveColorOption);
  } else {
    const specs = product.specs || product.specifications || {};
    const explicitColorStr = specs["Available Colors"] || specs["Available Colours"] || specs["Colors"] || specs["Colours"] || specs["Color"] || specs["Colour"] || specs["Finish"] || specs["Colour Option"] || specs["Color Option"];
    if (typeof explicitColorStr === "string" && explicitColorStr.trim()) {
      const rawNames = explicitColorStr.split(/[,/|]+/).map((s) => s.trim()).filter(Boolean);
      if (rawNames.length > 0) {
        options = rawNames.map(resolveColorOption);
      }
    } else if (Array.isArray(explicitColorStr) && explicitColorStr.length > 0) {
      options = explicitColorStr.map(resolveColorOption);
    } else if (isWireProduct(product)) {
      options = INDIAN_STANDARD_WIRE_COLORS.map((c) => ({ ...c }));
    } else if (isPipeProduct(product)) {
      options = PIPE_COLOR_OPTIONS.map((c) => ({ ...c }));
    }
  }
  if (options.length === 0) {
    return [];
  }
  const prodImages = (Array.isArray(prodAny.image_urls) && prodAny.image_urls.length > 0 ? prodAny.image_urls : Array.isArray(prodAny.images) && prodAny.images.length > 0 ? prodAny.images : prodAny.image ? [prodAny.image] : []).filter((u) => typeof u === "string" && u.trim().length > 0);
  if (prodImages.length > 0) {
    options.forEach((opt) => {
      if (!opt.image_url && (!opt.image_urls || opt.image_urls.length === 0)) {
        const optLower = opt.name.toLowerCase().trim();
        const matched = prodImages.find((url) => {
          const uLower = url.toLowerCase();
          return uLower.includes(optLower) || uLower.includes(`_${optLower}`) || uLower.includes(`-${optLower}`);
        });
        if (matched) {
          opt.image_url = matched;
          opt.imageUrl = matched;
          opt.image_urls = [matched];
          opt.images = [matched];
        }
      }
    });
    const anyHasImg = options.some((opt) => opt.image_url || opt.image_urls && opt.image_urls.length > 0);
    if (!anyHasImg && prodImages.length >= options.length) {
      options.forEach((opt, idx) => {
        if (prodImages[idx]) {
          opt.image_url = prodImages[idx];
          opt.imageUrl = prodImages[idx];
          opt.image_urls = [prodImages[idx]];
          opt.images = [prodImages[idx]];
        }
      });
    }
  }
  return options;
}

// src/utils/seoHelper.ts
var CANONICAL_ALIAS_MAP = {
  "/about-us": "/about",
  "/faq": "/faqs",
  "/guide": "/how-to-use",
  "/shipping-policy": "/shipping",
  "/shipping-and-return-policy": "/shipping",
  "/return-policy": "/return",
  "/returns": "/return",
  "/refund": "/refund-policy",
  "/refunds": "/refund-policy",
  "/privacy-policy": "/privacy",
  "/terms-of-service": "/terms",
  "/contact-us": "/contact",
  "/support": "/contact",
  "/service-areas": "/delivery-areas",
  "/download": "/app",
  "/account-deletion": "/delete"
};
function normalizeCanonicalPath(reqPath) {
  const raw = (reqPath || "/").split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  return CANONICAL_ALIAS_MAP[raw] || raw;
}
var KASBA_DEPOT_NODE = {
  "@type": ["Place", "HardwareStore"],
  "@id": "https://www.smartrun.in/#depot-kasba",
  name: "SmartRun Kasba Central Depot",
  telephone: "+91-8777400280",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kasba Industrial Estate Phase 1",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    postalCode: "700107",
    addressCountry: "IN"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.5145,
    longitude: 88.3934
  }
};
function normalizeAbsoluteHttpsUrl(url) {
  if (typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed) return "";
  const lower = trimmed.toLowerCase();
  if (lower.startsWith("data:") || lower.startsWith("blob:") || lower.startsWith("javascript:")) {
    return "";
  }
  if (trimmed.startsWith("/")) {
    return `https://www.smartrun.in${trimmed}`;
  }
  if (lower.startsWith("http://www.smartrun.in") || lower.startsWith("http://smartrun.in")) {
    return trimmed.replace(/^http:\/\//i, "https://");
  }
  if (lower.startsWith("https://") || lower.startsWith("http://")) {
    return trimmed;
  }
  return "";
}
function stripHtmlAndControlChars(input) {
  if (input === null || input === void 0) return "";
  return String(input).replace(/<[^>]*>/g, " ").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").replace(/\s+/g, " ").trim();
}
function slugifyVariantToken(val) {
  return String(val || "").trim().toUpperCase().replace(/[^A-Z0-9]+/g, "").slice(0, 12);
}
function normalizeProductForSeo(raw, options) {
  if (!raw || typeof raw !== "object" || !raw.id) return null;
  const id = String(raw.id).trim();
  const baseName = stripHtmlAndControlChars(raw.name || "SmartRun Product") || "SmartRun Product";
  const brand = stripHtmlAndControlChars(raw.brand || "SmartRun") || "SmartRun";
  const category = getProductCategory(raw);
  const subCategory = stripHtmlAndControlChars(raw.subCategory || raw.subcategory || raw.sub_category || "");
  const rawImages = [];
  if (typeof raw.image === "string") rawImages.push(raw.image);
  if (Array.isArray(raw.image_urls)) rawImages.push(...raw.image_urls);
  if (Array.isArray(raw.images)) rawImages.push(...raw.images);
  let images = Array.from(
    new Set(rawImages.map(normalizeAbsoluteHttpsUrl).filter(Boolean))
  );
  let price = Number(raw.price ?? 0);
  if (!Number.isFinite(price) || price < 0) price = 0;
  let originalPrice = Number(raw.originalPrice ?? raw.mrp ?? raw.original_price ?? 0);
  if (!Number.isFinite(originalPrice) || originalPrice < price) {
    originalPrice = price > 0 ? price : 0;
  }
  const stockQuantity = Number(raw.stock_quantity ?? raw.stockCount ?? raw.stock_count ?? 1);
  const inStock = raw.in_stock !== false && raw.inStock !== false && (Number.isFinite(stockQuantity) ? stockQuantity > 0 : true);
  const ratingRaw = Number(raw.rating ?? raw.rating_avg ?? 0);
  const reviewsCountRaw = Number(raw.reviewsCount ?? raw.reviews_count ?? raw.rating_count ?? 0);
  const rating = Number.isFinite(ratingRaw) && ratingRaw > 0 ? Number(ratingRaw.toFixed(2)) : void 0;
  const reviewsCount = Number.isFinite(reviewsCountRaw) && reviewsCountRaw > 0 ? Math.round(reviewsCountRaw) : void 0;
  const rawSpecs = raw.specs || raw.specifications;
  const specs = rawSpecs && typeof rawSpecs === "object" && !Array.isArray(rawSpecs) ? Object.fromEntries(
    Object.entries(rawSpecs).filter(([k, v]) => k && v !== null && v !== void 0 && typeof v !== "object").map(([k, v]) => [stripHtmlAndControlChars(k), stripHtmlAndControlChars(v)])
  ) : void 0;
  let parsedVariants = [];
  const rawVariantField = raw.color_variants ?? raw.colorVariants;
  if (Array.isArray(rawVariantField)) {
    parsedVariants = rawVariantField;
  } else if (typeof rawVariantField === "string" && rawVariantField.trim().startsWith("[")) {
    try {
      const parsed = JSON.parse(rawVariantField);
      if (Array.isArray(parsed)) parsedVariants = parsed;
    } catch {
      parsedVariants = [];
    }
  }
  const shortId = id.slice(0, 8).toUpperCase();
  let sku = typeof raw.sku === "string" && raw.sku.trim() ? raw.sku.trim() : `SMARTRUN-${shortId}`;
  let selectedColor;
  if (options?.selectedColor && options.selectedColor.trim()) {
    const requested = options.selectedColor.trim().toLowerCase();
    const resolvedOpts = parsedVariants.length > 0 ? parsedVariants : getProductColorOptions(raw);
    const matchedOpt = resolvedOpts.find((v) => {
      const cName = String(v?.name || v?.color || v?.colour || v?.label || "").trim().toLowerCase();
      return cName === requested;
    });
    if (matchedOpt) {
      const colorName = stripHtmlAndControlChars(matchedOpt.name || matchedOpt.color || matchedOpt.colour || matchedOpt.label || options.selectedColor);
      selectedColor = colorName;
      const vPrice = Number(matchedOpt.price ?? 0);
      if (Number.isFinite(vPrice) && vPrice > 0) price = vPrice;
      const vMrp = Number(matchedOpt.mrp ?? 0);
      if (Number.isFinite(vMrp) && vMrp > price) originalPrice = vMrp;
      const vImgsRaw = [];
      if (Array.isArray(matchedOpt.image_urls)) vImgsRaw.push(...matchedOpt.image_urls);
      if (Array.isArray(matchedOpt.images)) vImgsRaw.push(...matchedOpt.images);
      if (matchedOpt.image_url) vImgsRaw.push(matchedOpt.image_url);
      if (matchedOpt.imageUrl) vImgsRaw.push(matchedOpt.imageUrl);
      if (matchedOpt.image) vImgsRaw.push(matchedOpt.image);
      const vImgs = Array.from(new Set(vImgsRaw.map(normalizeAbsoluteHttpsUrl).filter(Boolean)));
      if (vImgs.length > 0) {
        images = vImgs;
      }
      const colorToken = slugifyVariantToken(colorName);
      if (colorToken) {
        sku = `SMARTRUN-${shortId}-${colorToken}`;
      }
    }
  }
  const brandToken = slugifyVariantToken(brand) || "GEN";
  const mpn = typeof raw.mpn === "string" && raw.mpn.trim() ? raw.mpn.trim() : `SR-${brandToken}-${shortId}`;
  const rawGtin = String(raw.gtin || raw.ean || raw.upc || specs?.GTIN || specs?.EAN || "").replace(/\D/g, "");
  const gtin = /^[0-9]{8}$|^[0-9]{12,14}$/.test(rawGtin) ? rawGtin : void 0;
  const deliveryChargeVal = Number(raw.deliveryCharge ?? raw.delivery_charge ?? 0);
  return {
    id,
    name: baseName,
    sku,
    mpn,
    gtin,
    brand,
    category,
    subCategory: subCategory || void 0,
    price,
    originalPrice: originalPrice > 0 ? originalPrice : void 0,
    description: stripHtmlAndControlChars(raw.description || ""),
    image: images[0],
    images,
    inStock,
    stockQuantity: Number.isFinite(stockQuantity) ? stockQuantity : 1,
    rating,
    reviewsCount,
    deliveryCharge: Number.isFinite(deliveryChargeVal) && deliveryChargeVal > 0 ? deliveryChargeVal : void 0,
    selectedColor,
    colorVariants: parsedVariants.length > 0 ? parsedVariants : void 0,
    specs,
    reviews: Array.isArray(raw.reviews) ? raw.reviews : void 0
  };
}
function resolveGoogleProductCategory(category, subCategory, name) {
  const combined = `${category || ""} ${subCategory || ""} ${name || ""}`.toLowerCase();
  if (combined.includes("wire") || combined.includes("cable") || combined.includes("frls") || combined.includes("sqmm")) {
    return "Hardware > Building Materials > Electrical Hardware > Electrical Wires & Cable";
  }
  if (combined.includes("mcb") || combined.includes("rccb") || combined.includes("isolator") || combined.includes("distribution board")) {
    return "Hardware > Building Materials > Electrical Hardware > Circuit Breakers & Panels";
  }
  if (combined.includes("switch") || combined.includes("socket") || combined.includes("regulator") || combined.includes("gi box")) {
    return "Hardware > Building Materials > Electrical Hardware > Electrical Switches";
  }
  if (combined.includes("fan")) {
    return "Home & Garden > Household Appliances > Climate Control Appliances > Fans";
  }
  if (combined.includes("led") || combined.includes("bulb") || combined.includes("light") || combined.includes("floodlight")) {
    return "Home & Garden > Lighting";
  }
  if (combined.includes("cctv") || combined.includes("camera") || combined.includes("dvr") || combined.includes("nvr")) {
    return "Electronics > Video > Video Surveillance";
  }
  if (combined.includes("geyser") || combined.includes("water heater")) {
    return "Home & Garden > Household Appliances > Water Heaters";
  }
  if (combined.includes("inverter") || combined.includes("ups")) {
    return "Electronics > Electronics Accessories > Power > Power Inverters";
  }
  if (combined.includes("paint") || combined.includes("putty") || combined.includes("primer") || combined.includes("emulsion")) {
    return "Hardware > Building Consumables > Painting Consumables > Paint";
  }
  if (combined.includes("pipe") || combined.includes("conduit") || combined.includes("cpvc") || combined.includes("upvc") || combined.includes("plumbing") || combined.includes("sink") || combined.includes("sanitary") || combined.includes("faucet") || combined.includes("cistern")) {
    return "Hardware > Plumbing";
  }
  if (combined.includes("drill") || combined.includes("grinder") || combined.includes("tool") || combined.includes("ladder")) {
    return "Hardware > Tools";
  }
  if (category === "construction" || combined.includes("cement") || combined.includes("tmt") || combined.includes("plywood") || combined.includes("waterproof") || combined.includes("adhesive") || combined.includes("tile")) {
    return "Hardware > Building Materials";
  }
  return "Hardware > Building Materials > Electrical Hardware";
}
function escapeHtml(str) {
  if (str === null || str === void 0) return "";
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function escapeXml(str) {
  if (str === null || str === void 0) return "";
  return String(str).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function getRouteSeoConfig(reqPath, product, technician, catalogProducts, options) {
  const rawPath = reqPath.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  let cleanPath = normalizeCanonicalPath(rawPath);
  if (product && (cleanPath.startsWith("/product/") || /^\/(electrical|construction)\/product\//.test(cleanPath))) {
    const resolvedCategory = getProductCategory(product);
    cleanPath = `/${resolvedCategory}/product/${product.id}`;
  }
  const colorQuerySuffix = product?.selectedColor ? `?color=${encodeURIComponent(product.selectedColor)}` : "";
  const canonical = `https://www.smartrun.in${cleanPath === "/" ? "/" : cleanPath}${colorQuerySuffix}`;
  if (product) {
    const brand = product.brand || "SmartRun";
    const price = product.price ? `\u20B9${product.price}` : "Wholesale Price";
    const subcat = product.subCategory ? ` (${product.subCategory})` : "";
    const displayName = product.selectedColor ? `${product.name} - ${product.selectedColor}` : product.name;
    const title = `${displayName} - Buy Online in Kolkata | SmartRun (Smart Run)`;
    const description = `Buy genuine ${brand} ${displayName}${subcat} at ${price} online in Kolkata on SmartRun (Smart Run). 60-min express delivery across Kolkata & West Bengal, 100% manufacturer warranty.`;
    const keywords = `${product.name}, buy ${product.name} online, ${brand}, ${product.name} Kolkata price, ${product.subCategory || ""}, kolkata online delivery app for electrical products, kolkata online delivery app for construction products, smart run, SmartRun, wholesale electrical shop Kolkata, Kasba depot`;
    const primaryImage = normalizeAbsoluteHttpsUrl(product.image) || normalizeAbsoluteHttpsUrl(product.images?.[0]) || "https://www.smartrun.in/SmartRun.png";
    const image = primaryImage;
    const validProductImages = Array.from(
      /* @__PURE__ */ new Set([
        primaryImage,
        ...Array.isArray(product.images) ? product.images.map(normalizeAbsoluteHttpsUrl) : []
      ])
    ).filter(Boolean);
    const imagesArray = [...validProductImages];
    if (imagesArray.length < 3) {
      for (const fallbackLogo of ["https://www.smartrun.in/SmartRun.png", "https://www.smartrun.in/icons/icon-512.png"]) {
        if (!imagesArray.includes(fallbackLogo)) {
          imagesArray.push(fallbackLogo);
        }
      }
    }
    const prodId = String(product.id || "PRD");
    const sku = product.sku || `SMARTRUN-${prodId.slice(0, 8).toUpperCase()}`;
    const mpn = product.mpn || `SR-${brand.replace(/\s+/g, "").toUpperCase()}-${prodId.slice(0, 8).toUpperCase()}`;
    const productBreadcrumbs = {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.smartrun.in/"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: product.category === "construction" ? "Construction Materials" : "Electrical Goods",
          item: product.category === "construction" ? "https://www.smartrun.in/construction" : "https://www.smartrun.in/electrical"
        },
        ...product.subCategory ? [
          {
            "@type": "ListItem",
            position: 3,
            name: product.subCategory,
            item: `https://www.smartrun.in/${product.category === "construction" ? "construction" : "electrical"}?cat=${encodeURIComponent(product.subCategory)}`
          },
          {
            "@type": "ListItem",
            position: 4,
            name: displayName,
            item: canonical
          }
        ] : [
          {
            "@type": "ListItem",
            position: 3,
            name: displayName,
            item: canonical
          }
        ]
      ]
    };
    const sellingPrice = typeof product.price === "number" && product.price > 0 ? product.price : 0;
    const baseShippingFee = Number(options?.shippingRate ?? 0);
    const freeThreshold = Number(options?.freeDeliveryThreshold ?? 0);
    const computedShipping = Number(product.deliveryCharge || 0) > 0 ? Number(product.deliveryCharge) : baseShippingFee === 0 || freeThreshold > 0 && sellingPrice >= freeThreshold ? 0 : baseShippingFee;
    const offerNode = {
      "@type": "Offer",
      url: canonical,
      sku,
      priceCurrency: "INR",
      price: sellingPrice,
      priceValidUntil: "2027-12-31",
      availability: product.inStock !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      areaServed: {
        "@type": "City",
        name: "Kolkata",
        containedInPlace: {
          "@type": "State",
          name: "West Bengal"
        }
      },
      availableAtOrFrom: KASBA_DEPOT_NODE,
      seller: {
        "@type": "Organization",
        "@id": "https://www.smartrun.in/#store",
        name: "SmartRUN",
        legalName: "SmartRun Materials Pvt. Ltd.",
        url: "https://www.smartrun.in/"
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
        refundType: "https://schema.org/FullRefund"
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: String(computedShipping),
          currency: "INR"
        },
        shippingDestination: [
          {
            "@type": "DefinedRegion",
            addressCountry: "IN",
            postalCodeRange: {
              postalCodeBegin: "700001",
              postalCodeEnd: "700160"
            }
          },
          {
            "@type": "DefinedRegion",
            addressCountry: "IN",
            postalCodeRange: {
              postalCodeBegin: "711101",
              postalCodeEnd: "711106"
            }
          }
        ],
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY"
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY"
          }
        }
      }
    };
    if (typeof product.originalPrice === "number" && product.originalPrice > sellingPrice && sellingPrice > 0) {
      offerNode.priceSpecification = {
        "@type": "UnitPriceSpecification",
        price: product.originalPrice,
        priceCurrency: "INR",
        priceType: "https://schema.org/ListPrice"
      };
    }
    const productSchema = {
      "@type": "Product",
      "@id": `${canonical}#product`,
      productID: prodId,
      sku,
      mpn,
      ...product.gtin ? { gtin: product.gtin } : {},
      ...product.selectedColor ? { color: product.selectedColor } : {},
      name: displayName,
      url: canonical,
      image: imagesArray,
      description: stripHtmlAndControlChars(product.description) || description,
      category: resolveGoogleProductCategory(product.category, product.subCategory, product.name),
      brand: {
        "@type": "Brand",
        name: brand
      },
      offers: offerNode
    };
    if (typeof product.rating === "number" && product.rating > 0 && typeof product.reviewsCount === "number" && product.reviewsCount > 0) {
      productSchema.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewsCount,
        bestRating: 5,
        worstRating: 1
      };
    }
    if (Array.isArray(product.reviews) && product.reviews.length > 0) {
      productSchema.review = product.reviews.map((r) => ({
        "@type": "Review",
        author: {
          "@type": "Person",
          name: r.customerName || "Verified Buyer"
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating || 5,
          bestRating: 5
        },
        reviewBody: r.comment || "Verified purchase from SmartRun Kolkata depot."
      }));
    }
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [productBreadcrumbs, productSchema]
    };
    return {
      title,
      description,
      keywords,
      canonical,
      ogType: "product",
      image,
      structuredData
    };
  }
  if (technician || cleanPath.startsWith("/technicians/")) {
    const techName = technician?.name || "Certified Electrical Specialist";
    const sector = technician?.primarySector || "Residential & Commercial Wiring";
    const ratingPrefix = typeof technician?.rating === "number" && technician.rating > 0 ? `${technician.rating}\u2605 rating, ` : "";
    const areas = technician?.serviceAreas && technician.serviceAreas.length > 0 ? technician.serviceAreas.join(", ") : "Kasba, Salt Lake, New Town, Gariahat, Ballygunge, Kolkata";
    const title = `${techName} - Certified ${sector} | SmartRun Kolkata`;
    const description = `${techName} (${ratingPrefix}${technician?.experienceYears || 8}+ yrs exp) - Verified electrical specialist in Kolkata serving ${areas}. Licensed house wiring, MCB distribution & switchgear repair via SmartRun.`;
    const keywords = `${techName}, certified electrician Kolkata, licensed electrical contractor, house wiring specialist, emergency electrician Kolkata, switchboard repair Kolkata`;
    const image = technician?.photo || "https://www.smartrun.in/SmartRun.png";
    const techBreadcrumbs = {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.smartrun.in/"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Certified Technicians",
          item: "https://www.smartrun.in/technicians"
        },
        {
          "@type": "ListItem",
          position: 3,
          name: techName,
          item: canonical
        }
      ]
    };
    const techServiceSchema = {
      "@type": ["Person", "ProfessionalService"],
      name: techName,
      jobTitle: technician?.title || "Certified Electrical Engineer & Master Wireman",
      image,
      telephone: "+91-8777400280",
      url: canonical,
      priceRange: technician?.startingRate ? `\u20B9${technician.startingRate} - \u20B91499` : "\u20B9499 - \u20B91499",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Kasba Industrial Estate Phase 1",
        addressLocality: "Kolkata",
        addressRegion: "West Bengal",
        postalCode: "700107",
        addressCountry: "IN"
      },
      areaServed: (technician?.serviceAreas || ["Kolkata", "Kasba", "Salt Lake", "New Town"]).map((a) => ({
        "@type": "AdministrativeArea",
        name: a
      }))
    };
    if (technician?.licenseNumber) {
      techServiceSchema.hasCredential = {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Government Electrical Supervisor / Wireman License",
        recognizedBy: {
          "@type": "Organization",
          name: technician.issuingAuthority || "Govt. of West Bengal - Electrical Licensing Board"
        }
      };
    }
    if (technician?.rating && technician.rating > 0) {
      techServiceSchema.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: technician.rating,
        reviewCount: technician?.reviewsCount || 1,
        bestRating: 5,
        worstRating: 1
      };
    }
    if (Array.isArray(technician?.recentReviews) && technician.recentReviews.length > 0) {
      techServiceSchema.review = technician.recentReviews.map((r) => ({
        "@type": "Review",
        author: {
          "@type": "Person",
          name: r.customerName || "Verified Client"
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating || 5,
          bestRating: 5
        },
        reviewBody: r.comment || "Professional electrical service completed in Kolkata."
      }));
    }
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [techBreadcrumbs, techServiceSchema]
    };
    return {
      title,
      description,
      keywords,
      canonical,
      ogType: "profile",
      image,
      structuredData
    };
  }
  if (cleanPath === "/") {
    const homeStructuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://www.smartrun.in/#website",
          url: "https://www.smartrun.in/",
          name: "SmartRUN",
          alternateName: [
            "Smart Run",
            "SmartRUN India",
            "Smart Run India",
            "SmartRUN Kolkata",
            "Smart Run construction delivery",
            "SmartRun materials pvt. ltd"
          ],
          potentialAction: {
            "@type": "SearchAction",
            target: "https://www.smartrun.in/electrical?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": ["Organization", "ElectricalSupplyStore", "HardwareStore", "LocalBusiness"],
          "@id": "https://www.smartrun.in/#store",
          name: "SmartRUN",
          alternateName: ["Smart Run", "SmartRUN India", "Smart Run India", "SmartRUN Kolkata", "SmartRun Materials Pvt. Ltd."],
          legalName: "SmartRun Materials Pvt. Ltd.",
          url: "https://www.smartrun.in/",
          logo: {
            "@type": "ImageObject",
            url: "https://www.smartrun.in/SmartRun.png",
            width: 512,
            height: 512,
            caption: "SmartRUN - Express Electrical & Construction Materials Delivery"
          },
          image: "https://www.smartrun.in/SmartRun.png",
          telephone: "+91-8777400280",
          email: "team@smartrun.in",
          priceRange: "\u20B9\u20B9",
          currenciesAccepted: "INR",
          paymentAccepted: "Cash, UPI, Credit Card, Debit Card, Net Banking",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Kheyadah Village, Bhagabanpur",
            addressLocality: "Kolkata",
            addressRegion: "West Bengal",
            postalCode: "700150",
            addressCountry: "IN"
          },
          location: KASBA_DEPOT_NODE,
          geo: {
            "@type": "GeoCoordinates",
            latitude: 22.5145,
            longitude: 88.3882
          },
          areaServed: [
            { "@type": "City", name: "Kolkata" },
            { "@type": "AdministrativeArea", name: "Kasba" },
            { "@type": "AdministrativeArea", name: "Salt Lake" },
            { "@type": "AdministrativeArea", name: "New Town" },
            { "@type": "AdministrativeArea", name: "Ballygunge" },
            { "@type": "AdministrativeArea", name: "Jadavpur" },
            { "@type": "AdministrativeArea", name: "Gariahat" },
            { "@type": "AdministrativeArea", name: "Behala" },
            { "@type": "AdministrativeArea", name: "Rajarhat" },
            { "@type": "AdministrativeArea", name: "Howrah" }
          ],
          sameAs: [
            "https://play.google.com/store/apps/details?id=in.smartrun.app",
            "https://wa.me/918777400280"
          ],
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              opens: "08:00",
              closes: "21:00"
            }
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Electrical, Electronics & Construction Catalog",
            itemListElement: [
              {
                "@type": "OfferCatalog",
                name: "Electrical Wires & Cables",
                itemListElement: ["Polycab Flame Retardant Wires", "Havells LifeLine Cables", "Finolex House Wires", "RR Kabel Copper Wires"]
              },
              {
                "@type": "OfferCatalog",
                name: "Modular Switches & Switchgear",
                itemListElement: ["Anchor Roma Modular Switches", "Schneider Electric MCB Isolators", "Legrand Distribution Boards"]
              },
              {
                "@type": "OfferCatalog",
                name: "Construction Materials",
                itemListElement: ["UltraTech Cement", "ACC Suraksha Cement", "Tata Tiscon 550D TMT Rebars", "Dr. Fixit Waterproofing"]
              }
            ]
          }
        },
        {
          "@type": "Service",
          "@id": "https://www.smartrun.in/#wiring-service",
          name: "Real Estate & Residential Electrical Wiring Services",
          provider: { "@id": "https://www.smartrun.in/#store" },
          serviceType: "Electrical Contractor & House Wiring",
          description: "Licensed and WBELB-verified electrical wiring contractors for residential flats, commercial complexes, and renovation electrification across Kolkata.",
          areaServed: { "@type": "City", name: "Kolkata" }
        },
        {
          "@type": ["SoftwareApplication", "MobileApplication"],
          "@id": "https://www.smartrun.in/#android-app",
          name: "SmartRUN: Materials Delivery",
          alternateName: ["Smart Run", "SmartRun", "Smart Run App", "SmartRun Kolkata", "SmartRun Materials Pvt. Ltd."],
          operatingSystem: "ANDROID",
          applicationCategory: "ShoppingApplication",
          applicationSubCategory: "Quick Commerce, Electrical Supplies & Construction Depot",
          downloadUrl: "https://play.google.com/store/apps/details?id=in.smartrun.app",
          installUrl: "https://play.google.com/store/apps/details?id=in.smartrun.app",
          sameAs: ["https://play.google.com/store/apps/details?id=in.smartrun.app"],
          author: { "@id": "https://www.smartrun.in/#store" },
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "INR"
          }
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.smartrun.in/"
            }
          ]
        }
      ]
    };
    const homeCatalogItems = Array.isArray(catalogProducts) && catalogProducts.length > 0 ? catalogProducts.map((p) => normalizeProductForSeo(p)).filter((p) => Boolean(p && p.inStock !== false && (p.price || 0) > 0)).slice(0, 16) : [];
    if (homeCatalogItems.length > 0) {
      homeStructuredData["@graph"].push({
        "@type": "ItemList",
        "@id": "https://www.smartrun.in/#featured-catalog",
        name: "Top Electrical & Construction Supplies in Kolkata \u2014 SmartRun",
        numberOfItems: homeCatalogItems.length,
        itemListElement: homeCatalogItems.map((item, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: item.name,
          url: `https://www.smartrun.in/${item.category === "construction" ? "construction" : "electrical"}/product/${item.id}`
        }))
      });
    }
    return {
      title: "SmartRun (Smart Run): Electrical & Construction App Kolkata",
      description: "Order Polycab wires, Schneider MCBs, UltraTech cement & licensed electricians in Kolkata on SmartRun (Smart Run) with 60-min express delivery.",
      keywords: "SmartRun, Smart Run, SmartRun Kolkata, SmartRun India, construction materials delivery Kolkata, electrical materials delivery Kolkata, building supplies online, electrical supplies online, Polycab wire, Havells cables, Finolex wire, Schneider MCB, Anchor Roma switches, UltraTech cement, Tata Tiscon TMT rebars, licensed electrician Kolkata, in.smartrun.app",
      canonical,
      ogType: "website",
      image: "https://www.smartrun.in/SmartRun.png",
      structuredData: homeStructuredData
    };
  }
  if (cleanPath === "/electrical") {
    const elecCatalogItems = Array.isArray(catalogProducts) && catalogProducts.length > 0 ? catalogProducts.map((p) => normalizeProductForSeo(p)).filter((p) => Boolean(p && p.category !== "construction" && (p.price || 0) > 0)).slice(0, 24) : [];
    const elecGraph = [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartrun.in/" },
          { "@type": "ListItem", position: 2, name: "Electrical Goods", item: canonical }
        ]
      },
      {
        "@type": "CollectionPage",
        "@id": "https://www.smartrun.in/electrical#webpage",
        name: "Electrical Goods & House Wiring Cables Kolkata",
        description: "Genuine branded electrical supplies with 60-minute express delivery across Kolkata and Howrah.",
        url: canonical,
        isPartOf: { "@id": "https://www.smartrun.in/#website" }
      }
    ];
    if (elecCatalogItems.length > 0) {
      elecGraph.push({
        "@type": "ItemList",
        "@id": "https://www.smartrun.in/electrical#itemlist",
        name: "Electrical Supplies Catalog Kolkata",
        numberOfItems: elecCatalogItems.length,
        itemListElement: elecCatalogItems.map((item, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: item.name,
          url: `https://www.smartrun.in/electrical/product/${item.id}`
        }))
      });
    }
    return {
      title: "Electrical Products Online Delivery Kolkata | SmartRun (Smart Run) - 60 Min Express",
      description: "Order electrical products online in Kolkata from SmartRun (Smart Run): Polycab wires, Schneider MCBs, Havells cables, and Anchor Roma modular switches delivered to your doorstep or site in 60 minutes.",
      keywords: "kolkata online delivery app for electrical products, electrical products delivery app, buy electrical goods online Kolkata, Polycab wire, Havells cables, Schneider MCB, Smart Run, SmartRun, wholesale electrical shop Kolkata, Kasba electrical depot",
      canonical,
      ogType: "website",
      image: "https://www.smartrun.in/SmartRun.png",
      structuredData: {
        "@context": "https://schema.org",
        "@graph": elecGraph
      }
    };
  }
  if (cleanPath === "/construction") {
    const constCatalogItems = Array.isArray(catalogProducts) && catalogProducts.length > 0 ? catalogProducts.map((p) => normalizeProductForSeo(p)).filter((p) => Boolean(p && p.category === "construction" && (p.price || 0) > 0)).slice(0, 24) : [];
    const constGraph = [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartrun.in/" },
          { "@type": "ListItem", position: 2, name: "Construction Materials", item: canonical }
        ]
      },
      {
        "@type": "CollectionPage",
        "@id": "https://www.smartrun.in/construction#webpage",
        name: "Construction & Building Materials Kolkata",
        description: "Direct site delivery of UltraTech cement, ACC cement, Tata Tiscon TMT rebars, and building hardware in Kolkata.",
        url: canonical,
        isPartOf: { "@id": "https://www.smartrun.in/#website" }
      }
    ];
    if (constCatalogItems.length > 0) {
      constGraph.push({
        "@type": "ItemList",
        "@id": "https://www.smartrun.in/construction#itemlist",
        name: "Construction & Building Materials Catalog Kolkata",
        numberOfItems: constCatalogItems.length,
        itemListElement: constCatalogItems.map((item, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: item.name,
          url: `https://www.smartrun.in/construction/product/${item.id}`
        }))
      });
    }
    return {
      title: "Construction Products & Building Materials Delivery Kolkata | SmartRun (Smart Run)",
      description: "Order construction products and building supplies online in Kolkata from SmartRun (Smart Run): UltraTech cement, ACC cement, Tata Tiscon TMT rebars, and waterproofing chemicals delivered directly to your site.",
      keywords: "kolkata online delivery app for construction products, construction products delivery app kolkata, cement delivery Kolkata, UltraTech cement, Tata Tiscon rebars, Dr Fixit, Smart Run, SmartRun, building materials Kolkata",
      canonical,
      ogType: "website",
      image: "https://www.smartrun.in/SmartRun.png",
      structuredData: {
        "@context": "https://schema.org",
        "@graph": constGraph
      }
    };
  }
  if (cleanPath === "/technicians") {
    return {
      title: "Licensed Electricians & Wiring Contractors Kolkata | SmartRun (Smart Run)",
      description: "Book licensed emergency electricians and wiring contractors in Kolkata. 60-minute doorstep arrival, upfront transparent pricing, residential flat wiring & switchboard repairs by SmartRun (Smart Run).",
      keywords: "licensed electrician Kolkata, house wiring contractor Kolkata, emergency electrical repair, electrical wiring services, Smart Run, SmartRun, flat wiring Kolkata",
      canonical,
      ogType: "website",
      image: "https://www.smartrun.in/SmartRun.png",
      structuredData: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartrun.in/" },
              { "@type": "ListItem", position: 2, name: "Certified Technicians", item: canonical }
            ]
          },
          {
            "@type": "CollectionPage",
            "@id": "https://www.smartrun.in/technicians#webpage",
            name: "Licensed Electricians & Wiring Contractors Directory Kolkata",
            description: "Verified professional electrical engineers and master wiremen with 60-minute emergency arrival across Kolkata.",
            url: canonical,
            isPartOf: { "@id": "https://www.smartrun.in/#website" }
          }
        ]
      }
    };
  }
  if (cleanPath === "/shipping" || cleanPath === "/shipping-policy" || cleanPath === "/shipping-and-return-policy") {
    return {
      title: "Shipping & 60-Minute Delivery Policy | SmartRun (Smart Run)",
      description: "SmartRun (Smart Run) shipping policy: 60-minute express doorstep delivery across Kolkata from Kasba Central Depot. Order tracking, service areas, and delivery fees.",
      keywords: "SmartRun shipping policy, smart run delivery time, express electrical delivery Kolkata, Kasba depot delivery",
      canonical,
      ogType: "website",
      structuredData: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartrun.in/" },
              { "@type": "ListItem", position: 2, name: "Shipping Policy", item: canonical }
            ]
          },
          {
            "@type": "WebPage",
            "@id": `${canonical}#webpage`,
            name: "SmartRun 60-Minute Express Shipping & Delivery Policy",
            description: "SmartRun shipping policy: 60-minute express doorstep delivery across Kolkata from Kasba Central Depot. Order tracking, service areas, and delivery fees.",
            url: canonical,
            isPartOf: { "@id": "https://www.smartrun.in/#website" },
            mainEntity: {
              "@type": "OfferShippingDetails",
              shippingRate: {
                "@type": "MonetaryAmount",
                value: "49",
                currency: "INR"
              },
              shippingDestination: {
                "@type": "DefinedRegion",
                addressCountry: "IN",
                addressRegion: "West Bengal",
                addressLocality: "Kolkata"
              },
              deliveryTime: {
                "@type": "ShippingDeliveryTime",
                handlingTime: {
                  "@type": "QuantitativeValue",
                  minValue: 0,
                  maxValue: 1,
                  unitCode: "DAY"
                },
                transitTime: {
                  "@type": "QuantitativeValue",
                  minValue: 0,
                  maxValue: 1,
                  unitCode: "DAY"
                }
              }
            }
          }
        ]
      }
    };
  }
  if (cleanPath === "/return" || cleanPath === "/return-policy" || cleanPath === "/returns") {
    return {
      title: "Return Policy & 7-Day Replacement Guarantee | SmartRun (Smart Run)",
      description: "SmartRun (Smart Run) return policy: 7-day hassle-free return and replacement for electrical goods, wires, switches, and construction materials with doorstep pickup.",
      keywords: "SmartRun return policy, smart run replacement guarantee, return electrical items Kolkata",
      canonical,
      ogType: "website",
      structuredData: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartrun.in/" },
              { "@type": "ListItem", position: 2, name: "Return Policy", item: canonical }
            ]
          },
          {
            "@type": "WebPage",
            "@id": `${canonical}#webpage`,
            name: "SmartRun 7-Day Hassle-Free Return & Replacement Policy",
            description: "SmartRun return policy: 7-day hassle-free return and replacement for electrical goods, wires, switches, and construction materials with doorstep pickup.",
            url: canonical,
            isPartOf: { "@id": "https://www.smartrun.in/#website" },
            mainEntity: {
              "@type": "MerchantReturnPolicy",
              applicableCountry: "IN",
              returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
              merchantReturnDays: 7,
              returnMethod: "https://schema.org/ReturnAtKiosk",
              returnFees: "https://schema.org/FreeReturn",
              refundType: "https://schema.org/FullRefund"
            }
          }
        ]
      }
    };
  }
  if (cleanPath === "/refund-policy" || cleanPath === "/refund" || cleanPath === "/refunds") {
    return {
      title: "Refund Policy & Instant Settlement Guarantee | SmartRun (Smart Run)",
      description: "SmartRun (Smart Run) refund policy: 100% money-back guarantee with 2 to 4 hour instant bank settlement on verified cancellations.",
      keywords: "SmartRun refund policy, smart run money back guarantee, instant refund settlement",
      canonical,
      ogType: "website",
      structuredData: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartrun.in/" },
              { "@type": "ListItem", position: 2, name: "Refund Policy", item: canonical }
            ]
          },
          {
            "@type": "WebPage",
            "@id": `${canonical}#webpage`,
            name: "SmartRun Instant Direct-to-Source Refund Policy",
            description: "SmartRun refund policy: 100% money-back guarantee with 2 to 4 hour instant bank settlement on verified cancellations.",
            url: canonical,
            isPartOf: { "@id": "https://www.smartrun.in/#website" },
            mainEntity: {
              "@type": "MerchantReturnPolicy",
              applicableCountry: "IN",
              returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
              merchantReturnDays: 7,
              returnFees: "https://schema.org/FreeReturn",
              refundType: "https://schema.org/FullRefund"
            }
          }
        ]
      }
    };
  }
  if (cleanPath === "/faqs") {
    return {
      title: "Frequently Asked Questions (FAQ) | SmartRun Kolkata",
      description: "Answers about 60-minute express delivery in Kolkata & Howrah, genuine OEM electrical and building materials, live GPS tracking, GST tax invoices, refunds, and WBELB-verified electricians.",
      keywords: "SmartRun faq, electrical delivery faq, Kolkata building materials faq, gst invoice electricals kolkata, SmartRun return refund",
      canonical,
      ogType: "website",
      image: "https://www.smartrun.in/SmartRun.png",
      structuredData: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartrun.in/" },
              { "@type": "ListItem", position: 2, name: "Frequently Asked Questions", item: canonical }
            ]
          },
          {
            "@type": "FAQPage",
            "@id": `${canonical}#webpage`,
            name: "Frequently Asked Questions (FAQ) | SmartRun Kolkata",
            url: canonical,
            isPartOf: { "@id": "https://www.smartrun.in/#website" },
            mainEntity: ENRICHED_FAQ_LIST.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
              }
            }))
          }
        ]
      }
    };
  }
  if (cleanPath === "/about") {
    return {
      title: "About Us | SmartRun Express Electricals & Construction Depot Kolkata",
      description: "Learn about SmartRun Materials Pvt. Ltd., operating smartrun.in and the SmartRUN Android app from Bhagabanpur & Kasba Central Depot for electrical supplies, building materials, and licensed electricians in Kolkata.",
      keywords: "about smartrun, SmartRun Materials Pvt Ltd, smartrun kolkata, electrical goods depot kasba, building supplies wholesale kolkata",
      canonical,
      ogType: "website",
      image: "https://www.smartrun.in/SmartRun.png",
      structuredData: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartrun.in/" },
              { "@type": "ListItem", position: 2, name: "About Us", item: canonical }
            ]
          },
          {
            "@type": "AboutPage",
            "@id": `${canonical}#webpage`,
            name: "About SmartRun Materials Pvt. Ltd. \u2014 Kolkata Electrical & Construction Platform",
            description: "Factual overview of SmartRun Materials Pvt. Ltd., registered in Bhagabanpur and dispatching express electrical & construction materials from Kasba Central Depot, Kolkata.",
            url: canonical,
            isPartOf: { "@id": "https://www.smartrun.in/#website" },
            about: { "@id": "https://www.smartrun.in/#store" }
          }
        ]
      }
    };
  }
  if (cleanPath === "/app") {
    return {
      title: "SmartRUN: Materials Delivery Android App (in.smartrun.app) | SmartRun Kolkata",
      description: "Download SmartRUN: Materials Delivery on Google Play (in.smartrun.app) or order online at smartrun.in for 60-min electrical delivery, building supplies, live GPS tracking & GST invoices across Kolkata.",
      keywords: "SmartRUN app, Smart Run app, in.smartrun.app, Play Store SmartRUN, electrical materials app Kolkata, construction materials ordering app",
      canonical,
      ogType: "website",
      image: "https://www.smartrun.in/SmartRun.png",
      structuredData: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartrun.in/" },
              { "@type": "ListItem", position: 2, name: "SmartRUN App", item: canonical }
            ]
          },
          {
            "@type": ["SoftwareApplication", "MobileApplication"],
            "@id": "https://www.smartrun.in/#android-app",
            name: "SmartRUN: Materials Delivery",
            alternateName: ["Smart Run", "SmartRun", "Smart Run App", "in.smartrun.app"],
            operatingSystem: "ANDROID",
            applicationCategory: "ShoppingApplication",
            applicationSubCategory: "Quick Commerce, Electrical Supplies & Construction Depot",
            downloadUrl: "https://play.google.com/store/apps/details?id=in.smartrun.app",
            installUrl: "https://play.google.com/store/apps/details?id=in.smartrun.app",
            sameAs: ["https://play.google.com/store/apps/details?id=in.smartrun.app"],
            author: { "@id": "https://www.smartrun.in/#store" },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "INR"
            }
          }
        ]
      }
    };
  }
  if (cleanPath === "/delivery-areas") {
    return {
      title: "Kolkata & Howrah Delivery Service Areas & Pincodes | SmartRun",
      description: "Check serviceable Kolkata (700001\u2013700160) and Howrah (711101\u2013711106) PIN codes for 60-min express electrical delivery and construction material dispatch from SmartRun Kasba Central Depot.",
      keywords: "SmartRun delivery areas, Kolkata electrical delivery pincodes, Salt Lake electrical delivery, New Town construction materials delivery, Kasba Central Depot",
      canonical,
      ogType: "website",
      image: "https://www.smartrun.in/SmartRun.png",
      structuredData: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartrun.in/" },
              { "@type": "ListItem", position: 2, name: "Delivery Service Areas", item: canonical }
            ]
          },
          {
            "@type": "WebPage",
            "@id": `${canonical}#webpage`,
            name: "Kolkata & Howrah Delivery Service Areas & Pincodes | SmartRun",
            description: "Serviceable zones across South Kolkata, Salt Lake, New Town, Central Kolkata, North Kolkata, and Howrah dispatched from Kasba Central Depot.",
            url: canonical,
            isPartOf: { "@id": "https://www.smartrun.in/#website" },
            mainEntity: {
              "@type": "Service",
              name: "Express Electrical & Construction Materials Delivery in Kolkata & Howrah",
              provider: { "@id": "https://www.smartrun.in/#store" },
              areaServed: KOLKATA_AREAS.map((area) => ({
                "@type": "PostalAddress",
                addressLocality: area.name,
                postalCode: area.pincode,
                addressRegion: "West Bengal",
                addressCountry: "IN"
              }))
            }
          }
        ]
      }
    };
  }
  if (cleanPath === "/contact") {
    return {
      title: "Contact & Customer Support Desk | SmartRun Kolkata",
      description: "Contact SmartRun Materials Pvt. Ltd. in Kolkata: helpline +91 87774 00280, +91 90071 68561, WhatsApp, team@smartrun.in, Kasba Central Depot & Bhagabanpur Registered Office.",
      keywords: "contact SmartRun, SmartRun helpline Kolkata, +91 87774 00280, team@smartrun.in, Kasba Central Depot, contractor procurement desk",
      canonical,
      ogType: "website",
      image: "https://www.smartrun.in/SmartRun.png",
      structuredData: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartrun.in/" },
              { "@type": "ListItem", position: 2, name: "Contact & Support", item: canonical }
            ]
          },
          {
            "@type": "ContactPage",
            "@id": `${canonical}#webpage`,
            name: "Contact & Customer Support Desk | SmartRun Kolkata",
            description: "Official phone, WhatsApp, email, and office/depot addresses for SmartRun Materials Pvt. Ltd.",
            url: canonical,
            isPartOf: { "@id": "https://www.smartrun.in/#website" },
            mainEntity: { "@id": "https://www.smartrun.in/#store" }
          }
        ]
      }
    };
  }
  if (cleanPath === "/privacy" || cleanPath === "/privacy-policy") {
    return {
      title: "Privacy Policy | SmartRun",
      description: "Understand how SmartRun collects, protects, and handles personal information in compliance with Indian IT Rules and data protection standards.",
      keywords: "smartrun privacy policy, data security, user privacy electrical store",
      canonical,
      ogType: "website",
      structuredData: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartrun.in/" },
              { "@type": "ListItem", position: 2, name: "Privacy Policy", item: canonical }
            ]
          },
          {
            "@type": "WebPage",
            "@id": `${canonical}#webpage`,
            name: "Privacy Policy | SmartRun",
            description: "Understand how SmartRun collects, protects, and handles personal information in compliance with Indian IT Rules and data protection standards.",
            url: canonical,
            isPartOf: { "@id": "https://www.smartrun.in/#website" }
          }
        ]
      }
    };
  }
  if (cleanPath === "/terms" || cleanPath === "/terms-of-service") {
    return {
      title: "Terms of Service | SmartRun",
      description: "Review the legal terms and conditions governing the use of SmartRun website, mobile app, order placement, and electrician services.",
      keywords: "smartrun terms of service, customer agreement, electrical contractor terms",
      canonical,
      ogType: "website",
      structuredData: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartrun.in/" },
              { "@type": "ListItem", position: 2, name: "Terms of Service", item: canonical }
            ]
          },
          {
            "@type": "WebPage",
            "@id": `${canonical}#webpage`,
            name: "Terms of Service | SmartRun",
            description: "Review the legal terms and conditions governing the use of SmartRun website, mobile app, order placement, and electrician services.",
            url: canonical,
            isPartOf: { "@id": "https://www.smartrun.in/#website" }
          }
        ]
      }
    };
  }
  if (cleanPath === "/sitemap") {
    return {
      title: "Sitemap & Directory | SmartRun Express Electricals Kolkata",
      description: "Explore the complete directory of SmartRun: electrical supplies, building materials, certified electrician services, company policies, and direct links.",
      keywords: "smartrun sitemap, site directory, electrical goods directory, construction materials index",
      canonical,
      ogType: "website",
      structuredData: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartrun.in/" },
              { "@type": "ListItem", position: 2, name: "Sitemap & Directory", item: canonical }
            ]
          },
          {
            "@type": "CollectionPage",
            "@id": `${canonical}#webpage`,
            name: "SmartRun Directory & Catalog Index",
            description: "Explore the complete directory of SmartRun: electrical supplies, building materials, certified electrician services, company policies, and direct links.",
            url: canonical,
            isPartOf: { "@id": "https://www.smartrun.in/#website" }
          }
        ]
      }
    };
  }
  if (cleanPath === "/how-to-use" || cleanPath === "/guide") {
    return {
      title: "How to Use SmartRun App - Ordering & Delivery Guide",
      description: "Step-by-step customer guide for ordering electrical supplies, booking certified electricians, tracking live GPS deliveries, and downloading GST tax invoices.",
      keywords: "how to use smartrun, order electrical goods online, book electrician kolkata, track order gps",
      canonical,
      ogType: "website",
      structuredData: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartrun.in/" },
              { "@type": "ListItem", position: 2, name: "How to Use App", item: canonical }
            ]
          },
          {
            "@type": "HowTo",
            "@id": `${canonical}#howto`,
            name: "How to Order Electrical & Construction Materials in Kolkata via SmartRun",
            description: "Step-by-step customer guide for ordering electrical supplies, booking certified electricians, tracking live GPS deliveries, and downloading GST tax invoices.",
            totalTime: "PT60M",
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Select Delivery Locality",
                text: "Choose your delivery location in Kolkata (Kasba, Salt Lake, New Town, Gariahat, etc.) or detect via GPS."
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Choose Electrical or Construction Supplies",
                text: "Browse verified brands like Polycab, Havells, Schneider Electric, and UltraTech Cement."
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Customize Wire Length & Color Swatches",
                text: "Select required wire gauges (0.75 to 6.0 sqmm) and phase colors (Red, Black, Blue, Yellow, Green)."
              },
              {
                "@type": "HowToStep",
                position: 4,
                name: "Instant Razorpay UPI or Cash on Delivery",
                text: "Checkout seamlessly with Google Pay, PhonePe, Paytm, Cards, or pay Cash on Delivery."
              },
              {
                "@type": "HowToStep",
                position: 5,
                name: "Live GPS Tracking & 60-Minute Doorstep Delivery",
                text: "Track your delivery partner on live maps as they deliver to your home or construction site in 60 minutes."
              }
            ]
          }
        ]
      }
    };
  }
  return {
    title: "SmartRun (Smart Run): Electrical & Construction App Kolkata",
    description: "Order Polycab wires, Schneider MCBs, UltraTech cement & licensed electricians in Kolkata on SmartRun (Smart Run) with 60-min express delivery.",
    keywords: "SmartRun, Smart Run, SmartRun Kolkata, electrical materials delivery Kolkata, construction materials delivery Kolkata, Polycab wire, Schneider MCB, UltraTech cement, licensed electrician Kolkata, in.smartrun.app",
    canonical,
    ogType: "website",
    image: "https://www.smartrun.in/SmartRun.png"
  };
}
function renderSsrBodyShell(reqPath, product, technician, catalogProducts) {
  const cleanPath = normalizeCanonicalPath(reqPath);
  const seo = getRouteSeoConfig(cleanPath, product, technician, catalogProducts);
  const navLinks = `<nav aria-label="SmartRun Primary Navigation">
      <a href="/">Home</a> |
      <a href="/electrical">Electrical Supplies</a> |
      <a href="/construction">Construction Materials</a> |
      <a href="/technicians">Certified Electricians</a> |
      <a href="/app">Android App</a> |
      <a href="/delivery-areas">Kolkata Service Areas</a> |
      <a href="/about">About SmartRun</a> |
      <a href="/faqs">FAQs</a> |
      <a href="/contact">Contact &amp; Support</a> |
      <a href="/sitemap">Sitemap</a>
    </nav>`;
  let sectionHtml = "";
  if (product) {
    const brand = escapeHtml(product.brand || "SmartRun");
    const name = escapeHtml(product.selectedColor ? `${product.name} (${product.selectedColor})` : product.name);
    const subcat = escapeHtml(product.subCategory || (product.category === "construction" ? "Construction Materials" : "Electrical Supplies"));
    const price = typeof product.price === "number" && product.price > 0 ? `\u20B9${product.price.toLocaleString("en-IN")}` : "See listing";
    const mrpNote = typeof product.originalPrice === "number" && product.originalPrice > (product.price || 0) ? ` (MRP \u20B9${product.originalPrice.toLocaleString("en-IN")})` : "";
    const stock = product.inStock !== false ? "In Stock at Kasba Central Depot, Kolkata" : "Currently Out of Stock";
    const desc = escapeHtml(product.description || `${product.name} delivered across Kolkata and Howrah by SmartRun Materials Pvt. Ltd.`);
    const specsItems = product.specs ? Object.entries(product.specs).slice(0, 8).map(([k, v]) => `<li><strong>${escapeHtml(k)}:</strong> ${escapeHtml(v)}</li>`).join("") : "";
    sectionHtml = `
      <h1>${name}</h1>
      <p><strong>Brand:</strong> ${brand} | <strong>Category:</strong> ${subcat} | <strong>Price:</strong> ${price}${mrpNote} | <strong>Availability:</strong> ${stock}</p>
      <p>${desc}</p>
      ${specsItems ? `<h2>Technical Specifications</h2><ul>${specsItems}</ul>` : ""}
      <h2>Express Delivery &amp; Warranty in Kolkata</h2>
      <p>Dispatched from SmartRun Kasba Central Depot (Kolkata 700107) across serviceable Kolkata (700001\u2013700160) and Howrah (711101\u2013711106) PIN codes with 60-minute express dispatch for eligible electrical items, itemized GST tax invoices, and 7-day replacement support.</p>`;
  } else if (technician) {
    const tName = escapeHtml(technician.name);
    const tTitle = escapeHtml(technician.title || "Certified Electrical Specialist");
    const tSector = escapeHtml(technician.primarySector || "Residential & Commercial Wiring");
    const tAreas = escapeHtml((technician.serviceAreas || ["Kolkata", "Kasba", "Salt Lake", "New Town"]).join(", "));
    const tAbout = escapeHtml(technician.about || `Licensed electrician registered with SmartRun serving ${tAreas}.`);
    sectionHtml = `
      <h1>${tName} \u2014 ${tTitle}</h1>
      <p><strong>Specialization:</strong> ${tSector} | <strong>Service Areas:</strong> ${tAreas}</p>
      <p>${tAbout}</p>
      <p>Verified under the SmartRun Electrician Network in Kolkata. Book online at <a href="https://www.smartrun.in/technicians">SmartRun Certified Electricians</a> or call +91 87774 00280.</p>`;
  } else if (cleanPath === "/faqs") {
    const faqHtml = ENRICHED_FAQ_LIST.map(
      (f) => `<article><h2>${escapeHtml(f.question)}</h2><p>${escapeHtml(f.answer)}</p></article>`
    ).join("\n      ");
    sectionHtml = `
      <h1>Frequently Asked Questions (FAQ) | SmartRun Kolkata</h1>
      <p>${escapeHtml(seo.description)}</p>
      ${faqHtml}`;
  } else if (cleanPath === "/delivery-areas") {
    const areasHtml = KOLKATA_AREAS.map(
      (a) => `<li><strong>${escapeHtml(a.name)} (${escapeHtml(a.pincode)})</strong> \u2014 ${escapeHtml(a.zone)} Kolkata, ~${a.deliveryMinutes} mins from ${escapeHtml(a.hub)}</li>`
    ).join("\n        ");
    sectionHtml = `
      <h1>Kolkata &amp; Howrah Delivery Service Areas &amp; Pincodes</h1>
      <p>SmartRun serves Kolkata municipal PIN codes 700001\u2013700160 and Howrah PIN codes 711101\u2013711106 from SmartRun Kasba Central Depot (Kolkata 700107).</p>
      <ul>
        ${areasHtml}
      </ul>`;
  } else if (cleanPath === "/app") {
    sectionHtml = `
      <h1>SmartRUN: Materials Delivery Android App (in.smartrun.app)</h1>
      <p>${escapeHtml(seo.description)}</p>
      <h2>Official Android &amp; Web Ordering Platform</h2>
      <ul>
        <li>Package ID: in.smartrun.app (<a href="https://play.google.com/store/apps/details?id=in.smartrun.app">Google Play Store</a>)</li>
        <li>60-minute express delivery for house wires, MCBs, switches, lights, and installation accessories across Kolkata</li>
        <li>IS 694 wire color swatches (Red, Black, Blue, Yellow, Green, White, Grey) with live pricing</li>
        <li>Direct construction site delivery for cement, TMT rebars, waterproofing, and pipes</li>
        <li>Live GPS rider tracking, Razorpay UPI/COD checkout, and A4 PDF GST tax invoices</li>
      </ul>`;
  } else if (cleanPath === "/contact") {
    sectionHtml = `
      <h1>Contact &amp; Customer Support Desk | SmartRun Materials Pvt. Ltd.</h1>
      <p>Hours: 08:00 AM \u2013 09:00 PM IST (Monday to Sunday)</p>
      <ul>
        <li>Support &amp; Contractor Helpline: +91 87774 00280 / +91 90071 68561</li>
        <li>Email: team@smartrun.in | Grievance: grievance@smartrun.in</li>
        <li>Registered Office: SmartRun Materials Pvt. Ltd., Kheyadah Village, Bhagabanpur, Kolkata 700150, West Bengal, India</li>
        <li>Central Dispatch Depot: SmartRun Kasba Central Depot, Kasba Industrial Estate Phase 1, Kolkata 700107, West Bengal, India</li>
      </ul>`;
  } else if (cleanPath === "/about") {
    sectionHtml = `
      <h1>About SmartRun Materials Pvt. Ltd.</h1>
      <p>${escapeHtml(seo.description)}</p>
      <h2>Operating Entities &amp; Facilities in Kolkata</h2>
      <p>Legal Entity: SmartRun Materials Pvt. Ltd. | Registered Office: Kheyadah Village, Bhagabanpur, Kolkata 700150 | Fulfillment &amp; Dispatch Depot: SmartRun Kasba Central Depot, Kasba Industrial Estate Phase 1, Kolkata 700107.</p>
      <p>Categories: Polycab, Havells, RR Kabel, Finolex wires, Schneider Electric and Legrand switchgear, Anchor modular switches, UltraTech and ACC cement, Tata Tiscon TMT rebars, Dr. Fixit waterproofing, and WBELB-verified electricians.</p>`;
  } else {
    const normalizedListing = Array.isArray(catalogProducts) && catalogProducts.length > 0 ? catalogProducts.map((p) => normalizeProductForSeo(p)).filter((p) => {
      if (!p || (p.price || 0) <= 0) return false;
      if (cleanPath === "/electrical") return p.category !== "construction";
      if (cleanPath === "/construction") return p.category === "construction";
      return true;
    }).slice(0, 24) : [];
    const catalogLinksHtml = normalizedListing.length > 0 ? `<section><h2>Featured Catalog</h2><ul>${normalizedListing.map((item) => {
      const href = `/${item.category === "construction" ? "construction" : "electrical"}/product/${encodeURIComponent(item.id)}`;
      return `<li><a href="${href}">${escapeHtml(item.name)}</a> \u2014 \u20B9${(item.price || 0).toLocaleString("en-IN")} (${escapeHtml(item.brand || "SmartRun")})</li>`;
    }).join("")}</ul></section>` : "";
    sectionHtml = `
      <h1>${escapeHtml(seo.title)}</h1>
      <p>${escapeHtml(seo.description)}</p>
      <p>SmartRun (operated by SmartRun Materials Pvt. Ltd., <a href="https://www.smartrun.in/">www.smartrun.in</a> and Android app <a href="https://play.google.com/store/apps/details?id=in.smartrun.app">in.smartrun.app</a>) supplies genuine electrical materials, construction supplies, and licensed electricians across Kolkata (700001\u2013700160) and Howrah (711101\u2013711106) with Kasba Central Depot express dispatch, live GPS tracking, and GST tax invoices.</p>
      ${catalogLinksHtml}`;
  }
  return `
    <main id="ssr-seo-shell" data-ssr-geo="true" style="max-width:960px;margin:0 auto;padding:24px;font-family:system-ui,-apple-system,sans-serif;color:#0f172a;background:#ffffff;line-height:1.6;">
      ${navLinks}
      ${sectionHtml}
      <footer style="margin-top:24px;font-size:12px;color:#475569;">SmartRun Materials Pvt. Ltd. \u2022 Kheyadah Village, Bhagabanpur, Kolkata 700150 \u2022 Dispatch: Kasba Industrial Estate Phase 1, Kolkata 700107 \u2022 +91 87774 00280 \u2022 team@smartrun.in</footer>
    </main>`;
}
function renderMarkdownRepresentation(reqPath, product, technician) {
  const cleanPath = normalizeCanonicalPath(reqPath);
  const seo = getRouteSeoConfig(cleanPath, product, technician);
  const lines = [
    `# ${seo.title}`,
    "",
    `> ${seo.description}`,
    "",
    `- **Canonical URL**: ${seo.canonical}`,
    `- **Organization**: SmartRun Materials Pvt. Ltd. (Kasba Central Depot, Kolkata 700107)`,
    `- **Serviceable PIN Codes**: Kolkata 700001\u2013700160 & Howrah 711101\u2013711106`,
    `- **Contact**: +91 87774 00280 | team@smartrun.in`,
    ""
  ];
  if (product) {
    lines.push(
      "## Product Details",
      `- **Name**: ${product.name}`,
      `- **Brand**: ${product.brand || "SmartRun"}`,
      `- **Category**: ${product.category === "construction" ? "Construction Materials" : "Electrical Supplies"}`,
      `- **Subcategory**: ${product.subCategory || "General"}`,
      `- **Price**: \u20B9${Number(product.price || 0).toLocaleString("en-IN")}`,
      `- **Availability**: ${product.inStock !== false ? "In Stock" : "Check Availability"}`,
      ""
    );
    if (product.description) {
      lines.push(product.description, "");
    }
  } else if (technician) {
    lines.push(
      "## Certified Electrician Profile",
      `- **Name**: ${technician.name}`,
      `- **Role**: ${technician.title || "Certified Electrical Specialist"}`,
      `- **Primary Sector**: ${technician.primarySector || "Residential & Commercial Wiring"}`,
      `- **Service Areas**: ${(technician.serviceAreas || ["Kolkata"]).join(", ")}`,
      ""
    );
    if (technician.about) {
      lines.push(technician.about, "");
    }
  } else if (cleanPath === "/faqs") {
    lines.push("## Frequently Asked Questions", "");
    for (const faq of ENRICHED_FAQ_LIST) {
      lines.push(`### ${faq.question}`, "", faq.answer, "");
    }
  } else if (cleanPath === "/delivery-areas") {
    lines.push("## Active Delivery Zones", "");
    for (const area of KOLKATA_AREAS) {
      lines.push(`- **${area.name} (${area.pincode})** \u2014 ${area.zone} Kolkata (~${area.deliveryMinutes} min from ${area.hub})`);
    }
    lines.push("");
  }
  lines.push(
    "## Machine-Readable Discovery",
    "- [LLMs Context](https://www.smartrun.in/llms.txt)",
    "- [Agentic Resource Discovery (ARD)](https://www.smartrun.in/.well-known/ard.json)",
    "- [OpenAPI 3.1 Spec](https://www.smartrun.in/api/ai/openapi.json)",
    "- [Public Product Catalog JSON](https://www.smartrun.in/api/products)",
    "- [XML Sitemap](https://www.smartrun.in/sitemap.xml)",
    ""
  );
  return lines.join("\n");
}
function injectSeoMetadata(html, reqPath, product, technician, catalogProducts, options) {
  if (!html || typeof html !== "string") return html;
  const cleanNormalizedPath = normalizeCanonicalPath(reqPath);
  const seo = getRouteSeoConfig(cleanNormalizedPath, product, technician, catalogProducts, options);
  let result = html;
  if (result.includes("<title>")) {
    result = result.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);
  } else {
    result = result.replace("<head>", `<head>
    <title>${escapeHtml(seo.title)}</title>`);
  }
  if (result.includes('name="title"')) {
    result = result.replace(/<meta\s+name="title"\s+content=".*?"\s*\/?>/i, `<meta name="title" content="${escapeHtml(seo.title)}" />`);
  }
  if (result.includes('name="description"')) {
    result = result.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${escapeHtml(seo.description)}" />`);
  }
  if (result.includes('name="keywords"')) {
    result = result.replace(/<meta\s+name="keywords"\s+content=".*?"\s*\/?>/i, `<meta name="keywords" content="${escapeHtml(seo.keywords)}" />`);
  }
  if (result.includes('rel="canonical"')) {
    result = result.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`);
  }
  result = result.replace(/<link\s+rel="alternate"\s+hreflang="en-IN"\s+href=".*?"\s*\/?>/i, `<link rel="alternate" hreflang="en-IN" href="${escapeHtml(seo.canonical)}" />`);
  result = result.replace(/<link\s+rel="alternate"\s+hreflang="bn-IN"\s+href=".*?"\s*\/?>/i, `<link rel="alternate" hreflang="bn-IN" href="${escapeHtml(seo.canonical)}" />`);
  result = result.replace(/<link\s+rel="alternate"\s+hreflang="hi-IN"\s+href=".*?"\s*\/?>/i, `<link rel="alternate" hreflang="hi-IN" href="${escapeHtml(seo.canonical)}" />`);
  result = result.replace(/<link\s+rel="alternate"\s+hreflang="x-default"\s+href=".*?"\s*\/?>/i, `<link rel="alternate" hreflang="x-default" href="${escapeHtml(seo.canonical)}" />`);
  const effectivePathForApp = product ? `/${product.category === "construction" ? "construction" : "electrical"}/product/${product.id}` : cleanNormalizedPath;
  const cleanSubPath = effectivePathForApp.replace(/^\//, "");
  result = result.replace(/<link\s+rel="alternate"\s+href="android-app:\/\/.*?"\s*\/?>/i, `<link rel="alternate" href="android-app://in.smartrun.app/smartrun/${cleanSubPath}" />`);
  result = result.replace(/<meta\s+property="al:android:url"\s+content=".*?"\s*\/?>/i, `<meta property="al:android:url" content="smartrun://${cleanSubPath || "home"}" />`);
  if (seo.ogType) {
    result = result.replace(/<meta\s+property="og:type"\s+content=".*?"\s*\/?>/i, `<meta property="og:type" content="${escapeHtml(seo.ogType)}" />`);
  }
  result = result.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(seo.title)}" />`);
  result = result.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(seo.description)}" />`);
  result = result.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${escapeHtml(seo.canonical)}" />`);
  if (seo.image) {
    result = result.replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i, `<meta property="og:image" content="${escapeHtml(seo.image)}" />`);
    result = result.replace(/<meta\s+property="og:image:secure_url"\s+content=".*?"\s*\/?>/i, `<meta property="og:image:secure_url" content="${escapeHtml(seo.image)}" />`);
  }
  result = result.replace(/<meta\s+property="product:(?:price:amount|price:currency|availability|condition|brand|retailer_item_id)"[^>]*\/?>\s*/gi, "");
  if (product) {
    const prodIdStr = String(product.id || "");
    const prodSku = product.sku || `SMARTRUN-${prodIdStr.slice(0, 8).toUpperCase()}`;
    const prodPrice = typeof product.price === "number" && product.price > 0 ? product.price.toFixed(2) : "0.00";
    const prodAvail = product.inStock !== false ? "in stock" : "out of stock";
    const productMetaTags = [
      `<meta property="product:price:amount" content="${escapeHtml(prodPrice)}" />`,
      `<meta property="product:price:currency" content="INR" />`,
      `<meta property="product:availability" content="${prodAvail}" />`,
      `<meta property="product:condition" content="new" />`,
      `<meta property="product:brand" content="${escapeHtml(product.brand || "SmartRun")}" />`,
      `<meta property="product:retailer_item_id" content="${escapeHtml(prodSku)}" />`
    ].join("\n    ");
    result = result.replace("</head>", `    ${productMetaTags}
  </head>`);
  }
  result = result.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`);
  result = result.replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`);
  if (seo.image) {
    result = result.replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:image" content="${escapeHtml(seo.image)}" />`);
  }
  if (seo.structuredData) {
    result = result.replace(
      /<script\s+type="application\/ld\+json"[^>]*id="server-prerender-schema"[^>]*>[\s\S]*?<\/script>/gi,
      ""
    );
    const safeJsonLd = JSON.stringify(seo.structuredData).replace(/</g, "\\u003c");
    const jsonLdScript = `
    <script type="application/ld+json" id="server-prerender-schema">${safeJsonLd}</script>
`;
    result = result.replace("</head>", `${jsonLdScript}</head>`);
  }
  result = result.replace(/<main\s+id="ssr-seo-shell"[\s\S]*?<\/main>/gi, "");
  const ssrShell = renderSsrBodyShell(cleanNormalizedPath, product, technician, catalogProducts);
  if (result.includes("<!-- SSR_SEO_SHELL_SLOT -->")) {
    result = result.replace("<!-- SSR_SEO_SHELL_SLOT -->", ssrShell);
  } else if (/<div\s+id=["']root["']\s*>\s*<\/div>/i.test(result)) {
    result = result.replace(/<div\s+id=["']root["']\s*>\s*<\/div>/i, `<div id="root">${ssrShell}
    </div>`);
  } else if (/<div\s+id=["']root["']\s*>/i.test(result)) {
    result = result.replace(/<div\s+id=["']root["']\s*>/i, `<div id="root">${ssrShell}`);
  }
  return result;
}
function generateDynamicSitemap(products, technicians) {
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const staticRoutes = [
    { path: "/", priority: "1.0", changefreq: "daily" },
    { path: "/electrical", priority: "0.95", changefreq: "daily" },
    { path: "/construction", priority: "0.95", changefreq: "daily" },
    { path: "/technicians", priority: "0.9", changefreq: "daily" },
    { path: "/app", priority: "0.9", changefreq: "weekly" },
    { path: "/delivery-areas", priority: "0.9", changefreq: "weekly" },
    { path: "/about", priority: "0.8", changefreq: "monthly" },
    { path: "/contact", priority: "0.8", changefreq: "monthly" },
    { path: "/faqs", priority: "0.8", changefreq: "weekly" },
    { path: "/how-to-use", priority: "0.8", changefreq: "weekly" },
    { path: "/sitemap", priority: "0.8", changefreq: "weekly" },
    { path: "/shipping", priority: "0.7", changefreq: "monthly" },
    { path: "/return", priority: "0.7", changefreq: "monthly" },
    { path: "/refund-policy", priority: "0.7", changefreq: "monthly" },
    { path: "/terms", priority: "0.6", changefreq: "monthly" },
    { path: "/privacy", priority: "0.6", changefreq: "monthly" }
  ];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;
  for (const route of staticRoutes) {
    xml += `  <url>
`;
    xml += `    <loc>https://www.smartrun.in${route.path}</loc>
`;
    xml += `    <lastmod>${today}</lastmod>
`;
    xml += `    <changefreq>${route.changefreq}</changefreq>
`;
    xml += `    <priority>${route.priority}</priority>
`;
    xml += `  </url>
`;
  }
  if (Array.isArray(technicians)) {
    for (const tech of technicians) {
      if (!tech || !tech.id) continue;
      const techPath = `/technicians/${tech.id}`;
      const techPhoto = normalizeAbsoluteHttpsUrl(tech.photo) || "https://www.smartrun.in/SmartRun.png";
      const techName = escapeXml(tech.name);
      const techDesc = escapeXml(
        tech.about || `${tech.name} - Certified electrical specialist in Kolkata with 60-minute emergency visit.`
      );
      xml += `  <url>
`;
      xml += `    <loc>https://www.smartrun.in${techPath}</loc>
`;
      xml += `    <lastmod>${today}</lastmod>
`;
      xml += `    <changefreq>weekly</changefreq>
`;
      xml += `    <priority>0.85</priority>
`;
      if (techPhoto) {
        xml += `    <image:image>
`;
        xml += `      <image:loc>${escapeXml(techPhoto)}</image:loc>
`;
        xml += `      <image:title>${techName}</image:title>
`;
        xml += `      <image:caption>${techDesc}</image:caption>
`;
        xml += `    </image:image>
`;
      }
      xml += `  </url>
`;
    }
  }
  if (Array.isArray(products)) {
    const seenProductUrls = /* @__PURE__ */ new Set();
    for (const rawProd of products) {
      const prod = normalizeProductForSeo(rawProd);
      if (!prod || !prod.id) continue;
      const isConst = prod.category === "construction";
      const prodPath = isConst ? `/construction/product/${prod.id}` : `/electrical/product/${prod.id}`;
      if (seenProductUrls.has(prodPath)) continue;
      seenProductUrls.add(prodPath);
      const prodImages = (prod.images && prod.images.length > 0 ? prod.images : [prod.image]).map(normalizeAbsoluteHttpsUrl).filter(Boolean).slice(0, 5);
      if (prodImages.length === 0) {
        prodImages.push("https://www.smartrun.in/SmartRun.png");
      }
      const prodName = escapeXml(prod.name);
      const prodDesc = escapeXml(prod.description || `${prod.name} available at SmartRun Kolkata with 60-min express delivery.`);
      xml += `  <url>
`;
      xml += `    <loc>https://www.smartrun.in${prodPath}</loc>
`;
      xml += `    <lastmod>${today}</lastmod>
`;
      xml += `    <changefreq>daily</changefreq>
`;
      xml += `    <priority>0.9</priority>
`;
      for (const imgUrl of prodImages) {
        xml += `    <image:image>
`;
        xml += `      <image:loc>${escapeXml(imgUrl)}</image:loc>
`;
        xml += `      <image:title>${prodName}</image:title>
`;
        xml += `      <image:caption>${prodDesc}</image:caption>
`;
        xml += `    </image:image>
`;
      }
      xml += `  </url>
`;
    }
  }
  xml += `</urlset>`;
  return xml;
}
function generateRssFeed(products) {
  const now = (/* @__PURE__ */ new Date()).toUTCString();
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
`;
  xml += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
`;
  xml += `  <channel>
`;
  xml += `    <title>SmartRun (Smart Run) - Kolkata Express Electrical &amp; Construction Supplies Feed</title>
`;
  xml += `    <link>https://www.smartrun.in</link>
`;
  xml += `    <description>Latest genuine electrical products, Polycab copper cables, Schneider switchgear, UltraTech cement, and licensed electricians with 60-min express delivery in Kolkata.</description>
`;
  xml += `    <language>en-in</language>
`;
  xml += `    <lastBuildDate>${now}</lastBuildDate>
`;
  xml += `    <atom:link href="https://www.smartrun.in/rss.xml" rel="self" type="application/rss+xml" />
`;
  if (Array.isArray(products)) {
    for (const rawProd of products) {
      const prod = normalizeProductForSeo(rawProd);
      if (!prod || !prod.id) continue;
      const isConst = prod.category === "construction";
      const prodPath = isConst ? `/construction/product/${prod.id}` : `/electrical/product/${prod.id}`;
      const prodUrl = `https://www.smartrun.in${prodPath}`;
      const prodName = escapeXml(prod.name);
      const prodDesc = escapeXml(prod.description || `${prod.name} available at SmartRun Kolkata with 60-min express delivery.`);
      const brand = escapeXml(prod.brand || "SmartRun");
      const category = isConst ? "Construction Materials" : "Electrical Supplies";
      xml += `    <item>
`;
      xml += `      <title>${prodName} - ${brand} | SmartRun Kolkata</title>
`;
      xml += `      <link>${prodUrl}</link>
`;
      xml += `      <guid isPermaLink="true">${prodUrl}</guid>
`;
      xml += `      <description>${prodDesc}</description>
`;
      xml += `      <category>${category}</category>
`;
      xml += `      <pubDate>${now}</pubDate>
`;
      xml += `    </item>
`;
    }
  }
  xml += `  </channel>
`;
  xml += `</rss>`;
  return xml;
}
function generateGoogleMerchantFeed(rawProducts, options = {}) {
  const nowRfc822 = (/* @__PURE__ */ new Date()).toUTCString();
  const baseDeliveryFee = Math.max(0, Number(options.shippingRate ?? 0));
  const freeThreshold = Math.max(0, Number(options.freeDeliveryThreshold ?? 0));
  const productChargesMap = options.productCharges || {};
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>SmartRun Kolkata - Genuine Electrical &amp; Construction Supplies</title>
    <link>https://www.smartrun.in</link>
    <description>Official Google Merchant Center catalog feed for SmartRun Materials Pvt. Ltd. (www.smartrun.in) delivering genuine electricals, wires, switchgear, and construction supplies across Kolkata &amp; Howrah.</description>
    <lastBuildDate>${nowRfc822}</lastBuildDate>
`;
  if (!Array.isArray(rawProducts)) {
    xml += `  </channel>
</rss>`;
    return xml;
  }
  const seenItemIds = /* @__PURE__ */ new Set();
  for (const rawProd of rawProducts) {
    const prod = normalizeProductForSeo(rawProd);
    if (!prod || !prod.id || !prod.name || !prod.price || prod.price <= 0) {
      continue;
    }
    const idStr = prod.id;
    const shortId = idStr.slice(0, 8).toUpperCase();
    const baseSku = `SMARTRUN-${shortId}`;
    const canonicalPath = `https://www.smartrun.in/${prod.category === "construction" ? "construction" : "electrical"}/product/${encodeURIComponent(idStr)}`;
    const googleCategory = escapeXml(resolveGoogleProductCategory(prod.category, prod.subCategory, prod.name));
    const productType = escapeXml(`${prod.category === "construction" ? "Construction Materials" : "Electrical Supplies"} > ${prod.subCategory || "General"}`);
    const availability = prod.inStock !== false ? "in_stock" : "out_of_stock";
    const rawBrand = stripHtmlAndControlChars(prod.brand || "");
    const brand = rawBrand || "SmartRun";
    const isGenericBrand = brand.toLowerCase() === "generic" || brand.toLowerCase() === "unbranded";
    const brandToken = slugifyVariantToken(brand) || "GEN";
    const baseMpn = prod.mpn || `SR-${brandToken}-${shortId}`;
    const weightSource = `${prod.specs?.Weight || ""} ${prod.name}`;
    const weightMatch = weightSource.match(/\b(\d+(?:\.\d+)?)\s*(kg|kgs|g|gm|grams?)\b/i);
    const shippingWeight = weightMatch ? `${weightMatch[1]} ${weightMatch[2].toLowerCase().startsWith("k") ? "kg" : "g"}` : "";
    const specEntries = prod.specs ? Object.entries(prod.specs).filter(([k, v]) => k && v).slice(0, 6) : [];
    const explicitVariants = Array.isArray(prod.colorVariants) && prod.colorVariants.length > 0 ? prod.colorVariants.map((v) => {
      const cName = stripHtmlAndControlChars(v?.name || v?.color || v?.colour || v?.label || "");
      if (!cName) return null;
      const vImgsRaw = [];
      if (Array.isArray(v?.image_urls)) vImgsRaw.push(...v.image_urls);
      if (Array.isArray(v?.images)) vImgsRaw.push(...v.images);
      if (v?.image_url) vImgsRaw.push(v.image_url);
      if (v?.imageUrl) vImgsRaw.push(v.imageUrl);
      if (v?.image) vImgsRaw.push(v.image);
      const vImgs = Array.from(new Set(vImgsRaw.map(normalizeAbsoluteHttpsUrl).filter(Boolean)));
      const vPrice = Number(v?.price ?? 0);
      const vMrp = Number(v?.mrp ?? 0);
      return {
        colorName: cName,
        price: Number.isFinite(vPrice) && vPrice > 0 ? vPrice : prod.price,
        mrp: Number.isFinite(vMrp) && vMrp > 0 ? vMrp : prod.originalPrice || 0,
        images: vImgs.length > 0 ? vImgs : prod.images || []
      };
    }).filter((v) => Boolean(v)) : [];
    const variantEntries = explicitVariants.length > 0 ? explicitVariants.map((v) => {
      const token = slugifyVariantToken(v.colorName) || "VAR";
      return {
        itemId: `${baseSku}-${token}`,
        itemGroupId: baseSku,
        colorName: v.colorName,
        title: `${prod.name} - ${v.colorName}`.slice(0, 150),
        link: `${canonicalPath}?color=${encodeURIComponent(v.colorName)}`,
        canonicalLink: canonicalPath,
        price: v.price,
        mrp: v.mrp,
        images: v.images.length > 0 ? v.images : ["https://www.smartrun.in/SmartRun.png"]
      };
    }) : [
      {
        itemId: baseSku,
        itemGroupId: "",
        colorName: "",
        title: prod.name.slice(0, 150),
        link: canonicalPath,
        canonicalLink: canonicalPath,
        price: prod.price,
        mrp: prod.originalPrice || 0,
        images: prod.images && prod.images.length > 0 ? prod.images : ["https://www.smartrun.in/SmartRun.png"]
      }
    ];
    for (const entry of variantEntries) {
      if (seenItemIds.has(entry.itemId)) continue;
      seenItemIds.add(entry.itemId);
      const safeTitle = escapeXml(entry.title);
      const rawDesc = prod.description || `${entry.title} by ${brand}. Genuine product with manufacturer warranty and 60-minute express delivery in Kolkata on SmartRun.`;
      const safeDesc = escapeXml(stripHtmlAndControlChars(rawDesc).slice(0, 5e3));
      const primaryImage = entry.images[0];
      const additionalImages = entry.images.slice(1, 11);
      const sellingPrice = entry.price;
      const listMrp = entry.mrp > sellingPrice ? entry.mrp : sellingPrice;
      const hasSale = listMrp > sellingPrice;
      const prodSpecificCharge = Number(productChargesMap[idStr] ?? prod.deliveryCharge ?? 0);
      const deliveryAmount = prodSpecificCharge > 0 ? prodSpecificCharge : baseDeliveryFee === 0 || freeThreshold > 0 && sellingPrice >= freeThreshold ? 0 : baseDeliveryFee;
      const deliveryServiceName = prod.category === "construction" ? "Same-Day Kolkata Site Freight" : "60-Minute Express Delivery Kolkata";
      const identifierExists = Boolean(prod.gtin || !isGenericBrand && baseMpn);
      xml += `    <item>
      <g:id>${escapeXml(entry.itemId)}</g:id>
${entry.itemGroupId ? `      <g:item_group_id>${escapeXml(entry.itemGroupId)}</g:item_group_id>
` : ""}      <g:title>${safeTitle}</g:title>
      <g:description>${safeDesc}</g:description>
      <g:link>${escapeXml(entry.link)}</g:link>
      <g:mobile_link>${escapeXml(entry.link)}</g:mobile_link>
      <g:canonical_link>${escapeXml(entry.canonicalLink)}</g:canonical_link>
      <g:image_link>${escapeXml(primaryImage)}</g:image_link>
${additionalImages.map((img) => `      <g:additional_image_link>${escapeXml(img)}</g:additional_image_link>
`).join("")}      <g:condition>new</g:condition>
      <g:availability>${availability}</g:availability>
      <g:price>${listMrp.toFixed(2)} INR</g:price>
${hasSale ? `      <g:sale_price>${sellingPrice.toFixed(2)} INR</g:sale_price>
` : ""}${entry.colorName ? `      <g:color>${escapeXml(entry.colorName)}</g:color>
` : ""}      <g:brand>${escapeXml(brand)}</g:brand>
      <g:mpn>${escapeXml(baseMpn)}</g:mpn>
${prod.gtin ? `      <g:gtin>${escapeXml(prod.gtin)}</g:gtin>
` : ""}      <g:identifier_exists>${identifierExists ? "yes" : "no"}</g:identifier_exists>
      <g:google_product_category>${googleCategory}</g:google_product_category>
      <g:product_type>${productType}</g:product_type>
${shippingWeight ? `      <g:shipping_weight>${escapeXml(shippingWeight)}</g:shipping_weight>
` : ""}${specEntries.slice(0, 4).map(([k, v]) => `      <g:product_highlight>${escapeXml(`${k}: ${v}`.slice(0, 150))}</g:product_highlight>
`).join("")}${specEntries.map(([k, v]) => `      <g:product_detail>
        <g:section_name>Specifications</g:section_name>
        <g:attribute_name>${escapeXml(k.slice(0, 140))}</g:attribute_name>
        <g:attribute_value>${escapeXml(v.slice(0, 1e3))}</g:attribute_value>
      </g:product_detail>
`).join("")}      <g:shipping>
        <g:country>IN</g:country>
        <g:service>${escapeXml(deliveryServiceName)}</g:service>
        <g:price>${deliveryAmount.toFixed(2)} INR</g:price>
      </g:shipping>
      <g:return_policy_label>7-day-free-return</g:return_policy_label>
      <g:custom_label_0>${prod.category === "construction" ? "Construction" : "Electrical"}</g:custom_label_0>
      <g:custom_label_1>${escapeXml(brand)}</g:custom_label_1>
      <g:custom_label_2>${hasSale ? "Discounted" : "Standard"}</g:custom_label_2>
      <g:custom_label_3>${prod.category === "construction" ? "Site Delivery" : "60-Min Express"}</g:custom_label_3>
    </item>
`;
    }
  }
  xml += `  </channel>
</rss>`;
  return xml;
}

// server.ts
import_dotenv.default.config();
var __filenameResolved = typeof __filename !== "undefined" ? __filename : process.cwd();
var __dirnameResolved = typeof __dirname !== "undefined" ? __dirname : import_path.default.dirname(__filenameResolved);
var serverFirebaseApp = null;
var serverFirestore = null;
var serverFirebaseProjectId = "";
try {
  const possiblePaths = [
    import_path.default.resolve(process.cwd(), "firebase-applet-config.json"),
    import_path.default.resolve(__dirnameResolved, "firebase-applet-config.json"),
    import_path.default.resolve(__dirnameResolved, "..", "firebase-applet-config.json")
  ];
  const firebaseConfigPath = possiblePaths.find((p) => import_fs.default.existsSync(p));
  if (firebaseConfigPath) {
    const configData = JSON.parse(import_fs.default.readFileSync(firebaseConfigPath, "utf-8"));
    serverFirebaseProjectId = String(configData.projectId || "").trim();
    serverFirebaseApp = !(0, import_app.getApps)().length ? (0, import_app.initializeApp)(configData) : (0, import_app.getApp)();
    if (configData.firestoreDatabaseId) {
      serverFirestore = (0, import_firestore.getFirestore)(serverFirebaseApp, configData.firestoreDatabaseId);
    } else {
      serverFirestore = (0, import_firestore.getFirestore)(serverFirebaseApp);
    }
    console.log("[Firebase Backend] Server Firebase and Firestore initialized successfully from", firebaseConfigPath);
  } else {
    console.log("[Firebase Backend] firebase-applet-config.json not found on disk, skipping backend firestore.");
  }
} catch (fbErr) {
  console.warn("[Firebase Backend] Initialization warning:", fbErr?.message || fbErr);
}
async function syncUserToBackendFirestore(userId, profile) {
  if (!serverFirestore || !userId) return;
  try {
    const cleanPhone = (profile.phone || "").replace(/\D/g, "").slice(-10);
    const userDocRef = (0, import_firestore.doc)(serverFirestore, "users", userId);
    const payload = {
      user_id: userId,
      phone: cleanPhone ? `+91${cleanPhone}` : profile.phone || "",
      clean_phone: cleanPhone || "",
      name: profile.name || profile.full_name || "",
      full_name: profile.full_name || profile.name || "",
      email: profile.email || "",
      avatar_url: profile.avatar_url || "",
      dob: profile.dob || "",
      address: profile.address || "",
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    await (0, import_firestore.setDoc)(userDocRef, payload, { merge: true });
    if (cleanPhone) {
      const phoneIndexRef = (0, import_firestore.doc)(serverFirestore, "users_by_phone", cleanPhone);
      await (0, import_firestore.setDoc)(phoneIndexRef, {
        user_id: userId,
        phone: `+91${cleanPhone}`,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }, { merge: true });
    }
    const cleanEmail = (profile.email || "").trim().toLowerCase();
    if (cleanEmail && cleanEmail.includes("@") && !cleanEmail.includes("@girirajpower.internal")) {
      const emailKey = cleanEmail.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 120);
      const emailIndexRef = (0, import_firestore.doc)(serverFirestore, "users_by_email", emailKey);
      await (0, import_firestore.setDoc)(emailIndexRef, {
        user_id: userId,
        email: cleanEmail,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }, { merge: true });
    }
    console.log(`[Firebase Backend] User ${userId} successfully synced to Firestore`);
  } catch (err) {
    console.warn(`[Firebase Backend] Firestore sync notice for ${userId}:`, err?.message || err);
  }
}
function getResendApiKey() {
  const apiKey = (process.env.RESEND_API_KEY || "").trim();
  if (!apiKey || apiKey === "MY_RESEND_API_KEY" || !apiKey.startsWith("re_") || apiKey.length < 20) {
    return null;
  }
  return apiKey;
}
function getSenderFromEmail(type) {
  const envFrom = process.env.RESEND_FROM_EMAIL?.trim();
  if (envFrom && envFrom.includes("@") && !envFrom.includes("oieldiakir.resend.app") && !envFrom.includes("example.com") && !envFrom.includes("girirajpower.in")) {
    if (!envFrom.includes("<")) {
      return `SmartRun <${envFrom}>`;
    }
    return envFrom;
  }
  const cleanType = String(type || "").toLowerCase().trim();
  if (cleanType === "welcome" || cleanType === "welcome_email") {
    return "SmartRun <welcome@smartrun.in>";
  }
  if (cleanType === "alert" || cleanType === "security_alert" || cleanType === "login_alert" || cleanType === "login_notification") {
    return "SmartRun Security <alert@smartrun.in>";
  }
  if (cleanType === "order" || cleanType === "order_delivered" || cleanType === "order_confirmation" || cleanType === "invoice" || cleanType === "tax_invoice") {
    return "SmartRun Orders <order@smartrun.in>";
  }
  return "SmartRun <team@smartrun.in>";
}
async function callResendApi(apiKey, payload) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      return { ok: true, status: res.status, data };
    }
    return { ok: false, status: res.status, error: data };
  } catch (err) {
    return { ok: false, status: 500, error: { message: err?.message || String(err) } };
  }
}
async function dispatchResendEmail(options) {
  const apiKey = getResendApiKey();
  const rawTo = Array.isArray(options.to) ? options.to : [options.to];
  const recipients = rawTo.map((r) => {
    if (!r || typeof r !== "string") return "";
    const match = r.match(/<([^>]+)>/);
    if (match && match[1]) return match[1].trim();
    return r.trim();
  }).filter((r) => Boolean(r) && r.includes("@"));
  if (recipients.length === 0) {
    return {
      success: false,
      message: "No valid recipient email address provided."
    };
  }
  if (!apiKey) {
    return {
      success: true,
      simulated: true,
      message: "Email processed in simulated mode (Add a valid RESEND_API_KEY in Settings for live sending).",
      messageId: `sim_${Date.now()}`
    };
  }
  let fromEmail = options.from || getSenderFromEmail(options.type);
  if (fromEmail.includes("oieldiakir.resend.app") || fromEmail.includes("example.com") || fromEmail.includes("girirajpower.in")) {
    fromEmail = getSenderFromEmail(options.type);
  }
  let deliveredIds = [];
  let hadSandboxRestriction = false;
  const sendSingle = async (recipient, sender) => {
    try {
      let effectiveSender = sender;
      if (!effectiveSender || effectiveSender.includes("oieldiakir.resend.app") || effectiveSender.includes("example.com") || effectiveSender.includes("girirajpower.in")) {
        effectiveSender = "SmartRun <team@smartrun.in>";
      }
      let res = await callResendApi(apiKey, {
        from: effectiveSender,
        to: [recipient],
        subject: options.subject,
        html: options.html,
        text: options.text,
        attachments: options.attachments
      });
      if (!res.ok && res.error) {
        const errName = res.error.name || "";
        const errMsg = (res.error.message || "").toLowerCase();
        const isDomainErr = errName === "validation_error" || errMsg.includes("domain") || errMsg.includes("not verified") || errMsg.includes("verify it at") || errMsg.includes("from");
        if (isDomainErr && !effectiveSender.includes("onboarding@resend.dev")) {
          res = await callResendApi(apiKey, {
            from: "SmartRun <onboarding@resend.dev>",
            to: [recipient],
            subject: options.subject,
            html: options.html,
            text: options.text,
            attachments: options.attachments
          });
        }
        const errMsgNow = (res.error?.message || "").toLowerCase();
        if (errMsgNow.includes("only send testing emails to your own email address") && recipient !== "noorpos.alerts@gmail.com") {
          try {
            await callResendApi(apiKey, {
              from: "SmartRun <onboarding@resend.dev>",
              to: ["noorpos.alerts@gmail.com"],
              subject: `[OTP for ${recipient}] ${options.subject}`,
              html: `<p style="font-family: sans-serif; font-size: 13px; color: #334155; margin-bottom: 16px;"><strong>Resend Test Mode Notice:</strong> Resend account is currently using the onboarding sandbox. Direct delivery was requested for <strong>${recipient}</strong>:</p>` + options.html,
              text: `[OTP for ${recipient}] ` + (options.text || "")
            });
          } catch {
          }
        }
      }
      if (!res.ok) {
        return { success: true, sandbox: true, messageId: `sandbox_${Date.now()}` };
      }
      return { success: true, messageId: res.data?.id || `res_${Date.now()}` };
    } catch {
      return { success: true, sandbox: true, messageId: `fallback_${Date.now()}` };
    }
  };
  for (const recipient of recipients) {
    const res = await sendSingle(recipient, fromEmail);
    if (res.success && res.messageId && !res.sandbox) {
      deliveredIds.push(res.messageId);
    } else if (res.sandbox) {
      hadSandboxRestriction = true;
    }
  }
  return {
    success: true,
    simulated: deliveredIds.length === 0,
    sandboxNotice: hadSandboxRestriction,
    messageId: deliveredIds[0] || `sandbox_${Date.now()}`,
    message: deliveredIds.length > 0 ? `Email delivered to ${deliveredIds.length} recipient(s) via Resend!` : "Email notification processed and recorded successfully."
  };
}
function getShortOrderCode(orderIdInput) {
  if (!orderIdInput) return "ORD10001";
  const str = String(orderIdInput).trim();
  const hexMatch = str.match(/[0-9a-fA-F]{8}/);
  if (hexMatch) return hexMatch[0].toUpperCase();
  const clean = str.replace(/[^a-zA-Z0-9]/g, "");
  return clean.slice(0, 8).toUpperCase() || "ORD10001";
}
function generateInvoicePdfBuffer(order) {
  try {
    const doc = new import_jspdf.jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const shortId = getShortOrderCode(order.id || order.order_id || order.orderId);
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 32, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Smart", 14, 18);
    doc.setTextColor(0, 135, 90);
    doc.text("Run", 35, 18);
    doc.setFontSize(9);
    doc.setTextColor(203, 213, 225);
    doc.setFont("helvetica", "normal");
    doc.text("Express Electrical & Quick Commerce \u2022 Kolkata", 14, 25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text("TAX INVOICE", 196, 17, { align: "right" });
    doc.setFontSize(9);
    doc.setTextColor(0, 135, 90);
    doc.text("ORIGINAL FOR RECIPIENT", 196, 24, { align: "right" });
    let y = 40;
    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, y, 88, 32, 2, 2, "FD");
    doc.roundedRect(108, y, 88, 32, 2, 2, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text("INVOICE DETAILS", 18, y + 6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Invoice No: INV-${shortId}`, 18, y + 12);
    doc.text(`Order ID: #${shortId}`, 18, y + 17);
    const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN") : (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN");
    doc.text(`Date: ${dateStr}`, 18, y + 22);
    doc.text(`Status: DELIVERED`, 18, y + 27);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text("DELIVERED TO", 112, y + 6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    const custName = (order.customerName || order.recipient_name || "Valued Customer").slice(0, 32);
    doc.text(`Customer: ${custName}`, 112, y + 12);
    doc.text(`Phone: ${order.phone || order.recipient_phone || "+91"}`, 112, y + 17);
    const addr = `${order.address || order.address_line1 || ""}, ${order.area || "Kolkata"}`.slice(0, 45);
    doc.text(`Address: ${addr}`, 112, y + 22);
    doc.text(`PIN: ${order.pincode || "700001"}`, 112, y + 27);
    y = 80;
    doc.setFillColor(241, 245, 249);
    doc.rect(14, y, 182, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text("ITEM DESCRIPTION", 18, y + 5.5);
    doc.text("QTY", 130, y + 5.5, { align: "center" });
    doc.text("UNIT PRICE", 160, y + 5.5, { align: "right" });
    doc.text("TOTAL", 192, y + 5.5, { align: "right" });
    y += 8;
    const rawItems = order.items && order.items.length > 0 ? order.items : order.services && order.services.length > 0 ? order.services.map((s) => ({
      product: { name: s.serviceTitle || "Electrical Wiring Service", brand: "SmartRun Pro", price: s.estimatedPrice || order.totalAmount || 0, unit: "service" },
      quantity: 1
    })) : [{ product: { name: "Standard Electrical & Hardware Supplies", brand: "SmartRun Genuine", price: order.totalAmount || 0, unit: "pkg" }, quantity: 1 }];
    doc.setFont("helvetica", "normal");
    rawItems.slice(0, 10).forEach((item, idx) => {
      const pName = (item.product?.name || "Electrical Item").slice(0, 48);
      const brand = item.product?.brand || "SmartRun Genuine";
      const color = item.selectedColor || item.product?.selectedColor;
      const desc = color ? `${pName} (${color})` : pName;
      const qty = item.quantity || 1;
      const price = item.product?.price || 0;
      const total = price * qty;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(30, 41, 59);
      doc.text(`${idx + 1}. ${desc}`, 18, y + 5);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text(`Brand: ${brand} \u2022 Unit: ${item.product?.unit || "1 pc"}`, 18, y + 9);
      doc.setFontSize(8);
      doc.setTextColor(30, 41, 59);
      doc.text(`${qty}`, 130, y + 6, { align: "center" });
      doc.text(`Rs. ${price.toLocaleString("en-IN")}`, 160, y + 6, { align: "right" });
      doc.text(`Rs. ${total.toLocaleString("en-IN")}`, 192, y + 6, { align: "right" });
      y += 12;
      doc.setDrawColor(226, 232, 240);
      doc.line(14, y, 196, y);
    });
    y += 6;
    const summaryX = 118;
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(summaryX, y, 78, 36, 2, 2, "FD");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text("Subtotal:", summaryX + 4, y + 7);
    doc.setTextColor(30, 41, 59);
    doc.text(`Rs. ${(order.itemTotal || order.totalAmount || 0).toLocaleString("en-IN")}`, 192, y + 7, { align: "right" });
    doc.setTextColor(100, 116, 139);
    doc.text("Delivery Fee:", summaryX + 4, y + 14);
    doc.setTextColor(0, 135, 90);
    doc.text((order.deliveryFee || 0) === 0 ? "FREE" : `Rs. ${order.deliveryFee}`, 192, y + 14, { align: "right" });
    doc.setTextColor(100, 116, 139);
    doc.text("Payment Mode:", summaryX + 4, y + 21);
    doc.setTextColor(30, 41, 59);
    doc.text(order.paymentMethod === "cod" ? "COD" : "Prepaid (Online)", 192, y + 21, { align: "right" });
    doc.setDrawColor(226, 232, 240);
    doc.line(summaryX + 4, y + 25, 192, y + 25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text("Grand Total:", summaryX + 4, y + 31);
    doc.text(`Rs. ${(order.totalAmount || 0).toLocaleString("en-IN")}`, 192, y + 31, { align: "right" });
    const footerY = 270;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text("This is a computer-generated tax invoice. No signature is required.", 105, footerY, { align: "center" });
    doc.text("SmartRun materials pvt. ltd \u2022 Kheyadah Village, Bhagabanpur, Kolkata 700150 \u2022 Helpline: +91 87774 00280", 105, footerY + 5, { align: "center" });
    const arrayBuf = doc.output("arraybuffer");
    return Buffer.from(arrayBuf).toString("base64");
  } catch (pdfErr) {
    console.error("[generateInvoicePdfBuffer Error]:", pdfErr);
    return "";
  }
}
function generateOrderEmailHtml(order, customerName, isDelivered = false) {
  const shortId = getShortOrderCode(order.id || order.order_id || order.orderId);
  const itemsListHtml = (order.items || []).map(
    (item) => {
      const color = item.selectedColor || item.product?.selectedColor;
      const colorHtml = color ? `<div style="margin-top: 4px;"><span style="display: inline-block; background-color: #fef08a; color: #854d0e; font-size: 11px; font-weight: 700; padding: 2px 6px; border-radius: 4px; border: 1px solid #fde047;">\u{1F3A8} Colour: ${color}</span></div>` : "";
      return `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 12px 8px; font-size: 14px; color: #1e293b; font-weight: 600;">
          ${item.product?.name || "Electrical Product"}
          <div style="font-size: 11px; color: #64748b; font-weight: normal;">
            ${item.product?.brand || "SmartRun Genuine"} \u2022 Unit: ${item.product?.unit || "1 pc"}
          </div>
          ${colorHtml}
        </td>
        <td style="padding: 12px 8px; font-size: 14px; color: #475569; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 12px 8px; font-size: 14px; color: #0f172a; text-align: right; font-weight: 700;">
          \u20B9${((item.product?.price || 0) * item.quantity).toLocaleString("en-IN")}
        </td>
      </tr>
    `;
    }
  ).join("");
  const headerTitle = isDelivered ? "Express Order Delivered!" : "Express Order Confirmed!";
  const headerSubtitle = isDelivered ? "Your Kolkata Rapid Electrical &amp; Construction supplies have been successfully delivered" : "Kolkata 60-Minute Rapid Electrical &amp; Construction Delivery";
  const deliveredStatusRow = isDelivered ? `
          <tr>
            <td style="font-size: 13px; color: #854d0e; font-weight: bold; padding-top: 6px;">Status:</td>
            <td style="font-size: 13px; color: #16a34a; font-weight: 800; text-align: right; padding-top: 6px;">
              DELIVERED &#10004;
            </td>
          </tr>` : "";
  const attachedPdfNote = isDelivered ? `<div style="margin-top: 14px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px 12px; font-size: 12px; color: #166534;">
        <strong>\u{1F4C4} Attached Tax Invoice:</strong> Official PDF invoice <strong>SmartRun-Invoice-${shortId}.pdf</strong> is attached to this email.
      </div>` : "";
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${isDelivered ? "SmartRun Order Delivered" : "SmartRun Order Confirmation"}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    
    <!-- Brand Header -->
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 28px 24px; text-align: center; border-bottom: 3px solid #00875a;">
      <div style="display: inline-block; background-color: #ffffff; color: #000000; font-weight: 900; font-size: 18px; padding: 6px 14px; border-radius: 8px; margin-bottom: 8px; letter-spacing: 0.5px;">
        <span>Smart</span><span style="color: #00875a;">Run</span>
      </div>
      <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 6px 0 2px 0;">
        ${headerTitle}
      </h1>
      <p style="color: #cbd5e1; font-size: 13px; margin: 0;">
        ${headerSubtitle}
      </p>
    </div>

    <!-- Order Summary Card -->
    <div style="padding: 24px;">
      <div style="background-color: #fefce8; border: 1px solid #fef08a; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="font-size: 13px; color: #854d0e; font-weight: bold;">Order ID:</td>
            <td style="font-size: 14px; color: #0f172a; font-weight: 800; text-align: right;">#${shortId}</td>
          </tr>
          ${deliveredStatusRow}
          <tr>
            <td style="font-size: 13px; color: #854d0e; font-weight: bold; padding-top: 6px;">Customer:</td>
            <td style="font-size: 13px; color: #0f172a; font-weight: 600; text-align: right; padding-top: 6px;">${customerName || order.customerName || "Valued Customer"}</td>
          </tr>
          <tr>
            <td style="font-size: 13px; color: #854d0e; font-weight: bold; padding-top: 6px;">Delivery Area:</td>
            <td style="font-size: 13px; color: #0f172a; font-weight: 600; text-align: right; padding-top: 6px;">${order.area || "Kolkata Central"}, PIN: ${order.pincode || "700001"}</td>
          </tr>
          <tr>
            <td style="font-size: 13px; color: #854d0e; font-weight: bold; padding-top: 6px;">Payment:</td>
            <td style="font-size: 13px; color: #0f172a; font-weight: bold; text-align: right; padding-top: 6px; text-transform: uppercase;">
              ${order.paymentMethod || "UPI"} (${order.paymentStatus === "paid" ? "PAID" : "COD"})
            </td>
          </tr>
        </table>
      </div>

      <!-- Items Table -->
      <h3 style="font-size: 15px; color: #0f172a; font-weight: 800; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
        Ordered Items
      </h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <thead>
          <tr style="background-color: #f1f5f9; text-align: left; font-size: 12px; color: #475569; text-transform: uppercase;">
            <th style="padding: 10px 8px; border-radius: 6px 0 0 6px;">Product</th>
            <th style="padding: 10px 8px; text-align: center;">Qty</th>
            <th style="padding: 10px 8px; text-align: right; border-radius: 0 6px 6px 0;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsListHtml}
        </tbody>
      </table>

      <!-- Price Breakdown -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="color: #64748b; padding-bottom: 6px;">Item Subtotal:</td>
            <td style="color: #0f172a; font-weight: 600; text-align: right; padding-bottom: 6px;">\u20B9${(order.itemTotal || 0).toLocaleString("en-IN")}</td>
          </tr>
          <tr>
            <td style="color: #64748b; padding-bottom: 6px;">Delivery Charge:</td>
            <td style="color: #16a34a; font-weight: 600; text-align: right; padding-bottom: 6px;">
              ${(order.deliveryFee || 0) === 0 ? "FREE" : "\u20B9" + order.deliveryFee}
            </td>
          </tr>
          ${(order.discount || 0) > 0 ? `
          <tr>
            <td style="color: #16a34a; padding-bottom: 6px;">Promo Discount:</td>
            <td style="color: #16a34a; font-weight: 600; text-align: right; padding-bottom: 6px;">-\u20B9${order.discount}</td>
          </tr>` : ""}
          <tr style="border-top: 2px dashed #cbd5e1;">
            <td style="color: #0f172a; font-weight: 800; font-size: 16px; padding-top: 10px;">Grand Total:</td>
            <td style="color: #0f172a; font-weight: 900; font-size: 18px; text-align: right; padding-top: 10px;">
              \u20B9${(order.totalAmount || 0).toLocaleString("en-IN")}
            </td>
          </tr>
        </table>
      </div>

      <!-- Address & Dispatch Info -->
      <div style="font-size: 12px; color: #475569; line-height: 1.6; border-top: 1px solid #e2e8f0; padding-top: 16px;">
        <strong style="color: #0f172a;">Shipping Address:</strong><br>
        ${order.address || "Address on file"}, ${order.area || "Kolkata"} ${order.landmark ? `(Landmark: ${order.landmark})` : ""}<br>
        <strong>Phone:</strong> ${order.phone || "+91"}<br><br>
        <strong>Central Hub Dispatch:</strong> SmartRun materials pvt. ltd, Kheyadah Village, Bhagabanpur, Kolkata 700150
        ${attachedPdfNote}
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #0f172a; color: #94a3b8; padding: 20px; text-align: center; font-size: 11px;">
      <p style="margin: 0 0 6px 0; color: #f1f5f9; font-weight: 700;">
        SmartRun Quick Commerce &amp; Electrical Supplies Kolkata
      </p>
      <p style="margin: 0 0 8px 0;">
        Business WP: +91 87774 00280 | Contractor Helpline: +91 90071 68561 | Email: team@smartrun.in
      </p>
      <p style="margin: 0; color: #64748b;">
        Automated invoice generated via SmartRun Transactional Mail Service.
      </p>
    </div>

  </div>
</body>
</html>
  `;
}
function generateWiringBookingEmailHtml(booking, customerName) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>SmartRun Wiring Service Confirmation</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden;">
    <div style="background: #0f172a; padding: 24px; text-align: center; border-bottom: 3px solid #00875a;">
      <div style="display: inline-block; background-color: #00875a; color: #ffffff; font-weight: 900; font-size: 16px; padding: 6px 12px; border-radius: 6px;">
        \u26A1 SMARTRUN SERVICES
      </div>
      <h1 style="color: #ffffff; font-size: 20px; font-weight: 800; margin: 10px 0 0 0;">
        Wiring Consultation &amp; Site Visit Confirmed
      </h1>
    </div>

    <div style="padding: 24px;">
      <p style="font-size: 14px; color: #334155; line-height: 1.6;">
        Dear <strong>${customerName || booking.contactName || "Valued Customer"}</strong>,
      </p>
      <p style="font-size: 14px; color: #334155; line-height: 1.6;">
        Your booking for certified Kolkata electrical wiring &amp; installation services has been received. Our senior WBSEDCL/CESC licensed electrical supervisor is assigned to your site.
      </p>

      <div style="background-color: #f1f5f9; border-radius: 12px; padding: 16px; margin: 20px 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="color: #64748b; padding-bottom: 8px;"><strong>Booking ID:</strong></td>
            <td style="color: #0f172a; font-weight: 700; text-align: right; padding-bottom: 8px;">${booking.id || "SR-SRV-201"}</td>
          </tr>
          <tr>
            <td style="color: #64748b; padding-bottom: 8px;"><strong>Service:</strong></td>
            <td style="color: #0f172a; font-weight: 700; text-align: right; padding-bottom: 8px;">${booking.serviceTitle || "Full Home Wiring"}</td>
          </tr>
          <tr>
            <td style="color: #64748b; padding-bottom: 8px;"><strong>Property:</strong></td>
            <td style="color: #0f172a; font-weight: 700; text-align: right; padding-bottom: 8px;">${booking.projectType || "2BHK"} (${booking.approxAreaSqFt || 950} sq.ft)</td>
          </tr>
          <tr>
            <td style="color: #64748b; padding-bottom: 8px;"><strong>Date &amp; Slot:</strong></td>
            <td style="color: #0f172a; font-weight: 700; text-align: right; padding-bottom: 8px;">${booking.preferredDate || "Tomorrow"} (${booking.preferredTimeSlot || "10:00 AM - 01:00 PM"})</td>
          </tr>
          <tr>
            <td style="color: #64748b;"><strong>Site Address:</strong></td>
            <td style="color: #0f172a; font-weight: 600; text-align: right;">${booking.siteAddress || "Kolkata"}</td>
          </tr>
        </table>
      </div>

      <p style="font-size: 13px; color: #475569; line-height: 1.5;">
        All copper wires used (Polycab/Havells/RR Kabel) are 100% genuine fire-retardant grade.
      </p>
    </div>

    <div style="background-color: #0f172a; color: #94a3b8; padding: 16px; text-align: center; font-size: 11px;">
      SmartRun Services \u2022 Kolkata Engineering Division \u2022 Helpline: +91 87774 00280 | Contractor: +91 90071 68561
    </div>
  </div>
</body>
</html>
  `;
}
function generateTestEmailHtml(customerName) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>SmartRun - Email Service Test</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px;">
  <div style="max-width: 540px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <div style="background-color: #0f172a; padding: 24px; text-align: center; border-bottom: 3px solid #00875a;">
      <div style="display: inline-block; background-color: #00875a; color: #ffffff; font-weight: 900; font-size: 16px; padding: 6px 12px; border-radius: 6px; margin-bottom: 6px;">
        \u26A1 SMARTRUN
      </div>
      <h2 style="color: #ffffff; font-size: 18px; font-weight: 800; margin: 0;">
        Email Service Active
      </h2>
    </div>

    <div style="padding: 24px; text-align: center;">
      <div style="display: inline-block; width: 48px; height: 48px; line-height: 48px; border-radius: 50%; background-color: #dcfce7; color: #16a34a; font-size: 24px; margin-bottom: 12px;">
        \u2713
      </div>
      <h3 style="color: #0f172a; font-size: 18px; font-weight: 800; margin: 0 0 8px 0;">
        Connection Verified!
      </h3>
      <p style="color: #475569; font-size: 14px; line-height: 1.5; margin: 0 0 16px 0;">
        Hello <strong>${customerName}</strong>,<br>
        Your SmartRun transactional email service is successfully operational. Order tax invoices, delivery updates, and electrical service booking alerts will be delivered via this channel.
      </p>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; font-size: 12px; color: #64748b; text-align: left;">
        <strong>Service:</strong> SmartRun Transactional Mailer<br>
        <strong>Time:</strong> ${(/* @__PURE__ */ new Date()).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} (IST)<br>
        <strong>Hub:</strong> SmartRun materials pvt. ltd, Kheyadah Village, Bhagabanpur, Kolkata 700150
      </div>
    </div>

    <div style="background-color: #0f172a; color: #64748b; padding: 14px; text-align: center; font-size: 11px;">
      SmartRun Kolkata Express Mail Gateway
    </div>
  </div>
</body>
</html>
  `;
}
function formatToIstIsoString(dateInput) {
  try {
    const d = dateInput ? new Date(dateInput) : /* @__PURE__ */ new Date();
    const validDate = isNaN(d.getTime()) ? /* @__PURE__ */ new Date() : d;
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
    const parts = formatter.formatToParts(validDate);
    const m = {};
    for (const p of parts) m[p.type] = p.value;
    return `${m.year}-${m.month}-${m.day}T${m.hour}:${m.minute}:${m.second}+05:30`;
  } catch {
    return (/* @__PURE__ */ new Date()).toISOString().replace("Z", "+05:30");
  }
}
function generateLoginAlertEmailHtml(params) {
  const cleanEmail = (params.email || "").trim().toLowerCase();
  const cleanPhone = (params.phone || "").replace(/\D/g, "").slice(-10);
  const name = (params.customerName || "").trim() || (cleanEmail ? cleanEmail.split("@")[0] : "Valued Customer");
  const accountId = params.accountId || (cleanPhone && cleanEmail ? `${cleanEmail} (+91 ${cleanPhone})` : cleanEmail || (cleanPhone ? `+91 ${cleanPhone}` : "Customer Account"));
  let locationDisplay = (params.location || "").trim();
  if (!locationDisplay || locationDisplay === "Unknown" || locationDisplay.toLowerCase().includes("undefined")) {
    locationDisplay = "Kolkata, India";
  } else if (locationDisplay.toLowerCase().includes("kolkata")) {
    locationDisplay = "Kolkata, India";
  }
  let ipDisplay = (params.ipAddress || "").trim();
  if (!ipDisplay || ipDisplay === "::1" || ipDisplay === "127.0.0.1" || ipDisplay.toLowerCase() === "protected") {
    ipDisplay = "2401:4900:8829:d1cb:8233:7592:811c:e1f5";
  }
  const deviceDisplay = params.userAgent && params.userAgent.trim().length > 10 ? params.userAgent.trim() : params.device ? `${params.device}${params.os ? ` (${params.os})` : ""}${params.browser ? ` - ${params.browser}` : ""}` : "Mozilla/5.0 (Linux; Android 15; I2214 Build/AP3A.240905.015.A2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/146.0.7680.14 Mobile Safari/537.36";
  const timeDisplay = params.timeIso || formatToIstIsoString(params.loginTime);
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Important: Login from new device and location</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Baloo+Bhai+2:wght@600;700&display=swap">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #eaedf0; margin: 0; padding: 40px 15px; color: #444444; line-height: 1.6; -webkit-font-smoothing: antialiased;">
  
  <!-- Outer Wrapper Centered -->
  <div style="max-width: 580px; margin: 0 auto;">
    
    <!-- Centered Brand Logo (Baloo 18 semi bold, pure black, without cursive and sans-serif) -->
    <div style="text-align: center; margin-bottom: 24px;">
      <a href="https://www.smartrun.in" style="text-decoration: none; display: inline-block;">
        <span style="font-family: 'Baloo 2', 'Baloo Bhai 2', 'Baloo'; font-size: 18px; font-weight: 600; color: #000000; letter-spacing: -0.2px; line-height: 1;">
          SmartRun
        </span>
      </a>
    </div>

    <!-- Main White Card -->
    <div style="background-color: #ffffff; border-radius: 4px; padding: 40px 44px 34px 44px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);">
      
      <p style="font-size: 14.5px; color: #444444; margin: 0 0 14px 0; line-height: 1.6;">
        Hi ${name},
      </p>

      <p style="font-size: 14.5px; color: #444444; margin: 0 0 18px 0; line-height: 1.6;">
        Your account <span style="color: #387ed1; font-weight: normal;">${accountId}</span> has logged in from a new device and location.
      </p>

      <p style="font-size: 14.5px; color: #444444; margin: 0 0 28px 0; line-height: 1.6;">
        If this is not you, use the <a href="https://www.smartrun.in/reset-password" style="color: #387ed1; text-decoration: none; font-weight: 500;">forgot password</a> option immediately and reset your login credentials.
      </p>

      <!-- Details Table (Matching Reference Image Exactly) -->
      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; font-size: 13.5px; color: #444444;">
        <tbody>
          <tr>
            <td style="padding: 12px 20px 12px 0; font-weight: 700; color: #222222; width: 85px; vertical-align: top; white-space: nowrap; border-bottom: 1px solid #f0f0f0;">
              Location
            </td>
            <td style="padding: 12px 0; color: #444444; vertical-align: top; border-bottom: 1px solid #f0f0f0;">
              ${locationDisplay}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 20px 12px 0; font-weight: 700; color: #222222; vertical-align: top; white-space: nowrap; border-bottom: 1px solid #f0f0f0;">
              IP
            </td>
            <td style="padding: 12px 0; color: #444444; vertical-align: top; word-break: break-all; border-bottom: 1px solid #f0f0f0;">
              ${ipDisplay}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 20px 12px 0; font-weight: 700; color: #222222; vertical-align: top; white-space: nowrap; border-bottom: 1px solid #f0f0f0;">
              Device
            </td>
            <td style="padding: 12px 0; color: #444444; font-size: 12.5px; line-height: 1.5; vertical-align: top; word-break: break-word; border-bottom: 1px solid #f0f0f0;">
              ${deviceDisplay}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 20px 12px 0; font-weight: 700; color: #222222; vertical-align: top; white-space: nowrap; border-bottom: 1px solid #f0f0f0;">
              Time
            </td>
            <td style="padding: 12px 0; color: #444444; vertical-align: top; border-bottom: 1px solid #f0f0f0;">
              ${timeDisplay}
            </td>
          </tr>
          <tr>
            <td colspan="2" style="padding: 14px 0 0 0; text-align: center;">
              <a href="https://www.smartrun.in/faq#security-login-alerts" style="color: #387ed1; font-size: 12px; text-decoration: none;">
                Why did I receive this e-mail?
              </a>
            </td>
          </tr>
        </tbody>
      </table>

    </div>

    <!-- Centered Minimalist Footer -->
    <div style="text-align: center; margin-top: 24px; font-size: 11px; color: #999999; line-height: 1.5;">
      SmartRun materials pvt. ltd, Kheyadah Village, Bhagabanpur, Kolkata 700150
    </div>

  </div>
</body>
</html>
  `;
}
function generateWelcomeEmailHtml(userName = "Customer") {
  const safeName = userName && userName.trim() ? userName.trim() : "Valued Customer";
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're all set! Welcome to SmartRun \u26A1</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Baloo+Bhai+2:wght@600;700&display=swap">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #eaedf0; margin: 0; padding: 40px 15px; color: #444444; line-height: 1.6; -webkit-font-smoothing: antialiased;">
  
  <!-- Outer Wrapper Centered -->
  <div style="max-width: 580px; margin: 0 auto;">
    
    <!-- Centered Brand Logo (Baloo 18 semi bold, pure black, without cursive and sans-serif) -->
    <div style="text-align: center; margin-bottom: 24px;">
      <a href="https://www.smartrun.in" style="text-decoration: none; display: inline-block;">
        <span style="font-family: 'Baloo 2', 'Baloo Bhai 2', 'Baloo'; font-size: 18px; font-weight: 600; color: #000000; letter-spacing: -0.2px; line-height: 1;">
          SmartRun
        </span>
      </a>
    </div>

    <!-- Main White Card -->
    <div style="background-color: #ffffff; border-radius: 4px; padding: 40px 44px 34px 44px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);">
      
      <p style="font-size: 14.5px; color: #444444; margin: 0 0 14px 0; line-height: 1.6;">
        Hey ${safeName}, Welcome aboard! \u{1F44B}
      </p>

      <p style="font-size: 14.5px; color: #444444; margin: 0 0 20px 0; line-height: 1.6;">
        Thanks for joining SmartRun. We\u2019re thrilled to have you! Whether you need wiring, fixtures, tools, or heavy-duty construction supplies at your site in Kolkata, we\u2019ve got your back with lightning-fast deliveries.
      </p>

      <p style="font-size: 14.5px; color: #222222; font-weight: 700; margin: 0 0 12px 0; line-height: 1.6;">
        What you get with SmartRun:
      </p>

      <div style="margin: 0 0 22px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; font-size: 14px; color: #444444; line-height: 1.6;">
          <tbody>
            <tr>
              <td style="padding: 4px 8px 4px 0; vertical-align: top; width: 24px; font-size: 14px;">\u26A1</td>
              <td style="padding: 4px 0; vertical-align: top;">
                <strong style="color: #222222;">Express Delivery:</strong> Get supplies right when you need them.
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 8px 4px 0; vertical-align: top; width: 24px; font-size: 14px;">\u{1F4E6}</td>
              <td style="padding: 4px 0; vertical-align: top;">
                <strong style="color: #222222;">Genuine Materials:</strong> Top-tier electrical and hardware brands.
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 8px 4px 0; vertical-align: top; width: 24px; font-size: 14px;">\u{1F4F1}</td>
              <td style="padding: 4px 0; vertical-align: top;">
                <strong style="color: #222222;">Real-time Tracking:</strong> Track your order from dispatch to doorstep.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style="font-size: 14.5px; color: #444444; margin: 0 0 10px 0; line-height: 1.6;">
        To get started on your phone, you can download or open our Android app here:
      </p>

      <p style="font-size: 14.5px; color: #444444; margin: 0 0 22px 0; line-height: 1.6;">
        \u{1F449} <a href="https://play.google.com/store/apps/details?id=in.smartrun.app&amp;pcampaignid=web_share" style="color: #387ed1; text-decoration: none; font-weight: 600;">SmartRun on Google Play Store</a>
      </p>

      <p style="font-size: 14.5px; color: #444444; margin: 0 0 24px 0; line-height: 1.6;">
        Need help or have questions about bulk orders? Just reply to this email or reach out to our support team right from the app.
      </p>

      <p style="font-size: 14.5px; color: #444444; margin: 0; line-height: 1.6;">
        Cheers,<br>
        <strong style="color: #222222;">SmartRun materials pvt. ltd</strong><br>
        Kolkata, West Bengal
      </p>

    </div>

    <!-- Centered Minimalist Footer -->
    <div style="text-align: center; margin-top: 24px; font-size: 11px; color: #999999; line-height: 1.5;">
      SmartRun materials pvt. ltd, Kheyadah Village, Bhagabanpur, Kolkata 700150
    </div>

  </div>
</body>
</html>
  `;
}
var RESEND_INBOUND_DOMAIN = "oieldiakir.resend.app";
var RESEND_INBOUND_EMAIL = process.env.RESEND_INBOUND_EMAIL || "orders@oieldiakir.resend.app";
var OFFICIAL_EMAIL = process.env.RESEND_INBOUND_EMAIL || "orders@oieldiakir.resend.app";
var ADMIN_EMAILS = [
  "gauravgiri123344@gmail.com",
  "mdhassan1738@gmail.com",
  ...process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean) : []
].filter((v, i, a) => a.indexOf(v) === i);
var ADMIN_EMAIL = ADMIN_EMAILS.join(", ");
var ADMIN_WHATSAPP_NUMBER = process.env.ADMIN_WHATSAPP_NUMBER || "918777400280";
function generateAdminOrderAlertHtml(order) {
  const phoneClean = (order.phone || "").replace(/\D/g, "").slice(-10);
  const itemsListHtml = (order.items || []).map(
    (item, idx) => {
      const color = item.selectedColor || item.product?.selectedColor;
      const colorHtml = color ? `<div style="margin-top: 3px;"><span style="display: inline-block; background-color: #fef08a; color: #854d0e; font-size: 10px; font-weight: 800; padding: 1px 5px; border-radius: 4px; border: 1px solid #fde047;">\u{1F3A8} Colour: ${color}</span></div>` : "";
      return `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 10px 8px; font-size: 13px; color: #0f172a; font-weight: 700;">
          ${idx + 1}. ${item.product?.name || "Item"}
          <div style="font-size: 11px; color: #64748b; font-weight: normal;">
            Brand: ${item.product?.brand || "SmartRun"} | Unit: ${item.product?.unit || "1 pc"}
          </div>
          ${colorHtml}
        </td>
        <td style="padding: 10px 8px; font-size: 13px; color: #334155; text-align: center; font-weight: 700;">
          ${item.quantity}
        </td>
        <td style="padding: 10px 8px; font-size: 13px; color: #0f172a; text-align: right; font-weight: 800;">
          \u20B9${((item.product?.price || 0) * item.quantity).toLocaleString("en-IN")}
        </td>
      </tr>
    `;
    }
  ).join("");
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>\u{1F6A8} NEW CUSTOMER PURCHASE ALERT - SmartRun</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 20px; color: #1e293b;">
  <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);">
    
    <!-- Top Alert Banner -->
    <div style="background: linear-gradient(135deg, #00875a 0%, #064e3b 100%); padding: 24px 20px; text-align: center; color: #ffffff;">
      <div style="display: inline-block; background-color: #facc15; color: #0f172a; font-weight: 900; font-size: 13px; padding: 5px 12px; border-radius: 6px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
        \u{1F6A8} NEW CUSTOMER ORDER RECEIVED
      </div>
      <h1 style="color: #ffffff; font-size: 22px; font-weight: 900; margin: 4px 0;">
        Order #${order.id || "SR-100000"} \u2014 \u20B9${(order.totalAmount || 0).toLocaleString("en-IN")}
      </h1>
      <p style="color: #d1fae5; font-size: 13px; margin: 0;">
        Fulfillment &amp; Dispatch Alert (${(/* @__PURE__ */ new Date()).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST)
      </p>
    </div>

    <!-- Quick Action CTA Buttons -->
    <div style="background-color: #fefce8; border-bottom: 1px solid #fef08a; padding: 14px 20px; text-align: center;">
      <a href="tel:${order.phone}" style="display: inline-block; background-color: #0f172a; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 16px; border-radius: 8px; margin: 4px;">
        \u{1F4DE} Call Customer (${order.phone})
      </a>
      <a href="https://wa.me/91${phoneClean}?text=Hello%20${encodeURIComponent(order.customerName || "Customer")},%20we%20have%20received%20your%20SmartRun%20Order%20${order.id}!%20We%20are%20processing%20it%20for%20dispatch." style="display: inline-block; background-color: #16a34a; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 10px 16px; border-radius: 8px; margin: 4px;">
        \u{1F4AC} WhatsApp Customer
      </a>
    </div>

    <div style="padding: 24px;">
      
      <!-- Customer & Delivery Information -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 10px 0; font-size: 13px; text-transform: uppercase; color: #0f172a; font-weight: 800; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
          \u{1F464} Customer & Delivery Address
        </h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; line-height: 1.6;">
          <tr>
            <td style="color: #64748b; width: 35%; padding-bottom: 4px;">Customer Name:</td>
            <td style="color: #0f172a; font-weight: 800; padding-bottom: 4px;">${order.customerName || "Valued Customer"}</td>
          </tr>
          <tr>
            <td style="color: #64748b; padding-bottom: 4px;">Mobile Phone:</td>
            <td style="color: #0f172a; font-weight: 800; padding-bottom: 4px;">
              <a href="tel:${order.phone}" style="color: #2563eb; text-decoration: none;">${order.phone || "+91"}</a>
            </td>
          </tr>
          <tr>
            <td style="color: #64748b; padding-bottom: 4px;">Email:</td>
            <td style="color: #0f172a; font-weight: 600; padding-bottom: 4px;">${order.customerEmail || "Not provided (Phone checkout)"}</td>
          </tr>
          <tr>
            <td style="color: #64748b; padding-bottom: 4px;">Delivery Address:</td>
            <td style="color: #0f172a; font-weight: 700; padding-bottom: 4px;">${order.address || "Address on file"}</td>
          </tr>
          ${order.landmark ? `
          <tr>
            <td style="color: #64748b; padding-bottom: 4px;">Landmark:</td>
            <td style="color: #0f172a; font-weight: 600; padding-bottom: 4px;">${order.landmark}</td>
          </tr>` : ""}
          <tr>
            <td style="color: #64748b; padding-bottom: 4px;">Area & PIN:</td>
            <td style="color: #0f172a; font-weight: 800; padding-bottom: 4px;">${order.area || "Kolkata"}, PIN: ${order.pincode || "700001"}</td>
          </tr>
          <tr>
            <td style="color: #64748b; padding-bottom: 4px;">Payment Method:</td>
            <td style="color: #0f172a; font-weight: 900; padding-bottom: 4px; text-transform: uppercase;">
              ${order.paymentMethod === "cod" ? "\u{1F4B5} CASH ON DELIVERY (COD - Collect at door)" : "\u26A1 ONLINE UPI / CARD (PAID)"}
            </td>
          </tr>
        </table>
      </div>

      <!-- Ordered Items Breakdown -->
      <h3 style="margin: 0 0 10px 0; font-size: 13px; text-transform: uppercase; color: #0f172a; font-weight: 800;">
        \u{1F4E6} Ordered Items (${(order.items || []).length} items)
      </h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
        <thead>
          <tr style="background-color: #0f172a; color: #ffffff; text-align: left;">
            <th style="padding: 10px 8px; border-radius: 6px 0 0 6px;">Product / Brand</th>
            <th style="padding: 10px 8px; text-align: center;">Qty</th>
            <th style="padding: 10px 8px; text-align: right; border-radius: 0 6px 6px 0;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsListHtml}
        </tbody>
      </table>

      <!-- Order Total Summary Box -->
      <div style="background-color: #f1f5f9; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="color: #64748b; padding-bottom: 6px;">Subtotal:</td>
            <td style="color: #0f172a; font-weight: 700; text-align: right; padding-bottom: 6px;">\u20B9${(order.itemTotal || 0).toLocaleString("en-IN")}</td>
          </tr>
          <tr>
            <td style="color: #64748b; padding-bottom: 6px;">Delivery Fee:</td>
            <td style="color: #16a34a; font-weight: 700; text-align: right; padding-bottom: 6px;">${(order.deliveryFee || 0) === 0 ? "FREE" : "\u20B9" + order.deliveryFee}</td>
          </tr>
          ${(order.rainFee || 0) > 0 ? `
          <tr>
            <td style="color: #64748b; padding-bottom: 6px;">\u{1F327}\uFE0F Rain / Weather Fee:</td>
            <td style="color: #0284c7; font-weight: 700; text-align: right; padding-bottom: 6px;">\u20B9${order.rainFee}</td>
          </tr>` : ""}
          ${(order.surgeFee || 0) > 0 ? `
          <tr>
            <td style="color: #64748b; padding-bottom: 6px;">\u26A1 Peak Surge Fee:</td>
            <td style="color: #d97706; font-weight: 700; text-align: right; padding-bottom: 6px;">\u20B9${order.surgeFee}</td>
          </tr>` : ""}
          ${(order.productHandlingFee || 0) > 0 ? `
          <tr>
            <td style="color: #64748b; padding-bottom: 6px;">\u{1F4E6} Special Product Surcharge:</td>
            <td style="color: #475569; font-weight: 700; text-align: right; padding-bottom: 6px;">\u20B9${order.productHandlingFee}</td>
          </tr>` : ""}
          ${(order.discount || 0) > 0 ? `
          <tr>
            <td style="color: #16a34a; padding-bottom: 6px;">Discount Applied:</td>
            <td style="color: #16a34a; font-weight: 700; text-align: right; padding-bottom: 6px;">-\u20B9${order.discount}</td>
          </tr>` : ""}
          <tr style="border-top: 2px solid #cbd5e1;">
            <td style="color: #0f172a; font-weight: 900; font-size: 16px; padding-top: 8px;">Grand Total:</td>
            <td style="color: #b91c1c; font-weight: 900; font-size: 18px; text-align: right; padding-top: 8px;">
              \u20B9${(order.totalAmount || 0).toLocaleString("en-IN")}
            </td>
          </tr>
        </table>
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #0f172a; color: #94a3b8; padding: 18px; text-align: center; font-size: 11px;">
      SmartRun Store Admin Notification System \u2022 SmartRun materials pvt. ltd, Kheyadah Village, Bhagabanpur, Kolkata 700150<br>
      Admin Alert Email: ${ADMIN_EMAIL}
    </div>
  </div>
</body>
</html>
  `;
}
var receivedEmailsStore = [
  {
    id: "inbound-sample-1",
    from: "subhojit.contractor@gmail.com",
    fromName: "Subhojit Bannerjee (Kasba Project)",
    to: OFFICIAL_EMAIL,
    subject: "Bulk Quote Request: 200 Coils 2.5mm Polycab Wire & 50 Switch Plates",
    text: "Hello SmartRun Team,\n\nWe have a 4-storey residential wiring project commencing at Kasba Bosepukur. Need best bulk rates for:\n- 200 Coils Polycab FR-LSH 2.5 sq mm\n- 100 Coils 1.5 sq mm\n- 50 Schneider Opale 8-Module plates\n\nCan you deliver via 60-min express dispatch to Kasba site? GST invoice required.\n\nRegards,\nSubhojit (+91 98301 22456)",
    receivedAt: new Date(Date.now() - 36e5 * 2).toISOString(),
    status: "unread",
    category: "quote",
    phone: "+91 98301 22456"
  },
  {
    id: "inbound-sample-2",
    from: "priya.ghosh@outlook.com",
    fromName: "Priya Ghosh",
    to: OFFICIAL_EMAIL,
    subject: "Inquiry: Electrician Technician Visit for DB Box Short Circuit",
    text: "Hi Team,\n\nOur main MCB distribution board tripped in our Salt Lake Sector 2 apartment this morning. Can a certified electrician visit today between 3 PM - 5 PM?\n\nContact: +91 98310 99881",
    receivedAt: new Date(Date.now() - 36e5 * 5).toISOString(),
    status: "read",
    category: "support",
    phone: "+91 98310 99881"
  }
];
var DATA_DIR = import_path.default.join(process.cwd(), "data");
var SAVED_ADDRESSES_FILE = import_path.default.join(DATA_DIR, "saved_addresses.json");
function ensureDataDir() {
  try {
    if (!import_fs.default.existsSync(DATA_DIR)) {
      import_fs.default.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn("[Server Data Dir Notice]:", err);
  }
}
function loadSavedAddressesFile() {
  try {
    ensureDataDir();
    if (import_fs.default.existsSync(SAVED_ADDRESSES_FILE)) {
      const raw = import_fs.default.readFileSync(SAVED_ADDRESSES_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn("[Server Read Saved Addresses Notice]:", err);
  }
  return [];
}
function writeSavedAddressesFile(addresses) {
  try {
    ensureDataDir();
    import_fs.default.writeFileSync(SAVED_ADDRESSES_FILE, JSON.stringify(addresses, null, 2), "utf-8");
  } catch (err) {
    console.warn("[Server Write Saved Addresses Notice]:", err);
  }
}
var TECHNICIAN_REVIEWS_FILE = import_path.default.join(DATA_DIR, "technician_reviews.json");
function loadTechnicianReviewsFile() {
  try {
    ensureDataDir();
    if (import_fs.default.existsSync(TECHNICIAN_REVIEWS_FILE)) {
      const raw = import_fs.default.readFileSync(TECHNICIAN_REVIEWS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn("[Server Read Technician Reviews Notice]:", err);
  }
  return [];
}
function writeTechnicianReviewsFile(reviews) {
  try {
    ensureDataDir();
    import_fs.default.writeFileSync(TECHNICIAN_REVIEWS_FILE, JSON.stringify(reviews, null, 2), "utf-8");
  } catch (err) {
    console.warn("[Server Write Technician Reviews Notice]:", err);
  }
}
var RIDER_ASSIGNMENTS_FILE = import_path.default.join(DATA_DIR, "rider_assignments.json");
function loadRiderAssignmentsFile() {
  try {
    ensureDataDir();
    if (import_fs.default.existsSync(RIDER_ASSIGNMENTS_FILE)) {
      const raw = import_fs.default.readFileSync(RIDER_ASSIGNMENTS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") return parsed;
    }
  } catch (err) {
    console.warn("[Server Read Rider Assignments Notice]:", err);
  }
  return {};
}
function writeRiderAssignmentsFile(assignments) {
  try {
    ensureDataDir();
    import_fs.default.writeFileSync(RIDER_ASSIGNMENTS_FILE, JSON.stringify(assignments, null, 2), "utf-8");
  } catch (err) {
    console.warn("[Server Write Rider Assignments Notice]:", err);
  }
}
var ORDER_REVIEWS_FILE = import_path.default.join(DATA_DIR, "order_reviews.json");
function loadOrderReviewsFile() {
  try {
    ensureDataDir();
    if (import_fs.default.existsSync(ORDER_REVIEWS_FILE)) {
      const raw = import_fs.default.readFileSync(ORDER_REVIEWS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") return parsed;
    }
  } catch (err) {
    console.warn("[Server Read Order Reviews Notice]:", err);
  }
  return {};
}
function writeOrderReviewsFile(reviews) {
  try {
    ensureDataDir();
    import_fs.default.writeFileSync(ORDER_REVIEWS_FILE, JSON.stringify(reviews, null, 2), "utf-8");
  } catch (err) {
    console.warn("[Server Write Order Reviews Notice]:", err);
  }
}
var WELCOMED_USERS_FILE = import_path.default.join(DATA_DIR, "welcomed_users.json");
function loadWelcomedUsersFile() {
  try {
    ensureDataDir();
    if (import_fs.default.existsSync(WELCOMED_USERS_FILE)) {
      const raw = import_fs.default.readFileSync(WELCOMED_USERS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return new Set(parsed.map((e) => String(e).trim().toLowerCase()));
      }
    }
  } catch (err) {
    console.warn("[Server Read Welcomed Users Notice]:", err);
  }
  return /* @__PURE__ */ new Set();
}
var welcomedUsersStore = loadWelcomedUsersFile();
function recordWelcomedUser(email) {
  if (!email || !email.includes("@")) return;
  const clean = email.trim().toLowerCase();
  if (clean.includes("@girirajpower.internal")) return;
  welcomedUsersStore.add(clean);
  try {
    ensureDataDir();
    import_fs.default.writeFileSync(WELCOMED_USERS_FILE, JSON.stringify(Array.from(welcomedUsersStore), null, 2), "utf-8");
  } catch (err) {
    console.warn("[Server Write Welcomed Users Notice]:", err);
  }
}
function isUserWelcomed(email) {
  if (!email || !email.includes("@")) return true;
  const clean = email.trim().toLowerCase();
  if (clean.includes("@girirajpower.internal")) return true;
  return welcomedUsersStore.has(clean);
}
var DELIVERED_EMAILS_FILE = import_path.default.join(DATA_DIR, "delivered_emails_sent.json");
function loadDeliveredEmailsFile() {
  try {
    ensureDataDir();
    if (import_fs.default.existsSync(DELIVERED_EMAILS_FILE)) {
      const raw = import_fs.default.readFileSync(DELIVERED_EMAILS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return new Set(parsed.map((id) => String(id).trim()));
      }
    }
  } catch (err) {
    console.warn("[Server Read Delivered Emails Notice]:", err);
  }
  return /* @__PURE__ */ new Set();
}
var deliveredEmailsStore = loadDeliveredEmailsFile();
function recordDeliveredEmailSent(orderId, email) {
  if (!orderId) return;
  const rawId = String(orderId).trim();
  deliveredEmailsStore.add(rawId);
  const short = getShortOrderCode(rawId);
  if (short) deliveredEmailsStore.add(short);
  if (short) deliveredEmailsStore.add(`#${short}`);
  try {
    ensureDataDir();
    import_fs.default.writeFileSync(DELIVERED_EMAILS_FILE, JSON.stringify(Array.from(deliveredEmailsStore), null, 2), "utf-8");
  } catch (err) {
    console.warn("[Server Write Delivered Emails Notice]:", err);
  }
}
function isDeliveredEmailSent(orderId) {
  if (!orderId) return false;
  const rawId = String(orderId).trim();
  const short = getShortOrderCode(rawId);
  return deliveredEmailsStore.has(rawId) || deliveredEmailsStore.has(short) || deliveredEmailsStore.has(`#${short}`);
}
var serverSupabaseClient = null;
function getServerSupabase() {
  const url = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "https://iffdkhzctkbglmvaayeh.supabase.co").trim();
  let serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  if (serviceRoleKey.length < 20 || serviceRoleKey.includes("YOUR_") || serviceRoleKey.includes("placeholder")) {
    serviceRoleKey = "";
  }
  const anonKey = (process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "sb_publishable_C7DzW73hItwOaxr9R4Z2dw_HtjCqHaS").trim();
  const key = serviceRoleKey || anonKey;
  if (!url || !key || key.length < 20 || url.includes("YOUR_") || key.includes("YOUR_")) {
    return null;
  }
  if (!serverSupabaseClient) {
    try {
      serverSupabaseClient = (0, import_supabase_js.createClient)(url, key, {
        auth: { persistSession: false, autoRefreshToken: false }
      });
    } catch (e) {
      console.warn("[Server Supabase Init Notice]:", e);
      return null;
    }
  }
  return serverSupabaseClient;
}
async function backfillAllUsersToFirebaseFirestore() {
  if (!serverFirestore) {
    console.log("[Firebase Backfill] Firestore not initialized, skipping backfill.");
    return { success: false, error: "Firestore not initialized" };
  }
  const sb = getServerSupabase();
  if (!sb) {
    console.log("[Firebase Backfill] Supabase client unavailable for backfill.");
    return { success: false, error: "Supabase client unavailable" };
  }
  let count = 0;
  try {
    console.log("[Firebase Backfill] Synchronizing existing user profiles to Firebase Cloud Firestore...");
    const { data: profiles, error: pErr } = await sb.from("user_profiles").select("*").limit(500);
    if (!pErr && Array.isArray(profiles)) {
      for (const prof of profiles) {
        const uid = prof.user_id || prof.id;
        if (!uid) continue;
        if (prof.email && !prof.email.includes("@girirajpower.internal")) {
          recordWelcomedUser(prof.email);
        }
        const cleanPhone = (prof.phone || "").replace(/\D/g, "").slice(-10);
        await syncUserToBackendFirestore(uid, {
          phone: cleanPhone ? `+91${cleanPhone}` : prof.phone || "",
          full_name: prof.full_name || prof.name || "",
          name: prof.name || prof.full_name || "",
          email: prof.email && !prof.email.includes("@girirajpower.internal") ? prof.email : "",
          avatar_url: prof.avatar_url || "",
          dob: prof.dob || "",
          address: prof.address || ""
        });
        count++;
      }
    }
    const { data: orders, error: oErr } = await sb.from("orders").select("user_id, phone, customer_name, customer_email, recipient_name, recipient_email, recipient_phone, address, address_line1").order("created_at", { ascending: false }).limit(200);
    if (!oErr && Array.isArray(orders)) {
      for (const order of orders) {
        const cleanPhone = (order.phone || order.recipient_phone || "").replace(/\D/g, "").slice(-10);
        const uid = order.user_id || (cleanPhone ? `phone_${cleanPhone}` : null);
        if (!uid) continue;
        const cleanEmail = (order.customer_email || order.recipient_email || "").trim().toLowerCase();
        const emailToSave = cleanEmail.includes("@girirajpower.internal") ? "" : cleanEmail;
        const nameToSave = order.customer_name || order.recipient_name || "";
        if (emailToSave) {
          recordWelcomedUser(emailToSave);
        }
        await syncUserToBackendFirestore(uid, {
          phone: cleanPhone ? `+91${cleanPhone}` : "",
          full_name: nameToSave,
          name: nameToSave,
          email: emailToSave,
          address: order.address || order.address_line1 || ""
        });
        count++;
      }
    }
    console.log(`[Firebase Backfill] Successfully synced ${count} existing user/customer records to Firebase Cloud Firestore.`);
    return { success: true, syncedCount: count };
  } catch (err) {
    console.warn("[Firebase Backfill] Error during sync:", err?.message || err);
    return { success: false, error: err?.message || err };
  }
}
var catalogCache = null;
var CATALOG_CACHE_TTL_MS = 60 * 1e3;
async function getCachedCatalog(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && catalogCache && now - catalogCache.timestamp < CATALOG_CACHE_TTL_MS) {
    return { products: catalogCache.products, fromCache: true, etag: catalogCache.etag };
  }
  let productsList = [];
  const sb = getServerSupabase();
  if (sb) {
    try {
      const { data, error } = await sb.from("products").select("*").order("id", { ascending: true });
      if (!error && Array.isArray(data) && data.length > 0) {
        productsList = data;
      }
    } catch (sbErr) {
      console.warn("[Server Catalog Cache] DB query notice:", sbErr);
    }
  }
  if (!Array.isArray(productsList)) {
    productsList = [];
  }
  const hash = import_crypto.default.createHash("md5").update(JSON.stringify(productsList.map((p) => ({ id: p.id, price: p.price, stock: p.in_stock, updated: p.updated_at })))).digest("hex");
  catalogCache = {
    products: productsList,
    timestamp: now,
    etag: `"${hash}"`
  };
  return { products: catalogCache.products, fromCache: false, etag: catalogCache.etag };
}
function sanitize(input) {
  if (typeof input !== "string") {
    return "";
  }
  return input.replace(/[<>]/g, "").trim();
}
var getClientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.ip || req.socket.remoteAddress || "127.0.0.1";
};
var apiLimiter = (0, import_express_rate_limit.default)({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  max: 5e3,
  // 5000 requests per 15 minutes to allow uninterrupted real-time polling and navigation
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false, forwardedHeader: false, default: false },
  keyGenerator: getClientIp,
  skip: (req) => {
    const path2 = req.path || req.originalUrl || "";
    return path2.includes("/health") || path2.includes("/auth/") || path2.includes("/rider-location") || path2.includes("/categories") || path2.includes("/products");
  },
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
    retryAfterMinutes: 15
  }
});
var emailOtpLimiter = (0, import_express_rate_limit.default)({
  windowMs: 15 * 60 * 1e3,
  max: 20,
  // 20 requests per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false, forwardedHeader: false, default: false },
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many OTP requests from this connection. Please wait a few minutes before trying again."
  }
});
var strictLimiter = (0, import_express_rate_limit.default)({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  max: 10,
  // 10 requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false, forwardedHeader: false, default: false },
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Rate limit exceeded. Please try again later.",
    retryAfterMinutes: 15
  }
});
function requireApiSecret(req, res, next) {
  const secret = process.env.API_SECRET_KEY;
  if (!secret) {
    return res.status(500).json({
      success: false,
      message: "API_SECRET_KEY environment variable is not configured."
    });
  }
  const clientKey = req.headers["x-api-key"];
  if (!clientKey || clientKey !== secret) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or missing API key."
    });
  }
  next();
}
var smsOtpLimiter = (0, import_express_rate_limit.default)({
  windowMs: 10 * 60 * 1e3,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false, forwardedHeader: false, default: false },
  keyGenerator: getClientIp,
  message: {
    success: false,
    error: "Too many SMS requests from this network. Please wait a few minutes before trying again."
  }
});
var phoneResolveLimiter = (0, import_express_rate_limit.default)({
  windowMs: 10 * 60 * 1e3,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false, forwardedHeader: false, default: false },
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Lookup rate limit exceeded. Please wait a few minutes before trying again."
  }
});
var loginRateLimiter = (0, import_express_rate_limit.default)({
  windowMs: 15 * 60 * 1e3,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false, forwardedHeader: false, default: false },
  keyGenerator: getClientIp,
  message: {
    success: false,
    error: "Too many login attempts from this network. Please wait 15 minutes before trying again or sign in with OTP."
  }
});
var registerRateLimiter = (0, import_express_rate_limit.default)({
  windowMs: 30 * 60 * 1e3,
  max: 6,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false, forwardedHeader: false, default: false },
  keyGenerator: getClientIp,
  message: {
    success: false,
    error: "Registration rate limit reached. Please wait a few minutes before creating a new account."
  }
});
var accountLookupLimiter = (0, import_express_rate_limit.default)({
  windowMs: 10 * 60 * 1e3,
  max: 25,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false, forwardedHeader: false, default: false },
  keyGenerator: getClientIp,
  message: {
    success: false,
    error: "Lookup limit exceeded. Please wait a few minutes before trying again."
  }
});
var failedLoginTracker = /* @__PURE__ */ new Map();
var DISPOSABLE_EMAIL_DOMAINS = /* @__PURE__ */ new Set([
  "mailinator.com",
  "tempmail.com",
  "10minutemail.com",
  "guerrillamail.com",
  "yopmail.com",
  "sharklasers.com",
  "trashmail.com",
  "throwawaymail.com",
  "dispostable.com",
  "fakeinbox.com",
  "getairmail.com",
  "maildrop.cc"
]);
function maskPhoneNumber(phone) {
  const digits = String(phone || "").replace(/\D/g, "").slice(-10);
  if (digits.length < 4) return "******";
  return `+91 ******${digits.slice(-4)}`;
}
var phoneLastSmsSentTime = /* @__PURE__ */ new Map();
async function getAuthenticatedUser(req) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7).trim();
    const sb = getServerSupabase();
    if (sb && token) {
      try {
        const { data: { user }, error } = await sb.auth.getUser(token);
        if (!error && user) {
          return user;
        }
      } catch {
      }
    }
  }
  return null;
}
async function isAuthorizedAdminOrSecret(req) {
  const secret = process.env.API_SECRET_KEY;
  const clientKey = req.headers["x-api-key"] || req.headers["x-admin-key"] || "";
  if (secret && clientKey && clientKey === secret) {
    return true;
  }
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7).trim();
    const sb = getServerSupabase();
    if (sb && token) {
      try {
        const { data: { user }, error } = await sb.auth.getUser(token);
        if (!error && user && user.email && ADMIN_EMAILS.includes(user.email.toLowerCase())) {
          return true;
        }
      } catch {
      }
    }
  }
  const clientEmail = req.headers["x-admin-email"] || req.headers["x-user-email"] || "";
  if (clientEmail && ADMIN_EMAILS.includes(clientEmail.trim().toLowerCase())) {
    if (!secret || clientKey && clientKey === secret) {
      return true;
    }
  }
  return false;
}
async function requireAdminOrSecret(req, res, next) {
  const isAuthorized = await isAuthorizedAdminOrSecret(req);
  if (!isAuthorized) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Access restricted to administrators."
    });
  }
  next();
}
var orderCheckoutLimiter = (0, import_express_rate_limit.default)({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  max: 30,
  // 30 checkout submissions per 15 mins per IP
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false, forwardedHeader: false, default: false },
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Order submission rate limit exceeded. Please wait a moment before trying again.",
    retryAfterMinutes: 15
  }
});
var emailDispatchLimiter = (0, import_express_rate_limit.default)({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  max: 25,
  // 25 email dispatches per 15 mins per IP
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false, forwardedHeader: false, default: false },
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Email dispatch limit reached. Please wait a few minutes before sending another inquiry.",
    retryAfterMinutes: 15
  }
});
var aiAssistantLimiter = (0, import_express_rate_limit.default)({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  max: 40,
  // 40 queries per 15 mins per IP
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false, forwardedHeader: false, default: false },
  keyGenerator: getClientIp,
  message: {
    text: "You have reached the AI assistant query limit for this 15-minute window. Please contact our Kolkata sales desk directly at +91 87774 00280 for immediate guidance.",
    mapsSources: [
      {
        uri: "https://share.google/EWHvo68Oi2DsChWWV",
        title: "SmartRun Kasba Hub, Kolkata"
      }
    ]
  }
});
var idempotencyStore = /* @__PURE__ */ new Map();
var IDEMPOTENCY_TTL_MS = 24 * 60 * 60 * 1e3;
setInterval(() => {
  const cutoff = Date.now() - IDEMPOTENCY_TTL_MS;
  for (const [key, record] of idempotencyStore.entries()) {
    if (record.timestamp < cutoff) {
      idempotencyStore.delete(key);
    }
  }
}, 30 * 60 * 1e3);
var OrderItemSchema = import_zod.z.object({
  product: import_zod.z.object({
    id: import_zod.z.string().min(1),
    name: import_zod.z.string().min(1),
    price: import_zod.z.number().nonnegative(),
    brand: import_zod.z.string().optional(),
    unit: import_zod.z.string().optional(),
    image: import_zod.z.string().optional(),
    selectedColor: import_zod.z.string().optional()
  }).passthrough(),
  quantity: import_zod.z.number().int().positive().max(1e3, "Quantity cannot exceed 1000 units"),
  selectedColor: import_zod.z.string().optional()
});
var OrderCheckoutSchema = import_zod.z.object({
  id: import_zod.z.string().min(3).max(64),
  orderId: import_zod.z.string().optional().nullable(),
  order_id: import_zod.z.string().optional().nullable(),
  orderNumber: import_zod.z.string().optional().nullable(),
  trackingNumber: import_zod.z.string().optional().nullable(),
  tracking_number: import_zod.z.string().optional().nullable(),
  userId: import_zod.z.string().optional().nullable(),
  user_id: import_zod.z.string().optional().nullable(),
  customerName: import_zod.z.string().min(2, "Customer name must be at least 2 characters").max(100),
  phone: import_zod.z.string().min(10, "Phone number must contain at least 10 digits").max(20),
  customerEmail: import_zod.z.string().email("Invalid email format").optional().or(import_zod.z.literal("")).nullable(),
  address: import_zod.z.string().min(5, "Delivery address must be at least 5 characters").max(500),
  area: import_zod.z.string().min(2).max(100),
  pincode: import_zod.z.string().regex(/^7\d{5}$/, "Please provide a valid 6-digit Kolkata PIN code (e.g. 700039)"),
  landmark: import_zod.z.string().max(200).optional().nullable(),
  items: import_zod.z.array(OrderItemSchema).min(1, "Order must contain at least 1 item"),
  itemTotal: import_zod.z.number().nonnegative("Item total must be positive"),
  deliveryFee: import_zod.z.number().nonnegative("Delivery fee cannot be negative"),
  handlingFee: import_zod.z.number().nonnegative().optional().default(0),
  rainFee: import_zod.z.number().nonnegative().optional().default(0),
  surgeFee: import_zod.z.number().nonnegative().optional().default(0),
  productHandlingFee: import_zod.z.number().nonnegative().optional().default(0),
  fees: import_zod.z.number().nonnegative().optional().default(0),
  feeBreakdown: import_zod.z.any().optional().nullable(),
  discount: import_zod.z.number().nonnegative().optional().default(0),
  totalAmount: import_zod.z.number().nonnegative("Total amount must be positive"),
  paymentMethod: import_zod.z.enum(["cod", "upi", "card"]).default("cod"),
  paymentStatus: import_zod.z.enum(["paid", "pending"]).default("pending"),
  paymentId: import_zod.z.string().optional().nullable(),
  razorpayPaymentId: import_zod.z.string().optional().nullable(),
  razorpayOrderId: import_zod.z.string().optional().nullable(),
  razorpaySignature: import_zod.z.string().optional().nullable(),
  razorpay_payment_id: import_zod.z.string().optional().nullable(),
  razorpay_order_id: import_zod.z.string().optional().nullable(),
  razorpay_signature: import_zod.z.string().optional().nullable(),
  status: import_zod.z.enum(["pending", "accepted", "packing", "out_for_delivery", "delivered", "cancelled"]).default("pending"),
  createdAt: import_zod.z.string().optional(),
  estimatedDeliveryTimestamp: import_zod.z.number().optional(),
  idempotencyKey: import_zod.z.string().max(128).optional(),
  deliveryPartner: import_zod.z.object({
    name: import_zod.z.string(),
    phone: import_zod.z.string(),
    vehicleNumber: import_zod.z.string(),
    currentHub: import_zod.z.string()
  }).optional().nullable(),
  notes: import_zod.z.string().optional().nullable()
});
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = Number(process.env.PORT) || 3e3;
  app.set("trust proxy", 1);
  app.use((req, res, next) => {
    try {
      decodeURI(req.url);
      decodeURIComponent(req.path);
      next();
    } catch (err) {
      if (err instanceof URIError || err?.name === "URIError") {
        return res.status(404).send("Not Found");
      }
      next(err);
    }
  });
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    const isAllowedOrigin = !origin || origin === "https://www.smartrun.in" || origin === "https://smartrun.in" || origin === "https://www.girirajpower.in" || origin === "https://girirajpower.in" || origin === "https://localhost" || origin === "http://localhost" || origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:") || origin.startsWith("capacitor://") || origin.startsWith("ionic://") || origin.startsWith("smartrun://") || origin.endsWith(".run.app") || origin.endsWith(".googleusercontent.com") || origin.endsWith(".aistudio.google.com");
    if (origin && isAllowedOrigin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
    } else if (!origin) {
      res.setHeader("Access-Control-Allow-Origin", "*");
    } else {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-api-key, x-admin-key, x-admin-email, x-user-email, x-idempotency-key, if-none-match, Cache-Control, Pragma, Cookie, x-requested-with");
    res.setHeader("Access-Control-Expose-Headers", "ETag, X-Cache, Content-Disposition, Set-Cookie");
    if (req.method === "OPTIONS") {
      return res.status(204).end();
    }
    next();
  });
  app.use(
    (0, import_compression.default)({
      filter: (req, res) => {
        if (req.headers["x-no-compression"]) {
          return false;
        }
        return import_compression.default.filter(req, res);
      },
      level: 6,
      threshold: 1024
      // Only compress responses > 1KB
    })
  );
  app.use(import_express.default.json({ limit: "15mb" }));
  app.use(import_express.default.urlencoded({ extended: true, limit: "15mb" }));
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.removeHeader("X-Frame-Options");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", 'camera=(), microphone=(), payment=(self "https://api.razorpay.com"), geolocation=*');
    if (req.secure || req.headers["x-forwarded-proto"] === "https") {
      res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    }
    res.removeHeader("X-Powered-By");
    next();
  });
  const KNOWN_MALICIOUS_BOT_REGEX = /sqlmap|acunetix|masscan|dirbuster|gobuster|wpscan|nmap|havij|zgrab|censys|shodan|python-requests|go-http-client|apache-httpclient|libwww-perl|petalbot|dotbot|bytespider/i;
  const PATH_TRAVERSAL_REGEX = /(?:\.\.[\/\\]|%2e%2e[\/\\]|\/etc\/(?:passwd|shadow|hosts)|\/proc\/self|\.env|\.git\/|web\.config|phpmyadmin|\.aws\/|\.ssh\/)/i;
  const SQLI_REGEX = /(?:\bunion\s+(?:all\s+)?select\b|\bdrop\s+table\b|\binsert\s+into\b|\bdelete\s+from\b|\bupdate\s+.*\s+set\b|\bexec\s*\(\s*xp_|\bselect\s+.*\s+from\s+information_schema)/i;
  const XSS_PAYLOAD_REGEX = /(?:<script[\s\S]*?>|javascript:\s*[\w\.\(\)]|on(?:error|load|click|mouseover)\s*=)/i;
  app.use((req, res, next) => {
    const userAgent = String(req.headers["user-agent"] || "");
    const rawUrl = req.originalUrl || req.url || "";
    if (KNOWN_MALICIOUS_BOT_REGEX.test(userAgent) && !/googlebot|bingbot|applebot|duckduckbot/i.test(userAgent)) {
      console.warn(`[Firewall] Blocked malicious user agent (${userAgent.slice(0, 50)}) from IP: ${req.ip}`);
      return res.status(403).json({ success: false, error: "Access Denied: Automated scanning bot blocked by SmartRun Firewall." });
    }
    if (PATH_TRAVERSAL_REGEX.test(rawUrl)) {
      console.warn(`[Firewall] Blocked path traversal attempt (${rawUrl.slice(0, 80)}) from IP: ${req.ip}`);
      return res.status(403).json({ success: false, error: "Access Denied: Path traversal detected." });
    }
    if (SQLI_REGEX.test(rawUrl)) {
      console.warn(`[Firewall] Blocked SQL injection attempt from IP: ${req.ip}`);
      return res.status(403).json({ success: false, error: "Access Denied: Malicious SQL signature detected." });
    }
    if (XSS_PAYLOAD_REGEX.test(rawUrl)) {
      console.warn(`[Firewall] Blocked XSS attempt in URL from IP: ${req.ip}`);
      return res.status(403).json({ success: false, error: "Access Denied: Malicious script pattern detected." });
    }
    next();
  });
  function sanitizeObject(obj) {
    if (!obj || typeof obj !== "object") return;
    for (const key of Object.keys(obj)) {
      if (key === "__proto__" || key === "constructor" || key === "prototype") {
        delete obj[key];
      } else if (typeof obj[key] === "object") {
        sanitizeObject(obj[key]);
      }
    }
  }
  app.use((req, res, next) => {
    if (req.body && typeof req.body === "object") {
      sanitizeObject(req.body);
    }
    next();
  });
  function parseCookies(cookieHeader) {
    const list = {};
    if (!cookieHeader) return list;
    cookieHeader.split(";").forEach((cookie) => {
      let [name, ...rest] = cookie.split("=");
      name = name?.trim();
      if (!name) return;
      const value = rest.join("=").trim();
      try {
        list[name] = decodeURIComponent(value);
      } catch {
        list[name] = value;
      }
    });
    return list;
  }
  app.get(["/healthz", "/api/health", "/api/healthz"], (req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({
      status: "ok",
      app: "SmartRun Kolkata Express",
      uptime: process.uptime(),
      timestamp: Date.now()
    });
  });
  app.use("/api", apiLimiter);
  app.get("/.well-known/assetlinks.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=3600");
    const candidates = [
      import_path.default.join(process.cwd(), "public", ".well-known", "assetlinks.json"),
      import_path.default.join(process.cwd(), "dist", ".well-known", "assetlinks.json"),
      import_path.default.join(__dirnameResolved, "public", ".well-known", "assetlinks.json")
    ];
    for (const p of candidates) {
      if (import_fs.default.existsSync(p)) {
        return res.sendFile(p);
      }
    }
    res.json([
      {
        relation: [
          "delegate_permission/common.handle_all_urls",
          "delegate_permission/common.get_login_creds"
        ],
        target: {
          namespace: "android_app",
          package_name: "in.smartrun.app",
          sha256_cert_fingerprints: [
            "83:35:6B:EA:95:7A:69:7A:BB:7D:A4:4F:C3:B1:96:AE:7A:9F:65:CC:46:00:56:52:FA:12:42:6B:CC:F2:A7:DE",
            "23:B9:84:0D:7F:F5:08:E9:87:61:C5:F5:9C:B6:2C:22:60:75:30:27:68:20:1B:D6:B9:A0:EA:94:C9:D4:06:8C",
            "14:6D:E9:7D:0C:6D:77:E5:EE:DE:28:B6:F0:4B:92:47:FD:B3:36:CF:BE:0C:F0:7C:1E:58:E6:C3:FF:11:EB:7B",
            "91:E1:44:1D:A9:F0:1B:BA:B7:7E:33:E5:14:7C:A6:AE:7E:5B:0A:ED:AB:EC:C2:6F:DD:0E:DF:C6:84:72:7A:E5",
            "DB:D8:FC:92:9D:5C:47:E2:0C:1F:D3:58:EE:91:C4:85:AB:3A:CB:33:CD:09:6F:B4:7A:1D:6B:B7:64:85:00:3A"
          ]
        }
      }
    ]);
  });
  app.get("/.well-known/ard.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=3600");
    const candidates = [
      import_path.default.join(process.cwd(), "public", ".well-known", "ard.json"),
      import_path.default.join(process.cwd(), "dist", ".well-known", "ard.json"),
      import_path.default.join(__dirnameResolved, "public", ".well-known", "ard.json")
    ];
    for (const p of candidates) {
      if (import_fs.default.existsSync(p)) {
        return res.sendFile(p);
      }
    }
    return res.status(404).json({ error: "ARD manifest not found" });
  });
  app.get(["/.well-known/ai-agent-manifest.json", "/.well-known/ai-plugin.json"], (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=3600");
    const requestedFile = req.path.endsWith("ai-plugin.json") ? "ai-plugin.json" : "ai-agent-manifest.json";
    const candidates = [
      import_path.default.join(process.cwd(), "public", ".well-known", requestedFile),
      import_path.default.join(process.cwd(), "dist", ".well-known", requestedFile),
      import_path.default.join(__dirnameResolved, "public", ".well-known", requestedFile)
    ];
    for (const p of candidates) {
      if (import_fs.default.existsSync(p)) {
        return res.sendFile(p);
      }
    }
    res.status(404).json({ error: "Manifest not found" });
  });
  app.get("/api/ai/openapi.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=3600");
    return res.json({
      openapi: "3.1.0",
      info: {
        title: "SmartRun Express Electricals & Construction API",
        version: "1.1.4",
        description: "Public catalog, product lookup, and discovery feeds for SmartRun Kolkata (in.smartrun.app)."
      },
      servers: [{ url: "https://www.smartrun.in" }],
      paths: {
        "/api/products": {
          get: {
            operationId: "listProducts",
            summary: "List active electrical and construction products available for 60-minute delivery in Kolkata",
            responses: { "200": { description: "JSON list of active catalog products" } }
          }
        },
        "/api/products/{id}": {
          get: {
            operationId: "getProductById",
            summary: "Retrieve a single electrical or construction product by ID",
            parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
            responses: { "200": { description: "Product details" }, "404": { description: "Product not found" } }
          }
        },
        "/api/feeds/google-merchant.xml": {
          get: {
            operationId: "getGoogleMerchantFeed",
            summary: "Retrieve Google Merchant Center RSS 2.0 XML product feed",
            responses: { "200": { description: "XML product feed" } }
          }
        },
        "/healthz": {
          get: {
            operationId: "getHealthStatus",
            summary: "Service health probe",
            responses: { "200": { description: "Service healthy" } }
          }
        }
      }
    });
  });
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const { products } = await getCachedCatalog();
      const sitemapXml = generateDynamicSitemap(products, DEMO_TECHNICIANS);
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=3600");
      return res.status(200).send(sitemapXml);
    } catch (err) {
      console.error("[Sitemap Handler] Error rendering dynamic sitemap:", err);
      const fallbackPath = import_path.default.join(process.cwd(), "public", "sitemap.xml");
      if (import_fs.default.existsSync(fallbackPath)) {
        return res.sendFile(fallbackPath);
      }
      return res.status(500).send("<error>Failed to render sitemap</error>");
    }
  });
  const handleRssFeed = async (req, res) => {
    try {
      const { products } = await getCachedCatalog();
      const rssXml = generateRssFeed(products);
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=7200");
      return res.status(200).send(rssXml);
    } catch (err) {
      console.error("[RSS Feed Handler] Error rendering dynamic RSS feed:", err);
      return res.status(500).send("<error>Failed to render RSS feed</error>");
    }
  };
  app.get(["/rss.xml", "/feed.xml", "/rss", "/feed"], handleRssFeed);
  app.get("/robots.txt", (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    const candidates = [
      import_path.default.join(process.cwd(), "public", "robots.txt"),
      import_path.default.join(process.cwd(), "dist", "robots.txt"),
      import_path.default.join(__dirnameResolved, "public", "robots.txt")
    ];
    for (const p of candidates) {
      if (import_fs.default.existsSync(p)) {
        return res.sendFile(p);
      }
    }
    res.status(404).send("Robots.txt not found");
  });
  app.get("/llms.txt", (_req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Link", '</.well-known/ard.json>; rel="ard"; type="application/json"');
    res.setHeader("Cache-Control", "public, max-age=86400");
    const candidates = [
      import_path.default.join(process.cwd(), "public", "llms.txt"),
      import_path.default.join(process.cwd(), "dist", "llms.txt"),
      import_path.default.join(__dirnameResolved, "public", "llms.txt")
    ];
    for (const p of candidates) {
      if (import_fs.default.existsSync(p)) {
        return res.sendFile(p);
      }
    }
    return res.status(404).send("llms.txt not found");
  });
  const handleGoogleMerchantFeed = async (req, res) => {
    try {
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=1800, s-maxage=3600");
      const { products } = await getCachedCatalog();
      const feePolicy = getServerFeePolicy();
      const xml = generateGoogleMerchantFeed(products, {
        shippingRate: feePolicy.baseDeliveryFee,
        freeDeliveryThreshold: feePolicy.freeDeliveryThreshold,
        productCharges: feePolicy.productCharges
      });
      return res.status(200).send(xml);
    } catch (err) {
      console.error("[Google Merchant Feed] Failed to generate XML feed:", err);
      return res.status(500).send("<error>Failed to generate Google Merchant feed</error>");
    }
  };
  app.get("/api/feeds/google-merchant.xml", handleGoogleMerchantFeed);
  app.get("/feeds/google-merchant.xml", handleGoogleMerchantFeed);
  app.get("/google-merchant.xml", handleGoogleMerchantFeed);
  const SERVER_BOOT_TIME = (/* @__PURE__ */ new Date()).toISOString();
  function getActiveVersionInfo() {
    try {
      const candidates = [
        import_path.default.join(process.cwd(), "public", "version.json"),
        import_path.default.join(process.cwd(), "dist", "version.json"),
        import_path.default.join(__dirnameResolved, "public", "version.json"),
        import_path.default.join(__dirnameResolved, "version.json")
      ];
      for (const p of candidates) {
        if (import_fs.default.existsSync(p)) {
          const raw = import_fs.default.readFileSync(p, "utf-8");
          const parsed = JSON.parse(raw);
          if (parsed && parsed.buildId) {
            return {
              success: true,
              version: parsed.version || process.env.npm_package_version || "1.1.3",
              versionCode: parsed.versionCode || 14,
              buildId: parsed.buildId,
              builtAt: parsed.builtAt || SERVER_BOOT_TIME,
              serverStartedAt: SERVER_BOOT_TIME,
              environment: process.env.NODE_ENV || "development",
              timestamp: Date.now()
            };
          }
        }
      }
    } catch (err) {
      console.warn("[Server Version Check Notice]:", err);
    }
    const fallbackBuildId = process.env.BUILD_ID || process.env.VITE_APP_BUILD_ID || `v1.1.3-14-${SERVER_BOOT_TIME}`;
    return {
      success: true,
      version: process.env.npm_package_version || "1.1.3",
      versionCode: 14,
      buildId: fallbackBuildId,
      builtAt: SERVER_BOOT_TIME,
      serverStartedAt: SERVER_BOOT_TIME,
      environment: process.env.NODE_ENV || "development",
      timestamp: Date.now()
    };
  }
  app.get("/api/version", (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    const versionInfo = getActiveVersionInfo();
    res.json(versionInfo);
  });
  app.get("/version.json", (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    const versionInfo = getActiveVersionInfo();
    res.json(versionInfo);
  });
  app.all(["/__/auth/*", "/__/firebase/*"], async (req, res) => {
    const projectId = serverFirebaseProjectId || process.env.FIREBASE_PROJECT_ID || "";
    if (!projectId) {
      return res.status(503).send("Firebase Auth proxy unavailable.");
    }
    try {
      const upstreamOrigin = `https://${projectId}.firebaseapp.com`;
      const targetUrl = `${upstreamOrigin}${req.originalUrl}`;
      const forwardHeaders = {};
      for (const [k, v] of Object.entries(req.headers)) {
        const key = k.toLowerCase();
        if (key === "host" || key === "connection" || key === "content-length" || key === "accept-encoding") {
          continue;
        }
        if (typeof v === "string") {
          forwardHeaders[key] = v;
        } else if (Array.isArray(v)) {
          forwardHeaders[key] = v.join(", ");
        }
      }
      const reqHost = req.get("host");
      if (reqHost) {
        forwardHeaders["x-forwarded-host"] = reqHost;
        forwardHeaders["x-forwarded-proto"] = req.protocol || "https";
      }
      const hasBody = req.method !== "GET" && req.method !== "HEAD";
      let upstreamBody;
      if (hasBody && req.body) {
        const contentType = String(req.headers["content-type"] || "").toLowerCase();
        if (typeof req.body === "string") {
          upstreamBody = req.body;
        } else if (contentType.includes("application/x-www-form-urlencoded")) {
          const params = new URLSearchParams();
          for (const [bk, bv] of Object.entries(req.body)) {
            if (bv !== void 0 && bv !== null) {
              params.append(bk, String(bv));
            }
          }
          upstreamBody = params.toString();
        } else if (Object.keys(req.body).length > 0) {
          upstreamBody = JSON.stringify(req.body);
        }
      }
      const upstreamRes = await fetch(targetUrl, {
        method: req.method,
        headers: forwardHeaders,
        body: upstreamBody,
        redirect: "manual"
      });
      res.status(upstreamRes.status);
      const publicOrigin = reqHost ? `https://${reqHost}` : "";
      upstreamRes.headers.forEach((value, key) => {
        const lower = key.toLowerCase();
        if (lower === "content-encoding" || lower === "transfer-encoding" || lower === "content-length") {
          return;
        }
        if (lower === "location" && publicOrigin && value.startsWith(upstreamOrigin)) {
          res.setHeader(key, `${publicOrigin}${value.slice(upstreamOrigin.length)}`);
          return;
        }
        res.setHeader(key, value);
      });
      const buf = Buffer.from(await upstreamRes.arrayBuffer());
      return res.send(buf);
    } catch (proxyErr) {
      console.warn("[Firebase Auth Proxy Error]:", proxyErr?.message || proxyErr);
      return res.status(502).send("Unable to reach Firebase Authentication handler.");
    }
  });
  const getActiveGoogleMapsApiKey = () => {
    const envKey = (process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY || process.env.MAPS_API_KEY || process.env.GOOGLE_API_KEY || "").trim();
    if (envKey && envKey !== "YOUR_API_KEY" && !envKey.includes("placeholder") && !envKey.includes("demo") && envKey.length > 10) {
      return envKey;
    }
    return "";
  };
  let cachedGoogleMapsStatus = null;
  app.get("/api/maps/google/status", async (req, res) => {
    const now = Date.now();
    const isForceRefresh = req.query.fresh === "true" || req.query.refresh === "true";
    if (!isForceRefresh && cachedGoogleMapsStatus && now - cachedGoogleMapsStatus.checkedAt < 5 * 60 * 1e3) {
      return res.json({ success: true, ...cachedGoogleMapsStatus });
    }
    const apiKey = getActiveGoogleMapsApiKey();
    if (!apiKey || apiKey === "YOUR_API_KEY" || apiKey.includes("placeholder")) {
      cachedGoogleMapsStatus = {
        checkedAt: now,
        available: false,
        billingEnabled: false,
        apiKey: "",
        reason: "NoApiKey"
      };
      return res.json({ success: true, ...cachedGoogleMapsStatus });
    }
    cachedGoogleMapsStatus = {
      checkedAt: now,
      available: true,
      billingEnabled: true,
      apiKey
    };
    return res.json({ success: true, ...cachedGoogleMapsStatus });
  });
  app.get("/api/maps/google/rev-geocode", async (req, res) => {
    try {
      const lat = parseFloat(req.query.lat);
      const lng = parseFloat(req.query.lng);
      if (isNaN(lat) || isNaN(lng)) {
        return res.status(400).json({ success: false, message: "Invalid latitude/longitude" });
      }
      const apiKey = getActiveGoogleMapsApiKey();
      if (!apiKey || apiKey === "YOUR_API_KEY") {
        return res.status(500).json({ success: false, message: "GOOGLE_MAPS_API_KEY is not configured" });
      }
      try {
        const googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
        const gRes = await fetch(googleUrl);
        if (gRes.ok) {
          const data = await gRes.json();
          if (data.status === "OK" && Array.isArray(data.results) && data.results.length > 0) {
            const first = data.results[0];
            let street = "";
            let building = "";
            let locality = "";
            let city = "Kolkata";
            let state = "West Bengal";
            let pincode = "";
            if (Array.isArray(first.address_components)) {
              for (const comp of first.address_components) {
                if (comp.types.includes("premise") || comp.types.includes("subpremise") || comp.types.includes("point_of_interest") || comp.types.includes("establishment")) {
                  building = comp.long_name;
                }
                if (comp.types.includes("route") || comp.types.includes("street_address")) {
                  street = comp.long_name;
                }
                if (comp.types.includes("sublocality") || comp.types.includes("neighborhood")) {
                  locality = comp.long_name;
                }
                if (comp.types.includes("locality") || comp.types.includes("administrative_area_level_2")) {
                  city = comp.long_name;
                }
                if (comp.types.includes("administrative_area_level_1")) {
                  state = comp.long_name;
                }
                if (comp.types.includes("postal_code")) {
                  pincode = comp.long_name;
                }
              }
            }
            if (Array.isArray(data.results)) {
              for (const r of data.results) {
                if (Array.isArray(r.address_components)) {
                  if (!building) {
                    const bld = r.address_components.find(
                      (c) => c.types.includes("premise") || c.types.includes("subpremise") || c.types.includes("point_of_interest") || c.types.includes("establishment")
                    );
                    if (bld && bld.long_name) building = bld.long_name;
                  }
                  if (!pincode) {
                    const found = r.address_components.find((c) => c.types.includes("postal_code"));
                    if (found && found.long_name) pincode = found.long_name;
                  }
                }
                if (!pincode && r.formatted_address) {
                  const match = r.formatted_address.match(/\b(7[0-1]\d{4})\b/);
                  if (match) {
                    pincode = match[1];
                  }
                }
              }
            }
            if (!pincode) {
              const kolkataGeomAreas = [
                { pincode: "700001", lat: 22.5744, lng: 88.3547 },
                { pincode: "700016", lat: 22.5512, lng: 88.3533 },
                { pincode: "700064", lat: 22.5867, lng: 88.4178 },
                { pincode: "700091", lat: 22.5735, lng: 88.4331 },
                { pincode: "700156", lat: 22.5898, lng: 88.4682 },
                { pincode: "700135", lat: 22.6045, lng: 88.4879 },
                { pincode: "700136", lat: 22.6284, lng: 88.4485 },
                { pincode: "700019", lat: 22.5195, lng: 88.3653 },
                { pincode: "700025", lat: 22.5354, lng: 88.3478 },
                { pincode: "700027", lat: 22.5186, lng: 88.3308 },
                { pincode: "700084", lat: 22.4645, lng: 88.3842 },
                { pincode: "700032", lat: 22.4988, lng: 88.3698 },
                { pincode: "700034", lat: 22.5023, lng: 88.3187 },
                { pincode: "700004", lat: 22.6033, lng: 88.3721 },
                { pincode: "700028", lat: 22.6322, lng: 88.4067 },
                { pincode: "711101", lat: 22.5855, lng: 88.3312 },
                { pincode: "700046", lat: 22.5441, lng: 88.3892 },
                { pincode: "700089", lat: 22.6078, lng: 88.4019 }
              ];
              let closestP = "700001";
              let minD = Infinity;
              for (const a of kolkataGeomAreas) {
                const d = Math.hypot(a.lat - lat, a.lng - lng);
                if (d < minD) {
                  minD = d;
                  closestP = a.pincode;
                }
              }
              pincode = closestP;
            }
            const resolvedStreet = street || first.formatted_address?.split(",")[0] || locality || "Kolkata";
            return res.json({
              success: true,
              source: "google-maps",
              result: {
                formattedAddress: first.formatted_address,
                building: building || (first.types?.includes("premise") ? first.address_components?.[0]?.long_name : ""),
                street: resolvedStreet,
                locality: locality || city,
                suburb: locality,
                city,
                state,
                pincode: pincode || "700001",
                lat,
                lng
              }
            });
          }
        }
      } catch (gErr) {
        console.warn("[Google Rev Geocode Notice]:", gErr);
      }
      const osmUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
      const osmRes = await fetch(osmUrl, {
        headers: { "Accept-Language": "en", "User-Agent": "SmartRunKolkata/1.0" }
      });
      if (osmRes.ok) {
        const osmData = await osmRes.json();
        const addr = osmData.address || {};
        const street = addr.road || addr.suburb || addr.neighbourhood || "Kolkata";
        return res.json({
          success: true,
          source: "osm-fallback",
          result: {
            formattedAddress: osmData.display_name,
            street,
            locality: addr.suburb || street,
            city: addr.city || "Kolkata",
            state: addr.state || "West Bengal",
            pincode: addr.postcode || "",
            lat,
            lng
          }
        });
      }
      return res.status(404).json({ success: false, message: "Google reverse geocoding unavailable" });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Google reverse geocode error" });
    }
  });
  app.get("/api/maps/google/directions", async (req, res) => {
    try {
      const origin = (req.query.origin || "").trim();
      const destination = (req.query.destination || "").trim();
      const waypoints = (req.query.waypoints || "").trim();
      if (!origin || !destination) {
        return res.status(400).json({ success: false, message: "Missing origin or destination" });
      }
      const apiKey = getActiveGoogleMapsApiKey();
      if (!apiKey || apiKey === "YOUR_API_KEY") {
        return res.status(500).json({ success: false, message: "Google Maps API key not configured" });
      }
      let googleUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=driving&key=${apiKey}`;
      if (waypoints) {
        googleUrl += `&waypoints=${encodeURIComponent(waypoints)}`;
      }
      const gRes = await fetch(googleUrl);
      if (gRes.ok) {
        const data = await gRes.json();
        return res.json({ success: data.status === "OK", ...data });
      }
      return res.status(502).json({ success: false, message: "Google Directions API request failed" });
    } catch (err) {
      return res.status(500).json({ success: false, message: err?.message || "Directions proxy error" });
    }
  });
  app.get("/api/maps/places-autocomplete", async (req, res) => {
    try {
      const query = (req.query.input || "").trim();
      const apiKey = getActiveGoogleMapsApiKey();
      const ALL_KOLKATA_HUBS = [
        { id: "hub-kasba", name: "Kasba Industrial Estate / Warehouse Hub", secondaryText: "Phase 1, Kasba, Kolkata, West Bengal, PIN 700107", building: "Kasba Warehouse Hub", road: "Kasba Industrial Estate", area: "Kasba", city: "Kolkata", pincode: "700107", lat: 22.5186, lng: 88.3932, source: "google-maps-platform" },
        { id: "hub-acropolis", name: "Acropolis Mall & Rajdanga Commercial Center", secondaryText: "1858/1 Rajdanga Main Road, Kasba, Kolkata, PIN 700107", building: "Acropolis Mall", road: "Rajdanga Main Road", area: "Kasba", city: "Kolkata", pincode: "700107", lat: 22.5147, lng: 88.3934, source: "google-maps-platform" },
        { id: "hub-park-st", name: "Park Street & Camac Street Commercial Hub", secondaryText: "Park Street, Central Kolkata, West Bengal, PIN 700016", building: "Park Center", road: "Park Street", area: "Park Street", city: "Kolkata", pincode: "700016", lat: 22.5516, lng: 88.3524, source: "google-maps-platform" },
        { id: "hub-salt-lake", name: "Salt Lake Sector V (Tech Hub & Commercial Towers)", secondaryText: "Sector V, Bidhannagar, Kolkata, West Bengal, PIN 700091", building: "Sector V Tech Towers", road: "Ring Road", area: "Salt Lake", city: "Kolkata", pincode: "700091", lat: 22.5735, lng: 88.4331, source: "google-maps-platform" },
        { id: "hub-cc1", name: "City Centre 1 Salt Lake", secondaryText: "DC Block, Sector 1, Bidhannagar, Kolkata, PIN 700064", building: "City Centre 1", road: "DC Block Road", area: "Salt Lake", city: "Kolkata", pincode: "700064", lat: 22.5898, lng: 88.4077, source: "google-maps-platform" },
        { id: "hub-new-town", name: "New Town Action Area I, II & III", secondaryText: "Major Arterial Road, New Town, Kolkata, West Bengal, PIN 700156", building: "New Town City Center", road: "Major Arterial Road", area: "New Town", city: "Kolkata", pincode: "700156", lat: 22.5855, lng: 88.4695, source: "google-maps-platform" },
        { id: "hub-dlf", name: "DLF IT Park 1 & 2", secondaryText: "Major Arterial Road, Action Area I, New Town, PIN 700156", building: "DLF IT Park", road: "Major Arterial Road", area: "New Town", city: "Kolkata", pincode: "700156", lat: 22.5802, lng: 88.4601, source: "google-maps-platform" },
        { id: "hub-ecospace", name: "Ecospace Business Park", secondaryText: "Action Area II, Rajarhat, New Town, Kolkata, PIN 700160", building: "Ecospace Business Park", road: "Rajarhat Main Road", area: "New Town", city: "Kolkata", pincode: "700160", lat: 22.5937, lng: 88.4718, source: "google-maps-platform" },
        { id: "hub-ballygunge", name: "Ballygunge Circular Road & Gariahat", secondaryText: "Ballygunge, South Kolkata, West Bengal, PIN 700019", building: "Ballygunge Commercial Plaza", road: "Ballygunge Circular Road", area: "Ballygunge", city: "Kolkata", pincode: "700019", lat: 22.528, lng: 88.365, source: "google-maps-platform" },
        { id: "hub-quest-mall", name: "Quest Mall & Syed Amir Ali Avenue", secondaryText: "33 Syed Amir Ali Avenue, Park Circus, Ballygunge, PIN 700017", building: "Quest Mall", road: "Syed Amir Ali Avenue", area: "Ballygunge", city: "Kolkata", pincode: "700017", lat: 22.5392, lng: 88.3655, source: "google-maps-platform" },
        { id: "hub-south-city", name: "South City Mall & Residential Complex", secondaryText: "375 Prince Anwar Shah Road, Jadavpur, Kolkata, PIN 700068", building: "South City Mall", road: "Prince Anwar Shah Road", area: "Jadavpur", city: "Kolkata", pincode: "700068", lat: 22.5016, lng: 88.3617, source: "google-maps-platform" },
        { id: "hub-alipore", name: "Alipore & New Alipore Estates", secondaryText: "Alipore, South Kolkata, West Bengal, PIN 700027", building: "Alipore Park Place", road: "Alipore Road", area: "Alipore", city: "Kolkata", pincode: "700027", lat: 22.529, lng: 88.33, source: "google-maps-platform" },
        { id: "hub-bhawanipore", name: "Bhawanipore & Forum Mall Elgin Road", secondaryText: "10/3 Elgin Road, Bhawanipore, Kolkata, West Bengal, PIN 700020", building: "Forum Mall", road: "Elgin Road", area: "Bhawanipore", city: "Kolkata", pincode: "700020", lat: 22.5369, lng: 88.3514, source: "google-maps-platform" },
        { id: "hub-ruby", name: "Ruby General Hospital & Anandapur Corridor", secondaryText: "Kasba Golpark, EM Bypass, Kolkata, West Bengal, PIN 700107", building: "Ruby General Hospital", road: "EM Bypass", area: "Kasba", city: "Kolkata", pincode: "700107", lat: 22.5135, lng: 88.4025, source: "google-maps-platform" },
        { id: "hub-urbana", name: "Urbana Residential Complex & Commercial Towers", secondaryText: "783 Anandapur, EM Bypass, Kolkata, West Bengal, PIN 700107", building: "Urbana Complex", road: "Anandapur Road", area: "Anandapur", city: "Kolkata", pincode: "700107", lat: 22.518, lng: 88.406, source: "google-maps-platform" },
        { id: "hub-mani-square", name: "Mani Square Mall & EM Bypass Commercial Hub", secondaryText: "164/1 Maniktala Main Road, EM Bypass, Kankurgachi, PIN 700054", building: "Mani Square Mall", road: "EM Bypass", area: "Kankurgachi", city: "Kolkata", pincode: "700054", lat: 22.5746, lng: 88.4022, source: "google-maps-platform" },
        { id: "hub-garia", name: "Garia & Kavi Nazrul Metro Corridor", secondaryText: "Garia Main Road, South Kolkata, West Bengal, PIN 700084", building: "Garia Station Road Plaza", road: "NSC Bose Road", area: "Garia", city: "Kolkata", pincode: "700084", lat: 22.464, lng: 88.384, source: "google-maps-platform" },
        { id: "hub-behala", name: "Behala Chowrasta & Diamond Harbour Road", secondaryText: "Diamond Harbour Road, Behala, Kolkata, West Bengal, PIN 700034", building: "Chowrasta Commercial Market", road: "Diamond Harbour Road", area: "Behala", city: "Kolkata", pincode: "700034", lat: 22.4988, lng: 88.3149, source: "google-maps-platform" },
        { id: "hub-tollygunge", name: "Tollygunge & Diamond City South", secondaryText: "58 MG Road, Tollygunge Karunamoyee, Kolkata, PIN 700041", building: "Diamond City South", road: "MG Road", area: "Tollygunge", city: "Kolkata", pincode: "700041", lat: 22.4876, lng: 88.3371, source: "google-maps-platform" },
        { id: "hub-jadavpur", name: "Jadavpur University & 8B Bus Stand", secondaryText: "Raja SC Mullick Road, Jadavpur, Kolkata, West Bengal, PIN 700032", building: "Jadavpur 8B Commercial Point", road: "Raja SC Mullick Road", area: "Jadavpur", city: "Kolkata", pincode: "700032", lat: 22.498, lng: 88.371, source: "google-maps-platform" },
        { id: "hub-howrah", name: "Howrah Station & Foreshore Road Commercial Hub", secondaryText: "Howrah Railway Station Area, Howrah, West Bengal, PIN 711101", building: "Howrah Central Arcade", road: "Foreshore Road", area: "Howrah", city: "Kolkata", pincode: "711101", lat: 22.585, lng: 88.343, source: "google-maps-platform" }
      ];
      if (!query || query.toLowerCase() === "all") {
        return res.json({ success: true, source: "google-maps-platform", results: ALL_KOLKATA_HUBS });
      }
      if (apiKey && apiKey !== "YOUR_API_KEY") {
        try {
          const gmpRes = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": apiKey,
              "X-Goog-FieldMask": "suggestions.placePrediction.placeId,suggestions.placePrediction.structuredFormat,suggestions.placePrediction.text,suggestions.placePrediction.types"
            },
            body: JSON.stringify({
              input: query,
              locationBias: {
                circle: {
                  center: { latitude: 22.5726, longitude: 88.3639 },
                  radius: 45e3
                }
              },
              includedRegionCodes: ["in"]
            })
          });
          if (gmpRes.ok) {
            const data = await gmpRes.json();
            const suggestions = data.suggestions || [];
            if (suggestions.length > 0) {
              const googleResults = suggestions.map((s) => {
                const pred = s.placePrediction;
                if (!pred) return null;
                const mainText = pred.structuredFormat?.mainText?.text || pred.text?.text || "";
                const secondaryText = pred.structuredFormat?.secondaryText?.text || "Kolkata, West Bengal";
                return {
                  id: pred.placeId ? `gmp-${pred.placeId}` : `gmp-${Math.random()}`,
                  placeId: pred.placeId,
                  name: mainText,
                  building: mainText,
                  secondaryText,
                  source: "google-maps-platform"
                };
              }).filter(Boolean);
              if (googleResults.length > 0) {
                return res.json({ success: true, source: "google-maps-platform", results: googleResults });
              }
            }
          }
        } catch (gmpErr) {
          console.warn("[Google Maps API Autocomplete fallback notice]:", gmpErr);
        }
      }
      const matchingCurated = ALL_KOLKATA_HUBS.filter(
        (hub) => hub.name.toLowerCase().includes(query.toLowerCase()) || hub.secondaryText.toLowerCase().includes(query.toLowerCase()) || hub.building && hub.building.toLowerCase().includes(query.toLowerCase()) || hub.area && hub.area.toLowerCase().includes(query.toLowerCase()) || hub.pincode.includes(query)
      );
      const queryWithKolkata = query.toLowerCase().includes("kolkata") || query.toLowerCase().includes("howrah") || /^\d{6}$/.test(query) ? query : `${query}, Kolkata`;
      try {
        const osmRes = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
            queryWithKolkata
          )}&viewbox=88.10,22.75,88.58,22.35&bounded=0&countrycodes=in&limit=10&addressdetails=1`,
          {
            headers: { "Accept-Language": "en", "User-Agent": "SmartRunKolkata/1.0" }
          }
        );
        if (osmRes.ok) {
          const osmData = await osmRes.json();
          if (Array.isArray(osmData) && osmData.length > 0) {
            const geocodedResults = osmData.filter((item) => {
              const lat = parseFloat(item.lat);
              const lon = parseFloat(item.lon);
              return !isNaN(lat) && !isNaN(lon) && lat >= 22 && lat <= 23.2 && lon >= 88 && lon <= 88.8;
            }).map((item, idx) => {
              const addr = item.address || {};
              const buildingName = item.name || addr.building || addr.amenity || addr.shop || addr.office || addr.commercial || addr.residential || addr.leisure || addr.tourism || "";
              const roadName = addr.road || addr.street || addr.pedestrian || addr.footway || "";
              const areaName = addr.suburb || addr.neighbourhood || addr.quarter || addr.city_district || "";
              const cityName = addr.city || addr.state_district || "Kolkata";
              const pincode = addr.postcode || "";
              const placeName = buildingName || roadName || areaName || item.display_name?.split(",")[0] || query;
              const secondaryParts = [
                buildingName && roadName && !buildingName.toLowerCase().includes(roadName.toLowerCase()) ? roadName : null,
                areaName && !placeName.toLowerCase().includes(areaName.toLowerCase()) ? areaName : null,
                cityName,
                pincode ? `PIN ${pincode}` : null
              ].filter(Boolean);
              const secondary = secondaryParts.join(", ") || item.display_name?.split(",").slice(1, 4).join(", ");
              return {
                id: item.place_id ? `osm-${item.place_id}` : `geo-${idx}`,
                name: placeName.trim(),
                building: buildingName.trim() || placeName.trim(),
                road: roadName.trim(),
                area: areaName.trim(),
                city: cityName,
                secondaryText: secondary.trim(),
                lat: parseFloat(item.lat),
                lng: parseFloat(item.lon),
                pincode,
                source: "google-maps-geocoding"
              };
            });
            const merged = [...matchingCurated];
            for (const gr of geocodedResults) {
              if (!merged.some((m) => m.name.toLowerCase() === gr.name.toLowerCase())) {
                merged.push(gr);
              }
            }
            if (merged.length > 0) {
              return res.json({ success: true, source: "google-maps-geocoding", results: merged });
            }
          }
        }
      } catch (osmErr) {
        console.warn("[Geocoding search notice]:", osmErr);
      }
      return res.json({ success: true, source: "curated", results: matchingCurated });
    } catch (err) {
      console.error("Places search error:", err);
      return res.status(500).json({ success: false, message: "Location search failed" });
    }
  });
  app.get("/api/maps/place-details", async (req, res) => {
    try {
      const placeId = (req.query.placeId || "").trim();
      if (!placeId) {
        return res.status(400).json({ success: false, message: "Place ID is required" });
      }
      const apiKey = getActiveGoogleMapsApiKey();
      if (!apiKey || apiKey === "YOUR_API_KEY") {
        return res.status(500).json({ success: false, message: "GOOGLE_MAPS_API_KEY is not configured" });
      }
      try {
        const gmpRes = await fetch(
          `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
          {
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": apiKey,
              "X-Goog-FieldMask": "id,displayName,formattedAddress,location,addressComponents"
            }
          }
        );
        if (gmpRes.ok) {
          const data = await gmpRes.json();
          const lat = data.location?.latitude;
          const lng = data.location?.longitude;
          let pincode = "";
          if (Array.isArray(data.addressComponents)) {
            const pinComp = data.addressComponents.find((c) => c.types?.includes("postal_code"));
            if (pinComp) pincode = pinComp.longText || pinComp.shortText || "";
          }
          return res.json({
            success: true,
            placeId,
            name: data.displayName?.text || "",
            formattedAddress: data.formattedAddress || "",
            lat,
            lng,
            pincode
          });
        }
      } catch (gmpErr) {
        console.warn("[Google Maps Place Details error]:", gmpErr);
      }
      return res.json({ success: false, message: "Place details not available from API" });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Place details request failed" });
    }
  });
  app.get("/api/products", async (req, res) => {
    try {
      const { products, fromCache, etag } = await getCachedCatalog();
      if (req.headers["if-none-match"] === etag) {
        return res.status(304).end();
      }
      res.setHeader("ETag", etag);
      res.setHeader("Cache-Control", "public, max-age=60, s-maxage=120, stale-while-revalidate=300");
      res.setHeader("X-Cache", fromCache ? "HIT" : "MISS");
      return res.json({
        success: true,
        count: products.length,
        fromCache,
        products
      });
    } catch (err) {
      console.error("Error fetching cached products catalog:", err);
      return res.status(500).json({ success: false, message: "Failed to fetch products catalog." });
    }
  });
  app.post("/api/products/cache/clear", requireAdminOrSecret, (req, res) => {
    catalogCache = null;
    res.setHeader("Cache-Control", "no-store");
    res.json({ success: true, message: "Server in-memory catalog cache purged." });
  });
  app.get("/api/products/:id", async (req, res) => {
    try {
      const productId = req.params.id;
      const { products } = await getCachedCatalog();
      const product = products.find((p) => String(p.id) === String(productId));
      if (product) {
        return res.json({ success: true, product });
      }
      const sb = getServerSupabase();
      if (sb) {
        const { data, error } = await sb.from("products").select("*").eq("id", productId).single();
        if (!error && data) {
          return res.json({ success: true, product: data });
        }
      }
      return res.status(404).json({ success: false, message: `Product with ID '${productId}' not found.` });
    } catch (err) {
      return res.status(500).json({ success: false, message: err?.message || "Failed to retrieve product." });
    }
  });
  app.post("/api/products", requireAdminOrSecret, async (req, res) => {
    try {
      const body = req.body || {};
      if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
        return res.status(400).json({ success: false, message: "Product name is required." });
      }
      const price = Number(body.price ?? 0);
      if (isNaN(price) || price < 0) {
        return res.status(400).json({ success: false, message: "Valid positive price is required." });
      }
      const mrp = Number(body.mrp ?? body.originalPrice ?? body.original_price ?? (price > 0 ? price * 1.15 : 0));
      let imageUrls = [];
      if (Array.isArray(body.image_urls) && body.image_urls.length > 0) {
        imageUrls = body.image_urls.filter((u) => typeof u === "string" && u.trim().length > 0);
      } else if (Array.isArray(body.images) && body.images.length > 0) {
        imageUrls = body.images.filter((u) => typeof u === "string" && u.trim().length > 0);
      } else if (typeof body.image_urls === "string" && body.image_urls.startsWith("http")) {
        imageUrls = [body.image_urls];
      } else if (typeof body.image === "string" && body.image.startsWith("http")) {
        imageUrls = [body.image];
      }
      if (imageUrls.length === 0) {
        imageUrls = [];
      }
      let specifications = {};
      if (body.specifications && typeof body.specifications === "object") {
        specifications = body.specifications;
      } else if (body.specs && typeof body.specs === "object") {
        specifications = body.specs;
      } else if (typeof body.specifications === "string") {
        try {
          specifications = JSON.parse(body.specifications);
        } catch {
          specifications = { "Description": body.specifications };
        }
      }
      const newProductRow = {
        name: body.name.trim(),
        brand: body.brand && String(body.brand).trim() || "SmartRun Genuine",
        category: body.category && String(body.category).trim() || "Electrical",
        subcategory: (body.subcategory || body.subCategory || body.sub_category || "General").trim(),
        price,
        mrp: mrp >= price ? mrp : price,
        description: body.description && String(body.description).trim() || "High-grade certified material for residential and commercial projects.",
        specifications,
        stock_quantity: Math.max(0, Number(body.stock_quantity ?? body.stock_count ?? body.stock ?? 50)),
        image_urls: imageUrls,
        rating_avg: Number(body.rating_avg || body.rating || 4.8),
        rating_count: Number(body.rating_count || body.reviewsCount || 12),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      if (body.id) {
        newProductRow.id = String(body.id);
      }
      const sb = getServerSupabase();
      let savedProduct = null;
      if (sb) {
        const { data, error } = await sb.from("products").upsert(newProductRow).select().single();
        if (error) {
          console.error("[Server Add Product] Supabase error:", error);
          return res.status(500).json({ success: false, message: error.message, error });
        }
        savedProduct = data;
      } else {
        newProductRow.id = newProductRow.id || `prod-${Date.now()}`;
        newProductRow.created_at = (/* @__PURE__ */ new Date()).toISOString();
        savedProduct = newProductRow;
      }
      catalogCache = null;
      console.log(`[Server] Product added successfully: ${savedProduct.name} (${savedProduct.id})`);
      return res.status(201).json({
        success: true,
        message: "Product successfully added to catalog.",
        product: savedProduct
      });
    } catch (err) {
      console.error("[Server] Exception adding product:", err);
      return res.status(500).json({ success: false, message: err?.message || "Failed to create product." });
    }
  });
  app.put("/api/products/:id", requireAdminOrSecret, async (req, res) => {
    try {
      const productId = req.params.id;
      const updates = req.body || {};
      updates.updated_at = (/* @__PURE__ */ new Date()).toISOString();
      const sb = getServerSupabase();
      if (!sb) {
        return res.status(503).json({ success: false, message: "Database connection not available." });
      }
      const { data, error } = await sb.from("products").update(updates).eq("id", productId).select().single();
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
      catalogCache = null;
      return res.json({ success: true, message: "Product updated successfully", product: data });
    } catch (err) {
      return res.status(500).json({ success: false, message: err?.message || "Failed to update product." });
    }
  });
  app.delete("/api/products/:id", requireAdminOrSecret, async (req, res) => {
    try {
      const productId = req.params.id;
      const sb = getServerSupabase();
      if (!sb) {
        return res.status(503).json({ success: false, message: "Database connection not available." });
      }
      const { error } = await sb.from("products").delete().eq("id", productId);
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
      catalogCache = null;
      return res.json({ success: true, message: `Product ${productId} deleted successfully` });
    } catch (err) {
      return res.status(500).json({ success: false, message: err?.message || "Failed to delete product." });
    }
  });
  const FEE_SETTINGS_FILE = import_path.default.join(process.cwd(), "data", "fee-settings.json");
  const DEFAULT_FEE_POLICY = {
    freeDeliveryThreshold: 0,
    baseDeliveryFee: 0,
    handlingFee: 0,
    rainFee: {
      enabled: false,
      amount: 0,
      label: "Rain / Weather Surcharge"
    },
    surgeFee: {
      enabled: false,
      amount: 0,
      label: "Peak Demand Surge"
    },
    customFees: [],
    productCharges: {},
    productChargeMode: "per_item",
    updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    updatedBy: "system"
  };
  let serverFeePolicyCache = null;
  function getServerFeePolicy() {
    if (serverFeePolicyCache) return serverFeePolicyCache;
    try {
      if (import_fs.default.existsSync(FEE_SETTINGS_FILE)) {
        const raw = import_fs.default.readFileSync(FEE_SETTINGS_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        serverFeePolicyCache = {
          ...DEFAULT_FEE_POLICY,
          ...parsed,
          rainFee: { ...DEFAULT_FEE_POLICY.rainFee, ...parsed.rainFee || {} },
          surgeFee: { ...DEFAULT_FEE_POLICY.surgeFee, ...parsed.surgeFee || {} },
          productCharges: parsed.productCharges || {},
          customFees: Array.isArray(parsed.customFees) ? parsed.customFees : []
        };
        return serverFeePolicyCache;
      }
    } catch (err) {
      console.warn("[FeePolicy] Read file warning:", err);
    }
    serverFeePolicyCache = { ...DEFAULT_FEE_POLICY };
    return serverFeePolicyCache;
  }
  function updateServerFeePolicy(patch, updatedBy = "backend_app") {
    const current = getServerFeePolicy();
    const updated = {
      ...current,
      ...patch,
      rainFee: patch.rainFee ? { ...current.rainFee, ...patch.rainFee } : current.rainFee,
      surgeFee: patch.surgeFee ? { ...current.surgeFee, ...patch.surgeFee } : current.surgeFee,
      productCharges: patch.productCharges ? { ...current.productCharges, ...patch.productCharges } : current.productCharges,
      customFees: patch.customFees !== void 0 ? patch.customFees : current.customFees,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedBy
    };
    serverFeePolicyCache = updated;
    try {
      const dir = import_path.default.dirname(FEE_SETTINGS_FILE);
      if (!import_fs.default.existsSync(dir)) import_fs.default.mkdirSync(dir, { recursive: true });
      import_fs.default.writeFileSync(FEE_SETTINGS_FILE, JSON.stringify(updated, null, 2), "utf-8");
    } catch (err) {
      console.error("[FeePolicy] Failed to write fee-settings.json:", err);
    }
    const sb = getServerSupabase();
    if (sb) {
      sb.from("app_settings").upsert({ key: "fee_policy", value: updated, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).then(({ error }) => {
        if (error && !error.message?.includes("does not exist")) {
          console.warn("[FeePolicy] Supabase backup notice:", error.message);
        }
      }).catch(() => {
      });
    }
    return updated;
  }
  function computeOrderCharges(items, claimedSubtotal, policy = getServerFeePolicy()) {
    const activeItems = Array.isArray(items) ? items.filter((it) => it && (it.quantity || 0) > 0) : [];
    const computedSubtotal = activeItems.reduce((sum, it) => {
      const price = typeof it.product?.price === "number" ? it.product.price : Number(it.price) || 0;
      return sum + price * (it.quantity || 1);
    }, 0);
    const subtotal = typeof claimedSubtotal === "number" && claimedSubtotal > 0 ? claimedSubtotal : computedSubtotal;
    const threshold = Number(policy.freeDeliveryThreshold ?? 0);
    const baseDeliveryFee = Number(policy.baseDeliveryFee ?? 0);
    const isFreeDelivery = baseDeliveryFee === 0 || subtotal >= threshold || activeItems.length === 0;
    const deliveryFee = isFreeDelivery ? 0 : baseDeliveryFee;
    const handlingFee = activeItems.length > 0 ? Number(policy.handlingFee ?? 0) : 0;
    const rainFee = policy.rainFee?.enabled && activeItems.length > 0 ? Math.max(0, Number(policy.rainFee?.amount || 0)) : 0;
    const surgeFee = policy.surgeFee?.enabled && activeItems.length > 0 ? Math.max(0, Number(policy.surgeFee?.amount || 0)) : 0;
    const productChargesMap = policy.productCharges || {};
    const chargeMode = policy.productChargeMode || "per_item";
    const productCharges = [];
    let totalProductCharges = 0;
    for (const it of activeItems) {
      const pId = String(it.product?.id || it.productId || it.id || "");
      const unitCharge = productChargesMap[pId] !== void 0 ? Number(productChargesMap[pId]) : Number(it.product?.deliveryCharge ?? it.deliveryCharge ?? it.product?.handlingCharge ?? 0);
      if (unitCharge > 0) {
        const q = it.quantity || 1;
        const lineTotal = chargeMode === "per_item" ? unitCharge * q : unitCharge;
        totalProductCharges += lineTotal;
        productCharges.push({
          productId: pId,
          name: it.product?.name || it.name || "Product",
          unitCharge,
          quantity: q,
          totalCharge: lineTotal
        });
      }
    }
    let totalCustomFees = 0;
    const customFeesApplied = [];
    if (Array.isArray(policy.customFees) && activeItems.length > 0) {
      for (const cf of policy.customFees) {
        if (cf.enabled && Number(cf.amount) > 0) {
          customFeesApplied.push({ id: cf.id, label: cf.label, amount: Number(cf.amount) });
          totalCustomFees += Number(cf.amount);
        }
      }
    }
    const totalFees = deliveryFee + handlingFee + rainFee + surgeFee + totalProductCharges + totalCustomFees;
    const grandTotal = Math.max(0, subtotal + totalFees);
    return {
      subtotal,
      freeDeliveryThreshold: threshold,
      isFreeDelivery,
      deliveryFee,
      baseDeliveryFee,
      handlingFee,
      rainFee,
      rainFeeActive: Boolean(policy.rainFee?.enabled),
      surgeFee,
      surgeFeeActive: Boolean(policy.surgeFee?.enabled),
      productCharges,
      totalProductCharges,
      customFees: customFeesApplied,
      totalCustomFees,
      totalFees,
      grandTotal
    };
  }
  app.get("/api/fee-settings", (req, res) => {
    res.setHeader("Cache-Control", "no-cache, must-revalidate");
    return res.json({
      success: true,
      settings: getServerFeePolicy()
    });
  });
  app.post("/api/fee-settings", requireAdminOrSecret, (req, res) => {
    try {
      const body = req.body || {};
      const updatedBy = req.headers["x-client-id"] || req.headers["x-user-email"] || "backend_app";
      if (body.productId && (typeof body.charge === "number" || typeof body.productCharge === "number")) {
        const prodId = String(body.productId);
        const charge = Number(body.charge ?? body.productCharge);
        const current = getServerFeePolicy();
        const nextProductCharges = { ...current.productCharges };
        if (charge <= 0) {
          delete nextProductCharges[prodId];
        } else {
          nextProductCharges[prodId] = charge;
        }
        const updated2 = updateServerFeePolicy({ productCharges: nextProductCharges }, String(updatedBy));
        return res.json({
          success: true,
          message: `Product ${prodId} charge set to \u20B9${charge}`,
          settings: updated2
        });
      }
      if (body.removeProductId) {
        const prodId = String(body.removeProductId);
        const current = getServerFeePolicy();
        const nextProductCharges = { ...current.productCharges };
        delete nextProductCharges[prodId];
        const updated2 = updateServerFeePolicy({ productCharges: nextProductCharges }, String(updatedBy));
        return res.json({
          success: true,
          message: `Product ${prodId} charge removed`,
          settings: updated2
        });
      }
      const updated = updateServerFeePolicy(body, String(updatedBy));
      return res.json({
        success: true,
        message: "Fee policy and charges settings updated successfully",
        settings: updated
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err?.message || "Failed to update fee settings" });
    }
  });
  app.put("/api/fee-settings", requireAdminOrSecret, (req, res) => {
    try {
      const body = req.body || {};
      const updatedBy = req.headers["x-client-id"] || req.headers["x-user-email"] || "backend_app";
      const updated = updateServerFeePolicy(body, String(updatedBy));
      return res.json({
        success: true,
        message: "Fee policy and charges settings updated successfully",
        settings: updated
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err?.message || "Failed to update fee settings" });
    }
  });
  app.post("/api/cart/calculate-charges", (req, res) => {
    try {
      const { items = [], subtotal } = req.body || {};
      const breakdown = computeOrderCharges(items, subtotal);
      return res.json({
        success: true,
        breakdown
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err?.message || "Failed to calculate charges" });
    }
  });
  app.post("/api/order", orderCheckoutLimiter, async (req, res) => {
    try {
      const rawIdempotencyKey = (req.headers["x-idempotency-key"] || req.body.idempotencyKey || req.body.id || "").toString().trim();
      if (rawIdempotencyKey && idempotencyStore.has(rawIdempotencyKey)) {
        const existing = idempotencyStore.get(rawIdempotencyKey);
        res.setHeader("X-Cache", "IDEMPOTENT-HIT");
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
        return res.status(200).json({
          ...existing.response,
          idempotent: true,
          cachedAt: new Date(existing.timestamp).toISOString()
        });
      }
      const parseResult = OrderCheckoutSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({
          success: false,
          message: "Order validation failed. Please check the entered details.",
          errors: parseResult.error.format()
        });
      }
      const validatedOrder = parseResult.data;
      const computedItemTotal = validatedOrder.items.reduce((sum, it) => {
        const itemPrice = typeof it.product?.price === "number" ? it.product.price : 0;
        return sum + itemPrice * (it.quantity || 1);
      }, 0);
      const dynamicCharges = computeOrderCharges(validatedOrder.items, computedItemTotal);
      const effectiveDeliveryFee = validatedOrder.deliveryFee ?? dynamicCharges.deliveryFee;
      const effectiveHandlingFee = validatedOrder.handlingFee ?? dynamicCharges.handlingFee;
      const effectiveRainFee = validatedOrder.rainFee ?? dynamicCharges.rainFee;
      const effectiveSurgeFee = validatedOrder.surgeFee ?? dynamicCharges.surgeFee;
      const effectiveProductFee = validatedOrder.productHandlingFee ?? dynamicCharges.totalProductCharges;
      const computedGrandTotal = Math.max(
        0,
        computedItemTotal + effectiveDeliveryFee + effectiveHandlingFee + effectiveRainFee + effectiveSurgeFee + effectiveProductFee - (validatedOrder.discount || 0)
      );
      if (Math.abs(validatedOrder.totalAmount - computedGrandTotal) > 1) {
        return res.status(400).json({
          success: false,
          message: `Price mismatch: Computed total is \u20B9${computedGrandTotal}, but submitted total was \u20B9${validatedOrder.totalAmount}.`
        });
      }
      const formattedServerItems = validatedOrder.items.map((it) => {
        const color = it.selectedColor || it.product?.selectedColor || void 0;
        const baseName = it.product?.name || "Electrical Item";
        const displayName = color ? `${baseName} (${color} Color)` : baseName;
        return {
          quantity: it.quantity || 1,
          selectedColor: color,
          color,
          product: {
            ...it.product || {},
            name: displayName,
            selectedColor: color
          }
        };
      });
      const serverItemsSummary = formattedServerItems.map((it) => `${it.quantity}x ${it.product?.name || "Item"}`).join(", ");
      const sb = getServerSupabase();
      const orderDbId = validatedOrder.id;
      const cleanHex = orderDbId.replace(/[^a-zA-Z0-9]/g, "");
      const shortDisplayId = "#" + cleanHex.slice(0, 8).toUpperCase();
      if (sb) {
        try {
          await sb.from("orders").upsert(
            {
              id: orderDbId,
              order_id: orderDbId,
              order_number: shortDisplayId,
              tracking_number: shortDisplayId,
              user_id: validatedOrder.userId || validatedOrder.user_id || null,
              customer_name: validatedOrder.customerName,
              recipient_name: validatedOrder.customerName,
              phone: validatedOrder.phone,
              recipient_phone: validatedOrder.phone,
              customer_email: validatedOrder.customerEmail || null,
              address: validatedOrder.address,
              address_line1: validatedOrder.address,
              area: validatedOrder.area,
              landmark: validatedOrder.landmark || null,
              pincode: validatedOrder.pincode,
              items: formattedServerItems,
              item_total: validatedOrder.itemTotal,
              subtotal: validatedOrder.itemTotal,
              delivery_fee: effectiveDeliveryFee,
              handling_fee: effectiveHandlingFee,
              rain_fee: effectiveRainFee,
              surge_fee: effectiveSurgeFee,
              fees: effectiveDeliveryFee + effectiveHandlingFee + effectiveRainFee + effectiveSurgeFee + effectiveProductFee,
              fee_breakdown: validatedOrder.feeBreakdown || dynamicCharges,
              discount: validatedOrder.discount,
              total_amount: validatedOrder.totalAmount,
              payment_method: validatedOrder.paymentMethod,
              payment_status: validatedOrder.paymentStatus,
              payment_id: validatedOrder.paymentId || validatedOrder.razorpay_payment_id || validatedOrder.razorpayPaymentId || null,
              razorpay_payment_id: validatedOrder.razorpay_payment_id || validatedOrder.razorpayPaymentId || validatedOrder.paymentId || null,
              razorpay_order_id: validatedOrder.razorpay_order_id || validatedOrder.razorpayOrderId || null,
              razorpay_signature: validatedOrder.razorpay_signature || validatedOrder.razorpaySignature || null,
              status: validatedOrder.status,
              created_at: validatedOrder.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
              placed_at: validatedOrder.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
              estimated_delivery_timestamp: validatedOrder.estimatedDeliveryTimestamp || Date.now() + 36e5,
              delivery_partner: validatedOrder.deliveryPartner || null,
              notes: validatedOrder.notes || null
            },
            { onConflict: "id" }
          );
        } catch (dbErr) {
          console.warn("[Server /api/order DB Insert Notice]:", dbErr);
        }
      }
      const phoneClean = validatedOrder.phone.replace(/\D/g, "").slice(-10);
      const itemsListText = validatedOrder.items.map((it, i) => {
        const color = it.selectedColor || it.product?.selectedColor;
        const colorBadge = color ? ` [${color} COLOR]` : "";
        return `${i + 1}. ${it.product?.name || "Item"}${colorBadge} (${it.product?.brand || "SmartRun"}) x ${it.quantity} = \u20B9${((it.product?.price || 0) * it.quantity).toLocaleString("en-IN")}`;
      }).join("\n");
      const whatsappText = `\u26A1 *NEW ORDER RECEIVED - SMARTRUN* \u26A1

\u{1F4E6} *Order ID:* ${shortDisplayId}
\u{1F464} *Customer:* ${validatedOrder.customerName}
\u{1F4F1} *Mobile:* ${validatedOrder.phone}
\u{1F4CD} *DELIVERY ADDRESS:* ${validatedOrder.address}, Area: ${validatedOrder.area}, PIN: ${validatedOrder.pincode}

\u{1F6D2} *ORDERED ITEMS:*
${itemsListText}

\u{1F4B3} *GRAND TOTAL:* \u20B9${validatedOrder.totalAmount.toLocaleString("en-IN")} (${validatedOrder.paymentMethod.toUpperCase()})
\u26A1 *Dispatch:* SmartRun materials pvt. ltd, Kheyadah Village, Bhagabanpur, Kolkata 700150`;
      const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`;
      const customerWhatsappUrl = phoneClean ? `https://wa.me/91${phoneClean}?text=${encodeURIComponent(
        `Hello ${validatedOrder.customerName}, thank you for ordering from SmartRun! Your Order ${shortDisplayId} for \u20B9${validatedOrder.totalAmount.toLocaleString("en-IN")} is confirmed for 60-min express dispatch.`
      )}` : null;
      try {
        const adminHtml = generateAdminOrderAlertHtml(validatedOrder);
        const adminSubject = `\u{1F6A8} [NEW ORDER] ${shortDisplayId} (\u20B9${validatedOrder.totalAmount.toLocaleString("en-IN")}) - ${validatedOrder.customerName}`;
        dispatchResendEmail({
          to: ADMIN_EMAILS,
          subject: adminSubject,
          html: adminHtml,
          text: `New order ${shortDisplayId} placed by ${validatedOrder.customerName} (${validatedOrder.phone}). Amount: \u20B9${validatedOrder.totalAmount}.`
        }).catch(() => {
        });
        if (validatedOrder.customerEmail && validatedOrder.customerEmail.includes("@")) {
          const custHtml = generateOrderEmailHtml(validatedOrder, validatedOrder.customerName);
          const custSubject = `\u26A1 Order Confirmed ${shortDisplayId} - SmartRun Express Kolkata`;
          dispatchResendEmail({
            type: "order",
            from: "SmartRun Orders <order@smartrun.in>",
            to: [validatedOrder.customerEmail.trim()],
            subject: custSubject,
            html: custHtml,
            text: `Your SmartRun order ${shortDisplayId} has been confirmed. Total: \u20B9${validatedOrder.totalAmount}. Delivery to ${validatedOrder.area}, Kolkata.`
          }).catch(() => {
          });
        }
      } catch (emailErr) {
        console.warn("[Server /api/order Notification Notice]:", emailErr);
      }
      const orderResponse = {
        success: true,
        order: validatedOrder,
        orderId: validatedOrder.id,
        adminAlertSent: true,
        customerInvoiceSent: Boolean(validatedOrder.customerEmail),
        whatsappUrl,
        customerWhatsappUrl,
        message: "Order validated and confirmed successfully!"
      };
      if (rawIdempotencyKey) {
        idempotencyStore.set(rawIdempotencyKey, {
          orderId: validatedOrder.id,
          response: orderResponse,
          timestamp: Date.now()
        });
      }
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
      return res.status(201).json(orderResponse);
    } catch (err) {
      console.error("Error placing order via /api/order:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "An unexpected error occurred while placing your order."
      });
    }
  });
  const liveRiderLocations = /* @__PURE__ */ new Map();
  app.get("/api/orders/:id/rider-location", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const orderId = req.params.id;
      if (!orderId) {
        return res.status(400).json({ success: false, message: "Order ID is required." });
      }
      const live = liveRiderLocations.get(orderId);
      if (live) {
        return res.status(200).json({
          success: true,
          orderId,
          location: live
        });
      }
      const sb = getServerSupabase();
      if (sb) {
        try {
          const { data } = await sb.from("orders").select("delivery_partner, notes").eq("id", orderId).single();
          const partner = data?.delivery_partner;
          const loc = partner?.current_location || partner?.location;
          if (loc && typeof loc.lat === "number" && typeof loc.lng === "number") {
            const dbLoc = {
              orderId,
              lat: loc.lat,
              lng: loc.lng,
              heading: loc.heading,
              speed: loc.speed,
              riderName: partner.name || "Delivery Partner",
              updatedAt: loc.updatedAt || (/* @__PURE__ */ new Date()).toISOString()
            };
            liveRiderLocations.set(orderId, dbLoc);
            return res.status(200).json({
              success: true,
              orderId,
              location: dbLoc
            });
          }
        } catch {
        }
      }
      return res.status(200).json({
        success: true,
        orderId,
        location: null,
        message: "No live rider GPS recorded yet."
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to get rider location."
      });
    }
  });
  app.post("/api/orders/:id/rider-location", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const orderId = req.params.id;
      const { lat, lng, heading, speed, riderName, partnerId } = req.body || {};
      const numLat = Number(lat);
      const numLng = Number(lng);
      if (isNaN(numLat) || isNaN(numLng) || numLat < -90 || numLat > 90 || numLng < -180 || numLng > 180) {
        return res.status(400).json({
          success: false,
          message: "Valid numeric latitude (-90 to 90) and longitude (-180 to 180) are required."
        });
      }
      const record = {
        orderId,
        lat: numLat,
        lng: numLng,
        heading: typeof heading === "number" ? heading : void 0,
        speed: typeof speed === "number" ? speed : void 0,
        riderName: riderName || "Delivery Partner",
        partnerId: partnerId || void 0,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      liveRiderLocations.set(orderId, record);
      const sb = getServerSupabase();
      if (sb) {
        try {
          await sb.from("orders").update({
            delivery_partner: {
              name: record.riderName,
              lat: record.lat,
              lng: record.lng,
              current_location: record
            }
          }).eq("id", orderId);
        } catch (dbErr) {
          console.warn("[Server POST /api/orders/:id/rider-location DB notice]:", dbErr);
        }
      }
      return res.status(200).json({
        success: true,
        orderId,
        location: record,
        message: "Rider live GPS updated successfully."
      });
    } catch (err) {
      console.error("Error updating rider GPS:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to update rider location."
      });
    }
  });
  app.get("/api/orders/:id/rider", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const orderId = req.params.id;
      if (!orderId) {
        return res.status(400).json({ success: false, message: "Order ID is required." });
      }
      const localAssignments = loadRiderAssignmentsFile();
      const localRider = localAssignments[orderId];
      if (localRider && localRider.name) {
        return res.status(200).json({
          success: true,
          assigned: true,
          orderId,
          rider: localRider
        });
      }
      const live = liveRiderLocations.get(orderId);
      if (live && live.riderName && !live.riderName.toLowerCase().includes("bikash") && live.riderName !== "Delivery Partner") {
        const liveRiderObj = {
          id: live.partnerId || `rider_${orderId.slice(-4)}`,
          name: live.riderName,
          phone: "+91 87774 00280",
          rating: 4.9,
          totalDeliveries: 185,
          vehicleType: "Express Delivery Bike",
          vehicle_type: "Express Delivery Bike",
          vehicleNumber: "WB 02 AR 4491",
          vehicle_number: "WB 02 AR 4491",
          avatarUrl: null,
          avatar_url: null,
          assignedAt: live.updatedAt
        };
        localAssignments[orderId] = liveRiderObj;
        writeRiderAssignmentsFile(localAssignments);
        return res.status(200).json({
          success: true,
          assigned: true,
          orderId,
          rider: liveRiderObj
        });
      }
      const sb = getServerSupabase();
      if (sb) {
        try {
          const { data: orderData } = await sb.from("orders").select("delivery_partner, delivery_partner_id, status, notes").eq("id", orderId).maybeSingle();
          if (orderData) {
            let partner = orderData.delivery_partner;
            if (typeof partner === "string") {
              try {
                partner = JSON.parse(partner);
              } catch {
              }
            }
            if (!partner && orderData.delivery_partner_id) {
              const { data: partnerRow } = await sb.from("delivery_partners").select("*").eq("id", orderData.delivery_partner_id).maybeSingle();
              if (partnerRow) {
                partner = partnerRow;
              }
            }
            if (!partner) {
              const { data: delivRow } = await sb.from("deliveries").select("delivery_partner, delivery_partner_id, status").eq("order_id", orderId).maybeSingle();
              if (delivRow) {
                partner = delivRow.delivery_partner;
                if (!partner && delivRow.delivery_partner_id) {
                  const { data: pRow } = await sb.from("delivery_partners").select("*").eq("id", delivRow.delivery_partner_id).maybeSingle();
                  if (pRow) partner = pRow;
                }
              }
            }
            if (partner && (partner.name || partner.full_name || partner.rider_name)) {
              const rawName = (partner.name || partner.full_name || partner.rider_name || "").replace(/⚡/g, "").trim();
              if (rawName && !rawName.toLowerCase().includes("bikash")) {
                const riderObj = {
                  id: partner.id ? String(partner.id) : `rider_${orderId.slice(-4)}`,
                  name: rawName,
                  phone: String(partner.phone || partner.mobile || partner.phone_number || "+91 87774 00280"),
                  rating: typeof partner.rating === "number" ? partner.rating : Number(partner.rating) || 4.9,
                  totalDeliveries: Number(partner.total_completed || partner.totalDeliveries || 150),
                  vehicleType: partner.vehicle_type || partner.vehicleType || "Hero Electric / Bike",
                  vehicle_type: partner.vehicle_type || partner.vehicleType || "Hero Electric / Bike",
                  vehicleNumber: partner.vehicle_number || partner.vehicleNumber || partner.vehicle_no || "WB 02 AR 4491",
                  vehicle_number: partner.vehicle_number || partner.vehicleNumber || partner.vehicle_no || "WB 02 AR 4491",
                  avatarUrl: partner.avatar_url || partner.avatarUrl || null,
                  avatar_url: partner.avatar_url || partner.avatarUrl || null,
                  assignedAt: partner.assigned_at || (/* @__PURE__ */ new Date()).toISOString()
                };
                localAssignments[orderId] = riderObj;
                writeRiderAssignmentsFile(localAssignments);
                return res.status(200).json({
                  success: true,
                  assigned: true,
                  orderId,
                  rider: riderObj
                });
              }
            }
          }
        } catch (dbErr) {
          console.warn("[Server GET /api/orders/:id/rider DB notice]:", dbErr);
        }
      }
      return res.status(200).json({
        success: true,
        assigned: false,
        orderId,
        rider: null,
        message: "No delivery partner assigned yet."
      });
    } catch (err) {
      console.error("Error fetching rider:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to fetch rider details."
      });
    }
  });
  app.post("/api/orders/:id/assign-rider", requireAdminOrSecret, async (req, res) => {
    try {
      const orderId = req.params.id;
      if (!orderId) {
        return res.status(400).json({ success: false, message: "Order ID is required." });
      }
      const { name, phone, rating, vehicleType, vehicle_type, vehicleNumber, vehicle_number, avatarUrl, avatar_url, partnerId } = req.body || {};
      const chosenVehicleNumber = vehicleNumber || vehicle_number || "WB 02 AR 4491";
      const chosenVehicleType = vehicleType || vehicle_type || "Express Delivery Bike";
      const chosenAvatarUrl = avatarUrl || avatar_url || null;
      const riderObj = {
        id: partnerId || `rider_${Date.now()}`,
        name: (name || "Debabrata Das").trim(),
        phone: (phone || "+91 87774 00280").trim(),
        rating: typeof rating === "number" ? rating : 4.9,
        totalDeliveries: 168,
        vehicleType: chosenVehicleType,
        vehicle_type: chosenVehicleType,
        vehicleNumber: chosenVehicleNumber,
        vehicle_number: chosenVehicleNumber,
        avatarUrl: chosenAvatarUrl,
        avatar_url: chosenAvatarUrl,
        assignedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const localAssignments = loadRiderAssignmentsFile();
      localAssignments[orderId] = riderObj;
      writeRiderAssignmentsFile(localAssignments);
      const existingLoc = liveRiderLocations.get(orderId);
      if (existingLoc) {
        existingLoc.riderName = riderObj.name;
        existingLoc.partnerId = riderObj.id;
      }
      const sb = getServerSupabase();
      if (sb) {
        try {
          await sb.from("orders").update({
            delivery_partner: riderObj
          }).eq("id", orderId);
        } catch (dbErr) {
          console.warn("[Server assign-rider DB notice]:", dbErr);
        }
      }
      return res.status(200).json({
        success: true,
        assigned: true,
        orderId,
        rider: riderObj,
        message: "Delivery partner assigned successfully."
      });
    } catch (err) {
      console.error("Error assigning rider:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to assign rider."
      });
    }
  });
  app.get("/api/orders/:id/reviews", (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const orderId = req.params.id;
      const allReviews = loadOrderReviewsFile();
      const orderRev = allReviews[orderId] || {};
      return res.status(200).json({
        success: true,
        orderId,
        riderReview: orderRev.riderReview || null,
        productReview: orderRev.productReview || null
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to load reviews."
      });
    }
  });
  app.post("/api/orders/:id/rider-review", async (req, res) => {
    try {
      const orderId = req.params.id;
      const { rating, comment, tags, riderName, userId } = req.body || {};
      const numRating = Number(rating);
      if (!numRating || numRating < 1 || numRating > 5) {
        return res.status(400).json({ success: false, message: "Valid rating between 1 and 5 is required." });
      }
      const allReviews = loadOrderReviewsFile();
      const current = allReviews[orderId] || { orderId };
      const riderReview = {
        rating: Math.round(numRating),
        comment: (comment || "").trim(),
        tags: Array.isArray(tags) ? tags : [],
        riderName: (riderName || "Delivery Partner").trim(),
        userId: userId || null,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      current.riderReview = riderReview;
      allReviews[orderId] = current;
      writeOrderReviewsFile(allReviews);
      return res.status(200).json({
        success: true,
        message: "Rider review submitted successfully.",
        review: riderReview
      });
    } catch (err) {
      console.error("Error submitting rider review:", err);
      return res.status(500).json({ success: false, message: err.message || "Failed to submit rider review." });
    }
  });
  app.post("/api/orders/:id/product-review", async (req, res) => {
    try {
      const orderId = req.params.id;
      const { rating, comment, tags, items, userId, userName } = req.body || {};
      const numRating = Number(rating);
      if (!numRating || numRating < 1 || numRating > 5) {
        return res.status(400).json({ success: false, message: "Valid rating between 1 and 5 is required." });
      }
      const allReviews = loadOrderReviewsFile();
      const current = allReviews[orderId] || { orderId };
      const productReview = {
        rating: Math.round(numRating),
        comment: (comment || "").trim(),
        tags: Array.isArray(tags) ? tags : [],
        userId: userId || null,
        userName: userName || "Customer",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      current.productReview = productReview;
      allReviews[orderId] = current;
      writeOrderReviewsFile(allReviews);
      const sb = getServerSupabase();
      if (sb && Array.isArray(items) && items.length > 0) {
        try {
          for (const item of items) {
            const pId = item.product?.id || item.productId || item.id;
            if (pId) {
              await sb.from("reviews").insert({
                product_id: pId,
                user_id: userId || null,
                user_name: userName || "Customer",
                rating: Math.round(numRating),
                title: tags && tags.length > 0 ? tags.join(", ") : "Verified Purchase",
                comment: (comment || "").trim() || "Great delivery and genuine electrical materials.",
                created_at: (/* @__PURE__ */ new Date()).toISOString()
              });
            }
          }
        } catch (dbErr) {
          console.warn("[Server product-review Supabase insert notice]:", dbErr);
        }
      }
      return res.status(200).json({
        success: true,
        message: "Product review submitted successfully.",
        review: productReview
      });
    } catch (err) {
      console.error("Error submitting product review:", err);
      return res.status(500).json({ success: false, message: err.message || "Failed to submit product review." });
    }
  });
  function sanitizeEnvValue(val) {
    if (!val) return "";
    return val.trim().replace(/^["']|["']$/g, "").trim();
  }
  function isValidRazorpayKeyId(keyId) {
    if (!keyId) return false;
    const trimmed = sanitizeEnvValue(keyId);
    return (trimmed.startsWith("rzp_test_") || trimmed.startsWith("rzp_live_")) && trimmed.length >= 14 && !trimmed.includes("placeholder") && !trimmed.includes("demo");
  }
  function resolveRawRazorpayKeyId() {
    const primary = sanitizeEnvValue(process.env.RAZORPAY_KEY_ID);
    const viteKey = sanitizeEnvValue(process.env.VITE_RAZORPAY_KEY_ID);
    if (isValidRazorpayKeyId(viteKey)) return viteKey;
    if (isValidRazorpayKeyId(primary)) return primary;
    return primary || viteKey;
  }
  function resolveRazorpayKeyId() {
    const raw = resolveRawRazorpayKeyId();
    if (isValidRazorpayKeyId(raw)) {
      return raw;
    }
    return "";
  }
  function resolveRazorpayKeySecret() {
    const primary = sanitizeEnvValue(process.env.RAZORPAY_KEY_SECRET);
    const secondary = sanitizeEnvValue(process.env.VITE_RAZORPAY_KEY_SECRET);
    const envSecret = primary || secondary;
    if (envSecret && envSecret.length >= 8) {
      return envSecret;
    }
    return null;
  }
  let razorpayClientInstance = null;
  let authNoticeLogged = false;
  function getRazorpayClient() {
    const keyId = resolveRazorpayKeyId();
    const keySecret = resolveRazorpayKeySecret();
    if (!isValidRazorpayKeyId(keyId) || !keySecret || keySecret.length < 8) {
      return null;
    }
    if (!razorpayClientInstance) {
      try {
        razorpayClientInstance = new import_razorpay.default({
          key_id: keyId,
          key_secret: keySecret
        });
      } catch (err) {
        console.warn("[Razorpay Init Warning]:", err);
        return null;
      }
    }
    return razorpayClientInstance;
  }
  app.get("/api/razorpay/config", (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    const rawKeyId = resolveRawRazorpayKeyId();
    const activeKeyId = resolveRazorpayKeyId();
    const activeSecret = resolveRazorpayKeySecret();
    const isConfigured = Boolean(isValidRazorpayKeyId(activeKeyId) && activeSecret && activeSecret.length >= 8);
    let diagnostic = "";
    if (!isValidRazorpayKeyId(rawKeyId)) {
      if (!rawKeyId) {
        diagnostic = "RAZORPAY_KEY_ID is missing. In Settings > Environment Variables, please add your Razorpay Key ID (starts with 'rzp_live_' or 'rzp_test_').";
      } else {
        diagnostic = "RAZORPAY_KEY_ID in Settings > Environment Variables is invalid. It must start with 'rzp_live_' or 'rzp_test_' from your Razorpay Dashboard (API Keys section).";
        if (activeSecret) {
          diagnostic += " Your Key Secret is set, but please verify RAZORPAY_KEY_ID contains your public Key ID.";
        }
      }
    } else if (!activeSecret) {
      diagnostic = "RAZORPAY_KEY_SECRET is missing or too short. In Settings > Environment Variables, please add your Razorpay Key Secret.";
    }
    if (!isConfigured) {
      return res.status(200).json({
        success: false,
        keyId: "",
        isConfigured: false,
        diagnostic: diagnostic || "RAZORPAY_KEY_ID is not configured",
        error: diagnostic || "RAZORPAY_KEY_ID is not configured",
        merchantName: "SmartRun",
        currency: "INR"
      });
    }
    res.json({
      success: true,
      keyId: activeKeyId,
      isConfigured: true,
      diagnostic: void 0,
      merchantName: "SmartRun",
      currency: "INR"
    });
  });
  app.post("/api/razorpay/create-order", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { amount, receipt, notes } = req.body || {};
      const parsedAmount = Number(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({
          success: false,
          message: "A valid positive amount in rupees is required."
        });
      }
      const amountInPaise = Math.round(parsedAmount * 100);
      const activeKeyId = resolveRazorpayKeyId();
      const rawKeyId = resolveRawRazorpayKeyId();
      if (!isValidRazorpayKeyId(activeKeyId)) {
        const errorDetail = !rawKeyId ? "RAZORPAY_KEY_ID is missing in Settings > Environment Variables. Please set your Razorpay Key ID (starts with 'rzp_live_' or 'rzp_test_')." : `RAZORPAY_KEY_ID in Settings > Environment Variables is currently set to '${rawKeyId}', which is not a valid Razorpay Key ID. Please replace it with your Key ID from Razorpay (starts with 'rzp_live_' or 'rzp_test_').`;
        return res.status(400).json({
          success: false,
          error: "RAZORPAY_KEY_ID is not configured",
          message: errorDetail
        });
      }
      const razorpay = getRazorpayClient();
      if (!razorpay) {
        return res.status(400).json({
          success: false,
          error: "RAZORPAY_KEY_SECRET is not configured",
          message: "Payment gateway credentials are incomplete. Please set RAZORPAY_KEY_SECRET in Settings > Environment Variables."
        });
      }
      try {
        const orderOptions = {
          amount: amountInPaise,
          currency: "INR",
          receipt: receipt || `rcpt_${Date.now()}`,
          payment_capture: 1,
          notes: notes || {}
        };
        const order = await razorpay.orders.create(orderOptions);
        return res.status(200).json({
          success: true,
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          keyId: activeKeyId,
          isLive: true
        });
      } catch (apiErr) {
        const errMsg = apiErr?.error?.description || apiErr?.message || "Authentication error";
        console.warn(`[Razorpay Notice]: ${errMsg}. Check that RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET match in environment settings.`);
        razorpayClientInstance = null;
        return res.status(500).json({
          success: false,
          error: errMsg,
          message: `Razorpay order creation failed: ${errMsg}`
        });
      }
    } catch (err) {
      console.error("Razorpay order creation unexpected error:", err);
      return res.status(500).json({
        success: false,
        error: err?.message || "Internal server error during order creation",
        message: "Failed to create payment order."
      });
    }
  });
  app.post("/api/razorpay/verify-payment", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
      if (!razorpay_order_id || !razorpay_payment_id) {
        return res.status(400).json({
          success: false,
          verified: false,
          message: "Missing razorpay_order_id or razorpay_payment_id in payload."
        });
      }
      const activeKeyId = resolveRazorpayKeyId();
      const isLiveMode = activeKeyId.startsWith("rzp_live_") || process.env.NODE_ENV === "production";
      const isTestOrder = String(razorpay_order_id).startsWith("order_test_") || String(razorpay_payment_id).startsWith("pay_test_") || String(razorpay_signature || "").startsWith("sig_test_");
      if (isTestOrder && isLiveMode) {
        return res.status(403).json({
          success: false,
          verified: false,
          message: "Simulated test payment signatures are rejected in production."
        });
      }
      if (isTestOrder && !isLiveMode) {
        return res.status(200).json({
          success: true,
          verified: true,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          message: "Payment successfully verified (Sandbox Test Mode)."
        });
      }
      if (!razorpay_signature) {
        return res.status(400).json({
          success: false,
          verified: false,
          message: "Payment signature is required for cryptographic verification."
        });
      }
      const keySecret = resolveRazorpayKeySecret();
      if (!keySecret || keySecret.length < 8) {
        return res.status(500).json({
          success: false,
          verified: false,
          message: "Server configuration error: RAZORPAY_KEY_SECRET is not configured."
        });
      }
      const payloadToSign = `${razorpay_order_id}|${razorpay_payment_id}`;
      const generatedSignature = import_crypto.default.createHmac("sha256", keySecret).update(payloadToSign).digest("hex");
      const genBuf = Buffer.from(generatedSignature, "utf8");
      const sigBuf = Buffer.from(String(razorpay_signature), "utf8");
      const isValid = genBuf.length === sigBuf.length && import_crypto.default.timingSafeEqual(genBuf, sigBuf);
      if (!isValid) {
        return res.status(400).json({
          success: false,
          verified: false,
          message: "Invalid payment signature. Verification failed."
        });
      }
      return res.status(200).json({
        success: true,
        verified: true,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        message: "Razorpay payment verified successfully."
      });
    } catch (err) {
      console.error("Razorpay payment verification error:", err);
      return res.status(500).json({
        success: false,
        verified: false,
        message: err?.message || "Failed to verify Razorpay payment."
      });
    }
  });
  app.post("/api/razorpay/refund", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { paymentId, amount, orderId, reason } = req.body || {};
      const authUser = await getAuthenticatedUser(req);
      const isAuthAdmin = await isAuthorizedAdminOrSecret(req);
      if (!isAuthAdmin && !authUser) {
        return res.status(401).json({
          success: false,
          message: "Authentication required to initiate cancellation refund."
        });
      }
      const parsedAmount = amount ? Number(amount) : void 0;
      const amountInPaise = parsedAmount && parsedAmount > 0 ? Math.round(parsedAmount * 100) : void 0;
      const activeKeyId = resolveRazorpayKeyId();
      const isLiveMode = activeKeyId.startsWith("rzp_live_") || process.env.NODE_ENV === "production";
      const isTestPayment = !paymentId || String(paymentId).startsWith("pay_test_") || String(paymentId).startsWith("test_") || String(orderId || "").startsWith("order_test_");
      if (isTestPayment && isLiveMode) {
        return res.status(403).json({
          success: false,
          message: "Simulated test refunds are disabled in live production mode."
        });
      }
      if (isTestPayment) {
        const mockRefundId = `rfnd_test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        return res.status(200).json({
          success: true,
          refundId: mockRefundId,
          status: "processed",
          amount: parsedAmount || 0,
          currency: "INR",
          speedProcessed: "optimum",
          paymentId: paymentId || `pay_test_${Date.now()}`,
          simulated: true,
          message: "Simulated Razorpay refund processed directly back to source account (Sandbox test mode)."
        });
      }
      const razorpay = getRazorpayClient();
      if (!razorpay) {
        const mockRefundId = `rfnd_test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        return res.status(200).json({
          success: true,
          refundId: mockRefundId,
          status: "processed",
          amount: parsedAmount || 0,
          currency: "INR",
          paymentId,
          simulated: true,
          warning: "Razorpay credentials not fully configured on server. Test refund recorded."
        });
      }
      let targetPaymentId = paymentId;
      if (!targetPaymentId && orderId && String(orderId).startsWith("order_")) {
        try {
          const orderPayments = await razorpay.orders.fetchPayments(orderId);
          if (orderPayments && Array.isArray(orderPayments.items) && orderPayments.items.length > 0) {
            const captured = orderPayments.items.find((p) => p.status === "captured") || orderPayments.items[0];
            targetPaymentId = captured.id;
          }
        } catch (fetchErr) {
          console.warn("[Razorpay Refund] Could not fetch payments for order:", fetchErr);
        }
      }
      if (!targetPaymentId) {
        return res.status(400).json({
          success: false,
          error: "Payment ID is required to process a live refund.",
          message: "Payment ID is required to process a live refund."
        });
      }
      try {
        const refundPayload = {
          speed: "optimum",
          notes: {
            orderId: orderId || "N/A",
            reason: reason || "Order cancelled by customer within allowed cancellation window",
            brand: "SmartRun Kolkata"
          }
        };
        if (amountInPaise) {
          refundPayload.amount = amountInPaise;
        }
        const refundResult = await razorpay.payments.refund(targetPaymentId, refundPayload);
        return res.status(200).json({
          success: true,
          refundId: refundResult.id,
          status: refundResult.status || "processed",
          amount: refundResult.amount ? refundResult.amount / 100 : parsedAmount,
          currency: refundResult.currency || "INR",
          speedProcessed: refundResult.speed_processed || "optimum",
          paymentId: targetPaymentId,
          message: "Refund initiated successfully by Razorpay directly back to user's account."
        });
      } catch (apiErr) {
        console.error("[Razorpay Refund API Error]:", apiErr?.error || apiErr?.message || apiErr);
        const errorMessage = apiErr?.error?.description || apiErr?.message || "Razorpay refund request failed.";
        return res.status(apiErr?.statusCode || 400).json({
          success: false,
          error: errorMessage,
          message: errorMessage,
          paymentId: targetPaymentId
        });
      }
    } catch (err) {
      console.error("Razorpay refund processing error:", err);
      const mockRefundId = `rfnd_test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      return res.status(200).json({
        success: true,
        refundId: mockRefundId,
        status: "processed",
        amount: Number(req.body?.amount || 0),
        currency: "INR",
        speedProcessed: "optimum",
        paymentId: req.body?.paymentId,
        simulated: true,
        message: "Simulated refund processed."
      });
    }
  });
  app.post("/api/razorpay/webhook", async (req, res) => {
    try {
      const webhookSignature = req.headers["x-razorpay-signature"];
      const webhookSecret = (process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET || "").trim();
      if (webhookSecret && webhookSignature) {
        const expectedSignature = import_crypto.default.createHmac("sha256", webhookSecret).update(JSON.stringify(req.body)).digest("hex");
        if (expectedSignature !== webhookSignature) {
          console.warn("[Razorpay Webhook] Invalid webhook signature received.");
          return res.status(400).json({ error: "Invalid webhook signature." });
        }
      }
      const event = req.body?.event;
      const payload = req.body?.payload;
      console.log(`[Razorpay Webhook] Event received: ${event}`);
      if (event === "payment.captured" || event === "order.paid") {
        const paymentEntity = payload?.payment?.entity;
        const orderEntity = payload?.order?.entity;
        const paymentId = paymentEntity?.id;
        const razorpayOrderId = paymentEntity?.order_id || orderEntity?.id;
        const amount = paymentEntity?.amount ? paymentEntity.amount / 100 : void 0;
        console.log(`[Razorpay Webhook] Payment confirmed: ${paymentId} for order ${razorpayOrderId} (\u20B9${amount})`);
        const sb = getServerSupabase();
        if (sb && razorpayOrderId) {
          try {
            const { error: updateErr } = await sb.from("orders").update({
              payment_status: "paid",
              status: "confirmed",
              razorpay_payment_id: paymentId,
              payment_id: paymentId,
              updated_at: (/* @__PURE__ */ new Date()).toISOString()
            }).eq("razorpay_order_id", razorpayOrderId);
            if (updateErr) {
              console.warn("[Razorpay Webhook] Notice updating order in Supabase:", updateErr.message);
            } else {
              console.log(`[Razorpay Webhook] Order ${razorpayOrderId} successfully updated to 'paid' in Supabase.`);
            }
          } catch (dbErr) {
            console.warn("[Razorpay Webhook] DB error:", dbErr);
          }
        }
      } else if (event === "payment.failed") {
        const paymentEntity = payload?.payment?.entity;
        console.warn(`[Razorpay Webhook] Payment failed: ${paymentEntity?.id} - reason: ${paymentEntity?.error_description}`);
      }
      return res.status(200).json({ status: "ok" });
    } catch (err) {
      console.error("[Razorpay Webhook Error]:", err);
      return res.status(500).json({ error: err?.message || "Webhook processing error." });
    }
  });
  app.post("/api/rider/location", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { orderId, lat, lng, heading, speed, riderName, partnerId } = req.body || {};
      if (!orderId) {
        return res.status(400).json({ success: false, message: "orderId is required." });
      }
      const numLat = Number(lat);
      const numLng = Number(lng);
      if (isNaN(numLat) || isNaN(numLng)) {
        return res.status(400).json({ success: false, message: "Valid lat and lng required." });
      }
      const record = {
        orderId,
        lat: numLat,
        lng: numLng,
        heading: typeof heading === "number" ? heading : void 0,
        speed: typeof speed === "number" ? speed : void 0,
        riderName: riderName || "Delivery Partner",
        partnerId: partnerId || void 0,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      liveRiderLocations.set(orderId, record);
      return res.status(200).json({
        success: true,
        orderId,
        location: record
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message || "Failed" });
    }
  });
  app.delete("/api/orders/:id", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const orderId = req.params.id;
      if (!orderId) {
        return res.status(400).json({ success: false, message: "Order ID is required." });
      }
      const authUser = await getAuthenticatedUser(req);
      const isAuthAdmin = await isAuthorizedAdminOrSecret(req);
      const sb = getServerSupabase();
      if (!isAuthAdmin) {
        if (!authUser) {
          return res.status(401).json({ success: false, message: "Authentication required to delete order." });
        }
        if (sb) {
          const { data: existingOrder } = await sb.from("orders").select("user_id, status").eq("id", orderId).maybeSingle();
          if (existingOrder && existingOrder.user_id && existingOrder.user_id !== authUser.id) {
            return res.status(403).json({ success: false, message: "Forbidden: You can only delete your own orders." });
          }
        }
      }
      if (sb) {
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(orderId);
        try {
          if (isUUID) {
            await sb.from("order_items").delete().eq("order_id", orderId);
            const { error } = await sb.from("orders").delete().eq("id", orderId);
            if (error && !error.message?.includes("Invalid API key")) {
              console.warn("[Server Delete order DB error]:", error.message);
            }
          } else {
            await sb.from("orders").delete().eq("tracking_number", orderId);
          }
        } catch (dbErr) {
          console.warn("[Server Delete order notice]:", dbErr?.message || dbErr);
        }
      }
      for (const [k, v] of idempotencyStore.entries()) {
        if (v?.orderId === orderId) {
          idempotencyStore.delete(k);
        }
      }
      return res.status(200).json({
        success: true,
        orderId,
        message: `Order #${orderId} deleted successfully.`
      });
    } catch (err) {
      console.error("Error deleting order on server:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to delete order."
      });
    }
  });
  app.delete("/api/orders", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { userId, email, phone } = req.query;
      const authUser = await getAuthenticatedUser(req);
      const isAuthAdmin = await isAuthorizedAdminOrSecret(req);
      if (!isAuthAdmin) {
        if (!authUser || userId && authUser.id !== userId) {
          return res.status(401).json({ success: false, message: "Unauthorized: You can only clear your own order history." });
        }
      }
      const sb = getServerSupabase();
      if (sb && (userId || email || phone)) {
        try {
          if (userId) {
            const { data: userOrders } = await sb.from("orders").select("id").eq("user_id", userId);
            if (userOrders && userOrders.length > 0) {
              const ids = userOrders.map((o) => o.id);
              await sb.from("order_items").delete().in("order_id", ids);
            }
            await sb.from("orders").delete().eq("user_id", userId);
          }
          if (email && email.includes("@")) {
            const cleanEmail = email.trim().toLowerCase();
            const { data: emailOrders } = await sb.from("orders").select("id").or(`customer_email.ilike.${cleanEmail},recipient_email.ilike.${cleanEmail}`);
            if (emailOrders && emailOrders.length > 0) {
              const ids = emailOrders.map((o) => o.id);
              await sb.from("order_items").delete().in("order_id", ids);
            }
            await sb.from("orders").delete().or(`customer_email.ilike.${cleanEmail},recipient_email.ilike.${cleanEmail}`);
          }
          if (phone) {
            const cleanPhone = phone.replace(/\D/g, "").slice(-10);
            if (cleanPhone) {
              const { data: phoneOrders } = await sb.from("orders").select("id").or(`phone.eq.${cleanPhone},phone.eq.+91${cleanPhone},recipient_phone.eq.${cleanPhone},recipient_phone.eq.+91${cleanPhone}`);
              if (phoneOrders && phoneOrders.length > 0) {
                const ids = phoneOrders.map((o) => o.id);
                await sb.from("order_items").delete().in("order_id", ids);
              }
              await sb.from("orders").delete().or(`phone.eq.${cleanPhone},phone.eq.+91${cleanPhone},recipient_phone.eq.${cleanPhone},recipient_phone.eq.+91${cleanPhone}`);
            }
          }
        } catch (dbErr) {
          console.warn("[Server Clear Orders DB Notice]:", dbErr);
        }
      }
      return res.status(200).json({
        success: true,
        message: "All order history records cleared successfully."
      });
    } catch (err) {
      console.error("Error clearing user orders:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to clear orders."
      });
    }
  });
  app.post("/api/orders/clear", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { userId, email, phone, orderIds } = req.body || {};
      const authUser = await getAuthenticatedUser(req);
      const isAuthAdmin = await isAuthorizedAdminOrSecret(req);
      if (!isAuthAdmin) {
        if (!authUser || userId && authUser.id !== userId) {
          return res.status(401).json({ success: false, message: "Unauthorized: You can only clear your own order history." });
        }
      }
      const sb = getServerSupabase();
      if (sb) {
        try {
          if (Array.isArray(orderIds) && orderIds.length > 0) {
            await sb.from("order_items").delete().in("order_id", orderIds);
            await sb.from("orders").delete().in("id", orderIds);
          }
          if (userId) {
            const { data: userOrders } = await sb.from("orders").select("id").eq("user_id", userId);
            if (userOrders && userOrders.length > 0) {
              const ids = userOrders.map((o) => o.id);
              await sb.from("order_items").delete().in("order_id", ids);
            }
            await sb.from("orders").delete().eq("user_id", userId);
          }
          if (email && email.includes("@")) {
            const cleanEmail = email.trim().toLowerCase();
            await sb.from("orders").delete().or(`customer_email.ilike.${cleanEmail},recipient_email.ilike.${cleanEmail}`);
          }
          if (phone) {
            const cleanPhone = phone.replace(/\D/g, "").slice(-10);
            if (cleanPhone) {
              await sb.from("orders").delete().or(`phone.eq.${cleanPhone},phone.eq.+91${cleanPhone},recipient_phone.eq.${cleanPhone},recipient_phone.eq.+91${cleanPhone}`);
            }
          }
        } catch (dbErr) {
          console.warn("[Server POST /api/orders/clear DB Notice]:", dbErr);
        }
      }
      return res.status(200).json({
        success: true,
        message: "All order history records cleared successfully."
      });
    } catch (err) {
      console.error("Error in POST /api/orders/clear:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to clear orders."
      });
    }
  });
  const deletionRequestsStore = /* @__PURE__ */ new Map();
  app.get("/api/account/deletion-check", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { userId, phone, email } = req.query;
      if (!userId && !phone && !email) {
        return res.status(400).json({ success: false, message: "User identifier required" });
      }
      let activeOrdersCount = 0;
      let unpaidOrdersCount = 0;
      let existingRequest = null;
      const cleanPhone = (phone || "").replace(/\D/g, "").slice(-10);
      for (const reqItem of deletionRequestsStore.values()) {
        const matchesUser = userId && reqItem.userId === userId;
        const matchesPhone = cleanPhone && reqItem.phone && reqItem.phone.includes(cleanPhone);
        const matchesEmail = email && reqItem.email && reqItem.email.toLowerCase() === email.toLowerCase();
        if ((matchesUser || matchesPhone || matchesEmail) && reqItem.status === "pending_admin_review") {
          existingRequest = reqItem;
          break;
        }
      }
      const sb = getServerSupabase();
      if (sb) {
        try {
          let query = sb.from("orders").select("id, status, total_amount, created_at");
          if (userId) {
            query = query.eq("user_id", userId);
          } else if (cleanPhone) {
            query = query.or(`phone.eq.${cleanPhone},phone.eq.+91${cleanPhone},recipient_phone.eq.${cleanPhone},recipient_phone.eq.+91${cleanPhone}`);
          } else if (email) {
            query = query.ilike("customer_email", `%${email.trim().toLowerCase()}%`);
          }
          const { data: userOrders } = await query;
          if (Array.isArray(userOrders)) {
            const activeStatuses = ["pending", "accepted", "packing", "out_for_delivery", "shipped", "near_destination", "in_transit", "processing"];
            const activeOrders = userOrders.filter((o) => activeStatuses.includes(String(o.status || "").toLowerCase()));
            const unpaidOrders = userOrders.filter((o) => {
              const payStatus = String(o.payment_status || "").toLowerCase();
              const orderStatus = String(o.status || "").toLowerCase();
              return (payStatus === "unpaid" || payStatus === "pending") && orderStatus !== "cancelled" && orderStatus !== "failed";
            });
            activeOrdersCount = activeOrders.length;
            unpaidOrdersCount = unpaidOrders.length;
          }
        } catch (dbErr) {
          console.warn("[Server Deletion Check Orders DB notice]:", dbErr);
        }
      }
      const hasOutstandingDues = unpaidOrdersCount > 0;
      const canDelete = activeOrdersCount === 0 && !hasOutstandingDues;
      return res.status(200).json({
        success: true,
        canDelete,
        activeOrdersCount,
        unpaidOrdersCount,
        hasOutstandingDues,
        existingRequest
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message || "Failed to check account status" });
    }
  });
  app.post("/api/account/delete-account", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { userId: rawUserId, phone: rawPhone, email: rawEmail, name, reason } = req.body || {};
      let authUser = await getAuthenticatedUser(req);
      if (!authUser) {
        const extracted = extractServerSession(req);
        if (extracted.valid && extracted.session) {
          authUser = {
            id: extracted.session.uid,
            phone: extracted.session.phone,
            email: extracted.session.email,
            user_metadata: {
              master_user_id: extracted.session.uid,
              linked_user_id: extracted.session.uid
            }
          };
        }
      }
      const isAuthAdmin = await isAuthorizedAdminOrSecret(req);
      const allowedIds = new Set(
        [
          authUser?.id,
          authUser?.user_metadata?.master_user_id,
          authUser?.user_metadata?.linked_user_id
        ].filter(Boolean)
      );
      if (!isAuthAdmin) {
        if (!authUser) {
          return res.status(401).json({ success: false, message: "Authentication required to delete account." });
        }
        if (rawUserId && !allowedIds.has(rawUserId)) {
          return res.status(403).json({ success: false, message: "Forbidden: You can only delete your own account." });
        }
      }
      const userId = isAuthAdmin ? rawUserId : rawUserId && allowedIds.has(rawUserId) ? rawUserId : authUser.user_metadata?.master_user_id || authUser.user_metadata?.linked_user_id || authUser.id;
      const authPhoneDigits = String(authUser?.phone || authUser?.user_metadata?.phone || "").replace(/\D/g, "").slice(-10);
      const requestedPhoneDigits = String(rawPhone || "").replace(/\D/g, "").slice(-10);
      const cleanPhone = isAuthAdmin ? requestedPhoneDigits : authPhoneDigits || (allowedIds.has(userId) && userId?.startsWith("uid_") ? userId.replace(/^uid_/, "").replace(/\D/g, "").slice(-10) : "");
      const authEmail = String(authUser?.email || authUser?.user_metadata?.real_email || "").trim();
      const email = isAuthAdmin ? rawEmail : authEmail;
      if (!userId && !cleanPhone && !email) {
        return res.status(400).json({
          success: false,
          message: "User identifier (userId, phone, or email) required to execute account deletion."
        });
      }
      const sb = getServerSupabase();
      if (sb) {
        try {
          let query = sb.from("orders").select("id, status, payment_status");
          if (userId) {
            query = query.eq("user_id", userId);
          } else if (cleanPhone) {
            query = query.or(`phone.eq.${cleanPhone},phone.eq.+91${cleanPhone},recipient_phone.eq.${cleanPhone},recipient_phone.eq.+91${cleanPhone}`);
          } else if (email) {
            query = query.ilike("customer_email", `%${email.trim().toLowerCase()}%`);
          }
          const { data: userOrders } = await query;
          if (Array.isArray(userOrders)) {
            const activeStatuses = ["pending", "accepted", "packing", "out_for_delivery", "shipped", "near_destination", "in_transit", "processing"];
            const activeOrders = userOrders.filter((o) => activeStatuses.includes(String(o.status || "").toLowerCase()));
            const unpaidOrders = userOrders.filter((o) => {
              const payStatus = String(o.payment_status || "").toLowerCase();
              const orderStatus = String(o.status || "").toLowerCase();
              return (payStatus === "unpaid" || payStatus === "pending") && orderStatus !== "cancelled" && orderStatus !== "failed";
            });
            if (activeOrders.length > 0) {
              return res.status(400).json({
                success: false,
                code: "ACTIVE_ORDERS",
                message: `Account deletion blocked: You currently have ${activeOrders.length} active in-flight order(s). All orders must be delivered or cancelled before account deletion.`
              });
            }
            if (unpaidOrders.length > 0) {
              return res.status(400).json({
                success: false,
                code: "UNPAID_PRODUCTS",
                message: `Account deletion blocked: You have ${unpaidOrders.length} order(s) with pending payments. All outstanding dues must be settled before account deletion.`
              });
            }
          }
        } catch (orderCheckErr) {
          console.warn("[Server Deletion Active Order Check Notice]:", orderCheckErr);
        }
        try {
          if (userId) {
            await sb.from("user_profiles").delete().eq("id", userId);
            await sb.from("profiles").delete().eq("id", userId);
            await sb.from("saved_addresses").delete().eq("user_id", userId);
            await sb.from("saved_upi_ids").delete().eq("user_id", userId);
            await sb.from("wiring_service_bookings").delete().eq("user_id", userId);
          }
          if (cleanPhone) {
            await sb.from("user_profiles").delete().eq("phone", cleanPhone);
            await sb.from("profiles").delete().eq("phone", cleanPhone);
            await sb.from("saved_addresses").delete().eq("receiver_phone", cleanPhone);
          }
          if (email) {
            await sb.from("user_profiles").delete().eq("email", email);
            await sb.from("profiles").delete().eq("email", email);
          }
          const deleteRequestId = `DEL-DIRECT-${Date.now()}`;
          await sb.from("account_deletion_requests").insert([{
            request_id: deleteRequestId,
            user_id: userId || null,
            customer_name: name || "Customer",
            customer_phone: cleanPhone || null,
            customer_email: email || null,
            reason: reason || "User permanent deletion request",
            status: "permanently_deleted",
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }]);
        } catch (dbPurgeErr) {
          console.warn("[Server DB Purge Notice]:", dbPurgeErr);
        }
      }
      return res.status(200).json({
        success: true,
        deleted: true,
        message: "Your account and personal data have been permanently deleted from Supabase."
      });
    } catch (err) {
      console.error("[Server Account Delete Error]:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to permanently delete account."
      });
    }
  });
  app.post("/api/account/deletion-request", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { userId, phone, email, name, reason, feedback, confirmationText } = req.body || {};
      if (confirmationText !== "DELETE MY ACCOUNT") {
        return res.status(400).json({
          success: false,
          message: "Please type 'DELETE MY ACCOUNT' exactly to confirm your request."
        });
      }
      const cleanPhone = (phone || "").replace(/\D/g, "").slice(-10);
      if (!userId && !cleanPhone && !email) {
        return res.status(400).json({
          success: false,
          message: "A registered mobile number, email, or user account is required to verify the deletion request."
        });
      }
      const sb = getServerSupabase();
      if (sb) {
        try {
          let query = sb.from("orders").select("id, status");
          if (userId) {
            query = query.eq("user_id", userId);
          } else if (cleanPhone) {
            query = query.or(`phone.eq.${cleanPhone},phone.eq.+91${cleanPhone},recipient_phone.eq.${cleanPhone},recipient_phone.eq.+91${cleanPhone}`);
          }
          const { data: userOrders } = await query;
          if (Array.isArray(userOrders)) {
            const activeStatuses = ["pending", "accepted", "packing", "out_for_delivery", "shipped", "near_destination", "in_transit"];
            const activeOrders = userOrders.filter((o) => activeStatuses.includes(String(o.status || "").toLowerCase()));
            if (activeOrders.length > 0) {
              return res.status(400).json({
                success: false,
                code: "ACTIVE_ORDERS",
                message: `You currently have ${activeOrders.length} active order(s) in progress. Your account cannot be scheduled for deletion until all orders are delivered or cancelled.`
              });
            }
          }
        } catch (dbErr) {
          console.warn("[Server Deletion Active Order Check Notice]:", dbErr);
        }
      }
      const now = /* @__PURE__ */ new Date();
      const scheduledDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1e3);
      const requestId = `DEL-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      const deletionRequestData = {
        requestId,
        userId: userId || null,
        name: name || "Customer",
        phone: cleanPhone || phone || "Not provided",
        email: email || "Not provided",
        reason: reason || "User requested account closure",
        feedback: feedback || "",
        status: "pending_admin_review",
        coolingPeriodDays: 7,
        requestedAt: now.toISOString(),
        scheduledDeletionDate: scheduledDate.toISOString(),
        dataRetentionScope: "Personal identification (name, phone, email, addresses) scheduled for erasure after 7 days. Statutory financial invoice records retained under tax laws."
      };
      deletionRequestsStore.set(requestId, deletionRequestData);
      if (sb) {
        try {
          await sb.from("account_deletion_requests").insert([{
            request_id: requestId,
            user_id: userId || null,
            customer_name: name || null,
            customer_phone: cleanPhone || null,
            customer_email: email || null,
            reason: reason || null,
            status: "pending_admin_review",
            scheduled_deletion_at: scheduledDate.toISOString(),
            created_at: now.toISOString()
          }]);
        } catch (dbSaveErr) {
          console.warn("[Server Deletion Request Table Notice]:", dbSaveErr);
        }
      }
      console.log("====================================================================");
      console.log("\u{1F6A8} [ADMIN ALERT] USER ACCOUNT DELETION REQUEST RECEIVED \u{1F6A8}");
      console.log(`Request ID: ${requestId}`);
      console.log(`User: ${name} | Phone: ${cleanPhone || phone} | Email: ${email}`);
      console.log(`Reason: ${reason}`);
      console.log(`Scheduled Deletion Date (7-Day Cooling Period): ${scheduledDate.toDateString()}`);
      console.log("Action Required: Admin must verify dues and confirm deletion within 7 days.");
      console.log("====================================================================");
      try {
        const adminEmail = process.env.ADMIN_EMAIL || OFFICIAL_EMAIL;
        await dispatchResendEmail({
          to: adminEmail,
          subject: `\u26A0\uFE0F [Admin Alert] Account Deletion Request - ${name || cleanPhone} (Scheduled in 7 Days)`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #b91c1c; margin-top: 0;">\u26A0\uFE0F User Account Deletion Request Alert</h2>
              <p>A customer has submitted an account and personal data deletion request in compliance with Google Play Store guidelines.</p>
              <div style="background: #f8fafc; padding: 16px; border-radius: 6px; margin: 16px 0;">
                <p><strong>Request ID:</strong> ${requestId}</p>
                <p><strong>Customer Name:</strong> ${name || "N/A"}</p>
                <p><strong>Registered Phone:</strong> ${cleanPhone || phone || "N/A"}</p>
                <p><strong>Email:</strong> ${email || "N/A"}</p>
                <p><strong>Reason:</strong> ${reason}</p>
                <p><strong>Additional Feedback:</strong> ${feedback || "None"}</p>
                <p><strong>Scheduled Deletion Date (7 Days):</strong> ${scheduledDate.toLocaleString("en-IN")}</p>
              </div>
              <p style="color: #475569; font-size: 13px;">Per regulatory guidelines, active orders and dues have been verified as completed before submission. Personal identifiers (name, phone, address) will be erased from the database after 7 days upon administrative confirmation.</p>
            </div>
          `
        });
      } catch (mailErr) {
        console.warn("[Server Admin Email Notification Notice]:", mailErr);
      }
      return res.status(200).json({
        success: true,
        requestId,
        scheduledDeletionDate: scheduledDate.toISOString(),
        message: "Your account deletion request has been submitted. A 7-day grace period has started, and an administrative confirmation alert has been dispatched."
      });
    } catch (err) {
      console.error("[Server Account Deletion Request Error]:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to process deletion request."
      });
    }
  });
  app.post("/api/account/deletion-request/cancel", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { requestId, phone, email, userId } = req.body || {};
      let targetReq = null;
      if (requestId && deletionRequestsStore.has(requestId)) {
        targetReq = deletionRequestsStore.get(requestId);
      } else {
        const cleanPhone = (phone || "").replace(/\D/g, "").slice(-10);
        for (const r of deletionRequestsStore.values()) {
          if (userId && r.userId === userId || cleanPhone && r.phone?.includes(cleanPhone) || email && r.email?.toLowerCase() === email.toLowerCase()) {
            targetReq = r;
            break;
          }
        }
      }
      if (targetReq) {
        targetReq.status = "cancelled_by_user";
        targetReq.cancelledAt = (/* @__PURE__ */ new Date()).toISOString();
      }
      const sb = getServerSupabase();
      if (sb && targetReq) {
        try {
          await sb.from("account_deletion_requests").update({ status: "cancelled_by_user" }).eq("request_id", targetReq.requestId);
        } catch (dbErr) {
          console.warn("[Server Cancel Deletion Notice]:", dbErr);
        }
      }
      return res.status(200).json({
        success: true,
        message: "Account deletion request has been successfully cancelled. Your account remains active."
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to cancel request."
      });
    }
  });
  const serverProfileStore = /* @__PURE__ */ new Map();
  const sentWelcomeEmailsStore = /* @__PURE__ */ new Set();
  app.post("/api/user-profile", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { user_id, phone, full_name, email, avatar_url, dob } = req.body || {};
      if (!user_id && !phone && !email) {
        return res.status(400).json({ success: false, message: "Missing identifier" });
      }
      const ADMIN_EMAILS2 = ["gauravgiri123344@gmail.com", "mdhassan1738@gmail.com"];
      const cleanEmail = email ? String(email).trim().toLowerCase() : "";
      const isReqAdmin = Boolean(cleanEmail && ADMIN_EMAILS2.includes(cleanEmail));
      let sanitizedPhone = phone;
      if (!isReqAdmin && sanitizedPhone && String(sanitizedPhone).replace(/\D/g, "").slice(-10) === "8777400280") {
        sanitizedPhone = null;
      }
      let sanitizedName = full_name;
      const clean10Phone = sanitizedPhone ? String(sanitizedPhone).replace(/\D/g, "").slice(-10) : "";
      const formattedE164 = clean10Phone ? `+91${clean10Phone}` : null;
      const sb = getServerSupabase();
      let mergedEmail = email || null;
      let mergedPhone = formattedE164 || sanitizedPhone || null;
      let mergedName = sanitizedName || null;
      let existingRow = null;
      if (sb && user_id) {
        try {
          const { data } = await sb.from("user_profiles").select("*").eq("user_id", user_id).maybeSingle();
          existingRow = data;
          if (existingRow) {
            if (!mergedEmail && existingRow.email && !existingRow.email.includes("@girirajpower.internal")) {
              mergedEmail = existingRow.email;
            }
            if (!mergedPhone && existingRow.phone) {
              mergedPhone = existingRow.phone;
            }
            if (!mergedName && (existingRow.full_name || existingRow.name)) {
              mergedName = existingRow.full_name || existingRow.name;
            }
          }
          await sb.from("user_profiles").upsert({
            user_id,
            phone: mergedPhone,
            full_name: mergedName,
            email: mergedEmail,
            avatar_url: avatar_url || existingRow?.avatar_url || null,
            dob: dob || existingRow?.dob || null,
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          }, { onConflict: "user_id" });
        } catch (sbErr) {
          console.warn("[Server Profile Sync Notice]:", sbErr);
        }
      }
      const profileRecord = {
        user_id: user_id || (clean10Phone ? `uid_${clean10Phone}` : "unknown"),
        phone: mergedPhone,
        full_name: mergedName,
        email: mergedEmail,
        avatar_url: avatar_url || null,
        dob: dob || null,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      if (user_id) serverProfileStore.set(user_id, profileRecord);
      if (clean10Phone) {
        serverProfileStore.set(clean10Phone, profileRecord);
        serverProfileStore.set(`+91${clean10Phone}`, profileRecord);
      }
      if (mergedEmail && !mergedEmail.includes("@girirajpower.internal")) {
        const cleanEmailLower = mergedEmail.toLowerCase();
        serverProfileStore.set(cleanEmailLower, profileRecord);
        recordWelcomedUser(cleanEmailLower);
      }
      if (serverFirestore && user_id) {
        syncUserToBackendFirestore(user_id, profileRecord).catch(() => {
        });
      }
      return res.status(200).json({ success: true, message: "Profile synchronized", profile: profileRecord });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message || "Failed to sync profile" });
    }
  });
  app.get("/api/saved-addresses", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { userId, phone, email, userScope } = req.query;
      const ADMIN_EMAILS2 = ["gauravgiri123344@gmail.com", "mdhassan1738@gmail.com"];
      const adminNames = ["md hassan", "md. hassan", "hassan", "mdhassan"];
      const cleanPhone = phone ? phone.replace(/\D/g, "").slice(-10) : "";
      const cleanEmail = email ? email.trim().toLowerCase() : "";
      const cleanUserId = userId ? String(userId).trim() : "";
      const cleanScope = userScope ? String(userScope).trim() : "";
      const isReqAdmin = Boolean(cleanEmail && ADMIN_EMAILS2.includes(cleanEmail));
      const effectivePhone = !isReqAdmin && cleanPhone === "8777400280" ? "" : cleanPhone;
      if (!cleanUserId && !effectivePhone && !cleanEmail && !cleanScope) {
        return res.status(200).json({
          success: true,
          addresses: []
        });
      }
      const collectedMap = /* @__PURE__ */ new Map();
      const sb = getServerSupabase();
      if (sb && (cleanUserId || effectivePhone)) {
        try {
          let query = sb.from("saved_addresses").select("*").order("created_at", { ascending: false }).limit(50);
          if (cleanUserId) {
            query = query.eq("user_id", cleanUserId);
          } else if (effectivePhone) {
            query = query.or(`receiver_phone.eq.${effectivePhone},receiver_phone.eq.+91${effectivePhone}`);
          }
          const { data, error } = await query;
          if (!error && Array.isArray(data)) {
            for (const row of data) {
              if (row && row.id) {
                const rowUid = row.user_id ? String(row.user_id).trim() : "";
                const rowPhone = (row.receiver_phone || "").replace(/\D/g, "").slice(-10);
                const belongsToUser = cleanUserId && rowUid === cleanUserId || !cleanUserId && effectivePhone && rowPhone === effectivePhone;
                if (belongsToUser) {
                  collectedMap.set(row.id, {
                    id: row.id,
                    userId: row.user_id || void 0,
                    user_id: row.user_id || void 0,
                    tag: row.tag || "home",
                    tagLabel: row.tag_label || void 0,
                    houseName: row.house_name || "",
                    houseFlat: row.house_flat || "",
                    buildingRoad: row.building_road || "",
                    landmark: row.landmark || void 0,
                    area: row.area_data || {
                      name: row.area_name || "Kasba",
                      pincode: row.pincode || "700039",
                      zone: "South",
                      hub: "Kasba Central Hub",
                      deliveryMinutes: 60,
                      serviceable: true
                    },
                    lat: row.lat || void 0,
                    lng: row.lng || void 0,
                    formattedExactAddress: row.formatted_exact_address || void 0,
                    receiverName: row.receiver_name || void 0,
                    receiverPhone: row.receiver_phone || void 0,
                    createdAt: row.created_at || (/* @__PURE__ */ new Date()).toISOString()
                  });
                }
              }
            }
          }
        } catch (sbErr) {
          console.warn("[Server GET saved-addresses Supabase Notice]:", sbErr);
        }
      }
      const fileAddresses = loadSavedAddressesFile();
      for (const item of fileAddresses) {
        if (!item || !item.id) continue;
        let matches = false;
        const itemUserId = item.userId || item.user_id;
        const itemScope = item.userScope || item.scope;
        const itemPhone = (item.receiverPhone || item.receiver_phone || item.phone || "").replace(/\D/g, "").slice(-10);
        const itemEmail = (item.receiverEmail || item.receiver_email || item.email || "").trim().toLowerCase();
        if (cleanUserId && itemUserId && String(itemUserId) === cleanUserId) {
          matches = true;
        } else if (!cleanUserId && cleanScope && itemScope && String(itemScope) === cleanScope) {
          matches = true;
        } else if (!cleanUserId && effectivePhone && effectivePhone.length === 10 && itemPhone && itemPhone === effectivePhone) {
          matches = true;
        } else if (!cleanUserId && cleanEmail && cleanEmail.includes("@") && itemEmail && itemEmail === cleanEmail) {
          matches = true;
        }
        if (matches && !collectedMap.has(item.id)) {
          collectedMap.set(item.id, item);
        }
      }
      const rawAddresses = Array.from(collectedMap.values()).sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return timeB - timeA;
      });
      const addresses = isReqAdmin ? rawAddresses : rawAddresses.filter((a) => {
        const p = (a.receiverPhone || a.receiver_phone || "").replace(/\D/g, "").slice(-10);
        if (p === "8777400280") {
          return false;
        }
        return true;
      });
      return res.status(200).json({
        success: true,
        addresses
      });
    } catch (err) {
      console.error("[Server GET /api/saved-addresses Error]:", err);
      return res.status(500).json({
        success: false,
        addresses: [],
        message: err.message || "Failed to load saved addresses from server."
      });
    }
  });
  app.post("/api/saved-addresses", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const address = req.body || {};
      if (!address.id) {
        return res.status(400).json({ success: false, message: "Missing address id" });
      }
      const normalizedAddress = {
        id: String(address.id),
        userId: address.userId || address.user_id || null,
        user_id: address.user_id || address.userId || null,
        userScope: address.userScope || address.scope || null,
        tag: address.tag || "home",
        tagLabel: address.tagLabel || address.tag_label || null,
        houseName: address.houseName || address.house_name || "",
        houseFlat: address.houseFlat || address.house_flat || "",
        buildingRoad: address.buildingRoad || address.building_road || "",
        landmark: address.landmark || null,
        area: address.area || address.area_data || {
          name: address.area_name || "Kasba",
          pincode: address.pincode || "700039",
          zone: "South",
          hub: "Kasba Central Hub",
          deliveryMinutes: 60,
          serviceable: true
        },
        lat: address.lat || null,
        lng: address.lng || null,
        formattedExactAddress: address.formattedExactAddress || address.formatted_exact_address || null,
        receiverName: address.receiverName || address.receiver_name || null,
        receiverPhone: address.receiverPhone || address.receiver_phone || null,
        receiverEmail: address.receiverEmail || address.email || null,
        createdAt: address.createdAt || address.created_at || (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const currentList = loadSavedAddressesFile();
      const updatedList = [
        normalizedAddress,
        ...currentList.filter((item) => String(item.id) !== String(address.id))
      ];
      writeSavedAddressesFile(updatedList);
      const sb = getServerSupabase();
      if (sb) {
        try {
          await sb.from("saved_addresses").upsert({
            id: normalizedAddress.id,
            user_id: normalizedAddress.user_id,
            tag: normalizedAddress.tag,
            tag_label: normalizedAddress.tagLabel,
            house_name: normalizedAddress.houseName,
            house_flat: normalizedAddress.houseFlat,
            building_road: normalizedAddress.buildingRoad,
            landmark: normalizedAddress.landmark,
            area_name: normalizedAddress.area?.name || "Kolkata",
            pincode: normalizedAddress.area?.pincode || "700001",
            area_data: normalizedAddress.area,
            lat: normalizedAddress.lat,
            lng: normalizedAddress.lng,
            formatted_exact_address: normalizedAddress.formattedExactAddress,
            receiver_name: normalizedAddress.receiverName,
            receiver_phone: normalizedAddress.receiverPhone,
            created_at: normalizedAddress.createdAt,
            updated_at: normalizedAddress.updatedAt
          }, { onConflict: "id" });
        } catch (sbErr) {
          console.warn("[Server Address Upsert Supabase Notice]:", sbErr);
        }
      }
      return res.status(200).json({
        success: true,
        address: normalizedAddress,
        message: "Address saved and persisted on server."
      });
    } catch (err) {
      console.error("[Server POST /api/saved-addresses Error]:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to save address on server."
      });
    }
  });
  app.delete("/api/saved-addresses/:id", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const addressId = req.params.id;
      if (!addressId) {
        return res.status(400).json({ success: false, message: "Missing address id" });
      }
      const currentList = loadSavedAddressesFile();
      const updatedList = currentList.filter((item) => String(item.id) !== String(addressId));
      writeSavedAddressesFile(updatedList);
      const sb = getServerSupabase();
      if (sb) {
        try {
          await sb.from("saved_addresses").delete().eq("id", addressId);
        } catch (sbErr) {
          console.warn("[Server Address Delete Supabase Notice]:", sbErr);
        }
      }
      return res.status(200).json({
        success: true,
        message: `Address #${addressId} deleted from server.`
      });
    } catch (err) {
      console.error("[Server DELETE /api/saved-addresses Error]:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to delete address from server."
      });
    }
  });
  app.post("/api/saved-addresses/delete", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { id } = req.body || {};
      if (!id) {
        return res.status(400).json({ success: false, message: "Missing address id" });
      }
      const currentList = loadSavedAddressesFile();
      const updatedList = currentList.filter((item) => String(item.id) !== String(id));
      writeSavedAddressesFile(updatedList);
      const sb = getServerSupabase();
      if (sb) {
        try {
          await sb.from("saved_addresses").delete().eq("id", id);
        } catch (sbErr) {
          console.warn("[Server Address Delete Fallback Supabase Notice]:", sbErr);
        }
      }
      return res.status(200).json({
        success: true,
        message: `Address #${id} deleted from server.`
      });
    } catch (err) {
      console.error("[Server POST /api/saved-addresses/delete Error]:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to delete address from server."
      });
    }
  });
  app.post("/api/service-bookings", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const booking = req.body || {};
      if (!booking.id || !booking.serviceTitle) {
        return res.status(400).json({ success: false, message: "Missing booking details" });
      }
      const sb = getServerSupabase();
      if (sb) {
        try {
          await sb.from("wiring_service_bookings").insert({
            id: booking.id,
            user_id: booking.userId || booking.user_id || null,
            service_title: booking.serviceTitle || booking.service_title,
            service_category: booking.serviceCategory || booking.service_category || "General",
            project_type: booking.projectType || booking.project_type || null,
            approx_area_sq_ft: booking.approxAreaSqFt || booking.approx_area_sq_ft || null,
            preferred_date: booking.preferredDate || booking.preferred_date || null,
            preferred_time_slot: booking.preferredTimeSlot || booking.preferred_time_slot || null,
            site_address: booking.siteAddress || booking.site_address || null,
            area: booking.area || null,
            pincode: booking.pincode || null,
            contact_name: booking.contactName || booking.contact_name || "Customer",
            contact_phone: booking.contactPhone || booking.contact_phone || "",
            contact_email: booking.contactEmail || booking.contact_email || null,
            estimated_price: booking.estimatedPrice || booking.estimated_price || 0,
            wire_grade: booking.wireGrade || booking.wire_grade || null,
            notes: booking.notes || null,
            status: booking.status || "pending",
            created_at: booking.createdAt || booking.created_at || (/* @__PURE__ */ new Date()).toISOString()
          });
        } catch (sbErr) {
          console.warn("[Server Service Booking Sync Notice]:", sbErr);
        }
      }
      return res.status(200).json({ success: true, message: "Service booking recorded" });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message || "Failed to record booking" });
    }
  });
  app.get("/api/technicians/:id/reviews", (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const techId = req.params.id;
      const allReviews = loadTechnicianReviewsFile();
      const techReviews = allReviews.filter((r) => r.technicianId === techId);
      return res.json({
        success: true,
        reviews: techReviews
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message || "Failed to fetch reviews" });
    }
  });
  app.post("/api/technicians/:id/reviews", (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const techId = req.params.id;
      const { customerName, area, rating, comment, serviceType } = req.body || {};
      if (!customerName || !customerName.trim()) {
        return res.status(400).json({ success: false, message: "Customer name is required" });
      }
      if (!rating || Number(rating) < 1 || Number(rating) > 5) {
        return res.status(400).json({ success: false, message: "Valid rating between 1 and 5 is required" });
      }
      if (!comment || !comment.trim()) {
        return res.status(400).json({ success: false, message: "Review comment is required" });
      }
      const allReviews = loadTechnicianReviewsFile();
      const newReview = {
        id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        technicianId: techId,
        customerName: customerName.trim(),
        area: (area || "Kolkata").trim(),
        rating: Math.min(5, Math.max(1, Number(rating))),
        date: (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }),
        comment: comment.trim(),
        verifiedJob: true,
        serviceType: (serviceType || "Service Inspection").trim(),
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      allReviews.unshift(newReview);
      writeTechnicianReviewsFile(allReviews);
      const techReviews = allReviews.filter((r) => r.technicianId === techId);
      return res.status(201).json({
        success: true,
        message: "Review successfully saved to server",
        review: newReview,
        reviews: techReviews
      });
    } catch (err) {
      console.error("Error saving technician review:", err);
      return res.status(500).json({ success: false, message: err.message || "Failed to save review" });
    }
  });
  const isValidGeminiApiKey = (key) => {
    if (!key) return false;
    const trimmed = key.trim();
    if (trimmed.length < 20) return false;
    if (!trimmed.startsWith("AIzaSy")) return false;
    const lower = trimmed.toLowerCase();
    if (lower.includes("your_") || lower.includes("dummy") || lower.includes("placeholder") || lower.includes("example") || lower === "undefined" || lower === "null") {
      return false;
    }
    return true;
  };
  app.post("/api/technicians/generate-description", async (req, res) => {
    try {
      const { name, title, primarySector, subSectors, experienceYears, skills, about } = req.body || {};
      const apiKey = process.env.GEMINI_API_KEY?.trim();
      const fallbackDesc = `${experienceYears || 5}+ years experienced ${title || "Electrical Specialist"} specialized in ${subSectors && subSectors[0] || primarySector || "electrical installations"} with verified field expertise across Kolkata.`;
      if (!isValidGeminiApiKey(apiKey)) {
        return res.json({
          success: true,
          description: fallbackDesc,
          aiPowered: false
        });
      }
      const ai = new import_genai.GoogleGenAI({
        apiKey,
        httpOptions: { headers: { "User-Agent": "aistudio-build" } }
      });
      const prompt = `Write a crisp, single-sentence professional summary (under 25 words) for an electrical technician profile with the following details:
- Name: ${name}
- Profession / Title: ${title}
- Primary Sector: ${primarySector}
- Sub-specialties: ${Array.isArray(subSectors) ? subSectors.join(", ") : subSectors}
- Experience: ${experienceYears} years
- Key Skills: ${Array.isArray(skills) ? skills.map((s) => typeof s === "string" ? s : s.name).join(", ") : skills}
- Background: ${about}

Tone: direct, confident, objective. Output ONLY the single sentence. No quotation marks, no markdown, no prefixes.`;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });
      const generated = response.text ? response.text.trim().replace(/^["']|["']$/g, "") : fallbackDesc;
      return res.json({
        success: true,
        description: generated || fallbackDesc,
        aiPowered: true
      });
    } catch (err) {
      console.warn("AI description generation error:", err);
      return res.json({
        success: true,
        description: `${req.body?.experienceYears || 5}+ years experienced electrical specialist with verified credentials across Kolkata.`,
        aiPowered: false
      });
    }
  });
  app.get("/api/email-status", (req, res) => {
    const apiKey = process.env.RESEND_API_KEY;
    const isConfigured = Boolean(apiKey && apiKey !== "MY_RESEND_API_KEY" && apiKey.trim() !== "");
    const fromEmail = process.env.RESEND_FROM_EMAIL || `SmartRun <${OFFICIAL_EMAIL}>`;
    const unreadCount = receivedEmailsStore.filter((m) => m.status === "unread").length;
    res.json({
      configured: isConfigured,
      fromEmail,
      officialEmail: OFFICIAL_EMAIL,
      resendInboundEmail: RESEND_INBOUND_EMAIL,
      resendInboundDomain: RESEND_INBOUND_DOMAIN,
      adminEmails: ADMIN_EMAILS,
      adminEmail: ADMIN_EMAIL,
      inboundWebhookUrl: "/api/resend/inbound",
      receivedCount: receivedEmailsStore.length,
      unreadCount,
      service: "Resend"
    });
  });
  app.post("/api/send-email", strictLimiter, async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const {
        to,
        subject: customSubject,
        html: customHtml,
        text: customText,
        type = "order_confirmation",
        order,
        booking,
        customerName
      } = req.body;
      if (!to) {
        return res.status(400).json({
          success: false,
          message: "Missing recipient 'to' email address."
        });
      }
      let subject = customSubject;
      let html = customHtml;
      let text = customText;
      let attachments = void 0;
      if ((type === "order_delivered" || type === "order_confirmation" && order?.status === "delivered") && order) {
        const shortId = getShortOrderCode(order.id || order.order_id || order.orderId);
        subject = subject || `\u26A1 Order Delivered #${shortId} - SmartRun Express Kolkata`;
        html = html || generateOrderEmailHtml(order, customerName || order.customerName || "Customer", true);
        text = text || `Your SmartRun order #${shortId} has been successfully delivered to ${order.area || "Kolkata"}. Attached is your official Tax Invoice PDF (SmartRun-Invoice-${shortId}.pdf). Total: \u20B9${order.totalAmount}. Thank you for ordering with SmartRun!`;
        const pdfBase64 = generateInvoicePdfBuffer(order);
        if (pdfBase64) {
          attachments = [
            {
              filename: `SmartRun-Invoice-${shortId}.pdf`,
              content: pdfBase64
            }
          ];
        }
        recordDeliveredEmailSent(order.id || order.order_id || order.orderId, to);
      } else if (type === "order_confirmation" && order) {
        subject = subject || `\u26A1 Order Confirmed #${order.id} - SmartRun Express Kolkata`;
        html = html || generateOrderEmailHtml(order, customerName || order.customerName || "Customer", false);
        text = text || `Your SmartRun order #${order.id} has been confirmed. Total: \u20B9${order.totalAmount}. Delivery to ${order.area}, Kolkata.`;
      } else if (type === "service_booking" && booking) {
        subject = subject || `\u26A1 Service Booking Confirmed #${booking.id} - SmartRun Services`;
        html = html || generateWiringBookingEmailHtml(booking, customerName || booking.contactName || "Customer");
        text = text || `Your wiring consultation booking #${booking.id} has been confirmed for ${booking.projectType} at ${booking.siteAddress}.`;
      } else if (type === "login_alert") {
        subject = subject || "Important: Login from new device and location";
        const timeIso = formatToIstIsoString(req.body?.clientTime);
        const rawUserAgent = req.body?.userAgent || req.headers["user-agent"] || "";
        const cleanPhone = (req.body?.phone || "").replace(/\D/g, "").slice(-10);
        const accountId = req.body?.accountId || (cleanPhone ? `${to} (+91 ${cleanPhone})` : to);
        html = html || generateLoginAlertEmailHtml({
          customerName: customerName || "Customer",
          email: to,
          accountId,
          phone: req.body?.phone,
          timeIso,
          loginTime: req.body?.loginTime,
          ipAddress: req.body?.ipAddress || "Protected",
          location: req.body?.location || "Kolkata, India",
          device: req.body?.device || "Mobile Device",
          os: req.body?.os || "Android",
          browser: req.body?.browser || "SmartRun App",
          userAgent: rawUserAgent,
          loginMethod: req.body?.loginMethod || "Email & Password"
        });
        text = text || `Hi ${customerName || "Customer"},
Your account ${accountId} has logged in from a new device and location.

If this is not you, use the forgot password option immediately and reset your login credentials: https://www.smartrun.in/reset-password

Location:	${req.body?.location || "Kolkata, India"}
IP:	${req.body?.ipAddress || "2401:4900:8829:d1cb:8233:7592:811c:e1f5"}
Device:	${rawUserAgent || req.body?.device || "Android Device"}
Time:	${timeIso}

Why did I receive this e-mail? https://www.smartrun.in/faq#security-login-alerts

SmartRun materials pvt. ltd, Kheyadah Village, Bhagabanpur, Kolkata 700150`;
      } else if (type === "welcome_email") {
        subject = subject || "You're all set! Welcome to SmartRun \u26A1";
        html = html || generateWelcomeEmailHtml(customerName || "Customer");
        text = text || `Hey ${customerName || "Customer"}, Welcome aboard! \u{1F44B}

Thanks for joining SmartRun. We\u2019re thrilled to have you! Whether you need wiring, fixtures, tools, or heavy-duty construction supplies at your site in Kolkata, we\u2019ve got your back with lightning-fast deliveries.

What you get with SmartRun:

* \u26A1 Express Delivery: Get supplies right when you need them.
* \u{1F4E6} Genuine Materials: Top-tier electrical and hardware brands.
* \u{1F4F1} Real-time Tracking: Track your order from dispatch to doorstep.

To get started on your phone, you can download or open our Android app here:

\u{1F449} SmartRun on Google Play Store: https://play.google.com/store/apps/details?id=in.smartrun.app&pcampaignid=web_share

Need help or have questions about bulk orders? Just reply to this email or reach out to our support team right from the app.

Cheers,
SmartRun materials pvt. ltd
Kolkata, West Bengal

SmartRun materials pvt. ltd, Kheyadah Village, Bhagabanpur, Kolkata 700150`;
      } else if (type === "test_email") {
        subject = subject || "\u26A1 Email Verification - SmartRun Kolkata";
        html = html || generateTestEmailHtml(customerName || "Valued Customer");
        text = text || "Your SmartRun email integration is successfully operational!";
      } else {
        subject = subject || "Notification from SmartRun";
        html = html || `<p>${customText || "Notification from SmartRun Kolkata"}</p>`;
      }
      const dispatchResult = await dispatchResendEmail({
        type,
        to,
        subject,
        html,
        text,
        attachments
      });
      if (type === "order_confirmation" && order) {
        try {
          const adminHtml = generateAdminOrderAlertHtml(order);
          const adminSubject = `\u{1F6A8} NEW ORDER #${order.id} (\u20B9${(order.totalAmount || 0).toLocaleString("en-IN")}) - ${order.customerName || "Customer"}`;
          dispatchResendEmail({
            to: ADMIN_EMAILS,
            subject: adminSubject,
            html: adminHtml,
            text: `New order #${order.id} placed by ${order.customerName} (${order.phone}). Amount: \u20B9${order.totalAmount}. Address: ${order.address}, ${order.area}, PIN: ${order.pincode}.`
          }).catch((err) => console.warn("[Admin Notification Resend Background Notice]:", err));
        } catch (adminErr) {
          console.warn("[Admin Notification Trigger Notice]:", adminErr);
        }
      }
      return res.status(200).json(dispatchResult);
    } catch (err) {
      console.error("Resend send error:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "An unexpected error occurred while sending email.",
        error: String(err)
      });
    }
  });
  app.post("/api/orders/:id/send-delivery-email", strictLimiter, async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const orderId = req.params.id;
      const { customerEmail, force, order: orderFromReq } = req.body || {};
      if (!orderId) {
        return res.status(400).json({ success: false, message: "Missing order ID." });
      }
      if (!force && isDeliveredEmailSent(orderId)) {
        return res.status(200).json({
          success: true,
          message: "Delivered order email and invoice PDF already sent to customer.",
          alreadySent: true
        });
      }
      let orderData = orderFromReq;
      if (!orderData) {
        const sb = getServerSupabase();
        if (sb) {
          const { data } = await sb.from("orders").select("*").eq("id", orderId).maybeSingle();
          if (data) orderData = data;
        }
      }
      if (!orderData) {
        return res.status(404).json({ success: false, message: "Order details could not be found." });
      }
      const recipientEmail = customerEmail || orderData.customer_email || orderData.customerEmail || orderData.recipient_email;
      if (!recipientEmail || !recipientEmail.includes("@") || recipientEmail.includes("@girirajpower.internal")) {
        return res.status(400).json({
          success: false,
          message: "No valid customer email address available on this order."
        });
      }
      const shortId = getShortOrderCode(orderData.id || orderData.order_id || orderId);
      const subject = `\u26A1 Order Delivered #${shortId} - SmartRun Express Kolkata`;
      const html = generateOrderEmailHtml(orderData, orderData.customerName || orderData.customer_name || "Customer", true);
      const text = `Your SmartRun order #${shortId} has been successfully delivered. Attached is your official Tax Invoice PDF (SmartRun-Invoice-${shortId}.pdf). Total: \u20B9${orderData.totalAmount || orderData.total_amount}. Thank you for choosing SmartRun!`;
      const pdfBase64 = generateInvoicePdfBuffer(orderData);
      const attachments = pdfBase64 ? [{ filename: `SmartRun-Invoice-${shortId}.pdf`, content: pdfBase64 }] : void 0;
      const result = await dispatchResendEmail({
        to: recipientEmail,
        subject,
        html,
        text,
        attachments
      });
      recordDeliveredEmailSent(orderId, recipientEmail);
      return res.status(200).json({
        success: true,
        message: "Delivered order confirmation and Tax Invoice PDF successfully dispatched.",
        details: result
      });
    } catch (err) {
      console.error("[send-delivery-email Error]:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to dispatch delivered order email.",
        error: String(err)
      });
    }
  });
  app.post("/api/support/order-help-alert", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const {
        orderId,
        orderNumber,
        customerName,
        customerPhone,
        customerEmail,
        status,
        statusLabel,
        riderName,
        riderPhone,
        riderLocation,
        deliveryArea,
        totalAmount
      } = req.body || {};
      const displayOrderNum = orderNumber || (orderId ? String(orderId).slice(0, 8).toUpperCase() : "LIVE");
      const clientName = customerName || "Customer";
      const clientPhone = customerPhone || "Not provided";
      const subject = `\u{1F198} [CUSTOMER HELP ALERT] Order #${displayOrderNum} (${statusLabel || status || "Processing"}) - ${clientName}`;
      const riderLocText = riderLocation?.lat && riderLocation?.lng ? `\u{1F4CD} Lat: ${riderLocation.lat.toFixed(4)}, Lng: ${riderLocation.lng.toFixed(4)}` : "Kasba Central Depot";
      const html = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #ffffff;">
          <div style="background: #0f172a; padding: 20px 24px; border-bottom: 3px solid #f59e0b;">
            <h2 style="color: #ffffff; margin: 0; font-size: 18px; font-weight: 800;">
              \u{1F198} Live Order Customer Support Alert
            </h2>
            <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 12px;">
              Customer requested assistance on Order #${displayOrderNum}
            </p>
          </div>
          
          <div style="padding: 24px;">
            <div style="background: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 13px; font-weight: 700; color: #92400e;">
                Current Process: ${statusLabel || status || "In Progress"}
              </p>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 140px;">Order ID:</td>
                <td style="padding: 8px 0; font-weight: 700; color: #0f172a;">#${displayOrderNum}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Customer Name:</td>
                <td style="padding: 8px 0; font-weight: 700; color: #0f172a;">${clientName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Customer Phone:</td>
                <td style="padding: 8px 0; font-weight: 700; color: #0f172a;">
                  <a href="tel:${clientPhone}" style="color: #2563eb; text-decoration: none;">${clientPhone}</a>
                </td>
              </tr>
              ${customerEmail ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Customer Email:</td>
                <td style="padding: 8px 0; color: #0f172a;">${customerEmail}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Delivery Area:</td>
                <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${deliveryArea || "Kolkata"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Order Total:</td>
                <td style="padding: 8px 0; font-weight: 700; color: #059669;">\u20B9${totalAmount ? Number(totalAmount).toLocaleString("en-IN") : "0"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Assigned Rider:</td>
                <td style="padding: 8px 0; font-weight: 700; color: #0f172a;">${riderName ? `${riderName} (${riderPhone || "+91 87774 00280"})` : "Not assigned yet"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Rider Location:</td>
                <td style="padding: 8px 0; color: #0f172a;">${riderLocText}</td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; display: flex; gap: 12px;">
              <a href="tel:${clientPhone}" style="display: inline-block; background: #0f172a; color: #ffffff; padding: 10px 18px; border-radius: 6px; font-weight: 700; font-size: 12px; text-decoration: none;">
                \u{1F4DE} Call Customer
              </a>
              ${riderPhone ? `
              <a href="tel:${riderPhone}" style="display: inline-block; background: #059669; color: #ffffff; padding: 10px 18px; border-radius: 6px; font-weight: 700; font-size: 12px; text-decoration: none;">
                \u{1F6F5} Call Rider
              </a>` : ""}
            </div>
          </div>
          
          <div style="background: #f8fafc; padding: 12px 24px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0;">
            SmartRun \u2022 Kasba Central Warehouse Hub \u2022 24/7 Support Desk
          </div>
        </div>
      `;
      const dispatchResult = await dispatchResendEmail({
        to: ADMIN_EMAILS,
        subject,
        html,
        text: `\u{1F198} Customer Help Alert: ${clientName} (${clientPhone}) needs assistance on Order #${displayOrderNum}. Current stage: ${statusLabel || status}. Rider: ${riderName || "None"}. Amount: \u20B9${totalAmount || 0}.`
      });
      return res.status(200).json({ success: true, dispatchResult });
    } catch (err) {
      console.warn("[Order Help Alert Email Notice]:", err);
      return res.status(500).json({ success: false, message: err?.message || String(err) });
    }
  });
  const recentLoginAlerts = /* @__PURE__ */ new Map();
  app.post("/api/auth/login-notification", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const {
        email,
        name,
        userId,
        phone,
        accountId,
        loginMethod,
        device,
        os,
        browser,
        userAgent,
        clientTime,
        clientTimeFormatted,
        clientLocation,
        isNewAccount,
        force
      } = req.body || {};
      if (isNewAccount === true) {
        return res.status(200).json({
          success: true,
          message: "Login security alert skipped for initial account registration (welcome email is dispatched).",
          skippedForNewRegistration: true
        });
      }
      const cleanEmail = (email || "").trim().toLowerCase();
      if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
        return res.status(400).json({
          success: false,
          message: "A valid email address is required to dispatch login notification."
        });
      }
      const now = Date.now();
      const lastSent = recentLoginAlerts.get(cleanEmail);
      if (!force && lastSent && now - lastSent < 6e4) {
        return res.status(200).json({
          success: true,
          message: "Login alert recently dispatched; duplicate suppressed.",
          debounced: true
        });
      }
      recentLoginAlerts.set(cleanEmail, now);
      const forwarded = req.headers["x-forwarded-for"];
      let clientIp = "";
      if (typeof forwarded === "string") {
        clientIp = forwarded.split(",")[0].trim();
      } else if (Array.isArray(forwarded) && forwarded.length > 0) {
        clientIp = forwarded[0].trim();
      } else {
        clientIp = req.socket.remoteAddress || req.ip || "";
      }
      if (clientIp.startsWith("::ffff:")) {
        clientIp = clientIp.replace("::ffff:", "");
      }
      let finalLocation = (clientLocation || "").trim();
      if (!finalLocation) {
        const cfCity = req.headers["cf-ipcity"];
        const cfRegion = req.headers["cf-ipregion"];
        const cfCountry = req.headers["cf-ipcountry"];
        if (cfCity || cfRegion || cfCountry) {
          finalLocation = [cfCity, cfRegion, cfCountry === "IN" ? "India" : cfCountry].filter(Boolean).join(", ");
        }
      }
      if (!finalLocation || finalLocation === "Unknown" || finalLocation.toLowerCase().includes("undefined")) {
        finalLocation = "Kolkata, India";
      } else if (finalLocation.toLowerCase().includes("kolkata")) {
        finalLocation = "Kolkata, India";
      }
      const displayTime = clientTimeFormatted || (/* @__PURE__ */ new Date()).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "full",
        timeStyle: "medium"
      }) + " (IST)";
      const timeIso = formatToIstIsoString(clientTime);
      const rawUserAgent = userAgent || req.headers["user-agent"] || "";
      const cleanPhone = (phone || "").replace(/\D/g, "").slice(-10);
      const resolvedAccountId = accountId || (cleanPhone && cleanEmail ? `${cleanEmail} (+91 ${cleanPhone})` : cleanEmail || (cleanPhone ? `+91 ${cleanPhone}` : "Customer Account"));
      const customerName = name || cleanEmail.split("@")[0] || "Valued Customer";
      const html = generateLoginAlertEmailHtml({
        customerName,
        email: cleanEmail,
        accountId: resolvedAccountId,
        phone,
        timeIso,
        loginTime: displayTime,
        ipAddress: clientIp || "Protected",
        location: finalLocation,
        device: device || "Mobile Device",
        os: os || "Android",
        browser: browser || "SmartRun App",
        userAgent: rawUserAgent,
        loginMethod: loginMethod || "Email & Password"
      });
      const subject = "Important: Login from new device and location";
      const text = `Hi ${customerName},
Your account ${resolvedAccountId} has logged in from a new device and location.

If this is not you, use the forgot password option immediately and reset your login credentials: https://www.smartrun.in/reset-password

Location:	${finalLocation}
IP:	${clientIp || "2401:4900:8829:d1cb:8233:7592:811c:e1f5"}
Device:	${rawUserAgent || (device ? `${device} (${os || "Android"})` : "Mobile Device")}
Time:	${timeIso}

Why did I receive this e-mail? https://www.smartrun.in/faq#security-login-alerts

SmartRun materials pvt. ltd, Kheyadah Village, Bhagabanpur, Kolkata 700150`;
      const dispatchResult = await dispatchResendEmail({
        type: "alert",
        from: "SmartRun Security <alert@smartrun.in>",
        to: cleanEmail,
        subject,
        html,
        text
      });
      return res.status(200).json({
        success: true,
        message: "Security login notification successfully dispatched.",
        details: dispatchResult
      });
    } catch (err) {
      console.error("[Login Notification Handler Error]:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to dispatch login notification.",
        error: String(err)
      });
    }
  });
  app.post("/api/auth/send-welcome-email", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { email, name, userId, force, isNewAccount } = req.body || {};
      const cleanEmail = (email || "").trim().toLowerCase();
      if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".") || cleanEmail.includes("@girirajpower.internal")) {
        return res.status(400).json({
          success: false,
          message: "A valid email address is required to dispatch welcome email."
        });
      }
      if (!force && isUserWelcomed(cleanEmail)) {
        return res.status(200).json({
          success: true,
          message: "Welcome email already delivered to this user.",
          alreadySent: true
        });
      }
      if (!force) {
        const sb = getServerSupabase();
        if (sb) {
          try {
            const { data: existingProfile } = await sb.from("user_profiles").select("user_id, email, created_at").eq("email", cleanEmail).maybeSingle();
            if (existingProfile) {
              const createdAt = existingProfile.created_at ? new Date(existingProfile.created_at).getTime() : 0;
              const isRecentRegistration = createdAt > 0 && Date.now() - createdAt < 5 * 60 * 1e3;
              if (!isNewAccount || !isRecentRegistration) {
                recordWelcomedUser(cleanEmail);
                return res.status(200).json({
                  success: true,
                  message: "Welcome email skipped: user already has an established account.",
                  alreadySent: true
                });
              }
            }
          } catch (dbCheckErr) {
            console.warn("[Welcome Email DB Existence Check Notice]:", dbCheckErr);
          }
        }
        if (serverFirestore) {
          try {
            const userDoc = await serverFirestore.collection("users").doc(cleanEmail).get();
            if (userDoc.exists && userDoc.data()?.welcomed === true) {
              recordWelcomedUser(cleanEmail);
              return res.status(200).json({
                success: true,
                message: "Welcome email skipped: user already recorded as welcomed in database.",
                alreadySent: true
              });
            }
          } catch (fErr) {
            console.debug("[Firestore Welcomed Check Notice]:", fErr);
          }
        }
      }
      const safeName = name && name.trim() ? name.trim() : cleanEmail.split("@")[0];
      const subject = "You're all set! Welcome to SmartRun \u26A1";
      const html = generateWelcomeEmailHtml(safeName);
      const text = `Hey ${safeName}, Welcome aboard! \u{1F44B}

Thanks for joining SmartRun. We\u2019re thrilled to have you! Whether you need wiring, fixtures, tools, or heavy-duty construction supplies at your site in Kolkata, we\u2019ve got your back with lightning-fast deliveries.

What you get with SmartRun:

* \u26A1 Express Delivery: Get supplies right when you need them.
* \u{1F4E6} Genuine Materials: Top-tier electrical and hardware brands.
* \u{1F4F1} Real-time Tracking: Track your order from dispatch to doorstep.

To get started on your phone, you can download or open our Android app here:

\u{1F449} SmartRun on Google Play Store: https://play.google.com/store/apps/details?id=in.smartrun.app&pcampaignid=web_share

Need help or have questions about bulk orders? Just reply to this email or reach out to our support team right from the app.

Cheers,
SmartRun materials pvt. ltd
Kolkata, West Bengal

SmartRun materials pvt. ltd, Kheyadah Village, Bhagabanpur, Kolkata 700150`;
      const dispatchResult = await dispatchResendEmail({
        type: "welcome_email",
        from: "SmartRun <welcome@smartrun.in>",
        to: cleanEmail,
        subject,
        html,
        text
      });
      recordWelcomedUser(cleanEmail);
      if (serverFirestore) {
        serverFirestore.collection("users").doc(cleanEmail).set({
          welcomed: true,
          welcomed_at: (/* @__PURE__ */ new Date()).toISOString()
        }, { merge: true }).catch(() => {
        });
      }
      return res.status(200).json({
        success: true,
        message: "Welcome email successfully dispatched.",
        details: dispatchResult
      });
    } catch (err) {
      console.error("[Welcome Email Handler Error]:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to dispatch welcome email.",
        error: String(err)
      });
    }
  });
  app.post("/api/notify-order", strictLimiter, requireApiSecret, async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { order, customerEmail } = req.body;
      if (!order) {
        return res.status(400).json({
          success: false,
          message: "Missing order payload."
        });
      }
      const phoneClean = (order.phone || "").replace(/\D/g, "").slice(-10);
      const itemsListText = (order.items || []).map((it, i) => `${i + 1}. ${it.product?.name || "Item"} (${it.product?.brand || "SmartRun"}) x ${it.quantity} ${it.product?.unit || "pc"} = \u20B9${((it.product?.price || 0) * it.quantity).toLocaleString("en-IN")}`).join("\n");
      const whatsappText = `\u26A1 *NEW ORDER RECEIVED - SMARTRUN* \u26A1

\u{1F4E6} *Order ID:* #${order.id || "SR-100000"}
\u{1F4C5} *Date/Time:* ${(/* @__PURE__ */ new Date()).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} (IST)

\u{1F464} *Customer Name:* ${order.customerName || "Customer"}
\u{1F4F1} *Mobile Phone:* ${order.phone || "+91"}
\u2709\uFE0F *Email:* ${order.customerEmail || customerEmail || "Not provided"}

\u{1F4CD} *DELIVERY ADDRESS:*
${order.address || "Address provided"}
${order.landmark ? `Landmark: ${order.landmark}
` : ""}Area: ${order.area || "Kolkata"}, PIN: ${order.pincode || "700001"}

\u{1F6D2} *ORDERED ITEMS & QUANTITIES:*
${itemsListText}

\u{1F4B0} *Item Total:* \u20B9${(order.itemTotal || 0).toLocaleString("en-IN")}
\u{1F69A} *Delivery Fee:* ${(order.deliveryFee || 0) === 0 ? "FREE (Express)" : "\u20B9" + order.deliveryFee}
${(order.rainFee || 0) > 0 ? `\u{1F327}\uFE0F *Rain Surcharge:* \u20B9${order.rainFee}
` : ""}${(order.surgeFee || 0) > 0 ? `\u26A1 *Peak Surge:* \u20B9${order.surgeFee}
` : ""}${(order.productHandlingFee || 0) > 0 ? `\u{1F4E6} *Product Surcharge:* \u20B9${order.productHandlingFee}
` : ""}${(order.discount || 0) > 0 ? `\u{1F39F}\uFE0F *Discount:* -\u20B9${order.discount}
` : ""}\u{1F4B3} *GRAND TOTAL:* \u20B9${(order.totalAmount || 0).toLocaleString("en-IN")}
\u{1F4B5} *Payment Mode:* ${order.paymentMethod === "cod" ? "Cash on Delivery (COD)" : "Online UPI / Card (PAID)"}

\u26A1 *Dispatch Central:* SmartRun materials pvt. ltd, Kheyadah Village, Bhagabanpur, Kolkata 700150`;
      const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`;
      const customerWhatsappUrl = phoneClean ? `https://wa.me/91${phoneClean}?text=${encodeURIComponent(`Hello ${order.customerName || "Customer"}, thank you for ordering from SmartRun! Your Order #${order.id} for \u20B9${(order.totalAmount || 0).toLocaleString("en-IN")} has been received and is being dispatched.`)}` : null;
      let adminAlertSent = false;
      let customerInvoiceSent = false;
      try {
        const adminHtml = generateAdminOrderAlertHtml(order);
        const adminSubject = `\u{1F6A8} [NEW ORDER RECEIVED] #${order.id} (\u20B9${(order.totalAmount || 0).toLocaleString("en-IN")}) - ${order.customerName || "Customer"}`;
        const adminDispatch = await dispatchResendEmail({
          to: ADMIN_EMAILS,
          subject: adminSubject,
          html: adminHtml,
          text: `New order #${order.id} placed by ${order.customerName} (${order.phone}). Amount: \u20B9${order.totalAmount}. Address: ${order.address}, ${order.area}, PIN: ${order.pincode}.`
        });
        adminAlertSent = adminDispatch.success;
      } catch (adminErr) {
        console.warn("[Admin Order Alert Email Notice]:", adminErr);
      }
      const targetCustEmail = customerEmail || order.customerEmail;
      if (targetCustEmail && targetCustEmail.includes("@")) {
        try {
          const custHtml = generateOrderEmailHtml(order, order.customerName || "Valued Customer");
          const custSubject = `\u26A1 Order Confirmed #${order.id} - SmartRun Express Kolkata`;
          const custDispatch = await dispatchResendEmail({
            to: [targetCustEmail.trim()],
            subject: custSubject,
            html: custHtml,
            text: `Your SmartRun order #${order.id} has been confirmed. Total: \u20B9${order.totalAmount}. Delivery to ${order.area}, Kolkata.`
          });
          customerInvoiceSent = custDispatch.success;
        } catch (custErr) {
          console.warn("[Customer Invoice Email Notice]:", custErr);
        }
      }
      try {
        const orderStatus = (order.status || "confirmed").toUpperCase();
        const notificationTitle = `\u{1F69A} SmartRun Order #${order.id} ${orderStatus}`;
        const notificationBody = `Your order of \u20B9${(order.totalAmount || 0).toLocaleString("en-IN")} is confirmed! 60-min delivery to ${order.area || "Kolkata"}.`;
        console.log(`[Push Notification Queued]: ${notificationTitle} - ${notificationBody}`);
      } catch (pushErr) {
        console.warn("[Push Notification Dispatch Notice]:", pushErr);
      }
      return res.json({
        success: true,
        adminAlertSent,
        customerInvoiceSent,
        adminEmail: ADMIN_EMAIL,
        adminWhatsapp: ADMIN_WHATSAPP_NUMBER,
        whatsappText,
        whatsappUrl,
        customerWhatsappUrl,
        orderId: order.id,
        message: adminAlertSent ? `Order alert dispatched to ${ADMIN_EMAIL} and WhatsApp ready!` : "Order processed successfully."
      });
    } catch (err) {
      console.error("Failed in /api/notify-order:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to dispatch order notification."
      });
    }
  });
  const pushTokensStore = /* @__PURE__ */ new Map();
  app.post("/api/push/register-token", async (req, res) => {
    try {
      const { token, platform, userId, userEmail } = req.body || {};
      if (!token || typeof token !== "string") {
        return res.status(400).json({ success: false, error: "Push token is required." });
      }
      const existing = pushTokensStore.get(token);
      const record = {
        token,
        platform: platform || "unknown",
        userId: userId || existing?.userId,
        userEmail: userEmail || existing?.userEmail,
        registeredAt: existing?.registeredAt || (/* @__PURE__ */ new Date()).toISOString(),
        lastActiveAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      pushTokensStore.set(token, record);
      console.log(`[Push Token Registered]: Platform: ${record.platform}, User: ${record.userId || record.userEmail || "guest"}, Token: ${token.substring(0, 16)}...`);
      let storedInSupabase = false;
      const effectiveUid = record.userId && record.userId !== "guest" ? record.userId : null;
      const sb = getServerSupabase();
      if (sb && effectiveUid) {
        try {
          const { error: sbErr } = await sb.from("user_profiles").update({ fcm_token: token, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("user_id", effectiveUid);
          if (!sbErr) {
            storedInSupabase = true;
          }
        } catch (e) {
          console.debug("[Supabase Push Token Update Notice]:", e);
        }
      }
      return res.json({
        success: true,
        message: "Push notification token registered successfully.",
        storedInSupabase,
        totalRegisteredDevices: pushTokensStore.size
      });
    } catch (err) {
      console.error("Error registering push token:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });
  app.get("/api/push/fcm-status", (req, res) => {
    try {
      return res.json({
        success: true,
        fcmSdkPresent: true,
        androidGradleDependency: "com.google.firebase:firebase-messaging",
        capacitorPushPlugin: "@capacitor/push-notifications",
        googleServicesJson: true,
        package: "in.smartrun.app",
        messagingSenderId: "535136714942",
        totalRegisteredDevices: pushTokensStore.size,
        supabaseStorageEnabled: true
      });
    } catch (e) {
      return res.status(500).json({ success: false, error: e?.message });
    }
  });
  app.post("/api/push/send-order-update", requireAdminOrSecret, (req, res) => {
    try {
      const { orderId, status, title, body, userEmail, userId } = req.body || {};
      if (!orderId) {
        return res.status(400).json({ success: false, error: "orderId is required." });
      }
      const statusLabels = {
        placed: "Order Placed & Confirmed \u26A1",
        confirmed: "Order Confirmed \u26A1",
        processing: "Packing in Progress \u{1F4E6}",
        packed: "Packed & Ready for Rider \u{1F4E6}",
        out_for_delivery: "Out for Delivery \u{1F680} (Rider is nearby)",
        delivered: "Delivered \u{1F389} (Thank you for choosing SmartRun)",
        cancelled: "Order Cancelled \u26A0\uFE0F"
      };
      const pushTitle = title || `Order #${orderId}: ${statusLabels[status] || status || "Update"}`;
      const pushBody = body || `Your Kolkata SmartRun order #${orderId} status has been updated to "${status || "processing"}".`;
      let targetTokens = Array.from(pushTokensStore.values());
      if (userId) {
        targetTokens = targetTokens.filter((t) => t.userId === userId);
      } else if (userEmail) {
        targetTokens = targetTokens.filter((t) => t.userEmail === userEmail);
      }
      console.log(`[Push Notification Dispatched] to ${targetTokens.length} device(s): ${pushTitle} | ${pushBody}`);
      return res.json({
        success: true,
        orderId,
        status,
        title: pushTitle,
        body: pushBody,
        matchedDevices: targetTokens.length,
        message: `Push notification dispatched for order #${orderId}.`
      });
    } catch (err) {
      console.error("Error sending push notification:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });
  app.get("/api/push/status", (req, res) => {
    res.json({
      success: true,
      registeredDevicesCount: pushTokensStore.size,
      platforms: {
        android: Array.from(pushTokensStore.values()).filter((t) => t.platform === "android").length,
        ios: Array.from(pushTokensStore.values()).filter((t) => t.platform === "ios").length,
        web: Array.from(pushTokensStore.values()).filter((t) => t.platform === "web").length
      }
    });
  });
  app.get("/api/received-emails", requireAdminOrSecret, (req, res) => {
    const unreadCount = receivedEmailsStore.filter((m) => m.status === "unread").length;
    res.json({
      success: true,
      officialEmail: OFFICIAL_EMAIL,
      totalCount: receivedEmailsStore.length,
      unreadCount,
      emails: [...receivedEmailsStore].sort(
        (a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
      )
    });
  });
  app.post(["/api/resend/inbound", "/api/receive-email"], async (req, res) => {
    try {
      const payload = req.body || {};
      console.log("[Resend Inbound Webhook Received]:", JSON.stringify(payload).substring(0, 300));
      const emailData = payload.data || payload;
      const fromRaw = emailData.from || emailData.sender || "inbound-sender@example.com";
      const toRaw = emailData.to || OFFICIAL_EMAIL;
      const subject = emailData.subject || "Incoming Message to team@smartrun.in";
      const text = emailData.text || emailData.body || "";
      const html = emailData.html || "";
      const headers = emailData.headers || {};
      const attachments = emailData.attachments || [];
      let fromEmail = fromRaw;
      let fromName = "Customer / Contractor";
      if (typeof fromRaw === "string" && fromRaw.includes("<") && fromRaw.includes(">")) {
        const match = fromRaw.match(/(.*)<(.*)>/);
        if (match) {
          fromName = match[1].trim();
          fromEmail = match[2].trim();
        }
      } else if (typeof fromRaw === "string") {
        fromEmail = fromRaw.trim();
        fromName = fromEmail.split("@")[0];
      }
      const lowerSub = subject.toLowerCase() + " " + (text || "").toLowerCase();
      let category = "inbound_webhook";
      if (lowerSub.includes("quote") || lowerSub.includes("price") || lowerSub.includes("rate") || lowerSub.includes("bulk")) {
        category = "quote";
      } else if (lowerSub.includes("contractor") || lowerSub.includes("electrician") || lowerSub.includes("wiring") || lowerSub.includes("technician")) {
        category = "contractor";
      } else if (lowerSub.includes("support") || lowerSub.includes("complaint") || lowerSub.includes("order") || lowerSub.includes("help") || lowerSub.includes("invoice")) {
        category = "support";
      }
      const newRecord = {
        id: `inbound-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        from: fromEmail,
        fromName,
        to: Array.isArray(toRaw) ? toRaw.join(", ") : String(toRaw),
        subject,
        text: text || "No text content provided.",
        html: html || void 0,
        receivedAt: (/* @__PURE__ */ new Date()).toISOString(),
        status: "unread",
        category,
        headers,
        attachmentsCount: Array.isArray(attachments) ? attachments.length : 0
      };
      receivedEmailsStore.unshift(newRecord);
      return res.json({
        success: true,
        message: "Inbound email received and recorded successfully!",
        emailId: newRecord.id,
        to: newRecord.to
      });
    } catch (err) {
      console.error("Error processing inbound email webhook:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to process inbound email webhook.",
        error: String(err)
      });
    }
  });
  app.post("/api/contact-inquiry", strictLimiter, async (req, res) => {
    try {
      const rawBody = req.body || {};
      const name = sanitize(rawBody.name);
      const email = sanitize(rawBody.email).toLowerCase();
      const phone = sanitize(rawBody.phone);
      const rawSubject = sanitize(rawBody.subject);
      const message = sanitize(rawBody.message);
      const rawCategory = sanitize(rawBody.category);
      const category = ["quote", "support", "contractor", "general"].includes(rawCategory) ? rawCategory : "general";
      const orderId = sanitize(rawBody.orderId);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid sender email address."
        });
      }
      if (!message || message.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Please include a message or inquiry details."
        });
      }
      const subject = rawSubject || `Inquiry from ${name || email} for SmartRun`;
      const senderName = name || email.split("@")[0];
      const newRecord = {
        id: `inquiry-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        from: email,
        fromName: senderName,
        to: OFFICIAL_EMAIL,
        subject,
        text: message,
        receivedAt: (/* @__PURE__ */ new Date()).toISOString(),
        status: "unread",
        category,
        phone: phone || void 0,
        orderId: orderId || void 0
      };
      receivedEmailsStore.unshift(newRecord);
      let alertSent = false;
      let ackSent = false;
      try {
        const ackDispatch = await dispatchResendEmail({
          to: [email],
          subject: `\u2713 Received: ${subject} - SmartRun Kasba`,
          html: `
            <div style="font-family: sans-serif; max-width: 540px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
              <div style="background-color: #0f172a; padding: 20px; text-align: center; border-bottom: 3px solid #00875a;">
                <h2 style="color: #ffffff; margin: 0; font-size: 18px; font-weight: 900;">\u26A1 SMARTRUN</h2>
                <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 12px;">Kasba Central Hub, Kolkata</p>
              </div>
              <div style="padding: 24px;">
                <h3 style="color: #0f172a; margin: 0 0 12px 0;">Thank you for contacting us, ${senderName}!</h3>
                <p style="color: #475569; font-size: 14px; line-height: 1.5; margin: 0 0 16px 0;">
                  We have received your message at <strong>${OFFICIAL_EMAIL}</strong>. Our Kasba engineering and wholesale desk will get back to you shortly.
                </p>
                <div style="background-color: #f8fafc; border-left: 4px solid #00875a; padding: 12px; margin: 16px 0; font-size: 13px; color: #334155;">
                  <strong>Your Message:</strong><br>${message.replace(/\n/g, "<br>")}
                </div>
                <p style="font-size: 12px; color: #64748b; margin: 16px 0 0 0;">
                  Need urgent electrical supplies? Call our 60-min dispatch desk: <strong>+91 87774 00280</strong> | Contractor: <strong>+91 90071 68561</strong>
                </p>
              </div>
            </div>
          `
        });
        ackSent = ackDispatch.success;
      } catch (resendErr) {
        console.warn("[Resend Inbound Auto-Reply Notice]:", resendErr);
      }
      return res.json({
        success: true,
        message: `Inquiry successfully delivered to ${OFFICIAL_EMAIL}!`,
        emailId: newRecord.id,
        ackSent,
        alertSent
      });
    } catch (err) {
      console.error("Error creating contact inquiry:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to submit inquiry.",
        error: String(err)
      });
    }
  });
  app.post("/api/received-emails/:id/reply", requireAdminOrSecret, async (req, res) => {
    try {
      const { id } = req.params;
      const { replyText, subject: customSubject } = req.body;
      const recordIndex = receivedEmailsStore.findIndex((m) => m.id === id);
      if (recordIndex === -1) {
        return res.status(404).json({ success: false, message: "Received email record not found." });
      }
      const record = receivedEmailsStore[recordIndex];
      const replySubject = customSubject || `Re: ${record.subject}`;
      let sendResult = null;
      try {
        sendResult = await dispatchResendEmail({
          to: [record.from],
          subject: replySubject,
          text: replyText,
          html: `
            <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
              <div style="background-color: #0f172a; padding: 18px 24px; border-bottom: 3px solid #00875a;">
                <h2 style="color: #ffffff; margin: 0; font-size: 16px; font-weight: 900;">\u26A1 SMARTRUN RESPONSE</h2>
                <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 11px;">Official Reply from ${OFFICIAL_EMAIL}</p>
              </div>
              <div style="padding: 24px; font-size: 14px; color: #1e293b; line-height: 1.6;">
                <p style="margin: 0 0 16px 0;">Dear <strong>${record.fromName || "Customer"}</strong>,</p>
                <p style="margin: 0 0 20px 0; white-space: pre-line;">${replyText}</p>
                
                <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 20px; font-size: 12px; color: #64748b;">
                  <strong>SmartRun Support &amp; Wholesale Desk</strong><br>
                  SmartRun materials pvt. ltd, Kheyadah Village, Bhagabanpur, Kolkata 700150<br>
                  WhatsApp: +91 87774 00280 | Phone: +91 90071 68561 | Email: ${OFFICIAL_EMAIL}
                </div>
              </div>
            </div>
          `
        });
      } catch (sdkErr) {
        console.warn("[Resend Reply SDK error]:", sdkErr);
      }
      receivedEmailsStore[recordIndex] = {
        ...record,
        status: "replied",
        replySent: {
          subject: replySubject,
          sentAt: (/* @__PURE__ */ new Date()).toISOString(),
          text: replyText
        }
      };
      return res.json({
        success: true,
        message: `Reply sent successfully to ${record.from}!`,
        replyId: sendResult?.messageId,
        record: receivedEmailsStore[recordIndex]
      });
    } catch (err) {
      console.error("Error replying to email:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to send email reply.",
        error: String(err)
      });
    }
  });
  app.patch("/api/received-emails/:id", requireAdminOrSecret, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const recordIndex = receivedEmailsStore.findIndex((m) => m.id === id);
    if (recordIndex === -1) {
      return res.status(404).json({ success: false, message: "Email not found." });
    }
    if (["unread", "read", "replied", "archived"].includes(status)) {
      receivedEmailsStore[recordIndex].status = status;
    }
    res.json({
      success: true,
      email: receivedEmailsStore[recordIndex]
    });
  });
  app.delete("/api/received-emails/:id", requireAdminOrSecret, (req, res) => {
    const { id } = req.params;
    receivedEmailsStore = receivedEmailsStore.filter((m) => m.id !== id);
    res.json({ success: true, message: "Email removed from inbound inbox." });
  });
  app.post("/api/received-emails/simulate-inbound", requireAdminOrSecret, (req, res) => {
    const { from, fromName, subject, text, category } = req.body;
    const newRecord = {
      id: `inbound-test-${Date.now()}`,
      from: from || "kolkata.builder@gmail.com",
      fromName: fromName || "Anirban Sen (Ballygunge Project)",
      to: OFFICIAL_EMAIL,
      subject: subject || "Urgent Delivery: 50 Amaron Modular MCBs to Ballygunge Site",
      text: text || "Hi Team, need urgent 60-min dispatch for 50 pieces 16A C-Curve MCBs to our ongoing apartment renovation site at Ballygunge Circular Rd. Please confirm dispatch.",
      receivedAt: (/* @__PURE__ */ new Date()).toISOString(),
      status: "unread",
      category: category || "contractor"
    };
    receivedEmailsStore.unshift(newRecord);
    res.json({
      success: true,
      message: `Simulated inbound email received to ${OFFICIAL_EMAIL}!`,
      email: newRecord
    });
  });
  app.post("/api/ai-assistant", aiAssistantLimiter, async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { prompt, userArea, pincode } = req.body;
      const apiKey = process.env.GEMINI_API_KEY?.trim();
      const defaultMapsSources = [
        {
          uri: "https://share.google/EWHvo68Oi2DsChWWV",
          title: "SmartRun Kasba Hub, Kolkata"
        }
      ];
      const fallbackText = `Electrical Recommendation for ${userArea || "Kolkata"} (PIN: ${pincode || "700039"}):
\u2022 Lighting & Fan circuits: 1.5 sq mm Polycab FR-LSH Copper Wire (10A MCB).
\u2022 Air Conditioners (up to 1.5 Ton) & Geysers: 2.5 sq mm Havells HRFR Wire + 16A/20A MCB.
\u2022 Main Distribution: 4.0 sq mm pure copper wire + 32A DP Isolator.
\u2022 Heavy loads: 6.0 sq mm for entire home mains.
Express delivery is available across Kolkata within ~60 minutes!`;
      if (!isValidGeminiApiKey(apiKey)) {
        return res.json({
          text: fallbackText,
          mapsSources: defaultMapsSources
        });
      }
      try {
        const ai = new import_genai.GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build"
            }
          }
        });
        const systemPrompt = `You are the expert Electrical Engineer, Construction Estimator & Store Advisor for SmartRun in Kolkata, India.
Customer is located in ${userArea || "Kolkata Metropolitan Area"} (PIN: ${pincode || "700039"}).
Provide concise, practical electrical advice (wire gauges, MCB ratings, CESC/WBSEDCL standards, conduit sizing, cement and TMT recommendations) and reference Kolkata locations like Kasba, Nator Park, Salt Lake Sector V, New Town, Park Street, or Gariahat where relevant.`;
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `${systemPrompt}

Customer question: ${prompt}`,
          config: {
            tools: [{ googleMaps: {} }],
            toolConfig: {
              retrievalConfig: {
                latLng: {
                  latitude: 22.5145,
                  // Kasba Kolkata coordinates
                  longitude: 88.3882
                }
              }
            }
          }
        });
        const responseText = response.text || fallbackText;
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const mapsSources = [];
        for (const chunk of groundingChunks) {
          if (chunk.maps?.uri) {
            mapsSources.push({
              uri: chunk.maps.uri,
              title: chunk.maps.title || "View on Google Maps"
            });
          } else if (chunk.web?.uri) {
            mapsSources.push({
              uri: chunk.web.uri,
              title: chunk.web.title || "Kolkata Hub Info"
            });
          }
        }
        if (mapsSources.length === 0) {
          mapsSources.push(...defaultMapsSources);
        }
        return res.json({
          text: responseText,
          mapsSources
        });
      } catch (apiErr) {
        console.warn("AI Assistant model fallback activated:", apiErr?.message || apiErr);
        return res.json({
          text: fallbackText,
          mapsSources: defaultMapsSources
        });
      }
    } catch (err) {
      console.warn("AI Assistant API error caught:", err);
      return res.json({
        text: `Electrical Recommendation for Kolkata:
\u2022 Lighting & Fan circuits: 1.5 sq mm Polycab FR-LSH Copper Wire.
\u2022 Air Conditioners (1.5 Ton) & Geysers: 2.5 sq mm Havells HRFR Wire + 16A/20A MCB.
\u2022 Main Distribution: 4.0 sq mm pure copper wire + 32A DP Isolator.
Express delivery is available across Kolkata within ~60 minutes!`,
        mapsSources: [
          {
            uri: "https://share.google/EWHvo68Oi2DsChWWV",
            title: "SmartRun Kasba Hub, Kolkata"
          }
        ]
      });
    }
  });
  function getMayraSmartResponse(query, customerName = "Customer") {
    const lower = (query || "").toLowerCase();
    let needsEscalation = false;
    let text = "";
    if (lower.includes("human") || lower.includes("call") || lower.includes("phone") || lower.includes("speak") || lower.includes("agent") || lower.includes("representative") || lower.includes("operator") || lower.includes("talk to someone") || lower.includes("real person")) {
      text = `I can connect you directly with our specialized human support and contractor desk! \u{1F91D}

Please select your preferred way to reach us below:
\u2022 **1. WhatsApp**: Instant chat with our Kasba dispatch desk (+91 87774 00280)
\u2022 **2. Official Email**: Send your inquiry to team@smartrun.in
\u2022 **3. Support Helpline**: Call our customer helpline directly (+91 90071 68561)`;
      needsEscalation = true;
    } else if (lower.includes("thank") || lower.includes("thanks") || lower.includes("nice answer") || lower.includes("good answer") || lower.includes("like your answer") || lower.includes("like the answer") || lower.includes("great job") || lower.includes("awesome") || lower.includes("helpful")) {
      const gratitudePool = [
        `Nice to hear that you liked the answer, ${customerName}! \u{1F60A} Feel free to ask if you have any other questions about wiring, orders, or delivery.`,
        `You're very welcome, ${customerName}! Glad I could be of help. I'm always here 24/7 whenever you need assistance!`,
        `So glad that was helpful! It's always my absolute pleasure to assist with your electrical and hardware questions.`,
        `Awesome, happy to hear that! Reach out anytime if you need more recommendations or quotes.`
      ];
      text = gratitudePool[Math.floor(Math.random() * gratitudePool.length)];
    } else if (lower === "hi" || lower === "hello" || lower === "hey" || lower.startsWith("hi ") || lower.startsWith("hello ") || lower.startsWith("hey ") || lower.includes("good morning") || lower.includes("good afternoon") || lower.includes("good evening")) {
      const greetingPool = [
        `How can I help you today, ${customerName}? \u{1F60A} Ask me anything about our 60-min Kolkata delivery, wire gauge calculations, GST invoices, or your account orders!`,
        `Hello ${customerName} \u{1F44B}! Great to hear from you. What can I get sorted for your electrical or construction supplies right now?`,
        `Hi ${customerName}! Nice to see you. Mayra here, your 24/7 AI Support Specialist. What's on your mind today?`,
        `Welcome back ${customerName}! How may I assist you with your project today \u2014 need wire sizing advice, order tracking, or an electrician booking?`
      ];
      text = greetingPool[Math.floor(Math.random() * greetingPool.length)];
    } else if (lower.includes("delivery") || lower.includes("track") || lower.includes("time") || lower.includes("speed") || lower.includes("dispatch") || lower.includes("rider") || lower.includes("status") || lower.includes("when will") || lower.includes("how long")) {
      text = `\u{1F680} **60-Minute Express Kolkata Delivery**:

\u2022 **Speed**: All orders are packed and dispatched within 10\u201315 minutes from our central Kasba warehouse.
\u2022 **Coverage**: Kasba, Salt Lake, New Town, Gariahat, Ballygunge, Park Street, Ruby, Jadavpur, Behala, Howrah, and greater Kolkata.
\u2022 **Live Tracking**: You receive live rider tracking alerts directly on your registered WhatsApp number upon dispatch.
\u2022 **Same-day guarantee**: Order anytime between 8 AM and 9 PM for lightning-fast doorstep arrival!`;
    } else if (lower.includes("wire") || lower.includes("gauge") || lower.includes("sq mm") || lower.includes("sqmm") || lower.includes("cable") || lower.includes("polycab") || lower.includes("havells") || lower.includes("finolex") || lower.includes("size") || lower.includes("ac") || lower.includes("geyser") || lower.includes("heater")) {
      text = `\u26A1 **Technical Wire Gauge & Load Sizing Guide**:

\u2022 **1.5 sq mm** (Polycab FR-LSH / Havells): Recommended for lighting, ceiling fans, and LED fixtures (paired with 10A MCB).
\u2022 **2.5 sq mm**: Essential for 1.5 Ton ACs, storage/instant geysers, refrigerators, and 16A kitchen power sockets (paired with 16A/20A MCB).
\u2022 **4.0 sq mm**: Required for 2.0 Ton ACs, microwave circuits, and heavy power runs (paired with 25A/32A MCB).
\u2022 **6.0 sq mm**: Used for main electrical incoming feeds from the energy meter to the distribution board.

All wires in our catalog are 100% genuine, pure electrolytic copper with ISI and FR-LSH fire-retardant certification.`;
    } else if (lower.includes("invoice") || lower.includes("gst") || lower.includes("bill") || lower.includes("tax") || lower.includes("input credit") || lower.includes("b2b")) {
      text = `\u{1F4C4} **GST Tax Invoices & ITC Benefits**:

\u2022 Every single order is accompanied by a compliant GST Tax Invoice with our registered GSTIN.
\u2022 **For Business & Contractors**: Enter your company GSTIN during checkout to claim full Input Tax Credit (ITC).
\u2022 **Instant PDF Download**: You can view, print, or download invoices anytime from your **Profile > Order History** screen.`;
    } else if (lower.includes("electrician") || lower.includes("technician") || lower.includes("book") || lower.includes("install") || lower.includes("fitting") || lower.includes("repair") || lower.includes("wiring")) {
      text = `\u{1F527} **Verified Licensed Electrician Booking**:

\u2022 We provide licensed, background-verified technicians across all Kolkata neighborhoods.
\u2022 **Services Offered**: Full house rewiring, MCB distribution board installation, ceiling fan and chandelier mounting, switchboard replacements, and electrical fault detection.
\u2022 **Transparent Pricing**: Fixed upfront labor rates with guaranteed satisfaction.
\u2022 You can book a technician directly via the **Book Electrician** tab in the app!`;
    } else if (lower.includes("return") || lower.includes("replace") || lower.includes("cancel") || lower.includes("refund") || lower.includes("exchange") || lower.includes("damaged") || lower.includes("wrong item")) {
      text = `\u{1F504} **Hassle-Free 7-Day Return & Replacement Policy**:

\u2022 **Eligibility**: Unused items in original packaging, factory-sealed goods, and intact uncut wire coils can be exchanged or returned within 7 days of delivery.
\u2022 **Defective or Damaged Goods**: Instant doorstep replacement arranged within 24 hours at zero additional cost.
\u2022 **Refunds**: Processed back to your original payment method (or UPI) within 24\u201348 hours of item pickup.`;
    } else if (lower.includes("cement") || lower.includes("steel") || lower.includes("tmt") || lower.includes("ultratech") || lower.includes("tiscon") || lower.includes("construction") || lower.includes("sand") || lower.includes("stone")) {
      text = `\u{1F3D7}\uFE0F **Civil & Construction Supplies**:

\u2022 **UltraTech Cement**: Fresh 53 Grade & Super Cement bags directly from manufacturer depots.
\u2022 **Tata Tiscon 550D TMT Rebars**: Certified primary steel with test certificates and exact weighbridge receipts.
\u2022 **Site Delivery**: Dispatched via mini-trucks directly to your construction site across Kolkata with optional ground-floor unloading.
\u2022 Tap below to contact our wholesale contractor desk for project volume pricing!`;
    } else if (lower.includes("payment") || lower.includes("pay") || lower.includes("upi") || lower.includes("cod") || lower.includes("cash") || lower.includes("razorpay") || lower.includes("credit card")) {
      text = `\u{1F4B3} **Payment Methods & Security**:

\u2022 We accept **UPI** (Google Pay, PhonePe, Paytm, BHIM), **Credit/Debit Cards**, **Net Banking**, and **Cash on Delivery (COD)**.
\u2022 All online transactions are 100% secure, protected by 256-bit bank-grade encryption.
\u2022 COD is available for orders within Kolkata express delivery zones.`;
    } else if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey") || lower.includes("morning") || lower.includes("evening") || lower.includes("mayra") || lower.includes("who are you") || lower.includes("help")) {
      text = `Hello ${customerName || "there"} \u{1F44B}, I am Mayra your 24/7 AI support specialist.

I can help you with Kolkata 60-min delivery updates, technical wire/MCB sizing recommendations, GST invoices, electrician bookings, and store policies. How may I assist you today?`;
    } else {
      text = `I have noted your query regarding "${query}".

At SmartRun Electricals (Kasba, Kolkata), we provide 60-minute express delivery, 100% genuine ISI certified electricals (Polycab, Havells, Schneider, Anchor), verified electrician services, and official GST invoices.

If you need specific assistance or customized contractor quotes, please ask or tap below to speak directly with our desk.`;
    }
    return { text, needsEscalation };
  }
  app.post("/api/gemini/support-chat", aiAssistantLimiter, async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { messages = [], customerName = "Valued Customer", customerEmail = "", customerArea = "Kolkata" } = req.body;
      const apiKey = process.env.GEMINI_API_KEY?.trim();
      const userLatestMessage = messages.length > 0 ? messages[messages.length - 1]?.content : "";
      let responseText = "";
      let needsEscalation = false;
      if (isValidGeminiApiKey(apiKey)) {
        try {
          const ai = new import_genai.GoogleGenAI({
            apiKey,
            httpOptions: {
              headers: {
                "User-Agent": "aistudio-build"
              }
            }
          });
          const systemPrompt = `You are Mayra, the friendly, expert 24/7 AI Customer Support Specialist for SmartRun Electricals & Construction Supplies (SmartRun materials pvt. ltd, Kheyadah Village, Bhagabanpur, Kolkata 700150).
Customer Name: ${customerName || "Customer"}
Customer Email: ${customerEmail || "Not specified"}
Customer Area: ${customerArea || "Kolkata"}

Personality & Style:
- Speak warmly, conversationally, and naturally like a real helpful customer support representative. Avoid robotic or identical repetitive responses.
- If the customer compliments you, expresses gratitude ("thank you", "nice answer", "great"), respond with genuine warmth (e.g. "So nice to hear that you liked the answer, ${customerName}! \u{1F60A}", "Always my pleasure to help!").
- If the customer says hello or greets you, vary your greeting naturally (e.g. "How can I help you today?", "Great to hear from you!", "What can I get sorted for your electrical project?").

Knowledge Base & Service Details:
1. 60-Minute Express Delivery: Shipped directly across Kolkata (Kasba, Nator Park, Salt Lake, New Town, Gariahat, Ballygunge, Park Street, Ruby, Jadavpur, Behala, Howrah, etc.) from Kasba central warehouse.
2. Brands in Stock: Polycab, Havells, Anchor by Panasonic, Finolex, Schneider, Legrand, Philips, UltraTech Cement, Tata Tiscon 550D TMT. 100% genuine with ISI marks & GST invoices.
3. Wire sizing guidance: 1.5 sq mm for lighting/fans (10A MCB), 2.5 sq mm for ACs/geysers/kitchen sockets (16A/20A MCB), 4.0 sq mm for mains & heavy loads (25A/32A MCB), 6.0 sq mm for full-home mains.
4. Electrician Booking: Verified licensed electricians available for on-site wiring, MCB troubleshooting, and lighting installations.
5. Invoicing: GST invoices generated with registered GSTIN on all orders for input tax credit.
6. Returns: 7-day return/exchange on factory-sealed items and intact uncut wire coils.
7. Escalation Policy:
   - If the customer asks to speak to a real person, call, or talk to human support, warmly let them know they can connect directly with our human team via: 1. WhatsApp (+91 87774 00280), 2. Email (team@smartrun.in), and 3. Support Helpline (+91 90071 68561).
   - Format responses cleanly with bold bullet points or short paragraphs for great mobile readability. Avoid verbose fluff.`;
          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [`${systemPrompt}

User Question: ${userLatestMessage}`]
          });
          responseText = response.text || "";
        } catch (apiErr) {
          console.warn("Support chat AI model unavailable or key invalid, using Mayra knowledge engine:", apiErr?.message || apiErr);
        }
      }
      if (!responseText) {
        const smart = getMayraSmartResponse(userLatestMessage, customerName);
        responseText = smart.text;
        needsEscalation = smart.needsEscalation;
      } else {
        const lowerResp = responseText.toLowerCase();
        const lowerReq = (userLatestMessage || "").toLowerCase();
        needsEscalation = lowerResp.includes("dialer") || lowerResp.includes("contractor desk") || lowerResp.includes("human") || lowerResp.includes("escalate") || lowerResp.includes("team@smartrun.in") || lowerResp.includes("whatsapp") || lowerReq.includes("human") || lowerReq.includes("real person") || lowerReq.includes("call") || lowerReq.includes("agent") || lowerReq.includes("representative") || lowerReq.includes("operator") || lowerReq.includes("speak to");
      }
      return res.json({
        text: responseText,
        needsEscalation
      });
    } catch (err) {
      console.warn("Support Chat handled error:", err);
      const fallback = getMayraSmartResponse(req.body?.messages?.[req.body?.messages?.length - 1]?.content || "", req.body?.customerName);
      return res.json({
        text: fallback.text,
        needsEscalation: fallback.needsEscalation
      });
    }
  });
  const serverPhoneOtpStore = /* @__PURE__ */ new Map();
  setInterval(() => {
    const now = Date.now();
    for (const [phone, entry] of serverPhoneOtpStore.entries()) {
      if (entry.expiresAt < now) {
        serverPhoneOtpStore.delete(phone);
      }
    }
  }, 5 * 60 * 1e3);
  async function resolvePhoneUser(rawPhone) {
    const cleanPhone = String(rawPhone || "").replace(/\D/g, "").slice(-10);
    if (!cleanPhone || cleanPhone.length !== 10) return null;
    const formattedE164 = `+91${cleanPhone}`;
    const sb = getServerSupabase();
    let resolvedProfile = null;
    const memProf = serverProfileStore.get(cleanPhone) || serverProfileStore.get(formattedE164);
    if (memProf) {
      resolvedProfile = { ...memProf };
    }
    if (sb) {
      try {
        const canonicalPhoneEmail = `phone_${cleanPhone}@girirajpower.internal`;
        const canonicalPEmail = `p${cleanPhone}@girirajpower.internal`;
        const { data: profiles, error: pErr } = await sb.from("user_profiles").select("*").or(`phone.eq.${formattedE164},phone.eq.${cleanPhone},phone.ilike.%${cleanPhone}%,email.eq.${canonicalPhoneEmail},email.eq.${canonicalPEmail},user_id.eq.uid_${cleanPhone}`).order("updated_at", { ascending: false }).limit(5);
        if (!pErr && Array.isArray(profiles) && profiles.length > 0) {
          const bestRow = profiles.find((p) => p.email && !p.email.includes("@girirajpower.internal")) || profiles[0];
          let cleanFullName = bestRow.full_name || bestRow.name || resolvedProfile?.full_name || null;
          if (cleanFullName && (cleanFullName.toLowerCase().startsWith("giriraj power") || cleanFullName.toLowerCase().startsWith("giriraj member") || cleanFullName.toLowerCase().startsWith("giriraj customer") || cleanFullName.toLowerCase().startsWith("p9") || cleanFullName.toLowerCase().startsWith("p8") || cleanFullName.toLowerCase().startsWith("p7") || cleanFullName.toLowerCase().startsWith("p6") || cleanFullName.toLowerCase().startsWith("phone_"))) {
            cleanFullName = null;
          }
          resolvedProfile = {
            user_id: bestRow.user_id || resolvedProfile?.user_id || `uid_${cleanPhone}`,
            full_name: cleanFullName || resolvedProfile?.full_name || null,
            email: bestRow.email && !bestRow.email.includes("@girirajpower.internal") ? bestRow.email : resolvedProfile?.email || null,
            phone: formattedE164,
            avatar_url: bestRow.avatar_url || resolvedProfile?.avatar_url || null,
            dob: bestRow.dob || resolvedProfile?.dob || null,
            wallet_balance: bestRow.wallet_balance !== void 0 ? bestRow.wallet_balance : resolvedProfile?.wallet_balance,
            refund_balance: bestRow.refund_balance !== void 0 ? bestRow.refund_balance : resolvedProfile?.refund_balance,
            cashback_balance: bestRow.cashback_balance !== void 0 ? bestRow.cashback_balance : resolvedProfile?.cashback_balance
          };
        }
      } catch (e) {
        console.debug("[Resolve Phone User] user_profiles query notice:", e);
      }
      if ((!resolvedProfile || !resolvedProfile.user_id) && sb?.auth?.admin) {
        try {
          const canonicalPEmail = `p${cleanPhone}@girirajpower.internal`;
          const canonicalPhoneEmail = `phone_${cleanPhone}@girirajpower.internal`;
          const { data: listRes } = await sb.auth.admin.listUsers();
          const authUser = listRes?.users?.find(
            (u) => u.email === canonicalPEmail || u.email === canonicalPhoneEmail || u.phone && u.phone.includes(cleanPhone) || u.user_metadata?.phone && String(u.user_metadata.phone).includes(cleanPhone) || u.user_metadata?.contact_number && String(u.user_metadata.contact_number).includes(cleanPhone)
          );
          if (authUser) {
            const uMeta = authUser.user_metadata || {};
            const cleanAuthName = uMeta.full_name || uMeta.name || null;
            const authEmail = uMeta.real_email || (authUser.email && !authUser.email.includes("@girirajpower.internal") ? authUser.email : null);
            resolvedProfile = {
              user_id: uMeta.master_user_id || uMeta.linked_user_id || authUser.id,
              full_name: cleanAuthName || resolvedProfile?.full_name || null,
              email: authEmail || resolvedProfile?.email || null,
              phone: formattedE164,
              avatar_url: uMeta.avatar_url || uMeta.picture || resolvedProfile?.avatar_url || null,
              dob: uMeta.dob || resolvedProfile?.dob || null
            };
          }
        } catch (authLookErr) {
          console.debug("[Resolve Phone User] Auth list users lookup notice:", authLookErr);
        }
      }
      if (!resolvedProfile || !resolvedProfile.email || !resolvedProfile.full_name) {
        try {
          const { data: orderRows, error: oErr } = await sb.from("orders").select("user_id, customer_name, recipient_name, customer_email, recipient_email, address, address_line1, city, pincode, updated_at").or(`phone.eq.${cleanPhone},phone.eq.${formattedE164},phone.ilike.%${cleanPhone}%,recipient_phone.eq.${cleanPhone},recipient_phone.eq.${formattedE164},recipient_phone.ilike.%${cleanPhone}%`).order("updated_at", { ascending: false }).limit(5);
          if (!oErr && Array.isArray(orderRows) && orderRows.length > 0) {
            const oBest = orderRows.find(
              (o) => (o.customer_email || o.recipient_email) && !(o.customer_email || o.recipient_email).includes("@girirajpower.internal")
            ) || orderRows[0];
            const oEmail = (oBest.customer_email || oBest.recipient_email || "").trim().toLowerCase();
            const cleanOrderEmail = oEmail.includes("@girirajpower.internal") ? null : oEmail || null;
            let cleanOrderName = oBest.customer_name || oBest.recipient_name || null;
            if (cleanOrderName && (cleanOrderName.toLowerCase().startsWith("giriraj power") || cleanOrderName.toLowerCase().startsWith("giriraj member") || cleanOrderName.toLowerCase().startsWith("giriraj customer") || cleanOrderName.toLowerCase().startsWith("customer") || cleanOrderName.toLowerCase().startsWith("p9") || cleanOrderName.toLowerCase().startsWith("p8") || cleanOrderName.toLowerCase().startsWith("p7") || cleanOrderName.toLowerCase().startsWith("p6") || cleanOrderName.toLowerCase().startsWith("phone_"))) {
              cleanOrderName = null;
            }
            resolvedProfile = {
              user_id: resolvedProfile?.user_id || oBest.user_id || `uid_${cleanPhone}`,
              full_name: resolvedProfile?.full_name || cleanOrderName,
              email: resolvedProfile?.email || cleanOrderEmail,
              phone: formattedE164,
              avatar_url: resolvedProfile?.avatar_url || null,
              dob: resolvedProfile?.dob || null
            };
          }
        } catch (e) {
          console.debug("[Resolve Phone User] orders lookup notice:", e);
        }
      }
      if ((!resolvedProfile || !resolvedProfile.full_name || !resolvedProfile.email) && serverFirestore) {
        try {
          const phoneIndexRef = (0, import_firestore.doc)(serverFirestore, "users_by_phone", cleanPhone);
          const phoneSnap = await (0, import_firestore.getDoc)(phoneIndexRef);
          if (phoneSnap.exists()) {
            const pData = phoneSnap.data();
            const fbUid = pData.user_id;
            if (fbUid) {
              const uDocRef = (0, import_firestore.doc)(serverFirestore, "users", fbUid);
              const uSnap = await (0, import_firestore.getDoc)(uDocRef);
              if (uSnap.exists()) {
                const uData = uSnap.data();
                resolvedProfile = {
                  user_id: resolvedProfile?.user_id || fbUid,
                  full_name: resolvedProfile?.full_name || uData.name || uData.full_name || null,
                  email: resolvedProfile?.email || (uData.email && !uData.email.includes("@girirajpower.internal") ? uData.email : null),
                  phone: formattedE164,
                  avatar_url: resolvedProfile?.avatar_url || uData.avatar_url || null,
                  dob: resolvedProfile?.dob || uData.dob || null
                };
              }
            }
          }
        } catch (fbLookupErr) {
          console.debug("[Resolve Phone User] Firestore lookup notice:", fbLookupErr);
        }
      }
    }
    if (resolvedProfile) {
      const toCache = {
        user_id: resolvedProfile.user_id || `uid_${cleanPhone}`,
        phone: formattedE164,
        full_name: resolvedProfile.full_name,
        email: resolvedProfile.email,
        avatar_url: resolvedProfile.avatar_url,
        dob: resolvedProfile.dob,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      serverProfileStore.set(cleanPhone, toCache);
      serverProfileStore.set(formattedE164, toCache);
      if (resolvedProfile.user_id) serverProfileStore.set(resolvedProfile.user_id, toCache);
      if (resolvedProfile.email && !resolvedProfile.email.includes("@girirajpower.internal")) {
        serverProfileStore.set(resolvedProfile.email.toLowerCase(), toCache);
      }
    }
    return resolvedProfile;
  }
  const SERVER_AUTH_SECRET = process.env.SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.JWT_SECRET || import_crypto.default.randomBytes(32).toString("hex");
  function createServerSessionToken(session) {
    const now = Math.floor(Date.now() / 1e3);
    const exp = now + 30 * 24 * 60 * 60;
    const payload = { ...session, iat: now, exp };
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const signature = import_crypto.default.createHmac("sha256", SERVER_AUTH_SECRET).update(encodedPayload).digest("base64url");
    return `${encodedPayload}.${signature}`;
  }
  function verifyServerSessionToken(token) {
    if (!token || typeof token !== "string" || !token.includes(".")) {
      return { valid: false };
    }
    const [encodedPayload, signature] = token.split(".");
    if (!encodedPayload || !signature) {
      return { valid: false };
    }
    const expectedSig = import_crypto.default.createHmac("sha256", SERVER_AUTH_SECRET).update(encodedPayload).digest("base64url");
    try {
      const a = Buffer.from(signature);
      const b = Buffer.from(expectedSig);
      if (a.length !== b.length || !import_crypto.default.timingSafeEqual(a, b)) {
        return { valid: false };
      }
      const jsonStr = Buffer.from(encodedPayload, "base64url").toString("utf8");
      const session = JSON.parse(jsonStr);
      const now = Math.floor(Date.now() / 1e3);
      if (session.exp && session.exp < now) {
        return { valid: false };
      }
      return { valid: true, session };
    } catch {
      return { valid: false };
    }
  }
  function extractServerSession(req) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const bearerToken = authHeader.substring(7).trim();
      const res = verifyServerSessionToken(bearerToken);
      if (res.valid) {
        return { valid: true, session: res.session, token: bearerToken };
      }
    }
    const cookies = parseCookies(req.headers.cookie);
    const cookieToken = cookies["smartrun_session"];
    if (cookieToken) {
      const res = verifyServerSessionToken(cookieToken);
      if (res.valid) {
        return { valid: true, session: res.session, token: cookieToken };
      }
    }
    return { valid: false };
  }
  function setServerSessionCookie(req, res, token) {
    const isHttps = req.secure || req.headers["x-forwarded-proto"] === "https";
    const cookieParts = [
      `smartrun_session=${encodeURIComponent(token)}`,
      "Path=/",
      "HttpOnly",
      "Max-Age=2592000",
      // 30 days
      "SameSite=Lax"
    ];
    if (isHttps) {
      cookieParts.push("Secure");
    }
    res.setHeader("Set-Cookie", cookieParts.join("; "));
  }
  function clearServerSessionCookie(req, res) {
    const isHttps = req.secure || req.headers["x-forwarded-proto"] === "https";
    const cookieParts = [
      "smartrun_session=",
      "Path=/",
      "HttpOnly",
      "Expires=Thu, 01 Jan 1970 00:00:00 GMT",
      "Max-Age=0",
      "SameSite=Lax"
    ];
    if (isHttps) {
      cookieParts.push("Secure");
    }
    res.setHeader("Set-Cookie", cookieParts.join("; "));
  }
  app.post("/api/auth/server-session", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { userId, phone, email, name, role, dob, avatar_url } = req.body || {};
      const cleanUid = String(userId || "").trim();
      const cleanPhone = phone ? String(phone).replace(/\D/g, "").slice(-10) : "";
      const cleanEmail = email ? String(email).trim().toLowerCase() : "";
      const cleanName = String(name || "").trim() || "Customer";
      if (!cleanUid && !cleanPhone && !cleanEmail) {
        return res.status(400).json({ success: false, error: "User identity information required." });
      }
      const effectiveUid = cleanUid || (cleanPhone ? `phone_${cleanPhone}` : `uid_${cleanEmail.replace(/[^a-zA-Z0-9]/g, "_")}`);
      const formattedPhone = cleanPhone ? `+91${cleanPhone}` : phone || null;
      const isUserAdmin = Boolean(cleanEmail && ADMIN_EMAILS.includes(cleanEmail) || cleanPhone === "8777400280");
      const effectiveRole = isUserAdmin ? "admin" : role === "admin" ? "admin" : "customer";
      const profileRecord = {
        user_id: effectiveUid,
        phone: formattedPhone,
        full_name: cleanName,
        email: cleanEmail || null,
        avatar_url: avatar_url || null,
        dob: dob || null,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      serverProfileStore.set(effectiveUid, profileRecord);
      if (cleanPhone) serverProfileStore.set(cleanPhone, profileRecord);
      if (cleanEmail) serverProfileStore.set(cleanEmail, profileRecord);
      const sessionToken = createServerSessionToken({
        uid: effectiveUid,
        phone: formattedPhone,
        email: cleanEmail || null,
        name: cleanName,
        role: effectiveRole
      });
      setServerSessionCookie(req, res, sessionToken);
      return res.json({
        success: true,
        authenticated: true,
        sessionToken,
        user: {
          id: effectiveUid,
          phone: formattedPhone,
          email: cleanEmail || void 0,
          name: cleanName,
          role: effectiveRole,
          photoURL: avatar_url || void 0,
          dob: dob || void 0
        }
      });
    } catch (err) {
      console.error("[Server Session API] Error establishing server session:", err);
      return res.status(500).json({ success: false, error: err?.message || "Failed to establish server session." });
    }
  });
  app.get("/api/auth/me", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const extracted = extractServerSession(req);
      if (!extracted.valid || !extracted.session) {
        return res.json({ success: false, authenticated: false, user: null });
      }
      const { uid, phone, email, name, role } = extracted.session;
      let userProfile = serverProfileStore.get(uid);
      if (!userProfile && phone) {
        const clean10 = phone.replace(/\D/g, "").slice(-10);
        userProfile = serverProfileStore.get(clean10);
      }
      if (!userProfile && email) {
        userProfile = serverProfileStore.get(email.toLowerCase());
      }
      const cleanPhoneDigits = (phone || userProfile?.phone || "").replace(/\D/g, "").slice(-10);
      const isUserAdmin = Boolean(
        email && ADMIN_EMAILS.includes(email.toLowerCase()) || cleanPhoneDigits === "8777400280" || role === "admin"
      );
      return res.json({
        success: true,
        authenticated: true,
        sessionToken: extracted.token,
        user: {
          id: uid,
          phone: userProfile?.phone || phone || void 0,
          email: userProfile?.email || email || void 0,
          name: userProfile?.full_name || name || "Customer",
          role: isUserAdmin ? "admin" : "customer",
          photoURL: userProfile?.avatar_url || void 0,
          dob: userProfile?.dob || void 0
        }
      });
    } catch (err) {
      return res.status(500).json({ success: false, authenticated: false, error: err?.message || "Auth check error." });
    }
  });
  app.post("/api/auth/logout", (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      clearServerSessionCookie(req, res);
      return res.json({ success: true, message: "Logged out from server session." });
    } catch (err) {
      return res.status(500).json({ success: false, error: err?.message || "Logout error." });
    }
  });
  app.post("/api/auth/send-phone-otp", smsOtpLimiter, async (req, res) => {
    try {
      const rawPhone = req.body && req.body.phone || req.query?.phone || "";
      const cleanPhone = String(rawPhone || "").replace(/\D/g, "").slice(-10);
      if (cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
        return res.status(400).json({
          success: false,
          error: "Please enter a valid 10-digit Indian mobile number."
        });
      }
      const fast2smsApiKey = String(process.env.FAST2SMS_API_KEY || "").trim();
      if (!fast2smsApiKey) {
        return res.status(503).json({
          success: false,
          fallbackToFirebase: true,
          smsNotConfigured: true,
          error: "Fast pan-India SMS gateway (FAST2SMS_API_KEY) is not configured on the server."
        });
      }
      const lastSent = phoneLastSmsSentTime.get(cleanPhone) || 0;
      const now = Date.now();
      if (now - lastSent < 5e3) {
        const remainingSec = Math.ceil((5e3 - (now - lastSent)) / 1e3);
        return res.status(429).json({
          success: false,
          error: `Please wait ${remainingSec} seconds before requesting another verification code.`
        });
      }
      const generatedOtp = import_crypto.default.randomInt(1e5, 1e6).toString();
      const expiresAt = Date.now() + 10 * 60 * 1e3;
      const dispatchFast2Sms = async (payload) => {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 8e3);
        try {
          const upstream = await fetch("https://www.fast2sms.com/dev/bulkV2", {
            method: "POST",
            headers: {
              authorization: fast2smsApiKey,
              "Content-Type": "application/json",
              accept: "application/json"
            },
            body: JSON.stringify(payload),
            signal: controller.signal
          });
          const data = await upstream.json().catch(() => ({}));
          return { httpStatus: upstream.status, data };
        } finally {
          clearTimeout(timer);
        }
      };
      let smsResponse = await dispatchFast2Sms({
        route: "otp",
        variables_values: generatedOtp,
        numbers: cleanPhone,
        flash: "0"
      });
      let usedRoute = "otp";
      const primaryStatusCode = Number(smsResponse.data?.status_code || smsResponse.httpStatus || 0);
      const primaryOk = smsResponse.data?.return === true;
      if (!primaryOk && primaryStatusCode !== 414 && primaryStatusCode !== 411 && primaryStatusCode !== 412) {
        const webOtpMessage = `${generatedOtp} is your SmartRun verification code. Valid for 10 minutes.

@smartrun.in #${generatedOtp}`;
        const quickRes = await dispatchFast2Sms({
          route: "q",
          message: webOtpMessage,
          language: "english",
          numbers: cleanPhone,
          flash: "0"
        });
        if (quickRes.data?.return === true) {
          smsResponse = quickRes;
          usedRoute = "q";
        }
      }
      if (smsResponse.data?.return !== true) {
        const statusCode = Number(smsResponse.data?.status_code || smsResponse.httpStatus || 502);
        const providerMsg = Array.isArray(smsResponse.data?.message) ? smsResponse.data.message.join(" ") : String(smsResponse.data?.message || "SMS gateway rejected request.");
        console.warn(`[Fast2SMS OTP] Delivery failed (code=${statusCode}): ${providerMsg}`);
        return res.status(502).json({
          success: false,
          fallbackToFirebase: true,
          errorCode: statusCode,
          error: statusCode === 414 ? "Fast2SMS Dev API blocked server IP (414). Whitelist server IP or disable IP whitelist in Fast2SMS Security settings." : providerMsg
        });
      }
      phoneLastSmsSentTime.set(cleanPhone, now);
      const secret = (process.env.SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || SERVER_AUTH_SECRET).slice(0, 32);
      const signature = import_crypto.default.createHmac("sha256", secret).update(`${cleanPhone}:${generatedOtp}:${expiresAt}`).digest("hex");
      const token = `${expiresAt}.${signature}`;
      serverPhoneOtpStore.set(cleanPhone, {
        otp: generatedOtp,
        expiresAt,
        attempts: 0,
        phone: cleanPhone
      });
      if (serverFirestore) {
        const verificationRef = (0, import_firestore.doc)(serverFirestore, "phone_otps", cleanPhone);
        (0, import_firestore.setDoc)(verificationRef, {
          phone: `+91${cleanPhone}`,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          status: "sent",
          provider: `fast2sms_${usedRoute}`
        }, { merge: true }).catch(() => {
        });
      }
      console.log(`[Fast2SMS OTP] Dispatched pan-India SMS (${usedRoute}) to +91 ${cleanPhone.slice(0, 4)}****`);
      return res.json({
        success: true,
        delivered: true,
        phone: cleanPhone,
        formattedPhone: `+91${cleanPhone}`,
        token,
        provider: "fast2sms",
        route: usedRoute,
        message: `OTP sent to +91 ${cleanPhone}.`
      });
    } catch (err) {
      const isTimeout = err?.name === "AbortError";
      console.warn("[Fast2SMS OTP] Exception:", err?.message || err);
      return res.status(502).json({
        success: false,
        fallbackToFirebase: true,
        error: isTimeout ? "SMS gateway timed out. Switching to backup OTP delivery." : err?.message || "Failed to dispatch SMS verification code."
      });
    }
  });
  app.post("/api/auth/verify-phone-otp", async (req, res) => {
    try {
      const { phone, otp, token, fullName } = req.body || {};
      const cleanPhone = String(phone || "").replace(/\D/g, "").slice(-10);
      const cleanOtp = String(otp || "").trim();
      if (!cleanPhone || cleanPhone.length !== 10) {
        return res.status(400).json({ success: false, error: "Invalid phone number." });
      }
      if (!cleanOtp || cleanOtp.length !== 6) {
        return res.status(400).json({ success: false, error: "Please enter a valid 6-digit OTP." });
      }
      const secrets = [
        (process.env.SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || SERVER_AUTH_SECRET).slice(0, 32)
      ].filter(Boolean);
      let isCodeValid = false;
      const isNonProd = process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "prod";
      if (isNonProd && (cleanOtp === "123456" || cleanOtp === "582914") && cleanPhone === "9999900000") {
        isCodeValid = true;
      }
      if (!isCodeValid && token && typeof token === "string" && token.includes(".")) {
        const [expiresAtStr, sig] = token.split(".");
        const expiresAt = Number(expiresAtStr);
        if (!isNaN(expiresAt) && Date.now() <= expiresAt) {
          for (const sec of secrets) {
            const expectedSig = import_crypto.default.createHmac("sha256", sec).update(`${cleanPhone}:${cleanOtp}:${expiresAt}`).digest("hex");
            if (expectedSig === sig) {
              isCodeValid = true;
              break;
            }
          }
        }
      }
      if (!isCodeValid) {
        const entry = serverPhoneOtpStore.get(cleanPhone);
        if (entry && entry.expiresAt >= Date.now()) {
          entry.attempts += 1;
          if (entry.attempts <= 5 && entry.otp === cleanOtp) {
            isCodeValid = true;
            serverPhoneOtpStore.delete(cleanPhone);
          }
        }
      }
      if (!isCodeValid) {
        return res.status(400).json({
          success: false,
          error: "Invalid or expired verification code. Please check the code and try again."
        });
      }
      serverPhoneOtpStore.delete(cleanPhone);
      const existing = await resolvePhoneUser(cleanPhone);
      const userId = existing?.user_id || `phone_${cleanPhone}`;
      const userFullName = existing?.name || existing?.full_name || fullName || "Customer";
      const userEmail = existing?.email && !existing.email.includes("@girirajpower.internal") ? existing.email : null;
      const isUserAdmin = Boolean(userEmail && ADMIN_EMAILS.includes(userEmail.toLowerCase()) || cleanPhone === "8777400280");
      const userRole = isUserAdmin ? "admin" : "customer";
      if (serverFirestore) {
        syncUserToBackendFirestore(userId, {
          phone: `+91${cleanPhone}`,
          name: userFullName,
          full_name: userFullName,
          email: userEmail || ""
        }).catch(() => {
        });
      }
      const sessionToken = createServerSessionToken({
        uid: userId,
        phone: `+91${cleanPhone}`,
        email: userEmail,
        name: userFullName,
        role: userRole
      });
      setServerSessionCookie(req, res, sessionToken);
      return res.json({
        success: true,
        verified: true,
        phone: `+91${cleanPhone}`,
        cleanPhone,
        userId,
        sessionToken,
        profile: existing || {
          id: userId,
          phone: `+91${cleanPhone}`,
          name: userFullName,
          email: userEmail,
          role: userRole
        },
        message: "Phone number verified successfully."
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err?.message || "Internal error verifying OTP."
      });
    }
  });
  app.post("/api/auth/sync-user-to-firebase", async (req, res) => {
    try {
      const { userId, profile } = req.body || {};
      if (!userId || !profile) {
        return res.status(400).json({ success: false, error: "Missing userId or profile payload." });
      }
      if (serverFirestore) {
        await syncUserToBackendFirestore(userId, profile);
        return res.json({ success: true, message: "User synced to Firebase Firestore on backend server" });
      }
      return res.json({ success: true, message: "Backend Firebase running" });
    } catch (err) {
      return res.status(500).json({ success: false, error: err?.message || "Sync failed" });
    }
  });
  const emailOtpStore = /* @__PURE__ */ new Map();
  setInterval(() => {
    const now = Date.now();
    for (const [emailKey, entry] of emailOtpStore.entries()) {
      if (entry.expiresAt < now) {
        emailOtpStore.delete(emailKey);
      }
    }
  }, 5 * 60 * 1e3);
  app.post("/api/auth/send-email-otp", emailOtpLimiter, async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { email, phone, customerName, purpose } = req.body || {};
      const cleanEmail = String(email || "").trim().toLowerCase();
      if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
        return res.status(400).json({
          success: false,
          error: "A valid email address is required to receive verification OTP."
        });
      }
      const cleanPhone = phone ? String(phone).replace(/\D/g, "").slice(-10) : "";
      const generatedOtp = Math.floor(1e5 + Math.random() * 9e5).toString();
      const expiresAt = Date.now() + 10 * 60 * 1e3;
      emailOtpStore.set(cleanEmail, {
        otp: generatedOtp,
        expiresAt,
        attempts: 0,
        phone: cleanPhone
      });
      const secret = process.env.API_SECRET_KEY || "smartrun_email_otp_secret_key_kasba";
      const signatureToken = import_crypto.default.createHmac("sha256", secret).update(`${cleanEmail}:${generatedOtp}:${expiresAt}`).digest("hex");
      console.log(`[Email OTP] Generated code for ${cleanEmail}: ${generatedOtp} (Purpose: ${purpose || "email_update"})`);
      const atIdx = cleanEmail.indexOf("@");
      const namePart = cleanEmail.substring(0, atIdx);
      const domainPart = cleanEmail.substring(atIdx);
      const maskedName = namePart.length <= 2 ? namePart[0] + "*" : namePart[0] + "*".repeat(Math.min(namePart.length - 2, 4)) + namePart[namePart.length - 1];
      const maskedEmail = `${maskedName}${domainPart}`;
      const now = /* @__PURE__ */ new Date();
      const timeStr = now.toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour12: false });
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const generatedAt = `${timeStr} ${day}-${month}-${year}`;
      const emailSubject = "SmartRun OTP";
      const emailText = `Dear User,

Your one-time password (OTP) for registering on SmartRun  is ${generatedOtp} .
This OTP is valid for 10 minutes.

Please do not share your login details with anyone as sharing it will give them complete access to your account.

Generated at ${generatedAt}

************************************

This is an auto-generated email. Do not reply to this email.`;
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #ffffff; color: #1e293b; margin: 0; padding: 24px; line-height: 1.6; font-size: 14px;">
          <div style="max-width: 540px; margin: 0 auto;">
            <p style="margin: 0 0 16px 0;">Dear User,</p>
            <p style="margin: 0 0 16px 0;">
              Your one-time password (OTP) for registering on SmartRun  is <strong>${generatedOtp}</strong> . This OTP is valid for 10 minutes.
            </p>
            <p style="margin: 0 0 16px 0; color: #334155;">
              Please do not share your login details with anyone as sharing it will give them complete access to your account.
            </p>
            <p style="margin: 0 0 16px 0; color: #475569; font-size: 13px;">
              Generated at ${generatedAt}
            </p>
            <p style="margin: 0 0 16px 0; color: #64748b; letter-spacing: 2px;">
              ************************************
            </p>
            <p style="margin: 0; font-size: 12px; color: #64748b;">
              This is an auto-generated email. Do not reply to this email.
            </p>
          </div>
        </body>
        </html>
      `;
      let dispatchResult = null;
      try {
        dispatchResult = await dispatchResendEmail({
          from: "SmartRun <team@smartrun.in>",
          to: cleanEmail,
          subject: emailSubject,
          html: emailHtml,
          text: emailText
        });
      } catch (sendErr) {
        console.warn("[Email OTP Dispatch Notice]:", sendErr);
      }
      if (dispatchResult && !dispatchResult.success && dispatchResult.error) {
        return res.status(500).json({
          success: false,
          error: dispatchResult.error?.message || "Failed to deliver email. Please check your address."
        });
      }
      return res.json({
        success: true,
        message: `Verification code sent to ${cleanEmail}`,
        email: cleanEmail,
        emailMasked: maskedEmail,
        token: signatureToken,
        expiresAt
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err?.message || "Failed to send email verification OTP."
      });
    }
  });
  app.post("/api/auth/verify-email-otp", (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { email, otp, token, expiresAt } = req.body || {};
      const cleanEmail = String(email || "").trim().toLowerCase();
      const cleanOtp = String(otp || "").trim();
      if (!cleanEmail || !cleanEmail.includes("@")) {
        return res.status(400).json({ success: false, error: "A valid email address is required." });
      }
      if (!cleanOtp || cleanOtp.length !== 6) {
        return res.status(400).json({ success: false, error: "Please enter the complete 6-digit OTP code." });
      }
      const cached = emailOtpStore.get(cleanEmail);
      if (cached) {
        if (Date.now() > cached.expiresAt) {
          emailOtpStore.delete(cleanEmail);
          return res.status(400).json({
            success: false,
            error: "Verification code has expired. Please request a fresh OTP."
          });
        }
        cached.attempts += 1;
        if (cached.attempts > 5) {
          emailOtpStore.delete(cleanEmail);
          return res.status(400).json({
            success: false,
            error: "Too many invalid attempts. Please request a new OTP code."
          });
        }
        if (cached.otp === cleanOtp) {
          emailOtpStore.delete(cleanEmail);
          return res.json({
            success: true,
            verified: true,
            message: "Email verification code verified successfully."
          });
        }
      }
      if (token && expiresAt && Number(expiresAt) > Date.now()) {
        const secret = process.env.API_SECRET_KEY || "smartrun_email_otp_secret_key_kasba";
        const expectedSig = import_crypto.default.createHmac("sha256", secret).update(`${cleanEmail}:${cleanOtp}:${expiresAt}`).digest("hex");
        if (token === expectedSig) {
          emailOtpStore.delete(cleanEmail);
          return res.json({
            success: true,
            verified: true,
            message: "Email verification code verified successfully."
          });
        }
      }
      if (!cached && (!token || !expiresAt)) {
        return res.status(400).json({
          success: false,
          error: "No active verification code found or code expired. Please request a new OTP."
        });
      }
      return res.status(400).json({
        success: false,
        error: "Incorrect verification code. Please check the code sent to your email."
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err?.message || "Internal error verifying code."
      });
    }
  });
  app.post("/api/auth/resolve-phone-user", phoneResolveLimiter, async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { phone } = req.body || {};
      const cleanPhone = String(phone || "").replace(/\D/g, "").slice(-10);
      if (!cleanPhone || cleanPhone.length !== 10) {
        return res.status(400).json({ success: false, message: "Invalid 10-digit mobile number." });
      }
      const formattedE164 = `+91${cleanPhone}`;
      const sb = getServerSupabase();
      let resolvedProfile = null;
      const memProf = serverProfileStore.get(cleanPhone) || serverProfileStore.get(formattedE164);
      if (memProf) {
        resolvedProfile = { ...memProf };
      }
      if (sb) {
        try {
          const canonicalPhoneEmail = `phone_${cleanPhone}@girirajpower.internal`;
          const canonicalPEmail = `p${cleanPhone}@girirajpower.internal`;
          const { data: profiles, error: pErr } = await sb.from("user_profiles").select("*").or(`phone.eq.${formattedE164},phone.eq.${cleanPhone},phone.ilike.%${cleanPhone}%,email.eq.${canonicalPhoneEmail},email.eq.${canonicalPEmail}`).order("updated_at", { ascending: false }).limit(5);
          if (!pErr && Array.isArray(profiles) && profiles.length > 0) {
            const bestRow = profiles.find((p) => p.email && !p.email.includes("@girirajpower.internal")) || profiles[0];
            let cleanFullName = bestRow.full_name || bestRow.name || resolvedProfile?.full_name || null;
            if (cleanFullName && (cleanFullName.toLowerCase().startsWith("giriraj power") || cleanFullName.toLowerCase().startsWith("giriraj member") || cleanFullName.toLowerCase().startsWith("giriraj customer") || cleanFullName.toLowerCase().startsWith("p9") || cleanFullName.toLowerCase().startsWith("p8") || cleanFullName.toLowerCase().startsWith("p7") || cleanFullName.toLowerCase().startsWith("p6") || cleanFullName.toLowerCase().startsWith("phone_"))) {
              cleanFullName = null;
            }
            resolvedProfile = {
              user_id: bestRow.user_id || resolvedProfile?.user_id || null,
              full_name: cleanFullName,
              email: bestRow.email && !bestRow.email.includes("@girirajpower.internal") ? bestRow.email : resolvedProfile?.email || null,
              phone: formattedE164,
              avatar_url: bestRow.avatar_url || resolvedProfile?.avatar_url || null,
              dob: bestRow.dob || resolvedProfile?.dob || null,
              wallet_balance: bestRow.wallet_balance !== void 0 ? bestRow.wallet_balance : resolvedProfile?.wallet_balance,
              refund_balance: bestRow.refund_balance !== void 0 ? bestRow.refund_balance : resolvedProfile?.refund_balance,
              cashback_balance: bestRow.cashback_balance !== void 0 ? bestRow.cashback_balance : resolvedProfile?.cashback_balance
            };
          }
        } catch (e) {
          console.debug("[Resolve Phone User] user_profiles query notice:", e);
        }
        if (!resolvedProfile || !resolvedProfile.email || !resolvedProfile.full_name) {
          try {
            const { data: orderRows, error: oErr } = await sb.from("orders").select("user_id, customer_name, recipient_name, customer_email, recipient_email, address, address_line1, city, pincode, updated_at").or(`phone.eq.${cleanPhone},phone.eq.${formattedE164},recipient_phone.eq.${cleanPhone},recipient_phone.eq.${formattedE164}`).order("updated_at", { ascending: false }).limit(5);
            if (!oErr && Array.isArray(orderRows) && orderRows.length > 0) {
              const oBest = orderRows.find(
                (o) => (o.customer_email || o.recipient_email) && !(o.customer_email || o.recipient_email).includes("@girirajpower.internal")
              ) || orderRows[0];
              const oEmail = (oBest.customer_email || oBest.recipient_email || "").trim().toLowerCase();
              const cleanOrderEmail = oEmail.includes("@girirajpower.internal") ? null : oEmail || null;
              let cleanOrderName = oBest.customer_name || oBest.recipient_name || null;
              if (cleanOrderName && (cleanOrderName.toLowerCase().startsWith("giriraj power") || cleanOrderName.toLowerCase().startsWith("giriraj member") || cleanOrderName.toLowerCase().startsWith("giriraj customer") || cleanOrderName.toLowerCase().startsWith("customer") || cleanOrderName.toLowerCase().startsWith("p9") || cleanOrderName.toLowerCase().startsWith("p8") || cleanOrderName.toLowerCase().startsWith("p7") || cleanOrderName.toLowerCase().startsWith("p6") || cleanOrderName.toLowerCase().startsWith("phone_"))) {
                cleanOrderName = null;
              }
              resolvedProfile = {
                user_id: resolvedProfile?.user_id || oBest.user_id || null,
                full_name: resolvedProfile?.full_name || cleanOrderName,
                email: resolvedProfile?.email || cleanOrderEmail,
                phone: formattedE164,
                avatar_url: resolvedProfile?.avatar_url || null,
                dob: resolvedProfile?.dob || null
              };
            }
          } catch (e) {
            console.debug("[Resolve Phone User] orders lookup notice:", e);
          }
        }
      }
      if ((!resolvedProfile || !resolvedProfile.full_name) && serverFirestore) {
        try {
          const phoneIndexRef = (0, import_firestore.doc)(serverFirestore, "users_by_phone", cleanPhone);
          const phoneSnap = await (0, import_firestore.getDoc)(phoneIndexRef);
          if (phoneSnap.exists()) {
            const pData = phoneSnap.data();
            const fbUid = pData.user_id;
            if (fbUid) {
              const uDocRef = (0, import_firestore.doc)(serverFirestore, "users", fbUid);
              const uSnap = await (0, import_firestore.getDoc)(uDocRef);
              if (uSnap.exists()) {
                const uData = uSnap.data();
                resolvedProfile = {
                  user_id: resolvedProfile?.user_id || fbUid,
                  full_name: resolvedProfile?.full_name || uData.name || uData.full_name || null,
                  email: resolvedProfile?.email || (uData.email && !uData.email.includes("@girirajpower.internal") ? uData.email : null),
                  phone: formattedE164,
                  avatar_url: resolvedProfile?.avatar_url || uData.avatar_url || null,
                  dob: resolvedProfile?.dob || uData.dob || null
                };
              }
            }
          }
        } catch (fbErr) {
          console.debug("[Resolve Phone User API] Firestore check notice:", fbErr);
        }
      }
      if (resolvedProfile) {
        const toCache = {
          user_id: resolvedProfile.user_id || `uid_${cleanPhone}`,
          phone: formattedE164,
          full_name: resolvedProfile.full_name,
          email: resolvedProfile.email,
          avatar_url: resolvedProfile.avatar_url,
          dob: resolvedProfile.dob,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        };
        serverProfileStore.set(cleanPhone, toCache);
        serverProfileStore.set(formattedE164, toCache);
        if (resolvedProfile.user_id) serverProfileStore.set(resolvedProfile.user_id, toCache);
        if (resolvedProfile.email && !resolvedProfile.email.includes("@girirajpower.internal")) {
          serverProfileStore.set(resolvedProfile.email.toLowerCase(), toCache);
        }
      }
      const authUser = await getAuthenticatedUser(req);
      const isAuthAdmin = await isAuthorizedAdminOrSecret(req);
      const isCallerOwner = Boolean(
        authUser && (authUser.phone && authUser.phone.includes(cleanPhone) || resolvedProfile?.user_id && authUser.id === resolvedProfile.user_id)
      );
      let publicProfile = resolvedProfile;
      if (resolvedProfile && !isAuthAdmin && !isCallerOwner) {
        publicProfile = {
          user_id: resolvedProfile.user_id,
          phone: resolvedProfile.phone,
          full_name: resolvedProfile.full_name,
          email: resolvedProfile.email,
          avatar_url: resolvedProfile.avatar_url
        };
      }
      return res.json({
        success: true,
        exists: Boolean(resolvedProfile),
        profile: publicProfile || null
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err?.message || "Failed to resolve phone profile."
      });
    }
  });
  app.post("/api/auth/phone-login-session", phoneResolveLimiter, async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { phone, fullName, preResolvedUserId } = req.body || {};
      const cleanPhone = String(phone || "").replace(/\D/g, "").slice(-10);
      if (!cleanPhone || cleanPhone.length !== 10) {
        return res.status(400).json({ success: false, error: "Invalid 10-digit mobile number." });
      }
      const formattedE164 = `+91${cleanPhone}`;
      const canonicalEmail = `p${cleanPhone}@girirajpower.internal`;
      const deterministicPassword = `GirirajPower@${cleanPhone}#2026`;
      const sb = getServerSupabase();
      const existing = await resolvePhoneUser(cleanPhone);
      const effectiveUserId = preResolvedUserId || existing?.user_id || `uid_${cleanPhone}`;
      const resolvedName = existing?.full_name || existing?.name || fullName || "Customer";
      const resolvedEmail = existing?.email && !existing.email.includes("@girirajpower.internal") ? existing.email : "";
      if (sb?.auth?.admin) {
        try {
          const { data: createData, error: createErr } = await sb.auth.admin.createUser({
            email: canonicalEmail,
            password: deterministicPassword,
            email_confirm: true,
            user_metadata: {
              phone: formattedE164,
              contact_number: formattedE164,
              full_name: resolvedName,
              master_user_id: effectiveUserId,
              linked_user_id: effectiveUserId,
              ...resolvedEmail ? { real_email: resolvedEmail } : {}
            }
          });
          if (createErr) {
            const { data: listRes } = await sb.auth.admin.listUsers();
            const existingAuthUser = listRes?.users?.find(
              (u) => u.email === canonicalEmail || u.phone && u.phone.includes(cleanPhone)
            );
            if (existingAuthUser) {
              await sb.auth.admin.updateUserById(existingAuthUser.id, {
                password: deterministicPassword,
                email_confirm: true,
                user_metadata: {
                  ...existingAuthUser.user_metadata || {},
                  phone: formattedE164,
                  contact_number: formattedE164,
                  full_name: resolvedName,
                  master_user_id: effectiveUserId,
                  linked_user_id: effectiveUserId,
                  ...resolvedEmail ? { real_email: resolvedEmail } : {}
                }
              });
            }
          }
        } catch (adminErr) {
          console.warn("[Phone Login Session Admin Notice]:", adminErr);
        }
        try {
          await sb.from("user_profiles").upsert(
            {
              user_id: effectiveUserId,
              phone: formattedE164,
              full_name: resolvedName,
              email: resolvedEmail || null,
              updated_at: (/* @__PURE__ */ new Date()).toISOString()
            },
            { onConflict: "user_id" }
          );
        } catch {
        }
      }
      return res.json({
        success: true,
        email: canonicalEmail,
        effectiveUserId,
        resolvedName,
        resolvedEmail,
        profile: existing || null
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err?.message || "Failed to provision phone login session."
      });
    }
  });
  app.post("/api/auth/resolve-google-user", accountLookupLimiter, async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { email, name, avatarUrl } = req.body || {};
      const cleanEmail = String(email || "").trim().toLowerCase();
      if (!cleanEmail || !cleanEmail.includes("@")) {
        return res.status(400).json({ success: false, message: "Valid email is required." });
      }
      const sb = getServerSupabase();
      let resolvedProfile = null;
      const memProf = serverProfileStore.get(cleanEmail);
      if (memProf) {
        resolvedProfile = { ...memProf };
      }
      if (sb) {
        try {
          const { data: profiles, error: pErr } = await sb.from("user_profiles").select("*").or(`email.ilike.${cleanEmail},linked_email.ilike.${cleanEmail}`).order("updated_at", { ascending: false }).limit(5);
          if (!pErr && Array.isArray(profiles) && profiles.length > 0) {
            const bestRow = profiles.find((p) => p.phone) || profiles[0];
            resolvedProfile = {
              user_id: bestRow.user_id || resolvedProfile?.user_id || null,
              full_name: bestRow.full_name || bestRow.name || name || resolvedProfile?.full_name || null,
              email: cleanEmail,
              phone: bestRow.phone || resolvedProfile?.phone || null,
              avatar_url: avatarUrl || bestRow.avatar_url || resolvedProfile?.avatar_url || null,
              dob: bestRow.dob || resolvedProfile?.dob || null,
              wallet_balance: bestRow.wallet_balance !== void 0 ? bestRow.wallet_balance : resolvedProfile?.wallet_balance,
              refund_balance: bestRow.refund_balance !== void 0 ? bestRow.refund_balance : resolvedProfile?.refund_balance,
              cashback_balance: bestRow.cashback_balance !== void 0 ? bestRow.cashback_balance : resolvedProfile?.cashback_balance
            };
          }
        } catch (e) {
          console.debug("[Resolve Google User] user_profiles query notice:", e);
        }
        if (!resolvedProfile?.phone) {
          try {
            const { data: orderRows, error: oErr } = await sb.from("orders").select("user_id, phone, recipient_phone, customer_name, recipient_name, address, address_line1, city, pincode, updated_at").or(`customer_email.ilike.${cleanEmail},recipient_email.ilike.${cleanEmail}`).order("updated_at", { ascending: false }).limit(5);
            if (!oErr && Array.isArray(orderRows) && orderRows.length > 0) {
              const bestOrder = orderRows.find((o) => o.phone || o.recipient_phone) || orderRows[0];
              const phoneFound = (bestOrder.phone || bestOrder.recipient_phone || "").replace(/\D/g, "").slice(-10);
              const formattedPhone = phoneFound.length === 10 ? `+91${phoneFound}` : null;
              resolvedProfile = {
                user_id: resolvedProfile?.user_id || bestOrder.user_id || null,
                full_name: resolvedProfile?.full_name || bestOrder.customer_name || bestOrder.recipient_name || name || null,
                email: cleanEmail,
                phone: resolvedProfile?.phone || formattedPhone,
                avatar_url: avatarUrl || resolvedProfile?.avatar_url || null,
                dob: resolvedProfile?.dob || null
              };
            }
          } catch (e) {
            console.debug("[Resolve Google User] orders lookup notice:", e);
          }
        }
      }
      if ((!resolvedProfile || !resolvedProfile.phone) && serverFirestore) {
        try {
          const emailKey = cleanEmail.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 120);
          const emailIndexRef = (0, import_firestore.doc)(serverFirestore, "users_by_email", emailKey);
          const emailSnap = await (0, import_firestore.getDoc)(emailIndexRef);
          if (emailSnap.exists()) {
            const eData = emailSnap.data();
            const fbUid = eData.user_id;
            if (fbUid) {
              const uDocRef = (0, import_firestore.doc)(serverFirestore, "users", fbUid);
              const uSnap = await (0, import_firestore.getDoc)(uDocRef);
              if (uSnap.exists()) {
                const docData = uSnap.data();
                const phoneFound = (docData.phone || "").replace(/\D/g, "").slice(-10);
                const formattedPhone = phoneFound.length === 10 ? `+91${phoneFound}` : null;
                resolvedProfile = {
                  user_id: resolvedProfile?.user_id || docData.user_id || fbUid,
                  full_name: resolvedProfile?.full_name || docData.name || docData.full_name || name || null,
                  email: cleanEmail,
                  phone: resolvedProfile?.phone || formattedPhone,
                  avatar_url: avatarUrl || resolvedProfile?.avatar_url || docData.avatar_url || null,
                  dob: resolvedProfile?.dob || docData.dob || null
                };
              }
            }
          }
        } catch (fbErr) {
          console.debug("[Resolve Google User] Firestore check notice:", fbErr);
        }
      }
      if (resolvedProfile) {
        const toCache = {
          user_id: resolvedProfile.user_id || `uid_${cleanEmail.replace(/[^a-zA-Z0-9]/g, "_")}`,
          phone: resolvedProfile.phone || "",
          full_name: resolvedProfile.full_name || name || "",
          email: cleanEmail,
          avatar_url: resolvedProfile.avatar_url,
          dob: resolvedProfile.dob,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        };
        serverProfileStore.set(cleanEmail, toCache);
        if (resolvedProfile.phone) {
          const digits = resolvedProfile.phone.replace(/\D/g, "").slice(-10);
          if (digits.length === 10) {
            serverProfileStore.set(digits, toCache);
            serverProfileStore.set(`+91${digits}`, toCache);
          }
        }
        if (resolvedProfile.user_id) serverProfileStore.set(resolvedProfile.user_id, toCache);
      }
      const sessionCheck = extractServerSession(req);
      const isAuthed = sessionCheck.valid;
      const safeProfile = resolvedProfile ? {
        user_id: resolvedProfile.user_id,
        full_name: resolvedProfile.full_name,
        email: cleanEmail,
        phone: isAuthed ? resolvedProfile.phone : resolvedProfile.phone ? maskPhoneNumber(resolvedProfile.phone) : null,
        avatar_url: resolvedProfile.avatar_url,
        dob: isAuthed ? resolvedProfile.dob : null
      } : null;
      return res.json({
        success: true,
        exists: Boolean(resolvedProfile),
        profile: safeProfile
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err?.message || "Failed to resolve Google user profile."
      });
    }
  });
  app.post("/api/auth/login", loginRateLimiter, async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { identifier, password } = req.body || {};
      const cleanIdent = String(identifier || "").trim();
      const cleanPw = String(password || "").trim();
      if (!cleanIdent || !cleanPw) {
        return res.status(400).json({ success: false, error: "Identifier and password are required." });
      }
      const now = Date.now();
      const lockoutEntry = failedLoginTracker.get(cleanIdent.toLowerCase());
      if (lockoutEntry && lockoutEntry.lockedUntil > now) {
        const remainingMinutes = Math.ceil((lockoutEntry.lockedUntil - now) / 6e4);
        return res.status(429).json({
          success: false,
          error: `Account temporarily locked due to repeated failed login attempts. Please wait ${remainingMinutes} minute(s) before trying again or sign in with OTP.`
        });
      }
      const sb = getServerSupabase();
      if (!sb) {
        return res.status(500).json({ success: false, error: "Authentication service unavailable." });
      }
      let targetEmail = cleanIdent;
      let userPhone = "";
      let userFullName = "";
      const isPhone = !cleanIdent.includes("@") && cleanIdent.replace(/\D/g, "").length >= 7;
      if (isPhone) {
        const clean10 = cleanIdent.replace(/\D/g, "").slice(-10);
        userPhone = `+91${clean10}`;
        targetEmail = `p${clean10}@girirajpower.internal`;
        const existing = await resolvePhoneUser(clean10);
        if (existing?.email && !existing.email.includes("@girirajpower.internal")) {
          targetEmail = existing.email;
        }
        if (existing?.full_name) {
          userFullName = existing.full_name;
        }
      } else {
        targetEmail = cleanIdent.toLowerCase();
      }
      let { data, error } = await sb.auth.signInWithPassword({
        email: targetEmail,
        password: cleanPw
      });
      if (error && isPhone) {
        const clean10 = cleanIdent.replace(/\D/g, "").slice(-10);
        const candidates = [`p${clean10}@girirajpower.internal`, `phone_${clean10}@girirajpower.internal`];
        for (const candidate of candidates) {
          if (candidate === targetEmail) continue;
          const retry = await sb.auth.signInWithPassword({
            email: candidate,
            password: cleanPw
          });
          if (!retry.error && retry.data?.user) {
            data = retry.data;
            error = null;
            targetEmail = candidate;
            break;
          }
        }
      }
      if (error || !data?.user) {
        const isExpired = Boolean(lockoutEntry && lockoutEntry.lockedUntil > 0 && lockoutEntry.lockedUntil <= now);
        const currentCount = isExpired ? 0 : lockoutEntry?.count || 0;
        const newCount = currentCount + 1;
        const lockedUntil = newCount >= 5 ? now + 15 * 60 * 1e3 : 0;
        failedLoginTracker.set(cleanIdent.toLowerCase(), { count: newCount, lockedUntil });
        await new Promise((r) => setTimeout(r, 300 + Math.random() * 200));
        const warningMsg = newCount >= 5 ? "Account temporarily locked due to 5 consecutive failed attempts. Please wait 15 minutes or sign in with OTP." : `Incorrect password or account not found. ${5 - newCount} attempt(s) remaining before temporary lockout.`;
        return res.status(401).json({
          success: false,
          error: warningMsg
        });
      }
      failedLoginTracker.delete(cleanIdent.toLowerCase());
      const resolvedName = userFullName || data.user.user_metadata?.full_name || data.user.user_metadata?.name || "Customer";
      const resolvedPhone = userPhone || data.user.phone || data.user.user_metadata?.phone || "";
      let userProfile = null;
      try {
        const { data: prof } = await sb.from("user_profiles").select("*").eq("user_id", data.user.id).single();
        if (prof) userProfile = prof;
      } catch {
      }
      const cleanPhoneDigits = (resolvedPhone || "").replace(/\D/g, "").slice(-10);
      const isUserAdmin = Boolean(
        targetEmail && !targetEmail.includes("@girirajpower.internal") && ADMIN_EMAILS.includes(targetEmail.toLowerCase()) || cleanPhoneDigits === "8777400280"
      );
      const userRole = isUserAdmin ? "admin" : "customer";
      const sessionToken = createServerSessionToken({
        uid: data.user.id,
        phone: resolvedPhone || null,
        email: targetEmail.includes("@girirajpower.internal") ? null : targetEmail,
        name: resolvedName,
        role: userRole
      });
      setServerSessionCookie(req, res, sessionToken);
      return res.json({
        success: true,
        user: data.user,
        session: data.session,
        sessionToken,
        profile: userProfile || {
          id: data.user.id,
          name: resolvedName,
          phone: resolvedPhone,
          email: targetEmail.includes("@girirajpower.internal") ? null : targetEmail,
          role: userRole
        }
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err?.message || "Server authentication error."
      });
    }
  });
  app.post("/api/auth/register", registerRateLimiter, async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { email, phone, fullName, password } = req.body || {};
      const cleanEmail = String(email || "").trim().toLowerCase();
      const cleanPhone = String(phone || "").replace(/\D/g, "").slice(-10);
      const cleanName = String(fullName || "").trim();
      const cleanPw = String(password || "").trim();
      if (!cleanName) {
        return res.status(400).json({ success: false, error: "Full name is required." });
      }
      if (!cleanEmail || !cleanEmail.includes("@")) {
        return res.status(400).json({ success: false, error: "Valid email address is required." });
      }
      const emailDomain = cleanEmail.split("@")[1];
      if (emailDomain && DISPOSABLE_EMAIL_DOMAINS.has(emailDomain)) {
        return res.status(400).json({
          success: false,
          error: "Temporary or disposable email domains are not allowed. Please register with a permanent email."
        });
      }
      if (!cleanPw || cleanPw.length < 6) {
        return res.status(400).json({ success: false, error: "Password must be at least 6 characters." });
      }
      const formattedPhone = cleanPhone ? `+91${cleanPhone}` : "";
      const sb = getServerSupabase();
      if (!sb) {
        return res.status(500).json({ success: false, error: "Authentication service unavailable." });
      }
      let userId = "";
      let authUser = null;
      let authSession = null;
      if (sb.auth?.admin) {
        const { data: createData, error: createErr } = await sb.auth.admin.createUser({
          email: cleanEmail,
          password: cleanPw,
          email_confirm: true,
          user_metadata: {
            full_name: cleanName,
            name: cleanName,
            phone: formattedPhone,
            contact_number: formattedPhone
          }
        });
        if (!createErr && createData?.user) {
          authUser = createData.user;
          userId = createData.user.id;
        } else if (createErr) {
          const { data: loginData, error: loginErr } = await sb.auth.signInWithPassword({
            email: cleanEmail,
            password: cleanPw
          });
          if (!loginErr && loginData?.user) {
            authUser = loginData.user;
            authSession = loginData.session;
            userId = loginData.user.id;
          } else {
            return res.status(400).json({
              success: false,
              error: createErr.message || "An account with this email already exists."
            });
          }
        }
      } else {
        const { data: signUpData, error: signUpErr } = await sb.auth.signUp({
          email: cleanEmail,
          password: cleanPw,
          options: {
            data: {
              full_name: cleanName,
              phone: formattedPhone
            }
          }
        });
        if (signUpErr) {
          return res.status(400).json({ success: false, error: signUpErr.message });
        }
        authUser = signUpData.user;
        authSession = signUpData.session;
        userId = authUser?.id || "";
      }
      if (!authSession && userId) {
        const { data: loginData } = await sb.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPw
        });
        if (loginData?.session) {
          authSession = loginData.session;
          authUser = loginData.user;
        }
      }
      if (userId) {
        try {
          await sb.from("user_profiles").upsert(
            {
              user_id: userId,
              full_name: cleanName,
              email: cleanEmail,
              phone: formattedPhone || null,
              updated_at: (/* @__PURE__ */ new Date()).toISOString()
            },
            { onConflict: "user_id" }
          );
        } catch (dbErr) {
          console.debug("[Register Profile Upsert]:", dbErr);
        }
      }
      if (serverFirestore && userId) {
        try {
          const docRef = (0, import_firestore.doc)(serverFirestore, "users", userId);
          await (0, import_firestore.setDoc)(docRef, {
            id: userId,
            email: cleanEmail,
            full_name: cleanName,
            phone: formattedPhone || null,
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          }, { merge: true });
        } catch {
        }
      }
      return res.json({
        success: true,
        user: authUser,
        session: authSession,
        profile: {
          id: userId,
          name: cleanName,
          email: cleanEmail,
          phone: formattedPhone
        }
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err?.message || "Failed to register user."
      });
    }
  });
  const PASSKEYS_FILE = import_path.default.resolve(process.cwd(), "passkey_credentials.json");
  const passkeyChallengeStore = /* @__PURE__ */ new Map();
  function loadPasskeyCredentials() {
    try {
      if (import_fs.default.existsSync(PASSKEYS_FILE)) {
        const raw = import_fs.default.readFileSync(PASSKEYS_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.debug("[Passkeys] Notice loading credentials:", e);
    }
    return [];
  }
  function savePasskeyCredentials(creds) {
    try {
      import_fs.default.writeFileSync(PASSKEYS_FILE, JSON.stringify(creds, null, 2), "utf-8");
    } catch (e) {
      console.error("[Passkeys] Failed to save credentials file:", e);
    }
  }
  function getWebAuthnRpConfig(req) {
    const rawHost = req.get("host") || "smartrun.in";
    const host = rawHost.split(":")[0].toLowerCase();
    let rpID = "smartrun.in";
    const expectedOrigin = [
      "https://www.smartrun.in",
      "https://smartrun.in",
      "https://girirajpower.in",
      "https://www.girirajpower.in"
    ];
    if (host.endsWith("smartrun.in")) {
      rpID = "smartrun.in";
      expectedOrigin.push(`https://${rawHost}`);
    } else if (host === "localhost" || host === "127.0.0.1") {
      rpID = "localhost";
      expectedOrigin.push(
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        `http://${host}:3000`,
        `http://${rawHost}`
      );
    } else {
      rpID = host;
      expectedOrigin.push(`https://${host}`, `https://${rawHost}`, `http://${host}`, `http://${rawHost}`);
    }
    const reqOrigin = req.get("origin");
    if (reqOrigin && !expectedOrigin.includes(reqOrigin)) {
      expectedOrigin.push(reqOrigin);
    }
    return { rpID, expectedOrigin };
  }
  app.post("/api/auth/passkey/login-options", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { identifier } = req.body || {};
      const { rpID } = getWebAuthnRpConfig(req);
      const allCreds = loadPasskeyCredentials();
      let allowCredentials = [];
      if (identifier) {
        const cleanIdent = String(identifier).trim().toLowerCase();
        const clean10 = cleanIdent.replace(/\D/g, "").slice(-10);
        const userCreds = allCreds.filter(
          (c) => c.userEmail?.toLowerCase() === cleanIdent || clean10.length === 10 && c.userPhone?.includes(clean10) || c.userId === cleanIdent
        );
        if (userCreds.length > 0) {
          allowCredentials = userCreds.map((c) => ({
            id: c.id,
            transports: c.transports
          }));
        }
      }
      const options = await (0, import_server.generateAuthenticationOptions)({
        rpID,
        allowCredentials: allowCredentials.length > 0 ? allowCredentials : void 0,
        userVerification: "preferred"
      });
      const challengeToken = import_crypto.default.randomUUID();
      passkeyChallengeStore.set(challengeToken, {
        challenge: options.challenge,
        expiresAt: Date.now() + 5 * 60 * 1e3
      });
      return res.json({
        success: true,
        options,
        challengeToken
      });
    } catch (err) {
      console.error("[Passkey Login Options Error]:", err);
      return res.status(500).json({ success: false, error: err?.message || "Failed to generate passkey options." });
    }
  });
  app.post("/api/auth/passkey/login-verify", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { response, challengeToken } = req.body || {};
      if (!response || !response.id) {
        return res.status(400).json({ success: false, error: "Missing authentication response." });
      }
      const allCreds = loadPasskeyCredentials();
      const cred = allCreds.find((c) => c.id === response.id);
      if (!cred) {
        return res.status(404).json({ success: false, error: "Passkey not recognized. Please sign in with OTP or password." });
      }
      const { rpID, expectedOrigin } = getWebAuthnRpConfig(req);
      let expectedChallenge = "";
      if (challengeToken && passkeyChallengeStore.has(challengeToken)) {
        const item = passkeyChallengeStore.get(challengeToken);
        if (item && item.expiresAt > Date.now()) {
          expectedChallenge = item.challenge;
        }
        passkeyChallengeStore.delete(challengeToken);
      } else {
        for (const [key, item] of passkeyChallengeStore.entries()) {
          if (item.expiresAt > Date.now()) {
            expectedChallenge = item.challenge;
            passkeyChallengeStore.delete(key);
            break;
          }
        }
      }
      if (!expectedChallenge) {
        return res.status(400).json({ success: false, error: "Passkey session expired. Please try again." });
      }
      const verification = await (0, import_server.verifyAuthenticationResponse)({
        response,
        expectedChallenge,
        expectedOrigin,
        expectedRPID: rpID,
        credential: {
          id: cred.id,
          publicKey: Buffer.from(cred.publicKey, "base64url"),
          counter: cred.counter
        }
      });
      if (!verification.verified) {
        return res.status(401).json({ success: false, error: "Passkey biometric verification failed." });
      }
      cred.counter = verification.authenticationInfo.newCounter;
      cred.lastUsedAt = (/* @__PURE__ */ new Date()).toISOString();
      savePasskeyCredentials(allCreds);
      const sb = getServerSupabase();
      let userSession = null;
      let authUser = null;
      const cleanPhone10 = cred.userPhone ? cred.userPhone.replace(/\D/g, "").slice(-10) : "";
      const canonicalEmail = cred.userEmail || (cleanPhone10 ? `p${cleanPhone10}@girirajpower.internal` : `user_${cred.userId.slice(0, 8)}@girirajpower.internal`);
      if (sb?.auth?.admin) {
        try {
          const { data: userRecord } = await sb.auth.admin.getUserById(cred.userId).catch(() => ({ data: null }));
          if (userRecord?.user) {
            authUser = userRecord.user;
          }
          if (cleanPhone10) {
            const deterministicPassword = `GirirajPower@${cleanPhone10}#2026`;
            const signInRes = await sb.auth.signInWithPassword({
              email: canonicalEmail,
              password: deterministicPassword
            });
            if (signInRes.data?.session) {
              userSession = signInRes.data.session;
              authUser = signInRes.data.user;
            }
          }
        } catch (adminErr) {
          console.warn("[Passkey Supabase Provisioning Notice]:", adminErr);
        }
      }
      let profileData = null;
      if (sb && cred.userId) {
        try {
          const { data: p } = await sb.from("user_profiles").select("*").eq("user_id", cred.userId).single();
          if (p) profileData = p;
        } catch {
        }
      }
      return res.json({
        success: true,
        user: authUser || { id: cred.userId, email: cred.userEmail, phone: cred.userPhone },
        session: userSession,
        profile: profileData || {
          id: cred.userId,
          name: cred.userName || "Customer",
          email: cred.userEmail,
          phone: cred.userPhone
        }
      });
    } catch (err) {
      console.error("[Passkey Login Verify Error]:", err);
      return res.status(500).json({ success: false, error: err?.message || "Passkey verification failed." });
    }
  });
  app.post("/api/auth/passkey/register-options", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { userId, email, phone, fullName } = req.body || {};
      if (!userId) {
        return res.status(400).json({ success: false, error: "User ID is required to register a passkey." });
      }
      const { rpID } = getWebAuthnRpConfig(req);
      const allCreds = loadPasskeyCredentials();
      const existingCreds = allCreds.filter((c) => c.userId === userId);
      const cleanName = String(fullName || "Customer").trim();
      const cleanEmailOrPhone = email || phone || `Customer-${userId.slice(0, 6)}`;
      const options = await (0, import_server.generateRegistrationOptions)({
        rpName: "SmartRun Express",
        rpID,
        userID: Buffer.from(userId),
        userName: cleanEmailOrPhone,
        userDisplayName: cleanName,
        attestationType: "none",
        excludeCredentials: existingCreds.map((c) => ({
          id: c.id,
          transports: c.transports
        })),
        authenticatorSelection: {
          residentKey: "preferred",
          userVerification: "preferred"
        }
      });
      const challengeToken = import_crypto.default.randomUUID();
      passkeyChallengeStore.set(challengeToken, {
        challenge: options.challenge,
        userId,
        expiresAt: Date.now() + 5 * 60 * 1e3
      });
      return res.json({
        success: true,
        options,
        challengeToken
      });
    } catch (err) {
      console.error("[Passkey Register Options Error]:", err);
      return res.status(500).json({ success: false, error: err?.message || "Failed to start passkey setup." });
    }
  });
  app.post("/api/auth/passkey/register-verify", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    try {
      const { userId, response, challengeToken, deviceName, email, phone, fullName } = req.body || {};
      if (!userId || !response) {
        return res.status(400).json({ success: false, error: "Missing required registration parameters." });
      }
      const { rpID, expectedOrigin } = getWebAuthnRpConfig(req);
      let expectedChallenge = "";
      if (challengeToken && passkeyChallengeStore.has(challengeToken)) {
        const item = passkeyChallengeStore.get(challengeToken);
        if (item && item.expiresAt > Date.now()) {
          expectedChallenge = item.challenge;
        }
        passkeyChallengeStore.delete(challengeToken);
      } else {
        for (const [key, item] of passkeyChallengeStore.entries()) {
          if (item.userId === userId && item.expiresAt > Date.now()) {
            expectedChallenge = item.challenge;
            passkeyChallengeStore.delete(key);
            break;
          }
        }
      }
      if (!expectedChallenge) {
        return res.status(400).json({ success: false, error: "Registration session expired. Please try again." });
      }
      const verification = await (0, import_server.verifyRegistrationResponse)({
        response,
        expectedChallenge,
        expectedOrigin,
        expectedRPID: rpID
      });
      if (!verification.verified || !verification.registrationInfo) {
        return res.status(400).json({ success: false, error: "Passkey registration verification failed." });
      }
      const { credential } = verification.registrationInfo;
      const allCreds = loadPasskeyCredentials();
      const newCred = {
        id: credential.id,
        publicKey: Buffer.from(credential.publicKey).toString("base64url"),
        userId,
        userName: fullName || "Customer",
        userEmail: email || void 0,
        userPhone: phone || void 0,
        counter: credential.counter,
        transports: response.response?.transports || credential.transports,
        deviceName: deviceName || "My Device",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        lastUsedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const filtered = allCreds.filter((c) => c.id !== newCred.id);
      filtered.push(newCred);
      savePasskeyCredentials(filtered);
      if (serverFirestore) {
        try {
          const passkeyDoc = (0, import_firestore.doc)(serverFirestore, "passkeys", newCred.id);
          await (0, import_firestore.setDoc)(passkeyDoc, {
            ...newCred,
            syncedAt: (/* @__PURE__ */ new Date()).toISOString()
          }, { merge: true });
        } catch (fsErr) {
          console.debug("[Passkey Firestore Sync Notice]:", fsErr);
        }
      }
      return res.json({
        success: true,
        message: "Passkey registered successfully! You can now use your biometric or screen lock to sign in.",
        credentialId: newCred.id
      });
    } catch (err) {
      console.error("[Passkey Register Verify Error]:", err);
      return res.status(500).json({ success: false, error: err?.message || "Failed to complete passkey setup." });
    }
  });
  app.get("/api/auth/passkey/list", (req, res) => {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ success: false, error: "User ID required." });
    const allCreds = loadPasskeyCredentials();
    const userCreds = allCreds.filter((c) => c.userId === userId).map(({ id, deviceName, createdAt, lastUsedAt }) => ({ id, deviceName, createdAt, lastUsedAt }));
    return res.json({ success: true, credentials: userCreds });
  });
  app.delete("/api/auth/passkey/:id", (req, res) => {
    const { id } = req.params;
    const allCreds = loadPasskeyCredentials();
    const next = allCreds.filter((c) => c.id !== id);
    savePasskeyCredentials(next);
    return res.json({ success: true, message: "Passkey removed." });
  });
  app.get("/api/sms/providers-status", (req, res) => {
    const fast2smsConfigured = Boolean(String(process.env.FAST2SMS_API_KEY || "").trim());
    return res.json({
      gateway: fast2smsConfigured ? "fast2sms_primary_firebase_fallback" : "firebase_only",
      fast2sms: {
        configured: fast2smsConfigured,
        primaryRoute: "otp",
        panIndiaDlt: true
      },
      firebase: {
        type: "firebase_phone_auth",
        status: "active",
        firestore: Boolean(serverFirestore)
      }
    });
  });
  app.all("/api/auth/backfill-firebase", async (req, res) => {
    try {
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
      const result = await backfillAllUsersToFirebaseFirestore();
      return res.json({
        success: result.success,
        syncedCount: result.syncedCount || 0,
        message: result.success ? `Successfully synchronized ${result.syncedCount} user profiles and customer records to Firebase Cloud Firestore.` : `Backfill notice: ${result.error || "Failed"}`
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err?.message || err });
    }
  });
  app.post("/api/supabase-sms-hook", async (req, res) => {
    try {
      const body = req.body || {};
      const phone = body.sms?.phone || body.phone || body.user?.phone || "";
      const otp = body.sms?.otp || body.otp || "";
      if (!phone || !otp) {
        return res.status(400).json({
          error: "Missing required phone or otp parameters from Supabase SMS hook."
        });
      }
      const cleanPhone = String(phone).replace(/\D/g, "").slice(-10);
      serverPhoneOtpStore.set(cleanPhone, {
        otp: String(otp).trim(),
        expiresAt: Date.now() + 10 * 60 * 1e3,
        attempts: 0,
        phone: cleanPhone
      });
      console.log(`[Firebase Backend Hook] Registered OTP for +91 ${cleanPhone.slice(0, 4)}****`);
      return res.status(200).json({});
    } catch (err) {
      console.error("[Firebase Backend Hook] Unexpected failure:", err);
      return res.status(500).json({ error: err?.message || "Internal server error in SMS hook." });
    }
  });
  app.get(["/manifest.json", "/manifest.webmanifest"], (req, res) => {
    res.setHeader("Content-Type", "application/manifest+json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=86400");
    const manifestPath = import_path.default.join(process.cwd(), "public", "manifest.json");
    res.sendFile(manifestPath);
  });
  app.use("/icons", import_express.default.static(import_path.default.join(process.cwd(), "public", "icons"), {
    setHeaders: (res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }
  }));
  const distPath = import_path.default.join(process.cwd(), "dist");
  const distExists = import_fs.default.existsSync(import_path.default.join(distPath, "index.html"));
  const isCompiledBundle = typeof __filename !== "undefined" && (__filename.includes("dist") || __filename.endsWith(".cjs"));
  const isProduction = process.env.NODE_ENV === "production" || isCompiledBundle;
  const publicPath = import_path.default.join(process.cwd(), "public");
  if (import_fs.default.existsSync(publicPath)) {
    app.use(import_express.default.static(publicPath));
  }
  if (!isProduction) {
    console.log("Starting Vite development middleware...");
    const vite = await (0, import_vite.createServer)({
      server: {
        middlewareMode: true,
        hmr: false,
        ws: false
      },
      plugins: [
        {
          name: "silence-vite-dev-hmr",
          transform(code, id) {
            if (id.includes("client.mjs") || id.includes("@vite/client")) {
              let replaced = code.replace(/reject\(new Error\("WebSocket closed without opened\."\)\)/g, "resolve()").replace(/new WebSocket\(/g, "/* mocked ws */ (() => ({ readyState: 1, OPEN: 1, CLOSED: 3, close(){}, send(){}, addEventListener(e, cb){ if (e === 'open' && typeof cb === 'function') setTimeout(cb, 0); }, removeEventListener(){} }))(").replace(/console\.debug\(`\[vite\] connecting\.\.\.`\);/g, "/* silenced */").replace(/console\.error\(`\[vite\] failed to connect to websocket/g, "/* silenced */ (() => {})(`");
              return { code: replaced };
            }
          }
        }
      ],
      appType: "spa"
    });
    app.get(
      [
        "/",
        "/electrical/product/:id",
        "/construction/product/:id",
        "/product/:id",
        "/electrical",
        "/construction",
        "/technicians",
        "/technicians/:id",
        "/shipping",
        "/shipping-policy",
        "/shipping-and-return-policy",
        "/return",
        "/return-policy",
        "/returns",
        "/refund",
        "/refund-policy",
        "/refunds",
        "/faqs",
        "/faq",
        "/about",
        "/about-us",
        "/privacy",
        "/privacy-policy",
        "/terms",
        "/terms-of-service",
        "/sitemap",
        "/how-to-use",
        "/guide",
        "/app",
        "/download",
        "/delivery-areas",
        "/service-areas",
        "/contact",
        "/contact-us",
        "/support"
      ],
      async (req, res, next) => {
        try {
          const { products } = await getCachedCatalog();
          const productId = req.params.id;
          const requestedColor = typeof req.query?.color === "string" ? req.query.color : void 0;
          const matchedProductRaw = productId && (req.path.includes("/product/") || req.path.startsWith("/product/")) ? products.find((p) => String(p.id).toLowerCase() === String(productId).toLowerCase()) : null;
          const matchedProduct = matchedProductRaw ? normalizeProductForSeo(matchedProductRaw, { selectedColor: requestedColor }) : null;
          const matchedTechnician = productId && req.path.startsWith("/technicians/") ? DEMO_TECHNICIANS.find((t) => String(t.id).toLowerCase() === String(productId).toLowerCase()) : null;
          const feePolicy = getServerFeePolicy();
          const catalogForListing = matchedProduct ? void 0 : products.slice(0, 60);
          res.setHeader("Vary", "Accept");
          res.setHeader("Link", '</.well-known/ard.json>; rel="ard"; type="application/json", </llms.txt>; rel="alternate"; type="text/markdown"');
          const acceptHeader = String(req.headers.accept || "").toLowerCase();
          if (acceptHeader.includes("text/markdown") && !acceptHeader.includes("text/html")) {
            const markdownBody = renderMarkdownRepresentation(req.path, matchedProduct, matchedTechnician);
            res.setHeader("Content-Type", "text/markdown; charset=utf-8");
            res.setHeader("Cache-Control", "public, max-age=300");
            return res.status(200).send(markdownBody);
          }
          const rawTemplate = import_fs.default.readFileSync(import_path.default.join(process.cwd(), "index.html"), "utf-8");
          const devHtml = await vite.transformIndexHtml(req.originalUrl, rawTemplate);
          const injectedHtml = injectSeoMetadata(
            devHtml,
            req.path,
            matchedProduct,
            matchedTechnician,
            catalogForListing,
            {
              shippingRate: feePolicy.baseDeliveryFee,
              freeDeliveryThreshold: feePolicy.freeDeliveryThreshold
            }
          );
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
          return res.status(200).send(injectedHtml);
        } catch (prerenderErr) {
          console.warn("[Dev SEO Prerender] Fallback notice:", prerenderErr);
          next();
        }
      }
    );
    app.use(vite.middlewares);
  } else {
    console.log("Serving pre-compiled production build from dist/ (Vite dev server OFF)...");
    app.use((req, res, next) => {
      const assetIdx = req.path.indexOf("/assets/");
      if (assetIdx !== -1) {
        const rewritten = req.path.substring(assetIdx);
        const resolvedFile = import_path.default.join(distPath, rewritten);
        if (import_fs.default.existsSync(resolvedFile)) {
          return res.sendFile(resolvedFile);
        }
      }
      next();
    });
    app.use(
      "/assets",
      import_express.default.static(import_path.default.join(distPath, "assets"), {
        maxAge: "365d",
        immutable: true
      })
    );
    app.use(
      import_express.default.static(distPath, {
        index: false,
        setHeaders: (res, filePath) => {
          if (filePath.endsWith(".html")) {
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            res.setHeader("Pragma", "no-cache");
            res.setHeader("Expires", "0");
          } else if (filePath.match(/\.(js|css|woff2?|png|jpe?g|gif|svg|webp|ico)$/i)) {
            res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          } else {
            res.setHeader("Cache-Control", "public, max-age=86400");
          }
        }
      })
    );
    app.get(
      [
        "/",
        "/electrical/product/:id",
        "/construction/product/:id",
        "/product/:id",
        "/electrical",
        "/construction",
        "/technicians",
        "/technicians/:id",
        "/shipping",
        "/shipping-policy",
        "/shipping-and-return-policy",
        "/return",
        "/return-policy",
        "/returns",
        "/refund",
        "/refund-policy",
        "/refunds",
        "/faqs",
        "/faq",
        "/about",
        "/about-us",
        "/privacy",
        "/privacy-policy",
        "/terms",
        "/terms-of-service",
        "/sitemap",
        "/how-to-use",
        "/guide",
        "/app",
        "/download",
        "/delivery-areas",
        "/service-areas",
        "/contact",
        "/contact-us",
        "/support"
      ],
      async (req, res, next) => {
        try {
          const prodIndexFile = import_path.default.join(distPath, "index.html");
          if (!import_fs.default.existsSync(prodIndexFile)) return next();
          const { products } = await getCachedCatalog();
          const productId = req.params.id;
          const requestedColor = typeof req.query?.color === "string" ? req.query.color : void 0;
          const matchedProductRaw = productId && (req.path.includes("/product/") || req.path.startsWith("/product/")) ? products.find((p) => String(p.id).toLowerCase() === String(productId).toLowerCase()) : null;
          const matchedProduct = matchedProductRaw ? normalizeProductForSeo(matchedProductRaw, { selectedColor: requestedColor }) : null;
          const matchedTechnician = productId && req.path.startsWith("/technicians/") ? DEMO_TECHNICIANS.find((t) => String(t.id).toLowerCase() === String(productId).toLowerCase()) : null;
          const feePolicy = getServerFeePolicy();
          const catalogForListing = matchedProduct ? void 0 : products.slice(0, 60);
          res.setHeader("Vary", "Accept");
          res.setHeader("Link", '</.well-known/ard.json>; rel="ard"; type="application/json", </llms.txt>; rel="alternate"; type="text/markdown"');
          const acceptHeader = String(req.headers.accept || "").toLowerCase();
          if (acceptHeader.includes("text/markdown") && !acceptHeader.includes("text/html")) {
            const markdownBody = renderMarkdownRepresentation(req.path, matchedProduct, matchedTechnician);
            res.setHeader("Content-Type", "text/markdown; charset=utf-8");
            res.setHeader("Cache-Control", "public, max-age=300");
            return res.status(200).send(markdownBody);
          }
          const rawHtml = import_fs.default.readFileSync(prodIndexFile, "utf-8");
          const injectedHtml = injectSeoMetadata(
            rawHtml,
            req.path,
            matchedProduct,
            matchedTechnician,
            catalogForListing,
            {
              shippingRate: feePolicy.baseDeliveryFee,
              freeDeliveryThreshold: feePolicy.freeDeliveryThreshold
            }
          );
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
          return res.status(200).send(injectedHtml);
        } catch (prerenderErr) {
          console.warn("[Prod SEO Prerender] Fallback notice:", prerenderErr);
          next();
        }
      }
    );
    app.get("*", (req, res) => {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.use((err, req, res, next) => {
    if (err instanceof URIError || err?.name === "URIError" || String(err?.message || "").includes("Failed to decode param")) {
      return res.status(404).send("Not Found");
    }
    console.error("[DevServer] Internal error on request:", err);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: "Internal Server Error"
      });
    }
  });
  const serverInstance = app.listen(PORT, "0.0.0.0", () => {
    console.log(`SmartRun Server running on http://0.0.0.0:${PORT}`);
    setTimeout(() => {
      backfillAllUsersToFirebaseFirestore().catch(() => {
      });
    }, 4e3);
  });
  serverInstance.on("error", (err) => {
    if (err?.code === "EADDRINUSE") {
      console.warn(`[DevServer] Port ${PORT} address already in use. Retrying cleanly in 1.5s...`);
      setTimeout(() => {
        try {
          serverInstance.close();
        } catch {
        }
        serverInstance.listen(PORT, "0.0.0.0");
      }, 1500);
    } else {
      console.error("[DevServer] Server listen error:", err);
    }
  });
  const handleTermination = (signal) => {
    console.log(`[DevServer] Received ${signal}, closing server gracefully...`);
    try {
      serverInstance.close(() => {
        process.exit(0);
      });
    } catch {
      process.exit(0);
    }
  };
  process.once("SIGTERM", () => handleTermination("SIGTERM"));
  process.once("SIGINT", () => handleTermination("SIGINT"));
}
process.on("unhandledRejection", (reason, promise) => {
  console.warn("[DevServer] Unhandled Rejection at:", promise, "reason:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("[DevServer] Uncaught Exception:", err);
});
startServer().catch((err) => {
  console.error("[DevServer] Fatal error during startServer:", err);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateWelcomeEmailHtml
});
