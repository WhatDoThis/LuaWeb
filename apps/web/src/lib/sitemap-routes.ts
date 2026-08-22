/**
 * lib.sitemap-routes (sitemap 정적 경로)
 * ======================================
 * locale × static routes — disclosure 제외
 *
 * [Main Functions]
 * - sitemapStaticPaths
 *
 * [Dependencies]
 * - @/lib/nav
 */

import { navItems } from '@/lib/nav';

// 1. sitemapStaticPaths
export const sitemapStaticPaths: string[] = [
  '',
  ...navItems.flatMap((item) => item.children?.map((child) => child.href) ?? []),
];
