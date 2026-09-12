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
import { buildSubPageMetadata } from '@/lib/sub-page-metadata';
import type { Metadata } from 'next';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildSubPageMetadata({
    locale,
    namespace: 'technology',
    pageKey: 'tech2',
    currentPath: '/technology/tech-2',
  });
}

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
