/**
 * sections.intro-hero (서브 페이지 히어로)
 * ======================================
 * IntroHero 배경 + 섹션별 그라데이션 오버레이
 *
 * [Main Functions]
 * - IntroHero
 *
 * [Dependencies]
 * - ui/smart-image, @/lib/cn, @/lib/lnb
 */

import { SmartImage } from '@/components/ui/smart-image';
import { cn } from '@/lib/cn';
import type { LnbSection } from '@/lib/lnb';

export type IntroHeroProps = {
  imagePath: string;
  locale: 'ko' | 'en';
  section?: LnbSection;
  className?: string;
};

const sectionOverlayClass: Record<LnbSection, string> = {
  company: 'bg-gradient-to-r from-primary/55 via-primary/25 to-transparent',
  technology: 'bg-gradient-to-r from-secondary/50 via-primary/20 to-transparent',
  management: 'bg-gradient-to-r from-primary/50 via-accent/15 to-transparent',
  prCenter: 'bg-gradient-to-r from-neutral-900/55 via-primary/20 to-transparent',
};

// 1. IntroHero
export function IntroHero({ imagePath, locale, section, className }: IntroHeroProps) {
  return (
    <div
      className={cn(
        'relative h-[240px] w-full overflow-hidden bg-neutral-900 sm:h-[320px] lg:h-[420px]',
        className,
      )}
    >
      <SmartImage
        path={imagePath}
        locale={locale}
        className="h-full w-full [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_img]:object-[center_35%]"
        priority
        fit="cover"
      />
      {section ? (
        <div className={cn('pointer-events-none absolute inset-0', sectionOverlayClass[section])} aria-hidden="true" />
      ) : null}
    </div>
  );
}
