/**
 * sections.esg-block (ESG 경영)
 * =============================
 * banner + pillar images + initiatives
 *
 * [Main Functions]
 * - EsgBlock
 *
 * [Dependencies]
 * - ui/smart-image, @/lib/i18n
 */

import { SmartImage } from '@/components/ui/smart-image';
import { getTranslations, setRequestLocale } from '@/lib/i18n';

type EsgBlockProps = {
  locale: 'ko' | 'en';
};

type EsgPillar = { key: string; title: string; body: string[] };

// 1. EsgBlock
export async function EsgBlock({ locale }: EsgBlockProps) {
  setRequestLocale(locale);
  const t = await getTranslations('management');
  const intro = t.raw('pages.esg.intro') as string[];
  const pillars = t.raw('pages.esg.pillars') as EsgPillar[];

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        {intro.map((paragraph, index) => (
          <p key={`intro-${index}`} className="leading-relaxed text-neutral-700">
            {paragraph}
          </p>
        ))}
      </div>

      <SmartImage path="management.esg.banner" locale={locale} className="w-full" />

      <div className="grid gap-8 md:grid-cols-3">
        {pillars.map((pillar, index) => (
          <article key={pillar.key} className="space-y-3">
            <SmartImage
              path={`management.esg.pillars.${index}`}
              locale={locale}
              className="w-full"
            />
            <h2 className="text-lg font-bold text-primary">{pillar.title}</h2>
            <ul className="list-disc space-y-2 pl-4 text-sm text-neutral-600">
              {pillar.body.map((item, itemIndex) => (
                <li key={`${pillar.key}-${itemIndex}`}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
