/**
 * i18n.routing (다국어 라우팅 설정)
 * ==================================
 * next-intl locale prefix 및 지원 locale 정의
 *
 * [Main Functions]
 * - routing
 *
 * [Dependencies]
 * - next-intl/routing
 */

import { defineRouting } from 'next-intl/routing';

// 1. routing
export const routing = defineRouting({
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
  localePrefix: 'always',
});
