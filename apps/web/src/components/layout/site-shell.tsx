/**
 * layout.site-shell (사이트 레이아웃 shell)
 * ==========================================
 * Header/Footer/Modal/Sitemap/TopButton — 메뉴·모달 포커스 복원
 *
 * [Main Functions]
 * - SiteShell
 *
 * [Dependencies]
 * - layout/*, ui/modal, @/lib/nav, @repo/env
 */

'use client';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { SitemapOverlay } from '@/components/layout/sitemap-overlay';
import { TopButton } from '@/components/layout/top-button';
import { Modal } from '@/components/ui/modal';
import { navItems } from '@/lib/nav';
import type { ImageAsset, SiteConfig } from '@repo/env';
import { LUA_SITE_ID } from '@/lib/site-identity';
import { useTranslations } from '@/lib/i18n';
import { useRef, useState } from 'react';

export type SiteShellProps = {
  locale: 'ko' | 'en';
  site: SiteConfig;
  logoAsset: ImageAsset;
  footerLogoAsset: ImageAsset;
  children: React.ReactNode;
};

// 1. SiteShell
export function SiteShell({
  locale,
  site,
  logoAsset,
  footerLogoAsset,
  children,
}: SiteShellProps) {
  const t = useTranslations('common');
  const [menuOpen, setMenuOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayOpen = menuOpen || privacyOpen;

  const closeMenu = () => {
    setMenuOpen(false);
    requestAnimationFrame(() => {
      menuButtonRef.current?.focus();
    });
  };

  return (
    <>
      <div
        id={`${LUA_SITE_ID}-site-root`}
        className="flex min-h-screen flex-col"
        aria-hidden={overlayOpen}
      >
        <Header
          locale={locale}
          navItems={navItems}
          logoAsset={logoAsset}
          menuOpen={menuOpen}
          menuButtonRef={menuButtonRef}
          onMenuOpen={() => setMenuOpen(true)}
        />
        <div className="flex-1">{children}</div>
        <Footer
          locale={locale}
          site={site}
          footerLogoAsset={footerLogoAsset}
          onPrivacyClick={() => setPrivacyOpen(true)}
        />
      </div>
      <SitemapOverlay
        open={menuOpen}
        onClose={closeMenu}
        navItems={navItems}
        logoAsset={logoAsset}
        locale={locale}
      />
      <TopButton hidden={overlayOpen} />
      <Modal
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        title={t('privacy.title')}
        closeLabel={t('layout.menuClose')}
        overlayCloseLabel={t('layout.menuClose')}
      >
        <p className="whitespace-pre-line">{t('privacy.body')}</p>
      </Modal>
    </>
  );
}
