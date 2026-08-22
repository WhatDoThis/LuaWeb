/**
 * management.policy.page (경영방침)
 * =================================
 * SubPageLayout + PolicyDiagram
 *
 * [Main Functions]
 * - PolicyPage
 *
 * [Dependencies]
 * - @/lib/sub-page-layout, sections/management/policy-diagram
 */

import { PolicyDiagram } from '@/components/sections/management/policy-diagram';
import { SubPageLayout } from '@/lib/sub-page-layout';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

// 1. PolicyPage
export default async function PolicyPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <SubPageLayout
      locale={locale}
      section="management"
      namespace="management"
      imagePath="management.hero"
      currentPath="/management/policy"
      pageKey="policy"
    >
      <PolicyDiagram locale={locale} />
    </SubPageLayout>
  );
}
