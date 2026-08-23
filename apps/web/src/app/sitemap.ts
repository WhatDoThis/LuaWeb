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

function buildNewsSlugSets(): Map<string, Set<string>> {
  const slugSets = new Map<string, Set<string>>();

  for (const locale of routing.locales) {
    const slugs = new Set(loadNewsArticles(locale).map((article) => article.slug));
    slugSets.set(locale, slugs);
  }

  return slugSets;
}

function buildNewsAlternates(
  baseUrl: string,
  newsPath: string,
  slug: string,
  slugSets: Map<string, Set<string>>,
): MetadataRoute.Sitemap[number]['alternates'] | undefined {
  const availableLocales = routing.locales.filter((locale) => slugSets.get(locale)?.has(slug));

  if (availableLocales.length <= 1) {
    return undefined;
  }

  return {
    languages: Object.fromEntries(
      availableLocales.map((altLocale) => [
        altLocale,
        buildLocalizedUrl(baseUrl, altLocale, newsPath),
      ]),
    ),
  };
}

// 1. sitemap
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteBaseUrl();
  const entries: MetadataRoute.Sitemap = [];
  const newsSlugSets = buildNewsSlugSets();

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
      const alternates = buildNewsAlternates(baseUrl, newsPath, article.slug, newsSlugSets);

      entries.push({
        url: buildLocalizedUrl(baseUrl, locale, newsPath),
        lastModified: article.date,
        ...(alternates ? { alternates } : {}),
      });
    }
  }

  return entries;
}
