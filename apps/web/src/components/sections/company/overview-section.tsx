/**
 * sections.overview-section (회사개요)
 * ====================================
 * diagram + 정보 테이블
 *
 * [Main Functions]
 * - OverviewSection
 *
 * [Dependencies]
 * - ui/smart-image, @/lib/i18n
 */

import { SmartImage } from '@/components/ui/smart-image';
import { getTranslations, setRequestLocale } from '@/lib/i18n';

type OverviewSectionProps = {
  locale: 'ko' | 'en';
};

type TableRow = { label: string; value: string };

// 1. OverviewSection
export async function OverviewSection({ locale }: OverviewSectionProps) {
  setRequestLocale(locale);
  const t = await getTranslations('company');
  const tables = t.raw('pages.overview.tables') as TableRow[][];

  return (
    <div className="space-y-10">
      <SmartImage path="company.overview.diagram" locale={locale} className="w-full" />
      {tables.map((rows, index) => (
        <dl
          key={`table-${index}`}
          className="grid grid-cols-1 gap-4 border-t border-neutral-200 pt-6 md:grid-cols-2"
        >
          {rows.map((row) => (
            <div key={row.label} className="grid grid-cols-1 gap-1 sm:grid-cols-3">
              <dt className="text-sm font-semibold text-neutral-800">{row.label}</dt>
              <dd className="text-sm text-neutral-600 sm:col-span-2">{row.value}</dd>
            </div>
          ))}
        </dl>
      ))}
    </div>
  );
}
