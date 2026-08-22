# 03-CONTENT-SCHEMA — 콘텐츠·환경 JSON 스키마

## 1. packages/env/site.json

```ts
export type SiteConfig = {
  companyName: { ko: string; en: string };
  domain: string;
  contact: {
    tel: string;
    fax: string;
    email: string;
  };
  addresses: {
    hq: { ko: string; en: string; zip: string };
  };
  maps: {
    hq: string;           // Google Maps embed URL
    factory?: string;
  };
  social?: {
    linkedin?: string;
    youtube?: string;
  };
  analytics?: {
    gaId?: string;
  };
  copyright: { ko: string; en: string };
};
```

---

## 2. packages/env/features.json

```ts
export type FeaturesConfig = {
  showHitCount: boolean;        // always false
  showDisclosureNav: boolean;   // false — GNB 주석
  enableNewsSearch: boolean;    // true
  newsPerPage: number;          // 10
  placeholderMode: boolean;     // true until images filled
};
```

---

## 3. packages/env/images.json — ImageAsset

```ts
export type ImageAsset = {
  src: string;
  srcMobile?: string;
  size: string;                 // "WxH"
  ratio?: string;
  where?: string;
  alt?: { ko: string; en: string };
};
```

`src === ""` → SmartImage 플레이스홀더.

### 3.1 common

| 키 | size | where |
|---|---|---|
| `common.logo` | 180x48 | Header 좌측 로고 |
| `common.logoFooter` | 160x44 | Footer 로고 |
| `common.favicon` | 32x32 | favicon.ico 소스 |
| `common.ogDefault` | 1200x630 | OG 기본 이미지 |

### 3.2 home

| 키 | size | where |
|---|---|---|
| `home.heroSlides[0]` | 1920x1080 | 메인 히어로 1 / Global Leading |
| `home.heroSlides[1]` | 1920x1080 | 메인 히어로 2 / High-Tech Solution |
| `home.heroSlides[2]` | 1920x1080 | 메인 히어로 3 / Everlasting Innovation |
| `home.techCards[0]` | 420x560 | 기술카드 슬라이더 1 |
| `home.techCards[1]` | 420x560 | 기술카드 슬라이더 2 |
| `home.linkCards.prCenter` | 440x300 | 하단 링크카드 PR Center |
| `home.linkCards.irCenter` | 440x300 | 하단 링크카드 IR Center |
| `home.linkCards.location` | 440x300 | 하단 링크카드 오시는 길 |
| `home.bizField.bg` | 1920x600 | 사업분야 섹션 배경 (선택) |

### 3.3 company

| 키 | size | where |
|---|---|---|
| `company.hero` | 1920x420 | 회사소개 IntroHero 공통 |
| `company.greeting.portrait` | 560x700 | 인사말 대표 사진 |
| `company.greeting.ceoSign` | 260x80 | 인사말 서명 PNG |
| `company.overview.diagram` | 1200x680 | 회사개요 조직/사업 다이어그램 |
| `company.history.banner` | 1200x400 | 연혁 상단 배너 (선택) |
| `company.organizations.chart` | 1069x760 | 조직도 PC |
| `company.organizations.chartMobile` | 750x1200 | 조직도 MO (srcMobile) |
| `company.certificates.items[0..n]` | 400x560 | 인증서 썸네일 |
| `company.location.tabs[0..4].photo` | 800x450 | 찾아오시는 길 탭별 사진 (선택) |

### 3.4 technology

| 키 | size | where |
|---|---|---|
| `technology.hero` | 1920x420 | 기술소개 IntroHero 공통 |
| `technology.tech1.hero` | 1920x420 | tech-1 IntroHero |
| `technology.tech1.featureA` | 660x420 | tech-1 01 좌측 |
| `technology.tech1.featureB` | 660x420 | tech-1 01 우측 |
| `technology.tech1.diagram` | 1200x520 | tech-1 02 시스템 구성도 |
| `technology.tech1.process[0..3]` | 280x200 | tech-1 프로세스 아이콘 (선택) |
| `technology.tech2.hero` | 1920x420 | tech-2 IntroHero |
| `technology.tech2.featureMain` | 1200x520 | tech-2 01 메인 |
| `technology.tech2.gallery[0]` | 580x360 | tech-2 갤러리 1 |
| `technology.tech2.gallery[1]` | 580x360 | tech-2 갤러리 2 |
| `technology.tech2.gallery[2]` | 580x360 | tech-2 갤러리 3 |

