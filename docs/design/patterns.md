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

Not decided yet. To cover: what admins and cardholders see, and whether missing permissions hide or disable controls.
