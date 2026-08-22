# Log

## Log Index

16. 2026-08-22 브랜드명 우리테크 → 루아 변경
15. 2026-08-22 뉴스 샘플 기사 정리 — 홈페이지 리뉴얼 1건만 유지
14. 2026-08-22 Phase 7 홈·SEO·CI
13. 2026-08-22 Phase 6 JSON 뉴스 게시판
12. 2026-08-22 Phase 5 도메인 섹션 14페이지 구현
11. 2026-08-22 코드 생성·검수 에이전트 워크플로 규칙 반영
10. 2026-08-22 Phase 4 서브 페이지 골격
9. 2026-08-22 Phase 3 env + SmartImage + check:images
8. 2026-08-22 Phase 2 공통 레이아웃 + 프로젝트 rules/skill
7. 2026-08-22 Phase 1 검토 수정 (html lang, home.json, docs/main)
6. 2026-08-22 Phase 1 i18n 배선 및 Rocky Linux 배포 토대
5. 2026-08-22 Phase 0 모노레포 스캐폴딩 구현 완료
4. 2026-08-22 Phase 0 실행 가이드 문서 작성
3. 2026-08-22 GitHub 원격 저장소 초기 푸시
2. 2026-08-22 Phase별 상세 구현 로드맵 작성 및 docs 구조 재편
1. 2026-08-22 프로젝트 기획 문서 6종 작성

## Log Body

16. 2026-08-22 브랜드명 우리테크 → 루아 변경
Purpose: 사이트 표시 브랜드명 통일 (ko: 루아, en: Lua) Changes:

