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

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

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
