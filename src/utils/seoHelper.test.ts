import { describe, test, expect } from 'vitest';
import {
  escapeHtml,
  escapeXml,
  getRouteSeoConfig,
  injectSeoMetadata,
  generateDynamicSitemap,
  generateRssFeed,
  ProductMetaSource
} from './seoHelper.js';

describe('SmartRun SEO & Geo Optimization Engine', () => {
  test('escapeHtml and escapeXml properly sanitize special characters', () => {
    const raw = '<script>alert("XSS & test")</script>\'';
    const escapedHtml = escapeHtml(raw);
    expect(escapedHtml).not.toContain('<script>');
    expect(escapedHtml).toContain('&lt;script&gt;');
    expect(escapedHtml).toContain('&amp;');

    const escapedXml = escapeXml(raw);
    expect(escapedXml).not.toContain('<script>');
    expect(escapedXml).toContain('&apos;');
  });

  test('getRouteSeoConfig formats product page with Smart Run and Kolkata geo metadata', () => {
    const mockProduct: ProductMetaSource = {
      id: 'p1',
      name: 'RR Kabel Wire FR LS 0.75 Sqmm, 200 MTR',
      brand: 'RR Kabel',
      category: 'electrical',
      subCategory: 'Wiring',
      price: 3065,
      description: 'High quality FR LS copper wire',
      image: 'https://images.unsplash.com/photo-1558223616-e5d79faebdd6'
    };

    const seo = getRouteSeoConfig('/electrical/product/p1', mockProduct);
    expect(seo.title).toContain('RR Kabel Wire FR LS 0.75 Sqmm, 200 MTR');
    expect(seo.title).toContain('SmartRun (Smart Run)');
    expect(seo.title).toContain('Kolkata');
    expect(seo.description).toContain('₹3065');
    expect(seo.description).toContain('60-min express delivery across Kolkata');
    expect(seo.keywords).toContain('kolkata online delivery app for electrical products');
    expect(seo.keywords).toContain('smart run');

    // Check Schema.org Product JSON-LD
    const schema = seo.structuredData as any;
    expect(schema['@type']).toBe('Product');
    expect(schema.name).toBe('RR Kabel Wire FR LS 0.75 Sqmm, 200 MTR');
    expect(schema.offers.price).toBe(3065);
    expect(schema.offers.areaServed.name).toBe('Kolkata');
    expect(schema.offers.availableAtOrFrom.name).toBe('SmartRun Kasba Central Depot');
    expect(schema.offers.availableAtOrFrom.geo.latitude).toBe(22.5145);
    expect(schema.offers.availableAtOrFrom.geo.longitude).toBe(88.3934);
    expect(Array.isArray(schema.image)).toBe(true);
    expect(schema.image.length).toBeGreaterThanOrEqual(3);
  });

  test('getRouteSeoConfig configures category routes with local delivery targets', () => {
    const elecSeo = getRouteSeoConfig('/electrical');
    expect(elecSeo.title).toContain('Electrical Products Online Delivery Kolkata');
    expect(elecSeo.description).toContain("Kolkata's #1 online delivery app for electrical products");
    expect(elecSeo.keywords).toContain('kolkata online delivery app for electrical products');

    const constSeo = getRouteSeoConfig('/construction');
    expect(constSeo.title).toContain('Construction Products & Building Materials Delivery Kolkata');
    expect(constSeo.description).toContain("Kolkata's #1 online delivery app for construction products");
    expect(constSeo.keywords).toContain('kolkata online delivery app for construction products');

    const techSeo = getRouteSeoConfig('/technicians');
    expect(techSeo.title).toContain('Licensed Electricians & Wiring Contractors Kolkata');
  });

  test('injectSeoMetadata replaces HTML tags and injects Product schema before closing head', () => {
    const rawTemplate = `<!DOCTYPE html>
<html>
  <head>
    <title>Default Title</title>
    <meta name="title" content="Default Title" />
    <meta name="description" content="Default Description" />
    <meta name="keywords" content="default, keywords" />
    <link rel="canonical" href="https://www.smartrun.in/" />
    <link rel="alternate" hreflang="en-IN" href="https://www.smartrun.in/" />
    <link rel="alternate" href="android-app://in.smartrun.app/smartrun/home" />
    <meta property="al:android:url" content="smartrun://home" />
    <meta property="og:title" content="Default Title" />
    <meta property="og:description" content="Default Description" />
    <meta property="og:url" content="https://www.smartrun.in/" />
    <meta property="og:image" content="https://www.smartrun.in/default.png" />
    <meta name="twitter:title" content="Default Title" />
    <meta name="twitter:description" content="Default Description" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

    const product: ProductMetaSource = {
      id: 'p25',
      name: 'Schneider Acti9 32A Double Pole MCB C-Curve',
      brand: 'Schneider Electric',
      category: 'electrical',
      price: 1250
    };

    const injected = injectSeoMetadata(rawTemplate, '/electrical/product/p25', product);

    expect(injected).toContain('Schneider Acti9 32A Double Pole MCB C-Curve - Buy Online in Kolkata | SmartRun (Smart Run)');
    expect(injected).toContain('href="https://www.smartrun.in/electrical/product/p25"');
    expect(injected).toContain('hreflang="en-IN" href="https://www.smartrun.in/electrical/product/p25"');
    expect(injected).toContain('android-app://in.smartrun.app/smartrun/electrical/product/p25');
    expect(injected).toContain('content="smartrun://electrical/product/p25"');
    expect(injected).toContain('id="server-prerender-schema"');
    expect(injected).toContain('"@type":"Product"');
    expect(injected).toContain('"SmartRun Kasba Central Depot"');
    expect(injected).not.toContain('Default Title');
  });

  test('generateDynamicSitemap includes all static routes and product items with image tags', () => {
    const sampleProducts: ProductMetaSource[] = [
      {
        id: 'p1',
        name: 'RR Kabel Wire FR LS 0.75 Sqmm, 200 MTR',
        category: 'electrical',
        image: 'https://images.unsplash.com/photo-1558223616-e5d79faebdd6'
      },
      {
        id: 'p35',
        name: 'UltraTech Super Cement 50kg Bag',
        category: 'construction',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12'
      }
    ];

    const sitemapXml = generateDynamicSitemap(sampleProducts);

    expect(sitemapXml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(sitemapXml).toContain('<loc>https://www.smartrun.in/</loc>');
    expect(sitemapXml).toContain('<loc>https://www.smartrun.in/electrical</loc>');
    expect(sitemapXml).toContain('<loc>https://www.smartrun.in/construction</loc>');
    expect(sitemapXml).toContain('<loc>https://www.smartrun.in/technicians</loc>');
    expect(sitemapXml).toContain('<loc>https://www.smartrun.in/shipping</loc>');
    expect(sitemapXml).toContain('<loc>https://www.smartrun.in/return</loc>');
    expect(sitemapXml).toContain('<loc>https://www.smartrun.in/electrical/product/p1</loc>');
    expect(sitemapXml).toContain('<loc>https://www.smartrun.in/construction/product/p35</loc>');
    expect(sitemapXml).toContain('<image:image>');
    expect(sitemapXml).toContain('<image:title>RR Kabel Wire FR LS 0.75 Sqmm, 200 MTR</image:title>');
    expect(sitemapXml).toContain('<image:title>UltraTech Super Cement 50kg Bag</image:title>');
  });

  test('generateRssFeed builds valid RSS 2.0 XML with followed permalinks and channel metadata', () => {
    const sampleProducts: ProductMetaSource[] = [
      {
        id: 'p1',
        name: 'RR Kabel Wire FR LS 0.75 Sqmm, 200 MTR',
        brand: 'RR Kabel',
        category: 'electrical',
        description: 'FR-LSH flame retardant pure copper wire.'
      },
      {
        id: 'p35',
        name: 'UltraTech Super Cement 50kg Bag',
        brand: 'UltraTech',
        category: 'construction',
        description: 'High performance structural building cement.'
      }
    ];

    const rssXml = generateRssFeed(sampleProducts);

    expect(rssXml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(rssXml).toContain('<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">');
    expect(rssXml).toContain('<title>SmartRun (Smart Run) - Kolkata Express Electrical &amp; Construction Supplies Feed</title>');
    expect(rssXml).toContain('<link>https://www.smartrun.in</link>');
    expect(rssXml).toContain('<atom:link href="https://www.smartrun.in/rss.xml" rel="self" type="application/rss+xml" />');
    expect(rssXml).toContain('<item>');
    expect(rssXml).toContain('<title>RR Kabel Wire FR LS 0.75 Sqmm, 200 MTR - RR Kabel | SmartRun Kolkata</title>');
    expect(rssXml).toContain('<link>https://www.smartrun.in/electrical/product/p1</link>');
    expect(rssXml).toContain('<guid isPermaLink="true">https://www.smartrun.in/electrical/product/p1</guid>');
    expect(rssXml).toContain('<category>Electrical Supplies</category>');
    expect(rssXml).toContain('<link>https://www.smartrun.in/construction/product/p35</link>');
    expect(rssXml).toContain('<category>Construction Materials</category>');
  });
});

