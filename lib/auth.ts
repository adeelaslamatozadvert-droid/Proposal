export const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? 'admin';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin123';
export const AUTH_COOKIE_NAME = 'proposal-admin-auth';
export const AUTH_COOKIE_VALUE = 'authenticated';
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function isAuthenticated(cookieValue?: string) {
  return cookieValue === AUTH_COOKIE_VALUE;
}
