/**
 * company.overview.page (회사개요)
 * ================================
 * SubPageLayout + OverviewSection
 *
 * [Main Functions]
 * - OverviewPage
 *
 * [Dependencies]
 * - @/lib/sub-page-layout, sections/company/overview-section
 */

import { OverviewSection } from '@/components/sections/company/overview-section';
import { SubPageLayout } from '@/lib/sub-page-layout';
import { buildSubPageMetadata } from '@/lib/sub-page-metadata';
import type { Metadata } from 'next';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildSubPageMetadata({
    locale,
    namespace: 'company',
    pageKey: 'overview',
    currentPath: '/company/overview',
  });
}

// 1. OverviewPage
export default async function OverviewPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <SubPageLayout
      locale={locale}
      section="company"
      namespace="company"
      imagePath="company.hero"
      currentPath="/company/overview"
      pageKey="overview"
    >
      <OverviewSection locale={locale} />
    </SubPageLayout>
  );
}
