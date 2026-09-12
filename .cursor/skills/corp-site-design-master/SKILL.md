---
name: corp-site-design-master
description: >-
  Corporate IR/company-site UI design master for human-perceived layout, typography,
  and proportions. Uses Lua design tokens and Korean/global B2B corporate patterns.
  Use when footer/header/layout looks wrong to users, wide-screen spacing issues,
  typography imbalance, or user asks for designer agent / human-eye UI review.
---

# Corp Site Design Master (Human-Eye UI)

## Mission

**Optimize for human perception, not AI checklist completion.**

- One change axis per iteration (layout OR typography OR color — never all three)
- Preserve working interaction design (hover, GNB, lang switcher) unless user asks
- Compare against Lua site tokens and corp IR patterns before proposing CSS

## When to invoke

- User says layout "gets worse", "crowded left", "email too far right", font too big/small
- Footer/header wide-screen (1440, 2560) complaints
- Before merging any layout PR touching `header.tsx`, `footer.tsx`, `globals.css` container/typography

## Design reference set (fetch CSS/HTML when unsure)

| Site | Role | Key tokens |
|---|---|---|
| luacorp.co.kr (this site) | Primary | container 1400px, footer 3-column, lua-type-* tokens |
| Samsung Biologics IR | Global pharma | wide container, calm footer density |
| Celltrion | KO tech/bio | strong header, readable footer |
| SK bioscience | KO corporate | section rhythm |
| Recursion / Moderna | EN tech | hero scale reference |

## Human-eye review loop (mandatory)

```
1. Read user screenshot description OR fetch reference site CSS
2. Diagnose ONE root cause (e.g. flex-1, ml-auto, mismatched type scale)
3. Propose minimal diff — max 2 files
4. typecheck + scripts/verify-routes.ps1
5. Report: before/after in plain Korean, what human should see at 375/1440/2560
```

**Stop rule:** If second iteration still fails user screenshot, revert to last git-good layout shell and only adjust typography tokens.

## Typography policy (mandatory — do not ask user)

Source: `globals.css` `:root --lua-fs-*` + `.lua-type-*`

| Token | Use |
|---|---|
| `lua-type-hero` | Home hero |
| `lua-type-page-title` | Sub-page H1 |
| `lua-type-section-title` | Section H2 |
| `lua-type-subtitle` | Hero desc, card titles |
| `lua-type-body` | Main content (content1) |
| `lua-type-body-sm` | Secondary content (content2), footer address/contact |
| `lua-type-caption` | Meta, copyright, lang switcher |
| `lua-type-label` | Uppercase tags |
| `lua-nav-link` / `lua-type-nav-sub` | GNB |
| `lua-logo-footer` | 120→200px, **no max-h cap** |
| `lua-logo-header` | Proportional to header bar |

**Never** add raw `text-sm`/`text-xs` on header/footer when a token exists.

## Footer — compact mockup recipe (user reference)

```
Row1 (items-center): [Logo fluid] | [Address 1 line, center] | [문의하기 + 이메일 label value same line]
Row2 (center, mt-5): copyright → privacy (below)
py-6~8, no border rows on contact, no copyright under address
```

| Token | Value |
|---|---|
| Container | `siteContainerClass` (1400→1720) |
| Row | `flex justify-between` — **never** `flex-1` on middle, **never** `w-fit` + huge gap |
| Address & contact value | same class, 14→15→16px |
| Copyright | 14px muted |
| Tag column | 60px grid, bold secondary uppercase |
| Logo | 120px mobile → 200px desktop, max-h on img mobile |
| Forbidden | `brightness-0 invert`, `break-all`, dark bg without user request |

## Header — preserve P0 interaction

- Keep: `flex justify-between`, white submenu, pill lang switcher, lua-nav-link hover underline
- Scale only: `lg:text-sm xl:text-[15px] 2xl:text-base` on GNB
- Forbidden: grid + `min-w-0` on GNB column (causes vertical KO text break)

## Viewports (must verbalize)

| Width | Check |
|---|---|
| 375 | footer stack, logo max-h, no horizontal scroll |
| 768 | LNB tabs |
| 1024 | GNB horizontal, no char-per-line break |
| 1440 | footer 3-column balance |
| 2560 | container cap, not tiny island center |

## Output format

```markdown
## Human-eye diagnosis
- Root cause: ...
- User will see: ...

## Change (minimal)
- file: one-line why

## Verify
- [ ] 375 / 1440 / 2560 described
- [ ] verify-routes.ps1 pass
```

## Anti-patterns (LuaWeb history)

See [anti-patterns.md](anti-patterns.md)

## Integration

- **Orchestrator:** `lua-ui-orchestrator` — Master step uses **this skill**, not generic scoring
- **Subagent:** `generalPurpose` with prompt "Follow corp-site-design-master SKILL.md"
- **Do not** change header hover colors or footer background when task is layout-only
