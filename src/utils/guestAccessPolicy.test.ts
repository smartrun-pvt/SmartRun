import { describe, it, expect } from 'vitest';
import {
  requiresAuthForAction,
  isGuestSessionAuthenticated,
  buildLoginRedirectUrl,
} from './guestAccessPolicy';

describe('guestAccessPolicy', () => {
  it('allows browsing products, viewing details, adding to cart, and opening cart without login', () => {
    expect(requiresAuthForAction('browse_products')).toBe(false);
    expect(requiresAuthForAction('view_product')).toBe(false);
    expect(requiresAuthForAction('add_to_cart')).toBe(false);
    expect(requiresAuthForAction('view_cart')).toBe(false);
  });

  it('requires login for save for later, wishlist, ordering, profile, and orders', () => {
    expect(requiresAuthForAction('save_for_later')).toBe(true);
    expect(requiresAuthForAction('wishlist')).toBe(true);
    expect(requiresAuthForAction('place_order')).toBe(true);
    expect(requiresAuthForAction('buy_this_now')).toBe(true);
    expect(requiresAuthForAction('profile')).toBe(true);
    expect(requiresAuthForAction('orders')).toBe(true);
  });

  it('detects guest vs authenticated sessions cleanly', () => {
    expect(isGuestSessionAuthenticated({})).toBe(false);
    expect(isGuestSessionAuthenticated({ userProfile: null, userPhone: null })).toBe(false);
    expect(isGuestSessionAuthenticated({ userProfile: { id: 'u1' } })).toBe(true);
    expect(isGuestSessionAuthenticated({ userPhone: '9876543210' })).toBe(true);
    expect(isGuestSessionAuthenticated({ hasStoredSession: true })).toBe(true);
  });

  it('builds safe login redirect URLs for cart and product pages while rejecting unsafe paths', () => {
    expect(buildLoginRedirectUrl('/cart')).toBe('/login?redirect=%2Fcart');
    expect(buildLoginRedirectUrl('/electrical/product/123')).toBe(
      '/login?redirect=%2Felectrical%2Fproduct%2F123'
    );
    expect(buildLoginRedirectUrl('/')).toBe('/login');
    expect(buildLoginRedirectUrl('/login')).toBe('/login');
    expect(buildLoginRedirectUrl('/auth')).toBe('/login');
    expect(buildLoginRedirectUrl('//evil.com')).toBe('/login');
    expect(buildLoginRedirectUrl('https://evil.com')).toBe('/login');
  });
});
