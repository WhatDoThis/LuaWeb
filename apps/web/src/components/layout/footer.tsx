/**
 * layout.footer (푸터)
 * ====================
 * 3-column — logo, privacy link, contact (site.json)
 *
 * [Main Functions]
 * - Footer
 *
 * [Dependencies]
 * - @repo/env SiteConfig, @/lib/i18n
 */

'use client';

import type { ImageAsset, SiteConfig } from '@repo/env';
import { ImageAssetView } from '@/components/ui/image-asset-view';
import { useTranslations } from '@/lib/i18n';

export type FooterProps = {
  locale: 'ko' | 'en';
  site: SiteConfig;
  footerLogoAsset: ImageAsset;
  onPrivacyClick: () => void;
};

// 1. Footer
export function Footer({ locale, site, footerLogoAsset, onPrivacyClick }: FooterProps) {
  const t = useTranslations('common');

  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-100">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <ImageAssetView
            asset={footerLogoAsset}
            locale={locale}
            path="common.logoFooter"
            className="h-11 w-[160px]"
          />
          <p className="mt-2 text-sm text-neutral-600">{site.companyName[locale]}</p>
        </div>
        <div>
          <button
            type="button"
            className="text-sm font-medium text-primary underline-offset-2 hover:underline"
            onClick={onPrivacyClick}
          >
            {t('footer.privacy')}
          </button>
        </div>
        <div className="space-y-1 text-sm text-neutral-600">
          <p>
            <span className="font-medium text-neutral-800">{t('footer.address')}: </span>
            {site.addresses.hq[locale]}
          </p>
          <p>
            <span className="font-medium text-neutral-800">{t('footer.tel')}: </span>
            {site.contact.tel}
          </p>
          <p>
            <span className="font-medium text-neutral-800">{t('footer.fax')}: </span>
            {site.contact.fax}
          </p>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-4 text-center text-xs text-neutral-500">
        {site.copyright[locale]}
      </div>
    </footer>
  );
}
