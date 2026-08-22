/**
 * career.welfare.page (복리후생)
 * ==============================
 * SubPageLayout + WelfareGrid
 *
 * [Main Functions]
 * - WelfarePage
 *
 * [Dependencies]
 * - @/lib/sub-page-layout, sections/career/welfare-grid
 */

import { WelfareGrid } from '@/components/sections/career/welfare-grid';
import { SubPageLayout } from '@/lib/sub-page-layout';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

// 1. WelfarePage
export default async function WelfarePage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <SubPageLayout
      locale={locale}
      section="career"
      namespace="career"
      imagePath="career.hero"
      currentPath="/career/welfare"
      pageKey="welfare"
    >
      <WelfareGrid locale={locale} />
    </SubPageLayout>
  );
}
