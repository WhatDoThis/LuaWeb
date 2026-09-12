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
import { buildSubPageMetadata } from '@/lib/sub-page-metadata';
import type { Metadata } from 'next';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildSubPageMetadata({
    locale,
    namespace: 'technology',
    pageKey: 'tech1',
    currentPath: '/technology/tech-1',
  });
}

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
