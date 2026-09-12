/**
 * company.location.page (찾아오시는 길)
 * ======================================
 * SubPageLayout + LocationSection
 *
 * [Main Functions]
 * - LocationPage
 *
 * [Dependencies]
 * - @/lib/sub-page-layout, sections/company/location-section
 */

import { LocationSection } from '@/components/sections/company/location-section';
import { SubPageLayout } from '@/lib/sub-page-layout';
import { buildSubPageMetadata } from '@/lib/sub-page-metadata';
import type { Metadata } from 'next';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildSubPageMetadata({
    locale,
    namespace: 'company',
    pageKey: 'location',
    currentPath: '/company/location',
  });
}

// 1. LocationPage
export default async function LocationPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <SubPageLayout
      locale={locale}
      section="company"
      namespace="company"
      imagePath="company.hero"
      currentPath="/company/location"
      pageKey="location"
    >
      <LocationSection locale={locale} />
    </SubPageLayout>
  );
}
