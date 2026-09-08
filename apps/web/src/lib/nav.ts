/**
 * lib.nav (GNB 네비게이션 데이터)
 * =================================
 * NavItem 트리 — disclosure GNB 항목 주석 처리
 *
 * [Main Functions]
 * - navItems
 *
 * [Dependencies]
 * - 없음
 */

export type NavChild = {
  id: string;
  labelKey: string;
  href: string;
};

export type NavItem = {
  id: string;
  labelKey: string;
  href?: string;
  children?: NavChild[];
};

// 1. navItems
export const navItems: NavItem[] = [
  {
    id: 'company',
    labelKey: 'nav.company.label',
    children: [
      { id: 'greeting', labelKey: 'nav.company.greeting', href: '/company/greeting' },
      { id: 'overview', labelKey: 'nav.company.overview', href: '/company/overview' },
      { id: 'certificates', labelKey: 'nav.company.certificates', href: '/company/certificates' },
      { id: 'location', labelKey: 'nav.company.location', href: '/company/location' },
    ],
  },
  {
    id: 'technology',
    labelKey: 'nav.technology.label',
    children: [
      { id: 'tech1', labelKey: 'nav.technology.tech1', href: '/technology/tech-1' },
      { id: 'tech2', labelKey: 'nav.technology.tech2', href: '/technology/tech-2' },
    ],
  },
  {
    id: 'management',
    labelKey: 'nav.management.label',
    children: [{ id: 'policy', labelKey: 'nav.management.policy', href: '/management/policy' }],
  },
  {
    id: 'prCenter',
    labelKey: 'nav.prCenter.label',
    children: [
      { id: 'news', labelKey: 'nav.prCenter.news', href: '/pr-center/news' },
      // { id: 'disclosure', labelKey: 'nav.prCenter.disclosure', href: '/pr-center/disclosure' },
    ],
  },
];
