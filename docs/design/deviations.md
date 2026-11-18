# Deviations from the WEX UI Kit

Anything a screen does that the kit doesn't provide as-is: custom-built pieces, detached instances, restyled components, and missing tokens.

Each entry has a status:
- **Open:** needs a decision.
- **Kit:** add it to the UI Kit.
- **Local:** keep it in the WBP file.
- **Replaced:** we switched to the kit's option.
- **Resolved:** no longer applies.

| Where | What | Closest kit option | Status |
|---|---|---|---|
| App shell, org switcher | Custom frame (name and chevron) instead of a kit component | `Sidebar / Header Button`, or a `Dropdown Menu` trigger | Open |
| App shell, user menu | Custom frame (avatar, name, email and chevron) | `Sidebar / Header Button`, or a `Dropdown Menu` trigger | Open |
| App shell, "new payments app" message | Custom frame with an inline link | `Alert` or `Item` | Open |
| App shell, message text | No base text style, because the text mixes muted and link colors | Set the base style to `text-xs` and keep the link as a range override | Open |
| App shell, sidebar toggle | Override bound to the old library's `tailwind colors/base/transparent` | Kit Ghost button fill | Resolved (override reset) |
