/**
 * pr-center.news.slug.page (뉴스 상세)
 * ====================================
 * generateStaticParams + BoardView
 *
 * [Main Functions]
 * - NewsDetailPage
 * - generateStaticParams
 *
 * [Dependencies]
 * - @/lib/sub-page-layout, @/lib/board, sections/pr/board-view
 */

import { BoardView } from '@/components/sections/pr/board-view';
import { loadNewsArticle, loadNewsArticles } from '@/lib/board';
import { getTranslations, setRequestLocale } from '@/lib/i18n';
import { SubPageLayout } from '@/lib/sub-page-layout';
import { notFound } from 'next/navigation';

type PageProps = { params: Promise<{ locale: 'ko' | 'en'; slug: string }> };

// 1. generateStaticParams
export function generateStaticParams() {
  const koSlugs = loadNewsArticles('ko').map((article) => article.slug);
  const enSlugs = loadNewsArticles('en').map((article) => article.slug);
  const slugs = [...new Set([...koSlugs, ...enSlugs])];
  return slugs.map((slug) => ({ slug }));
}

// 2. NewsDetailPage
export default async function NewsDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = loadNewsArticle(locale, slug);

  if (!article) {
    notFound();
  }

  const t = await getTranslations('common');
  const categoryLabel =
    article.category === 'notice' ? t('board.notice') : t('board.news');

  return (
    <SubPageLayout
      locale={locale}
      section="prCenter"
      namespace="prCenter"
      imagePath="prCenter.news.hero"
      currentPath="/pr-center/news"
      pageKey="news"
    >
      <BoardView
        article={article}
        categoryLabel={categoryLabel}
        backHref="/pr-center/news"
        backLabel={t('board.backToList')}
      />
    </SubPageLayout>
  );
}
