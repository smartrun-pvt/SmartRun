import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article' | 'product' | 'profile';
  noIndex?: boolean;
  breadcrumbs?: Array<{ name: string; path: string }>;
  productData?: {
    id?: string;
    sku?: string;
    mpn?: string;
    name: string;
    description?: string;
    price: number;
    originalPrice?: number;
    brand?: string;
    image?: string;
    images?: string[];
    inStock?: boolean;
    rating?: number;
    reviewsCount?: number;
    category?: string;
    reviews?: Array<{
      id?: string;
      customerName?: string;
      rating?: number;
      comment?: string;
      date?: string;
    }>;
  };
  technicianData?: {
    id?: string;
    name: string;
    title?: string;
    experienceYears?: number;
    primarySector?: string;
    rating?: number;
    reviewsCount?: number;
    photo?: string;
    serviceAreas?: string[];
    licenseNumber?: string;
    issuingAuthority?: string;
    startingRate?: number;
    recentReviews?: Array<{
      id?: string;
      customerName?: string;
      rating?: number;
      comment?: string;
      date?: string;
    }>;
  };
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

// Helpers for robust meta tag injection
const setOrUpdateMeta = (attrName: 'name' | 'property', attrValue: string, content: string) => {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const setOrUpdateCanonical = (href: string) => {
  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image,
  type = 'website',
  noIndex,
  breadcrumbs,
  productData,
  technicianData,
  structuredData
}) => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // Guard against blank root fallback overwriting explicit product/technician metadata
    const isBlankRootInstance = !title && !description && !productData && !technicianData && !structuredData;
    if (
      isBlankRootInstance &&
      (path.startsWith('/electrical/product/') ||
        path.startsWith('/construction/product/') ||
        path.startsWith('/product/') ||
        path.startsWith('/technicians/'))
    ) {
      return;
    }

    // 1. Determine Title & Meta Defaults Based on Current Route
    let defaultTitle = 'SmartRun (Smart Run): Electrical & Construction App Kolkata';
    let defaultDesc =
      'Order Polycab wires, Schneider MCBs, UltraTech cement & licensed electricians in Kolkata on SmartRun (Smart Run) with 60-min express delivery.';
    let defaultKeywords =
      'SmartRun, Smart Run, SmartRun Kolkata, SmartRun India, construction materials delivery Kolkata, electrical materials delivery Kolkata, building supplies online, electrical supplies online, Polycab wire, Havells cables, Finolex wire, Schneider MCB, Anchor Roma switches, UltraTech cement, Tata Tiscon TMT rebars, licensed electrician Kolkata, in.smartrun.app';
    let defaultType = type;
    let shouldNoIndex = noIndex ?? false;

    if (path === '/') {
      defaultTitle = 'SmartRun (Smart Run): Electrical & Construction App Kolkata';
      defaultDesc = 'Order Polycab wires, Schneider MCBs, UltraTech cement & licensed electricians in Kolkata on SmartRun (Smart Run) with 60-min express delivery.';
    } else if (path === '/electrical') {
      defaultTitle = 'Electrical Goods & House Wiring Cables Wholesale Kolkata | SmartRun';
      defaultDesc = 'Shop RR Kabel, Polycab, Havells copper wires, Schneider MCBs, distribution boards, and modular switches at factory-direct wholesale prices in Kolkata.';
      defaultKeywords = 'kolkata online delivery app for electrical products, electrical goods kolkata, polycab wire kolkata, rr kabel online, buy switches kolkata, schneider mcb, distribution board, electrical depot kolkata';
    } else if (path.startsWith('/electrical/product/') || path.startsWith('/product/')) {
      defaultType = 'product';
      defaultTitle = 'Genuine Electrical Supply & Hardware | SmartRun Kolkata Depot';
      defaultDesc = 'Buy genuine electrical goods with manufacturer warranty and 60-minute doorstep express delivery across Kolkata.';
    } else if (path === '/construction') {
      defaultTitle = 'Building Materials, UltraTech Cement & Tata TMT Steel Kolkata | SmartRun';
      defaultDesc = 'Procure construction supplies online: UltraTech & ACC cement, Tata Tiscon TMT rebars, waterproofing chemicals, and plumbing pipes with direct site delivery in Kolkata.';
      defaultKeywords = 'construction materials kolkata, ultratech cement kolkata, tata tiscon tmt rebars, building materials procurement, dr fixit waterproofing';
    } else if (path.startsWith('/construction/product/')) {
      defaultType = 'product';
      defaultTitle = 'Construction Materials & Building Supplies | SmartRun Kolkata';
      defaultDesc = 'High-grade certified construction materials, structural cement, and hardware supplies delivered on-demand to construction sites in Kolkata.';
    } else if (path === '/technicians') {
      defaultTitle = 'Certified Electricians & House Wiring Contractors Kolkata | SmartRun';
      defaultDesc = 'Book verified, licensed electrical contractors, home wiring technicians, switchboard repair, and industrial electrification specialists in Kolkata with instant booking.';
      defaultKeywords = 'electrician kolkata, licensed electrical contractor, home wiring specialist, switchboard repair kolkata, real estate electrification';
    } else if (path.startsWith('/technicians/')) {
      defaultTitle = 'Certified Electrician Specialist Profile | SmartRun Kolkata';
      defaultDesc = 'View verified technician expertise, government license details, customer ratings, and book on-site electrical wiring services in Kolkata.';
    } else if (path === '/cart') {
      defaultTitle = 'Shopping Cart & Instant Checkout | SmartRun Kolkata';
      defaultDesc = 'Review your electrical supplies and building materials cart with instant express delivery to your doorstep in Kolkata.';
      shouldNoIndex = true;
    } else if (path === '/orders') {
      defaultTitle = 'My Orders & Tax Invoices | SmartRun Express Depot';
      defaultDesc = 'View your active orders, past delivery history, download GST invoices, and reorder electrical supplies on SmartRun.';
      shouldNoIndex = true;
    } else if (path.startsWith('/live-order')) {
      defaultTitle = 'Live Order Tracking & GPS Delivery | SmartRun';
      defaultDesc = 'Track your SmartRun express delivery partner in real-time with live GPS coordinates, vehicle registration details, and instant rider contact.';
      shouldNoIndex = true;
    } else if (path === '/profile') {
      defaultTitle = 'My Profile & Saved Addresses | SmartRun';
      defaultDesc = 'Manage your SmartRun profile, saved job site addresses, wallet balance, GST tax details, and account preferences.';
      shouldNoIndex = true;
    } else if (path === '/login' || path === '/auth') {
      defaultTitle = 'Sign In / Register | SmartRun Express Electricals';
      defaultDesc = 'Sign in to your SmartRun account with mobile OTP or email to track express delivery orders, manage addresses, and access wholesale pricing.';
      defaultKeywords = 'smartrun login, smartrun sign in, electrical depot account, mobile otp login';
    } else if (path === '/reset-password') {
      defaultTitle = 'Reset Password | SmartRun';
      defaultDesc = 'Securely reset your password for your SmartRun customer account.';
      shouldNoIndex = true;
    } else if (path === '/sitemap') {
      defaultTitle = 'Sitemap & Directory | SmartRun Express Electricals Kolkata';
      defaultDesc = 'Explore the complete directory of SmartRun: electrical supplies, building materials, certified electrician services, company policies, and direct links.';
      defaultKeywords = 'smartrun sitemap, site directory, electrical goods directory, construction materials index';
    } else if (path === '/about' || path === '/about-us') {
      defaultTitle = 'About Us | SmartRun Express Electricals Kolkata';
      defaultDesc = 'Learn about SmartRun, Kolkata’s premier quick-commerce depot supplying genuine electrical goods, construction materials, and certified electrician wiring services.';
    } else if (path === '/faqs' || path === '/faq') {
      defaultTitle = 'Frequently Asked Questions (FAQ) | SmartRun';
      defaultDesc = 'Find answers about 60-minute express delivery, order tracking, bulk contractor discounts, GST invoices, and return policies on SmartRun.';
    } else if (path === '/return-policy' || path === '/return' || path === '/returns') {
      defaultTitle = 'Return Policy | SmartRun Kolkata';
      defaultDesc = 'Read SmartRun’s 7-day doorstep return policy: 100% free reverse courier pickup and instant replacement or direct refund across Kolkata.';
    } else if (path === '/refund-policy' || path === '/refunds' || path === '/refund') {
      defaultTitle = 'Refund Policy | SmartRun Kolkata';
      defaultDesc = 'Read SmartRun’s customer-first refund policy: instant direct-to-source UPI and bank refunds with zero deduction.';
    } else if (path === '/shipping-policy' || path === '/shipping' || path === '/shipping-and-return-policy') {
      defaultTitle = 'Shipping Policy | SmartRun Kolkata';
      defaultDesc = 'Learn about SmartRun’s 60-minute express courier delivery, service radius in Kolkata & Howrah, packaging standards, and tracking.';
    } else if (path === '/privacy' || path === '/privacy-policy') {
      defaultTitle = 'Privacy Policy | SmartRun';
      defaultDesc = 'Understand how SmartRun collects, protects, and handles personal information in compliance with Indian IT Rules and data protection standards.';
    } else if (path === '/terms' || path === '/terms-of-service') {
      defaultTitle = 'Terms of Service | SmartRun';
      defaultDesc = 'Review the legal terms and conditions governing the use of SmartRun website, mobile app, order placement, and electrician services.';
    } else if (path === '/delete' || path === '/account-deletion') {
      defaultTitle = 'Account & Data Deletion Portal | SmartRun';
      defaultDesc = 'Submit a request to permanently delete your SmartRun account and personal data in accordance with Google Play Developer policies.';
      shouldNoIndex = true;
    }

    // Product overrides
    if (productData) {
      defaultTitle = `${productData.name} | SmartRun Kolkata Depot`;
      defaultDesc = `Buy ${productData.name} online at ₹${productData.price} with 60-minute express delivery in Kolkata. 100% genuine with warranty at SmartRun.`;
    }

    // Technician overrides
    if (technicianData) {
      defaultType = 'profile';
      defaultTitle = `${technicianData.name} - Certified ${technicianData.primarySector || 'Electrician'} | SmartRun Kolkata`;
      defaultDesc = `${technicianData.name} (${technicianData.rating || 4.9}★) - Certified electrical specialist in Kolkata serving ${technicianData.serviceAreas?.join(', ') || 'Kolkata'}. Book instant on-site wiring and repair.`;
    }

    const computedTitle = title || defaultTitle;
    const computedDesc = description || defaultDesc;
    const computedKeywords = keywords || defaultKeywords;
    const computedImage = image || (productData?.image) || (technicianData?.photo) || 'https://www.smartrun.in/SmartRun.png';
    const canonicalUrl = `https://www.smartrun.in${path === '/' ? '/' : path}`;

    // 2. Set Document Title
    document.title = computedTitle;

    // 3. Set Primary HTML Meta Tags
    setOrUpdateMeta('name', 'title', computedTitle);
    setOrUpdateMeta('name', 'description', computedDesc);
    setOrUpdateMeta('name', 'keywords', computedKeywords);
    setOrUpdateMeta(
      'name',
      'robots',
      shouldNoIndex
        ? 'noindex, follow'
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    );

    // 4. Set Canonical Link
    setOrUpdateCanonical(canonicalUrl);

    // 5. Set OpenGraph Meta Tags (Multi-Aspect Ratio for Google Discover, Search & Social)
    setOrUpdateMeta('property', 'og:type', defaultType);
    setOrUpdateMeta('property', 'og:site_name', 'SmartRun');
    setOrUpdateMeta('property', 'og:url', canonicalUrl);
    setOrUpdateMeta('property', 'og:title', computedTitle);
    setOrUpdateMeta('property', 'og:description', computedDesc);
    setOrUpdateMeta('property', 'og:image', computedImage);
    setOrUpdateMeta('property', 'og:image:secure_url', computedImage);
    setOrUpdateMeta('property', 'og:image:width', '1200');
    setOrUpdateMeta('property', 'og:image:height', '630');
    setOrUpdateMeta('property', 'og:image:type', computedImage.endsWith('.png') ? 'image/png' : 'image/jpeg');
    setOrUpdateMeta('property', 'og:image:alt', computedTitle);
    setOrUpdateMeta('property', 'og:locale', 'en_IN');

    // Geographic Meta Tags & Dublin Core for Local Kolkata Ranking
    setOrUpdateMeta('name', 'geo.region', 'IN-WB');
    setOrUpdateMeta('name', 'geo.placename', 'Kolkata, Kasba, West Bengal, India');
    setOrUpdateMeta('name', 'geo.position', '22.5145;88.3882');
    setOrUpdateMeta('name', 'ICBM', '22.5145, 88.3882');
    setOrUpdateMeta('name', 'geo.country', 'IN');
    setOrUpdateMeta('name', 'DC.title', computedTitle);
    setOrUpdateMeta('name', 'DC.creator', 'SmartRun materials pvt. ltd');
    setOrUpdateMeta('name', 'DC.coverage', 'Kolkata, West Bengal, India');

    // 6. Set Twitter Card Meta Tags (summary_large_image for high CTR)
    setOrUpdateMeta('name', 'twitter:card', 'summary_large_image');
    setOrUpdateMeta('name', 'twitter:site', '@SmartRunIn');
    setOrUpdateMeta('name', 'twitter:title', computedTitle);
    setOrUpdateMeta('name', 'twitter:description', computedDesc);
    setOrUpdateMeta('name', 'twitter:image', computedImage);

    // 7. Inject Structured Data (JSON-LD)
    // Clean up any stale SSR prerender schema tag so client hydration does not create duplicate JSON-LD nodes
    const serverScript = document.getElementById('server-prerender-schema');
    if (serverScript) {
      serverScript.remove();
    }

    const scriptId = 'smartrun-dynamic-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaGraph: Array<Record<string, unknown>> = [];

    // BreadcrumbList Schema
    const breadcrumbItems: Array<{ '@type': string; position: number; name: string; item: string }> = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.smartrun.in/'
      }
    ];

    if (breadcrumbs && breadcrumbs.length > 0) {
      breadcrumbs.forEach((b, idx) => {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: idx + 2,
          name: b.name,
          item: b.path.startsWith('http') ? b.path : `https://www.smartrun.in${b.path}`
        });
      });
    } else if (path.startsWith('/electrical')) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Electrical Goods',
        item: 'https://www.smartrun.in/electrical'
      });
      if (productData) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 3,
          name: productData.name,
          item: canonicalUrl
        });
      }
    } else if (path.startsWith('/construction')) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Construction Materials',
        item: 'https://www.smartrun.in/construction'
      });
      if (productData) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 3,
          name: productData.name,
          item: canonicalUrl
        });
      }
    } else if (path.startsWith('/technicians')) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Certified Technicians',
        item: 'https://www.smartrun.in/technicians'
      });
      if (technicianData) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 3,
          name: technicianData.name,
          item: canonicalUrl
        });
      }
    } else if (path === '/sitemap') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Sitemap',
        item: 'https://www.smartrun.in/sitemap'
      });
    } else if (path === '/faqs' || path === '/faq') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Frequently Asked Questions',
        item: canonicalUrl
      });
    } else if (path === '/about' || path === '/about-us') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'About Us',
        item: canonicalUrl
      });
    } else if (path === '/shipping' || path === '/shipping-policy' || path === '/shipping-and-return-policy') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Shipping Policy',
        item: canonicalUrl
      });
    } else if (path === '/return' || path === '/return-policy' || path === '/returns') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Return Policy',
        item: canonicalUrl
      });
    } else if (path === '/refund-policy' || path === '/refund' || path === '/refunds') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Refund Policy',
        item: canonicalUrl
      });
    } else if (path === '/terms' || path === '/terms-of-service') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Terms of Service',
        item: canonicalUrl
      });
    } else if (path === '/privacy' || path === '/privacy-policy') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Privacy Policy',
        item: canonicalUrl
      });
    } else if (path === '/how-to-use' || path === '/guide') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'How to Use App',
        item: canonicalUrl
      });
    }

    schemaGraph.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems
    });

    // Homepage WebSite & Organization Schema (Entity Graph for Google Brand Indexing)
    if (path === '/') {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://www.smartrun.in/#website',
        url: 'https://www.smartrun.in/',
        name: 'SmartRUN',
        alternateName: [
          'Smart Run',
          'SmartRUN India',
          'Smart Run India',
          'SmartRUN Kolkata',
          'Smart Run construction delivery',
          'SmartRun materials pvt. ltd'
        ],
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://www.smartrun.in/electrical?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      });

      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': ['Organization', 'ElectricalSupplyStore', 'HardwareStore', 'LocalBusiness'],
        '@id': 'https://www.smartrun.in/#store',
        name: 'SmartRUN',
        alternateName: ['Smart Run', 'SmartRUN India', 'Smart Run India', 'SmartRUN Kolkata'],
        legalName: 'SmartRun materials pvt. ltd',
        url: 'https://www.smartrun.in/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.smartrun.in/SmartRun.png',
          width: 512,
          height: 512,
          caption: 'SmartRUN - Express Electrical & Construction Materials Delivery'
        },
        image: 'https://www.smartrun.in/SmartRun.png',
        telephone: '+91-8777400280',
        email: 'team@smartrun.in',
        priceRange: '₹₹',
        currenciesAccepted: 'INR',
        paymentAccepted: 'Cash, UPI, Credit Card, Debit Card, Net Banking',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Kheyadah Village, Bhagabanpur',
          addressLocality: 'Kolkata',
          addressRegion: 'West Bengal',
          postalCode: '700150',
          addressCountry: 'IN'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 22.5145,
          longitude: 88.3882
        },
        areaServed: [
          { '@type': 'City', name: 'Kolkata' },
          { '@type': 'AdministrativeArea', name: 'Kasba' },
          { '@type': 'AdministrativeArea', name: 'Salt Lake' },
          { '@type': 'AdministrativeArea', name: 'New Town' },
          { '@type': 'AdministrativeArea', name: 'Ballygunge' },
          { '@type': 'AdministrativeArea', name: 'Jadavpur' },
          { '@type': 'AdministrativeArea', name: 'Gariahat' },
          { '@type': 'AdministrativeArea', name: 'Behala' },
          { '@type': 'AdministrativeArea', name: 'Rajarhat' },
          { '@type': 'AdministrativeArea', name: 'Howrah' }
        ],
        sameAs: [
          'https://play.google.com/store/apps/details?id=in.smartrun.app',
          'https://wa.me/918777400280'
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '08:00',
            closes: '21:00'
          }
        ]
      });

      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': ['SoftwareApplication', 'MobileApplication'],
        '@id': 'https://www.smartrun.in/#android-app',
        name: 'SmartRUN: Materials Delivery',
        alternateName: ['Smart Run', 'SmartRun', 'Smart Run App', 'SmartRun Kolkata', 'SmartRun materials pvt. ltd'],
        operatingSystem: 'ANDROID',
        applicationCategory: 'ShoppingApplication',
        applicationSubCategory: 'Quick Commerce, Electrical Supplies & Construction Depot',
        downloadUrl: 'https://play.google.com/store/apps/details?id=in.smartrun.app',
        installUrl: 'https://play.google.com/store/apps/details?id=in.smartrun.app',
        sameAs: ['https://play.google.com/store/apps/details?id=in.smartrun.app'],
        author: {
          '@type': 'Organization',
          name: 'SmartRun materials pvt. ltd',
          url: 'https://www.smartrun.in'
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR'
        }
      });
    }

    // Specific Product Schema (Full Google Merchant Center & Google Shopping compliance)
    if (productData) {
      const prodId = productData.id || productData.sku || 'PRD';
      const prodSku = productData.sku || `SMARTRUN-${prodId.slice(0, 8).toUpperCase()}`;
      const prodMpn = productData.mpn || prodSku;

      const prodImages = Array.from(
        new Set([
          computedImage,
          ...(Array.isArray(productData.images) ? productData.images : []),
          'https://www.smartrun.in/SmartRun.png',
          'https://www.smartrun.in/icons/icon-512.png'
        ])
      ).filter(Boolean);

      const prodSchema: Record<string, unknown> = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        productID: prodId,
        sku: prodSku,
        mpn: prodMpn,
        name: productData.name,
        image: prodImages,
        description: productData.description || `${productData.name} available at SmartRun Kolkata with 60-min express delivery across West Bengal. 100% genuine guaranteed with instant manufacturer warranty.`,
        category: productData.category || 'Electrical & Construction Supplies',
        brand: {
          '@type': 'Brand',
          name: productData.brand || 'SmartRun'
        },
        offers: {
          '@type': 'Offer',
          url: canonicalUrl,
          priceCurrency: 'INR',
          price: productData.price,
          priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          availability: productData.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          itemCondition: 'https://schema.org/NewCondition',
          areaServed: {
            '@type': 'City',
            name: 'Kolkata',
            containedInPlace: {
              '@type': 'State',
              name: 'West Bengal'
            }
          },
          availableAtOrFrom: {
            '@type': 'Place',
            name: 'SmartRun Kasba Central Depot',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Kasba Industrial Estate Phase 1',
              addressLocality: 'Kolkata',
              addressRegion: 'West Bengal',
              postalCode: '700107',
              addressCountry: 'IN'
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 22.5145,
              longitude: 88.3934
            }
          },
          seller: {
            '@type': 'Organization',
            name: 'SmartRun (Smart Run)',
            legalName: 'SmartRun materials pvt. ltd',
            url: 'https://www.smartrun.in/'
          },
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'IN',
            returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
            merchantReturnDays: 7,
            returnMethod: 'https://schema.org/ReturnAtKiosk',
            returnFees: 'https://schema.org/FreeReturn',
            refundType: 'https://schema.org/FullRefund'
          },
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: '49',
              currency: 'INR'
            },
            shippingDestination: {
              '@type': 'DefinedRegion',
              addressCountry: 'IN',
              postalCodeRange: {
                postalCode: '700001-700160'
              }
            },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              handlingTime: {
                '@type': 'QuantitativeValue',
                minValue: 0,
                maxValue: 1,
                unitCode: 'DAY'
              },
              transitTime: {
                '@type': 'QuantitativeValue',
                minValue: 0,
                maxValue: 1,
                unitCode: 'DAY'
              }
            }
          }
        }
      };

      // Only add aggregateRating when genuine reviews exist
      if (typeof productData.rating === 'number' && productData.rating > 0 && typeof productData.reviewsCount === 'number' && productData.reviewsCount > 0) {
        prodSchema.aggregateRating = {
          '@type': 'AggregateRating',
          ratingValue: productData.rating,
          reviewCount: productData.reviewsCount,
          bestRating: 5,
          worstRating: 1
        };
      }

      // Add genuine customer reviews if provided
      if (Array.isArray(productData.reviews) && productData.reviews.length > 0) {
        prodSchema.review = productData.reviews.map((r) => ({
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: r.customerName || 'Verified Buyer'
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: r.rating || 5,
            bestRating: 5
          },
          reviewBody: r.comment || 'Verified purchase from SmartRun Kolkata depot.'
        }));
      }

      schemaGraph.push(prodSchema);
    }

    // Specific FAQPage Schema
    if (path === '/faqs' || path === '/faq') {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#webpage`,
        name: 'Frequently Asked Questions (FAQ) | SmartRun Kolkata',
        url: canonicalUrl,
        isPartOf: { '@id': 'https://www.smartrun.in/#website' },
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How fast is express delivery from SmartRun in Kolkata?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'SmartRun delivers verified electrical supplies and emergency components within 60 minutes across Kolkata and surrounding operational zones.'
            }
          },
          {
            '@type': 'Question',
            name: 'Are all electrical goods and cables genuine?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, 100% of our inventory is sourced directly from verified manufacturers including Polycab, RR Kabel, Havells, Schneider Electric, Legrand, and UltraTech.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I get GST tax invoices for business procurement?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, every order includes a statutory GST tax invoice with your registered GSTIN for full input tax credit (ITC) claims.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the return and replacement window?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'SmartRun provides a 7-day doorstep replacement or return window on eligible electrical supplies and hardware with free reverse pickup.'
            }
          },
          {
            '@type': 'Question',
            name: 'How are electricians on SmartRun verified?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All electrical supervisors and technicians hold official Class-1 or Master Wireman licenses from the Govt. of West Bengal Electrical Licensing Board.'
            }
          }
        ]
      });
    }

    // Specific Technician Schema (Google Local Professional & Person schema)
    if (technicianData) {
      const techSchema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': ['Person', 'ProfessionalService'],
        name: technicianData.name,
        jobTitle: technicianData.title || 'Certified Electrical Engineer & Master Wireman',
        image: technicianData.photo || computedImage,
        telephone: '+91-8777400280',
        url: canonicalUrl,
        priceRange: technicianData.startingRate ? `₹${technicianData.startingRate} - ₹1499` : '₹499 - ₹1499',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Kasba Industrial Estate Phase 1',
          addressLocality: 'Kolkata',
          addressRegion: 'West Bengal',
          postalCode: '700107',
          addressCountry: 'IN'
        },
        areaServed: (technicianData.serviceAreas || ['Kolkata', 'Kasba', 'Salt Lake', 'New Town']).map((a) => ({
          '@type': 'AdministrativeArea',
          name: a
        }))
      };

      if (technicianData.licenseNumber) {
        techSchema.hasCredential = {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Government Electrical Supervisor / Wireman License',
          recognizedBy: {
            '@type': 'Organization',
            name: technicianData.issuingAuthority || 'Govt. of West Bengal - Electrical Licensing Board'
          }
        };
      }

      if (typeof technicianData.rating === 'number' && technicianData.rating > 0) {
        techSchema.aggregateRating = {
          '@type': 'AggregateRating',
          ratingValue: technicianData.rating,
          reviewCount: technicianData.reviewsCount || 1,
          bestRating: 5,
          worstRating: 1
        };
      }

      if (Array.isArray(technicianData.recentReviews) && technicianData.recentReviews.length > 0) {
        techSchema.review = technicianData.recentReviews.map((r) => ({
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: r.customerName || 'Verified Client'
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: r.rating || 5,
            bestRating: 5
          },
          reviewBody: r.comment || 'Professional electrical service completed in Kolkata.'
        }));
      }

      schemaGraph.push(techSchema);
    }

    // Category CollectionPage Schema
    if (path === '/electrical') {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${canonicalUrl}#webpage`,
        name: 'Electrical Goods & House Wiring Cables Wholesale Kolkata',
        description: 'Wholesale and retail electrical supplies with 60-minute express delivery in Kolkata.',
        url: canonicalUrl,
        isPartOf: { '@id': 'https://www.smartrun.in/#website' }
      });
    } else if (path === '/construction') {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${canonicalUrl}#webpage`,
        name: 'Building Materials, UltraTech Cement & Tata TMT Steel Kolkata',
        description: 'Direct site delivery of UltraTech cement, ACC cement, Tata Tiscon TMT rebars, and building hardware in Kolkata.',
        url: canonicalUrl,
        isPartOf: { '@id': 'https://www.smartrun.in/#website' }
      });
    } else if (path === '/technicians') {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${canonicalUrl}#webpage`,
        name: 'Licensed Electricians & Wiring Contractors Directory Kolkata',
        description: 'Verified professional electrical engineers and master wiremen with 60-minute emergency arrival across Kolkata.',
        url: canonicalUrl,
        isPartOf: { '@id': 'https://www.smartrun.in/#website' }
      });
    } else if (path === '/about' || path === '/about-us') {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': `${canonicalUrl}#webpage`,
        name: 'About SmartRun Express Electricals & Construction Depot',
        description: "SmartRun (SmartRun materials pvt. ltd) is Kolkata's premier quick-commerce depot supplying genuine electrical goods, construction materials, and certified electrician wiring services.",
        url: canonicalUrl,
        isPartOf: { '@id': 'https://www.smartrun.in/#website' },
        about: { '@id': 'https://www.smartrun.in/#store' }
      });
    } else if (path === '/shipping' || path === '/shipping-policy' || path === '/shipping-and-return-policy') {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        name: 'SmartRun 60-Minute Express Shipping & Delivery Policy',
        description: 'SmartRun shipping policy: 60-minute express doorstep delivery across Kolkata from Kasba Central Depot. Order tracking, service areas, and delivery fees.',
        url: canonicalUrl,
        isPartOf: { '@id': 'https://www.smartrun.in/#website' },
        mainEntity: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '49',
            currency: 'INR'
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'IN',
            addressRegion: 'West Bengal',
            addressLocality: 'Kolkata'
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 0,
              maxValue: 1,
              unitCode: 'DAY'
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 0,
              maxValue: 1,
              unitCode: 'DAY'
            }
          }
        }
      });
    } else if (path === '/return' || path === '/return-policy' || path === '/returns') {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        name: 'SmartRun 7-Day Hassle-Free Return & Replacement Policy',
        description: 'SmartRun return policy: 7-day hassle-free return and replacement for electrical goods, wires, switches, and construction materials with doorstep pickup.',
        url: canonicalUrl,
        isPartOf: { '@id': 'https://www.smartrun.in/#website' },
        mainEntity: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'IN',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 7,
          returnMethod: 'https://schema.org/ReturnAtKiosk',
          returnFees: 'https://schema.org/FreeReturn',
          refundType: 'https://schema.org/FullRefund'
        }
      });
    } else if (path === '/refund-policy' || path === '/refund' || path === '/refunds') {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        name: 'SmartRun Instant Direct-to-Source Refund Policy',
        description: 'SmartRun refund policy: 100% money-back guarantee with 2 to 4 hour instant bank settlement on verified cancellations.',
        url: canonicalUrl,
        isPartOf: { '@id': 'https://www.smartrun.in/#website' },
        mainEntity: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'IN',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 7,
          returnFees: 'https://schema.org/FreeReturn',
          refundType: 'https://schema.org/FullRefund'
        }
      });
    } else if (path === '/terms' || path === '/terms-of-service') {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        name: 'Terms of Service | SmartRun',
        description: 'Review the legal terms and conditions governing the use of SmartRun website, mobile app, order placement, and electrician services.',
        url: canonicalUrl,
        isPartOf: { '@id': 'https://www.smartrun.in/#website' }
      });
    } else if (path === '/privacy' || path === '/privacy-policy') {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        name: 'Privacy Policy | SmartRun',
        description: 'Understand how SmartRun collects, protects, and handles personal information in compliance with Indian IT Rules and data protection standards.',
        url: canonicalUrl,
        isPartOf: { '@id': 'https://www.smartrun.in/#website' }
      });
    } else if (path === '/sitemap') {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${canonicalUrl}#webpage`,
        name: 'SmartRun Directory & Catalog Index',
        description: 'Explore the complete directory of SmartRun: electrical supplies, building materials, certified electrician services, company policies, and direct links.',
        url: canonicalUrl,
        isPartOf: { '@id': 'https://www.smartrun.in/#website' }
      });
    } else if (path === '/how-to-use' || path === '/guide') {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${canonicalUrl}#howto`,
        name: 'How to Order Electrical & Construction Materials in Kolkata via SmartRun',
        description: 'Step-by-step customer guide for ordering electrical supplies, booking certified electricians, tracking live GPS deliveries, and downloading GST tax invoices.',
        totalTime: 'PT60M',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Delivery Locality',
            text: 'Choose your delivery location in Kolkata (Kasba, Salt Lake, New Town, Gariahat, etc.) or detect via GPS.'
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Choose Electrical or Construction Supplies',
            text: 'Browse verified brands like Polycab, Havells, Schneider Electric, and UltraTech Cement.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Customize Wire Length & Color Swatches',
            text: 'Select required wire gauges (0.75 to 6.0 sqmm) and phase colors (Red, Black, Blue, Yellow, Green).'
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Instant Razorpay UPI or Cash on Delivery',
            text: 'Checkout seamlessly with Google Pay, PhonePe, Paytm, Cards, or pay Cash on Delivery.'
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Live GPS Tracking & 60-Minute Doorstep Delivery',
            text: 'Track your delivery partner on live maps as they deliver to your home or construction site in 60 minutes.'
          }
        ]
      });
    }

    // Custom injected structured data
    if (structuredData) {
      if (Array.isArray(structuredData)) {
        schemaGraph.push(...structuredData);
      } else {
        schemaGraph.push(structuredData);
      }
    }

    scriptTag.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': schemaGraph
    });

  }, [
    location.pathname,
    title,
    description,
    keywords,
    image,
    type,
    noIndex,
    breadcrumbs,
    productData,
    technicianData,
    structuredData
  ]);

  return null;
};
