/**
 * layout.lang-switcher (언어 스위처)
 * ===================================
 * KOR/ENG locale 경로 전환 — 입력창 형태 border 제거
 *
 * [Main Functions]
 * - LangSwitcher
 *
 * [Dependencies]
 * - @/i18n/navigation, @/lib/i18n, @/lib/cn
 */

'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from '@/lib/i18n';
import { cn } from '@/lib/cn';

export type LangSwitcherProps = {
  locale: 'ko' | 'en';
};

// 1. LangSwitcher
export function LangSwitcher({ locale }: LangSwitcherProps) {
  const pathname = usePathname();
  const t = useTranslations('common');

  const locales: { code: 'ko' | 'en'; label: string }[] = [
    { code: 'ko', label: t('lang.ko') },
    { code: 'en', label: t('lang.en') },
  ];

  return (
    <div
      className="lua-type-caption flex items-center gap-0.5 font-semibold tracking-wide"
      role="group"
      aria-label={t('lang.groupLabel')}
    >
      {locales.map((item, index) => (
        <span key={item.code} className="flex items-center">
          {index > 0 ? (
            <span className="mx-1.5 text-neutral-300" aria-hidden="true">
              |
            </span>
          ) : null}
          <Link
            href={pathname}
            locale={item.code}
            className={cn(
              'rounded px-1.5 py-0.5 transition-colors',
              locale === item.code
                ? 'text-primary underline decoration-primary decoration-2 underline-offset-4'
                : 'text-neutral-500 hover:text-primary',
            )}
            aria-current={locale === item.code ? 'true' : undefined}
          >
            {item.label}
          </Link>
        </span>
      ))}
    </div>
  );
}