### 3.5 management

| 키 | size | where |
|---|---|---|
| `management.hero` | 1920x420 | 경영방침 IntroHero |
| `management.policy.diagram` | 1000x600 | 경영방침 다이어그램 |
| `management.ethics.banner` | 1200x400 | 윤리경영 상단 |
| `management.ethics.icons[0..3]` | 120x120 | 윤리 4원칙 아이콘 |
| `management.esg.banner` | 1200x400 | ESG 상단 |
| `management.esg.pillars[0..2]` | 360x240 | ESG 3축 카드 |

### 3.6 pr-center

| 키 | size | where |
|---|---|---|
| `prCenter.hero` | 1920x420 | 홍보센터 IntroHero |
| `prCenter.news.hero` | 1920x420 | 뉴스 목록 IntroHero (news 전용 시) |
| `prCenter.disclosure.hero` | 1920x420 | 공시정보 IntroHero (미사용) |

### 3.7 career

| 키 | size | where |
|---|---|---|
| `career.hero` | 1920x420 | 채용정보 IntroHero |
| `career.recruitment.diagram` | 1000x500 | 인재상 다이어그램 |
| `career.recruitment.process[0..4]` | 200x200 | 채용 프로세스 5단계 |
| `career.welfare.icons[0..7]` | 120x120 | 복리후생 8아이콘 |
| `career.certificates.items[0..n]` | 400x560 | 채용 인증서 |

---

## 4. packages/content — 페이지 JSON (ko/en 동형)

모든 locale 파일은 **동일 키 구조**. 값만 번역.

### 4.1 common.json

```ts
type CommonMessages = {
  nav: {
    company: string;
    technology: string;
    management: string;
    prCenter: string;
    career: string;
    // children keys per section
  };
  footer: {
    privacy: string;
    address: string;
    tel: string;
    fax: string;
    copyright: string;
  };
  privacy: {
    title: string;
    body: string;           // HTML or markdown
  };
  lang: { ko: string; en: string };
  breadcrumb: { home: string };
  board: {
    notice: string;
    news: string;
    searchPlaceholder: string;
    noResults: string;
    prev: string;
    next: string;
  };
};
```

### 4.2 home.json

```ts
type HomeMessages = {
  hero: {
    slides: { title: string; subtitle?: string }[];  // length 3
  };
  techCards: { title: string; href: string }[];
  bizFields: { title: string; desc: string }[];
  sections: {
    technology: { tag: string; title: string };
    news: { tag: string; title: string; more: string };
    links: { tag: string; title: string };
  };
  linkCards: {
    prCenter: { title: string; desc: string };
    irCenter: { title: string; desc: string };
    location: { title: string; desc: string };
  };
};
```

### 4.3 company.json

```ts
type CompanyMessages = {
  meta: { sectionTag: string; sectionTitle: string };
  lnb: Record<string, string>;   // greeting, overview, ...
  pages: {
    greeting: { tag: string; title: string; desc?: string; body: string[] };
    overview: { tag: string; title: string; desc?: string; tables: {...}[] };
    history: { tag: string; title: string; events: { year: string; items: string[] }[] };
    organizations: { tag: string; title: string; desc?: string };
    certificates: { tag: string; title: string; items: { name: string; issuer: string }[] };
    location: {
      tag: string; title: string;
      tabs: { id: string; label: string; address: string; tel?: string; directions: string }[];
    };
  };
};
```

### 4.4 technology.json

