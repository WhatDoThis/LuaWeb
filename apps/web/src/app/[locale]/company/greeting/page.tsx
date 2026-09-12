/**
 * company.greeting.page (CEO 인사말)
 * ==================================
 * SubPageLayout + GreetingSection
 *
 * [Main Functions]
 * - GreetingPage
 *
 * [Dependencies]
 * - @/lib/sub-page-layout, sections/company/greeting-section
 */

import { GreetingSection } from '@/components/sections/company/greeting-section';
import { SubPageLayout } from '@/lib/sub-page-layout';
import { buildSubPageMetadata } from '@/lib/sub-page-metadata';
import type { Metadata } from 'next';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildSubPageMetadata({
    locale,
    namespace: 'company',
    pageKey: 'greeting',
    currentPath: '/company/greeting',
  });
}

// 1. GreetingPage
export default async function GreetingPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <SubPageLayout
      locale={locale}
      section="company"
      namespace="company"
      imagePath="company.hero"
      currentPath="/company/greeting"
      pageKey="greeting"
    >
      <GreetingSection locale={locale} />
    </SubPageLayout>
  );
}
