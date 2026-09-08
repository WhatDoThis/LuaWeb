/**
 * sections.hero-slider (메인 히어로 슬라이더)
 * ===========================================
 * Embla autoplay, a11y region, 키보드·터치 타깃
 *
 * [Main Functions]
 * - HeroSlider
 *
 * [Dependencies]
 * - embla-carousel-react, embla-carousel-autoplay, ui/image-asset-view
 */

'use client';

import { ImageAssetView } from '@/components/ui/image-asset-view';
import { cn } from '@/lib/cn';
import type { ImageAsset } from '@repo/env';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useRef, useState } from 'react';

export type HeroSlideData = {
  title: string;
  subtitle?: string;
  asset: ImageAsset;
  imagePath: string;
};

export type HeroSliderProps = {
  slides: HeroSlideData[];
  locale: 'ko' | 'en';
  prevLabel: string;
  nextLabel: string;
};

// 1. HeroSlider
export function HeroSlider({ slides, locale, prevLabel, nextLabel }: HeroSliderProps) {
  const regionRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [motionReady, setMotionReady] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    setMotionReady(true);
    const handler = () => setReducedMotion(media.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  const plugins =
    motionReady && !reducedMotion
      ? [Autoplay({ delay: 5000, stopOnMouseEnter: true, stopOnInteraction: true })]
      : [];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    const region = regionRef.current;
    if (!region) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    };

    region.addEventListener('keydown', handleKeyDown);
    return () => region.removeEventListener('keydown', handleKeyDown);
  }, [scrollPrev, scrollNext]);

  if (slides.length === 0) {
    return null;
  }

  const activeSlide = slides[selectedIndex];

  return (
    <section
      ref={regionRef}
      className="relative overflow-hidden bg-neutral-900 outline-none"
      role="region"
      aria-roledescription="carousel"
      aria-label={activeSlide?.title ?? 'Hero'}
      tabIndex={0}
    >
      <div className="sr-only" aria-live="polite">
        {activeSlide ? `${activeSlide.title}${activeSlide.subtitle ? ` — ${activeSlide.subtitle}` : ''}` : ''}
      </div>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={`${slide.title}-${index}`} className="relative min-w-0 flex-[0_0_100%]">
              <div className="relative h-[420px] sm:h-[520px] md:h-[640px]">
                <ImageAssetView
                  asset={slide.asset}
                  locale={locale}
                  path={slide.imagePath}
                  className="absolute inset-0 h-full w-full [&_img]:object-[center_42%]"
                  fit="cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/25" />
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden={index !== selectedIndex}
                >
                  <div className="mx-auto w-full max-w-[1200px] px-4 text-white">
                    {index === selectedIndex ? (
                      <h1 className="text-3xl font-bold tracking-tight md:text-5xl">{slide.title}</h1>
                    ) : (
                      <p className="text-3xl font-bold tracking-tight md:text-5xl">{slide.title}</p>
                    )}
                    {slide.subtitle ? (
                      <p className="mt-4 text-lg text-white/90 md:text-xl">{slide.subtitle}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="absolute left-4 top-1/2 z-10 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 px-3 text-white hover:bg-black/60 focus-visible:ring-2 focus-visible:ring-white"
        onClick={scrollPrev}
        aria-label={prevLabel}
      >
        ‹
      </button>
      <button
        type="button"
        className="absolute right-4 top-1/2 z-10 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 px-3 text-white hover:bg-black/60 focus-visible:ring-2 focus-visible:ring-white"
        onClick={scrollNext}
        aria-label={nextLabel}
      >
        ›
      </button>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={`dot-${slide.title}-${index}`}
            type="button"
            aria-label={`${slide.title} (${index + 1}/${slides.length})`}
            aria-current={index === selectedIndex ? 'true' : undefined}
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-full focus-visible:ring-2 focus-visible:ring-white',
            )}
            onClick={() => scrollTo(index)}
          >
            <span
              className={cn(
                'h-2.5 w-2.5 rounded-full transition-colors',
                index === selectedIndex ? 'bg-white' : 'bg-white/40',
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
