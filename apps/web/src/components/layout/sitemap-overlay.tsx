/**
 * layout.sitemap-overlay (전체 메뉴 오버레이)
 * =========================================
 * mobile fullscreen + Accordion 1depth
 *
 * [Main Functions]
 * - SitemapOverlay
 *
 * [Dependencies]
 * - ui/accordion, @/i18n/navigation, @/lib/nav, @/lib/i18n
 */

'use client';

import { Accordion } from '@/components/ui/accordion';
import { ImageAssetView } from '@/components/ui/image-asset-view';
import { Link } from '@/i18n/navigation';
import type { ImageAsset } from '@repo/env';
import type { NavItem } from '@/lib/nav';
import { useTranslations } from '@/lib/i18n';
import { useEffect } from 'react';

export type SitemapOverlayProps = {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  logoAsset: ImageAsset;
  locale: 'ko' | 'en';
};

// 1. SitemapOverlay
export function SitemapOverlay({
  open,
  onClose,
  navItems,
  logoAsset,
  locale,
}: SitemapOverlayProps) {
  const t = useTranslations('common');

  useEffect(() => {
    if (!open) {
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) {
    return null;
  }

  const accordionItems = navItems.map((item) => ({
    id: item.id,
    title: t(item.labelKey as never),
    content: (
      <ul className="space-y-2">
        {item.children?.map((child) => (
          <li key={child.id}>
            <Link
              href={child.href}
              className="block text-sm text-neutral-700 hover:text-primary"
              onClick={onClose}
            >
              {t(child.labelKey as never)}
            </Link>
          </li>
        ))}
      </ul>
    ),
  }));

  return (
    <div className="fixed inset-0 z-50 bg-white lg:hidden">
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4">
        <ImageAssetView
          asset={logoAsset}
          locale={locale}
          path="common.logo"
          className="h-10 w-[140px]"
        />
        <button
          type="button"
          className="text-sm font-medium text-neutral-600"
          aria-label={t('layout.menuClose')}
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <Accordion items={accordionItems} />
    </div>
  );
}
