import { describe, test, expect } from 'vitest';
import { buildTrackedShareUrl, PRODUCTION_WEB_DOMAIN } from './shareProduct';

describe('shareProduct canonical link builder', () => {
  test('routes construction products to /construction/product/:id on production domain', () => {
    const url = buildTrackedShareUrl({
      id: 'const-101',
      name: 'UltraTech Cement 50kg Bag',
      category: 'construction'
    });

    expect(url.startsWith(`${PRODUCTION_WEB_DOMAIN}/construction/product/const-101`)).toBe(true);
    expect(url).toContain('utm_source=native_share');
    expect(url).toContain('item_id=const-101');
    expect(url).not.toContain('localhost');
  });

  test('routes electrical products to /electrical/product/:id with encoded ID', () => {
    const url = buildTrackedShareUrl({
      id: 'wire/red 2.5',
      name: 'Polycab 2.5 sqmm Wire',
      category: 'electrical'
    });

    expect(url.startsWith(`${PRODUCTION_WEB_DOMAIN}/electrical/product/wire%2Fred%202.5`)).toBe(true);
    expect(url).toContain('utm_campaign=product_share');
  });
});
