# Log

## Log Index

48. 2026-09-09 iwinv 배포 오케스트레이터 스킬·로드맵·서버 스크립트
47. 2026-09-09 CEO 인사말 서명 EN·중복 직함 제거
46. 2026-09-08 UI/UX Master 우선수정 P0~P1 전면 반영
42. 2026-09-08 Pretendard 무료 웹폰트 CDN 연결
41. 2026-09-08 Tester subagent a11y 후속 (Critical/High)
40. 2026-09-08 UI 오케스트레이터·프리미엄 UI 전면 보강
39. 2026-09-08 콘텐츠 적용 후 이미지·UI 레이아웃 보정
38. 2026-09-08 확정 콘텐츠·이미지 패키지 전면 적용
37. 2026-08-23 벤치마크 회사명 잔재 검수·Lua DOM 식별자 정리
36. 2026-08-23 뉴스 게시판 BoardRow hydration 오류 수정
35. 2026-08-23 2차 검수 blocker·SEO·nginx·배포 문서 보강
34. 2026-08-23 런치 가이드 회사명 루아로 정정
33. 2026-08-23 최종 브라우저 배포·오픈 가이드 문서 추가
32. 2026-08-23 클릭 요소 전역 cursor:pointer 적용
31. 2026-08-22 푸터 Contact Us 연락처 섹션 추가
30. 2026-08-22 콘텐츠 제출서 §0 홈페이지 구조 안내 추가
29. 2026-08-22 콘텐츠 제출서 항목별 화면 위치 설명 추가
28. 2026-08-22 콘텐츠 제출서 표→뎁스 목록 형식 전환
27. 2026-08-22 콘텐츠 제출서 본문·사진 중심으로 대폭 간소화
26. 2026-08-22 콘텐츠 제출서 파비콘 개발팀 처리로 조정
25. 2026-08-22 콘텐츠 제출 요청서 비개발자 포맷 전환
24. 2026-08-22 콘텐츠 인벤토리 담당자 제출용 보완
23. 2026-08-22 콘텐츠 인벤토리 포맷 수정 (Where·키 분리)
22. 2026-08-22 서브 페이지 하단 여백 60px 전역 적용
21. 2026-08-22 회사소개 전체 하단 여백 100px 통일
20. 2026-08-22 회사개요 정보 테이블 하단 여백 추가
19. 2026-08-22 회사개요 매출액·해외 법인 테이블 삭제
18. 2026-08-22 회사개요 주요 사업·종업원 수 정리
17. 2026-08-22 채용 섹션 제거 및 찾아오시는 길 단일 본사화
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

48. 2026-09-09 iwinv 배포 오케스트레이터 스킬·로드맵·서버 스크립트
Purpose: iwinv 클라우드 Prd 배포를 Phase D0~D6로 분리하고, 콘솔·SSH 복붙형 에이전트 스킬·하드ening 스크립트 제공 Changes:

