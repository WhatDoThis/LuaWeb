/**
 * layout.header (헤더)
 * ====================
 * Logo, GNB, LangSwitcher, 모바일 메뉴 버튼
 *
 * [Main Functions]
 * - Header
 *
 * [Dependencies]
 * - layout/gnb, layout/lang-switcher, @/lib/nav
 */

'use client';

import { Gnb } from '@/components/layout/gnb';
import { LangSwitcher } from '@/components/layout/lang-switcher';
import { ImageAssetView } from '@/components/ui/image-asset-view';
import { Link } from '@/i18n/navigation';
import type { ImageAsset } from '@repo/env';
import type { NavItem } from '@/lib/nav';
import { useTranslations } from '@/lib/i18n';

export type HeaderProps = {
  locale: 'ko' | 'en';
  navItems: NavItem[];
  logoAsset: ImageAsset;
  onMenuOpen: () => void;
};

// 1. Header
export function Header({ locale, navItems, logoAsset, onMenuOpen }: HeaderProps) {
  const t = useTranslations('common');

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4">
        <Link href="/" className="block shrink-0">
          <ImageAssetView
            asset={logoAsset}
            locale={locale}
            path="common.logo"
            className="h-12 w-[180px]"
            priority
          />
        </Link>
        <Gnb items={navItems} />
        <div className="flex items-center gap-4">
          <LangSwitcher locale={locale} />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-neutral-200 text-primary lg:hidden"
            aria-label={t('layout.menuOpen')}
            onClick={onMenuOpen}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
