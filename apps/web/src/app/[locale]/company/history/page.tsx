/**
 * company.history.page (연혁)
 * ===========================
 * SubPageLayout + HistoryTimeline
 *
 * [Main Functions]
 * - HistoryPage
 *
 * [Dependencies]
 * - @/lib/sub-page-layout, sections/company/history-timeline
 */

import { HistoryTimeline } from '@/components/sections/company/history-timeline';
import { SubPageLayout } from '@/lib/sub-page-layout';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

// 1. HistoryPage
export default async function HistoryPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <SubPageLayout
      locale={locale}
      section="company"
      namespace="company"
      imagePath="company.hero"
      currentPath="/company/history"
      pageKey="history"
    >
      <HistoryTimeline locale={locale} />
    </SubPageLayout>
  );
}
