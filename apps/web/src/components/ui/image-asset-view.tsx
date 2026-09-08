/**
 * ui.image-asset-view (이미지 렌더 뷰)
 * ====================================
 * Client/Server 공용 — ImageAsset props만 받음 (getImage 호출 없음)
 *
 * [Main Functions]
 * - ImageAssetView
 *
 * [Dependencies]
 * - @repo/env ImageAsset, getFeatures, @/lib/cn
 */

import { getFeatures, type ImageAsset } from '@repo/env';
import { cn } from '@/lib/cn';

export type ImageFit = 'natural' | 'contain' | 'cover';

export type ImageAssetViewProps = {
  asset: ImageAsset;
  locale: 'ko' | 'en';
  path?: string;
  className?: string;
  priority?: boolean;
  fit?: ImageFit;
};

function parseSize(size: string): [number, number] {
  const [w, h] = size.split('x').map(Number);
  return [w || 1, h || 1];
}

function imgFitClassName(fit: ImageFit): string {
  if (fit === 'cover') {
    return 'h-full w-full object-cover';
  }
  if (fit === 'contain') {
    return 'h-full w-full object-contain';
  }
  return 'h-auto max-w-full';
}

// 1. ImageAssetView
export function ImageAssetView({
  asset,
  locale,
  path,
  className,
  priority = false,
  fit = 'natural',
}: ImageAssetViewProps) {
  const [width, height] = parseSize(asset.size);
  const alt = asset.alt?.[locale] ?? '';
  const placeholderMode = getFeatures().placeholderMode;

  if (!asset.src?.trim()) {
    const fillContainer = className?.includes('h-full');

    if (!placeholderMode) {
      return (
        <div
          className={cn(
            'bg-gradient-to-br from-primary/10 via-neutral-50 to-secondary/5',
            fillContainer && 'h-full w-full',
            className,
          )}
          style={fillContainer ? undefined : { aspectRatio: `${width}/${height}` }}
          data-image-slot={path}
          aria-hidden
        />
      );
    }

    return (
      <div
        className={cn(
          'grid place-items-center bg-neutral-200 text-xs text-neutral-500',
          fillContainer && 'h-full w-full',
          className,
        )}
        style={fillContainer ? undefined : { aspectRatio: `${width}/${height}` }}
        data-image-slot={path}
      >
        <span className="px-2 text-center">
          IMAGE {asset.size}
          {asset.where ? (
            <>
              <br />
              {asset.where}
            </>
          ) : null}
        </span>
      </div>
    );
  }

  return (
    <picture className={cn(fit !== 'natural' && 'block h-full w-full', className)}>
      {asset.srcMobile ? (
        <source media="(max-width:767px)" srcSet={asset.srcMobile} />
      ) : null}
      <img
        src={asset.src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={imgFitClassName(fit)}
      />
    </picture>
  );
}
