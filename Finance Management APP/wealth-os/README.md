# Wealth OS

Local-first personal finance dashboard — Task 1 app shell with mock data.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui-compatible CSS variables (`components.json` included)
- Lucide icons

## Run locally

```bash
cd wealth-os
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll land on `/dashboard`.

## Project structure

```
src/
  app/
    (app)/dashboard/     # Dashboard route + shell layout
  components/
    layout/              # Sidebar, topbar, app shell
    ui/                  # Metric card (shadcn-ready)
  data/mock/             # Mock dashboard data
  lib/utils.ts           # cn(), formatters
```

## Next steps

- Add shadcn/ui primitives (`npx shadcn@latest init` then button, sheet, etc.)
- Introduce a local data layer (e.g. SQLite via Prisma or Dexie in the browser)
- Wire Accounts and Transactions routes to real mock entities
