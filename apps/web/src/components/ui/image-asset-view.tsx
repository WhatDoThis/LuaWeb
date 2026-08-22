/**
 * ui.image-asset-view (이미지 렌더 뷰)
 * ====================================
 * Client/Server 공용 — ImageAsset props만 받음 (getImage 호출 없음)
 *
 * [Main Functions]
 * - ImageAssetView
 *
 * [Dependencies]
 * - @repo/env ImageAsset, @/lib/cn
 */

import type { ImageAsset } from '@repo/env';
import { cn } from '@/lib/cn';

export type ImageAssetViewProps = {
  asset: ImageAsset;
  locale: 'ko' | 'en';
  path?: string;
  className?: string;
  priority?: boolean;
};

function parseSize(size: string): [number, number] {
  const [w, h] = size.split('x').map(Number);
  return [w || 1, h || 1];
}

// 1. ImageAssetView
export function ImageAssetView({
  asset,
  locale,
  path,
  className,
  priority = false,
}: ImageAssetViewProps) {
  const [width, height] = parseSize(asset.size);
  const alt = asset.alt?.[locale] ?? '';

  if (!asset.src) {
    return (
      <div
        className={cn(
          'grid place-items-center bg-neutral-200 text-xs text-neutral-500',
          className,
        )}
        style={{ aspectRatio: `${width}/${height}` }}
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
    <picture className={className}>
      {asset.srcMobile ? (
        <source media="(max-width:767px)" srcSet={asset.srcMobile} />
      ) : null}
      <img
        src={asset.src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        className="h-auto max-w-full"
      />
    </picture>
  );
}
