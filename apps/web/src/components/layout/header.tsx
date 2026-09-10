/**
 * layout.header (헤더)
 * ====================
 * Logo, GNB, LangSwitcher — SVG 햄버거·모바일 메뉴 a11y
 *
 * [Main Functions]
 * - Header
 * - MenuIcon
 *
 * [Dependencies]
 * - layout/gnb, layout/lang-switcher, @/lib/nav, @/lib/site-container
 */

'use client';

import { Gnb } from '@/components/layout/gnb';
import { LangSwitcher } from '@/components/layout/lang-switcher';
import { ImageAssetView } from '@/components/ui/image-asset-view';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { ImageAsset } from '@repo/env';
import type { NavItem } from '@/lib/nav';
import { siteContainerClass } from '@/lib/site-container';
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

type MenuIconProps = {
  open: boolean;
};

// 1. MenuIcon
function MenuIcon({ open }: MenuIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d={open ? 'M6 6l12 12M18 6 6 18' : 'M4 7h16M4 12h16M4 17h16'}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 2. Header
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
      <div
        className={cn(
          siteContainerClass,
          'flex h-[4.5rem] items-center md:h-[5rem]',
        )}
      >
        <Link
          href="/"
          className="block shrink-0 rounded-md py-1 focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ImageAssetView
            asset={logoAsset}
            locale={locale}
            path="common.logo"
            className="lua-logo-header"
            priority
          />
        </Link>
        <div className="hidden flex-1 justify-center px-6 lg:flex xl:px-10">
          <Gnb items={navItems} />
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-3 md:gap-5">
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
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>
    </header>
  );
}
