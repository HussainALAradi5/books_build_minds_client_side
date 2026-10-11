# Books Builds Minds client

Next.js App Router, React, and TypeScript client. Requires Node.js 20.9 or newer.

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Open `http://localhost:3000`. Set `BACKEND_URL` in `.env.local` to the Flask origin, such as `http://127.0.0.1:5000`. The browser talks to Next.js `/api/backend`; authentication uses HttpOnly cookies. `DEMO_CATALOG=true` enables the preview catalog in production, if desired.

Checks: `npm run typecheck`, `npm run lint`, `npm run build`.

Route pages in `src/app` render views in `src/features`. Reusable components are grouped under `src/Components`, with contracts in `src/enums`, `src/interfaces`, and `src/props`. API clients are in `src/services`, hooks under `src/hooks`, and session context in `src/providers`.
