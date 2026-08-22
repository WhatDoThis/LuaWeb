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
        'absolute left-0 top-full min-w-[200px] border border-neutral-200 bg-white py-2 shadow-lg transition-opacity',
        visible ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={item.href}
            className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-primary"
          >
            {labels[item.labelKey] ?? item.id}
          </Link>
        </li>
      ))}
    </ul>
  );
}
