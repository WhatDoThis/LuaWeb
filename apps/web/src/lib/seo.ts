/**
 * lib.seo (SEO 유틸)
 * ==================
 * site.json 기반 base URL
 *
 * [Main Functions]
 * - getSiteBaseUrl
 *
 * [Dependencies]
 * - @repo/env
 */

import { getSite } from '@repo/env';

// 1. getSiteBaseUrl
export function getSiteBaseUrl(): string {
  const site = getSite();
  const url = site.domain?.trim();
  if (url && url.startsWith('http')) {
    return url.replace(/\/$/, '');
  }
  return 'https://example.com';
}
