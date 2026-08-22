# 01-ARCHITECTURE — 시스템 아키텍처

## 1. 디렉터리 트리 (파일 단위)

```
woori-tech-site/
├─ pnpm-workspace.yaml
├─ package.json
├─ turbo.json
├─ tsconfig.base.json
│
├─ apps/
│   ├─ web/
│   │   ├─ package.json
│   │   ├─ next.config.ts
│   │   ├─ tsconfig.json
│   │   ├─ postcss.config.mjs
│   │   ├─ eslint.config.mjs
│   │   ├─ src/
│   │   │   ├─ app/
│   │   │   │   ├─ layout.tsx
│   │   │   │   ├─ page.tsx                          # / → /ko
│   │   │   │   ├─ sitemap.ts
│   │   │   │   ├─ robots.ts
│   │   │   │   └─ [locale]/
│   │   │   │       ├─ layout.tsx
│   │   │   │       ├─ page.tsx                      # 홈
│   │   │   │       ├─ company/
│   │   │   │       │   ├─ greeting/page.tsx
│   │   │   │       │   ├─ overview/page.tsx
│   │   │   │       │   ├─ history/page.tsx
│   │   │   │       │   ├─ organizations/page.tsx
│   │   │   │       │   ├─ certificates/page.tsx
│   │   │   │       │   └─ location/page.tsx
│   │   │   │       ├─ technology/
│   │   │   │       │   ├─ tech-1/page.tsx
│   │   │   │       │   └─ tech-2/page.tsx
│   │   │   │       ├─ management/
│   │   │   │       │   ├─ policy/page.tsx
│   │   │   │       │   ├─ ethics/page.tsx
│   │   │   │       │   └─ esg/page.tsx
│   │   │   │       ├─ pr-center/
│   │   │   │       │   ├─ news/
│   │   │   │       │   │   ├─ page.tsx
│   │   │   │       │   │   └─ [slug]/page.tsx
│   │   │   │       │   └─ disclosure/page.tsx       # 골격만, GNB 미연결
│   │   │   │       └─ career/
│   │   │   │           ├─ recruitment/page.tsx
│   │   │   │           ├─ welfare/page.tsx
│   │   │   │           └─ certificates/page.tsx
│   │   │   ├─ components/
│   │   │   │   ├─ layout/
│   │   │   │   │   ├─ header.tsx
│   │   │   │   │   ├─ gnb.tsx
│   │   │   │   │   ├─ gnb-submenu.tsx
│   │   │   │   │   ├─ lang-switcher.tsx
│   │   │   │   │   ├─ sitemap-overlay.tsx
│   │   │   │   │   ├─ footer.tsx
│   │   │   │   │   └─ top-button.tsx
│   │   │   │   ├─ ui/
│   │   │   │   │   ├─ smart-image.tsx
│   │   │   │   │   ├─ modal.tsx
│   │   │   │   │   ├─ tabs.tsx
│   │   │   │   │   ├─ pagination.tsx
│   │   │   │   │   ├─ accordion.tsx
│   │   │   │   │   └─ section-head.tsx
│   │   │   │   └─ sections/
│   │   │   │       ├─ common/
│   │   │   │       │   ├─ intro-hero.tsx
│   │   │   │       │   ├─ lnb-bar.tsx
│   │   │   │       │   ├─ sp-head.tsx
│   │   │   │       │   └─ page-container.tsx
│   │   │   │       ├─ home/
│   │   │   │       │   ├─ hero-slider.tsx
│   │   │   │       │   ├─ biz-card-slider.tsx
│   │   │   │       │   ├─ biz-field-scroller.tsx
│   │   │   │       │   ├─ home-news-list.tsx
│   │   │   │       │   └─ link-cards.tsx
│   │   │   │       ├─ company/
│   │   │   │       │   ├─ history-timeline.tsx
│   │   │   │       │   ├─ org-chart.tsx
│   │   │   │       │   ├─ location-tabs.tsx
│   │   │   │       │   └─ cert-grid.tsx
│   │   │   │       ├─ technology/
│   │   │   │       │   ├─ tech-intro-block.tsx
│   │   │   │       │   ├─ numbered-section.tsx
│   │   │   │       │   └─ tech-image-row.tsx
│   │   │   │       ├─ management/
│   │   │   │       │   ├─ policy-diagram.tsx
│   │   │   │       │   ├─ ethics-block.tsx
│   │   │   │       │   └─ esg-block.tsx
│   │   │   │       ├─ pr/
│   │   │   │       │   ├─ board-list.tsx
│   │   │   │       │   ├─ board-row.tsx
│   │   │   │       │   ├─ board-view.tsx
│   │   │   │       │   ├─ board-search.tsx
│   │   │   │       │   └─ disclosure-list.tsx    # 선구현, 미연결
│   │   │   │       └─ career/
│   │   │   │           ├─ talent-diagram.tsx
│   │   │   │           ├─ process-steps.tsx
│   │   │   │           ├─ welfare-grid.tsx
│   │   │   │           └─ download-button.tsx
│   │   │   ├─ i18n/
│   │   │   │   ├─ routing.ts
│   │   │   │   ├─ request.ts
│   │   │   │   └─ navigation.ts
│   │   │   ├─ lib/
│   │   │   │   ├─ env.ts
│   │   │   │   ├─ content.ts
│   │   │   │   ├─ board.ts
│   │   │   │   ├─ markdown.ts
│   │   │   │   └─ cn.ts
│   │   │   └─ styles/
│   │   │       └─ globals.css
│   │   └─ public/
│   │       └─ static/
│   │           ├─ images/
│   │           │   ├─ common/
│   │           │   ├─ home/
│   │           │   ├─ company/
│   │           │   ├─ technology/
│   │           │   ├─ management/
│   │           │   ├─ pr-center/
│   │           │   └─ career/
│   │           └─ downloads/
│   │
│   └─ api/
│       └─ README.md
│
├─ packages/
│   ├─ env/
│   │   ├─ package.json
│   │   ├─ site.json
│   │   ├─ images.json
│   │   ├─ features.json
│   │   ├─ schema.ts
│   │   └─ index.ts
│   │
│   └─ content/
│       ├─ package.json
│       ├─ ko/
│       │   ├─ common.json
│       │   ├─ home.json
│       │   ├─ company.json
│       │   ├─ technology.json
│       │   ├─ management.json
│       │   ├─ prCenter.json
│       │   └─ career.json
│       ├─ en/
│       │   └─ (ko와 동형)
│       ├─ board/
│       │   └─ news/
│       │       ├─ ko/
│       │       │   └─ 2026-08-20-sample.json
│       │       └─ en/
│       │           └─ 2026-08-20-sample.json
│       └─ index.ts
│
├─ scripts/
│   └─ check-images.ts
│
├─ env/                    # junction → packages/env
├─ static/                 # junction → apps/web/public/static
├─ news/                   # junction → packages/content/board/news
│
└─ docs/
    ├─ 00-PRD.md
    ├─ 01-ARCHITECTURE.md
    ├─ 02-COMPONENT-SPEC.md
    ├─ 03-CONTENT-SCHEMA.md
    ├─ 04-PHASE-PLAN.md
    ├─ 05-CONVENTIONS.md
    └─ IMAGE-REQUEST.md    # check:images 산출물
```

