/**
 * sections.board-view (뉴스 상세 본문)
 * ====================================
 * title, date, category, markdown body
 *
 * [Main Functions]
 * - BoardView
 *
 * [Dependencies]
 * - @/i18n/navigation, @/lib/markdown, @/lib/cn
 */

import { Link } from '@/i18n/navigation';
import type { NewsArticleFile } from '@/lib/board';
import { cn } from '@/lib/cn';
import { MarkdownBody } from '@/lib/markdown';

export type BoardViewProps = {
  article: NewsArticleFile;
  categoryLabel: string;
  backHref: string;
  backLabel: string;
};

// 1. BoardView
export function BoardView({ article, categoryLabel, backHref, backLabel }: BoardViewProps) {
  return (
    <article className="space-y-8">
      <header className="border-b border-neutral-200 pb-6">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span
            className={cn(
              'rounded px-2 py-1 text-xs font-medium',
              article.category === 'notice'
                ? 'bg-primary/10 text-primary'
                : 'bg-neutral-100 text-neutral-600',
            )}
          >
            {categoryLabel}
          </span>
          <time className="text-sm text-neutral-500">{article.date}</time>
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 md:text-3xl">{article.title}</h1>
        {article.excerpt ? (
          <p className="mt-3 text-neutral-600">{article.excerpt}</p>
        ) : null}
      </header>

      <MarkdownBody content={article.body} />

      <div className="border-t border-neutral-200 pt-6">
        <Link
          href={backHref}
          className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
        >
          {backLabel}
        </Link>
      </div>
    </article>
  );
}
