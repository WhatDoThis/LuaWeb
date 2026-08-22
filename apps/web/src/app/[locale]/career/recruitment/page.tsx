/**
 * career.recruitment.page (채용안내)
 * ==================================
 * SubPageLayout + RecruitmentSection
 *
 * [Main Functions]
 * - RecruitmentPage
 *
 * [Dependencies]
 * - @/lib/sub-page-layout, sections/career/recruitment-section
 */

import { RecruitmentSection } from '@/components/sections/career/recruitment-section';
import { SubPageLayout } from '@/lib/sub-page-layout';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

// 1. RecruitmentPage
export default async function RecruitmentPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <SubPageLayout
      locale={locale}
      section="career"
      namespace="career"
      imagePath="career.hero"
      currentPath="/career/recruitment"
      pageKey="recruitment"
    >
      <RecruitmentSection locale={locale} />
    </SubPageLayout>
  );
}
