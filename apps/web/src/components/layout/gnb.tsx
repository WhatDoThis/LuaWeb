/**
 * layout.gnb (글로벌 네비게이션)
 * ==============================
 * desktop hover submenu / mobile은 SiteShell에서 sitemap 처리
 *
 * [Main Functions]
 * - Gnb
 *
 * [Dependencies]
 * - @/lib/nav, layout/gnb-submenu, @/lib/i18n
 */

'use client';

import { GnbSubmenu } from '@/components/layout/gnb-submenu';
import type { NavItem } from '@/lib/nav';
import { useTranslations } from '@/lib/i18n';
import { useEffect, useState } from 'react';

export type GnbProps = {
  items: NavItem[];
};

// 1. Gnb
export function Gnb({ items }: GnbProps) {
  const t = useTranslations('common');
  const [activeId, setActiveId] = useState<string | null>(null);

  const labelMap = items.reduce<Record<string, string>>((acc, item) => {
    acc[item.labelKey] = t(item.labelKey as never);
    item.children?.forEach((child) => {
      acc[child.labelKey] = t(child.labelKey as never);
    });
    return acc;
  }, {});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveId(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <nav className="hidden lg:block" aria-label="Main navigation">
      <ul className="flex items-center gap-8">
        {items.map((item) => (
          <li
            key={item.id}
            className="relative"
            onMouseEnter={() => setActiveId(item.id)}
            onMouseLeave={() => setActiveId(null)}
            onFocus={() => setActiveId(item.id)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setActiveId(null);
              }
            }}
          >
            {item.children ? (
              <button
                type="button"
                className="lua-nav-link block py-5"
                aria-expanded={activeId === item.id}
                aria-haspopup="true"
                onFocus={() => setActiveId(item.id)}
              >
                {labelMap[item.labelKey]}
              </button>
            ) : (
              <span className="lua-nav-link block py-5">{labelMap[item.labelKey]}</span>
            )}
            {item.children ? (
              <GnbSubmenu
                items={item.children}
                labels={labelMap}
                visible={activeId === item.id}
              />
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
