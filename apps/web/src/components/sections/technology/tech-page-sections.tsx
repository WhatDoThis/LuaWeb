/**
 * sections.tech-page-sections (기술 페이지 본문)
 * =============================================
 * technology.json sections → NumberedSection map
 *
 * [Main Functions]
 * - TechPageSections
 *
 * [Dependencies]
 * - sections/technology/*, @/lib/i18n
 */

import { NumberedSection } from '@/components/sections/technology/numbered-section';
import { TechIntroBlock } from '@/components/sections/technology/tech-intro-block';
import { getTranslations, setRequestLocale } from '@/lib/i18n';

type TechPageSectionsProps = {
  locale: 'ko' | 'en';
  pageKey: 'tech1' | 'tech2';
};

type TechSection = {
  number: string;
  title: string;
  body: string | string[];
  layout?: 'full' | 'split' | 'gallery' | 'text';
  images?: string[];
};

// 1. TechPageSections
export async function TechPageSections({ locale, pageKey }: TechPageSectionsProps) {
  setRequestLocale(locale);
  const t = await getTranslations('technology');
  const intro = t.raw(`pages.${pageKey}.intro`) as string | string[];
  const sections = t.raw(`pages.${pageKey}.sections`) as TechSection[];
  const prefix = `technology.${pageKey}`;

  return (
    <>
      <TechIntroBlock text={intro} />
      {sections.map((section) => {
        const imagePaths = section.images?.map((key) => `${prefix}.${key}`) ?? [];

        return (
          <NumberedSection
            key={`${section.number}-${section.title}`}
            number={section.number}
            title={section.title}
            body={section.body}
            locale={locale}
            layout={section.layout ?? 'text'}
            imagePaths={imagePaths}
          />
        );
      })}
    </>
  );
}
