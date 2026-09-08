/**
 * sections.intro-hero (서브 페이지 히어로)
 * ======================================
 * IntroHero 배경 — SmartImage full-width cover
 *
 * [Main Functions]
 * - IntroHero
 *
 * [Dependencies]
 * - ui/smart-image, @/lib/cn
 */

import { SmartImage } from '@/components/ui/smart-image';
import { cn } from '@/lib/cn';

export type IntroHeroProps = {
  imagePath: string;
  locale: 'ko' | 'en';
  className?: string;
};

// 1. IntroHero
export function IntroHero({ imagePath, locale, className }: IntroHeroProps) {
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
      />
    </div>
  );
}
