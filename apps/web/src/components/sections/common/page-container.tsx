/**
 * sections.page-container (페이지 컨테이너)
 * =======================================
 * siteContainerClass 기반 max-width wrapper
 *
 * [Main Functions]
 * - PageContainer
 *
 * [Dependencies]
 * - @/lib/cn, @/lib/site-container
 */

import { cn } from '@/lib/cn';
import { siteContainerClass } from '@/lib/site-container';

export type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

// 1. PageContainer
export function PageContainer({ children, className }: PageContainerProps) {
  return <div className={cn(siteContainerClass, 'py-12 xl:py-14 2xl:py-16', className)}>{children}</div>;
}
