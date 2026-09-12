/**
 * lib.sub-page-metadata (서브 페이지 SEO metadata)
 * =================================================
 * 콘텐츠 JSON pages.*.title·desc 기반 페이지별 title·description
 *
 * [Main Functions]
 * - buildSubPageMetadata
 * - buildNewsArticleMetadata
 *
 * [Dependencies]
 * - @/lib/i18n, @/lib/seo, @repo/env, sections/common/lnb-bar
 */

import type { ContentNamespace } from '@/components/sections/common/lnb-bar';
import { getTranslations, setRequestLocale } from '@/lib/i18n';
import { getSiteBaseUrl } from '@/lib/seo';
import { getSite } from '@repo/env';
import type { Metadata } from 'next';

export type SubPageMetadataParams = {
  locale: 'ko' | 'en';
  namespace: ContentNamespace;
  pageKey: string;
  currentPath: string;
};

export type NewsArticleMetadataParams = {
  locale: 'ko' | 'en';
  title: string;
  excerpt?: string;
  slug: string;
};

// 1. buildSubPageMetadata
export async function buildSubPageMetadata({
  locale,
  namespace,
  pageKey,
  currentPath,
}: SubPageMetadataParams): Promise<Metadata> {
  setRequestLocale(locale);
  const t = await getTranslations(namespace);
  const site = getSite();
  const baseUrl = getSiteBaseUrl();
  const companyName = site.companyName[locale];
  const pageBase = `pages.${pageKey}`;
  const pageTitle = t(`${pageBase}.title` as never);
  const pageDesc = t(`${pageBase}.desc` as never);
  const descText = pageDesc && String(pageDesc).length > 0 ? String(pageDesc) : String(pageTitle);
  const description = `${descText} — ${companyName}`;

  const path = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
  const canonicalPath = path.endsWith('/') ? path : `${path}/`;

  return {
    title: pageTitle,
    description,
    openGraph: {
      type: 'website',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      url: `${baseUrl}/${locale}${canonicalPath}`,
      siteName: companyName,
      title: `${pageTitle} | ${companyName}`,
      description,
    },
  };
}

// 2. buildNewsArticleMetadata
export async function buildNewsArticleMetadata({
  locale,
  title,
  excerpt,
  slug,
}: NewsArticleMetadataParams): Promise<Metadata> {
  setRequestLocale(locale);
  const site = getSite();
  const baseUrl = getSiteBaseUrl();
  const companyName = site.companyName[locale];
  const description = excerpt?.trim()
    ? `${excerpt.trim()} — ${companyName}`
    : `${title} — ${companyName}`;

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      url: `${baseUrl}/${locale}/pr-center/news/${slug}/`,
      siteName: companyName,
      title: `${title} | ${companyName}`,
      description,
    },
  };
}
