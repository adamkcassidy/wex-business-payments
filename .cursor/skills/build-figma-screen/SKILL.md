---
name: build-figma-screen
description: >-
  Build or edit a WBP screen in Figma from the WEX UI Kit and WEX Brand Assets,
  then audit it. Use when designing, assembling, or updating any screen, flow,
  modal, or panel in the WEX Business Payments Figma file.
---

# Build a WBP screen in Figma

Follows `.cursor/rules/figma-design.mdc` and `.cursor/rules/design-decisions.mdc`. Load the Figma `figma-use` and `figma-generate-design` skills before any `use_figma` call.

## Files and libraries

| | Key |
|---|---|
| WBP screens file | `D3M4T3EIULiiFPjIQKoRYI` (page "Designs") |
| WEX UI Kit library | `lk-7afce4ed7fe458a4678096fecf2e4ee5561ec1c123b01969126774d7bdbfad4f730870b4fe1244dd3fac13ceea7e27c618546895ab5657b345004ea9ef59b15c` (file `fnEkt5u9OYBlzOTEXoWuan`) |
| WEX Brand Assets library | `lk-cfdeb6a38f934b8db31c038f4dc162bd9b489f3a92072c992c72db1927397ef248ade530a8df00b2271378ad041c1175644a0d9dad4a15260ee29bcc1d125956` (file `VQOanmkay93nHFU64deRx0`) |

Pass both library keys as `includeLibraryKeys` on every `search_design_system` call. Ignore other libraries.

## Workflow

1. **Read the docs first.** Check `docs/design/` for decisions, statuses, terms, and patterns that apply to this screen.
2. **Plan the screen in chat.** List its sections and the kit component for each. Mark anything with no kit match as a deviation and ask before building it.
3. **Start from the app shell.** Each screen is an instance of the shell component, with its content built inside it. Never copy and paste the shell's layers.
4. **Find components.** Search the kit by component name (`Table`, `Badge`, `Card`, `Tabs`). Also look at the kit's "Pro Blocks (Application)" pages for layouts. These are references to rebuild with kit components, not to detach.
5. **Assemble section by section** with auto layout. Bind spacing, radius, and colors to kit variables, and apply kit text styles. Override text through component properties.
6. **Audit.** Copy `scripts/figma/audit-screen.js`, set `ROOT_IDS` to the new frame IDs, and run it with `use_figma`. Fix every finding, or flag it as a deviation if it's intentional.
7. **Check both modes.** Screenshot the frame with the Mode collection set to Light, then to Dark.
8. **Report back.** Include the screenshots, the components used, any deviations (also logged in `docs/design/deviations.md`), and open token or pattern questions. Record anything the user settles in `docs/design/`.

## Audit findings and what to do

| Finding | Usual fix |
|---|---|
| `notAutoLayout` | Convert the frame to auto layout |
| `absolute` | Put it back in the flow, or flag it if it's a real overlay |
| `rawColor` | Bind to a "3. Mode" token |
| `nonSemanticColor` | Swap the palette variable for the semantic token it stands for, and ask if there isn't one |
| `unboundSpacing` / `unboundRadius` | Bind to `spacing/*` or `border-radius/*` |
| `textWithoutStyle` | Apply a kit text style. Mixed-style text, such as an inline link, is OK if the base style is set |
| `localComponents` | Expected for WBP-specific components. Note candidates to promote to the kit |
