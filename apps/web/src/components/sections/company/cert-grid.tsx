/**
 * sections.cert-grid (인증서 그리드)
 * ===================================
 * 이미지 placeholder + name/issuer — company 인증현황
 *
 * [Main Functions]
 * - CertGrid
 *
 * [Dependencies]
 * - ui/smart-image, @repo/env getImage
 */

import { SmartImage } from '@/components/ui/smart-image';
import { getImage } from '@repo/env';

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
};

// 1. CertGrid
export function CertGrid({ items, imagePathPrefix, locale, documentViewLabel }: CertGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item, index) => {
        const imagePath = `${imagePathPrefix}.items.${index}`;
        const hasImage = Boolean(getImage(imagePath).src?.trim());

        return (
          <figure key={`${item.name}-${index}`} className="space-y-3">
            {item.documentUrl && !hasImage ? (
              <a
                href={item.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex aspect-[5/7] flex-col items-center justify-center gap-3 rounded-lg border border-neutral-200 bg-gradient-to-br from-primary/8 to-neutral-50 px-4 text-center transition-colors hover:border-primary/30 hover:bg-primary/10"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
                    <path
                      d="M8 4h8l4 4v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path d="M16 4v4h4M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
                <span className="text-xs font-medium text-primary">{documentViewLabel}</span>
              </a>
            ) : (
              <SmartImage path={imagePath} locale={locale} className="w-full overflow-hidden rounded-lg" />
            )}
            <figcaption>
              <p className="text-sm font-semibold text-neutral-800">{item.name}</p>
              <p className="text-xs text-neutral-500">{item.issuer}</p>
              {item.documentUrl && hasImage ? (
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
