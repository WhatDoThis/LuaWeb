/**
 * pr-center.news.page (뉴스&공지)
 * ===============================
 * IntroHero + LnbBar + SpHead + NewsBoardPanel
 *
 * [Main Functions]
 * - NewsPage
 *
 * [Dependencies]
 * - @/lib/sub-page-layout, @/lib/board, sections/pr/news-board-panel, @repo/env
 */

import { NewsBoardPanel } from '@/components/sections/pr/news-board-panel';
import { loadNewsArticles, toBoardArticle } from '@/lib/board';
import { getTranslations, setRequestLocale } from '@/lib/i18n';
import { SubPageLayout } from '@/lib/sub-page-layout';
import { getFeatures } from '@repo/env';
import { Suspense } from 'react';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

// 1. NewsPage
export default async function NewsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('common');
  const features = getFeatures();
  const articles = loadNewsArticles(locale).map(toBoardArticle);

  return (
    <SubPageLayout
      locale={locale}
      section="prCenter"
      namespace="prCenter"
      imagePath="prCenter.news.hero"
      currentPath="/pr-center/news"
      pageKey="news"
    >
      <Suspense fallback={null}>
        <NewsBoardPanel
          articles={articles}
          locale={locale}
          basePath="/pr-center/news"
          newsPerPage={features.newsPerPage}
          labels={{
            notice: t('board.notice'),
            news: t('board.news'),
            searchPlaceholder: t('board.searchPlaceholder'),
            search: t('board.search'),
            noResults: t('board.noResults'),
            prev: t('board.prev'),
            next: t('board.next'),
            number: t('board.number'),
            titleCol: t('board.titleCol'),
            dateCol: t('board.dateCol'),
            categoryCol: t('board.categoryCol'),
            pinned: t('board.pinned'),
          }}
        />
      </Suspense>
    </SubPageLayout>
  );
}
