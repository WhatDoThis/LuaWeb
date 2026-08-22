# 02-COMPONENT-SPEC — UI 컴포넌트 명세 (12 패턴)

## 패턴 인덱스

| # | 패턴 | 컴포넌트 | 파일 |
|---|---|---|---|
| 1 | Header + GNB | `Header`, `Gnb`, `GnbSubmenu` | `components/layout/` |
| 2 | 언어 스위처 | `LangSwitcher` | `components/layout/lang-switcher.tsx` |
| 3 | 사이트맵 오버레이 | `SitemapOverlay` | `components/layout/sitemap-overlay.tsx` |
| 4 | Footer + Top | `Footer`, `TopButton` | `components/layout/` |
| 5 | IntroHero + LNB | `IntroHero`, `LnbBar` | `components/sections/common/` |
| 6 | SpHead | `SpHead` | `components/sections/common/sp-head.tsx` |
| 7 | 반응형 이미지 | `SmartImage` | `components/ui/smart-image.tsx` |
| 8 | 탭 | `Tabs` | `components/ui/tabs.tsx` |
| 9 | 게시판 목록 | `BoardList`, `BoardRow` | `components/sections/pr/` |
| 10 | 지도 + 테이블 | `LocationTabs` | `components/sections/company/location-tabs.tsx` |
| 11 | 모달 | `Modal` | `components/ui/modal.tsx` |
| 12 | 홈 슬라이더/스크롤 | `HeroSlider`, `BizCardSlider`, `BizFieldScroller` | `components/sections/home/` |

---

## 1. Header + GNB hover 서브메뉴

| 항목 | 값 |
|---|---|
| 파일 | `header.tsx`, `gnb.tsx`, `gnb-submenu.tsx` |
| 타입 | Client (`useState` hover, mobile menu) |
| 사용 | 전 페이지 |

```ts
// gnb.tsx
export type NavItem = {
  id: string;
  labelKey: string;           // common.nav.{id}
  href?: string;
  children?: { id: string; labelKey: string; href: string }[];
};

export interface GnbProps {
  items: NavItem[];
  locale: 'ko' | 'en';
}
```

| 반응형 | ≥1024 hover submenu / <1024 햄버거 → SitemapOverlay |
| 이미지 슬롯 | `common.logo`, `common.logoFooter` |

---

## 2. LangSwitcher (KOR/ENG)

| 항목 | 값 |
|---|---|
| 파일 | `lang-switcher.tsx` |
| 타입 | Client |

```ts
export interface LangSwitcherProps {
  locale: 'ko' | 'en';
  pathname: string;  // locale 제외 경로
}
```

| 반응형 | Header 우측 고정 |
| 이미지 슬롯 | 없음 |

---

## 3. SitemapOverlay (전체메뉴)

| 항목 | 값 |
|---|---|
| 파일 | `sitemap-overlay.tsx` |
| 타입 | Client (`Accordion` 내부) |

```ts
export interface SitemapOverlayProps {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
}
```

| 반응형 | fullscreen overlay, Accordion 1depth |
| 이미지 슬롯 | 없음 |

---

## 4. Footer + TopButton

| 항목 | 값 |
|---|---|
| 파일 | `footer.tsx`, `top-button.tsx` |
| 타입 | Footer: Server / TopButton: Client (scroll) |

```ts
export interface FooterProps {
  locale: 'ko' | 'en';
  onPrivacyClick: () => void;  // Client wrapper에서 Modal 연결
}

export interface TopButtonProps {
  threshold?: number;  // default 300
}
```

| 반응형 | 3-column → 1-column stack (<768) |
| 이미지 슬롯 | `common.logoFooter` |

---

## 5. IntroHero + LnbBar

| 항목 | 값 |
|---|---|
| 파일 | `intro-hero.tsx`, `lnb-bar.tsx` |
| 타입 | IntroHero: Server / LnbBar: Client (dropdown) |

```ts
export interface IntroHeroProps {
  imagePath: string;          // images.json dot path
  locale: 'ko' | 'en';
  className?: string;
}

export type LnbItem = {
  id: string;
  labelKey: string;
  href: string;
  children?: LnbItem[];
};

export interface LnbBarProps {
  section: 'company' | 'technology' | 'management' | 'pr-center' | 'career';
  currentPath: string;
  locale: 'ko' | 'en';
  /** technology: active/hover 스타일 비활성 */
  staticMode?: boolean;
}
```

| 반응형 | LNB 가로 스크롤 (<768) |
| 이미지 슬롯 | 섹션별 `{section}.hero` |

**technology `staticMode={true}`**: active 하이라이트·hover 이벤트 CSS 없음.

---

## 6. SpHead (Section Page Head)

| 항목 | 값 |
|---|---|
| 파일 | `sp-head.tsx` |
| 타입 | Server |

```ts
export interface SpHeadProps {
  tagKey: string;       // content JSON key → 영문 tag
  titleKey: string;     // 국문/영문 title
  descKey?: string;
  locale: 'ko' | 'en';
}
```

| 반응형 | title font-size 축소 (<768) |
| 이미지 슬롯 | 없음 |

---

## 7. SmartImage (PC/MO 스왑 + 플레이스홀더)

| 항목 | 값 |
|---|---|
| 파일 | `smart-image.tsx` |
| 타입 | Server |

```ts
import type { ImageAsset } from '@repo/env';

export interface SmartImageProps {
  path?: string;              // dot path e.g. 'company.greeting.portrait'
  asset?: ImageAsset;
  locale: 'ko' | 'en';
  className?: string;
  priority?: boolean;
}
```

