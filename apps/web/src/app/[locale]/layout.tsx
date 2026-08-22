/**
 * locale.layout (locale 레이아웃)
 * ===============================
 * locale별 html lang, SEO metadata, JSON-LD, SiteShell
 *
 * [Main Functions]
 * - generateStaticParams
 * - generateMetadata
 * - LocaleLayout
 *
 * [Dependencies]
 * - @/i18n/routing, @/lib/i18n, @/lib/seo, @/components/layout/site-shell, @/components/seo/json-ld-organization
 */

import { JsonLdOrganization } from '@/components/seo/json-ld-organization';
import { SiteShell } from '@/components/layout/site-shell';
import { routing } from '@/i18n/routing';
import { getMessages, getTranslations, NextIntlClientProvider, setRequestLocale } from '@/lib/i18n';
import { getSiteBaseUrl } from '@/lib/seo';
import { getImage, getSite } from '@repo/env';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '@/styles/globals.css';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

type Locale = (typeof routing.locales)[number];

// 1. generateStaticParams
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// 2. generateMetadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const site = getSite();
  const baseUrl = getSiteBaseUrl();
  const title = site.companyName[locale as Locale] ?? t('title');
  const description = t('meta.description');
  const ogImage = getImage('common.ogDefault');

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    openGraph: {
      type: 'website',
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      url: `${baseUrl}/${locale}/`,
      siteName: title,
      title,
      description,
      images: ogImage.src
        ? [{ url: ogImage.src, width: 1200, height: 630, alt: ogImage.alt?.[locale as Locale] }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// 3. LocaleLayout
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const site = getSite();
  const logoAsset = getImage('common.logo');
  const footerLogoAsset = getImage('common.logoFooter');

  return (
    <html lang={locale}>
      <body className="font-sans antialiased">
        <JsonLdOrganization locale={locale as Locale} />
        <NextIntlClientProvider messages={messages}>
          <SiteShell
            locale={locale as Locale}
            site={site}
            logoAsset={logoAsset}
            footerLogoAsset={footerLogoAsset}
          >
            {children}
          </SiteShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
