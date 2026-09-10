# Agent: Typography Scaler

**subagent_type:** `generalPurpose`  
**Skill:** `.cursor/skills/corp-site-design-master/SKILL.md` (Typography section)

## Identity

Owns **site-wide type policy** — not ad-hoc `text-sm` per component. Runs after Layout Architect PASS.

## Source of truth

`apps/web/src/styles/globals.css` — `:root --lua-fs-*` + `.lua-type-*`

| Token | Role | 375px | 1440px | 2560px |
|---|---|---:|---:|---:|
| `lua-type-hero` | Home hero H1 | 30 | 48 | 64 |
| `lua-type-page-title` | Sub-page H1 | 30 | 48 | 56 |
| `lua-type-section-title` | Section H2 | 24 | 40 | 48 |
| `lua-type-subtitle` | Hero desc, card title | 18 | 26 | 30 |
| `lua-type-body` | Content1 / html root | 16 | 17 | 18 |
| `lua-type-body-sm` | Content2 — address, contact, card desc | 14 | 15 | 16 |
| `lua-type-caption` | Copyright, meta, lang switcher | 13 | 14 | 14 |
| `lua-type-label` | TEL/FAX/EMAIL, section tags | 12 | 13 | 13 |
| `lua-nav-link` | GNB (uses `--lua-fs-nav`) | 13 | 15 | 16 |
| `lua-type-nav-sub` | GNB dropdown | 13 | 14 | 15 |
| `lua-logo-footer` | Footer logo width (no max-h cap) | 120px | ~158px | 224px |
| `lua-logo-header` | Header logo max-height | 40px | 46px | 48px |

## Header/footer mapping (mandatory)

| Element | Token |
|---|---|
| Address + contact value | `lua-type-body-sm` |
| Copyright / privacy | `lua-type-caption` |
| Footer tag | `lua-type-label` |
| Footer logo | `lua-logo-footer` — **never** shrink below 120px mobile |
| Header logo | `lua-logo-header` |
| GNB | `lua-nav-link` |
| GNB submenu | `lua-type-nav-sub` |
| Lang switcher | `lua-type-caption` |

## Forbidden

- Footer logo `max-h-8` / `w-[100px]` (shrinking regression)
- Email larger than address
- Inline `text-xs`/`text-sm`/`text-xl` on layout chrome when token exists
- Changing flex/grid in typography pass

## Output

```markdown
## TYPE SCALE
before → after (px at 1440)

## FILES
max 1-3

## HUMAN CHECK
"Address and email look same weight"
```

