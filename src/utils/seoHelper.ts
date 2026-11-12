/**
 * SmartRun SEO & Geo Optimization Engine
 * Provides server-side micro-prerendering, dynamic meta tag injection,
 * Schema.org JSON-LD graph generation, and dynamic XML sitemap generation.
 */

export interface ProductMetaSource {
  id: string;
  name: string;
  brand?: string;
  category?: string;
  subCategory?: string;
  price?: number;
  originalPrice?: number;
  description?: string;
  image?: string;
  images?: string[];
  inStock?: boolean;
  rating?: number;
  reviewsCount?: number;
  specs?: Record<string, string>;
  reviews?: Array<{
    id?: string;
    customerName?: string;
    rating?: number;
    comment?: string;
    date?: string;
  }>;
}

export interface TechnicianMetaSource {
  id: string;
  name: string;
  title?: string;
  badgeId?: string;
  experienceYears?: number;
  primarySector?: string;
  rating?: number;
  reviewsCount?: number;
  photo?: string;
  serviceAreas?: string[];
  licenseNumber?: string;
  issuingAuthority?: string;
  startingRate?: number;
  about?: string;
  aiDescription?: string;
  recentReviews?: Array<{
    id?: string;
    customerName?: string;
    rating?: number;
    comment?: string;
    date?: string;
  }>;
}

