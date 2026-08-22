/**
 * sections.news-board-panel (뉴스 게시판 패널)
 * ============================================
 * Client-side search + pagination (static export)
 *
 * [Main Functions]
 * - NewsBoardPanel
 *
 * [Dependencies]
 * - sections/pr/board-row, board-search, ui/pagination
 */

'use client';

import { BoardRow } from '@/components/sections/pr/board-row';
import type { BoardArticle } from '@/lib/board';
import { BoardSearch } from '@/components/sections/pr/board-search';
import { Pagination } from '@/components/ui/pagination';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export type NewsBoardPanelProps = {
  articles: BoardArticle[];
  locale: 'ko' | 'en';
  basePath: string;
  newsPerPage: number;
  labels: {
    notice: string;
    news: string;
    searchPlaceholder: string;
    search: string;
    noResults: string;
    prev: string;
    next: string;
    number: string;
    titleCol: string;
    categoryCol: string;
    dateCol: string;
    pinned: string;
  };
};

function filterArticles(articles: BoardArticle[], query: string): BoardArticle[] {
  const keyword = query.trim().toLowerCase();
  if (!keyword) {
    return articles;
  }
  return articles.filter((article) => {
    const haystack = `${article.title} ${article.excerpt ?? ''}`.toLowerCase();
    return haystack.includes(keyword);
  });
}

// 1. NewsBoardPanel
export function NewsBoardPanel({
  articles,
  locale,
  basePath,
  newsPerPage,
  labels,
}: NewsBoardPanelProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const currentPage = Math.max(1, Number(searchParams.get('page') ?? '1'));

  const filtered = useMemo(() => filterArticles(articles, query), [articles, query]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / newsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * newsPerPage;
  const pageArticles = filtered.slice(start, start + newsPerPage);

  const queryString = query ? `q=${encodeURIComponent(query)}` : undefined;

  return (
    <>
      <BoardSearch
        locale={locale}
        basePath={basePath}
        placeholder={labels.searchPlaceholder}
        searchLabel={labels.search}
        initialQuery={query}
      />

      {pageArticles.length === 0 ? (
        <p className="py-12 text-center text-neutral-500">{labels.noResults}</p>
      ) : (
        <>
          <div className="hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-300 text-neutral-600">
                  <th className="w-16 py-3 text-center font-semibold">{labels.number}</th>
                  <th className="w-24 py-3 text-center font-semibold">{labels.categoryCol}</th>
                  <th className="py-3 text-left font-semibold">{labels.titleCol}</th>
                  <th className="w-28 py-3 text-right font-semibold">{labels.dateCol}</th>
                </tr>
              </thead>
              <tbody>
                {pageArticles.map((article, index) => (
                  <BoardRow
                    key={article.slug}
                    article={article}
                    href={`${basePath}/${article.slug}`}
                    rowNumber={filtered.length - start - index}
                    categoryLabel={
                      article.category === 'notice' ? labels.notice : labels.news
                    }
                    pinnedLabel={labels.pinned}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <ul className="md:hidden">
            {pageArticles.map((article, index) => (
              <BoardRow
                key={article.slug}
                article={article}
                href={`${basePath}/${article.slug}`}
                rowNumber={filtered.length - start - index}
                categoryLabel={article.category === 'notice' ? labels.notice : labels.news}
                pinnedLabel={labels.pinned}
              />
            ))}
          </ul>
        </>
      )}

      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        basePath={basePath}
        queryString={queryString}
        prevLabel={labels.prev}
        nextLabel={labels.next}
      />
    </>
  );
}
