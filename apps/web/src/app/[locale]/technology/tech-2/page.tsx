/**
 * technology.tech-2.page (기술 소개 2)
 * ===================================
 * SubPageLayout + TechPageSections — LnbBar staticMode, CTA 없음
 *
 * [Main Functions]
 * - Tech2Page
 *
 * [Dependencies]
 * - @/lib/sub-page-layout, sections/technology/tech-page-sections
 */

import { TechPageSections } from '@/components/sections/technology/tech-page-sections';
import { SubPageLayout } from '@/lib/sub-page-layout';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

// 1. Tech2Page
export default async function Tech2Page({ params }: PageProps) {
  const { locale } = await params;
  return (
    <SubPageLayout
      locale={locale}
      section="technology"
      namespace="technology"
      imagePath="technology.tech2.hero"
      currentPath="/technology/tech-2"
      pageKey="tech2"
      staticMode
    >
      <TechPageSections locale={locale} pageKey="tech2" />
    </SubPageLayout>
  );
}