## 2. 패키지 의존성

```
apps/web
  → @repo/env
  → @repo/content

packages/env      (독립, JSON + zod)
packages/content  (독립, JSON + fs)

apps/api          (Phase 0: README only)
```

## 3. import 방향 규칙

```
app (page.tsx)
  ↓
sections/*
  ↓
layout/* , ui/*
  ↓
lib/*
  ↓
@repo/content , @repo/env
```

| 규칙 | 내용 |
|---|---|
| R-01 | `packages/*` → `apps/*` import **금지** |
| R-02 | `ui/*` → `sections/*` import **금지** |
| R-03 | `lib/*` → `components/*` import **금지** |
| R-04 | domain 간 `sections/company` → `sections/career` **금지** |
| R-05 | 공통은 `sections/common`, `ui/*`에 배치 |

## 4. 데이터 흐름

```
┌─────────────────────────────────────────────────────────┐
│  packages/content/{ko,en}/*.json                          │
│  packages/content/board/news/{locale}/*.json              │
│  packages/env/{site,images,features}.json               │
└────────────────────┬────────────────────────────────────┘
                     │ build time (Node fs / import)
                     ▼
┌─────────────────────────────────────────────────────────┐
│  @repo/content: loadMessages(), loadNewsArticles()      │
│  @repo/env: getSite(), getImage(), getFeatures()        │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  Server Components (page.tsx, sections/*)               │
│  generateStaticParams() → 모든 locale × slug 사전 생성   │
└────────────────────┬────────────────────────────────────┘
                     │ next build (output: 'export')
                     ▼
┌─────────────────────────────────────────────────────────┐
│  out/ko/.../index.html                                  │
│  out/en/.../index.html                                  │
│  + static assets (CSS/JS/images)                        │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
              Cloudflare Pages / S3+CloudFront
```

