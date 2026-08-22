/**
 * ui.tabs (탭 UI)
 * =================
 * Client 탭 전환 — LocationTabs 등에서 사용
 *
 * [Main Functions]
 * - Tabs
 *
 * [Dependencies]
 * - @/lib/cn
 */

'use client';

import { cn } from '@/lib/cn';
import { useState } from 'react';

export type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

export type TabsProps = {
  items: TabItem[];
  defaultTab?: string;
  ariaLabel?: string;
  className?: string;
};

// 1. Tabs
export function Tabs({ items, defaultTab, ariaLabel, className }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultTab ?? items[0]?.id ?? '');

  const active = items.find((item) => item.id === activeId) ?? items[0];

  if (!active) {
    return null;
  }

  return (
    <div className={className}>
      <div
        className="mb-6 flex gap-2 overflow-x-auto pb-1"
        role="tablist"
        aria-label={ariaLabel}
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active.id === item.id}
            className={cn(
              'shrink-0 rounded border px-4 py-2 text-sm font-medium transition-colors',
              active.id === item.id
                ? 'border-primary bg-primary text-white'
                : 'border-neutral-200 bg-white text-neutral-600 hover:border-primary hover:text-primary',
            )}
            onClick={() => setActiveId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">{active.content}</div>
    </div>
  );
}
