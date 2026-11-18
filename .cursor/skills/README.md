# Skills

Agent skills available in this project. Ours are written for WBP; third-party ones are copied in unchanged so they can be updated from their source.

## Ours

| Skill | What it does |
|---|---|
| `build-figma-screen` | Builds a WBP screen in Figma from the WEX UI Kit, then audits it |

## Third-party (don't edit; tailor through `docs/design/` instead)

| Skill | Source | Version | License |
|---|---|---|---|
| `nudge` | [Shift Nudge](https://shiftnudge.com/skill) by Studio MDS, LLC | 1.0 | Free to use. Share unchanged with its notice and link. Don't modify or sell it |
| `better-interface`, `better-accessibility`, `better-layout`, `better-writing`, `better-typography`, `better-colors`, `better-ui`, `interface-review`, `state-machine` | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) by Jakub Krehel | `276449a` | MIT (copy in each folder) |

`interface-review` passes reviews to `better-interface`, which uses every `better-*` skill. Keep that set together.

To update a third-party skill, copy the new version over the folder unchanged and update the version above.
