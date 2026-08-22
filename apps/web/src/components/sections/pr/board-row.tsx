/**
 * sections.board-row (게시판 행)
 * ==============================
 * PC table row / MO card — 번호·카테고리·제목·날짜
 *
 * [Main Functions]
 * - BoardRow
 *
 * [Dependencies]
 * - @/i18n/navigation, @/lib/cn
 */

'use client';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { BoardArticle } from '@/lib/board';

export type BoardRowProps = {
  article: BoardArticle;
  href: string;
  rowNumber: number;
  categoryLabel: string;
  pinnedLabel: string;
};

// 1. BoardRow
export function BoardRow({ article, href, rowNumber, categoryLabel, pinnedLabel }: BoardRowProps) {
  return (
    <>
      <tr className="hidden border-b border-neutral-200 md:table-row">
        <td className="w-16 py-4 text-center text-sm text-neutral-500">{rowNumber}</td>
        <td className="w-24 py-4 text-center">
          <span
            className={cn(
              'inline-block rounded px-2 py-1 text-xs font-medium',
              article.category === 'notice'
                ? 'bg-primary/10 text-primary'
                : 'bg-neutral-100 text-neutral-600',
            )}
          >
            {categoryLabel}
          </span>
        </td>
        <td className="py-4 pr-4">
          <Link href={href} className="font-medium text-neutral-800 hover:text-primary">
            {article.pinned ? (
              <span className="mr-2 text-xs font-bold text-primary">{pinnedLabel}</span>
            ) : null}
            {article.title}
          </Link>
          {article.excerpt ? (
            <p className="mt-1 line-clamp-1 text-sm text-neutral-500">{article.excerpt}</p>
          ) : null}
        </td>
        <td className="w-28 py-4 text-right text-sm text-neutral-500">{article.date}</td>
      </tr>

      <li className="border-b border-neutral-200 py-4 md:hidden">
        <Link href={href} className="block space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span
              className={cn(
                'shrink-0 rounded px-2 py-1 text-xs font-medium',
                article.category === 'notice'
                  ? 'bg-primary/10 text-primary'
                  : 'bg-neutral-100 text-neutral-600',
              )}
            >
              {categoryLabel}
            </span>
            <span className="text-xs text-neutral-500">{article.date}</span>
          </div>
          <p className="font-medium text-neutral-800">
            {article.pinned ? (
              <span className="mr-2 text-xs font-bold text-primary">{pinnedLabel}</span>
            ) : null}
            {article.title}
          </p>
        </Link>
      </li>
    </>
  );
}
