# Phase 1 — i18n 배선

> **상위 문서**: [`01_ImplementationRoadmap.md`](./01_ImplementationRoadmap.md) § Phase 1  
> **선행 Phase**: [`02_Phase_0.md`](./02_Phase_0.md) (완료)  
> **상태**: `완료` (2026-08-22)  
> **목표**: next-intl + rootParams, `/ko` `/en` 다국어 렌더

---

## 진행 요약

| 항목 | 값 |
|---|---|
| Phase | 1 |
| 완료 기준 | `/ko`, `/en` 홈 i18n 렌더, middleware 없음, `pnpm typecheck && pnpm build` |
| 커밋 메시지 | `feat(i18n): wire next-intl with rootParams for static export` |

---

## 배포 환경 토대 (Dev Windows → Prd Rocky Linux)

> 서버 미구입 — IP·도메인 확정 전 placeholder 단계. Phase 1과 함께 반영.

| 파일 | 용도 |
|---|---|
| `deploy/README.md` | Dev/Prd 환경 개요 |
| `deploy/rocky-linux/README.md` | Rocky Linux(iwinv) nginx 세팅 절차 |
| `deploy/rocky-linux/nginx.conf.example` | 정적 호스팅 nginx 템플릿 |
| `packages/env/deploy.json` | IP·도메인 placeholder |
| `.env.example` | 환경변수 템플릿 (주석) |

### 체크

- [x] `deploy.json` placeholder 존재
- [x] `.env.example` Dev/Prd 주석 설명 포함
- [x] Rocky Linux nginx 템플릿 존재

---

## 1.1 routing.ts

### 작업

1. [x] `apps/web/src/i18n/routing.ts` 생성
2. [x] locales: `ko`, `en` / defaultLocale: `ko` / localePrefix: `always`

### 파일

```ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
  localePrefix: 'always',
});
```

### 체크

- [x] `routing.locales` export

---

## 1.2 request.ts

### 작업

1. [x] `apps/web/src/i18n/request.ts` 생성
2. [x] `requestLocale` 로 locale 획득 — **Next 16.3.2는 `rootParams` 미제공**
3. [x] `@repo/content` `loadMessages(locale)` 연결

### 파일

```ts
import { getRequestConfig } from 'next-intl/server';
import { loadMessages } from '@repo/content';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const rawLocale = await requestLocale;
  const locale = routing.locales.includes(rawLocale as 'ko' | 'en')
    ? (rawLocale as 'ko' | 'en')
    : routing.defaultLocale;
  return { locale, messages: await loadMessages(locale) };
});
```

### 체크

- [x] invalid locale → defaultLocale fallback

---

## 1.3 navigation.ts

### 작업

1. [x] `apps/web/src/i18n/navigation.ts` — `Link`, `redirect`, `usePathname`, `useRouter`

### 체크

- [x] `@/i18n/navigation` import 가능

---

## 1.4 next.config plugin

### 작업

1. [x] `next-intl` 패키지 추가
2. [x] `createNextIntlPlugin('./src/i18n/request.ts')` 적용

### 체크

- [x] `next.config.ts` plugin 래핑

---

## 1.5 packages/content loadMessages

### 작업

1. [x] ko/en 7 namespace JSON import·merge
2. [x] `Locale` 타입 export
3. [x] `AllMessages` 타입 정의

### namespace 7종

`common`, `home`, `company`, `technology`, `management`, `prCenter`, `career`

### 체크

- [x] `loadMessages('ko')` → 7 namespace 객체

---

## 1.6 common.json (ko/en)

### 작업

1. [x] nav 5섹션 라벨
2. [x] footer, lang, breadcrumb, board 최소 문자열

### 체크

- [x] ko/en 동형 키 구조

---

## 1.7 [locale]/layout.tsx

### 작업

1. [x] `setRequestLocale(locale)`
2. [x] `getMessages()` + `NextIntlClientProvider`
3. [x] invalid locale → `notFound()`

### 체크

- [x] Provider 하위 Client 컴포넌트에서 `useTranslations` 가능 (Phase 2 대비)

---

## 1.8 홈 page.tsx

### 작업

1. [x] `getTranslations('common')` 로 locale·문자열 표시 확인

### 체크

- [x] `/ko/` — 한국어 문자열
- [x] `/en/` — 영어 문자열

---

## 1.9 Plan B 준비

### 작업

1. [x] `src/lib/i18n.ts` — `useTranslations`, `getTranslations` re-export

> 컴포넌트는 `@/lib/i18n`만 import (next-intl 직접 import 금지)

### 체크

- [x] re-export 파일 존재

---

## 1.10 packages/env deploy 연동

### 작업

1. [x] `deploy.json` + `getDeploy()` export
2. [x] `schema.ts` DeployConfig 타입

### 체크

- [x] Prd placeholder 필드 (`publicIp`, `domain` 빈 문자열)

---

## Phase 1 완료 조건

```powershell
npm exec --yes pnpm@9.15.9 typecheck
npm exec --yes pnpm@9.15.9 build
```

### 완료 체크리스트

- [x] `/ko`, `/en` 홈 i18n 렌더
- [x] middleware **없음**
- [x] `pnpm typecheck` 0 error
- [x] `pnpm build` 성공
- [x] 배포 환경 토대 파일 존재

---

## Phase 1 완료 후

1. 본 문서 **상태** → `완료` 변경
2. 사용자 확인 → Phase 2 문서(`04_Phase_2.md`) 생성 여부 결정

---

_문서 버전: 2026-08-22 | Phase 1 실행 가이드_
