/**
 * sections.section-head (홈 섹션 타이틀)
 * =====================================
 * tag + title — 홈 전용
 *
 * [Main Functions]
 * - SectionHead
 *
 * [Dependencies]
 * - @/lib/cn
 */

import { cn } from '@/lib/cn';

export type SectionHeadProps = {
  tag: string;
  title: string;
  className?: string;
};

// 1. SectionHead
export function SectionHead({ tag, title, className }: SectionHeadProps) {
  return (
    <div className={cn('mb-8', className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">{tag}</p>
      <h2 className="mt-2 text-2xl font-bold text-primary md:text-3xl">{title}</h2>
    </div>
  );
}
