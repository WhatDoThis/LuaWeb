/**
 * sections.download-button (파일 다운로드)
 * ========================================
 * career certificates 등 — external href
 *
 * [Main Functions]
 * - DownloadButton
 *
 * [Dependencies]
 * - @/lib/i18n
 */

import { getTranslations, setRequestLocale } from '@/lib/i18n';

type DownloadButtonProps = {
  locale: 'ko' | 'en';
};

// 1. DownloadButton
export async function DownloadButton({ locale }: DownloadButtonProps) {
  setRequestLocale(locale);
  const t = await getTranslations('career');
  const href = t('pages.certificates.downloadHref');

  return (
    <div className="mb-8">
      <a
        href={href}
        download
        className="inline-flex items-center rounded border border-primary bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
      >
        {t('pages.certificates.downloadLabel')}
      </a>
    </div>
  );
}
