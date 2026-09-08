---
name: lua-ui-orchestrator
description: LuaWeb UI/UX 오케스트레이션. UI/UX Master·Tester·검수 subagent 루프, 벤치마크(wooritg) 대비 스코어링, 페이지별 콘텐츠·레이아웃 반영. LuaWeb UI 개선·고급화·검수 요청 시 사용.
---

# LuaWeb UI Orchestrator

## 역할

| Agent | subagent_type | 역할 |
|---|---|---|
| **Orchestrator** | (main) | 모든 사용자 입력 수신·분배, subagent 기동/중단, 구현·검수 루프 |
| **UI/UX Master** | generalPurpose | wooritg.com + 레퍼런스 5+ 사이트 스코어링, 타이포·색·간격 개선안 |
| **Tester** | explore (very thorough) | 클릭·호버·드래그·포커스·모바일 UX 이슈 |
| **검수** | explore (very thorough) | docs/report·content·images.json·site.json vs 실제 반영 |

필요 시 **Asset Agent** (generalPurpose): PDF 썸네일·로고 PNG·locale 이미지 생성.

## 실행 순서

```
1. Orchestrator: docs/main·11_ContentInventorySuccess·현재 diff 파악
2. 병렬 launch: UI/UX Master + Tester + 검수 (사용자 입력 전문 전달)
3. Main: 검수·Master·Tester 결과 통합 → 우선순위 구현
4. typecheck + build
5. 검수 subagent 재실행 → ISSUES 있으면 Refactor(generalPurpose) → 4 반복
6. 사용자: 구현 요약 + 스코어 변화 (간략), 추가 Phase/UI 여부만 질문
```

## 벤치마크·스코어링 (Master)

카테고리 1–10: Header/GNB, Footer, Hero, Typography hierarchy, Cards, Spacing, Color, Motion, Mobile, Content fidelity.

- 기준: wooritg.com (벤치마크)
- 레퍼런스: 바이오·테크 기업 IR 사이트 5+ (Samsung Biologics, Celltrion, SK bioscience, Recursion, Moderna 등)
- **Δ ≥ 2점** 차이 → Master가 구체 CSS/컴포넌트 수정안 제시 → Orchestrator 반영

## 페이지 체크리스트 (검수)

- 메인: 빈 이미지 = external 재확인 → 없으면 카드 대신 버튼/링크 UI
- 헤더/푸터: 로고·주소·이메일 placeholder·네비 고급화
- CEO 인사말: KO 문단 줄바꿈
- 회사개요: dt/dd, locale별 다이어그램
- 지식재산: PDF 썸네일, 미등록 「진행중」
- 찾아오시는길: 네이버 지도만, 오시는길 문구
- 기술1/2: 글머리, locale 이미지
- 경영방침: 강조/뎁스/럭셔리 타이포 + locale 다이어그램

## 게이트

```powershell
npm exec --yes pnpm@9.15.9 typecheck
npm exec --yes pnpm@9.15.9 build
```

`docs/log/log.md` 갱신. Phase 문서는 사용자 요청 시만.

## 금지

- middleware/proxy 추가
- docs/report 임의 생성 (사용자 요청 없이)
- placeholderMode true로 되돌리기 (운영 콘텐츠 반영 후)
