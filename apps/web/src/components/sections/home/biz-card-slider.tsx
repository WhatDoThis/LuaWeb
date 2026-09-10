/**
 * sections.biz-card-slider (기술 바로가기)
 * =======================================
 * 이미지 없으면 번호·그라데이션 버튼 행, 있으면 Embla 카드
 *
 * [Main Functions]
 * - BizCardSlider
 *
 * [Dependencies]
 * - embla-carousel-react, ui/image-asset-view, @repo/env, @/i18n/navigation
 */

'use client';

import { Link } from '@/i18n/navigation';
import { ImageAssetView } from '@/components/ui/image-asset-view';
import { resolveImageSrc } from '@repo/env';
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
  const hasAnyImage = cards.some((card) => Boolean(resolveImageSrc(card.asset, locale)));

  if (cards.length === 0) {
    return null;
  }

  if (!hasAnyImage) {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {cards.map((card, index) => (
          <Link
            key={card.title}
            href={card.href}
            className="group inline-flex min-w-[240px] flex-1 items-center gap-4 rounded-xl border border-primary/10 bg-gradient-to-br from-primary/[0.06] via-white to-accent/[0.08] px-6 py-5 shadow-sm transition-all hover:border-primary/25 hover:shadow-md xl:min-w-[280px] xl:px-7 xl:py-6"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white xl:h-11 xl:w-11 xl:text-base">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="flex flex-1 items-center justify-between gap-3">
              <span className="lua-fluid-card-title text-neutral-800 group-hover:text-primary">
                {card.title}
              </span>
              <span
                className="text-lg text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-primary"
                aria-hidden="true"
              >
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div ref={emblaRef} className="overflow-hidden">
      <div className="flex gap-6">
        {cards.map((card) => (
          <article key={card.title} className="min-w-0 flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_32%] xl:flex-[0_0_28%]">
            <Link href={card.href} className="group block overflow-hidden rounded-xl border border-neutral-200">
              <div className="aspect-[21/28] w-full overflow-hidden">
                <ImageAssetView
                  asset={card.asset}
                  locale={locale}
                  path={card.imagePath}
                  className="h-full w-full"
                  fit="cover"
                />
              </div>
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
