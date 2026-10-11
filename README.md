# Books Builds Minds — client repository

This is the **client** repository for Books Builds Minds. The matching [server repository](../server/README.md) provides the catalog, authentication, permissions, uploads, workflows, and demo data. The [documentation repository](../documentation/README.md) describes each service and endpoint. These links work when the three repositories are cloned as sibling folders.

## Run locally

Node.js 20.9+ is required. Start the server first, then:

```powershell
Copy-Item .env.example .env.local
npm ci
npm run dev
```

Set `BACKEND_URL` in `.env.local` to the Flask origin, such as `http://127.0.0.1:5050`. Open `http://localhost:3000`. The client has no separate demo catalog; `flask --app app seed-demo` populates server data. Never commit `.env.local`.

## Structure

| Path | Purpose |
| --- | --- |
| `src/app` | Thin Next.js route pages and layouts |
| `src/features` | Feature view composition and access guards |
| `src/Components/custom` | Reusable Chakra UI buttons, forms, tables, filters, pagination, dialogs, and upload controls |
| `src/Components/*` | Feature render components, including the admin access page |
| `src/hooks` and `src/providers` | State, actions, and feature context |
| `src/services` | Typed API functions using the shared `apiClient` |
| `src/interfaces`, `src/props`, `src/enums` | Client contracts, component props, enum labels and colors |
| `src/server` | Protected Next.js server functions and backend request forwarding |
| `docs/screenshots` | Desktop and mobile light/dark screenshots |

The browser uses typed service functions and an HttpOnly session cookie. Public catalog and review reads work without a session. The API enforces all protected actions; client guards only control what the user sees. Reviews combine a rating, comment, and optional description, and require a purchase.

## Verify

```powershell
npm run typecheck
npm run lint
npm run build
```

See the [screenshot index](docs/screenshots/README.md) and the [feature documentation](../documentation/README.md). The repositories have no GitHub remote configured yet; add each remote after creating the corresponding GitHub repository.
