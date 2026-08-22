# Phase 0 — 모노레포 스캐폴딩

> **상위 문서**: [`01_ImplementationRoadmap.md`](./01_ImplementationRoadmap.md) § Phase 0  
> **상태**: `완료` (2026-08-22)  
> **목표**: 빈 17 라우트 × 2 locale 정적 빌드 통과

---

## 진행 요약

| 항목 | 값 |
|---|---|
| Phase | 0 |
| 선행 Phase | 없음 |
| 완료 기준 | `pnpm typecheck && pnpm build` 통과, `out/ko/`·`out/en/` 17+ HTML |
| 예상 산출물 | pnpm 모노레포, `@repo/env`, `@repo/content`, `apps/web` 17 라우트 |
| 커밋 메시지 | `chore: scaffold pnpm monorepo with Next.js static export and 17 routes` |

---

## 사전 확인

- [x] Node.js 20+ 설치
- [x] pnpm 9 설치 (`npm exec pnpm@9.15.9` 사용 — corepack EPERM 우회)
- [x] PowerShell에서 프로젝트 루트 `c:\Project\LuaWeb` 접근 가능
- [x] `middleware.ts` / `proxy.ts` 생성 **금지** (정적 export 충돌) — 미생성 확인

---

## 0.1 Workspace 루트

### 작업

1. [x] `pnpm-workspace.yaml` 생성
2. [x] root `package.json` — scripts: `dev`, `build`, `typecheck`, `lint`
3. [x] `turbo.json` — pipeline: build, typecheck, lint, dev
4. [x] `tsconfig.base.json` — strict, paths `@repo/*`
5. [x] `.gitignore` 보강 (node_modules, .next, out, turbo cache)

### 파일: `pnpm-workspace.yaml`

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### 파일: `package.json` (루트)

```json
{
  "name": "woori-tech-site",
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

### 파일: `turbo.json`

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "out/**"]
    },
    "typecheck": {
      "dependsOn": ["^typecheck"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### 파일: `tsconfig.base.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@repo/env": ["./packages/env/index.ts"],
      "@repo/content": ["./packages/content/index.ts"]
    }
  },
  "exclude": ["node_modules"]
}
```

### 체크

- [x] `pnpm install` 성공

---

## 0.2 packages/env

### 작업

1. [x] `package.json` — `"name": "@repo/env"`
2. [x] `site.json` — placeholder 회사명·연락처
3. [x] `images.json` — `{}` (Phase 3에서 전체 슬롯 작성)
4. [x] `features.json` — 기본값
5. [x] `schema.ts` — zod stub (Phase 3 확장)
6. [x] `index.ts` — `getSite()`, `getFeatures()` export

### 파일 트리

```
packages/env/
├─ package.json
├─ site.json
├─ images.json
├─ features.json
├─ schema.ts
└─ index.ts
```

### 파일: `packages/env/package.json`

```json
{
  "name": "@repo/env",
  "version": "0.0.0",
  "private": true,
  "main": "./index.ts",
  "types": "./index.ts",
  "scripts": {
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5"
  }
}
```

### 파일: `packages/env/site.json`

```json
{
  "companyName": { "ko": "우리테크", "en": "Woori Tech" },
  "domain": "https://example.com",
  "contact": { "tel": "02-0000-0000", "fax": "02-0000-0001", "email": "contact@example.com" },
  "addresses": {
    "hq": { "ko": "서울특별시 placeholder", "en": "Seoul placeholder", "zip": "00000" }
  },
  "maps": { "hq": "https://maps.google.com/maps?q=placeholder&output=embed" },
  "copyright": { "ko": "© Woori Tech. All rights reserved.", "en": "© Woori Tech. All rights reserved." }
}
```

### 파일: `packages/env/features.json`

```json
{
  "showHitCount": false,
  "showDisclosureNav": false,
  "enableNewsSearch": true,
  "newsPerPage": 10,
  "placeholderMode": true
}
```

### 파일: `packages/env/images.json`

```json
{}
```

### 파일: `packages/env/schema.ts`

```ts
/**
 * env.schema (환경 JSON 스키마 stub)
 * ==================================
 * Phase 0: 타입 정의만. Phase 3에서 zod 검증 확장.
 *
 * [Main Functions]
 * - (Phase 3) validateSite, validateFeatures, validateImages
 *
 * [Dependencies]
 * - (Phase 3) zod
 */

