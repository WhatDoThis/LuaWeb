/**
 * lib.lnb (LNB 섹션 설정)
 * =======================
 * 섹션별 LNB 항목 href·labelKey — disclosure 미포함
 *
 * [Main Functions]
 * - lnbSections
 *
 * [Dependencies]
 * - 없음
 */

export type LnbSection = 'company' | 'technology' | 'management' | 'prCenter';

export type LnbItemConfig = {
  id: string;
  labelKey: string;
  href: string;
};

export type LnbSectionConfig = {
  metaLabelKey: string;
  items: LnbItemConfig[];
};

// 1. lnbSections
export const lnbSections: Record<LnbSection, LnbSectionConfig> = {
  company: {
    metaLabelKey: 'meta.sectionTitle',
    items: [
      { id: 'greeting', labelKey: 'lnb.greeting', href: '/company/greeting' },
      { id: 'overview', labelKey: 'lnb.overview', href: '/company/overview' },
      { id: 'history', labelKey: 'lnb.history', href: '/company/history' },
      { id: 'organizations', labelKey: 'lnb.organizations', href: '/company/organizations' },
      { id: 'certificates', labelKey: 'lnb.certificates', href: '/company/certificates' },
      { id: 'location', labelKey: 'lnb.location', href: '/company/location' },
    ],
  },
  technology: {
    metaLabelKey: 'meta.sectionTitle',
    items: [
      { id: 'tech1', labelKey: 'lnb.tech1', href: '/technology/tech-1' },
      { id: 'tech2', labelKey: 'lnb.tech2', href: '/technology/tech-2' },
    ],
  },
  management: {
    metaLabelKey: 'meta.sectionTitle',
    items: [
      { id: 'policy', labelKey: 'lnb.policy', href: '/management/policy' },
      { id: 'ethics', labelKey: 'lnb.ethics', href: '/management/ethics' },
      { id: 'esg', labelKey: 'lnb.esg', href: '/management/esg' },
    ],
  },
  prCenter: {
    metaLabelKey: 'meta.sectionTitle',
    items: [{ id: 'news', labelKey: 'lnb.news', href: '/pr-center/news' }],
  },
};
