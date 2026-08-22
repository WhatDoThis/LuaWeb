# Agent Guide — Woori Tech Site (LuaWeb)

## Project

Static corporate site: Next.js 16 App Router, `output: 'export'`, ko/en, 17+ routes.

## Docs

| Path | Role |
|---|---|
| `docs/main/` | PRD, architecture, schema (reference) |
| `docs/report/01_ImplementationRoadmap.md` | Full roadmap |
| `docs/report/0N_Phase_N.md` | **Active execution checklist** |
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

## Cursor rules

`.cursor/rules/woori-*.mdc` — phase workflow, monorepo static export, code file headers.

## Skill

`.cursor/skills/woori-phase-dev/SKILL.md` — full Phase + agent loop.
