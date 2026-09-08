/**
 * sections.greeting-section (CEO 인사말)
 * =====================================
 * body 문단 + ceoSign (portrait 미제공 시 단일 컬럼, KO 1~3문단 마침표 줄바꿈)
 *
 * [Main Functions]
 * - GreetingSection
 * - formatKoGreetingParagraph
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

// 1. formatKoGreetingParagraph
function formatKoGreetingParagraph(text: string, index: number, locale: 'ko' | 'en') {
  if (locale !== 'ko' || index > 2) {
    return text;
  }

  return text
    .split(/(?<=[.])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

// 2. GreetingSection
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
          : 'mx-auto max-w-3xl'
      }
    >
      <div className={hasPortrait ? 'order-2 space-y-5 lg:order-1' : 'space-y-5'}>
        {body.map((paragraph, index) => {
          const formatted = formatKoGreetingParagraph(paragraph, index, locale);
          const key = paragraph.slice(0, 24);

          if (Array.isArray(formatted)) {
            return (
              <p key={key} className="leading-[1.9] text-neutral-700">
                {formatted.map((sentence, sentenceIndex) => (
                  <span key={`${key}-${sentenceIndex}`}>
                    {sentence}
                    {sentenceIndex < formatted.length - 1 ? (
                      <>
                        <br />
                        <span className="block h-2" aria-hidden="true" />
                      </>
                    ) : null}
                  </span>
                ))}
              </p>
            );
          }

          return (
            <p key={key} className="leading-[1.9] text-neutral-700">
              {formatted}
            </p>
          );
        })}
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
