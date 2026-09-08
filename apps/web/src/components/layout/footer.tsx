/**
 * layout.footer (푸터)
 * ====================
 * 로고·개인정보·문의(주소·이메일 placeholder) — h180 / py30 3열 그리드
 *
 * [Main Functions]
 * - Footer
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

// 1. ContactIcon
function ContactIcon({ children }: ContactIconProps) {
  return (
    <span
      className="mt-0.5 inline-flex h-4 w-4 shrink-0 text-neutral-400"
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

// 2. Footer
export function Footer({ locale, site, footerLogoAsset, onPrivacyClick }: FooterProps) {
  const t = useTranslations('common');
  const addressLines = site.addresses.hq[locale].split('\n');

  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-[1200px] px-4 py-[30px] md:h-[180px]">
        <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-[1.1fr_0.7fr_1.2fr] md:gap-4">
          <div className="flex h-full min-h-0 items-center">
            <div className="flex max-w-[220px] items-center">
              <ImageAssetView
                asset={footerLogoAsset}
                locale={locale}
                path="common.logoFooter"
                className="w-[220px] max-w-[220px] [&_img]:h-auto [&_img]:w-full [&_img]:max-w-[220px] [&_img]:object-contain"
              />
            </div>
          </div>
          <div className="flex h-full items-center justify-center">
            <button
              type="button"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              onClick={onPrivacyClick}
            >
              {t('footer.privacy')}
            </button>
          </div>
          <div className="flex h-full items-center md:justify-end">
            <div className="w-full max-w-sm text-left">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-900">
                {t('footer.contactTitle')}
              </h2>
              <ul className="mt-2 space-y-2 text-sm text-neutral-600">
                <li className="flex gap-2.5">
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
                    <Link href="/company/location" className="leading-relaxed hover:text-primary hover:underline">
                      {addressLines.map((line, index) => (
                        <span key={`${line}-${index}`}>
                          {line}
                          {index < addressLines.length - 1 ? <br /> : null}
                        </span>
                      ))}
                    </Link>
                  </span>
                </li>
                <li className="flex gap-2.5">
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
                    {site.contact.email ? (
                      <a href={`mailto:${site.contact.email}`} className="hover:text-primary hover:underline">
                        {site.contact.email}
                      </a>
                    ) : (
                      <span className="text-neutral-400">{t('footer.emailPending')}</span>
                    )}
                  </span>
                </li>
                {site.contact.tel ? (
                  <li className="flex gap-2.5">
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
                      <a
                        href={`tel:${site.contact.tel.replace(/\s/g, '')}`}
                        className="hover:text-primary hover:underline"
                      >
                        {site.contact.tel}
                      </a>
                    </span>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-200/80 py-5 text-center text-xs tracking-wide text-neutral-500">
        {site.copyright[locale]}
      </div>
    </footer>
  );
}
