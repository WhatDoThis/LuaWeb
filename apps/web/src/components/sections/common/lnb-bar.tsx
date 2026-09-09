/**
 * sections.lnb-bar (로컬 네비게이션)
 * ==================================
 * 홈 + 1depth 드롭다운 + 2depth 링크 — Escape·외부 클릭 닫기
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
import { useEffect, useRef, useState } from 'react';

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen]);

  return (
    <nav className="border-b border-neutral-200 bg-white" aria-label="Local navigation">
      <div className="mx-auto flex max-w-[1200px] items-center gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-neutral-200 text-sm text-primary hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Home"
        >
          ⌂
        </Link>

        <div ref={dropdownRef} className="relative shrink-0">
          <button
            type="button"
            className="flex items-center gap-2 rounded border border-neutral-200 px-3 py-2 text-sm font-medium text-primary focus-visible:ring-2 focus-visible:ring-primary"
            aria-expanded={dropdownOpen}
            aria-controls="lnb-section-menu"
            onClick={() => setDropdownOpen((open) => !open)}
          >
            {t(config.metaLabelKey as never)}
            <span aria-hidden="true">▾</span>
          </button>
          {dropdownOpen ? (
            <ul
              id="lnb-section-menu"
              className="absolute left-0 top-full z-20 mt-1 min-w-[160px] border border-neutral-200 bg-white py-1 shadow-md"
            >
              {config.items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 focus-visible:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-primary"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {t(item.labelKey as never)}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <ul className="hidden flex-1 items-center gap-1 md:flex md:gap-2">
          {config.items.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <li key={item.id} className="shrink-0">
                <Link
                  href={item.href}
                  className={cn(
                    'block rounded px-3 py-2 text-sm whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-primary',
                    !staticMode && isActive
                      ? 'border-b-2 border-accent bg-primary/[0.06] font-semibold text-primary'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary',
                    staticMode && isActive && 'border-b-2 border-accent font-semibold text-primary',
                  )}
                  aria-current={isActive ? 'page' : undefined}
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
