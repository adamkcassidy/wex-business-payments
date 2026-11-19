# Patterns and behaviors

How things work, not just how they look. Add a section the first time a pattern is used on a screen.

## Page structure

- **Decided:** every screen sits in the app shell. The header holds the page title on the left and page-level actions on the right, with at most one primary action.

## Tables and lists

- **Decided:** tables load less by default so pages stay fast. Activity tables (transactions, payments) default to the last 30 days. Inactive records (closed or expired cards, deactivated users) are hidden. Users can change the date range, show inactive records, and change rows per page.
- **Proposed:** detail views load in sections, so the summary appears first and slower sections fill in.

Still to decide on the cards list: filters, sorting, row actions, bulk actions, and density.

## Forms and multi-step flows

Not decided yet. The "Issue a virtual card" flow will set this.

## Confirmations and feedback

- **Proposed:** destructive or irreversible actions use an Alert Dialog. Reversible actions run immediately and show a toast with Undo.

## Permissions and roles

- **Decided:** a user's access has three parts, set separately. The role sets what they can do; for managers, that includes which products they manage. Account access sets where, either some accounts or all of them. Department access, for managers only, optionally narrows which cards and people they see.
- **Decided:** the product follows what the account has turned on. Navigation, dashboard widgets, reports, statements and the role picker only show Cards or Payments when that product is on. See the 2026-11-18 roles entry in `decisions.md`.
- **Proposed:** detailed permissions are defined screen by screen as screens are designed, not up front. They're tracked in one matrix: about 10–15 abilities grouped by area (Cards, Payments, Users and settings, Statements and reports), each marked Full, View only, Own only, or none for each role.
- **Proposed:** customers never see individual permissions. The role picker shows a plain-language summary of what each role can and can't do.
- **Proposed:** what sensitive data each role sees, such as full card numbers, is a fixed default for that role, not a separate setting.

Still to decide: whether controls a user can't use are hidden or disabled.
