/**
 * i18n.request (next-intl 요청 설정)
 * ==================================
 * requestLocale 기반 locale 결정 및 messages 로드 (middleware 없음)
 *
 * [Main Functions]
 * - default getRequestConfig export
 *
 * [Dependencies]
 * - next-intl/server, @repo/content
 *
 * [Note]
 * - next/root-params rootParams는 Next 16.3.2 미제공 → requestLocale 사용
 */

import { loadMessages, type Locale } from '@repo/content';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

function resolveLocale(raw: string | undefined): Locale {
  if (raw && routing.locales.includes(raw as Locale)) {
    return raw as Locale;
  }
  return routing.defaultLocale;
}

// 1. getRequestConfig
export default getRequestConfig(async ({ requestLocale }) => {
  const rawLocale = await requestLocale;
  const locale = resolveLocale(rawLocale);

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
