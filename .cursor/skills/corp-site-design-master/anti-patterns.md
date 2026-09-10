# Corp Site Design — Anti-Patterns (LuaWeb lessons)

## Layout

| Anti-pattern | Symptom | Fix |
|---|---|---|
| `flex-1` on footer middle column | Email pushed to far right | Remove; use `justify-between` on 3 fixed columns |
| `ml-auto` on contact column | Huge dead zone | Only if benchmark explicitly uses it; prefer `justify-between` |
| `w-fit` footer inner + wide container | Left cluster + empty viewport | Full-width `justify-between` |
| `min-w-0` on GNB wrapper | Korean menu one char per line | Never on nav text; use `whitespace-nowrap` |
| `grid` 340px side columns + center `min-w-0` | GNB vertical collapse | Use `flex justify-between` header |

## Typography

| Anti-pattern | Symptom | Fix |
|---|---|---|
| `xl:text-[1.375rem]` on email only | Email louder than address | Single `lua-footer-body` for both |
| `clamp` on footer without cap | Text too large on 2560 | Cap at 16px body / 14px meta |
| Shrinking GNB to 13px only on xl | User: header too small | xl 15px, 2xl 16px |

## Brand

| Anti-pattern | Symptom | Fix |
|---|---|---|
| `brightness-0 invert` on color logo | User anger, white logo | Use asset as-is on light bg |
| Dark footer clone without white logo asset | Wrong brand | Light bg unless user requests dark + provides SVG |

## Process

| Anti-pattern | Symptom | Fix |
|---|---|---|
| Change layout + color + typography same commit | User: "gets worse each time" | One axis per commit |
| No screenshot read | Repeat same bug | Read image description before next edit |
| AI-only verify-routes | Misses visual gap | Describe 1440px layout in Korean before ship |
