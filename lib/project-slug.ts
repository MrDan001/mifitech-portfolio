/**
 * Convert admin-entered project slugs into stable, lowercase URL segments.
 * Keeps legacy CMS values such as "Prestige life RP " out of canonical URLs.
 */
export function normalizeProjectSlug(value: string) {
  return decodeURIComponent(value).trim().toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function projectPath(value: string) {
  return '/projects/' + normalizeProjectSlug(value);
}
