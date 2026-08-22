/**
 * sections.tech-image-row (2열 feature 이미지)
 * ==========================================
 * featureA + featureB — CTA 없음
 *
 * [Main Functions]
 * - TechImageRow
 *
 * [Dependencies]
 * - ui/smart-image
 */

import { SmartImage } from '@/components/ui/smart-image';

export type TechImageRowProps = {
  imagePaths: [string, string];
  locale: 'ko' | 'en';
};

// 1. TechImageRow
export function TechImageRow({ imagePaths, locale }: TechImageRowProps) {
  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      {imagePaths.map((path) => (
        <SmartImage key={path} path={path} locale={locale} className="w-full" />
      ))}
    </div>
  );
}
