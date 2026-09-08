/**
 * layout.footer (푸터)
 * ====================
 * 3-column — logo, privacy link, Contact Us 연락처 (site.json)
 *
 * [Main Functions]
 * - Footer
 * - toTelHref
 * - ContactIcon
 *
 * [Dependencies]
 * - @repo/env SiteConfig, @/lib/i18n, @/i18n/navigation
 */

'use client';

import type { ImageAsset, SiteConfig } from '@repo/env';
import { useTranslations } from '@/lib/i18n';
import { ImageAssetView } from '@/components/ui/image-asset-view';
import { Link } from '@/i18n/navigation';

export type FooterProps = {
  locale: 'ko' | 'en';
  site: SiteConfig;
  footerLogoAsset: ImageAsset;
  onPrivacyClick: () => void;
};

type ContactIconProps = {
  children: React.ReactNode;
};

// 1. toTelHref
function toTelHref(tel: string): string {
  return `tel:${tel.replace(/\s/g, '')}`;
}

// 2. ContactIcon
function ContactIcon({ children }: ContactIconProps) {
  return (
    <span
      className="mt-0.5 inline-flex h-4 w-4 shrink-0 text-neutral-500"
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

// 3. Footer
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
            className="[&_img]:max-h-10 [&_img]:w-auto"
          />
          <p className="mt-2 text-sm text-neutral-600">{site.companyName[locale]}</p>
        </div>
        <div className="flex items-start">
          <button
            type="button"
            className="text-sm font-medium text-primary underline-offset-2 hover:underline"
            onClick={onPrivacyClick}
          >
            {t('footer.privacy')}
          </button>
        </div>
        <div>
          <h2 className="text-base font-semibold text-neutral-900">{t('footer.contactTitle')}</h2>
          <ul className="mt-3 space-y-2.5 text-sm text-neutral-600">
            <li className="flex gap-2">
              <ContactIcon>
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path
                    d="M8 1.5a4.25 4.25 0 0 0-4.25 4.25c0 3.19 4.25 8.75 4.25 8.75s4.25-5.56 4.25-8.75A4.25 4.25 0 0 0 8 1.5Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <circle cx="8" cy="5.75" r="1.25" fill="currentColor" />
                </svg>
              </ContactIcon>
              <span>
                <span className="sr-only">{t('footer.address')}: </span>
                <Link
                  href="/company/location"
                  className="hover:text-primary hover:underline"
                >
                  {site.addresses.hq[locale]}
                </Link>
              </span>
            </li>
            {site.contact.tel ? (
            <li className="flex gap-2">
              <ContactIcon>
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path
                    d="M3.5 2.75h9a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-8.5a1 1 0 0 1 1-1Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path d="M6 5.5h4M6 8h4M6 10.5h2.5" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </ContactIcon>
              <span>
                <span className="font-medium text-neutral-800">{t('footer.tel')}: </span>
                <a href={toTelHref(site.contact.tel)} className="hover:text-primary hover:underline">
                  {site.contact.tel}
                </a>
              </span>
            </li>
            ) : null}
            {site.contact.fax ? (
            <li className="flex gap-2">
              <ContactIcon>
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path
                    d="M3.5 2.75h9a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-8.5a1 1 0 0 1 1-1Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path d="M5.5 5.5h5M5.5 8h5M5.5 10.5h3" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </ContactIcon>
              <span>
                <span className="font-medium text-neutral-800">{t('footer.fax')}: </span>
                {site.contact.fax}
              </span>
            </li>
            ) : null}
            {site.contact.email ? (
            <li className="flex gap-2">
              <ContactIcon>
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path
                    d="M2.75 4.25 8 8.5l5.25-4.25M3.5 2.75h9c.69 0 1.25.56 1.25 1.25v8c0 .69-.56 1.25-1.25 1.25h-9c-.69 0-1.25-.56-1.25-1.25v-8c0-.69.56-1.25 1.25-1.25Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              </ContactIcon>
              <span>
                <span className="font-medium text-neutral-800">{t('footer.email')}: </span>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="hover:text-primary hover:underline"
                >
                  {site.contact.email}
                </a>
              </span>
            </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-4 text-center text-xs text-neutral-500">
        {site.copyright[locale]}
      </div>
    </footer>
  );
}
