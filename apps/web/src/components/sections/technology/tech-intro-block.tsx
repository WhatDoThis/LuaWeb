/**
 * sections.tech-intro-block (기술 소개 intro)
 * ===========================================
 * tech 페이지 상단 intro 문단 — CTA 없음
 *
 * [Main Functions]
 * - TechIntroBlock
 *
 * [Dependencies]
 * - 없음
 */

export type TechIntroBlockProps = {
  text: string | string[];
};

// 1. TechIntroBlock
export function TechIntroBlock({ text }: TechIntroBlockProps) {
  const paragraphs = Array.isArray(text) ? text : [text];

  return (
    <div className="mb-12 space-y-4 border-b border-neutral-200 pb-10">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 24)} className="leading-relaxed text-neutral-700">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
