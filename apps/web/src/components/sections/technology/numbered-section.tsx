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

export type NumberedSectionProps = {
  number: string;
  title: string;
  body: string | string[];
  locale: 'ko' | 'en';
  layout?: 'full' | 'split' | 'gallery' | 'text';
  imagePaths?: string[];
};

// 1. NumberedSection
export function NumberedSection({
  number,
  title,
  body,
  locale,
  layout = 'text',
  imagePaths = [],
}: NumberedSectionProps) {
  const paragraphs = Array.isArray(body) ? body : [body];

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
          <div className="mt-4 space-y-3">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="leading-relaxed text-neutral-700">
                {paragraph}
              </p>
            ))}
          </div>

          {layout === 'full' && imagePaths[0] ? (
            <SmartImage path={imagePaths[0]} locale={locale} className="mt-6 w-full" />
          ) : null}

          {layout === 'split' && imagePaths.length >= 2 ? (
            <TechImageRow imagePaths={[imagePaths[0], imagePaths[1]]} locale={locale} />
          ) : null}

          {layout === 'gallery' && imagePaths.length > 0 ? (
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {imagePaths.map((path) => (
                <SmartImage key={path} path={path} locale={locale} className="w-full" />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