| 반응형 | `srcMobile` → `<source media="(max-width:767px)">` |
| 이미지 슬롯 | `path` prop으로 images.json 전체 |

---

## 8. Tabs

| 항목 | 값 |
|---|---|
| 파일 | `tabs.tsx` |
| 타입 | Client |

```ts
export type TabItem = {
  id: string;
  labelKey: string;
  content: React.ReactNode;
};

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  ariaLabel?: string;
}
```

| 반응형 | 버튼 가로 스크롤 (<768) |
| 사용 페이지 | company/location |
| 이미지 슬롯 | 없음 |

---

## 9. BoardList + BoardRow

| 항목 | 값 |
|---|---|
| 파일 | `board-list.tsx`, `board-row.tsx`, `board-search.tsx` |
| 타입 | BoardList/Row: Server / Search: Client |

```ts
export type BoardArticle = {
  slug: string;
  date: string;
  category: 'notice' | 'news';
  pinned?: boolean;
  title: string;
  excerpt?: string;
};

export interface BoardListProps {
  articles: BoardArticle[];
  locale: 'ko' | 'en';
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export interface BoardRowProps {
  article: BoardArticle;
  locale: 'ko' | 'en';
  href: string;
}

export interface BoardSearchProps {
  locale: 'ko' | 'en';
  basePath: string;
  initialQuery?: string;
}
```

| 반응형 | PC: table row / MO: card stack (번호·날짜 재배치) |
| 사용 | pr-center/news |
| 이미지 슬롯 | 없음 |

---

## 10. LocationTabs (지도 + 정보 테이블)

| 항목 | 값 |
|---|---|
| 파일 | `location-tabs.tsx` |
| 타입 | Client (Tabs wrapper) |

```ts
export type LocationTabData = {
  id: string;
  labelKey: string;
  mapEmbedUrl: string;      // site.json 또는 content
  addressKey: string;
  tel?: string;
  fax?: string;
};

export interface LocationTabsProps {
  tabs: LocationTabData[];
  locale: 'ko' | 'en';
}
```

| 반응형 | iframe 16:9 → 4:3 (<768) |
| 이미지 슬롯 | 없음 (지도 iframe) |

---

## 11. Modal (개인정보처리방침)

| 항목 | 값 |
|---|---|
| 파일 | `modal.tsx` |
| 타입 | Client |

```ts
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
```

| 반응형 | centered, max-w-2xl, scroll body |
| 사용 | Footer privacy link |
| 이미지 슬롯 | 없음 |

---

## 12. 홈 전용 섹션

### 12a. HeroSlider

| 파일 | `hero-slider.tsx` | Client | Embla Carousel |
|---|---|---|---|

```ts
export interface HeroSliderProps {
  slides: { imagePath: string; titleKey: string; subtitleKey?: string }[];
  locale: 'ko' | 'en';
}
```

| 이미지 슬롯 | `home.heroSlides[0..2]` |

### 12b. BizCardSlider

```ts
export interface BizCardSliderProps {
  cards: { imagePath: string; titleKey: string; href: string }[];
  locale: 'ko' | 'en';
}
```

| 이미지 슬롯 | `home.techCards[0..1]` |

### 12c. BizFieldScroller

```ts
export interface BizFieldScrollerProps {
  items: { titleKey: string; descKey: string }[];
  locale: 'ko' | 'en';
}
```

| 이미지 슬롯 | 없음 (텍스트+아이콘) |

### 12d. HomeNewsList / LinkCards

```ts
export interface HomeNewsListProps {
  articles: BoardArticle[];
  locale: 'ko' | 'en';
  limit?: number;
}

export interface LinkCardsProps {
  cards: { imagePath: string; titleKey: string; href: string }[];
  locale: 'ko' | 'en';
}
```

| LinkCards 이미지 | `home.linkCards.prCenter`, `.irCenter`, `.location` |

---

## 보조 컴포넌트

| 컴포넌트 | 파일 | 용도 |
|---|---|---|
| `PageContainer` | `page-container.tsx` | max-width wrapper |
| `Pagination` | `pagination.tsx` | 게시판 페이지네이션 |
| `Accordion` | `accordion.tsx` | SitemapOverlay |
| `SectionHead` | `section-head.tsx` | 홈 섹션 타이틀 |
| `DisclosureList` | `disclosure-list.tsx` | 공시 — **미연결** |
| `BoardView` | `board-view.tsx` | 뉴스 상세 본문 |

```ts
// disclosure-list.tsx — 선구현 only
export interface DisclosureItem {
  date: string;
  title: string;
  url: string;       // DART or PDF
  type: 'dart' | 'pdf';
}

export interface DisclosureListProps {
  items: DisclosureItem[];
  locale: 'ko' | 'en';
}
```

---

## 페이지 → 컴포넌트 매핑

| 페이지 | 컴포넌트 |
|---|---|
| 전체 | Header, Footer, TopButton, Modal |
| 서브 16 | IntroHero, LnbBar, SpHead, PageContainer |
| home | HeroSlider, BizCardSlider, BizFieldScroller, HomeNewsList, LinkCards |
| company/* | 섹션별 (HistoryTimeline, OrgChart, LocationTabs, CertGrid) |
| technology/* | TechIntroBlock, NumberedSection, TechImageRow (CTA 없음) |
| management/* | PolicyDiagram, EthicsBlock, EsgBlock |
| pr-center/news | BoardList, BoardSearch, Pagination |
| pr-center/news/[slug] | BoardView |
| career/* | TalentDiagram, ProcessSteps, WelfareGrid, DownloadButton |

## 확인 필요

_(없음)_
