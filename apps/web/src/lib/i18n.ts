/**
 * lib.i18n (i18n 추상화 re-export)
 * =================================
 * Plan B 전환용 — 앱 코드는 next-intl 직접 import 금지 (i18n/ 내부 제외)
 *
 * [Main Functions]
 * - useTranslations, getTranslations, setRequestLocale re-export
 * - NextIntlClientProvider, getMessages re-export
 *
 * [Dependencies]
 * - next-intl, next-intl/server
 */

export { NextIntlClientProvider, useTranslations } from 'next-intl';
export { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
