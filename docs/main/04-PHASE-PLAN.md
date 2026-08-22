# 04-PHASE-PLAN — 단계별 구현 계획 (요약)

> **상세 구현 가이드는 `docs/report/01_ImplementationRoadmap.md`에 통합되었습니다.**  
> Phase별 세부 작업·체크리스트·코드 스니펫·검증 명령은 해당 로드맵을 따릅니다.

| Phase | 한 줄 요약 |
|---|---|
| 0 | 모노레포 스캐폴딩, 17 라우트, Tailwind v4 |
| 1 | next-intl + rootParams i18n |
| 2 | Header/GNB/Footer/Sitemap/Modal |
| 3 | env + SmartImage + check:images |
| 4 | IntroHero + LnbBar + SpHead 서브 골격 |
| 5 | company/technology/management/career 섹션 |
| 6 | JSON 뉴스 게시판 + DisclosureList(미연결) |
| 7 | 홈 슬라이더 + SEO + CI |

각 Phase 완료 조건: `pnpm typecheck && pnpm build` 통과.
