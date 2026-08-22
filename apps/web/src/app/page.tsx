/**
 * app.page (루트 페이지)
 * ======================
 * / 접근 시 /ko/ 로 리다이렉트
 *
 * [Main Functions]
 * - RootPage
 *
 * [Dependencies]
 * - next/navigation
 */

import { redirect } from 'next/navigation';

// 1. RootPage
export default function RootPage() {
  redirect('/ko/');
}
