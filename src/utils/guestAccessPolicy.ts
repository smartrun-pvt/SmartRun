export type GuestAppAction =
  | 'browse_products'
  | 'view_product'
  | 'add_to_cart'
  | 'view_cart'
  | 'save_for_later'
  | 'wishlist'
  | 'place_order'
  | 'buy_this_now'
  | 'profile'
  | 'orders';

export interface GuestAuthCheckContext {
  userProfile?: {
    id?: string | null;
    phone?: string | null;
    email?: string | null;
  } | null;
  userPhone?: string | null;
  hasStoredSession?: boolean;
}

/**
 * Pure policy determining which user actions require authentication across BOTH
 * native Android/iOS apps and web browsers.
 *
 * Browsing products, viewing product details, adding to cart, and viewing cart
 * are always open to guests (no login screen on native app startup).
 * Saving items for later / wishlist, placing orders, and account pages require login.
 */
export function requiresAuthForAction(action: GuestAppAction): boolean {
  switch (action) {
    case 'browse_products':
    case 'view_product':
    case 'add_to_cart':
    case 'view_cart':
      return false;
    case 'save_for_later':
    case 'wishlist':
    case 'place_order':
    case 'buy_this_now':
    case 'profile':
    case 'orders':
      return true;
  }
}

/**
 * Pure check for whether the current user has an authenticated session.
 */
export function isGuestSessionAuthenticated(ctx: GuestAuthCheckContext): boolean {
  if (ctx.hasStoredSession) return true;
  if (ctx.userPhone && String(ctx.userPhone).trim().length > 0) return true;
  const profile = ctx.userProfile;
  if (!profile) return false;
  return Boolean(
    (profile.id && String(profile.id).trim().length > 0) ||
      (profile.phone && String(profile.phone).trim().length > 0) ||
      (profile.email && String(profile.email).trim().length > 0)
  );
}

/**
 * Builds a safe `/login` URL preserving the post-login return route so users
 * sent to `/login` from Cart ("Save for later" / "Place Order") or a product
 * return straight back after signing in.
 */
export function buildLoginRedirectUrl(targetPath?: string): string {
  const raw = String(targetPath || '').trim();
  if (
    !raw ||
    !raw.startsWith('/') ||
    raw.startsWith('//') ||
    raw === '/' ||
    raw === '/login' ||
    raw.startsWith('/login?') ||
    raw === '/auth' ||
    raw.startsWith('/auth?')
  ) {
    return '/login';
  }
  return `/login?redirect=${encodeURIComponent(raw)}`;
}

/**
 * Synchronously checks localStorage for an active SmartRun user session so
 * guest-accessible cards/modals can enforce login before Save for Later / Wishlist.
 */
export function hasBrowserStoredAuthSession(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const rawProfile = window.localStorage.getItem('smartrun_user_profile');
    if (rawProfile) {
      const parsed = JSON.parse(rawProfile);
      if (parsed && (parsed.id || parsed.phone || parsed.email)) {
        return true;
      }
    }
  } catch {}
  try {
    const rawSession = window.localStorage.getItem('giriraj_supabase_auth_session');
    if (rawSession) {
      const parsed = JSON.parse(rawSession);
      if (parsed && (parsed.access_token || parsed.user?.id)) {
        return true;
      }
    }
  } catch {}
  return false;
}

/**
 * Stores the post-login destination in sessionStorage and returns the `/login` URL.
 */
export function rememberAuthRedirectTarget(targetPath?: string): string {
  const loginUrl = buildLoginRedirectUrl(targetPath);
  if (typeof window !== 'undefined' && targetPath && targetPath.startsWith('/') && !targetPath.startsWith('//')) {
    try {
      if (targetPath !== '/login' && targetPath !== '/auth') {
        window.sessionStorage.setItem('auth_redirect_target', targetPath);
      }
    } catch {}
  }
  return loginUrl;
}
