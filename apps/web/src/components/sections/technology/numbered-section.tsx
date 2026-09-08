/**
 * sections.numbered-section (번호 섹션)
 * =====================================
 * 01 circle + title + body + layout variants — CTA 없음
 *
 * [Main Functions]
 * - NumberedSection
 *
 * [Dependencies]
 * - ui/smart-image, sections/technology/tech-image-row
 */

import { TechImageRow } from '@/components/sections/technology/tech-image-row';
import { SmartImage } from '@/components/ui/smart-image';
import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

export type NumberedSectionProps = {
  number: string;
  title: string;
  body: string | string[];
  locale: 'ko' | 'en';
  layout?: 'full' | 'split' | 'gallery' | 'text';
  imagePaths?: string[];
};

function FullWidthFigure({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <figure
      className={cn(
        'mt-6 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50',
        className,
      )}
    >
      {children}
    </figure>
  );
}

// 1. NumberedSection
export function NumberedSection({
  number,
  title,
  body,
  locale,
  layout = 'text',
  imagePaths = [],
}: NumberedSectionProps) {
  const paragraphs = Array.isArray(body) ? body.filter((p) => p.trim().length > 0) : body.trim() ? [body] : [];
  const isKeywordList =
    paragraphs.length >= 2 && paragraphs.every((item) => item.length <= 32 && !item.includes('.'));

  return (
    <section className="border-b border-neutral-200 py-10 last:border-b-0">
      <div className="flex items-start gap-4">
        {number ? (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            {number}
          </span>
        ) : null}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-primary md:text-2xl">{title}</h2>
          {isKeywordList ? (
            <ul className="mt-5 space-y-3">
              {paragraphs.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-neutral-700">
                  <span
                    className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-secondary ring-2 ring-secondary/20"
                    aria-hidden="true"
                  />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 space-y-3">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="leading-relaxed text-neutral-700">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {layout === 'full' && imagePaths[0] ? (
            <FullWidthFigure className="flex max-h-[min(520px,72vh)] items-center justify-center p-2 sm:p-4">
              <SmartImage
                path={imagePaths[0]}
                locale={locale}
                className="w-full [&_img]:mx-auto [&_img]:max-h-[min(480px,68vh)] [&_img]:w-full [&_img]:object-contain"
                fit="contain"
              />
            </FullWidthFigure>
          ) : null}

          {layout === 'split' && imagePaths.length === 1 ? (
            <FullWidthFigure className="p-2 sm:p-4">
              <SmartImage
                path={imagePaths[0]}
                locale={locale}
                className="w-full [&_img]:mx-auto [&_img]:h-auto [&_img]:w-full"
              />
            </FullWidthFigure>
          ) : null}

          {layout === 'split' && imagePaths.length >= 2 ? (
            <TechImageRow imagePaths={[imagePaths[0], imagePaths[1]]} locale={locale} />
          ) : null}

          {layout === 'gallery' && imagePaths.length > 0 ? (
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {imagePaths.map((path) => (
                <div
                  key={path}
                  className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 p-2"
                >
                  <SmartImage path={path} locale={locale} className="w-full [&_img]:h-auto [&_img]:w-full" />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
