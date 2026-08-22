/**
 * sections.ethics-block (윤리경영)
 * ================================
 * banner + principles icons + reporting
 *
 * [Main Functions]
 * - EthicsBlock
 *
 * [Dependencies]
 * - ui/smart-image, @/lib/i18n
 */

import { SmartImage } from '@/components/ui/smart-image';
import { getTranslations, setRequestLocale } from '@/lib/i18n';

type EthicsBlockProps = {
  locale: 'ko' | 'en';
};

type PrincipleItem = { title: string; body: string };

// 1. EthicsBlock
export async function EthicsBlock({ locale }: EthicsBlockProps) {
  setRequestLocale(locale);
  const t = await getTranslations('management');
  const intro = t.raw('pages.ethics.intro') as string[];
  const principles = t.raw('pages.ethics.principles') as PrincipleItem[];
  const reporting = t.raw('pages.ethics.reporting') as { title: string; body: string[] };

  return (
    <div className="space-y-10">
      <SmartImage path="management.ethics.banner" locale={locale} className="w-full" />

      <div className="space-y-4">
        {intro.map((paragraph, index) => (
          <p key={`intro-${index}`} className="leading-relaxed text-neutral-700">
            {paragraph}
          </p>
        ))}
      </div>

      <div>
        <h2 className="mb-6 text-lg font-bold text-primary">{t('pages.ethics.principlesTitle')}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {principles.map((item, index) => (
            <article key={item.title} className="rounded-lg border border-neutral-200 p-6">
              <SmartImage
                path={`management.ethics.icons.${index}`}
                locale={locale}
                className="mb-4 h-12 w-12"
              />
              <h3 className="font-semibold text-neutral-800">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.body}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-neutral-50 p-6">
        <h2 className="text-lg font-bold text-primary">{reporting.title}</h2>
        <div className="mt-4 space-y-2">
          {reporting.body.map((paragraph, index) => (
            <p key={`report-${index}`} className="text-sm leading-relaxed text-neutral-600">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
