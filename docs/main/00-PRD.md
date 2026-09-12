# 00-PRD — 제품 요구사항 정의서

## 1. 개요

| 항목 | 내용 |
|---|---|
| 프로젝트명 | 루아(Lua) 기업 홍보 웹사이트 |
| 목적 | 기술·회사 정보를 SEO 친화적으로 정적 제공 |
| 타깃 | 잠재 고객, 투자자, 협력사 |
| 운영 도메인 | [luacorp.co.kr](https://www.luacorp.co.kr) |

## 2. 성공 지표 (KPI)

| 지표 | 목표 | 측정 |
|---|---|---|
| LCP | < 2.0s (4G, 모바일) | Lighthouse CI |
| Lighthouse Performance | ≥ 95 | Lighthouse CI |
| Lighthouse SEO | 100 | Lighthouse CI |
| Lighthouse Accessibility | ≥ 95 | Lighthouse CI |
| 콘텐츠 수정 → 배포 | 10분 이내 | Git push → CI 빌드 완료 |
| 정적 HTML 생성 | locale 2 × 라우트 17 + 뉴스 N | `out/` 산출물 |

## 3. 기능 요구사항

| ID | 기능 | 우선순위 | 수용기준 (AC) |
|---|---|---|---|
| FR-01 | 다국어 (ko/en) | MUST | `/ko`, `/en` prefix. 언어 스위처로 전환. hreflang 메타 |
| FR-02 | GNB + hover 서브메뉴 | MUST | 5개 1depth, hover 시 2depth 표시. 모바일: 사이트맵 오버레이 |
| FR-03 | 전체 17 라우트 정적 렌더 | MUST | 사이트맵 표 전 페이지 HTML 생성 |
| FR-04 | IntroHero + LNB Bar + SpHead | MUST | 서브 16페이지 공통 골격. LNB 1·2depth 드롭다운 |
| FR-05 | 반응형 PC/MO 이미지 스왑 | MUST | `SmartImage` — `src`/`srcMobile` 또는 플레이스홀더 |
| FR-06 | 찾아오시는 길 탭 5개 + 지도 | MUST | 탭 전환, iframe 지도, 정보 테이블 |
| FR-07 | 뉴스&공지 게시판 | MUST | 목록·상세·페이지네이션·검색. JSON 기사 파일 |
| FR-08 | 홈 히어로/카드 슬라이더 | MUST | Embla Carousel. 자동재생·터치 스와이프 |
| FR-09 | 홈 사업분야 스크롤 섹션 | MUST | 가로 스크롤 또는 스냅 |
| FR-10 | 개인정보처리방침 모달 | MUST | 푸터 링크 클릭 시 모달 |
| FR-11 | Top 버튼 | SHOULD | 스크롤 300px 이상 시 표시 |
| FR-12 | SEO (sitemap, JSON-LD) | MUST | `sitemap.xml`, Organization 스키마 |
| FR-13 | 공시정보 컴포넌트 | SHOULD | 컴포넌트만 구현. GNB·페이지 연결 없음 (주석 처리) |
| FR-14 | 기술소개 페이지 | MUST | CTA·버튼 없음. 이미지+텍스트 UI만 |
| FR-15 | 이미지 슬롯 리포트 | SHOULD | `pnpm check:images` → `docs/IMAGE-REQUEST.md` |

## 4. 비기능 요구사항

### 4.1 반응형 브레이크포인트

| 토큰 | px | 용도 |
|---|---|---|
| `--bp-xl` | 1440 | 데스크톱 wide |
| `--bp-lg` | 1024 | 데스크톱 / 태블릿 landscape |
| `--bp-md` | 768 | 태블릿 portrait |
| `--bp-sm` | 375 | 모바일 |

### 4.2 접근성

- WCAG 2.1 AA 준수
- 키보드 GNB·모달·탭 탐색
- `alt` 텍스트 — `images.json` `alt.{ko,en}`
- 포커스 visible ring
- `prefers-reduced-motion` — 슬라이더 autoplay 비활성

### 4.3 브라우저 지원

| 브라우저 | 최소 버전 |
|---|---|
| Chrome | 111+ |
| Firefox | 111+ |
| Safari | 16.4+ |
| Edge | 111+ |
| Samsung Internet | 22+ |

### 4.4 기술 제약

| 항목 | 값 |
|---|---|
| 프레임워크 | Next.js 16.3 App Router + TypeScript |
| 렌더링 | `output: 'export'` 완전 정적 |
| 스타일 | Tailwind CSS v4 (CSS-first `@theme`) |
| i18n | next-intl v4 + `[locale]` + `requestLocale` (static export, middleware 없음) |
| proxy/middleware | **금지** (정적 export 충돌) |
| `next/image` | `unoptimized: true` |
| 패키지 매니저 | pnpm workspace |

## 5. 사이트맵 (17 라우트)

```
/                          → /ko 리다이렉트 (정적)
/[locale]                  홈
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
/[locale]/pr-center/disclosure   ← 라우트 파일 존재, GNB 미연결
/[locale]/career/recruitment
/[locale]/career/welfare
/[locale]/career/certificates
```

## 6. 스코프 아웃 (명시적 제외)

| 제외 항목 | 사유 |
|---|---|
| 회원·로그인·회원가입 | 요구 없음 |
| 문의폼 전송 (서버) | 백엔드 없음. `apps/api` 슬롯만 예약 |
| 게시판 조회수 (hit) | 서버 필요 |
| 홍보영상 페이지 | 스코프 축소 |
| 품질·안전방침 페이지 | 경영방침 3개만 |
| 관리자 CMS | Git + JSON이 CMS |
| Family sites 드롭다운 | 요구 없음 |
| 공시정보 GNB·탭 연결 | Phase 5+ 주석. 컴포넌트만 선구현 |
| DART/PDF 실제 연동 | 추후 고도화 |

## 7. 콘텐츠 운영

| 유형 | 위치 | 담당 | 형식 |
|---|---|---|---|
| UI 문자열 | `packages/content/{ko,en}/*.json` | 개발자 | JSON |
| 뉴스 기사 | `packages/content/board/news/{locale}/*.json` | 개발자 | JSON (body: Markdown) |
| 이미지 | `apps/web/public/static/images/**` | 디자인→개발 | 파일 + `packages/env/images.json` 매핑 |
| 회사정보 | `packages/env/site.json` | 운영 | JSON |

루트 `env/`, `static/`, `news/` 심볼릭 링크 — 비개발자 접근 편의 (Windows: junction).

## 확인 필요

_(없음 — 사용자 확인 완료 항목은 본문에 반영됨)_
