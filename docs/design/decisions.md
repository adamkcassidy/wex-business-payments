# Decisions

Newest first. Each entry: what we chose, why, and what it rules out.

## 2026-11-17 — Design screens in Figma first

**Decided.** New screens are explored in Figma before they're built in code. Code follows once a direction settles. The Figma nav (My cards, Quick cards, Corporate cards, Users, Payment history, Upload history, …) is newer than the code nav.

## 2026-11-17 — App shell is a local component

**Decided.** The sidebar and header live in one component in the WBP file. Each screen is an instance of it with a content slot, so nav changes update every screen.

## 2026-11-17 — Two libraries: WEX UI Kit and WEX Brand Assets

**Decided.** The WEX UI Kit holds shadcn components and all tokens. WEX Brand Assets (the CP Brand Library) holds logos, card art, brand colors, and gradients, and stays a separate published library. Both are enabled in the WBP file; the old shadcn library is not used.

## 2026-11-17 — Tokens are designed in Figma, generated into code

**Decided.** Token changes happen in the WEX UI Kit, then `src/styles/theme.css` is regenerated (see `.cursor/rules/figma-code-sync.mdc`). Screens and components use semantic tokens only, never palette colors.

## 2026-11-17 — Lucide icons only

**Decided.** Other icon sets were removed from the library.

## 2026-11-17 — Inter for UI text

**Decided.** `font-sans` is Inter. The kit also defines Roboto Mono (`font-mono`) and Poppins (`font-display`). Where display and mono are used is not decided yet.

## 2026-11-17 — No Code Connect; point component descriptions at this repo

**Proposed.** Code Connect isn't available on the current Figma plan, and no mappings exist. Instead, each component description ends with a `Code:` line linking to its file in this repo. This replaces the old links to the private `wex-gts` repos.

## Open questions

- **Mock data persona:** the Figma screens use Globex Organization Group and Alexandria Baker, while the code uses Acme Inc. and Adam Cassidy. Pick one set and use it everywhere.
