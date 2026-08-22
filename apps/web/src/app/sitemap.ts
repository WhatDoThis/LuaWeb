/**
 * app.sitemap (sitemap.xml)
 * ===========================
 * locale × static routes + news slugs — disclosure 제외
 *
 * [Main Functions]
 * - sitemap
 *
 * [Dependencies]
 * - @repo/content, @/i18n/routing, @/lib/seo, @/lib/sitemap-routes
 */

import { loadNewsArticles } from '@repo/content';
import { routing } from '@/i18n/routing';
import { getSiteBaseUrl } from '@/lib/seo';
import { sitemapStaticPaths } from '@/lib/sitemap-routes';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

function buildLocalizedUrl(baseUrl: string, locale: string, path: string): string {
  if (!path) {
    return `${baseUrl}/${locale}/`;
  }
  return `${baseUrl}/${locale}${path}/`;
}

// 1. sitemap
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteBaseUrl();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of sitemapStaticPaths) {
      entries.push({
        url: buildLocalizedUrl(baseUrl, locale, path),
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((altLocale) => [
              altLocale,
              buildLocalizedUrl(baseUrl, altLocale, path),
            ]),
          ),
        },
      });
    }

    for (const article of loadNewsArticles(locale)) {
      const newsPath = `/pr-center/news/${article.slug}`;
      entries.push({
        url: buildLocalizedUrl(baseUrl, locale, newsPath),
        lastModified: article.date,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((altLocale) => [
              altLocale,
              buildLocalizedUrl(baseUrl, altLocale, newsPath),
            ]),
          ),
        },
      });
    }
  }

  return entries;
}
