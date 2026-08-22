/**
 * sections.cert-grid (인증서 그리드)
 * ===================================
 * 이미지 placeholder + name/issuer — company·career 공용
 *
 * [Main Functions]
 * - CertGrid
 *
 * [Dependencies]
 * - ui/smart-image
 */

import { SmartImage } from '@/components/ui/smart-image';

export type CertGridItem = {
  name: string;
  issuer: string;
};

export type CertGridProps = {
  items: CertGridItem[];
  imagePathPrefix: string;
  locale: 'ko' | 'en';
};

// 1. CertGrid
export function CertGrid({ items, imagePathPrefix, locale }: CertGridProps) {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item, index) => (
        <figure key={`${item.name}-${index}`} className="space-y-3">
          <SmartImage
            path={`${imagePathPrefix}.items.${index}`}
            locale={locale}
            className="w-full"
          />
          <figcaption>
            <p className="text-sm font-semibold text-neutral-800">{item.name}</p>
            <p className="text-xs text-neutral-500">{item.issuer}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
