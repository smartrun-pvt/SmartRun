export interface FAQItem {
  id: string;
  category: 'security' | 'delivery' | 'products' | 'billing' | 'payments' | 'returns' | 'electricians';
  question: string;
  answer: string;
  actionLink?: {
    text: string;
    url: string;
  };
}

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Topics' },
  { id: 'security', label: 'Security & Login' },
  { id: 'delivery', label: '60-Min Express' },
  { id: 'products', label: 'Genuine Materials' },
  { id: 'billing', label: 'GST Invoices' },
  { id: 'payments', label: 'Payments & COD' },
  { id: 'returns', label: 'Returns & Refunds' },
  { id: 'electricians', label: 'Electricians & Hub' }
] as const;

export const ENRICHED_FAQ_LIST: FAQItem[] = [
  // --- SECTION 1: 60-MINUTE EXPRESS DELIVERY & SERVICE AREAS ---
  {
    id: 'delivery-speed',
    category: 'delivery',
    question: 'How fast is express delivery from SmartRun?',
    answer:
      'Standard electrical orders—including domestic house wires, switches, circuit breakers (MCBs), LED fixtures, junction boxes, and installation tools—are packed within minutes and delivered in 60 minutes across serviceable Kolkata zones from our Kasba Central Depot.'
  },
  {
    id: 'delivery-areas',
    category: 'delivery',
    question: 'Which areas and pincodes in Kolkata do you deliver to?',
    answer:
      'We deliver across serviceable Kolkata metropolitan PIN codes (700001–700160) and Howrah PIN codes (711101–711106), covering Kasba, Ballygunge, Gariahat, Jadavpur, Tollygunge, Behala, Salt Lake (Sector I–V), New Town, Rajarhat, Central Kolkata, Bhowanipore, Park Street, Dum Dum, Lake Town, and the EM Bypass corridor.',
    actionLink: {
      text: 'Check Pincode & Service Areas',
      url: '/delivery-areas'
    }
  },
  {
    id: 'delivery-tracking',
    category: 'delivery',
    question: 'Can I track my delivery partner live on a GPS map?',
    answer:
      'Yes. As soon as your order is dispatched from our Kasba depot, you can track your delivery partner’s live location, view their vehicle registration number, and monitor their estimated arrival time in real time inside the app or web tracker.'
  },
  {
    id: 'delivery-freight',
    category: 'delivery',
    question: 'Do you deliver heavy construction materials and building supplies?',
    answer:
      'Yes. For bulky construction and structural building materials—such as UltraTech and ACC cement bags, Tata Tiscon TMT rebars, rigid PVC conduit pipes, waterproofing drums, plywood sheets, and sanitary fixtures—we dispatch dedicated commercial pickup vehicles directly to your site.',
    actionLink: {
      text: 'Browse Construction Materials',
      url: '/construction'
    }
  },

  // --- SECTION 2: GENUINE MATERIALS, WIRE VARIANTS & APP ---
  {
    id: 'products-genuine',
    category: 'products',
    question: 'Are all electrical items, wires, and construction supplies genuine?',
    answer:
      'Yes. Inventory sold on SmartRun is sourced from authorized distributors and manufacturers including Polycab, Havells, RR Kabel, Finolex, Schneider Electric, Legrand, Anchor by Panasonic, Philips, UltraTech Cement, Tata Tiscon, Astral, Dr. Fixit, and Asian Paints, carrying standard ISI/BIS markings and original manufacturer warranties.'
  },
  {
    id: 'products-warranty',
    category: 'products',
    question: 'Do wires and electrical components carry manufacturer warranty?',
    answer:
      'Yes. Branded electrical goods include the official manufacturer warranty against manufacturing defects, alongside SmartRun’s 7-day doorstep replacement window if an item arrives damaged or non-functional.'
  },
  {
    id: 'products-colors-sizes',
    category: 'products',
    question: 'Can I select specific wire colors and gauge sizes?',
    answer:
      'Yes. Wires and pipes support standardized color selection (Red, Black, Blue, Yellow, Green, White, Grey) with real-time pricing, photos, and stock visibility across cross-sectional gauges such as 0.75 sq mm to 10.0 sq mm.'
  },
  {
    id: 'smartrun-android-app',
    category: 'products',
    question: 'Is there an official SmartRUN Android app for ordering materials?',
    answer:
      'Yes. SmartRUN: Materials Delivery (official package ID: in.smartrun.app) is available on the Google Play Store alongside the web platform at https://www.smartrun.in. Both platforms share real-time cart synchronization, pincode checks, live order GPS tracking, and downloadable GST invoices.',
    actionLink: {
      text: 'View SmartRUN App Details',
      url: '/app'
    }
  },

  // --- SECTION 3: GST TAX INVOICES & BULK CONTRACTOR PRICING ---
  {
    id: 'billing-gst',
    category: 'billing',
    question: 'Can I get an official GST tax invoice for business Input Tax Credit (ITC)?',
    answer:
      'Yes. Every order generates a statutory GST tax invoice with itemized HSN/SAC codes, CGST/SGST breakdown, and your registered company GSTIN for business accounting and Input Tax Credit (ITC). A4 PDF invoices can be downloaded anytime from your Order History.'
  },
  {
    id: 'billing-wholesale',
    category: 'billing',
    question: 'Do you offer contractor and bulk site procurement quotes?',
    answer:
      'Yes. Electrical contractors, site engineers, builders, and bulk buyers can order direct wholesale packs online or contact our Kasba contractor desk (+91 87774 00280 / team@smartrun.in) for commercial project schedules and bulk dispatch.',
    actionLink: {
      text: 'Contact Contractor Desk',
      url: '/contact'
    }
  },

  // --- SECTION 4: PAYMENTS & CASH ON DELIVERY (COD) ---
  {
    id: 'payments-modes',
    category: 'payments',
    question: 'What payment modes are supported?',
    answer:
      'SmartRun supports UPI (Google Pay, PhonePe, Paytm, BHIM), Credit and Debit Cards (Visa, MasterCard, RuPay), Net Banking via Razorpay, and Cash on Delivery (COD) on eligible orders across serviceable Kolkata pincodes.'
  },
  {
    id: 'payments-cod',
    category: 'payments',
    question: 'Is Cash on Delivery (COD) available?',
    answer:
      'Yes, Cash on Delivery is available across eligible retail orders in our Kolkata and Howrah serviceable network. You can also pay via UPI at your doorstep on arrival.'
  },
  {
    id: 'payments-security',
    category: 'payments',
    question: 'Is online payment secure on SmartRun?',
    answer:
      'Yes. Online transactions are processed through encrypted Razorpay payment gateways in compliance with Indian payment and RBI tokenization standards. SmartRun does not store your card CVV or PIN.'
  },

  // --- SECTION 5: RETURNS, CANCELLATIONS & REFUNDS ---
  {
    id: 'returns-replacements',
    category: 'returns',
    question: 'How do returns and replacements work?',
    answer:
      'SmartRun offers a 7-day doorstep return and replacement window for defective, damaged, or mismatched items. Raise a request from your Order History for reverse pickup and inspection.',
    actionLink: {
      text: 'View Return Policy',
      url: '/return'
    }
  },
  {
    id: 'returns-refund-timing',
    category: 'returns',
    question: 'How does the refund process work and when will I get my money back?',
    answer:
      'Once an order is cancelled before dispatch or an eligible return is verified, refunds are initiated directly to your original payment source (UPI/bank account/card) with standard banking settlement windows. View full settlement SLAs on our Refund Policy page.',
    actionLink: {
      text: 'View Refund Policy',
      url: '/refund-policy'
    }
  },
  {
    id: 'returns-cancellation',
    category: 'returns',
    question: 'Can I cancel an order after placing it?',
    answer:
      'Yes. You can cancel your order directly from the order tracking view prior to warehouse dispatch. Prepaid orders automatically trigger a direct-to-source refund upon cancellation.'
  },

  // --- SECTION 6: ELECTRICIAN BOOKING & HUB ADDRESSES ---
  {
    id: 'electricians-booking',
    category: 'electricians',
    question: 'How do I book a verified electrician on SmartRun?',
    answer:
      'Open the Technician section on the web platform or mobile app to browse verified electricians in Kolkata, check their West Bengal Electrical Licensing Board credentials, experience, service zones, and request a visit.',
    actionLink: {
      text: 'Browse Certified Technicians',
      url: '/technicians'
    }
  },
  {
    id: 'hub-contact',
    category: 'electricians',
    question: 'Where are SmartRun’s office and dispatch depot located, and how do I contact support?',
    answer:
      'SmartRun Materials Pvt. Ltd. maintains its Registered Office at Kheyadah Village, Bhagabanpur, Kolkata 700150, West Bengal, and dispatches express orders from the SmartRun Kasba Central Depot at Kasba Industrial Estate Phase 1, Kolkata 700107. Support is open daily 08:00 AM – 09:00 PM IST via WhatsApp/Helpline +91 87774 00280, +91 90071 68561, or team@smartrun.in.',
    actionLink: {
      text: 'Visit Contact & Support Page',
      url: '/contact'
    }
  },

  // --- SECTION 7: SECURITY & LOGIN NOTIFICATIONS ---
  {
    id: 'security-login-alerts',
    category: 'security',
    question: 'Why did I receive an email saying "Important: Login from new device and location"?',
    answer:
      'SmartRun sends automated security alerts whenever your account is accessed from a new device, mobile browser, or IP network to help protect your profile, saved addresses, and order history. If the login was yours, no action is needed.',
    actionLink: {
      text: 'Manage Account Security',
      url: '/profile'
    }
  },
  {
    id: 'security-not-me',
    category: 'security',
    question: 'What should I do if a login alert was NOT from me?',
    answer:
      'Visit our Password Reset page immediately to invalidate active sessions and reset your password, or contact our support desk at +91 87774 00280 or team@smartrun.in.',
    actionLink: {
      text: 'Reset Login Password',
      url: '/reset-password'
    }
  },
  {
    id: 'security-was-me',
    category: 'security',
    question: 'What should I do if the login was made by me?',
    answer:
      'No action is required. You can safely ignore the security notification email.'
  },
  {
    id: 'security-location',
    category: 'security',
    question: 'Why does the login location show "Kolkata, India" or a nearby city?',
    answer:
      'Security alert locations are estimated from telecom ISP routing (Airtel, Jio, Vi, BSNL), which may map mobile data traffic to a regional metropolitan gateway rather than your exact street address.'
  },
  {
    id: 'security-passwords-otp',
    category: 'security',
    question: 'How does SmartRun protect my account and password?',
    answer:
      'SmartRun uses HTTPS/TLS encryption, hashed credentials, and OTP verification. SmartRun staff or delivery riders will never ask for your password or OTP.'
  }
];
