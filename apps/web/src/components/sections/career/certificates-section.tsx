/**
 * sections.certificates-section (경력·자격 증명)
 * ==============================================
 * download + cert grid reuse
 *
 * [Main Functions]
 * - CertificatesSection
 *
 * [Dependencies]
 * - sections/company/cert-grid, sections/career/download-button, @/lib/i18n
 */

import { CertGrid } from '@/components/sections/company/cert-grid';
import { DownloadButton } from '@/components/sections/career/download-button';
import { getTranslations, setRequestLocale } from '@/lib/i18n';

type CertificatesSectionProps = {
  locale: 'ko' | 'en';
};

type CertItem = { name: string; issuer: string };

// 1. CertificatesSection
export async function CertificatesSection({ locale }: CertificatesSectionProps) {
  setRequestLocale(locale);
  const t = await getTranslations('career');
  const items = t.raw('pages.certificates.items') as CertItem[];

  return (
    <>
      <DownloadButton locale={locale} />
      <CertGrid items={items} imagePathPrefix="career.certificates" locale={locale} />
    </>
  );
}