iwinv-deploy-orchestrator SKILL (reference-iwinv, phases), 12_iwinvDeployRoadmap, rocky-linux scripts 00~04, woori-iwinv-deploy rule, AGENTS/deploy README 갱신 Changed files: .cursor/skills/iwinv-deploy-orchestrator/**, .cursor/rules/woori-iwinv-deploy.mdc, deploy/rocky-linux/scripts/**, docs/report/12_iwinvDeployRoadmap.md, docs/report/00_ReportIndex, deploy/README.md, deploy/rocky-linux/README.md, AGENTS.md, docs/log/log.md

47. 2026-09-09 CEO 인사말 서명 EN·중복 직함 제거
Purpose: 인용 블록 하단 CEO 텍스트 중복 제거, EN 페이지 ceo-sign.en.svg 적용 Changes:

greeting-section blockquote footer 삭제, ceo-sign.en.svg, images.json srcEn Changed files: apps/web/src/components/sections/company/greeting-section.tsx, apps/web/public/static/images/company/ceo-sign.en.svg, packages/env/images.json, env/images.json, docs/log/log.md

46. 2026-09-08 UI/UX Master 우선수정 P0~P1 전면 반영
Purpose: Master 감사 P0~P1·P2 코드 개선 — 히어로·카드·특허·GNB·액센트·인사말·푸터·공시 Changes:

hero static 1장, biz/link cards gradient, cert pending list, GNB parent link, SVG menu, accent color, greeting quote, intro-hero overlay, footer quick nav, disclosure SubPageLayout Changed files: apps/web/src/components/**, apps/web/src/styles/globals.css, packages/content/**, docs/log/log.md

45. 2026-09-08 푸터 로고 220px·Google Maps embed
Purpose: 푸터 로고 너비 220px 축소, 찾아오시는 길 Google Maps iframe + 네이버 지도 링크 유지 Changes:

footer logo max-w 220px, site.json maps.hq Google embed, LocationSection iframe 복원 Changed files: apps/web/src/components/layout/footer.tsx, apps/web/src/components/sections/company/location-section.tsx, packages/env/site.json, env/site.json, docs/log/log.md

44. 2026-09-08 찾아오시는 길 OSM iframe 제거·브랜드 지도 카드
Purpose: OSM iframe 속성 UI 제거, 기업 사이트 톤에 맞는 미리보기 카드 + 네이버 지도 CTA Changes:

location-map-preview.svg, LocationSection iframe 제거, mapCta ko/en, site.json maps.hq 비움 Changed files: apps/web/public/static/images/company/location-map-preview.svg, apps/web/src/components/sections/company/location-section.tsx, packages/env/images.json, packages/env/site.json, packages/content/ko|en/company.json, docs/log/log.md

43. 2026-09-08 푸터 레이아웃·영문 SVG·지도 embed 수정
Purpose: 푸터 180px/패딩 30·로고 확대·개인정보 중앙·문의 우측 정렬, 영문 다이어그램 SVG 깨짐·지도 iframe 복구 Changes:

footer h180 py30 3열 그리드, overview/tech1/tech2 EN SVG UTF-8 정리, site.json maps OSM embed + naver.me 링크 Changed files: apps/web/src/components/layout/footer.tsx, apps/web/public/static/images/**/*.en.svg, packages/env/site.json, env/site.json, apps/web/src/components/sections/company/location-section.tsx, docs/log/log.md

42. 2026-09-08 Pretendard 무료 웹폰트 CDN 연결
Purpose: 방문자 PC 설치 여부와 무관하게 OFL Pretendard 적용 Changed:

lib/pretendard-font.ts, [locale]/layout·page·not-found head link Changed files: apps/web/src/lib/pretendard-font.ts, apps/web/src/app/**/layout.tsx, apps/web/src/app/page.tsx, apps/web/src/app/not-found.tsx, docs/log/log.md

41. 2026-09-08 Tester subagent a11y 후속 (Critical/High)
Purpose: Tester·검수 subagent 완료 후 잔여 Critical/High UX·a11y 이슈 반영 Changes:

