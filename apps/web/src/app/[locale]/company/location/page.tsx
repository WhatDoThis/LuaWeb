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

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

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
