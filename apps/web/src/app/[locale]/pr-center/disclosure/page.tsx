/**
 * pr-center.disclosure.page (공시정보)
 * ====================================
 * GNB 미연결 — Coming soon placeholder
 */

import { PageContainer } from '@/components/sections/common/page-container';
import { getTranslations, setRequestLocale } from '@/lib/i18n';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

export default async function DisclosurePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('prCenter');

  return (
    <PageContainer className="pb-[60px]">
      <main>
        <p className="text-lg font-medium text-primary">{t('disclosure.title')}</p>
        <p className="mt-4 text-neutral-600">Coming soon</p>
      </main>
    </PageContainer>
  );
}