export function escapeHtml(str: unknown): string {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function escapeXml(str: unknown): string {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export interface RouteSeoConfig {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogType?: string;
  image?: string;
  structuredData?: Record<string, unknown>;
}

export function getRouteSeoConfig(
  reqPath: string,
  product?: ProductMetaSource | null,
  technician?: TechnicianMetaSource | null
): RouteSeoConfig {
  const cleanPath = reqPath.split('?')[0].replace(/\/+$/, '') || '/';
  const canonical = `https://www.smartrun.in${cleanPath === '/' ? '/' : cleanPath}`;

  // 1. Dynamic Product Page SEO
  if (product) {
    const brand = product.brand || 'SmartRun';
    const price = product.price ? `₹${product.price}` : 'Wholesale Price';
    const subcat = product.subCategory ? ` (${product.subCategory})` : '';
    const title = `${product.name} - Buy Online in Kolkata | SmartRun (Smart Run)`;
    const description = `Buy genuine ${brand} ${product.name}${subcat} at ${price} online in Kolkata on SmartRun (Smart Run). 60-min express delivery across Kolkata & West Bengal, 100% manufacturer warranty.`;
    const keywords = `${product.name}, buy ${product.name} online, ${brand}, ${product.name} Kolkata price, ${product.subCategory || ''}, kolkata online delivery app for electrical products, kolkata online delivery app for construction products, smart run, SmartRun, wholesale electrical shop Kolkata, Kasba depot`;
    const image = product.image || 'https://www.smartrun.in/SmartRun.png';

    const imagesArray = Array.from(
      new Set([
        image,
        ...(Array.isArray(product.images) ? product.images : []),
        'https://www.smartrun.in/SmartRun.png',
        'https://www.smartrun.in/icons/icon-512.png'
      ])
    ).filter(Boolean);

    const prodId = String(product.id || 'PRD');
    const sku = `SMARTRUN-${prodId.slice(0, 8).toUpperCase()}`;
    const mpn = `SR-${brand.replace(/\s+/g, '').toUpperCase()}-${prodId.slice(0, 8).toUpperCase()}`;

    const productBreadcrumbs = {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.smartrun.in/'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: product.category === 'construction' ? 'Construction Materials' : 'Electrical Goods',
          item: product.category === 'construction' ? 'https://www.smartrun.in/construction' : 'https://www.smartrun.in/electrical'
        },
        ...(product.subCategory
          ? [
              {
                '@type': 'ListItem',
                position: 3,
                name: product.subCategory,
                item: `https://www.smartrun.in/${product.category === 'construction' ? 'construction' : 'electrical'}?cat=${encodeURIComponent(product.subCategory)}`
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: product.name,
                item: canonical
              }
            ]
          : [
              {
                '@type': 'ListItem',
                position: 3,
                name: product.name,
                item: canonical
              }
            ])
      ]
    };

    const productSchema: Record<string, unknown> = {
      '@type': 'Product',
      productID: prodId,
      sku,
      mpn,
      name: product.name,
      image: imagesArray,
      description,
      category: product.category === 'construction' ? 'Construction & Building Materials' : 'Electrical Supplies',
      brand: {
        '@type': 'Brand',
        name: brand
      },
      offers: {
        '@type': 'Offer',
        url: canonical,
        priceCurrency: 'INR',
        price: product.price || 0,
        priceValidUntil: '2027-12-31',
        availability: product.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
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

    // Include aggregateRating ONLY when verified ratings exist (never fabricate fake ratings)
    if (typeof product.rating === 'number' && product.rating > 0 && typeof product.reviewsCount === 'number' && product.reviewsCount > 0) {
      productSchema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewsCount,
        bestRating: 5,
        worstRating: 1
      };
    }

    // Include genuine reviews when provided
    if (Array.isArray(product.reviews) && product.reviews.length > 0) {
      productSchema.review = product.reviews.map((r) => ({
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

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [productBreadcrumbs, productSchema]
    };

    return {
      title,
      description,
      keywords,
      canonical,
      ogType: 'product',
      image,
      structuredData
    };
  }

  // 2. Dynamic Technician Profile Page SEO
  if (technician || cleanPath.startsWith('/technicians/')) {
    const techName = technician?.name || 'Certified Electrical Specialist';
    const sector = technician?.primarySector || 'Residential & Commercial Wiring';
    const rating = technician?.rating || 4.9;
    const areas = technician?.serviceAreas && technician.serviceAreas.length > 0
      ? technician.serviceAreas.join(', ')
      : 'Kasba, Salt Lake, New Town, Gariahat, Ballygunge, Kolkata';

    const title = `${techName} - Certified ${sector} | SmartRun Kolkata`;
    const description = `${techName} (${rating}★ rating, ${technician?.experienceYears || 8}+ yrs exp) - Verified electrical specialist in Kolkata serving ${areas}. 60-minute emergency arrival for house wiring, MCB distribution & switchgear repair.`;
    const keywords = `${techName}, certified electrician Kolkata, licensed electrical contractor, house wiring specialist, emergency electrician 60 mins, switchboard repair Kolkata`;
    const image = technician?.photo || 'https://www.smartrun.in/SmartRun.png';

    const techBreadcrumbs = {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.smartrun.in/'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Certified Technicians',
          item: 'https://www.smartrun.in/technicians'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: techName,
          item: canonical
        }
      ]
    };

    const techServiceSchema: Record<string, unknown> = {
      '@type': ['Person', 'ProfessionalService'],
      name: techName,
      jobTitle: technician?.title || 'Certified Electrical Engineer & Master Wireman',
      image,
      telephone: '+91-8777400280',
      url: canonical,
      priceRange: technician?.startingRate ? `₹${technician.startingRate} - ₹1499` : '₹499 - ₹1499',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kasba Industrial Estate Phase 1',
        addressLocality: 'Kolkata',
        addressRegion: 'West Bengal',
        postalCode: '700107',
        addressCountry: 'IN'
      },
      areaServed: (technician?.serviceAreas || ['Kolkata', 'Kasba', 'Salt Lake', 'New Town']).map((a) => ({
        '@type': 'AdministrativeArea',
        name: a
      }))
    };

    if (technician?.licenseNumber) {
      techServiceSchema.hasCredential = {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Government Electrical Supervisor / Wireman License',
        recognizedBy: {
          '@type': 'Organization',
          name: technician.issuingAuthority || 'Govt. of West Bengal - Electrical Licensing Board'
        }
      };
    }

    if (technician?.rating && technician.rating > 0) {
      techServiceSchema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: technician.rating,
        reviewCount: technician?.reviewsCount || 1,
        bestRating: 5,
        worstRating: 1
      };
    }

    if (Array.isArray(technician?.recentReviews) && technician.recentReviews.length > 0) {
      techServiceSchema.review = technician.recentReviews.map((r) => ({
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

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [techBreadcrumbs, techServiceSchema]
    };

    return {
      title,
      description,
      keywords,
      canonical,
      ogType: 'profile',
      image,
      structuredData
    };
  }

  // 3. Category & Core Landing Pages
  if (cleanPath === '/') {
    const homeStructuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://www.smartrun.in/#website',
          url: 'https://www.smartrun.in/',
          name: 'SmartRun',
          alternateName: ['Smart Run', 'SmartRun materials pvt. ltd', 'SmartRun Kolkata'],
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://www.smartrun.in/electrical?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        },
        {
          '@type': ['Organization', 'ElectricalSupplyStore', 'HardwareStore', 'LocalBusiness'],
          '@id': 'https://www.smartrun.in/#store',
          name: 'SmartRun',
          legalName: 'SmartRun materials pvt. ltd',
          url: 'https://www.smartrun.in/',
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
            { '@type': 'AdministrativeArea', name: 'Ballygunge' }
          ],
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              opens: '08:00',
              closes: '21:00'
            }
          ]
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://www.smartrun.in/'
            }
          ]
        }
      ]
    };

    return {
      title: 'SmartRun (Smart Run) - Kolkata Online Delivery App for Electrical & Construction Products',
      description: "SmartRun (Smart Run) by SmartRun materials pvt. ltd: Kolkata's #1 express online delivery app for genuine electrical products, Polycab wires, Schneider MCBs, modular switches, UltraTech cement, Tata Tiscon steel rebars, and licensed electricians with 60-min delivery.",
      keywords: 'Smart Run, SmartRun, smart run, smartrun, smart run app, smartrun app, smart run kolkata, kolkata online delivery app for electrical products, kolkata online delivery app for construction products, online delivery app for electrical products, electrical products delivery app, construction products delivery app kolkata, buy electrical goods online Kolkata, electrical shop near me, house wiring contractor, electrical wiring services, modular switches, Polycab wire, Havells cables, Finolex wire, Schneider MCB, distribution board, LED lighting, construction materials Kolkata, cement delivery, UltraTech cement, ACC cement, TMT steel bars, Tata Tiscon rebars, waterproofing chemicals, real estate electrification, licensed electrician Kolkata, emergency electrician 60 mins, Kasba electrical shop, wholesale electrical market Kolkata, B2B building materials procurement, direct factory depot Kolkata, in.smartrun.app',
      canonical,
      ogType: 'website',
      image: 'https://www.smartrun.in/SmartRun.png',
      structuredData: homeStructuredData
    };
  }

  if (cleanPath === '/electrical') {
    return {
      title: 'Electrical Products Online Delivery Kolkata | SmartRun (Smart Run) - 60 Min Express',
      description: "Kolkata's #1 online delivery app for electrical products: Polycab wires, Schneider MCBs, Havells cables, Anchor Roma modular switches with 60-minute delivery to your doorstep or site by SmartRun (Smart Run).",
      keywords: 'kolkata online delivery app for electrical products, electrical products delivery app, buy electrical goods online Kolkata, Polycab wire, Havells cables, Schneider MCB, Smart Run, SmartRun, house wiring Kolkata, Kasba electrical depot',
      canonical,
      ogType: 'website',
      image: 'https://www.smartrun.in/SmartRun.png',
      structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.smartrun.in/' },
              { '@type': 'ListItem', position: 2, name: 'Electrical Goods', item: canonical }
            ]
          },
          {
            '@type': 'CollectionPage',
            '@id': 'https://www.smartrun.in/electrical#webpage',
            name: 'Electrical Goods & House Wiring Cables Kolkata',
            description: 'Wholesale and retail electrical supplies with 60-minute express delivery in Kolkata.',
            url: canonical,
            isPartOf: { '@id': 'https://www.smartrun.in/#website' }
          }
        ]
      }
    };
  }

  if (cleanPath === '/construction') {
    return {
      title: 'Construction Products & Building Materials Delivery Kolkata | SmartRun (Smart Run)',
      description: "Kolkata's #1 online delivery app for construction products: UltraTech cement, ACC cement, Tata Tiscon TMT rebars, waterproofing chemicals delivered direct to your site in 60 mins by SmartRun (Smart Run).",
      keywords: 'kolkata online delivery app for construction products, construction products delivery app kolkata, cement delivery Kolkata, UltraTech cement, Tata Tiscon rebars, Dr Fixit, Smart Run, SmartRun, building materials Kolkata',
      canonical,
      ogType: 'website',
      image: 'https://www.smartrun.in/SmartRun.png',
      structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.smartrun.in/' },
              { '@type': 'ListItem', position: 2, name: 'Construction Materials', item: canonical }
            ]
          },
          {
            '@type': 'CollectionPage',
            '@id': 'https://www.smartrun.in/construction#webpage',
            name: 'Construction & Building Materials Kolkata',
            description: 'Direct site delivery of UltraTech cement, ACC cement, Tata Tiscon TMT rebars, and building hardware in Kolkata.',
            url: canonical,
            isPartOf: { '@id': 'https://www.smartrun.in/#website' }
          }
        ]
      }
    };
  }

  if (cleanPath === '/technicians') {
    return {
      title: 'Licensed Electricians & Wiring Contractors Kolkata | SmartRun (Smart Run)',
      description: 'Book licensed emergency electricians and wiring contractors in Kolkata. 60-minute doorstep arrival, upfront transparent pricing, residential flat wiring & switchboard repairs by SmartRun (Smart Run).',
      keywords: 'licensed electrician Kolkata, house wiring contractor Kolkata, emergency electrical repair, electrical wiring services, Smart Run, SmartRun, flat wiring Kolkata',
      canonical,
      ogType: 'website',
      image: 'https://www.smartrun.in/SmartRun.png',
      structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.smartrun.in/' },
              { '@type': 'ListItem', position: 2, name: 'Certified Technicians', item: canonical }
            ]
          },
          {
            '@type': 'CollectionPage',
            '@id': 'https://www.smartrun.in/technicians#webpage',
            name: 'Licensed Electricians & Wiring Contractors Directory Kolkata',
            description: 'Verified professional electrical engineers and master wiremen with 60-minute emergency arrival across Kolkata.',
            url: canonical,
            isPartOf: { '@id': 'https://www.smartrun.in/#website' }
          }
        ]
      }
    };
  }

  if (cleanPath === '/shipping' || cleanPath === '/shipping-policy' || cleanPath === '/shipping-and-return-policy') {
    return {
      title: 'Shipping & 60-Minute Delivery Policy | SmartRun (Smart Run)',
      description: 'SmartRun (Smart Run) shipping policy: 60-minute express doorstep delivery across Kolkata from Kasba Central Depot. Order tracking, service areas, and delivery fees.',
      keywords: 'SmartRun shipping policy, smart run delivery time, express electrical delivery Kolkata, Kasba depot delivery',
      canonical,
      ogType: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.smartrun.in/' },
              { '@type': 'ListItem', position: 2, name: 'Shipping Policy', item: canonical }
            ]
          },
          {
            '@type': 'WebPage',
            '@id': `${canonical}#webpage`,
            name: 'SmartRun 60-Minute Express Shipping & Delivery Policy',
            description: 'SmartRun shipping policy: 60-minute express doorstep delivery across Kolkata from Kasba Central Depot. Order tracking, service areas, and delivery fees.',
            url: canonical,
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
          }
        ]
      }
    };
  }

  if (cleanPath === '/return' || cleanPath === '/return-policy' || cleanPath === '/returns') {
    return {
      title: 'Return Policy & 7-Day Replacement Guarantee | SmartRun (Smart Run)',
      description: 'SmartRun (Smart Run) return policy: 7-day hassle-free return and replacement for electrical goods, wires, switches, and construction materials with doorstep pickup.',
      keywords: 'SmartRun return policy, smart run replacement guarantee, return electrical items Kolkata',
      canonical,
      ogType: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.smartrun.in/' },
              { '@type': 'ListItem', position: 2, name: 'Return Policy', item: canonical }
            ]
          },
          {
            '@type': 'WebPage',
            '@id': `${canonical}#webpage`,
            name: 'SmartRun 7-Day Hassle-Free Return & Replacement Policy',
            description: 'SmartRun return policy: 7-day hassle-free return and replacement for electrical goods, wires, switches, and construction materials with doorstep pickup.',
            url: canonical,
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
          }
        ]
      }
    };
  }

  if (cleanPath === '/refund-policy' || cleanPath === '/refund' || cleanPath === '/refunds') {
    return {
      title: 'Refund Policy & Instant Settlement Guarantee | SmartRun (Smart Run)',
      description: 'SmartRun (Smart Run) refund policy: 100% money-back guarantee with 2 to 4 hour instant bank settlement on verified cancellations.',
      keywords: 'SmartRun refund policy, smart run money back guarantee, instant refund settlement',
      canonical,
      ogType: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.smartrun.in/' },
              { '@type': 'ListItem', position: 2, name: 'Refund Policy', item: canonical }
            ]
          },
          {
            '@type': 'WebPage',
            '@id': `${canonical}#webpage`,
            name: 'SmartRun Instant Direct-to-Source Refund Policy',
            description: 'SmartRun refund policy: 100% money-back guarantee with 2 to 4 hour instant bank settlement on verified cancellations.',
            url: canonical,
            isPartOf: { '@id': 'https://www.smartrun.in/#website' },
            mainEntity: {
              '@type': 'MerchantReturnPolicy',
              applicableCountry: 'IN',
              returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
              merchantReturnDays: 7,
              returnFees: 'https://schema.org/FreeReturn',
              refundType: 'https://schema.org/FullRefund'
            }
          }
        ]
      }
    };
  }

  if (cleanPath === '/faqs' || cleanPath === '/faq') {
    return {
      title: 'Frequently Asked Questions (FAQ) | SmartRun Kolkata',
      description: 'Find answers about 60-minute express delivery, order tracking, bulk contractor discounts, GST invoices, and return policies on SmartRun.',
      keywords: 'SmartRun faq, electrical delivery faq, bulk construction materials discount, gst invoice electricals kolkata',
      canonical,
      ogType: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.smartrun.in/' },
              { '@type': 'ListItem', position: 2, name: 'Frequently Asked Questions', item: canonical }
            ]
          },
          {
            '@type': 'FAQPage',
            '@id': `${canonical}#webpage`,
            name: 'Frequently Asked Questions (FAQ) | SmartRun Kolkata',
            url: canonical,
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
          }
        ]
      }
    };
  }

  if (cleanPath === '/about' || cleanPath === '/about-us') {
    return {
      title: 'About Us | SmartRun Express Electricals & Construction Depot Kolkata',
      description: "Learn about SmartRun, Kolkata's premier quick-commerce depot supplying genuine electrical goods, construction materials, and certified electrician wiring services.",
      keywords: 'about smartrun, smartrun kolkata, electrical goods depot kasba, building supplies wholesale kolkata',
      canonical,
      ogType: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.smartrun.in/' },
              { '@type': 'ListItem', position: 2, name: 'About Us', item: canonical }
            ]
          },
          {
            '@type': 'AboutPage',
            '@id': `${canonical}#webpage`,
            name: 'About SmartRun Express Electricals & Construction Depot',
            description: "SmartRun (SmartRun materials pvt. ltd) is Kolkata's premier quick-commerce depot supplying genuine electrical goods, construction materials, and certified electrician wiring services.",
            url: canonical,
            isPartOf: { '@id': 'https://www.smartrun.in/#website' },
            about: { '@id': 'https://www.smartrun.in/#store' }
          }
        ]
      }
    };
  }

  if (cleanPath === '/privacy' || cleanPath === '/privacy-policy') {
    return {
      title: 'Privacy Policy | SmartRun',
      description: 'Understand how SmartRun collects, protects, and handles personal information in compliance with Indian IT Rules and data protection standards.',
      keywords: 'smartrun privacy policy, data security, user privacy electrical store',
      canonical,
      ogType: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.smartrun.in/' },
              { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: canonical }
            ]
          },
          {
            '@type': 'WebPage',
            '@id': `${canonical}#webpage`,
            name: 'Privacy Policy | SmartRun',
            description: 'Understand how SmartRun collects, protects, and handles personal information in compliance with Indian IT Rules and data protection standards.',
            url: canonical,
            isPartOf: { '@id': 'https://www.smartrun.in/#website' }
          }
        ]
      }
    };
  }

  if (cleanPath === '/terms' || cleanPath === '/terms-of-service') {
    return {
      title: 'Terms of Service | SmartRun',
      description: 'Review the legal terms and conditions governing the use of SmartRun website, mobile app, order placement, and electrician services.',
      keywords: 'smartrun terms of service, customer agreement, electrical contractor terms',
      canonical,
      ogType: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.smartrun.in/' },
              { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: canonical }
            ]
          },
          {
            '@type': 'WebPage',
            '@id': `${canonical}#webpage`,
            name: 'Terms of Service | SmartRun',
            description: 'Review the legal terms and conditions governing the use of SmartRun website, mobile app, order placement, and electrician services.',
            url: canonical,
            isPartOf: { '@id': 'https://www.smartrun.in/#website' }
          }
        ]
      }
    };
  }

  if (cleanPath === '/sitemap') {
    return {
      title: 'Sitemap & Directory | SmartRun Express Electricals Kolkata',
      description: 'Explore the complete directory of SmartRun: electrical supplies, building materials, certified electrician services, company policies, and direct links.',
      keywords: 'smartrun sitemap, site directory, electrical goods directory, construction materials index',
      canonical,
      ogType: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.smartrun.in/' },
              { '@type': 'ListItem', position: 2, name: 'Sitemap & Directory', item: canonical }
            ]
          },
          {
            '@type': 'CollectionPage',
            '@id': `${canonical}#webpage`,
            name: 'SmartRun Directory & Catalog Index',
            description: 'Explore the complete directory of SmartRun: electrical supplies, building materials, certified electrician services, company policies, and direct links.',
            url: canonical,
            isPartOf: { '@id': 'https://www.smartrun.in/#website' }
          }
        ]
      }
    };
  }

  if (cleanPath === '/how-to-use' || cleanPath === '/guide') {
    return {
      title: 'How to Use SmartRun App - Ordering & Delivery Guide',
      description: 'Step-by-step customer guide for ordering electrical supplies, booking certified electricians, tracking live GPS deliveries, and downloading GST tax invoices.',
      keywords: 'how to use smartrun, order electrical goods online, book electrician kolkata, track order gps',
      canonical,
      ogType: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.smartrun.in/' },
              { '@type': 'ListItem', position: 2, name: 'How to Use App', item: canonical }
            ]
          },
          {
            '@type': 'HowTo',
            '@id': `${canonical}#howto`,
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
          }
        ]
      }
    };
  }

  if (cleanPath === '/how-to-use' || cleanPath === '/guide') {
    return {
      title: 'How to Use SmartRun App - Ordering & Delivery Guide',
      description: 'Step-by-step customer guide for ordering electrical supplies, booking certified electricians, tracking live GPS deliveries, and downloading GST tax invoices.',
      keywords: 'how to use smartrun, order electrical goods online, book electrician kolkata, track order gps',
      canonical,
      ogType: 'website'
    };
  }

  // Fallback Default
  return {
    title: 'SmartRun (Smart Run) - Kolkata Online Delivery App for Electrical & Construction Products',
    description: "SmartRun (Smart Run) by SmartRun materials pvt. ltd: Kolkata's #1 express online delivery app for genuine electrical products, Polycab wires, Schneider MCBs, modular switches, UltraTech cement, Tata Tiscon steel rebars, and licensed electricians with 60-min delivery.",
    keywords: 'Smart Run, SmartRun, smart run, smartrun, smart run app, smartrun app, smart run kolkata, kolkata online delivery app for electrical products, kolkata online delivery app for construction products, online delivery app for electrical products, electrical products delivery app, construction products delivery app kolkata, buy electrical goods online Kolkata, electrical shop near me, house wiring contractor, electrical wiring services, modular switches, Polycab wire, Havells cables, Finolex wire, Schneider MCB, distribution board, LED lighting, construction materials Kolkata, cement delivery, UltraTech cement, ACC cement, TMT steel bars, Tata Tiscon rebars, waterproofing chemicals, real estate electrification, licensed electrician Kolkata, emergency electrician 60 mins, Kasba electrical shop, wholesale electrical market Kolkata, B2B building materials procurement, direct factory depot Kolkata, in.smartrun.app',
    canonical,
    ogType: 'website',
    image: 'https://www.smartrun.in/SmartRun.png'
  };
}

