/**
 * sections.welfare-grid (복리후생)
 * ================================
 * icon placeholder + title + body
 *
 * [Main Functions]
 * - WelfareGrid
 *
 * [Dependencies]
 * - ui/smart-image, @/lib/i18n
 */

import { SmartImage } from '@/components/ui/smart-image';
import { getTranslations, setRequestLocale } from '@/lib/i18n';

type WelfareGridProps = {
  locale: 'ko' | 'en';
};

type WelfareItem = { title: string; body: string };

// 1. WelfareGrid
export async function WelfareGrid({ locale }: WelfareGridProps) {
  setRequestLocale(locale);
  const t = await getTranslations('career');
  const intro = t.raw('pages.welfare.intro') as string[];
  const items = t.raw('pages.welfare.items') as WelfareItem[];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        {intro.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="leading-relaxed text-neutral-700">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <article key={item.title} className="rounded-lg border border-neutral-200 p-6">
            <SmartImage
              path={`career.welfare.icons.${index}`}
              locale={locale}
              className="mb-4 h-12 w-12"
            />
            <h3 className="font-semibold text-neutral-800">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
