/**
 * sections.lnb-bar (로컬 네비게이션)
 * ==================================
 * 홈 + 1depth 드롭다운 + 2depth 링크 — technology staticMode
 *
 * [Main Functions]
 * - LnbBar
 *
 * [Dependencies]
 * - @/i18n/navigation, @/lib/lnb, @/lib/i18n, @/lib/cn
 */

'use client';

import { Link } from '@/i18n/navigation';
import { lnbSections, type LnbSection } from '@/lib/lnb';
import { useTranslations } from '@/lib/i18n';
import { cn } from '@/lib/cn';
import { useState } from 'react';

export type ContentNamespace = 'company' | 'technology' | 'management' | 'prCenter';

export type LnbBarProps = {
  section: LnbSection;
  namespace: ContentNamespace;
  currentPath: string;
  locale: 'ko' | 'en';
  staticMode?: boolean;
};

// 1. LnbBar
export function LnbBar({ section, namespace, currentPath, staticMode = false }: LnbBarProps) {
  const t = useTranslations(namespace);
  const config = lnbSections[section];
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav
      className="border-b border-neutral-200 bg-white"
      aria-label="Local navigation"
    >
      <div className="mx-auto flex max-w-[1200px] items-center gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-neutral-200 text-sm text-primary hover:bg-neutral-50"
          aria-label="Home"
        >
          ⌂
        </Link>

        <div className="relative shrink-0">
          <button
            type="button"
            className="flex items-center gap-2 rounded border border-neutral-200 px-3 py-2 text-sm font-medium text-primary"
            aria-expanded={dropdownOpen}
            onClick={() => setDropdownOpen((open) => !open)}
          >
            {t(config.metaLabelKey as never)}
            <span aria-hidden="true">▾</span>
          </button>
          {dropdownOpen ? (
            <ul className="absolute left-0 top-full z-20 mt-1 min-w-[160px] border border-neutral-200 bg-white py-1 shadow-md">
              {config.items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {t(item.labelKey as never)}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <ul className="flex flex-1 items-center gap-1 overflow-x-auto pb-1 md:gap-2">
          {config.items.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <li key={item.id} className="shrink-0">
                <Link
                  href={item.href}
                  className={cn(
                    'block rounded px-3 py-2 text-sm whitespace-nowrap transition-colors',
                    !staticMode && isActive
                      ? 'bg-primary text-white'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary',
                    staticMode && 'hover:bg-neutral-100 hover:text-primary',
                  )}
                  aria-current={!staticMode && isActive ? 'page' : undefined}
                >
                  {t(item.labelKey as never)}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
