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
    <div className="flex items-center gap-1 text-sm font-medium">
      {locales.map((item, index) => (
        <span key={item.code} className="flex items-center gap-1">
          {index > 0 ? <span className="text-neutral-300">|</span> : null}
          <Link
            href={pathname}
            locale={item.code}
            className={cn(
              'px-1 py-0.5 transition-colors',
              locale === item.code ? 'text-primary' : 'text-neutral-500 hover:text-primary',
            )}
          >
            {item.label}
          </Link>
        </span>
      ))}
    </div>
  );
}
