/**
 * ui.accordion (아코디언)
 * ========================
 * SitemapOverlay 1depth 펼침/접힘
 *
 * [Main Functions]
 * - Accordion
 *
 * [Dependencies]
 * - @/lib/cn
 */

'use client';

import { cn } from '@/lib/cn';
import { useState } from 'react';

export type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export type AccordionProps = {
  items: AccordionItem[];
  className?: string;
};

// 1. Accordion
export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className={cn('divide-y divide-neutral-200', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 py-4 text-left text-base font-medium text-primary"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              {item.title}
              <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen ? <div className="px-4 pb-4">{item.content}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
