# Green Valley Farms – Prototype

Clickable prototype of a farmland sales **CRM + customer platform**: public plot map and site-visit booking, customer portal,
and an internal CRM with role-based views (Admin, Moderator, Sales Person, Agent).

> All project names, buyer profiles and phone numbers are fictional sample data. Business rules shown (incentives,
> commissions) are placeholders, not approved rules.

**Stack:** React 18 · TypeScript (strict) · Vite 5 · Tailwind CSS 3 · ESLint 9 · Prettier

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build
npm run lint
```

## Structure

```
src/
├── main.tsx                 # entry (StrictMode + ErrorBoundary)
├── App.tsx                  # <AppProvider><AppShell/></AppProvider>
├── types/                   # domain types (Plot, Lead, HierarchyNode, OfferRule, CrmTab …)
├── data/                    # mock datasets (replace with API calls)
├── utils/                   # pure helpers (INR formatting)
├── hooks/useAppStore.ts     # prototype state + business-rule handlers
├── context/AppContext.tsx   # provider + useApp()
├── components/
│   ├── ui/                  # Icon, StatusBadge (icon + colour + label)
│   ├── layout/              # AppShell, Header, Footer, Toasts
│   └── ErrorBoundary.tsx
└── features/
    ├── auth/                # forgot-password wizard
    ├── customer/            # Home, PlotMap, Enquiry, Reserve, Portal, CustomerNav
    └── crm/                 # Login, workspace shell, dashboards, queue, hierarchy, offers, setup …
```

Path alias: `@/` → `src/`.

## Responsive & accessibility

Designed for 320 px phones through large desktops: wrapping header and role bar, scrollable tab bar, card lists instead of
tables on small screens, list/map toggle for plots, bottom-sheet plot details. Status is never colour-only; icon buttons
have labels; focus rings are visible.

## Moving to production

The store in `hooks/useAppStore.ts` is the seam: replace mock data and handlers with API/query hooks, add real
authentication and server-side RBAC, and enforce plot locking (double-booking) on the server.
