/**
 * sections.greeting-section (CEO 인사말)
 * =====================================
 * body 문단 + portrait + ceoSign
 *
 * [Main Functions]
 * - GreetingSection
 *
 * [Dependencies]
 * - ui/smart-image, @/lib/i18n
 */

import { SmartImage } from '@/components/ui/smart-image';
import { getTranslations, setRequestLocale } from '@/lib/i18n';

type GreetingSectionProps = {
  locale: 'ko' | 'en';
};

// 1. GreetingSection
export async function GreetingSection({ locale }: GreetingSectionProps) {
  setRequestLocale(locale);
  const t = await getTranslations('company');
  const body = t.raw('pages.greeting.body') as string[];

  return (
    <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:gap-12">
      <div className="order-2 space-y-4 lg:order-1">
        {body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="leading-relaxed text-neutral-700">
            {paragraph}
          </p>
        ))}
        <div className="flex justify-end pt-4">
          <SmartImage
            path="company.greeting.ceoSign"
            locale={locale}
            className="h-16 w-[260px]"
          />
        </div>
      </div>
      <div className="order-1 lg:order-2">
        <SmartImage
          path="company.greeting.portrait"
          locale={locale}
          className="mx-auto w-full max-w-[560px]"
        />
      </div>
    </div>
  );
}
