# Phase 3 — env + SmartImage

> **상위 문서**: [`01_ImplementationRoadmap.md`](./01_ImplementationRoadmap.md) § Phase 3  
> **선행 Phase**: [`04_Phase_2.md`](./04_Phase_2.md) (완료)  
> **상태**: `완료` (2026-08-22)  
> **목표**: images.json 전 슬롯, SmartImage 플레이스홀더, check:images

---

## 3.1 images.json 전체

- [x] §7.3 슬롯 전부, 초기 `src: ""` (**73** 슬롯)

## 3.2 schema.ts (zod)

- [x] ImageAsset, SiteConfig, FeaturesConfig, DeployConfig 검증

## 3.3 index.ts

- [x] `getImage(path)`, `listEmptyImageSlots()`

## 3.4 SmartImage

- [x] Server `SmartImage` + Client용 `ImageAssetView`

## 3.5 Header/Footer Logo

- [x] `common.logo`, `common.logoFooter` 플레이스홀더

## 3.6 check:images

- [x] `scripts/check-images.ts` → `docs/report/IMAGE-REQUEST.md`

## 3.7 root package.json

- [x] `"check:images": "tsx scripts/check-images.ts"`

## Phase 3 완료 조건

- [x] 이미지 0장 전 페이지 정상
- [x] `pnpm check:images` 실행 (73 slots)
- [x] `pnpm typecheck && pnpm build`

---

## Phase 3 완료 후

1. 사용자 확인 → Phase 4 문서(`06_Phase_4.md`) 생성 여부 결정

---

_문서 버전: 2026-08-22 | Phase 3 실행 가이드_
