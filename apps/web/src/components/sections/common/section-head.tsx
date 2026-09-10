/**
 * sections.section-head (홈 섹션 타이틀)
 * =====================================
 * accent bar + tag + title — 홈 전용
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
    <div className={cn('mb-8 xl:mb-10 2xl:mb-12', className)}>
      <div className="lua-accent-bar mb-3" aria-hidden="true" />
      <p className="lua-type-label tracking-[0.2em]">{tag}</p>
      <h2 className="lua-fluid-section-title mt-2">{title}</h2>
    </div>
  );
}