export type SiteConfig = {
  companyName: { ko: string; en: string };
  domain: string;
  contact: { tel: string; fax: string; email: string };
  addresses: { hq: { ko: string; en: string; zip: string } };
  maps: { hq: string; factory?: string };
  copyright: { ko: string; en: string };
};
```

### 파일: `packages/env/index.ts`

```ts
/**
 * env.index (환경 설정 로더)
 * ==========================
 * site.json, features.json, images.json 빌드 타임 로드
 *
 * [Main Functions]
 * - getSite
 * - getFeatures
 *
 * [Dependencies]
 * - ./site.json, ./features.json, ./images.json
 */

import site from './site.json';
import features from './features.json';
import type { SiteConfig } from './schema';

// 1. getSite
export function getSite(): SiteConfig {
  return site as SiteConfig;
}

// 2. getFeatures
export function getFeatures() {
  return features;
}
```

### 체크

- [x] `@repo/env` workspace resolve

---

## 0.3 packages/content

### 작업

1. [x] `package.json` — `"name": "@repo/content"`
2. [x] `ko/`, `en/` — 7개 JSON `{}` placeholder
3. [x] `board/news/ko/`, `board/news/en/` — 빈 디렉터리 (Phase 6)
4. [x] `index.ts` — `loadMessages` stub return `{}`

### locale JSON 7종 (ko/en 각각)

| 파일 | Phase 0 내용 |
|---|---|
| `common.json` | `{}` |
| `home.json` | `{}` |
| `company.json` | `{}` |
| `technology.json` | `{}` |
| `management.json` | `{}` |
| `prCenter.json` | `{}` |
| `career.json` | `{}` |

### 파일: `packages/content/package.json`

```json
{
  "name": "@repo/content",
  "version": "0.0.0",
  "private": true,
  "main": "./index.ts",
  "types": "./index.ts",
  "scripts": {
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5"
  }
}
```

### 파일: `packages/content/index.ts`

```ts
/**
 * content.index (콘텐츠 로더)
 * =========================
 * locale별 JSON 메시지 로드. Phase 1에서 본 구현.
 *
 * [Main Functions]
 * - loadMessages
 *
 * [Dependencies]
 * - packages/content/{ko,en}/*.json
 */

