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

export function getRouteSeoConfig(reqPath: string, product?: ProductMetaSource | null): RouteSeoConfig {
  const cleanPath = reqPath.split('?')[0].replace(/\/+$/, '') || '/';
  const canonical = `https://www.smartrun.in${cleanPath}`;

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

    const structuredData = {
      '@context': 'https://schema.org/',
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
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating || 4.8,
        reviewCount: product.reviewsCount || 42
      }
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

  // 2. Category & Core Landing Pages
  if (cleanPath === '/electrical') {
    return {
      title: 'Electrical Products Online Delivery Kolkata | SmartRun (Smart Run) - 60 Min Express',
      description: "Kolkata's #1 online delivery app for electrical products: Polycab wires, Schneider MCBs, Havells cables, Anchor Roma modular switches with 60-minute delivery to your doorstep or site by SmartRun (Smart Run).",
      keywords: 'kolkata online delivery app for electrical products, electrical products delivery app, buy electrical goods online Kolkata, Polycab wire, Havells cables, Schneider MCB, Smart Run, SmartRun, house wiring Kolkata, Kasba electrical depot',
      canonical,
      ogType: 'website',
      image: 'https://www.smartrun.in/SmartRun.png'
    };
  }

  if (cleanPath === '/construction') {
    return {
      title: 'Construction Products & Building Materials Delivery Kolkata | SmartRun (Smart Run)',
      description: "Kolkata's #1 online delivery app for construction products: UltraTech cement, ACC cement, Tata Tiscon TMT rebars, waterproofing chemicals delivered direct to your site in 60 mins by SmartRun (Smart Run).",
      keywords: 'kolkata online delivery app for construction products, construction products delivery app kolkata, cement delivery Kolkata, UltraTech cement, Tata Tiscon rebars, Dr Fixit, Smart Run, SmartRun, building materials Kolkata',
      canonical,
      ogType: 'website',
      image: 'https://www.smartrun.in/SmartRun.png'
    };
  }

  if (cleanPath === '/technicians') {
    return {
      title: 'Licensed Electricians & Wiring Contractors Kolkata | SmartRun (Smart Run)',
      description: 'Book licensed emergency electricians and wiring contractors in Kolkata. 60-minute doorstep arrival, upfront transparent pricing, residential flat wiring & switchboard repairs by SmartRun (Smart Run).',
      keywords: 'licensed electrician Kolkata, house wiring contractor Kolkata, emergency electrical repair, electrical wiring services, Smart Run, SmartRun, flat wiring Kolkata',
      canonical,
      ogType: 'website',
      image: 'https://www.smartrun.in/SmartRun.png'
    };
  }

  if (cleanPath === '/shipping') {
    return {
      title: 'Shipping & 60-Minute Delivery Policy | SmartRun (Smart Run)',
      description: 'SmartRun (Smart Run) shipping policy: 60-minute express doorstep delivery across Kolkata from Kasba Central Depot. Order tracking, service areas, and delivery fees.',
      keywords: 'SmartRun shipping policy, smart run delivery time, express electrical delivery Kolkata, Kasba depot delivery',
      canonical,
      ogType: 'website'
    };
  }

  if (cleanPath === '/return' || cleanPath === '/return-policy') {
    return {
      title: 'Return Policy & 7-Day Replacement Guarantee | SmartRun (Smart Run)',
      description: 'SmartRun (Smart Run) return policy: 7-day hassle-free return and replacement for electrical goods, wires, switches, and construction materials with doorstep pickup.',
      keywords: 'SmartRun return policy, smart run replacement guarantee, return electrical items Kolkata',
      canonical,
      ogType: 'website'
    };
  }

  if (cleanPath === '/refund-policy') {
    return {
      title: 'Refund Policy & Instant Settlement Guarantee | SmartRun (Smart Run)',
      description: 'SmartRun (Smart Run) refund policy: 100% money-back guarantee with 2 to 4 hour instant bank settlement on verified cancellations.',
      keywords: 'SmartRun refund policy, smart run money back guarantee, instant refund settlement',
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
export function injectSeoMetadata(html: string, reqPath: string, product?: ProductMetaSource | null): string {
  if (!html || typeof html !== 'string') return html;

  const seo = getRouteSeoConfig(reqPath, product);
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
export function generateDynamicSitemap(products: ProductMetaSource[]): string {
  const today = new Date().toISOString().split('T')[0];

  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/electrical', priority: '0.95', changefreq: 'daily' },
    { path: '/construction', priority: '0.95', changefreq: 'daily' },
    { path: '/technicians', priority: '0.9', changefreq: 'daily' },
    { path: '/sitemap', priority: '0.8', changefreq: 'weekly' },
    { path: '/shipping', priority: '0.8', changefreq: 'monthly' },
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

