---
name: woori-phase-dev
description: Woori Tech LuaWeb Phase 0~7 개발. Phase report 체크리스트 구현 → 검토 subagent → 필요 시 리팩토링 subagent 루프. Woori Tech, LuaWeb, Phase N 작업 시 사용.
---

# Woori Tech Phase Development

## Before coding

1. Read `docs/main/` for context (unless config-only task)
2. Open active `docs/report/0N_Phase_N.md` — follow checklist order
3. Do not start Phase N+1 until user confirms previous Phase

## Step 1 — Main implementation

- Match `01_ImplementationRoadmap.md` + active Phase report
- References: `01-ARCHITECTURE`, `02-COMPONENT-SPEC`, `03-CONTENT-SCHEMA`, `05-CONVENTIONS`
- Run phase gate:

```powershell
npm exec --yes pnpm@9.15.9 typecheck
npm exec --yes pnpm@9.15.9 build
```

Also verify: no `middleware.ts` / `proxy.ts`

Update Phase report checkboxes, `00_ReportIndex`, `docs/log/log.md`.

## Step 2 — Review subagent (mandatory after Step 1)

Launch `explore` subagent (thoroughness: **very thorough**):

- Compare implementation vs active Phase report + conventions
- Check import rules, i18n, Server/Client, build pass
- Return: PASS / ISSUES (severity, file, fix) / follow-up needed (yes/no)

Do **not** report completion to user until review loop finishes.

## Step 3 — Refactor subagent (if follow-up needed)

Launch `generalPurpose` subagent with **only** review ISSUES as scope — minimal diff, no scope creep.

Then return to **Step 2**. Repeat until follow-up not needed.

## Step 4 — User completion report

- No "please review changes" or modification confirmation questions
- Brief summary: what was built + review outcome (+ refactor summary if any)
- Ask **only**: proceed to next Phase? (yes/no)

## Deploy note

Prd: Rocky Linux (iwinv). Update `packages/env/deploy.json` + `site.json` when IP/domain known.
