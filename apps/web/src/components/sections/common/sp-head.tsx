/**
 * sections.sp-head (섹션 페이지 헤드)
 * ==================================
 * 영문 tag + title + optional desc
 *
 * [Main Functions]
 * - SpHead
 *
 * [Dependencies]
 * - @/lib/cn
 */

import { cn } from '@/lib/cn';

export type SpHeadProps = {
  tag: string;
  title: string;
  desc?: string;
  className?: string;
};

// 1. SpHead
export function SpHead({ tag, title, desc, className }: SpHeadProps) {
  return (
    <header className={cn('mb-10', className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">{tag}</p>
      <h1 className="mt-3 text-3xl font-bold text-primary md:text-4xl">{title}</h1>
      {desc ? <p className="mt-4 text-base text-neutral-600">{desc}</p> : null}
    </header>
  );
}
