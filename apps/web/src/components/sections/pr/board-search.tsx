/**
 * sections.board-search (게시판 검색)
 * ===================================
 * Client-side keyword search — URL ?q= 갱신
 *
 * [Main Functions]
 * - BoardSearch
 *
 * [Dependencies]
 * - @/i18n/navigation
 */

'use client';

import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

export type BoardSearchProps = {
  locale: 'ko' | 'en';
  basePath: string;
  placeholder: string;
  searchLabel: string;
  initialQuery?: string;
};

// 1. BoardSearch
export function BoardSearch({
  basePath,
  placeholder,
  searchLabel,
  initialQuery = '',
}: BoardSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) {
        params.set('q', query.trim());
      } else {
        params.delete('q');
      }
      params.delete('page');
      const qs = params.toString();
      router.push(qs ? `${basePath}?${qs}` : basePath);
    },
    [basePath, query, router, searchParams],
  );

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex gap-2" role="search">
      <input
        type="search"
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded border border-neutral-200 px-4 py-2 text-sm outline-none focus:border-primary"
        aria-label={searchLabel}
      />
      <button
        type="submit"
        className="shrink-0 rounded bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90"
      >
        {searchLabel}
      </button>
    </form>
  );
}