packages/content ko/en JSON, board/news, site.json, images.json alt
env/ junction site.json, images.json 동기
Changed files: packages/content/**, packages/env/site.json, packages/env/images.json, env/site.json, env/images.json, news/**, docs/log/log.md

15. 2026-08-22 뉴스 샘플 기사 정리 — 홈페이지 리뉴얼 1건만 유지
Purpose: Phase 6 더미 뉴스 11건 삭제, 공지 1건만 운영용으로 유지 Changes:

board/news/ko|en: 2026-08-20-website-renewal.json만 남김 (11건×2 삭제)
제목 ko「홈페이지 리뉴얼」, en「Website Renewal」
Changed files: packages/content/board/news/ko/*.json, packages/content/board/news/en/*.json, docs/log/log.md

14. 2026-08-22 Phase 7 홈·SEO·CI
Purpose: 홈 슬라이더·스크롤 섹션, SEO metadata/sitemap/robots/JSON-LD, GitHub Actions CI Changes:

home.json ko/en 본문 (hero, techCards, bizFields, sections, linkCards)
sections/home: hero-slider, biz-card-slider, biz-field-scroller, home-news-list, link-cards
sections/common/section-head, lib/seo, lib/sitemap-routes
generateMetadata + JsonLdOrganization, sitemap.ts, robots.ts (disclosure 제외)
.github/workflows/deploy.yml, embla-carousel-react
docs/report/09_Phase_7.md (완료)
Changed files: apps/web/src/**, packages/content/ko|en/home.json, .github/workflows/deploy.yml, docs/report/**, docs/log/log.md, pnpm-lock.yaml

13. 2026-08-22 Phase 6 JSON 뉴스 게시판
Purpose: JSON 기사 12건 ko/en, 목록/상세/검색/페이지네이션, DisclosureList 선구현 Changes:

packages/content/board.ts: loadNewsArticles, loadNewsArticle, board/news ko/en 12건
apps/web: lib/board.ts, lib/markdown.tsx, sections/pr (board-row, board-search, news-board-panel, board-view, disclosure-list), ui/pagination
pr-center/news, news/[slug] pages wired, react-markdown 추가
common/prCenter JSON: board labels, disclosure.items
docs/report/08_Phase_6.md (완료)
Changed files: packages/content/**, apps/web/src/**, docs/report/**, docs/log/log.md, pnpm-lock.yaml

12. 2026-08-22 Phase 5 도메인 섹션 14페이지 구현
Purpose: company 6 + technology 2 + management 3 + career 3 본문 섹션 및 content JSON 본문 데이터 Changes:

sections/company: greeting, overview, history, org-chart, cert-grid, location-tabs/section
sections/technology: tech-intro-block, numbered-section, tech-image-row, tech-page-sections
sections/management: policy-diagram, ethics-block, esg-block
sections/career: talent-diagram, process-steps, welfare-grid, download-button, recruitment/certificates section
ui/tabs.tsx, 14 page.tsx SubPageLayout children 연결
packages/content ko/en: company, technology, management, career 본문
packages/env: site.json maps 5키, schema maps 확장
docs/report/07_Phase_5.md (완료)
Changed files: apps/web/src/components/**, apps/web/src/app/[locale]/**, packages/content/**, packages/env/**, docs/report/**, docs/log/log.md

11. 2026-08-22 코드 생성·검수 에이전트 워크플로 규칙 반영
Purpose: 메인 구현 → 검토 subagent → 리팩토링 subagent 루프 및 완료 보고 형식 표준화 Changes:

.cursor/rules/woori-phase-workflow.mdc: 에이전트 검수 루프·완료 보고 규칙
.cursor/skills/woori-phase-dev/SKILL.md: Step 1~4 워크플로
AGENTS.md: subagent 역할 매핑
Changed files: .cursor/rules/woori-phase-workflow.mdc, .cursor/skills/woori-phase-dev/SKILL.md, AGENTS.md, docs/log/log.md

10. 2026-08-22 Phase 4 서브 페이지 골격
Purpose: 서브 16페이지 IntroHero/LnbBar/SpHead/PageContainer 공통 골격 및 domain JSON skeleton Changes:

sections/common: intro-hero, lnb-bar, sp-head, page-container
lib: lnb.ts, sub-page-layout.tsx
16 sub page.tsx SubPageLayout 적용, technology staticMode, disclosure Coming soon
packages/content: company/technology/management/prCenter/career ko/en skeleton
apps/web lint script: eslint .
docs/report/06_Phase_4.md (완료)
Changed files: apps/web/src/components/sections/**, apps/web/src/lib/**, apps/web/src/app/[locale]/**, packages/content/**, docs/report/**, docs/log/log.md

9. 2026-08-22 Phase 3 env + SmartImage + check:images
Purpose: images.json 전 슬롯, zod 검증, SmartImage 플레이스홀더, 이미지 발주서 자동 생성 Changes:

packages/env: images.json 73슬롯, schema.ts zod, getImage/listEmptyImageSlots
ui: smart-image.tsx, image-asset-view.tsx
Header/Footer/Sitemap: logo 플레이스홀더 (ImageAssetView)
scripts/check-images.ts → docs/report/IMAGE-REQUEST.md
docs/report/05_Phase_3.md (완료)
Changed files: packages/env/**, apps/web/src/components/ui/**, apps/web/src/components/layout/**, scripts/check-images.ts, package.json, tsconfig.json, docs/report/**, docs/log/log.md

8. 2026-08-22 Phase 2 공통 레이아웃 + 프로젝트 rules/skill
Purpose: Header/GNB/Footer/Sitemap/Modal 공통 레이아웃 구현 및 Cursor rules·skill·AGENTS.md 추가 Changes:

layout: header, gnb, gnb-submenu, lang-switcher, sitemap-overlay, footer, top-button, site-shell
ui: modal, accordion / lib: cn, nav
common.json: nav nested tree, layout strings / home.json: title, localeLabel 분리
.cursor/rules: woori-phase-workflow, woori-monorepo-static, woori-code-files
.cursor/skills/woori-phase-dev/SKILL.md, AGENTS.md
docs/report/04_Phase_2.md (완료)
Changed files: apps/web/src/components/**, apps/web/src/lib/**, packages/content/**, .cursor/**, AGENTS.md, docs/report/04_Phase_2.md, docs/log/log.md

7. 2026-08-22 Phase 1 검토 수정 (html lang, home.json, docs/main)
Purpose: Phase 1 재검토 이슈 수정 Changes:

html lang: [locale]/layout.tsx locale별 설정, root layout pass-through
home 키: common.json → home.json 이동
lib/i18n: NextIntlClientProvider, getMessages re-export
docs/main: rootParams → requestLocale 동기화
Changed files: apps/web/src/app/**, packages/content/**, apps/web/src/lib/i18n.ts, docs/main/00-PRD.md, docs/main/01-ARCHITECTURE.md, docs/main/04-PHASE-PLAN.md

6. 2026-08-22 Phase 1 i18n 배선 및 Rocky Linux 배포 토대
Purpose: next-intl 다국어 배선 및 Dev(Windows)/Prd(Rocky Linux iwinv) 배포 환경 placeholder 구축 Changes:

i18n: routing/request/navigation, next-intl plugin, loadMessages 7 namespace, common.json ko/en
lib/i18n.ts: useTranslations/getTranslations re-export
배포: deploy/, deploy/rocky-linux/, packages/env/deploy.json, .env.example, getDeploy()
request.ts: rootParams 미제공 → requestLocale 패턴 적용
docs/report/03_Phase_1.md: Phase 1 실행 가이드 (완료)
검증: typecheck 0 error, build 성공
Changed files: apps/web/src/i18n/**, apps/web/src/lib/i18n.ts, packages/content/**, packages/env/**, deploy/**, .env.example, docs/report/03_Phase_1.md, docs/report/00_ReportIndex, docs/log/log.md

5. 2026-08-22 Phase 0 모노레포 스캐폴딩 구현 완료
Purpose: 02_Phase_0 가이드 기준 pnpm 모노레포·17 라우트 정적 export 스캐폴딩 구축 Changes:

루트: pnpm-workspace, turbo, tsconfig.base, packageManager pnpm@9.15.9
packages/env: site/features/images JSON, getSite/getFeatures stub
packages/content: ko/en 7 JSON, loadMessages stub, board/news 디렉터리
apps/web: Next.js 16.3 static export, 17 라우트 placeholder, Tailwind v4 @theme
junction: env/, static/, news/ 생성
검증: typecheck 0 error, build 성공, index.html 39건
Changed files: pnpm-workspace.yaml, package.json, turbo.json, tsconfig.base.json, packages/**, apps/**, env/, static/, news/, docs/report/02_Phase_0.md, docs/log/log.md

4. 2026-08-22 Phase 0 실행 가이드 문서 작성
Purpose: Phase 0 모노레포 스캐폴딩을 체크리스트 기반으로 실행할 수 있도록 실행 가이드 분리 작성 Changes:

docs/report/02_Phase_0.md: 0.1~0.9 작업·파일 스펙·검증·완료 조건 체크리스트
docs/report/00_ReportIndex: 02_Phase_0 항목 추가
Changed files: docs/report/02_Phase_0.md, docs/report/00_ReportIndex, docs/log/log.md

3. 2026-08-22 GitHub 원격 저장소 초기 푸시
Purpose: 로컬 프로젝트를 GitHub 원격 저장소에 최초 등록 및 main 브랜치 푸시 Changes:

.gitignore: Node/Next.js/pnpm 빌드·의존성·환경변수 제외 규칙 추가
git init, initial commit, origin remote 설정, main 푸시 완료
Changed files: .gitignore, docs/log/log.md

2. 2026-08-22 Phase별 상세 구현 로드맵 작성 및 docs 구조 재편
Purpose: 단일 자립형 Phase 0~7 개발 가이드 작성. 기존 00~05 문서를 main으로 이동 Changes:

docs/report/01_ImplementationRoadmap.md: PRD·아키텍처·스키마·컴포넌트·Phase 0~7 세부 작업 통합
docs/report/00_ReportIndex: report/main 파일 목록
docs/main/: 00~05 기획 문서 이동, 04-PHASE-PLAN 요약 축소
Changed files: docs/report/01_ImplementationRoadmap.md, docs/report/00_ReportIndex, docs/main/00-PRD.md ~ 05-CONVENTIONS.md, docs/main/04-PHASE-PLAN.md, docs/log/log.md

1. 2026-08-22 프로젝트 기획 문서 6종 작성
Purpose: Woori Tech 기업 홍보 사이트 확정 아키텍처를 문서화. 코드 없이 PRD·아키텍처·컴포넌트·스키마·Phase·컨벤션 정의 Changes:

docs/00-PRD.md: KPI, FR/NFR, 사이트맵, 스코프 아웃
docs/01-ARCHITECTURE.md: 디렉터리 트리, 데이터 흐름, JSON 뉴스 설계
docs/02-COMPONENT-SPEC.md: UI 패턴 12종 props 명세
docs/03-CONTENT-SCHEMA.md: content/env JSON 스키마, images 슬롯 전체
docs/04-PHASE-PLAN.md: Phase 0~7 산출물·완료조건
docs/05-CONVENTIONS.md: 네이밍, Server/Client, Tailwind, 금지목록
Changed files: docs/00-PRD.md, docs/01-ARCHITECTURE.md, docs/02-COMPONENT-SPEC.md, docs/03-CONTENT-SCHEMA.md, docs/04-PHASE-PLAN.md, docs/05-CONVENTIONS.md, docs/log/log.md
