/**
 * management.esg.page (ESG 경영 — 삭제됨)
 * ========================================
 * 콘텐츠 인벤토리 확정: ESG 페이지 미사용 → 404
 *
 * [Main Functions]
 * - EsgPage
 *
 * [Dependencies]
 * - next/navigation
 */

import { notFound } from 'next/navigation';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

// 1. EsgPage
export default async function EsgPage(_props: PageProps) {
  notFound();
}
