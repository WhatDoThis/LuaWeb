/**
 * technology.tech-1.page (기술 소개 1)
 * ===================================
 * SubPageLayout + TechPageSections — LnbBar staticMode, CTA 없음
 *
 * [Main Functions]
 * - Tech1Page
 *
 * [Dependencies]
 * - @/lib/sub-page-layout, sections/technology/tech-page-sections
 */

import { TechPageSections } from '@/components/sections/technology/tech-page-sections';
import { SubPageLayout } from '@/lib/sub-page-layout';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

// 1. Tech1Page
export default async function Tech1Page({ params }: PageProps) {
  const { locale } = await params;
  return (
    <SubPageLayout
      locale={locale}
      section="technology"
      namespace="technology"
      imagePath="technology.tech1.hero"
      currentPath="/technology/tech-1"
      pageKey="tech1"
      staticMode
    >
      <TechPageSections locale={locale} pageKey="tech1" />
    </SubPageLayout>
  );
}