## 5. i18n 아키텍처

```
Request
  → [locale] segment (URL)
  → requestLocale in request.ts (Next 16.3+: rootParams 미사용)
  → loadMessages(locale)
  → NextIntlClientProvider (layout)
  → useTranslations() / getTranslations()
```

- **proxy/middleware 사용 안 함** — `output: 'export'` 호환
- Plan B: next-intl 장애 시 `useT()` 추상화 → `@repo/content` 직접 import (15줄 dict 로더)

## 6. next.config.ts 핵심

```ts
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};
```

## 7. 빌드 / 배포 파이프라인

```
Developer
  │ git push
  ▼
CI (GitHub Actions)
  ├─ pnpm install
  ├─ pnpm typecheck
  ├─ pnpm check:images      # optional warn
  ├─ pnpm build             # turbo → apps/web
  └─ deploy out/ → CDN
```

| 환경 | 트리거 | URL |
|---|---|---|
| local | `pnpm dev` | localhost:3000 |
| preview | PR push | Cloudflare preview |
| production | main push | production domain |

## 8. 이미지 처리

| 단계 | 도구 | 설명 |
|---|---|---|
| 원본 | 디자인팀 PNG/JPG | `public/static/images/` |
| 빌드 전 (선택) | sharp script | WebP 변환 |
| 런타임 | `<picture>` + SmartImage | PC/MO 스왑 |
| 미입력 | SmartImage placeholder | `src: ""` → 회색 박스 + size 표기 |

## 9. 뉴스 기사 아키텍처 (JSON + Markdown)

MDX 대신 **JSON 파일 1건 = 기사 1건**. 개발자가 파일 복사·필드 채우기만 하면 됨.

```
packages/content/board/news/ko/2026-08-20-title-slug.json
```

- `body.ko` / `body.en`: Markdown 문자열 → 빌드 시 `marked` 또는 `react-markdown` 렌더
- frontmatter 불필요 — JSON 스키마가 frontmatter 역할
- `generateStaticParams` — `board/news/{locale}/*.json` glob

루트 `news/` junction → 개발자가 탐색기에서 바로 접근.

## 10. 공시정보 (Disclosure) 처리

| 항목 | 상태 |
|---|---|
| `DisclosureList` 컴포넌트 | Phase 6에 선구현 |
| GNB pr-center 서브메뉴 | `{ href: '/pr-center/disclosure', ... }` **주석** |
| `disclosure/page.tsx` | 골격 파일 존재, redirect 또는 placeholder |
| sitemap.xml | disclosure URL **제외** |

## 확인 필요

_(없음)_
