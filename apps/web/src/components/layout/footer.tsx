/**
 * layout.footer (푸터)
 * ====================
 * 목업형 2단 — mobile: 좌측 정렬 통일 / lg+: 로고|주소중앙|문의우측
 *
 * [Main Functions]
 * - Footer
 *
 * [Dependencies]
 * - @repo/env SiteConfig, @/lib/i18n, @/i18n/navigation, @/lib/site-container
 */

'use client';

import type { ImageAsset, SiteConfig } from '@repo/env';
import { useTranslations } from '@/lib/i18n';
import { ImageAssetView } from '@/components/ui/image-asset-view';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { siteContainerClass } from '@/lib/site-container';

export type FooterProps = {
  locale: 'ko' | 'en';
  site: SiteConfig;
  footerLogoAsset: ImageAsset;
  onPrivacyClick: () => void;
};

// 1. Footer
export function Footer({ locale, site, footerLogoAsset, onPrivacyClick }: FooterProps) {
  const t = useTranslations('common');
  const addressOneLine = site.addresses.hq[locale].replace(/\n+/g, ' ').trim();

  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50">
      <div className={cn(siteContainerClass, 'py-4 lg:py-5 xl:py-6')}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[auto_minmax(0,1fr)_minmax(220px,auto)] lg:items-center lg:gap-x-6 xl:gap-x-8">
          <div className="max-w-full shrink-0">
            <ImageAssetView
              asset={footerLogoAsset}
              locale={locale}
              path="common.logoFooter"
              className="lua-logo-footer"
            />
          </div>

          <div className="flex w-full min-w-0 justify-start px-0 lg:justify-center lg:px-2">
            <address
              className={cn(
                'lua-type-footer-address max-w-full break-words not-italic text-left lg:max-w-md lg:text-center xl:max-w-lg',
                locale === 'ko' && 'lg:whitespace-nowrap',
              )}
            >
              <Link href="/company/location" className="hover:text-primary hover:underline">
                {addressOneLine}
              </Link>
            </address>
          </div>

          <div className="w-full shrink-0 text-left lg:w-auto lg:min-w-[220px] lg:text-right xl:min-w-[260px]">
            <p className="lua-type-footer-contact-title">{t('footer.contactTitle')}</p>
            <p className="lua-type-body-sm mt-0.5 text-neutral-800">
              <span className="font-bold text-secondary">{t('footer.email')}</span>{' '}
              {site.contact.email ? (
                <a
                  href={`mailto:${site.contact.email}`}
                  className="hover:text-primary hover:underline"
                >
                  {site.contact.email}
                </a>
              ) : (
                <span className="text-neutral-400">{t('footer.emailPending')}</span>
              )}
            </p>
            {site.contact.tel ? (
              <p className="lua-type-body-sm mt-1 text-neutral-800">
                <span className="font-bold text-secondary">{t('footer.tel')}</span>{' '}
                <a
                  href={`tel:${site.contact.tel.replace(/\s/g, '')}`}
                  className="hover:text-primary hover:underline"
                >
                  {site.contact.tel}
                </a>
              </p>
            ) : null}
            {site.contact.fax ? (
              <p className="lua-type-body-sm mt-1 text-neutral-800">
                <span className="font-bold text-secondary">{t('footer.fax')}</span>{' '}
                {site.contact.fax}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-4 border-t border-neutral-200/80 pt-3 text-left lg:mt-5 lg:pt-4 lg:text-center">
          <p className="lua-type-footer-legal text-neutral-500">{site.copyright[locale]}</p>
          <button
            type="button"
            className="lua-type-footer-legal mt-1 text-primary underline-offset-4 hover:underline"
            onClick={onPrivacyClick}
          >
            {t('footer.privacy')}
          </button>
        </div>
      </div>
    </footer>
  );
}
