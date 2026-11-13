/**
 * Sanitize customer name to filter out auto-generated placeholder names
 */
export function sanitizeCustomerName(nameCandidate?: string | null): string {
  if (!nameCandidate) return '';
  const trimmed = nameCandidate.trim();
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith('giriraj power') ||
    lower.startsWith('giriraj member') ||
    lower.startsWith('giriraj customer') ||
    lower.startsWith('p9') ||
    lower.startsWith('p8') ||
    lower.startsWith('p7') ||
    lower.startsWith('p6') ||
    lower.startsWith('phone_') ||
    /^p\d{10}$/i.test(trimmed) ||
    /^\+?91\d{10}$/.test(trimmed) ||
    /^\d{10}$/.test(trimmed)
  ) {
    return '';
  }
  return trimmed;
}
