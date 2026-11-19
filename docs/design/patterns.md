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

- **Decided:** a user's access has three parts, set separately. The role sets what they can do. Account access sets where, either some accounts or all of them. Department access, for Card and payment managers only, optionally narrows which cards and people they see. See the 2026-11-18 roles entry in `decisions.md`.
- **Proposed:** what sensitive data each role sees, such as full card numbers, is a fixed default for that role, not a separate setting.

Still to decide: whether controls a user can't use are hidden or disabled.
