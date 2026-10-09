# WEX Business Payments (WBP)

A portfolio case study redesign of **WEX Business Payments**, a B2B payments web app. This is a personal, interactive prototype — not production code.

Design reference: [Figma — WEX Business Payments](https://www.figma.com/design/D3M4T3EIULiiFPjIQKoRYI/WEX-Business-Payments?node-id=1715-4841)

## Stack

- [React](https://react.dev) + TypeScript, built with [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) (Radix) — theme tokens kept 1:1 with the [shadcn Figma library](https://www.shadcndesign.com/docs) (Neutral)
- [Lucide](https://lucide.dev) icons
- [Inter](https://rsms.me/inter/) via Fontsource
- [React Router](https://reactrouter.com)

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint with oxlint |

## Project structure

```
src/
  components/
    app-layout.tsx        # SidebarProvider + sidebar + header + routed page
    app-sidebar.tsx       # Logo, account switcher, nav groups, user menu
    account-switcher.tsx  # Business account dropdown
    nav-user.tsx          # User/account dropdown in the sidebar footer
    site-header.tsx       # Page title + actions slot
    ui/                   # shadcn/ui components
  config/
    nav.ts                # Sidebar groups, items, icons, and routes
    account.ts            # Mock business accounts and current user
  lib/route-handle.ts     # Per-route title/actions for the header
  pages/                  # Route screens (placeholders for now)
```

Navigation is driven entirely by `src/config/nav.ts` — add an item there and it gets a sidebar entry and a route.
