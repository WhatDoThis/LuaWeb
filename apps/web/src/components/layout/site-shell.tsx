/**
 * layout.site-shell (사이트 레이아웃 shell)
 * ==========================================
 * Header/Footer/Modal/Sitemap/TopButton 상태 조합
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
import { useTranslations } from '@/lib/i18n';
import { useState } from 'react';

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

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        locale={locale}
        navItems={navItems}
        logoAsset={logoAsset}
        onMenuOpen={() => setMenuOpen(true)}
      />
      <SitemapOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navItems={navItems}
        logoAsset={logoAsset}
        locale={locale}
      />
      <div className="flex-1">{children}</div>
      <Footer
        locale={locale}
        site={site}
        footerLogoAsset={footerLogoAsset}
        onPrivacyClick={() => setPrivacyOpen(true)}
      />
      <TopButton />
      <Modal open={privacyOpen} onClose={() => setPrivacyOpen(false)} title={t('privacy.title')}>
        <p>{t('privacy.body')}</p>
      </Modal>
    </div>
  );
}
