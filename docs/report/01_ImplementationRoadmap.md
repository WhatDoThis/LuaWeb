# 루아(Lua) 기업 홍보 사이트 — Phase별 상세 구현 로드맵

> **본 문서 하나만으로 Phase 0~7 전체 개발을 수행할 수 있습니다.**  
> 외부 문서 참조 없이 요구사항·아키텍처·스키마·컴포넌트·단계별 작업·검증·커밋까지 모두 포함합니다.

---

## 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택 및 금지 사항](#2-기술-스택-및-금지-사항)
3. [사이트맵](#3-사이트맵)
4. [디렉터리 구조](#4-디렉터리-구조)
5. [아키텍처 규칙](#5-아키텍처-규칙)
6. [코딩 컨벤션](#6-코딩-컨벤션)
7. [환경·콘텐츠 스키마](#7-환경콘텐츠-스키마)
8. [UI 컴포넌트 명세 (12 패턴)](#8-ui-컴포넌트-명세-12-패턴)
9. [Phase 0 — 모노레포 스캐폴딩](#phase-0--모노레포-스캐폴딩)
10. [Phase 1 — i18n 배선](#phase-1--i18n-배선)
11. [Phase 2 — 공통 레이아웃](#phase-2--공통-레이아웃)
12. [Phase 3 — env + SmartImage](#phase-3--env--smartimage)
13. [Phase 4 — 서브 페이지 골격](#phase-4--서브-페이지-골격)
14. [Phase 5 — 도메인 섹션 구현](#phase-5--도메인-섹션-구현)
15. [Phase 6 — 뉴스 게시판](#phase-6--뉴스-게시판)
16. [Phase 7 — 홈·SEO·CI](#phase-7--홈seoci)
17. [전 Phase 공통 검증](#전-phase-공통-검증)

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|---|---|
| 프로젝트명 | 루아(Lua) 기업 홍보 웹사이트 |
| 목적 | 기술·회사 정보를 SEO 친화적으로 **완전 정적** 제공 |
| 타깃 | 잠재 고객, 투자자, 협력사 |
| 운영 도메인 | luacorp.co.kr |
| 백엔드 | **없음** (`apps/api` README 슬롯만) |
| DB | **없음** — Git + JSON/MD가 CMS |

### 1.1 성공 지표 (KPI)

| 지표 | 목표 |
|---|---|
| LCP | < 2.0s (4G 모바일) |
| Lighthouse Performance | ≥ 95 |
| Lighthouse SEO | 100 |
| Lighthouse Accessibility | ≥ 95 |
| 콘텐츠 수정 → 배포 | Git push 후 10분 이내 |
| 정적 HTML | locale 2 × 라우트 17 + 뉴스 N |

### 1.2 기능 요구사항

| ID | 기능 | 우선순위 | 수용기준 |
|---|---|---|---|
| FR-01 | 다국어 ko/en | MUST | `/ko`, `/en`, hreflang, LangSwitcher |
| FR-02 | GNB hover 서브메뉴 | MUST | 5×1depth, desktop hover / mobile sitemap |
| FR-03 | 17 라우트 정적 렌더 | MUST | 빌드 시 전 페이지 HTML |
| FR-04 | IntroHero + LNB + SpHead | MUST | 서브 16페이지 공통 |
| FR-05 | PC/MO 이미지 스왑 | MUST | SmartImage |
| FR-06 | 찾아오시는 길 탭 5 + 지도 | MUST | Tabs + iframe |
| FR-07 | 뉴스 게시판 | MUST | JSON 기사, 목록/상세/검색/페이지네이션 |
| FR-08 | 홈 히어로·카드 슬라이더 | MUST | Embla (Phase 7) |
| FR-09 | 홈 사업분야 스크롤 | MUST | 가로 스크롤/스냅 |
| FR-10 | 개인정보처리방침 모달 | MUST | Footer → Modal |
| FR-11 | Top 버튼 | SHOULD | scroll > 300px |
| FR-12 | SEO | MUST | sitemap.xml, JSON-LD |
| FR-13 | 공시정보 컴포넌트 | SHOULD | **GNB·페이지 미연결** |
| FR-14 | 기술소개 | MUST | **CTA·버튼 없음**, 이미지+텍스트만 |
| FR-15 | 이미지 슬롯 리포트 | SHOULD | `pnpm check:images` |

### 1.3 스코프 아웃

회원·로그인, 문의폼 서버 전송, 조회수(hit), 홍보영상, 품질·안전방침, CMS, Family sites 드롭다운, 공시 GNB 연결, DART/PDF 실연동, middleware/proxy.

### 1.4 비기능

| 브레이크포인트 | px |
|---|---|
| sm | 375 |
| md | 768 |
| lg | 1024 |
| xl | 1440 |

접근성 WCAG 2.1 AA, `prefers-reduced-motion` 시 슬라이더 autoplay OFF.

---

## 2. 기술 스택 및 금지 사항

| 항목 | 선택 |
|---|---|
| Framework | Next.js 16.3 App Router + TypeScript |
| Rendering | `output: 'export'` |
| Style | Tailwind CSS v4 (`@theme`, config 파일 없음) |
| i18n | next-intl v4 + `[locale]` + `rootParams` |
| Package | pnpm workspace + turbo (선택) |
| Images | `<picture>` + SmartImage, `next/image` unoptimized |
| News | JSON + Markdown body |
| Carousel | embla-carousel-react (Phase 7만) |

### 금지 목록

- `middleware.ts` / `proxy.ts`
- `app/api/*` Route Handler
- DB / ORM
- `next/image` optimization
- Phase 계획 외 npm install
- disclosure GNB 활성화 (승인 전)
- technology 페이지 CTA

---

## 3. 사이트맵

```
/                                    → /ko 리다이렉트
/[locale]                            홈
/[locale]/company/greeting
/[locale]/company/overview
/[locale]/company/history
/[locale]/company/organizations
/[locale]/company/certificates
/[locale]/company/location
/[locale]/technology/tech-1
/[locale]/technology/tech-2
/[locale]/management/policy
/[locale]/management/ethics
/[locale]/management/esg
/[locale]/pr-center/news
/[locale]/pr-center/news/[slug]
/[locale]/pr-center/disclosure       ← 파일만, GNB 미연결
/[locale]/career/recruitment
/[locale]/career/welfare
/[locale]/career/certificates
```

---

## 4. 디렉터리 구조

```
lua-web/
├─ pnpm-workspace.yaml
├─ package.json
├─ turbo.json
├─ tsconfig.base.json
├─ apps/web/                    # Next.js 프론트
├─ apps/api/README.md           # 백엔드 슬롯 (미사용)
├─ packages/env/                # site.json, images.json, features.json
├─ packages/content/            # ko/en JSON + board/news
├─ scripts/check-images.ts
├─ env/                         # junction → packages/env
├─ static/                      # junction → apps/web/public/static
├─ news/                        # junction → packages/content/board/news
└─ docs/
```

`apps/web/src/` 하위:

- `app/` — 라우트 (page.tsx, layout.tsx)
- `components/layout/` — Header, Gnb, Footer 등
- `components/ui/` — SmartImage, Modal, Tabs 등
- `components/sections/{common,home,company,technology,management,pr,career}/`
- `i18n/` — routing.ts, request.ts, navigation.ts
- `lib/` — cn, content, board, markdown, env
- `styles/globals.css`

---

## 5. 아키텍처 규칙

### 5.1 패키지 의존

```
apps/web → @repo/env, @repo/content
packages/env, packages/content — 독립
```

### 5.2 import 방향

```
page.tsx → sections/* → layout/*, ui/* → lib/* → @repo/*
```

역방향 금지. domain 간 sections cross-import 금지.

### 5.3 데이터 흐름

빌드 타임: JSON/MD 파일 → loader → Server Component → `next build` → `out/**/*.html` → CDN.

i18n: URL `[locale]` → `rootParams()` → `loadMessages(locale)` → Provider → `useTranslations`.

### 5.4 next.config.ts

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
```

---

## 6. 코딩 컨벤션

### 6.1 네이밍

| 대상 | 규칙 | 예 |
|---|---|---|
| 파일 | kebab-case | `intro-hero.tsx` |
| 컴포넌트 | PascalCase | `IntroHero` |
| 함수 | camelCase | `loadNewsArticles` |
| 상수 | UPPER_SNAKE | `NEWS_PER_PAGE` |
| 라우트 폴더 | kebab-case | `pr-center` |

### 6.2 Server / Client

**기본 Server.** `'use client'` 허용 파일만:

`gnb.tsx`, `gnb-submenu.tsx`, `lang-switcher.tsx`, `sitemap-overlay.tsx`, `top-button.tsx`, `modal.tsx`, `tabs.tsx`, `accordion.tsx`, `board-search.tsx`, `lnb-bar.tsx`, `location-tabs.tsx`, `hero-slider.tsx`, `biz-card-slider.tsx`, `biz-field-scroller.tsx`, Footer Client wrapper.

Client에 content JSON 전체 전달 금지 — primitive/string만.

### 6.3 Import 순서

react/next → third-party → @repo/* → @/lib → @/components → types → styles

### 6.4 Tailwind v4

`globals.css` `@theme` only. 필수 토큰:

```css
@import "tailwindcss";

@theme {
  --color-primary: #003876;
  --color-secondary: #0066cc;
  --color-neutral-200: #e5e5e5;
  --color-neutral-500: #737373;
  --font-sans: "Pretendard", system-ui, sans-serif;
  --breakpoint-sm: 375px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1440px;
}
```

### 6.5 하드코딩 금지

| 유형 | 위치 |
|---|---|
| UI 문자열 | `packages/content/{locale}/*.json` |
| 이미지 | `packages/env/images.json` |
| 회사정보 | `packages/env/site.json` |
| 기능 토글 | `packages/env/features.json` |
| 뉴스 | `packages/content/board/news/{locale}/*.json` |

### 6.6 파일 헤더 (모든 .ts/.tsx)

한국어 docstring: ModuleName, 목적, [Main Functions], [Dependencies].

### 6.7 Git 커밋

영어 imperative. Phase당 1 commit 권장. 타입: feat/fix/docs/chore/refactor.

### 6.8 에러 처리

외부 I/O try/catch, guard clause, `console.error('[fn]', { context })`.

---

## 7. 환경·콘텐츠 스키마

### 7.1 site.json

```ts
type SiteConfig = {
  companyName: { ko: string; en: string };
  domain: string;
  contact: { tel: string; fax: string; email: string };
  addresses: { hq: { ko: string; en: string; zip: string } };
  maps: { hq: string; factory?: string };
  social?: { linkedin?: string; youtube?: string };
  analytics?: { gaId?: string };
  copyright: { ko: string; en: string };
};
```

### 7.2 features.json

```ts
type FeaturesConfig = {
  showHitCount: false;
  showDisclosureNav: false;
  enableNewsSearch: true;
  newsPerPage: 10;
  placeholderMode: true;
};
```

### 7.3 images.json — ImageAsset

```ts
type ImageAsset = {
  src: string;
  srcMobile?: string;
  size: string;       // "WxH"
  ratio?: string;
  where?: string;
  alt?: { ko: string; en: string };
};
```

`src === ""` → SmartImage 플레이스홀더.

**전체 슬롯:**

| 키 | size | where |
|---|---|---|
| common.logo | 180x48 | Header 로고 |
| common.logoFooter | 160x44 | Footer 로고 |
| common.favicon | 32x32 | favicon |
| common.ogDefault | 1200x630 | OG 기본 |
| home.heroSlides[0..2] | 1920x1080 | 메인 히어로 3장 |
| home.techCards[0..1] | 420x560 | 기술카드 슬라이더 |
| home.linkCards.prCenter/irCenter/location | 440x300 | 하단 링크카드 |
| home.bizField.bg | 1920x600 | 사업분야 배경 (선택) |
| company.hero | 1920x420 | 회사소개 IntroHero |
| company.greeting.portrait | 560x700 | 대표 사진 |
| company.greeting.ceoSign | 260x80 | 서명 |
| company.overview.diagram | 1200x680 | 회사개요 |
| company.history.banner | 1200x400 | 연혁 배너 (선택) |
| company.organizations.chart | 1069x760 | 조직도 PC |
| company.organizations.chartMobile | 750x1200 | 조직도 MO |
| company.certificates.items[n] | 400x560 | 인증서 |
| company.location.tabs[0..4].photo | 800x450 | 오시는 길 (선택) |
| technology.hero | 1920x420 | 기술 IntroHero 공통 |
| technology.tech1.hero/featureA/featureB/diagram | 각 size | tech-1 |
| technology.tech1.process[0..3] | 280x200 | 프로세스 (선택) |
| technology.tech2.hero/featureMain/gallery[0..2] | 각 size | tech-2 |
| management.hero/policy.diagram | 각 size | 경영방침 |
| management.ethics.banner/icons[0..3] | 각 size | 윤리경영 |
| management.esg.banner/pillars[0..2] | 각 size | ESG |
| prCenter.hero/news.hero/disclosure.hero | 1920x420 | 홍보센터 |
| career.hero/recruitment.diagram/process[0..4] | 각 size | 채용 |
| career.welfare.icons[0..7] | 120x120 | 복리후생 |
| career.certificates.items[n] | 400x560 | 채용 인증서 |

### 7.4 content JSON (ko/en 동형 키)

- `common.json` — nav, footer, privacy, board, lang, breadcrumb
- `home.json` — hero slides, techCards, bizFields, sections, linkCards
- `company.json` — meta, lnb, pages.{greeting,overview,history,organizations,certificates,location}
- `technology.json` — meta, lnb, pages.tech1/tech2 (sections[], **CTA 없음**)
- `management.json` — meta, lnb, pages.{policy,ethics,esg}
- `prCenter.json` — meta, lnb(news만), news, disclosure(데이터만)
- `career.json` — meta, lnb, pages.{recruitment,welfare,certificates}

### 7.5 뉴스 JSON

경로: `packages/content/board/news/{locale}/{YYYY-MM-DD}-{slug}.json`

```json
{
  "slug": "2026-08-20-company-news",
  "date": "2026-08-20",
  "category": "notice",
  "pinned": true,
  "title": "제목",
  "excerpt": "요약",
  "body": "## 본문\n\nMarkdown"
}
```

로더: `loadMessages`, `loadNewsArticles`, `loadNewsArticle`.

---

## 8. UI 컴포넌트 명세 (12 패턴)

| # | 컴포넌트 | 파일 | Client | 핵심 props |
|---|---|---|---|---|
| 1 | Header, Gnb, GnbSubmenu | layout/ | ✓ | NavItem[], locale |
| 2 | LangSwitcher | layout/ | ✓ | locale, pathname |
| 3 | SitemapOverlay | layout/ | ✓ | open, onClose, navItems |
| 4 | Footer, TopButton | layout/ | mixed | locale, threshold |
| 5 | IntroHero, LnbBar | sections/common/ | Lnb ✓ | imagePath, section, staticMode |
| 6 | SpHead | sections/common/ | — | tagKey, titleKey, descKey |
| 7 | SmartImage | ui/ | — | path, locale, asset |
| 8 | Tabs | ui/ | ✓ | TabItem[] |
| 9 | BoardList, BoardRow, BoardSearch | sections/pr/ | Search ✓ | articles, pagination |
| 10 | LocationTabs | sections/company/ | ✓ | LocationTabData[] |
| 11 | Modal | ui/ | ✓ | open, onClose, title |
| 12 | HeroSlider, BizCardSlider, BizFieldScroller | sections/home/ | ✓ | slides/cards/items |

**technology LnbBar**: `staticMode={true}` — active/hover CSS 없음.

**DisclosureList**: 선구현, GNB/sitemap 미연결.

---

# Phase 0 — 모노레포 스캐폴딩

**목표**: 빈 17 라우트 × 2 locale 정적 빌드 통과.

## 0.1 Workspace 루트

### 작업

1. `pnpm-workspace.yaml` 생성
2. root `package.json` — scripts: `dev`, `build`, `typecheck`, `lint`
3. `turbo.json` — pipeline: build, typecheck
4. `tsconfig.base.json` — strict, paths `@repo/*`

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

```json
{
  "name": "lua-web",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "typecheck": "turbo typecheck",
    "lint": "turbo lint"
  },
  "devDependencies": {
    "turbo": "^2",
    "typescript": "^5"
  },
  "packageManager": "pnpm@9"
}
```

### 체크

- [ ] `pnpm install` 성공

## 0.2 packages/env

### 작업

1. `package.json` — `"name": "@repo/env"`, `"main": "./index.ts"`
2. `site.json` — placeholder 회사명·연락처
3. `images.json` — `{}` 또는 `_convention` + 빈 슬롯
4. `features.json` — 기본값
5. `schema.ts` — zod (Phase 3에서 확장, Phase 0은 stub)
6. `index.ts` — `getSite()` export

### 체크

- [ ] `@repo/env` workspace resolve

## 0.3 packages/content

### 작업

1. `package.json` — `"name": "@repo/content"`
2. `ko/`, `en/` — 7개 JSON `{}` placeholder
3. `index.ts` — `loadMessages` stub return `{}`

### 체크

- [ ] ko/en 7파일 존재

## 0.4 apps/web — Next.js 초기화

### 작업

1. `pnpm create next-app` 또는 수동: Next 16.3, App Router, TS, Tailwind v4, ESLint
2. `next.config.ts` — export 설정 (§5.4)
3. `package.json` dependencies: `next`, `react`, `next-intl`, `@repo/env`, `@repo/content`
4. `tsconfig.json` — extends base, paths `@/*`
5. `postcss.config.mjs` — `@tailwindcss/postcss`
6. `src/styles/globals.css` — @theme (§6.4)

## 0.5 17 라우트 placeholder

각 `page.tsx`:

```tsx
export default function Page() {
  return <main className="p-8">PageName placeholder</main>;
}
```

생성 경로 ( `[locale]` 하위 ):

- `page.tsx` (홈)
- `company/greeting|overview|history|organizations|certificates|location/page.tsx`
- `technology/tech-1|tech-2/page.tsx`
- `management/policy|ethics|esg/page.tsx`
- `pr-center/news/page.tsx`, `pr-center/news/[slug]/page.tsx`, `pr-center/disclosure/page.tsx`
- `career/recruitment|welfare|certificates/page.tsx`

`[locale]/layout.tsx`:

```tsx
export function generateStaticParams() {
  return [{ locale: 'ko' }, { locale: 'en' }];
}
```

`app/page.tsx` — `/ko` redirect:

```tsx
import { redirect } from 'next/navigation';
export default function Root() { redirect('/ko'); }
```

> static export에서 redirect는 meta refresh fallback 병행 가능.

## 0.6 apps/api 슬롯

`apps/api/README.md`:

```markdown
# API Slot (Unused)
현 시점 미사용. 문의폼·조회수 필요 시 여기서 시작.
```

## 0.7 public/static 디렉터리

```
apps/web/public/static/images/{common,home,company,technology,management,pr-center,career}/
apps/web/public/static/downloads/
```

## 0.8 Junction (Windows)

```powershell
cmd /c mklink /J env packages\env
cmd /c mklink /J static apps\web\public\static
cmd /c mklink /J news packages\content\board\news
```

## 0.9 Phase 0 완료 조건

- [ ] `pnpm typecheck` 0 error
- [ ] `pnpm build` 성공
- [ ] `out/ko/`, `out/en/` 17+ 페이지 HTML
- [ ] middleware/proxy **없음**

### 검증

```powershell
pnpm typecheck
pnpm build
(Get-ChildItem -Recurse apps/web/out -Filter "index.html").Count
```

### 커밋

```
chore: scaffold pnpm monorepo with Next.js static export and 17 routes
```

---

# Phase 1 — i18n 배선

**목표**: next-intl + rootParams, `/ko` `/en` 다국어 렌더.

## 1.1 routing.ts

```ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
  localePrefix: 'always',
});
```

## 1.2 request.ts

```ts
import { getRequestConfig } from 'next-intl/server';
import { rootParams } from 'next/root-params';
import { routing } from './routing';
import { loadMessages } from '@repo/content';

export default getRequestConfig(async () => {
  const { locale } = await rootParams();
  const active = routing.locales.includes(locale as 'ko' | 'en')
    ? locale!
    : routing.defaultLocale;
  return { locale: active, messages: await loadMessages(active as 'ko' | 'en') };
});
```

## 1.3 navigation.ts

```ts
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
```

## 1.4 next.config plugin

```ts
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
export default withNextIntl(nextConfig);
```

## 1.5 packages/content loadMessages

```ts
import koCommon from './ko/common.json';
import enCommon from './en/common.json';
// ... merge all namespace files

export async function loadMessages(locale: 'ko' | 'en') {
  if (locale === 'ko') return { common: koCommon /* ... */ };
  return { common: enCommon /* ... */ };
}
```

## 1.6 common.json (ko/en)

nav 5섹션 + children href, footer, lang, breadcrumb 최소 문자열.

## 1.7 [locale]/layout.tsx

- `generateStaticParams`
- `NextIntlClientProvider`
- `setRequestLocale(locale)` (next-intl static)

## 1.8 홈 page.tsx

`getTranslations('common')` 로 locale 표시 확인.

## 1.9 Plan B 준비

`src/lib/i18n.ts` — re-export `useTranslations`. 컴포넌트는 여기서만 import.

## 1.10 Phase 1 완료 조건

- [ ] `/ko`, `/en` 홈 렌더
- [ ] middleware **없음**
- [ ] `pnpm typecheck && pnpm build`

### 커밋

```
feat(i18n): wire next-intl with rootParams for static export
```

---

# Phase 2 — 공통 레이아웃

**목표**: 전 페이지 Header/Footer/GNB/Sitemap/Modal.

## 2.1 NavItem 데이터 (lib/nav.ts)

content JSON 또는 nav config에서 NavItem[] 빌드. **disclosure children 주석**.

```ts
export type NavItem = {
  id: string;
  labelKey: string;
  href?: string;
  children?: { id: string; labelKey: string; href: string }[];
};
```

pr-center children: `news`만. disclosure 항목은 `// { id: 'disclosure', ... }` 주석.

## 2.2 Header (Client wrapper)

- Logo: SmartImage Phase 3 전까지 `<span>LOGO</span>`
- Gnb + LangSwitcher + 햄버거 버튼

## 2.3 Gnb + GnbSubmenu (Client)

- desktop (≥1024): hover → submenu absolute
- keyboard: focusable, Escape close
- **Family sites 없음**

## 2.4 LangSwitcher (Client)

현재 pathname에서 locale segment 교체 → `/ko/path` ↔ `/en/path`

## 2.5 SitemapOverlay (Client)

- fullscreen fixed, z-50
- Accordion 1depth
- body scroll lock when open

## 2.6 Footer (Server + Client wrapper)

- 3-column: logo, links, contact (site.json)
- privacy link → Modal open
- **SmartImage logoFooter** (Phase 3)

## 2.7 Modal (Client)

- focus trap, ESC, overlay click close
- privacy body from common.json

## 2.8 TopButton (Client)

- scrollY > 300 → fade in
- click → scrollTo top

## 2.9 Accordion (Client)

SitemapOverlay용. aria-expanded.

## 2.10 LayoutClient shell

`FooterClient` — privacy modal state.

## 2.11 common.json 보강

nav 전체 tree, footer, privacy.title/body (placeholder lorem).

## 2.12 Phase 2 완료 조건

- [ ] 전 페이지 Header/Footer
- [ ] GNB hover, mobile sitemap
- [ ] LangSwitcher
- [ ] disclosure GNB **주석**
- [ ] `pnpm typecheck && pnpm build`

### 커밋

```
feat(layout): add header, gnb, footer, sitemap overlay, and privacy modal
```

---

# Phase 3 — env + SmartImage

**목표**: images.json 전 슬롯, 플레이스홀더 렌더, check:images.

## 3.1 images.json 전체 작성

§7.3 슬롯 전부. 초기 `src: ""`.

## 3.2 schema.ts (zod)

ImageAsset, SiteConfig, FeaturesConfig validate.

## 3.3 index.ts

```ts
export function getImage(path: string): ImageAsset {
  const found = path.split('.').reduce((acc: unknown, k) => (acc as Record<string, unknown>)?.[k], images);
  if (!found || typeof found !== 'object' || !('size' in found))
    throw new Error(`[env/images] 경로 없음: ${path}`);
  return found as ImageAsset;
}

export function listEmptyImageSlots(): { path: string; asset: ImageAsset }[] {
  // 재귀 순회, src==="" 수집
}
```

## 3.4 SmartImage

```tsx
export function SmartImage({ path, asset, locale, className, priority }: SmartImageProps) {
  const img = asset ?? getImage(path!);
  const [w, h] = img.size.split('x').map(Number);
  const alt = img.alt?.[locale] ?? '';
  if (!img.src) {
    return (
      <div className={`grid place-items-center bg-neutral-200 text-neutral-500 text-xs ${className ?? ''}`}
        style={{ aspectRatio: `${w}/${h}` }} data-image-slot={path}>
        <span className="text-center">IMAGE {img.size}<br/>{img.where}</span>
      </div>
    );
  }
  return (
    <picture className={className}>
      {img.srcMobile && <source media="(max-width:767px)" srcSet={img.srcMobile} />}
      <img src={img.src} alt={alt} width={w} height={h} loading={priority ? 'eager' : 'lazy'} />
    </picture>
  );
}
```

## 3.5 Header/Footer Logo 교체

SmartImage `common.logo`, `common.logoFooter`.

## 3.6 scripts/check-images.ts

`listEmptyImageSlots()` → markdown table → `docs/report/IMAGE-REQUEST.md` (또는 docs/IMAGE-REQUEST.md).

컬럼: 키 경로 | 필요 사이즈 | 비율 | where | 모바일 별도.

## 3.7 root package.json

```json
"check:images": "tsx scripts/check-images.ts"
```

## 3.8 Phase 3 완료 조건

- [ ] 이미지 0장 전 페이지 정상
- [ ] `pnpm check:images` 실행
- [ ] `pnpm typecheck && pnpm build`

### 커밋

```
feat(env): add image mapping, SmartImage placeholders, and check:images script
```

---

# Phase 4 — 서브 페이지 골격

**목표**: 서브 16페이지 IntroHero + LnbBar + SpHead + PageContainer.

## 4.1 IntroHero (Server)

- SmartImage background cover
- prop: `imagePath` e.g. `'company.hero'`

## 4.2 LnbBar (Client)

- 홈 아이콘 → `/{locale}`
- 1depth dropdown (section title)
- 2depth links
- currentPath highlight (**technology 제외**)
- `<768`: horizontal scroll

```tsx
<LnbBar section="technology" currentPath="/technology/tech-1" locale={locale} staticMode />
```

## 4.3 SpHead (Server)

- 영문 tag (small caps)
- title h1
- optional desc

## 4.4 PageContainer

`max-w-[1200px] mx-auto px-4 py-12`

## 4.5 SubPageLayout helper

```tsx
// lib/sub-page.tsx — 조합 헬퍼 (선택)
<IntroHero imagePath={`${section}.hero`} locale={locale} />
<LnbBar section={section} ... staticMode={section==='technology'} />
<PageContainer><SpHead ... />{children}</PageContainer>
```

## 4.6 content JSON skeleton

company, technology, management, prCenter, career — meta, lnb, pages.* placeholder.

## 4.7 16 page.tsx 적용

| 페이지 | section | imagePath | staticMode |
|---|---|---|---|
| company/* (6) | company | company.hero | false |
| technology/* (2) | technology | technology.tech1.hero 등 | **true** |
| management/* (3) | management | management.hero | false |
| pr-center/news | pr-center | prCenter.news.hero | false |
| pr-center/disclosure | pr-center | — | placeholder text only |
| career/* (3) | career | career.hero | false |

## 4.8 disclosure/page.tsx

```tsx
// GNB 미연결. 직접 URL 접근 시 placeholder.
return <main>Coming soon</main>;
```

## 4.9 Phase 4 완료 조건

- [ ] 서브 16페이지 골격
- [ ] technology staticMode
- [ ] disclosure placeholder
- [ ] `pnpm typecheck && pnpm build`

### 커밋

```
feat(pages): add sub-page shell with IntroHero, LnbBar, and SpHead
```

---

# Phase 5 — 도메인 섹션 구현

**목표**: company 6 + technology 2 + management 3 + career 3 = 14페이지 본문.

## 5.0 Phase 5 작업 순서

```
5.1 Company (6p) → 5.2 Technology (2p) → 5.3 Management (3p) → 5.4 Career (3p) → 5.5 content JSON → 5.6 검증
```

페이지 1개 완료마다 `pnpm typecheck` 실행 권장.

---

## 5.1 Company (6페이지)

### 5.1.1 greeting — 인사말

| 항목 | 내용 |
|---|---|
| 파일 | `sections/company/` (inline 또는 greeting-block.tsx) |
| content | `company.pages.greeting.body: string[]` |
| 이미지 | `company.greeting.portrait`, `company.greeting.ceoSign` |

**구현 단계**

1. `company.json` greeting: tag, title, desc, body 3~5문단
2. layout: `lg:grid lg:grid-cols-2 gap-12`
3. 좌측: body map → `<p>`
4. 우측: SmartImage portrait
5. 하단 우측: ceoSign
6. **버튼·CTA 없음**

**체크**: [ ] ko/en 렌더 [ ] MO에서 portrait 상단 배치

### 5.1.2 overview — 회사개요

| content | `pages.overview.tables: { label, value }[][]` |
| 이미지 | `company.overview.diagram` |

1. SpHead 아래 diagram full-width
2. tables → `<table>` 또는 dl grid
3. 반응형: MO 1col stack

### 5.1.3 history — HistoryTimeline

| 컴포넌트 | `sections/company/history-timeline.tsx` |
| content | `pages.history.events: { year, items[] }[]` |

1. 세로 라인 + year badge (left)
2. items bullet list
3. 최신 연도 상단 또는 하단 — 하단→상단 역순

### 5.1.4 organizations — OrgChart

| 컴포넌트 | `sections/company/org-chart.tsx` |
| 이미지 | chart (PC), chartMobile (MO srcMobile) |

1. SmartImage 단일 — picture srcMobile 자동
2. zoom 없음 (정적)

### 5.1.5 certificates — CertGrid

| 컴포넌트 | `sections/company/cert-grid.tsx` |
| content | `pages.certificates.items: { name, issuer }[]` |

1. grid `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
2. 각 item: placeholder 또는 `certificates.items[n]` 이미지
3. name + issuer caption

### 5.1.6 location — LocationTabs

| 컴포넌트 | `sections/company/location-tabs.tsx` |
| content | `pages.location.tabs[5]` |
| site | `maps.hq`, `contact.tel/fax` |

1. Tabs 5개 (본사·1공장·2공장·연구소·해외 — content 정의)
2. tab content: iframe 16:9 + `.location-info-table`
3. table rows: address, tel, fax, directions
4. `<768`: tab 버튼 horizontal scroll

---

## 5.2 Technology (2페이지)

### 5.2.0 공통 규칙

- **CTA·버튼·외부링크 `<a>` 금지**
- LnbBar `staticMode={true}` 유지
- tech-1 / tech-2: 이미지+텍스트 UI만 (CTA 없음)

### 5.2.1 공통 컴포넌트 생성

| 파일 | 역할 |
|---|---|
| `tech-intro-block.tsx` | 상단 intro paragraph |
| `numbered-section.tsx` | "01" circle + h2 + body |
| `tech-image-row.tsx` | 2-col featureA + featureB |

```tsx
// numbered-section.tsx props
interface NumberedSectionProps {
  number: string;
  title: string;
  body: string | string[];
  imagePath?: string;
  locale: 'ko' | 'en';
  layout?: 'full' | 'split' | 'gallery';
}
```

### 5.2.2 tech-1 (soc 레이아웃)

| 섹션 | layout | 이미지 |
|---|---|---|
| intro | text | — |
| 01 개요 | split 2-col | featureA, featureB |
| 02 구성도 | full | diagram |
| 03~N | text or split | process icons (선택) |

1. `technology.json` pages.tech1.sections 3~4개
2. page.tsx: sections.map → NumberedSection
3. split 시 TechImageRow

### 5.2.3 tech-2 (offshore 레이아웃)

| 섹션 | layout | 이미지 |
|---|---|---|
| 01 | full | featureMain |
| 02 | gallery 3-col | gallery[0..2] |

1. gallery grid `md:grid-cols-3 gap-6`
2. CTA 없음 확인

---

## 5.3 Management (3페이지)

### 5.3.1 policy — PolicyDiagram

- SmartImage `management.policy.diagram`
- principles[] → numbered list 또는 card 3개

### 5.3.2 ethics — EthicsBlock

- banner SmartImage
- codes[4]: icon + title + desc grid 2×2

### 5.3.3 esg — EsgBlock

- banner + pillars[3]: image + title + desc + goals[]

---

## 5.4 Career (3페이지)

### 5.4.1 recruitment

| 컴포넌트 | talent-diagram.tsx, process-steps.tsx |
| content | talent.items[], process[5] |
| 이미지 | recruitment.diagram, process[0..4] |

1. talent diagram + items list
2. ProcessSteps horizontal (PC) / vertical (MO)

### 5.4.2 welfare — WelfareGrid

- 8 icons grid 4×2
- item title + desc

### 5.4.3 certificates

- CertGrid reuse (career.certificates.items)
- DownloadButton: `<a download href="/static/downloads/xxx.pdf">`

---

## 5.5 content JSON 본문 채우기

| 파일 | 최소 데이터 |
|---|---|
| company.json | 6 pages 전체 structure |
| technology.json | tech1 4 sections, tech2 2 sections |
| management.json | 3 pages |
| career.json | 3 pages |
| ko/en | 동형 키 — 값만 번역 |

## 5.6 Phase 5 완료 조건

- [ ] 14페이지 섹션 렌더
- [ ] 반응형 PC/MO
- [ ] 하드코딩 문자열 0
- [ ] technology CTA 0
- [ ] `pnpm typecheck && pnpm build`

### 커밋

```
feat(sections): implement company, technology, management, and career pages
```

---

# Phase 6 — 뉴스 게시판

**목표**: JSON 기사, 목록/상세/검색/페이지네이션. DisclosureList 선구현(미연결).

## 6.1 lib/board.ts

```ts
export function loadNewsArticles(locale: Locale): NewsArticleFile[] {
  try {
    const dir = path.join(contentRoot, 'board/news', locale);
    // readdir *.json, parse, sort by date desc, pinned first
  } catch (e) {
    console.error('[loadNewsArticles]', { locale, cause: e });
    return [];
  }
}
```

## 6.2 lib/markdown.ts

`react-markdown` 또는 `marked` + sanitize → HTML component.

## 6.3 BoardRow

- PC: table row (num, category tag, title, date)
- MO: card (tag+title / date)

## 6.4 BoardList + Pagination

- `newsPerPage` from features.json (10)
- page query `?page=2`

## 6.5 BoardSearch (Client)

- `?q=keyword` — title/excerpt filter (client or build-time static pages)

정적 export: 검색은 **client-side filter** on loaded list (articles ≤100).

## 6.6 news/page.tsx

IntroHero + LnbBar + SpHead + BoardSearch + BoardList + Pagination.

## 6.7 news/[slug]/page.tsx

```tsx
export function generateStaticParams({ params }: { params: { locale: string } }) {
  return loadNewsArticles(params.locale).map(a => ({ slug: a.slug }));
}
```

BoardView: title, date, category, markdown body.

## 6.8 더미 기사 12건

ko/en 각 12 JSON (동일 slug, 번역 title/body).

## 6.9 DisclosureList (미연결)

```tsx
// sections/pr/disclosure-list.tsx — 구현만
// prCenter.json disclosure.items 데이터 사용 가능하나 page/route/GNB 미연결
```

GNB pr-center children, sitemapOverlay, lnb — disclosure **주석 유지**.

## 6.10 Phase 6 완료 조건

- [ ] 12건 목록/상세
- [ ] pinned 상단
- [ ] pagination + search
- [ ] DisclosureList 파일 존재, **미연결**
- [ ] `pnpm typecheck && pnpm build`

### 커밋

```
feat(board): add JSON-based news board with pagination and search
```

---

# Phase 7 — 홈·SEO·CI

**목표**: 홈 슬라이더·SEO·배포 파이프라인.

## 7.1 embla-carousel-react 설치

**Phase 7에서만** 허용.

```powershell
pnpm --filter web add embla-carousel-react
```

## 7.2 HeroSlider (Client)

- 3 slides from home.heroSlides
- autoplay 5s, pause on hover
- `prefers-reduced-motion`: autoplay off
- dots + arrows

## 7.3 BizCardSlider (Client)

- techCards 2+, loop, drag

## 7.4 BizFieldScroller (Client)

- horizontal scroll-snap
- bizFields from home.json

## 7.5 HomeNewsList (Server)

- latest 3 from loadNewsArticles
- link to /pr-center/news

## 7.6 LinkCards (Server)

- 3 cards: prCenter, irCenter, location
- SmartImage + Link

## 7.7 home page.tsx 조립

HeroSlider → BizCardSlider → BizFieldScroller → technology section head → HomeNewsList → LinkCards.

## 7.8 SEO — metadata

`[locale]/layout.tsx`:

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: { languages: { ko: '/ko', en: '/en' } },
    openGraph: { ... },
  };
}
```

## 7.9 sitemap.ts

모든 locale × static routes + news slugs. **disclosure 제외**.

## 7.10 robots.ts

Allow all, sitemap URL.

## 7.11 JSON-LD Organization

home or layout — site.json companyName, contact, address.

## 7.12 CI — .github/workflows/deploy.yml

```yaml
on: push branches [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install
      - run: pnpm typecheck
      - run: pnpm build
      - # deploy out/ to Cloudflare Pages
```

## 7.13 sharp WebP preprocess (선택)

scripts/optimize-images.ts — build 전 static/images → webp.

## 7.14 Phase 7 완료 조건

- [ ] 홈 슬라이더·스크롤 동작
- [ ] reduced-motion
- [ ] sitemap.xml, hreflang, JSON-LD
- [ ] disclosure sitemap **제외**
- [ ] Lighthouse SEO ≥ 100
- [ ] `pnpm typecheck && pnpm build`

### 검증

```powershell
pnpm typecheck; pnpm build
npx lighthouse http://localhost:3001/ko/ --only-categories=seo,performance --chrome-flags="--headless"
```

### 커밋

```
feat(home): add hero sliders, SEO metadata, and deploy CI pipeline
```

---

## 전 Phase 공통 검증

매 Phase 종료 시 **반드시**:

```powershell
pnpm typecheck
pnpm build
```

실패 시 해당 Phase 내에서 수정 후 재실행. 다음 Phase 착수 금지.

| Phase | HTML 최소 |
|---|---|
| 0~5 | 34+ (17×2) |
| 6 | 34 + 2×기사수 |
| 7 | 동일 + sitemap/robots |

---

## 부록 A — GNB nav 구조 (disclosure 주석)

```ts
const navItems: NavItem[] = [
  { id: 'company', labelKey: 'nav.company', children: [
    { id: 'greeting', labelKey: 'nav.company.greeting', href: '/company/greeting' },
    // ... 6 items
  ]},
  { id: 'technology', labelKey: 'nav.technology', children: [
    { id: 'tech1', labelKey: 'nav.technology.tech1', href: '/technology/tech-1' },
    { id: 'tech2', labelKey: 'nav.technology.tech2', href: '/technology/tech-2' },
  ]},
  { id: 'management', labelKey: 'nav.management', children: [ /* 3 */ ]},
  { id: 'prCenter', labelKey: 'nav.prCenter', children: [
    { id: 'news', labelKey: 'nav.prCenter.news', href: '/pr-center/news' },
    // { id: 'disclosure', labelKey: 'nav.prCenter.disclosure', href: '/pr-center/disclosure' },
  ]},
  { id: 'career', labelKey: 'nav.career', children: [ /* 3 */ ]},
];
```

---

## 부록 B — 뉴스 기사 추가 절차 (개발자)

1. `news/ko/2026-08-22-slug.json` 생성 (junction)
2. slug, date, category, title, excerpt, body(Markdown) 작성
3. `news/en/2026-08-22-slug.json` 동일 slug 번역
4. `pnpm build` → `/ko/pr-center/news/slug/`, `/en/...` HTML 생성
5. 커밋 & push → CI 배포

---

## 부록 C — Plan B i18n

next-intl 장애 시 `lib/use-t.ts`:

```ts
'use client';
import { useLocale } from '@/lib/locale-context';
import messagesMap from '@repo/content/messages-map';

export function useT(namespace: string) {
  const locale = useLocale();
  const ns = messagesMap[locale][namespace];
  return (key: string) => ns[key] ?? key;
}
```

컴포넌트는 `@/lib/i18n`에서만 import.

---

_문서 버전: 2026-08-22 | Phase 0~7 전체 자립형 구현 가이드_
