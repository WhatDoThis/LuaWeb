/**
 * sections.process-steps (채용 프로세스)
 * =====================================
 * numbered steps + process icons
 *
 * [Main Functions]
 * - ProcessSteps
 *
 * [Dependencies]
 * - ui/smart-image, @/lib/i18n
 */

import { SmartImage } from '@/components/ui/smart-image';
import { getTranslations, setRequestLocale } from '@/lib/i18n';

type ProcessStepsProps = {
  locale: 'ko' | 'en';
};

type ProcessStep = { step: string; title: string; body: string };

// 1. ProcessSteps
export async function ProcessSteps({ locale }: ProcessStepsProps) {
  setRequestLocale(locale);
  const t = await getTranslations('career');
  const steps = t.raw('pages.recruitment.steps') as ProcessStep[];

  return (
    <ol className="mt-10 flex flex-col gap-6 lg:flex-row lg:flex-wrap lg:justify-between">
      {steps.map((item, index) => (
        <li
          key={item.step}
          className="flex-1 rounded-lg border border-neutral-200 p-6 text-center lg:min-w-[160px] lg:max-w-[200px]"
        >
          <SmartImage
            path={`career.recruitment.process.${index}`}
            locale={locale}
            className="mx-auto h-16 w-16"
          />
          <span className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            {item.step}
          </span>
          <h3 className="mt-4 font-semibold text-neutral-800">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}
