# Decisions

Newest first. Each entry: what we chose, why, and what it rules out.

## 2026-11-19 — Every card belongs to a user; cards never move between people

**Decided.** Issuing a card to a person always creates that person as a user (or uses their existing user), and they get an invitation. Someone who never signs in still appears in the user list with their cards. Signing up later activates that existing user instead of creating a new one, so there's never a card to "connect" to a person after the fact. Cards assigned to a department rather than a person are unaffected.

- **Cards and roles are separate.** Any user can hold cards, whatever their role, and sees My cards. The Cardholder role is for people whose only access is their own cards.
- **A Cardholder's access comes from their cards.** Cardholders have no account-access setting. They see their own cards, in whatever accounts those cards belong to, and nothing else.
- **Cards never move between people.** To give someone else a card, close the old one and issue a new one to the new person.

Why: in EnCompass and WBP, admins could issue physical cards without creating the cardholder as a user. Many cardholders never registered, and those who did later needed their card "connected" to their new user, which led to requests to assign and unassign cards between users. Moving a physical card between people risks someone else knowing the PIN, breaks the chain of custody, and muddies the audit trail. Self-registered cardholders were also created at the Org level with a role that showed as blank, so admins at the Org Group level couldn't see them, editing them forced an Org assignment that would expose that Org's cards, and they couldn't later be given wider access. Users at the Customer level, a visible Cardholder role, and card-based access remove all of these.

**Proposed:** issuing a card to a new person requires their name and email, so they can be invited.

## 2026-11-18 — Products are turned on per account

**Decided.** The products are Cards (virtual cards, with physical cards as an option) and Payments (bill pay and supplier payments). Each account has one or both turned on, alongside its currency and credit line. "All accounts" shows everything turned on in any of the customer's accounts.

Products a customer doesn't use are hidden everywhere: navigation, dashboard widgets, reports, statements and the role picker. Cardholder exists only when Cards is on. A single "Explore products" entry for upselling may come later.

Why: customers already use WEX for cards only, payments only, or both. Competitors gate features the same way: Brex hides banking-only roles when a customer has no business account. Rules out showing unused products as disabled.

## 2026-11-18 — Users and roles: four standard roles, one per user

**Decided.** Users belong to the Customer, and there's one user list per customer. Each user has exactly one role:

- **Admin:** everything, including users, settings and spend controls.
- **Manager:** issues and manages cards, pays suppliers, and resolves declines and exceptions, for the products they're set to manage. No access to users or settings. The role is shown by what it manages: **Card manager**, **Payment manager**, or **Card and payment manager**. The "Manages" setting only appears when an account has both products.
- **Finance manager:** views spend, statements, rebates and reports, and pays statements. Can't issue cards or payments.
- **Cardholder:** sees and manages only their own cards, transactions, PIN and disputes.

Access is set separately from the role: which accounts a user can see, and for managers, optionally which departments.

Role names follow how competitors name roles, as people rather than teams (Ramp, Brex, BILL, Rho), and avoid clashing with department names like "Finance." One manager role with a product setting, instead of separate Card manager and Payment manager roles, keeps one role per user without forcing someone who does both into Admin. It follows Ramp's approach of a base role plus product capabilities. Custom roles aren't in the prototype; the case study notes that Implementation handles the rare exceptions.

Why: EnCompass offered roughly 300 individually listed permissions in internal terms (many of them one per report), let users hold several roles, and let users be created at both the Org Group and Org levels. Customers stacked roles and made near-copies ("Program Admin 2") to express where and whose, not just what, and nobody could easily see who had access to what. Research suggested about 80% of customers fit a common set of standard roles. Rules out stacked roles and permission-by-permission role building.

## 2026-11-18 — Customer structure: WEX → Customer → Account

**Decided.** The product has two levels. A Customer is the business with the WEX relationship. An Account holds one credit line, one currency and one statement. Customers split accounts however they need to, by legal entity, by region or another way. Every feature lives at one of these two levels, never "sometimes one, sometimes the other." Cards and payments are created in the same Account that holds their credit line.

Why: EnCompass, and WBP after it, used Org Group → Orgs → Companies. Users viewed at the Org Group or Org level and created cards and payments at the Org level, but credit lines, currencies and statements mostly sat on Companies below that. Every new card or payment needed a Company picked to tie it to a credit line. An Org could have several Companies in different currencies, so Org-level spend could be worked out but was a summary sitting one step away from the credit lines and statements behind it. Setups also varied: some customers had no Org Group, and large partners with thousands of their own customers were set up as a single Org Group, so the tiers meant different things for different customers. Most direct customers have fewer than 10 Orgs or Companies, and many have one.

## 2026-11-18 — Migrating the old structure; single-account customers

**Decided.** Each old Company with its own credit line becomes an Account. An old Org that only grouped cards or people, without separate credit, becomes a Department. Customers with one account never see the hierarchy: no account switcher and no "All accounts" option.

## 2026-11-18 — "All accounts" view for multi-account admins

**Decided.** Admins with access to more than one account can pick "All accounts" in the account switcher. That view rolls up the dashboard, spend, rebates and reports across accounts. Actions such as issuing a card, paying a supplier or changing a limit still happen inside a single account, so the account is always clear. This answers the multi-entity problem: one place to see combined spend and progress toward rebate tiers. Rules out cross-account bulk actions for now.

Creating from "All accounts": the form's first field is the account, and the rest of the form follows that account's currency and limits.

Currencies: combined totals are converted to the customer's base currency and labeled as an estimate, with each account's figure shown in its own currency alongside.

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