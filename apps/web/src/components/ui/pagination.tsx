/**
 * ui.pagination (게시판 페이지네이션)
 * ===================================
 * ?page= 쿼리 기반 페이지 링크
 *
 * [Main Functions]
 * - Pagination
 *
 * [Dependencies]
 * - @/i18n/navigation
 */

'use client';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
  queryString?: string;
  prevLabel: string;
  nextLabel: string;
};

function buildHref(basePath: string, page: number, queryString?: string): string {
  const params = new URLSearchParams(queryString ?? '');
  if (page <= 1) {
    params.delete('page');
  } else {
    params.set('page', String(page));
  }
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

// 1. Pagination
export function Pagination({
  currentPage,
  totalPages,
  basePath,
  queryString,
  prevLabel,
  nextLabel,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link
          href={buildHref(basePath, currentPage - 1, queryString)}
          className="rounded border border-neutral-200 px-3 py-2 text-sm text-neutral-600 hover:border-primary hover:text-primary"
        >
          {prevLabel}
        </Link>
      ) : null}

      {pages.map((page) => (
        <Link
          key={page}
          href={buildHref(basePath, page, queryString)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded text-sm font-medium',
            page === currentPage
              ? 'bg-primary text-white'
              : 'border border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary',
          )}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link
          href={buildHref(basePath, currentPage + 1, queryString)}
          className="rounded border border-neutral-200 px-3 py-2 text-sm text-neutral-600 hover:border-primary hover:text-primary"
        >
          {nextLabel}
        </Link>
      ) : null}
    </nav>
  );
}
