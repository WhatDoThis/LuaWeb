/**
 * sections.biz-field-scroller (사업분야 가로 스크롤)
 * ==================================================
 * scroll-snap horizontal list + accent top bar
 *
 * [Main Functions]
 * - BizFieldScroller
 *
 * [Dependencies]
 * - @/lib/cn
 */

'use client';

import { cn } from '@/lib/cn';

export type BizFieldItem = {
  title: string;
  desc: string;
};

export type BizFieldScrollerProps = {
  items: BizFieldItem[];
};

// 1. BizFieldScroller
export function BizFieldScroller({ items }: BizFieldScrollerProps) {
  return (
    <div className="overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <ul className="flex snap-x snap-mandatory gap-4">
        {items.map((item) => (
          <li
            key={item.title}
            className={cn(
              'relative w-[260px] shrink-0 snap-start overflow-hidden rounded-lg border border-neutral-200 bg-white p-6 shadow-sm',
              'md:w-[280px]',
            )}
          >
            <span className="absolute inset-x-0 top-0 h-1 bg-accent" aria-hidden="true" />
            <h3 className="font-semibold text-primary">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
