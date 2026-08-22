/**
 * sections.biz-card-slider (기술 카드 슬라이더)
 * ============================================
 * Embla loop + drag, techCards 2+
 *
 * [Main Functions]
 * - BizCardSlider
 *
 * [Dependencies]
 * - embla-carousel-react, ui/image-asset-view, @/i18n/navigation
 */

'use client';

import { Link } from '@/i18n/navigation';
import { ImageAssetView } from '@/components/ui/image-asset-view';
import type { ImageAsset } from '@repo/env';
import useEmblaCarousel from 'embla-carousel-react';

export type BizCardData = {
  title: string;
  href: string;
  asset: ImageAsset;
  imagePath: string;
};

export type BizCardSliderProps = {
  cards: BizCardData[];
  locale: 'ko' | 'en';
};

// 1. BizCardSlider
export function BizCardSlider({ cards, locale }: BizCardSliderProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' });

  if (cards.length === 0) {
    return null;
  }

  return (
    <div ref={emblaRef} className="overflow-hidden">
      <div className="flex gap-6">
        {cards.map((card) => (
          <article key={card.title} className="min-w-0 flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_32%]">
            <Link href={card.href} className="group block overflow-hidden rounded-lg border border-neutral-200">
              <ImageAssetView
                asset={card.asset}
                locale={locale}
                path={card.imagePath}
                className="w-full"
              />
              <div className="p-4">
                <h3 className="font-semibold text-neutral-800 group-hover:text-primary">{card.title}</h3>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
