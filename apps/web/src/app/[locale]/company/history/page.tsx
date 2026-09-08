/**
 * company.history.page (연혁 — 삭제됨)
 * ===================================
 * 콘텐츠 인벤토리 확정: 연혁 페이지 미사용 → 404
 *
 * [Main Functions]
 * - HistoryPage
 *
 * [Dependencies]
 * - next/navigation
 */

import { notFound } from 'next/navigation';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

// 1. HistoryPage
export default async function HistoryPage(_props: PageProps) {
  notFound();
}
