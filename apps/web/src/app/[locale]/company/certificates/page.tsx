/**
 * company.certificates.page (인증현황)
 * =====================================
 * SubPageLayout + CompanyCertificatesSection
 *
 * [Main Functions]
 * - CertificatesPage
 *
 * [Dependencies]
 * - @/lib/sub-page-layout, sections/company/company-certificates-section
 */

import { CompanyCertificatesSection } from '@/components/sections/company/company-certificates-section';
import { SubPageLayout } from '@/lib/sub-page-layout';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

// 1. CertificatesPage
export default async function CertificatesPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <SubPageLayout
      locale={locale}
      section="company"
      namespace="company"
      imagePath="company.hero"
      currentPath="/company/certificates"
      pageKey="certificates"
    >
      <CompanyCertificatesSection locale={locale} />
    </SubPageLayout>
  );
}
