/**
 * management.ethics.page (윤리경영)
 * =================================
 * SubPageLayout + EthicsBlock
 *
 * [Main Functions]
 * - EthicsPage
 *
 * [Dependencies]
 * - @/lib/sub-page-layout, sections/management/ethics-block
 */

import { EthicsBlock } from '@/components/sections/management/ethics-block';
import { SubPageLayout } from '@/lib/sub-page-layout';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

// 1. EthicsPage
export default async function EthicsPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <SubPageLayout
      locale={locale}
      section="management"
      namespace="management"
      imagePath="management.hero"
      currentPath="/management/ethics"
      pageKey="ethics"
    >
      <EthicsBlock locale={locale} />
    </SubPageLayout>
  );
}
