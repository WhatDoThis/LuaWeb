# Phase 2 — 공통 레이아웃

> **상위 문서**: [`01_ImplementationRoadmap.md`](./01_ImplementationRoadmap.md) § Phase 2  
> **선행 Phase**: [`03_Phase_1.md`](./03_Phase_1.md) (완료)  
> **상태**: `완료` (2026-08-22)  
> **목표**: 전 페이지 Header/Footer/GNB/Sitemap/Modal

---

## 진행 요약

| 항목 | 값 |
|---|---|
| Phase | 2 |
| 완료 기준 | Header/Footer/GNB/LangSwitcher/Modal/TopButton, disclosure GNB 주석, build 통과 |
| 커밋 메시지 | `feat(layout): add header, gnb, footer, sitemap overlay, and privacy modal` |

---

## 2.1 lib/nav.ts

- [x] `NavItem` 타입 + `navItems` 5섹션
- [x] pr-center children: news만 — disclosure **주석**

## 2.2 Header + Gnb + GnbSubmenu

- [x] desktop ≥1024 hover submenu
- [x] Logo placeholder `LOGO`
- [x] mobile 햄버거 → SitemapOverlay

## 2.3 LangSwitcher

- [x] `@/i18n/navigation` Link + locale 전환

## 2.4 SitemapOverlay + Accordion

- [x] fullscreen, body scroll lock, Accordion 1depth

## 2.5 Footer + TopButton + Modal

- [x] Footer 3-column, site.json contact
- [x] privacy → Modal (common.json body)
- [x] TopButton threshold 300

## 2.6 SiteShell + [locale]/layout 연동

- [x] `getSite()` server → SiteShell props

## 2.7 common.json 보강

- [x] nav nested tree (5섹션 + children)
- [x] layout.menuOpen / menuClose / topButton

## Phase 2 완료 조건

- [x] 전 페이지 Header/Footer
- [x] GNB hover, mobile sitemap
- [x] LangSwitcher
- [x] disclosure GNB **주석**
- [x] `pnpm typecheck && pnpm build`

---

## Phase 2 완료 후

1. 사용자 확인 → Phase 3 문서(`05_Phase_3.md`) 생성 여부 결정

---

_문서 버전: 2026-08-22 | Phase 2 실행 가이드_
