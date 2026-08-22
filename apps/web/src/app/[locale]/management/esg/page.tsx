/**
 * management.esg.page (ESG 경영)
 * ==============================
 * SubPageLayout + EsgBlock
 *
 * [Main Functions]
 * - EsgPage
 *
 * [Dependencies]
 * - @/lib/sub-page-layout, sections/management/esg-block
 */

import { EsgBlock } from '@/components/sections/management/esg-block';
import { SubPageLayout } from '@/lib/sub-page-layout';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

// 1. EsgPage
export default async function EsgPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <SubPageLayout
      locale={locale}
      section="management"
      namespace="management"
      imagePath="management.hero"
      currentPath="/management/esg"
      pageKey="esg"
    >
      <EsgBlock locale={locale} />
    </SubPageLayout>
  );
}
