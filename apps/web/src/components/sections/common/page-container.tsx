/**
 * sections.page-container (페이지 컨테이너)
 * =======================================
 * max-width wrapper
 *
 * [Main Functions]
 * - PageContainer
 *
 * [Dependencies]
 * - @/lib/cn
 */

import { cn } from '@/lib/cn';

export type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

// 1. PageContainer
export function PageContainer({ children, className }: PageContainerProps) {
  return <div className={cn('mx-auto max-w-[1200px] px-4 py-12', className)}>{children}</div>;
}
