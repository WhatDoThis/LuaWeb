/**
 * pr-center.disclosure.page (공시정보)
 * ====================================
 * GNB 미연결 — SubPageLayout + 준비 중 empty state
 *
 * [Main Functions]
 * - DisclosurePage
 *
 * [Dependencies]
 * - @/lib/sub-page-layout, @/lib/i18n
 */

import { SubPageLayout } from '@/lib/sub-page-layout';
import { getTranslations, setRequestLocale } from '@/lib/i18n';
import { buildSubPageMetadata } from '@/lib/sub-page-metadata';
import type { Metadata } from 'next';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildSubPageMetadata({
    locale,
    namespace: 'prCenter',
    pageKey: 'disclosure',
    currentPath: '/pr-center/disclosure',
  });
}

// 1. DisclosurePage
export default async function DisclosurePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('prCenter');

  return (
    <SubPageLayout
      locale={locale}
      section="prCenter"
      namespace="prCenter"
      imagePath="prCenter.hero"
      currentPath="/pr-center/disclosure"
      pageKey="disclosure"
    >
      <div className="mx-auto max-w-xl rounded-2xl border border-neutral-200 bg-gradient-to-br from-white to-primary/[0.03] px-8 py-10 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
            <path
              d="M8 4h8a2 2 0 0 1 2 2v14l-4-3-4 3-4-3-4 3V6a2 2 0 0 1 2-2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="mt-5 text-lg font-semibold text-primary">{t('pages.disclosure.emptyMessage')}</p>
        <a
          href={t('pages.disclosure.dartUrl')}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary/40 hover:bg-primary/[0.04]"
        >
          {t('pages.disclosure.dartLink')}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </SubPageLayout>
  );
}
