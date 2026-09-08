/**
 * sections.greeting-section (CEO 인사말)
 * =====================================
 * body 문단 + ceoSign (portrait 미제공 시 단일 컬럼)
 *
 * [Main Functions]
 * - GreetingSection
 *
 * [Dependencies]
 * - ui/smart-image, @repo/env, @/lib/i18n
 */

import { SmartImage } from '@/components/ui/smart-image';
import { getImage } from '@repo/env';
import { getTranslations, setRequestLocale } from '@/lib/i18n';

type GreetingSectionProps = {
  locale: 'ko' | 'en';
};

// 1. GreetingSection
export async function GreetingSection({ locale }: GreetingSectionProps) {
  setRequestLocale(locale);
  const t = await getTranslations('company');
  const body = t.raw('pages.greeting.body') as string[];
  const portrait = getImage('company.greeting.portrait');
  const hasPortrait = Boolean(portrait.src?.trim());

  return (
    <div
      className={
        hasPortrait
          ? 'flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:gap-12'
          : 'max-w-3xl'
      }
    >
      <div className={hasPortrait ? 'order-2 space-y-4 lg:order-1' : 'space-y-4'}>
        {body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="leading-relaxed text-neutral-700">
            {paragraph}
          </p>
        ))}
        <div className="flex justify-end pt-6">
          <SmartImage
            path="company.greeting.ceoSign"
            locale={locale}
            className="block max-w-[280px] [&_img]:h-auto [&_img]:w-full"
          />
        </div>
      </div>
      {hasPortrait ? (
        <div className="order-1 lg:order-2">
          <SmartImage
            path="company.greeting.portrait"
            locale={locale}
            className="mx-auto w-full max-w-[560px]"
          />
        </div>
      ) : null}
    </div>
  );
}
