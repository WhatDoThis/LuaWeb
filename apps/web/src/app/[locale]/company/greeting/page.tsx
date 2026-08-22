/**
 * company.greeting.page (CEO 인사말)
 * ==================================
 * SubPageLayout + GreetingSection
 *
 * [Main Functions]
 * - GreetingPage
 *
 * [Dependencies]
 * - @/lib/sub-page-layout, sections/company/greeting-section
 */

import { GreetingSection } from '@/components/sections/company/greeting-section';
import { SubPageLayout } from '@/lib/sub-page-layout';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

// 1. GreetingPage
export default async function GreetingPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <SubPageLayout
      locale={locale}
      section="company"
      namespace="company"
      imagePath="company.hero"
      currentPath="/company/greeting"
      pageKey="greeting"
    >
      <GreetingSection locale={locale} />
    </SubPageLayout>
  );
}
