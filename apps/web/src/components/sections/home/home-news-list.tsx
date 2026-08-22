/**
 * sections.home-news-list (홈 뉴스 목록)
 * ======================================
 * latest 3 articles + more link
 *
 * [Main Functions]
 * - HomeNewsList
 *
 * [Dependencies]
 * - @/i18n/navigation, @/lib/board
 */

import { Link } from '@/i18n/navigation';
import type { BoardArticle } from '@/lib/board';
import { cn } from '@/lib/cn';

export type HomeNewsListProps = {
  articles: BoardArticle[];
  limit?: number;
  moreHref: string;
  moreLabel: string;
  noticeLabel: string;
  newsLabel: string;
};

// 1. HomeNewsList
export function HomeNewsList({
  articles,
  limit = 3,
  moreHref,
  moreLabel,
  noticeLabel,
  newsLabel,
}: HomeNewsListProps) {
  const items = articles.slice(0, limit);

  return (
    <div>
      <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
        {items.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/pr-center/news/${article.slug}`}
              className="flex flex-col gap-2 py-4 transition-colors hover:bg-neutral-50 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'shrink-0 rounded px-2 py-1 text-xs font-medium',
                    article.category === 'notice'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-neutral-100 text-neutral-600',
                  )}
                >
                  {article.category === 'notice' ? noticeLabel : newsLabel}
                </span>
                <span className="font-medium text-neutral-800">{article.title}</span>
              </div>
              <time className="shrink-0 text-sm text-neutral-500">{article.date}</time>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-right">
        <Link href={moreHref} className="text-sm font-semibold text-primary hover:underline">
          {moreLabel}
        </Link>
      </div>
    </div>
  );
}
