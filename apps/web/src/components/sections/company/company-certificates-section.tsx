/**
 * sections.company-certificates-section (인증서)
 * ==============================================
 * company certificates grid
 *
 * [Main Functions]
 * - CompanyCertificatesSection
 *
 * [Dependencies]
 * - sections/company/cert-grid, @/lib/i18n
 */

import { CertGrid } from '@/components/sections/company/cert-grid';
import { getTranslations, setRequestLocale } from '@/lib/i18n';

type CompanyCertificatesSectionProps = {
  locale: 'ko' | 'en';
};

type CertItem = { name: string; issuer: string };

// 1. CompanyCertificatesSection
export async function CompanyCertificatesSection({ locale }: CompanyCertificatesSectionProps) {
  setRequestLocale(locale);
  const t = await getTranslations('company');
  const items = t.raw('pages.certificates.items') as CertItem[];

  return (
    <CertGrid items={items} imagePathPrefix="company.certificates" locale={locale} />
  );
}
