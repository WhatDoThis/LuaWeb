/**
 * sections.cert-grid (인증서 그리드)
 * ===================================
 * 썸네일 카드 + 진행중 항목 컴팩트 리스트
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

type ResolvedCertItem = CertGridItem & {
  index: number;
  imagePath: string;
  hasImage: boolean;
};

// 1. CertGrid
export function CertGrid({
  items,
  imagePathPrefix,
  locale,
  documentViewLabel,
  pendingLabel,
}: CertGridProps) {
  const resolvedItems: ResolvedCertItem[] = items.map((item, index) => {
    const imagePath = `${imagePathPrefix}.items.${index}`;
    const asset = getImage(imagePath);
    return {
      ...item,
      index,
      imagePath,
      hasImage: Boolean(resolveImageSrc(asset, locale)),
    };
  });

  const readyItems = resolvedItems.filter((item) => item.hasImage);
  const pendingItems = resolvedItems.filter((item) => !item.hasImage);

  return (
    <div className="space-y-10">
      {readyItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {readyItems.map((item) => {
            const imageCard = (
              <SmartImage path={item.imagePath} locale={locale} className="w-full overflow-hidden rounded-lg" />
            );

            return (
              <figure key={`${item.name}-${item.index}`} className="space-y-3">
                {item.documentUrl ? (
                  <a
                    href={item.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-lg border border-neutral-200 bg-white transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {imageCard}
                  </a>
                ) : (
                  imageCard
                )}
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
      ) : null}

      {pendingItems.length > 0 ? (
        <ul className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
          {pendingItems.map((item) => (
            <li
              key={`${item.name}-${item.index}`}
              className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              <div>
                <p className="text-sm font-semibold text-neutral-800">{item.name}</p>
                <p className="text-xs text-neutral-500">{item.issuer}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium tracking-wide text-neutral-600">
                  {pendingLabel}
                </span>
                {item.documentUrl ? (
                  <a
                    href={item.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-primary underline-offset-2 hover:underline"
                  >
                    {documentViewLabel}
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
