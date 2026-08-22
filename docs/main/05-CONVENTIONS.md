# 05-CONVENTIONS — 코딩 컨벤션

## 1. 네이밍

| 대상 | 규칙 | 예 |
|---|---|---|
| 파일 (컴포넌트) | kebab-case | `intro-hero.tsx` |
| 파일 (유틸) | kebab-case | `board.ts` |
| React 컴포넌트 | PascalCase | `IntroHero` |
| 함수/변수 | camelCase | `loadNewsArticles` |
| 상수 | UPPER_SNAKE | `NEWS_PER_PAGE` |
| CSS 변수 | kebab-case | `--color-primary` |
| content JSON 키 | camelCase | `prCenter` |
| images.json 키 | camelCase | `techCards` |
| 라우트 폴더 | kebab-case | `tech-1`, `pr-center` |

## 2. Server / Client Component

### 기본: Server Component

- `page.tsx` — always Server
- `sections/*` — Server unless interactivity required
- `layout/*` — mixed (see below)

### `'use client'` 허용 목록 (이외 금지)

| 컴포넌트 | 사유 |
|---|---|
| `gnb.tsx`, `gnb-submenu.tsx` | hover state |
| `lang-switcher.tsx` | client navigation |
| `sitemap-overlay.tsx` | open/close state |
| `top-button.tsx` | scroll listener |
| `modal.tsx` | focus trap, ESC |
| `tabs.tsx` | tab state |
| `accordion.tsx` | expand/collapse |
| `board-search.tsx` | input state |
| `lnb-bar.tsx` | dropdown state |
| `location-tabs.tsx` | tab state |
| `hero-slider.tsx` | Embla |
| `biz-card-slider.tsx` | Embla |
| `biz-field-scroller.tsx` | drag scroll (optional) |
| `footer.tsx` wrapper | Modal trigger (or split `FooterClient`) |

### Client → Server 데이터

- Client 컴포넌트에 **content JSON 전체 pass 금지**
- 필요한 primitive/string만 props
- children slot으로 Server content 주입

## 3. Import 순서

```ts
// 1. react / next
// 2. third-party
// 3. @repo/*
// 4. @/lib
// 5. @/components
// 6. types
// 7. styles
```

## 4. Tailwind v4 규칙

| 규칙 | 내용 |
|---|---|
| 설정 | `globals.css` `@theme` only — `tailwind.config.js` **없음** |
| 색상 | `@theme` token: `--color-primary`, `--color-neutral-*` |
| spacing | 4px grid: `--spacing-*` |
| breakpoint | `--breakpoint-sm: 375px` … `@media (width >= var(--breakpoint-lg))` |
| 임의값 | 불가피할 때만 `[value]` — 사전 `@theme` 등록 우선 |
| cn() | `clsx` + `tailwind-merge` via `@/lib/cn` |

### @theme 필수 토큰 (Phase 0)

```css
@theme {
  --color-primary: #...;
  --color-secondary: #...;
  --font-sans: "Pretendard", ...;
  --breakpoint-sm: 375px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1440px;
}
```

## 5. 하드코딩 금지

| 유형 | 위치 |
|---|---|
| UI 문자열 | `packages/content/{locale}/*.json` |
| 이미지 경로 | `packages/env/images.json` |
| 회사정보 | `packages/env/site.json` |
| 기능 토글 | `packages/env/features.json` |
| 뉴스 | `packages/content/board/news/{locale}/*.json` |

## 6. TypeScript

- `strict: true`
- `any` 금지 — `unknown` + narrowing
- props interface export
- `@repo/*` workspace protocol

## 7. 에러 처리

```ts
// lib/board.ts
export function loadNewsArticles(locale: Locale): NewsArticleFile[] {
  try {
    // fs read
  } catch (error) {
    console.error('[loadNewsArticles]', { locale, cause: error });
    return [];
  }
}
```

- external I/O → try/catch
- guard clause 선행
- 에러 로그: `[functionName]` + context

## 8. 파일 헤더 (Code File Description)

모든 `.ts`/`.tsx` 상단:

```ts
/**
 * ModuleName (한국어 요약)
 * ========================
 * 1-2줄 목적
 *
 * [Main Functions]
 * - fn1
 *
 * [Dependencies]
 * - dep1
 */
```

## 9. Git 커밋

| 타입 | 용도 |
|---|---|
| `feat` | 기능 |
| `fix` | 버그 |
| `docs` | 문서 |
| `chore` | 설정/스캐폴딩 |
| `refactor` | 리팩터 (동작 동일) |

- 영어, imperative: `feat(board): add news pagination`
- Phase 단위 1 commit 권장

## 10. 금지 목록

| 금지 | 사유 |
|---|---|
| `middleware.ts` / `proxy.ts` | static export |
| API Route (`app/api/*`) | 백엔드 없음 |
| DB / ORM | 없음 |
| `next/image` optimization | export 비호환 |
| 임의 npm install | Phase plan 승인 필요 |
| disclosure GNB 링크 활성화 | 사용자 요청 전까지 |
| technology 페이지 CTA | PRD FR-14 |

## 11. Plan B — i18n

next-intl 실패 시:

```ts
// lib/use-t.ts — 15줄 추상화
export function useT(namespace: string) {
  const locale = useLocale();
  const messages = messagesMap[locale][namespace];
  return (key: string) => messages[key];
}
```

컴포넌트는 `useTranslations` 직접 import **금지** → `@/lib/i18n` re-export only (전환 용이).

## 12. 테스트 / 검증 (수동)

| 명령 | 시점 |
|---|---|
| `pnpm typecheck` | every Phase |
| `pnpm build` | every Phase |
| `pnpm check:images` | Phase 3+ |
| Lighthouse | Phase 7 |

## 확인 필요

_(없음)_
