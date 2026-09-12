# Orchestrator — UI Agent Pipeline

## When

- User: footer, header, layout, wide screen, UI/UX, "별로", screenshot
- Any edit to `apps/web/src/components/layout/**`, layout sections, `globals.css` container/typography

## Main agent duties

1. **Do NOT** implement layout directly without running agents 3+4 after agent 1 (or 1+2).
2. Read user **screenshot description** first; quote the symptom in every Task prompt.
3. One axis per commit: layout pass → then typography pass.
4. **Typography policy is mandatory** — use `globals.css` `.lua-type-*` tokens; never ask user for px values. Footer logo `lua-logo-footer` (120→200px), never shrink.
5. After merge: `pnpm typecheck`, `scripts/verify-routes.ps1`, describe 375/1440/2560 in Korean.

## Step 1 — Layout Architect

```
Task generalPurpose — read .cursor/agents/layout-architect.md
Paste: user message + screenshot symptoms + current footer.tsx/header.tsx paths
Output required: DIAGNOSIS, MINIMAL DIFF (max 2 files), HUMAN PREVIEW at 1440px
```

Wait for result. Main applies **layout-only** diff.

## Step 2 — Typography Scaler (if layout PASS)

```
Task generalPurpose — read .cursor/agents/typography-scaler.md
Scope: footer/header type scale only, no flex/grid change
```

Main applies typography diff only if Step 1 merged.

## Step 3 — Visual QA Reviewer

```
Task explore very thorough — read .cursor/agents/visual-qa-reviewer.md
Include: "User screenshot said: …" + list changed files
Verdict: PASS | FAIL with severity
```

**FAIL → do not tell user "done"; fix or revert.**

## Step 4 — Regression Guard

```
Task explore very thorough — read .cursor/agents/regression-guard.md
Grep: flex-1, ml-auto, w-fit, invert, break-all, min-w-0 on nav
Verdict: PASS | BLOCK
```

## User report template

```markdown
### UI 변경 (에이전트 파이프라인)
- Layout Architect: …
- Visual QA: PASS/FAIL
- Regression Guard: PASS/BLOCK
- 1440px에서 보이는 것: …
```

Never claim layout is complete without Visual QA PASS.
