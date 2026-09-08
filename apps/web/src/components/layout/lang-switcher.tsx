/**
 * layout.lang-switcher (언어 스위처)
 * ===================================
 * KOR/ENG locale 경로 전환
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
    <div className="flex items-center gap-0.5 rounded-md border border-neutral-200/80 bg-neutral-50 px-1 py-0.5 text-xs font-semibold tracking-wide">
      {locales.map((item, index) => (
        <span key={item.code} className="flex items-center">
          {index > 0 ? <span className="mx-1 text-neutral-300" aria-hidden="true">|</span> : null}
          <Link
            href={pathname}
            locale={item.code}
            className={cn(
              'rounded px-2 py-1 transition-colors',
              locale === item.code
                ? 'bg-primary text-white'
                : 'text-neutral-500 hover:bg-white hover:text-primary',
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
