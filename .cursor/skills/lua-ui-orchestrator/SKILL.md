---
name: lua-ui-orchestrator
description: LuaWeb UI 4-에이전트 오케스트레이션. Layout Architect→Typography→Visual QA→Regression Guard. UI/푸터/헤더/wooritg/사용자 스크린샷 불만 시 사용.
---

# LuaWeb UI Orchestrator

## Agents (not skills alone)

| Step | Agent | File | subagent_type |
|---|---|---|---|
| 1 | Layout Architect | `.cursor/agents/layout-architect.md` | generalPurpose |
| 2 | Typography Scaler | `.cursor/agents/typography-scaler.md` | generalPurpose |
| 3 | Visual QA Reviewer | `.cursor/agents/visual-qa-reviewer.md` | explore (very thorough) |
| 4 | Regression Guard | `.cursor/agents/regression-guard.md` | explore (very thorough) |

Roster: `.cursor/agents/README.md`  
Pipeline: `.cursor/agents/orchestrator-pipeline.md`

## Execution (strict)

```
User input + screenshot
→ Task Layout Architect (generalPurpose) — wait
→ Main: apply layout-only diff (max 2 files)
→ Task Typography Scaler IF needed — wait
→ Task Visual QA — FAIL? fix/revert, repeat from QA
→ Task Regression Guard — BLOCK? fix/revert
→ typecheck + verify-routes.ps1
→ User report with 1440px human description
```

**Layout + Typography agents parallel 금지.**  
**Visual QA FAIL 상태로 "수정 완료" 금지.**

## Main agent forbidden

- Ad-hoc footer/header rewrite without agent 3+4
- wooritg "dark clone" or logo invert without user ask
- GNB/lang switcher style change on layout tasks

## Legacy roles

| Role | Maps to |
|---|---|
| Old UI/UX Master | Layout Architect + Typography Scaler |
| Tester | Visual QA Reviewer (+ manual hover check in QA prompt) |
| 검수 | Regression Guard + content checklist |

Content/images 검수는 layout PASS 후 별도 explore.

## Gate

```powershell
npm exec --yes pnpm@9.15.9 typecheck
npm exec --yes pnpm@9.15.9 build
powershell -File scripts/verify-routes.ps1 -BaseUrl http://localhost:3000
```

`docs/log/log.md` 갱신.

## 금지

- middleware/proxy
- docs/report 임의 생성
- placeholderMode 되돌리기
