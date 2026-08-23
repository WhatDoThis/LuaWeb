/**
 * lib.seo (SEO 유틸)
 * ==================
 * site.json 기반 base URL — 운영 도메인 미설정 시 production 빌드 차단
 *
 * [Main Functions]
 * - getSiteBaseUrl
 *
 * [Dependencies]
 * - @repo/env
 */

import { getSite } from '@repo/env';

const DEV_FALLBACK = 'http://localhost:3000';

function isInvalidProductionDomain(url: string | undefined): boolean {
  const trimmed = url?.trim() ?? '';
  if (!trimmed) {
    return true;
  }
  if (!trimmed.startsWith('http')) {
    return true;
  }
  if (trimmed.includes('example.com')) {
    return true;
  }
  return false;
}

// 1. getSiteBaseUrl
export function getSiteBaseUrl(): string {
  const site = getSite();
  const url = site.domain?.trim();

  if (isInvalidProductionDomain(url)) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        '운영 도메인이 설정되지 않았습니다. packages/env/site.json 의 domain 을 실제 HTTPS URL(예: https://www.your-domain.com)로 설정한 뒤 다시 빌드하세요.',
      );
    }
    return DEV_FALLBACK;
  }

  return url!.replace(/\/$/, '');
}
