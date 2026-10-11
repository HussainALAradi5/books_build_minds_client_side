# Books Builds Minds client

Next.js App Router client with TypeScript and Chakra UI. Node.js 20.9 or newer is required.

```powershell
Copy-Item .env.example .env.local
npm ci
npm run dev
```

Set `BACKEND_URL` in `.env.local` to the Flask origin and open `http://localhost:3000`. Catalog sample data is seeded by the server; the client has no separate demo catalog. Browser actions use typed services and one `apiClient` utility that calls protected Next.js server functions. Authentication uses HttpOnly cookies. Public book and review reads remain available without a session; purchases, review writing, account actions, and administration require authorization on the server.

Route pages in `src/app` render feature views. Render components live under `src/Components`, behavior under `src/hooks`, server calls under `src/services`, and contracts under `src/interfaces`, `src/props`, and `src/enums`. Each entity interface extends `BaseEntity`; request filters extend `PaginationFilter`. Comments and ratings are combined in purchase-gated reviews. The review form and list are under `books/reviews`.

Run `npm run typecheck`, `npm run lint`, and `npm run build` before deployment. The client and server are separate local Git repositories.
