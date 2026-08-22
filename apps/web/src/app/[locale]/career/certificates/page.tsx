/**
 * career.certificates.page (증명서 발급)
 * ======================================
 * SubPageLayout + CertificatesSection
 *
 * [Main Functions]
 * - CertificatesPage
 *
 * [Dependencies]
 * - @/lib/sub-page-layout, sections/career/certificates-section
 */

import { CertificatesSection } from '@/components/sections/career/certificates-section';
import { SubPageLayout } from '@/lib/sub-page-layout';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

// 1. CertificatesPage
export default async function CertificatesPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <SubPageLayout
      locale={locale}
      section="career"
      namespace="career"
      imagePath="career.hero"
      currentPath="/career/certificates"
      pageKey="certificates"
    >
      <CertificatesSection locale={locale} />
    </SubPageLayout>
  );
}
