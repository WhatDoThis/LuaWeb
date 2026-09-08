/**
 * company.organizations.page (조직도 — 삭제됨)
 * =================================================
 * 콘텐츠 인벤토리 확정: 조직도 페이지 미사용 → 404
 *
 * [Main Functions]
 * - OrganizationsPage
 *
 * [Dependencies]
 * - next/navigation
 */

import { notFound } from 'next/navigation';

type PageProps = { params: Promise<{ locale: 'ko' | 'en' }> };

// 1. OrganizationsPage
export default async function OrganizationsPage(_props: PageProps) {
  notFound();
}
