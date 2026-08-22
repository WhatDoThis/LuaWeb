/**
 * ui.smart-image (반응형 이미지)
 * ==============================
 * images.json dot path 또는 ImageAsset — src 빈 값이면 플레이스홀더
 *
 * [Main Functions]
 * - SmartImage
 *
 * [Dependencies]
 * - @repo/env getImage, ui/image-asset-view
 */

import { ImageAssetView } from '@/components/ui/image-asset-view';
import { getImage, type ImageAsset } from '@repo/env';

export type SmartImageProps = {
  path?: string;
  asset?: ImageAsset;
  locale: 'ko' | 'en';
  className?: string;
  priority?: boolean;
};

// 1. SmartImage
export function SmartImage({ path, asset, locale, className, priority }: SmartImageProps) {
  const resolved = asset ?? getImage(path!);

  return (
    <ImageAssetView
      asset={resolved}
      locale={locale}
      path={path}
      className={className}
      priority={priority}
    />
  );
}
