# LuaWeb UI Agent Roster

사람 눈 기준 UI — **스킬만으로 수정 금지**. 아래 에이전트 파이프라인 필수.

## Pipeline (순서 고정)

```
User + screenshot
  → [1] Layout Architect (generalPurpose)
  → [2] Typography Scaler (generalPurpose) — Layout PASS 후만
  → [3] Visual QA Reviewer (explore, very thorough)
  → [4] Regression Guard (explore, very thorough)
  → Main: 1파일·1축 merge → typecheck → verify-routes.ps1
  → [3][4] 재실행 until PASS or revert
```

## Agents

| ID | File | subagent_type | Skill |
|---|---|---|---|
| layout-architect | `layout-architect.md` | generalPurpose | corp-site-design-master |
| typography-scaler | `typography-scaler.md` | generalPurpose | corp-site-design-master |
| visual-qa-reviewer | `visual-qa-reviewer.md` | explore (very thorough) | visual-qa-reviewer |
| regression-guard | `regression-guard.md` | explore (very thorough) | layout-regression-guard |
| orchestrator | `orchestrator-pipeline.md` | (main) | lua-ui-orchestrator |

## Invoke (Main agent)

UI/푸터/헤더/레이아웃 요청 시:

1. Read `.cursor/agents/orchestrator-pipeline.md`
2. Launch Task agents **sequentially** (1→2→3→4), not parallel for layout fixes
3. User screenshot 있으면 prompt에 **전문 붙여넣기**

## Hard stops

- Visual QA **FAIL** → merge 금지
- Regression Guard **FAIL** → revert or fix before user report
- 색/호버/GNB 서브메뉴 변경은 사용자 명시 요청 없으면 **BLOCK**
