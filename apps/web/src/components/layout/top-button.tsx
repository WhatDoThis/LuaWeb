/**
 * layout.top-button (Top 버튼)
 * ============================
 * scroll 300px 이상 시 표시, reduced-motion 대응
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
  hidden?: boolean;
};

// 1. TopButton
export function TopButton({ threshold = DEFAULT_THRESHOLD, hidden = false }: TopButtonProps) {
  const t = useTranslations('common');
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const handler = () => setReducedMotion(media.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const showButton = visible && !hidden;

  return (
    <button
      type="button"
      aria-label={t('layout.topButton')}
      tabIndex={showButton ? 0 : -1}
      aria-hidden={!showButton}
      className={cn(
        'fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-lg transition-opacity focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary',
        showButton ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: reducedMotion ? 'auto' : 'smooth',
        })
      }
    >
      ↑
    </button>
  );
}
