/**
 * layout.header (헤더)
 * ====================
 * Logo, GNB, LangSwitcher — 프리미엄 네비 + 모바일 메뉴 a11y
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
import type { RefObject } from 'react';

export type HeaderProps = {
  locale: 'ko' | 'en';
  navItems: NavItem[];
  logoAsset: ImageAsset;
  menuOpen: boolean;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  onMenuOpen: () => void;
};

// 1. Header
export function Header({
  locale,
  navItems,
  logoAsset,
  menuOpen,
  menuButtonRef,
  onMenuOpen,
}: HeaderProps) {
  const t = useTranslations('common');

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex h-[4.25rem] max-w-[1200px] items-center justify-between px-4 md:h-[4.75rem]">
        <Link
          href="/"
          className="block shrink-0 rounded-md py-1 focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ImageAssetView
            asset={logoAsset}
            locale={locale}
            path="common.logo"
            className="[&_img]:max-h-10 [&_img]:w-auto md:[&_img]:max-h-12"
            priority
          />
        </Link>
        <Gnb items={navItems} />
        <div className="flex items-center gap-3 md:gap-5">
          <LangSwitcher locale={locale} />
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200/90 text-primary transition-colors hover:border-primary/30 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
            aria-label={t('layout.menuOpen')}
            aria-expanded={menuOpen}
            aria-controls="sitemap-overlay"
            onClick={onMenuOpen}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
