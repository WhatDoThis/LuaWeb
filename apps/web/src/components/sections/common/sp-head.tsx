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
      <p className="lua-type-label tracking-[0.2em]">{tag}</p>
      <h1 className="lua-fluid-page-title mt-3">{title}</h1>
      {desc ? <p className="lua-fluid-body mt-4 text-neutral-600">{desc}</p> : null}
    </header>
  );
}
