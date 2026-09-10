/**
 * layout.gnb-submenu (GNB 서브메뉴)
 * =================================
 * desktop hover 2depth 드롭다운
 *
 * [Main Functions]
 * - GnbSubmenu
 *
 * [Dependencies]
 * - @/i18n/navigation, @/lib/nav, @/lib/cn
 */

'use client';

import { Link } from '@/i18n/navigation';
import type { NavChild } from '@/lib/nav';
import { cn } from '@/lib/cn';

export type GnbSubmenuProps = {
  items: NavChild[];
  labels: Record<string, string>;
  visible: boolean;
};

// 1. GnbSubmenu
export function GnbSubmenu({ items, labels, visible }: GnbSubmenuProps) {
  return (
    <ul
      className={cn(
        'absolute left-0 top-full w-max min-w-[220px] border border-neutral-200/90 bg-white py-2 shadow-xl transition-all duration-200',
        visible ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0 pointer-events-none',
      )}
      aria-hidden={!visible}
    >
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={item.href}
            className="lua-type-nav-sub block whitespace-nowrap px-5 py-2.5 text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-primary"
          >
            {labels[item.labelKey] ?? item.id}
          </Link>
        </li>
      ))}
    </ul>
  );
}