// 1. loadMessages
export async function loadMessages(_locale: 'ko' | 'en'): Promise<Record<string, unknown>> {
  return {};
}
```

### 체크

- [x] ko/en 7파일 존재
- [x] `board/news/ko/`, `board/news/en/` 디렉터리 존재

---

## 0.4 apps/web — Next.js 초기화

### 작업

1. [x] Next.js 16 App Router + TypeScript + Tailwind v4 + ESLint 수동 구성
2. [x] `next.config.ts` — `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`
3. [x] `package.json` dependencies: `next`, `react`, `react-dom`, `@repo/env`, `@repo/content`
4. [x] `tsconfig.json` — extends base, paths `@/*`
5. [x] `postcss.config.mjs` — `@tailwindcss/postcss`
6. [x] `eslint.config.mjs` — Next ESLint
7. [x] `src/styles/globals.css` — `@theme` 토큰 (§6.4)

### 파일: `apps/web/next.config.ts`

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
```

### 파일: `apps/web/package.json`

```json
{
  "name": "web",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3000",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit",
    "lint": "next lint"
  },
  "dependencies": {
    "@repo/content": "workspace:*",
    "@repo/env": "workspace:*",
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "^16.0.0",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### 파일: `apps/web/tsconfig.json`

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"],
      "@repo/env": ["../../packages/env/index.ts"],
      "@repo/content": ["../../packages/content/index.ts"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 파일: `apps/web/postcss.config.mjs`

```js
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
```

### 파일: `apps/web/src/styles/globals.css`

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

### 파일: `apps/web/src/app/layout.tsx`

```tsx
import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Woori Tech',
  description: 'Woori Tech corporate website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

### 체크

- [x] `apps/web` devDependencies 설치 완료
- [x] `middleware.ts` **없음** 확인

---

## 0.5 17 라우트 placeholder

### 작업

1. [x] `app/page.tsx` — `/` → `/ko/` redirect
2. [x] `[locale]/layout.tsx` — `generateStaticParams` (ko, en)
3. [x] `[locale]/page.tsx` — 홈 placeholder
4. [x] 서브 15 라우트 placeholder page.tsx 생성

### redirect: `apps/web/src/app/page.tsx`

```tsx
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/ko/');
}
```

> static export: `redirect()` + meta refresh fallback. Phase 0에서는 redirect만.

### layout: `apps/web/src/app/[locale]/layout.tsx`

```tsx
type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ locale: 'ko' }, { locale: 'en' }];
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  return (
    <div data-locale={locale}>
      {children}
    </div>
  );
}
```

### placeholder page 패턴

```tsx
export default function PageNamePage() {
  return <main className="p-8">PageName placeholder</main>;
}
```

### 라우트 목록 (17)

| # | 경로 | page.tsx placeholder 텍스트 |
|---|---|---|
| 1 | `[locale]/page.tsx` | Home placeholder |
| 2 | `company/greeting` | Greeting placeholder |
| 3 | `company/overview` | Overview placeholder |
| 4 | `company/history` | History placeholder |
| 5 | `company/organizations` | Organizations placeholder |
| 6 | `company/certificates` | Certificates placeholder |
| 7 | `company/location` | Location placeholder |
| 8 | `technology/tech-1` | Tech1 placeholder |
| 9 | `technology/tech-2` | Tech2 placeholder |
| 10 | `management/policy` | Policy placeholder |
| 11 | `management/ethics` | Ethics placeholder |
| 12 | `management/esg` | Esg placeholder |
| 13 | `pr-center/news` | News placeholder |
| 14 | `pr-center/news/[slug]` | NewsDetail placeholder |
| 15 | `pr-center/disclosure` | Disclosure placeholder |
| 16 | `career/recruitment` | Recruitment placeholder |
| 17 | `career/welfare` | Welfare placeholder |
| 18 | `career/certificates` | CareerCertificates placeholder |

> `[slug]/page.tsx`는 `generateStaticParams` stub:

```tsx
export function generateStaticParams() {
  return [{ slug: 'sample' }];
}

export default function NewsDetailPage() {
  return <main className="p-8">NewsDetail placeholder</main>;
}
```

### 체크

- [x] 17 라우트 page.tsx 전부 생성 (slug 포함)
- [x] `[locale]/layout.tsx` generateStaticParams 동작

---

## 0.6 apps/api 슬롯

### 작업

1. [x] `apps/api/README.md` 생성

### 파일: `apps/api/README.md`

```markdown
# API Slot (Unused)

현 시점 미사용. 문의폼·조회수 필요 시 여기서 시작.
```

### 체크

- [x] README 존재

---

## 0.7 public/static 디렉터리

### 작업

1. [x] `apps/web/public/static/images/` 하위 7 도메인 폴더 생성
2. [x] `apps/web/public/static/downloads/` 생성
3. [x] `.gitkeep` 배치 (빈 폴더 git 추적)

### 디렉터리

```
apps/web/public/static/
├─ images/
│   ├─ common/.gitkeep
│   ├─ home/.gitkeep
│   ├─ company/.gitkeep
│   ├─ technology/.gitkeep
│   ├─ management/.gitkeep
│   ├─ pr-center/.gitkeep
│   └─ career/.gitkeep
└─ downloads/.gitkeep
```

### 체크

- [x] 8개 디렉터리 존재

---

## 0.8 Junction (Windows)

### 작업

PowerShell — **관리자 권한 불필요** (Junction):

```powershell
cmd /c mklink /J env packages\env
cmd /c mklink /J static apps\web\public\static
cmd /c mklink /J news packages\content\board\news
```

### 체크

- [x] `env/` → `packages/env` junction
- [x] `static/` → `apps/web/public/static` junction
- [x] `news/` → `packages/content/board/news` junction

> 이미 존재 시 스킵. 실패 시 관리자 PowerShell 재시도.

---

## 0.9 Phase 0 완료 조건

### 빌드 검증

```powershell
pnpm install
pnpm typecheck
pnpm build
(Get-ChildItem -Recurse apps/web/out -Filter "index.html").Count
```

### 완료 체크리스트

- [x] `pnpm typecheck` 0 error
- [x] `pnpm build` 성공
- [x] `out/ko/`, `out/en/` 17+ 페이지 HTML (index.html **39**건)
- [x] `middleware.ts` / `proxy.ts` **없음**
- [x] junction 3개 생성

### 커밋

```
chore: scaffold pnpm monorepo with Next.js static export and 17 routes
```

---

## 구현 순서 (권장)

```
0.1 루트 workspace
  → 0.2 packages/env
  → 0.3 packages/content
  → 0.4 apps/web
  → 0.5 17 라우트
  → 0.6 apps/api
  → 0.7 public/static
  → 0.8 junction
  → 0.9 검증
```

각 서브섹션 완료 시 본 문서 체크박스 `[ ]` → `[x]` 업데이트.

---

## Phase 0 완료 후

1. 본 문서 **상태** → `완료` 변경
2. `01_ImplementationRoadmap.md` Phase 0 체크리스트 동기화 (선택)
3. 사용자 확인 → Phase 1 문서(`03_Phase_1.md`) 생성 여부 결정

---

_문서 버전: 2026-08-22 | Phase 0 실행 가이드_
