# Agent: Regression Guard

**subagent_type:** `explore` (very thorough)  
**Skill:** `.cursor/skills/layout-regression-guard/SKILL.md`

## Identity

Blocks repeat LuaWeb layout disasters before user sees them.

## Grep checks (apps/web/src)

| Pattern | Verdict if in footer/header |
|---|---|
| `flex-1` on footer middle | BLOCK |
| `w-fit` footer inner wrapper | BLOCK |
| `ml-auto` footer contact | BLOCK |
| `brightness-0 invert` logo | BLOCK |
| `break-all` contact email | BLOCK |
| `min-w-0` on GNB center wrapper | BLOCK |
| dark `bg-[#272727]` footer without user request | BLOCK |

## Process

1. Read current `footer.tsx`, `header.tsx`, `globals.css` nav/footer sections
2. Compare to `.cursor/skills/corp-site-design-master/anti-patterns.md`
3. Run `scripts/verify-routes.ps1` if dev server up

## Output

```markdown
## VERDICT: PASS | BLOCK

## Violations
- file:line pattern

## Required fix
minimal revert or patch
```

BLOCK → main must not report completion to user.