/**
 * Injects SEO metadata, OpenGraph tags, Twitter cards, and Schema.org JSON-LD
 * into an HTML template string before serving to crawlers or clients.
 */
export function injectSeoMetadata(
  html: string,
  reqPath: string,
  product?: ProductMetaSource | null,
  technician?: TechnicianMetaSource | null
): string {
  if (!html || typeof html !== 'string') return html;

  const seo = getRouteSeoConfig(reqPath, product, technician);
  let result = html;


  // 1. Replace <title>
  if (result.includes('<title>')) {
    result = result.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);
  } else {
    result = result.replace('<head>', `<head>\n    <title>${escapeHtml(seo.title)}</title>`);
  }

  // 2. Replace meta title
  if (result.includes('name="title"')) {
    result = result.replace(/<meta\s+name="title"\s+content=".*?"\s*\/?>/i, `<meta name="title" content="${escapeHtml(seo.title)}" />`);
  }

  // 3. Replace meta description
  if (result.includes('name="description"')) {
    result = result.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${escapeHtml(seo.description)}" />`);
  }

  // 4. Replace meta keywords
  if (result.includes('name="keywords"')) {
    result = result.replace(/<meta\s+name="keywords"\s+content=".*?"\s*\/?>/i, `<meta name="keywords" content="${escapeHtml(seo.keywords)}" />`);
  }

  // 5. Replace canonical
  if (result.includes('rel="canonical"')) {
    result = result.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${seo.canonical}" />`);
  }

  // 5b. Sync international & regional hreflang alternates
  result = result.replace(/<link\s+rel="alternate"\s+hreflang="en-IN"\s+href=".*?"\s*\/?>/i, `<link rel="alternate" hreflang="en-IN" href="${seo.canonical}" />`);
  result = result.replace(/<link\s+rel="alternate"\s+hreflang="bn-IN"\s+href=".*?"\s*\/?>/i, `<link rel="alternate" hreflang="bn-IN" href="${seo.canonical}" />`);
  result = result.replace(/<link\s+rel="alternate"\s+hreflang="hi-IN"\s+href=".*?"\s*\/?>/i, `<link rel="alternate" hreflang="hi-IN" href="${seo.canonical}" />`);
  result = result.replace(/<link\s+rel="alternate"\s+hreflang="x-default"\s+href=".*?"\s*\/?>/i, `<link rel="alternate" hreflang="x-default" href="${seo.canonical}" />`);

  // 5c. Sync Google App Indexing deep link backlink
  const cleanSubPath = reqPath.replace(/^\//, '');
  result = result.replace(/<link\s+rel="alternate"\s+href="android-app:\/\/.*?"\s*\/?>/i, `<link rel="alternate" href="android-app://in.smartrun.app/smartrun/${cleanSubPath}" />`);
  result = result.replace(/<meta\s+property="al:android:url"\s+content=".*?"\s*\/?>/i, `<meta property="al:android:url" content="smartrun://${cleanSubPath || 'home'}" />`);


  // 6. Replace OpenGraph properties
  result = result.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(seo.title)}" />`);
  result = result.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(seo.description)}" />`);
  result = result.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${seo.canonical}" />`);
  if (seo.image) {
    result = result.replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i, `<meta property="og:image" content="${escapeHtml(seo.image)}" />`);
  }

  // 7. Replace Twitter Card properties
  result = result.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`);
  result = result.replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`);
  if (seo.image) {
    result = result.replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:image" content="${escapeHtml(seo.image)}" />`);
  }

  // 8. Inject specific Schema.org JSON-LD if provided
  if (seo.structuredData) {
    const jsonLdScript = `\n    <script type="application/ld+json" id="server-prerender-schema">${JSON.stringify(seo.structuredData)}</script>\n`;
    result = result.replace('</head>', `${jsonLdScript}</head>`);
  }

  return result;
}

