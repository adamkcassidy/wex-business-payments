# Statuses

One status system across cards, transactions, and payments. Each status has one label, one meaning, and one badge token, wherever it appears.

- **Proposed:** a status always shows text, never color alone.

| Object | Status | Meaning | Badge token | Notes |
|---|---|---|---|---|
| User | Invited | Created and invited, but hasn't signed in yet. Can still hold cards. | Not decided | Proposed |
| User | Active | Has signed in at least once. | Not decided | Proposed |
| User | Deactivated | Can no longer sign in. Their cards are closed. | Not decided | Proposed |

The cards list and the declined-transaction screen will fill this in. Available badge tokens include `badge-success`, `badge-warning`, `badge-info`, `destructive-background`, and the color badges (`badge-blue`, `badge-amber`, …). Each has a matching `-foreground` token.
