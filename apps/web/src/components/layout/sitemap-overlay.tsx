/**
 * layout.sitemap-overlay (전체 메뉴 오버레이)
 * =========================================
 * mobile fullscreen + Accordion — focus trap, Escape
 *
 * [Main Functions]
 * - SitemapOverlay
 *
 * [Dependencies]
 * - ui/accordion, @/i18n/navigation, @/lib/nav, @/lib/i18n, @/lib/focus-trap, @/lib/site-identity
 */

'use client';

import { Accordion } from '@/components/ui/accordion';
import { ImageAssetView } from '@/components/ui/image-asset-view';
import { Link } from '@/i18n/navigation';
import { handleFocusTrapKeyDown } from '@/lib/focus-trap';
import type { ImageAsset } from '@repo/env';
import type { NavItem } from '@/lib/nav';
import { useTranslations } from '@/lib/i18n';
import { useEffect, useRef } from 'react';

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
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (panelRef.current) {
        handleFocusTrapKeyDown(event, panelRef.current);
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

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
              className="block rounded px-1 py-2 text-sm text-neutral-700 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
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
    <div
      ref={panelRef}
      id="sitemap-overlay"
      className="fixed inset-0 z-50 bg-white lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={t('layout.menuOpen')}
    >
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4">
        <ImageAssetView
          asset={logoAsset}
          locale={locale}
          path="common.logo"
          className="[&_img]:max-h-9 [&_img]:w-auto"
        />
        <button
          ref={closeButtonRef}
          type="button"
          className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md text-sm font-medium text-neutral-600 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
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
