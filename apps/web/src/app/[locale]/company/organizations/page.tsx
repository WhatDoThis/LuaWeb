/**
 * company.organizations.page (조직도)
 * ===================================
 * SubPageLayout + OrgChart
 *
 * [Main Functions]
 * - OrganizationsPage
 *
 * [Dependencies]
 * - @/lib/sub-page-layout, sections/company/org-chart
 */

import { OrgChart } from '@/components/sections/company/org-chart';
import { SubPageLayout } from '@/lib/sub-page-layout';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

// 1. OrganizationsPage
export default async function OrganizationsPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <SubPageLayout
      locale={locale}
      section="company"
      namespace="company"
      imagePath="company.hero"
      currentPath="/company/organizations"
      pageKey="organizations"
    >
      <OrgChart locale={locale} />
    </SubPageLayout>
  );
}
