/**
 * sections.talent-diagram (인재상)
 * ================================
 * diagram + body 문단
 *
 * [Main Functions]
 * - TalentDiagram
 *
 * [Dependencies]
 * - ui/smart-image, @/lib/i18n
 */

import { SmartImage } from '@/components/ui/smart-image';
import { getTranslations, setRequestLocale } from '@/lib/i18n';

type TalentDiagramProps = {
  locale: 'ko' | 'en';
};

// 1. TalentDiagram
export async function TalentDiagram({ locale }: TalentDiagramProps) {
  setRequestLocale(locale);
  const t = await getTranslations('career');
  const body = t.raw('pages.recruitment.body') as string[];

  return (
    <div className="space-y-8">
      <SmartImage path="career.recruitment.diagram" locale={locale} className="w-full" />
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
