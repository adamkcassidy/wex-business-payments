# Decisions

Newest first. Each entry: what we chose, why, and what it rules out.

## 2026-11-18 — Customer structure: WEX → Customer → Account

**Decided.** The product has two levels. A Customer is the business with the WEX relationship. An Account holds one credit line, one currency and one statement. Customers split accounts however they need to, by legal entity, by region or another way. Every feature lives at one of these two levels, never "sometimes one, sometimes the other." This replaces EnCompass's Org Group → Orgs → Companies, where features sat at different levels and setups varied by customer.

## 2026-11-18 — "All accounts" view for multi-account admins

**Decided.** Admins with access to more than one account can pick "All accounts" in the account switcher. That view rolls up the dashboard, spend, rebates and reports across accounts. Actions such as issuing a card, paying a supplier or changing a limit still happen inside a single account, so the account is always clear. This answers the multi-entity problem: one place to see combined spend and progress toward rebate tiers. Rules out cross-account bulk actions for now.

## 2026-11-18 — Prototype covers direct customers only

**Decided.** The prototype is built for direct customers. The partner model (Partner → Customer → Accounts) appears in the case study as a diagram, not as screens. The bank or financial-institution layer isn't shown.

## 2026-11-18 — Departments group cards inside an account

**Decided.** Cards and users can have a Department (or cost center). It's a single flat field used for filtering, reporting and approvals, not a tree that admins build. Rules out EnCompass-style nested card hierarchies.

## 2026-11-17 — Mock data persona: Acme Inc. and Adam Cassidy

**Decided.** The customer is Acme Inc., with accounts like "Acme Inc. - North America". The signed-in user is Adam Cassidy (adam.cassidy@acmeinc.com). The Figma shell still shows Globex Organization Group and Alexandria Baker, and gets updated when screens are built.

## 2026-11-17 — Third-party skills are tools; our docs are the standard

**Decided.** Shift Nudge (`nudge`) and Jakub Krehel's review skills are installed unchanged in `.cursor/skills/`. Where they disagree with a decided entry here, this file wins (see `.cursor/rules/third-party-skills.mdc`).

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