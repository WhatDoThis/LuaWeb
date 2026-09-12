# Agent Guide — Lua Site (LuaWeb)

## Project

Static corporate site: Next.js 16 App Router, `output: 'export'`, ko/en, 17+ routes.

## Docs

| Path | Role |
|---|---|
| `docs/main/` | PRD, architecture, schema (reference) |
| `docs/main/06-LAUNCH-GUIDE.md` | **운영 오픈 종합 가이드** (DNS·SSL·검색·organic SEO) |
| `docs/main/07-SERVER-PRODUCTION.md` | **Prd iwinv 서버 현황** (D0~D6 완료·명령어) |
| `docs/report/01_ImplementationRoadmap.md` | Full roadmap |
| `docs/report/0N_Phase_N.md` | **Active execution checklist** |
| `docs/report/12_iwinvDeployRoadmap.md` | iwinv Prd 배포 Phase D0~D6 |
| `docs/report/13_SearchEngineRoadmap.md` | 검색엔진 등록 Phase S0~S4 |
| `deploy/` | Dev(Windows) → Prd(Rocky Linux iwinv) |

## Commands

```powershell
npm exec --yes pnpm@9.15.9 install
npm exec --yes pnpm@9.15.9 typecheck
npm exec --yes pnpm@9.15.9 build
npm exec --yes pnpm@9.15.9 dev
```

## Code generation loop (required)

```
Main implement → Review subagent (explore)
  → follow-up needed? → Refactor subagent (generalPurpose) → Review again
  → no follow-up → brief summary to user → ask next Phase only
```

| Role | Subagent | When |
|---|---|---|
| Review | `explore` (very thorough) | After every main implementation |
| Refactor | `generalPurpose` | Only when review lists fixable ISSUES |

Do not ask user to confirm code changes. Ask only whether to proceed to the next Phase.

## UI agent pipeline (footer/header/layout — mandatory)

**Skills alone are not enough.** Use `.cursor/agents/` roster:

| Step | Agent | subagent_type |
|---|---|---|
| 1 | [Layout Architect](.cursor/agents/layout-architect.md) | `generalPurpose` |
| 2 | [Typography Scaler](.cursor/agents/typography-scaler.md) | `generalPurpose` |
| 3 | [Visual QA Reviewer](.cursor/agents/visual-qa-reviewer.md) | `explore` (very thorough) |
| 4 | [Regression Guard](.cursor/agents/regression-guard.md) | `explore` (very thorough) |

Orchestrator: [orchestrator-pipeline.md](.cursor/agents/orchestrator-pipeline.md) · Rule: `.cursor/rules/lua-ui-agent-pipeline.mdc`

Visual QA **FAIL** or Regression **BLOCK** → do not report UI task complete to user.

## Cursor rules

`.cursor/rules/woori-*.mdc` — phase workflow, monorepo static export, code file headers.

## Skill

| Skill | Path | Use when |
|---|---|---|
| Phase dev | `.cursor/skills/woori-phase-dev/SKILL.md` | Phase 0~7 checklist implementation |
| UI orchestrator | `.cursor/skills/lua-ui-orchestrator/SKILL.md` | 4-agent pipeline 진입점 |
| Corp design master | `.cursor/skills/corp-site-design-master/SKILL.md` | Layout/Typography agent 공통 벤치마크 |
| Visual QA reviewer | `.cursor/skills/visual-qa-reviewer/SKILL.md` | 사람 눈 QA agent |
| Layout regression guard | `.cursor/skills/layout-regression-guard/SKILL.md` | anti-pattern BLOCK agent |
| **Agent roster** | `.cursor/agents/README.md` | 에이전트 정의·Task prompt |
| **iwinv deploy** | `.cursor/skills/iwinv-deploy-orchestrator/SKILL.md` | iwinv VM·ELCAP·보안·nginx·HTTPS·DNS·메일 단계별 Prd 배포 (Phase D0~D6) |
| **Search engine registration** | `.cursor/skills/search-engine-registration-orchestrator/SKILL.md` | Google·네이버·Bing 등록 (Phase S0~S4, D0~D6 완료 후) |