/**
 * Dynamically builds a full XML sitemap containing all core routes
 * and all catalog products with image markup.
 */
export function generateDynamicSitemap(
  products: ProductMetaSource[],
  technicians?: TechnicianMetaSource[]
): string {
  const today = new Date().toISOString().split('T')[0];

  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/electrical', priority: '0.95', changefreq: 'daily' },
    { path: '/construction', priority: '0.95', changefreq: 'daily' },
    { path: '/technicians', priority: '0.9', changefreq: 'daily' },
    { path: '/sitemap', priority: '0.8', changefreq: 'weekly' },
    { path: '/faqs', priority: '0.8', changefreq: 'weekly' },
    { path: '/how-to-use', priority: '0.8', changefreq: 'weekly' },
    { path: '/shipping', priority: '0.8', changefreq: 'monthly' },
    { path: '/shipping-policy', priority: '0.8', changefreq: 'monthly' },
    { path: '/return', priority: '0.8', changefreq: 'monthly' },
    { path: '/return-policy', priority: '0.8', changefreq: 'monthly' },
    { path: '/refund-policy', priority: '0.8', changefreq: 'monthly' },
    { path: '/terms', priority: '0.7', changefreq: 'monthly' },
    { path: '/privacy', priority: '0.7', changefreq: 'monthly' },
    { path: '/about', priority: '0.7', changefreq: 'monthly' },
    { path: '/contact', priority: '0.7', changefreq: 'monthly' },
    { path: '/career', priority: '0.7', changefreq: 'monthly' }
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  // Static routes
  for (const route of staticRoutes) {
    xml += `  <url>\n`;
    xml += `    <loc>https://www.smartrun.in${route.path}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // Technician profile routes
  if (Array.isArray(technicians)) {
    for (const tech of technicians) {
      if (!tech || !tech.id) continue;
      const techPath = `/technicians/${tech.id}`;
      const techPhoto = tech.photo || 'https://www.smartrun.in/SmartRun.png';
      const techName = escapeXml(tech.name);
      const techDesc = escapeXml(
        tech.about || `${tech.name} - Certified electrical specialist in Kolkata with 60-minute emergency visit.`
      );

      xml += `  <url>\n`;
      xml += `    <loc>https://www.smartrun.in${techPath}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.85</priority>\n`;
      if (techPhoto) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${escapeXml(techPhoto)}</image:loc>\n`;
        xml += `      <image:title>${techName}</image:title>\n`;
        xml += `      <image:caption>${techDesc}</image:caption>\n`;
        xml += `    </image:image>\n`;
      }
      xml += `  </url>\n`;
    }
  }

  // Product routes
  if (Array.isArray(products)) {
    for (const prod of products) {
      if (!prod || !prod.id) continue;
      const isConst = prod.category === 'construction';
      const prodPath = isConst ? `/construction/product/${prod.id}` : `/electrical/product/${prod.id}`;
      const imgUrl = prod.image || 'https://www.smartrun.in/SmartRun.png';
      const prodName = escapeXml(prod.name);
      const prodDesc = escapeXml(prod.description || `${prod.name} available at SmartRun Kolkata with 60-min express delivery.`);

      xml += `  <url>\n`;
      xml += `    <loc>https://www.smartrun.in${prodPath}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>0.9</priority>\n`;
      if (imgUrl) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${escapeXml(imgUrl)}</image:loc>\n`;
        xml += `      <image:title>${prodName}</image:title>\n`;
        xml += `      <image:caption>${prodDesc}</image:caption>\n`;
        xml += `    </image:image>\n`;
      }
      xml += `  </url>\n`;
    }
  }

  xml += `</urlset>`;
  return xml;
}

/**
 * Dynamically generates a valid RSS 2.0 XML syndication feed
 * containing channel metadata and product entries with followed permalinks.
 */
export function generateRssFeed(products: ProductMetaSource[]): string {
  const now = new Date().toUTCString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n`;
  xml += `  <channel>\n`;
  xml += `    <title>SmartRun (Smart Run) - Kolkata Express Electrical &amp; Construction Supplies Feed</title>\n`;
  xml += `    <link>https://www.smartrun.in</link>\n`;
  xml += `    <description>Latest genuine electrical products, Polycab copper cables, Schneider switchgear, UltraTech cement, and licensed electricians with 60-min express delivery in Kolkata.</description>\n`;
  xml += `    <language>en-in</language>\n`;
  xml += `    <lastBuildDate>${now}</lastBuildDate>\n`;
  xml += `    <atom:link href="https://www.smartrun.in/rss.xml" rel="self" type="application/rss+xml" />\n`;

  if (Array.isArray(products)) {
    for (const prod of products) {
      if (!prod || !prod.id) continue;
      const isConst = prod.category === 'construction';
      const prodPath = isConst ? `/construction/product/${prod.id}` : `/electrical/product/${prod.id}`;
      const prodUrl = `https://www.smartrun.in${prodPath}`;
      const prodName = escapeXml(prod.name);
      const prodDesc = escapeXml(prod.description || `${prod.name} available at SmartRun Kolkata with 60-min express delivery.`);
      const brand = escapeXml(prod.brand || 'SmartRun');
      const category = isConst ? 'Construction Materials' : 'Electrical Supplies';

      xml += `    <item>\n`;
      xml += `      <title>${prodName} - ${brand} | SmartRun Kolkata</title>\n`;
      xml += `      <link>${prodUrl}</link>\n`;
      xml += `      <guid isPermaLink="true">${prodUrl}</guid>\n`;
      xml += `      <description>${prodDesc}</description>\n`;
      xml += `      <category>${category}</category>\n`;
      xml += `      <pubDate>${now}</pubDate>\n`;
      xml += `    </item>\n`;
    }
  }

  xml += `  </channel>\n`;
  xml += `</rss>`;
  return xml;
}