focus-trap, modal/sitemap 포커스 트랩·복원, top-button tabIndex, hero a11y, lnb Escape, cert-grid PDF 링크, tel: href, global focus-visible Changed files: apps/web/src/lib/focus-trap.ts, apps/web/src/components/ui/modal.tsx, apps/web/src/components/layout/*, apps/web/src/components/sections/**, apps/web/src/styles/globals.css, docs/log/log.md

40. 2026-09-08 UI 오케스트레이터·프리미엄 UI 전면 보강
Purpose: UI/UX Master·Tester·검수 subagent 루프 및 페이지별 고급화·콘텐츠 반영 Changes:

lua-ui-orchestrator 스킬, srcEn locale 이미지, 로고 PNG, 헤더/푸터·경영방침 타이포, 메인 버튼 UI, 특허 썸네일·진행중, 네이버 지도 Changed files: .cursor/skills/lua-ui-orchestrator/SKILL.md, AGENTS.md, packages/**, apps/web/src/**, apps/web/public/static/images/**, docs/log/log.md

39. 2026-09-08 콘텐츠 적용 후 이미지·UI 레이아웃 보정
Purpose: 실제 이미지 비율·빈 슬롯·히어로/로고/기술 페이지 등 브라우저 UI 문제 부분 수정 Changes:

ImageAssetView fit(contain/cover)·placeholderMode false 시 그라데이션 처리
로고 비율·히어로 object-position·서브히어로 반응형 높이·다이어그램 프레임·특허 PDF 카드·링크/기술카드 aspect 고정 Changed files: apps/web/src/components/ui/image-asset-view.tsx, apps/web/src/components/layout/header.tsx, apps/web/src/components/sections/**, packages/env/images.json, docs/log/log.md

38. 2026-09-08 확정 콘텐츠·이미지 패키지 전면 적용
Purpose: 11_ContentInventorySuccess.md 확정본과 static/external 이미지를 JSON·images.json·정적 자산에 반영 Changes:

external → public/static/images·downloads 정리, site/home/company/technology/management/prCenter/common ko·en 갱신
GNB/LNB 연혁·조직도·윤리·ESG 제거, IR 카드·팩스·히어로2·3 삭제, 특허 PDF 링크·네이버 지도 링크 추가 Changed files: packages/content/**, packages/env/**, apps/web/public/static/**, apps/web/src/**

37. 2026-08-23 벤치마크 회사명 잔재 검수·Lua DOM 식별자 정리
Purpose: 우리기술(woori) 잔재 검수 및 HTML class/id/data-site를 Lua 전용 식별자로 통일 Changes:

apps/web: site-identity.ts, data-site=lua, lua-site-root, lua-modal-title, lua-location-info, lua-board-markdown
package.json lua-web, .env.example·deploy README woori 경로 → /var/www/lua Changed files: apps/web/src/lib/site-identity.ts, apps/web/src/components/**, apps/web/src/app/[locale]/layout.tsx, package.json, .env.example, deploy/**, AGENTS.md

36. 2026-08-23 뉴스 게시판 BoardRow hydration 오류 수정
Purpose: tbody 안 li 렌더링으로 발생한 HTML/hydration 오류 제거 Changes:

board-row: BoardTableRow(tr), BoardListRow(li) 분리
news-board-panel: PC tbody·MO ul 각각 전용 컴포넌트 사용 Changed files: apps/web/src/components/sections/pr/board-row.tsx, apps/web/src/components/sections/pr/news-board-panel.tsx

35. 2026-08-23 2차 검수 blocker·SEO·nginx·배포 문서 보강
Purpose: 정적 export 루트/404·운영 도메인 빌드 차단·배포 경로 통일·검색/CI/nginx/문서 2차 검수 반영 Changes:

app/page.tsx meta refresh 루트, not-found.tsx→404.html, lib/seo.ts production domain 가드
deploy.json·nginx.conf.example /var/www/lua/current, sitemap hreflang, check-images --fail-on-empty, deploy.yml release-gate
06-LAUNCH-GUIDE SELinux·DNS SSL 게이트·releases 배포, site.json placeholder domain Changed files: apps/web/src/app/**, apps/web/src/lib/seo.ts, deploy/**, packages/env/**, scripts/check-images.ts, .github/workflows/deploy.yml, docs/main/06-LAUNCH-GUIDE.md, docs/log/log.md

34. 2026-08-23 런치 가이드 회사명 루아로 정정
Purpose: 벤치마크 잔재(우리기술·wooritech)를 루아(Lua) 기준으로 교체 Changes:

06-LAUNCH-GUIDE.md: 대상·도메인 예시·서버 경로(/var/www/lua) woori-tech 명칭 제거 Changed files: docs/main/06-LAUNCH-GUIDE.md, docs/log/log.md

33. 2026-08-23 최종 브라우저 배포·오픈 가이드 문서 추가
Purpose: 콘텐츠 확정 후 iwinv Rocky Linux·nginx·SSL·도메인·검색엔진 등록까지 순서대로 따라 할 수 있는 운영 오픈 종합 가이드 작성 Changes:

docs/main/06-LAUNCH-GUIDE.md — 15단계 흐름, 용어 해설, Google·네이버·Bing 공식 요건 반영 Changed files: docs/main/06-LAUNCH-GUIDE.md, docs/log/log.md

32. 2026-08-23 클릭 요소 전역 cursor:pointer 적용
Purpose: 링크·버튼 등 클릭 가능 요소 호버 시 손가락 커서가 보이도록 전역 base 스타일 추가 Changes:

globals.css: a[href], button, role=button 등 cursor:pointer / disabled not-allowed Changed files: apps/web/src/styles/globals.css

31. 2026-08-22 푸터 Contact Us 연락처 섹션 추가
Purpose: 푸터 연락처를 기업 사이트 관례에 맞게 Contact Us 섹션으로 정리하고 한/영 i18n·클릭 가능 연락처 반영 Changes:

footer: Contact Us 제목, 아이콘+연락처 목록, tel/mailto 링크, 주소→찾아오시는 길 링크
common.json(ko/en): footer.contactTitle, footer.email 키 추가 Changed files: apps/web/src/components/layout/footer.tsx, packages/content/ko/common.json, packages/content/en/common.json

30. 2026-08-22 콘텐츠 제출서 §0 홈페이지 구조 안내 추가
Purpose: 브라우저 미경험·비개발 담당자용 — §1 전 메뉴 트리·공통 레이아웃·스크린샷 첨부 자리 Changes:

10_ContentInventory.md — §0 홈페이지 구조(먼저 읽기), 그림 0-1~0-4 캡처 안내, §1~§14 매핑
Changed files: docs/report/10_ContentInventory.md, docs/log/log.md

29. 2026-08-22 콘텐츠 제출서 항목별 화면 위치 설명 추가
Purpose: 비개발 담당자가 히어로·IntroHero 등 용어를 이해할 수 있도록 · 화면: 한 줄 설명 전 항목 부여 Changes:

10_ContentInventory.md — §1~§14 모든 a. 항목에 화면 위치 설명, 보내는 방법 안내 4번 추가
Changed files: docs/report/10_ContentInventory.md, docs/log/log.md

28. 2026-08-22 콘텐츠 제출서 표→뎁스 목록 형식 전환
Purpose: Word·한글 이전 용이 — 디웹스·Content Snare 레퍼런스 기반 1) 사진/글 · a. 항목 구조로 재작성 Changes:

10_ContentInventory.md — 마크다운 표 제거, §1~§14 뎁스·회신란 유지
Changed files: docs/report/10_ContentInventory.md, docs/log/log.md

27. 2026-08-22 콘텐츠 제출서 본문·사진 중심으로 대폭 간소화
Purpose: 에이전시·국내 제작사 콘텐츠 수집 레퍼런스 기반 — UI/아이콘/파비콘 제거, 페이지별 표 형식으로 재작성 Changes:

10_ContentInventory.md — 778→약 280행, GNB·게시판 UI·개발팀 처리 항목 삭제, 본문·사진·연락처만
00_ReportIndex — 10번 설명 갱신
Changed files: docs/report/10_ContentInventory.md, docs/report/00_ReportIndex, docs/log/log.md

26. 2026-08-22 콘텐츠 제출서 파비콘 개발팀 처리로 조정
Purpose: 회사 담당자 제출 범위에서 파비콘 제외 — 로고 기반 또는 참고 사이트 톤 무료 아이콘으로 개발 처리 Changes:

10_ContentInventory.md — 파비콘 항목을 개발팀 처리로 변경, 체크리스트·우선순위·표기 안내 갱신
Changed files: docs/report/10_ContentInventory.md, docs/log/log.md

25. 2026-08-22 콘텐츠 제출 요청서 비개발자 포맷 전환
Purpose: 회사 담당자가 개발 용어 없이 사진·문구를 구분·회신할 수 있도록 문서 재작성 Changes:

10_ContentInventory.md — 사진 넣기/글 고치기 표기, 회신(한국어/영어) 빈칸, 개발 참조는 부록만
00_ReportIndex — 10번 문서 설명 갱신
Changed files: docs/report/10_ContentInventory.md, docs/report/00_ReportIndex, docs/log/log.md

24. 2026-08-22 콘텐츠 인벤토리 담당자 제출용 보완
Purpose: 샘플·미등록 구분, 【입력】【교체】 표기, 제출 체크리스트 추가 Changes:

10_ContentInventory.md — 담당자 안내·상태표·항목별 제출/현재 샘플·§7 체크리스트
Changed files: docs/report/10_ContentInventory.md, docs/log/log.md

23. 2026-08-22 콘텐츠 인벤토리 포맷 수정 (Where·키 분리)

22. 2026-08-22 서브 페이지 하단 여백 60px 전역 적용
Purpose: 메인 제외 모든 서브 페이지 본문-푸터 간격 60px로 통일 Changes:

SubPageLayout: company 한정 pb-[100px] → 전체 pb-[60px]
disclosure 페이지 PageContainer pb-[60px] 추가
Changed files: apps/web/src/lib/sub-page-layout.tsx, apps/web/src/app/[locale]/pr-center/disclosure/page.tsx, docs/log/log.md

21. 2026-08-22 회사소개 전체 하단 여백 100px 통일
Purpose: 회사소개 6개 서브 페이지 본문-푸터 간 여백 확보 Changes:

SubPageLayout: section=company 본문 wrapper pb-[100px]
overview-section: dl 전용 pb-[150px] 제거 (공통 레이아웃으로 이전)
Changed files: apps/web/src/lib/sub-page-layout.tsx, apps/web/src/components/sections/company/overview-section.tsx, docs/log/log.md

20. 2026-08-22 회사개요 정보 테이블 하단 여백 추가
Purpose: 회사개요 정보 dl 하단 시각적 여백 확보 Changes:

overview-section: 마지막 dl에 pb-[150px] 적용
Changed files: apps/web/src/components/sections/company/overview-section.tsx, docs/log/log.md

19. 2026-08-22 회사개요 매출액·해외 법인 테이블 삭제
Purpose: 회사개요 하단 두 번째 정보 테이블(매출액·해외 법인) 완전 제거 Changes:

pages.overview.tables 두 번째 배열 삭제 (ko/en)
Changed files: packages/content/ko/company.json, packages/content/en/company.json, docs/log/log.md

18. 2026-08-22 회사개요 주요 사업·종업원 수 정리
Purpose: 회사개요 정보 테이블을 루아 규모에 맞게 조정 Changes:

주요 사업 항목을 상단(첫 번째) 테이블로 이동
종업원 수 항목 삭제 (ko/en)
Changed files: packages/content/ko/company.json, packages/content/en/company.json, docs/log/log.md

17. 2026-08-22 채용 섹션 제거 및 찾아오시는 길 단일 본사화
Purpose: 루아 단일 사업장 구조에 맞게 채용 GNB·라우트 삭제, 위치 페이지 탭 UI 제거 Changes:

career 라우트·컴포넌트·content JSON·images 슬롯·GNB/LNB 항목 삭제
찾아오시는 길: tabs → office 단일 표시, location-tabs 컴포넌트 삭제
site.json maps 본사(hq)만 유지
pnpm typecheck && pnpm build 통과 (35 routes)
Changed files: apps/web/src/app/[locale]/career/** (삭제), apps/web/src/components/sections/career/** (삭제), apps/web/src/components/sections/company/location-*.tsx, apps/web/src/lib/nav.ts, lnb.ts, packages/content/**, packages/env/site.json, packages/env/images.json, docs/log/log.md

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
