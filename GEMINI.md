# Project: ZiCON Customer Portal

## What this is
A customer-facing dashboard/portal for ZiCON, with sections for an IDE, "ZiCON Bolt," and a developer portal. Includes an announcements feed.

## Tech stack
- Language: TypeScript
- Framework: React 18 + Vite 5
- Styling: Tailwind CSS
- Backend/DB: Supabase (Postgres + client SDK)
- Icons: lucide-react
- Linting: ESLint (flat config)

## Conventions
- Source lives in `src/` — main entry `src/main.tsx`, root component `src/App.tsx`
- Supabase client is initialized in `src/lib/supabase.ts`, reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from env
- Database migrations live in `supabase/migrations/` (SQL files, timestamped)
- `dist/` is build output — do not hand-edit, do not commit (now gitignored)
- Run `npm run dev` for local dev, `npm run build` to build, `npm run lint` and `npm run typecheck` before committing

## Current status
Repo structure just cleaned up (was nested inside a duplicated folder). Has a working landing/dashboard UI (`App.tsx`) with nav sections (Dashboard, IDE, ZiCON Bolt, Developer Portal) and a default set of announcements. One Supabase migration exists for a `portal_announcements` table — need to confirm whether the UI is already wired to read from it live or still using the hardcoded `defaultAnnouncements` array.

## Next steps
- [ ] Confirm Supabase env vars are set locally (`.env`, gitignored, not committed)
- [ ] Wire announcements UI to Supabase table if not already done
- [ ] [Add your next planned feature here]

## Notes / gotchas
- This is a **public** GitHub repo — never commit `.env` or real Supabase keys. `.gitignore` now covers this.
- `package.json` name is still the Vite starter default (`vite-react-typescript-starter`) — consider renaming.
