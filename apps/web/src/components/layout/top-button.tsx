/**
 * layout.top-button (Top 버튼)
 * ============================
 * scroll 300px 이상 시 표시, 클릭 시 scrollTo top
 *
 * [Main Functions]
 * - TopButton
 *
 * [Dependencies]
 * - @/lib/i18n, @/lib/cn
 */

'use client';

import { useTranslations } from '@/lib/i18n';
import { cn } from '@/lib/cn';
import { useEffect, useState } from 'react';

const DEFAULT_THRESHOLD = 300;

export type TopButtonProps = {
  threshold?: number;
};

// 1. TopButton
export function TopButton({ threshold = DEFAULT_THRESHOLD }: TopButtonProps) {
  const t = useTranslations('common');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return (
    <button
      type="button"
      aria-label={t('layout.topButton')}
      className={cn(
        'fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-lg transition-opacity',
        visible ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ↑
    </button>
  );
}