```ts
type TechnologyMessages = {
  meta: { sectionTag: string; sectionTitle: string };
  lnb: { tech1: string; tech2: string };
  pages: {
    tech1: {
      tag: string; title: string; desc?: string;
      sections: {
        id: string;
        number: string;
        title: string;
        body: string | string[];
        imageKey?: string;     // images.json dot suffix
      }[];
    };
    tech2: { /* 동형 */ };
  };
};
```

**CTA 필드 없음** — buttons/links in body 금지.

### 4.5 management.json

```ts
type ManagementMessages = {
  meta: { sectionTag: string; sectionTitle: string };
  lnb: { policy: string; ethics: string; esg: string };
  pages: {
    policy: { tag: string; title: string; body: string[]; principles: string[] };
    ethics: { tag: string; title: string; codes: { title: string; desc: string }[] };
    esg: { tag: string; title: string; pillars: { title: string; desc: string; goals: string[] }[] };
  };
};
```

### 4.6 prCenter.json

```ts
type PrCenterMessages = {
  meta: { sectionTag: string; sectionTitle: string };
  lnb: {
    news: string;
    // disclosure: string;  ← 주석 (미연결)
  };
  news: {
    tag: string; title: string; desc?: string;
  };
  disclosure: {              // 컴포넌트용 데이터 (페이지 미연결)
    tag: string; title: string;
    items: { date: string; title: string; url: string; type: 'dart' | 'pdf' }[];
  };
};
```

### 4.7 career.json

```ts
type CareerMessages = {
  meta: { sectionTag: string; sectionTitle: string };
  lnb: { recruitment: string; welfare: string; certificates: string };
  pages: {
    recruitment: {
      tag: string; title: string;
      talent: { title: string; items: string[] };
      process: { step: number; title: string; desc: string }[];
    };
    welfare: { tag: string; title: string; items: { title: string; desc: string }[] };
    certificates: { tag: string; title: string; items: { name: string; file?: string }[] };
  };
};
```

---

## 5. 뉴스 기사 JSON 스키마

**경로**: `packages/content/board/news/{locale}/{YYYY-MM-DD}-{slug}.json`

```ts
type NewsArticleFile = {
  slug: string;                    // URL slug, 파일명과 일치
  date: string;                    // ISO date "2026-08-20"
  category: 'notice' | 'news';
  pinned?: boolean;
  title: string;
  excerpt?: string;
  body: string;                    // Markdown
  thumbnail?: string;              // optional images.json path or /static/...
};
```

### 예시

```json
{
  "slug": "2026-08-20-company-news",
  "date": "2026-08-20",
  "category": "notice",
  "pinned": true,
  "title": "홈페이지 리뉴얼 안내",
  "excerpt": "새로운 홈페이지가 오픈되었습니다.",
  "body": "## 개요\n\n새 홈페이지...\n\n- 항목1\n- 항목2"
}
```

### 로더 API

```ts
// packages/content/index.ts
export function loadMessages(locale: 'ko' | 'en'): Promise<AllMessages>;
export function loadNewsArticles(locale: 'ko' | 'en'): Promise<NewsArticleFile[]>;
export function loadNewsArticle(locale: 'ko' | 'en', slug: string): Promise<NewsArticleFile | null>;
```

### 개발자 워크플로

1. `news/ko/` 에 JSON 파일 복사 (junction 경로)
2. 필드 작성 (`body`는 Markdown)
3. `en/` 동명 slug 파일 추가 (번역)
4. `pnpm build` → 정적 HTML 자동 생성

---

## 6. @repo/env 로더

```ts
export function getImage(path: string): ImageAsset;
export function getSite(): SiteConfig;
export function getFeatures(): FeaturesConfig;
export function listEmptyImageSlots(): { path: string; asset: ImageAsset }[];
```

---

## 7. ko/en 동형 검증

Phase 0에 `scripts/validate-content.ts` (선택):

- ko/*.json 키 트리 === en/*.json 키 트리
- 불일치 시 CI fail

## 확인 필요

_(없음)_
