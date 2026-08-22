/**
 * app.robots (robots.txt)
 * =======================
 * Allow all + sitemap URL
 *
 * [Main Functions]
 * - robots
 *
 * [Dependencies]
 * - @/lib/seo
 */

import { getSiteBaseUrl } from '@/lib/seo';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

// 1. robots
export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteBaseUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
