---
name: layout-regression-guard
description: Blocks footer/header anti-patterns (flex-1, w-fit, invert logo, min-w-0 GNB). Use as Regression Guard agent before UI completion reports.
---

# Layout Regression Guard

## Role

Automated gate after layout edits. **BLOCK** merges that repeat known failures.

## Scan targets

- `apps/web/src/components/layout/footer.tsx`
- `apps/web/src/components/layout/header.tsx`
- `apps/web/src/components/layout/gnb.tsx`
- `apps/web/src/styles/globals.css` (nav/footer tokens only)

## BLOCK list

See `.cursor/skills/corp-site-design-master/anti-patterns.md`

Quick grep:

```powershell
rg "flex-1|w-fit|ml-auto|brightness-0 invert|break-all" apps/web/src/components/layout/
rg "min-w-0" apps/web/src/components/layout/header.tsx apps/web/src/components/layout/gnb.tsx
```

## Verify

```powershell
npm exec --yes pnpm@9.15.9 typecheck
powershell -File scripts/verify-routes.ps1 -BaseUrl http://localhost:3000
```

## Output

`VERDICT: PASS | BLOCK` + violations with file:line.

Agent definition: `.cursor/agents/regression-guard.md`
