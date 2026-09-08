/**
 * management.ethics.page (윤리경영 — 삭제됨)
 * ===========================================
 * 콘텐츠 인벤토리 확정: 윤리경영 페이지 미사용 → 404
 *
 * [Main Functions]
 * - EthicsPage
 *
 * [Dependencies]
 * - next/navigation
 */

import { notFound } from 'next/navigation';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

// 1. EthicsPage
export default async function EthicsPage(_props: PageProps) {
  notFound();
}
