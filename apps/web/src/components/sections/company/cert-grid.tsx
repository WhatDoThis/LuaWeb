/**
 * sections.cert-grid (인증서 그리드)
 * ===================================
 * PDF 썸네일·진행중 상태·등록 특허 카드
 *
 * [Main Functions]
 * - CertGrid
 *
 * [Dependencies]
 * - ui/smart-image, @repo/env getImage, resolveImageSrc
 */

import { SmartImage } from '@/components/ui/smart-image';
import { getImage, resolveImageSrc } from '@repo/env';

export type CertGridItem = {
  name: string;
  issuer: string;
  documentUrl?: string;
};

export type CertGridProps = {
  items: CertGridItem[];
  imagePathPrefix: string;
  locale: 'ko' | 'en';
  documentViewLabel: string;
  pendingLabel: string;
};

// 1. CertGrid
export function CertGrid({
  items,
  imagePathPrefix,
  locale,
  documentViewLabel,
  pendingLabel,
}: CertGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item, index) => {
        const imagePath = `${imagePathPrefix}.items.${index}`;
        const asset = getImage(imagePath);
        const hasImage = Boolean(resolveImageSrc(asset, locale));

        const imageCard = hasImage ? (
          <SmartImage path={imagePath} locale={locale} className="w-full overflow-hidden rounded-lg" />
        ) : null;

        const cardInner = (
          <>
            {hasImage && item.documentUrl ? (
              <a
                href={item.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-lg border border-neutral-200 bg-white transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary"
              >
                {imageCard}
              </a>
            ) : null}
            {hasImage && !item.documentUrl ? imageCard : null}
            {!hasImage && item.documentUrl ? (
              <a
                href={item.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-lg border border-neutral-200 bg-white transition-shadow hover:shadow-md"
              >
                <SmartImage
                  path={imagePath}
                  locale={locale}
                  className="aspect-[5/7] w-full [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_img]:object-top"
                />
              </a>
            ) : null}
            {!hasImage && !item.documentUrl ? (
              <div className="flex aspect-[5/7] items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50">
                <span className="text-sm font-medium tracking-wide text-neutral-500">{pendingLabel}</span>
              </div>
            ) : null}
          </>
        );

        return (
          <figure key={`${item.name}-${index}`} className="space-y-3">
            {cardInner}
            <figcaption>
              <p className="text-sm font-semibold text-neutral-800">{item.name}</p>
              <p className="text-xs text-neutral-500">{item.issuer}</p>
              {item.documentUrl ? (
                <a
                  href={item.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs font-medium text-primary underline-offset-2 hover:underline"
                >
                  {documentViewLabel}
                </a>
              ) : null}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
