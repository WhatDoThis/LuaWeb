/**
 * sections.greeting-section (CEO 인사말)
 * =====================================
 * accent 인용 블록 + body + locale별 ceoSign
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
  const openingParagraph = body[0] ?? '';

  return (
    <div
      className={
        hasPortrait
          ? 'flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:gap-12'
          : 'mx-auto max-w-3xl'
      }
    >
      <div className={hasPortrait ? 'order-2 space-y-5 lg:order-1' : 'space-y-5'}>
        {!hasPortrait && openingParagraph ? (
          <blockquote className="border-l-4 border-accent bg-gradient-to-r from-accent/10 to-transparent px-6 py-5">
            <p className="text-lg font-medium leading-relaxed text-neutral-800">{openingParagraph}</p>
          </blockquote>
        ) : null}

        {body.map((paragraph, index) => {
          if (!hasPortrait && index === 0) {
            return null;
          }

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

        <div className="flex justify-end border-t border-neutral-200/80 pt-6">
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
