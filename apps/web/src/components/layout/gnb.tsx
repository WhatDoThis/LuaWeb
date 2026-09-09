/**
 * layout.gnb (글로벌 네비게이션)
 * ==============================
 * desktop hover submenu, 상위 메뉴 첫 하위 링크·활성 표시
 *
 * [Main Functions]
 * - Gnb
 *
 * [Dependencies]
 * - @/lib/nav, layout/gnb-submenu, @/i18n/navigation, @/lib/i18n
 */

'use client';

import { GnbSubmenu } from '@/components/layout/gnb-submenu';
import { Link, usePathname } from '@/i18n/navigation';
import type { NavItem } from '@/lib/nav';
import { cn } from '@/lib/cn';
import { useTranslations } from '@/lib/i18n';
import { useEffect, useState } from 'react';

export type GnbProps = {
  items: NavItem[];
};

function isSectionActive(pathname: string, item: NavItem): boolean {
  if (item.children?.some((child) => pathname === child.href || pathname.startsWith(`${child.href}/`))) {
    return true;
  }
  return item.href ? pathname === item.href || pathname.startsWith(`${item.href}/`) : false;
}

// 1. Gnb
export function Gnb({ items }: GnbProps) {
  const t = useTranslations('common');
  const pathname = usePathname();
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
        {items.map((item) => {
          const sectionActive = isSectionActive(pathname, item);
          const parentHref = item.href ?? item.children?.[0]?.href;

          return (
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
              {parentHref ? (
                <Link
                  href={parentHref}
                  className={cn(
                    'lua-nav-link block py-5',
                    sectionActive && 'text-primary',
                  )}
                  aria-current={sectionActive ? 'page' : undefined}
                  onFocus={() => setActiveId(item.id)}
                >
                  {labelMap[item.labelKey]}
                </Link>
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
          );
        })}
      </ul>
    </nav>
  );
}
