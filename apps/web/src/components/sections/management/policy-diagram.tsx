/**
 * sections.policy-diagram (경영방침 다이어그램)
 * ============================================
 * SmartImage + body 문단
 *
 * [Main Functions]
 * - PolicyDiagram
 *
 * [Dependencies]
 * - ui/smart-image, @/lib/i18n
 */

import { SmartImage } from '@/components/ui/smart-image';
import { getTranslations, setRequestLocale } from '@/lib/i18n';

type PolicyDiagramProps = {
  locale: 'ko' | 'en';
};

// 1. PolicyDiagram
export async function PolicyDiagram({ locale }: PolicyDiagramProps) {
  setRequestLocale(locale);
  const t = await getTranslations('management');
  const body = t.raw('pages.policy.body') as string[];

  return (
    <div className="space-y-8">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-neutral-200 bg-white p-2 shadow-sm sm:p-4">
        <SmartImage path="management.policy.diagram" locale={locale} className="w-full [&_img]:mx-auto [&_img]:h-auto [&_img]:w-full" />
      </div>
      <div className="space-y-4">
        {body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="leading-relaxed text-neutral-700">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
