# Books Builds Minds — client repository

This is the **client** repository for Books Builds Minds. The matching [server repository](https://github.com/HussainALAradi5/books_build_minds_server/blob/main/README.md) provides the catalog, authentication, permissions, uploads, workflows, and demo data. The [documentation repository](https://github.com/HussainALAradi5/books_build_minds_documentation/blob/main/README.md) describes each service and endpoint. The related repository links point to the published GitHub repositories.

## Related repositories

| Repository | GitHub link | What it contains |
| --- | --- | --- |
| Client | This repository | Next.js pages, Chakra UI components, hooks, typed API services, and screenshots |
| Server | [Open server repository](https://github.com/HussainALAradi5/books_build_minds_server/blob/main/README.md) | Flask API, business rules, PostgreSQL models, migrations, and demo seeding |
| Documentation | [Open documentation repository](https://github.com/HussainALAradi5/books_build_minds_documentation/blob/main/README.md) | Setup guides and feature-by-feature service and endpoint references |

The related repository links point to the published GitHub repositories.

## Preview

Chakra UI tabs and workflow guides organize profile, administration, access management, and book detail sections.

Read the [security controls and deployment requirements](https://github.com/HussainALAradi5/books_build_minds_documentation/blob/main/security/README.md) before exposing a live service.

The catalog has responsive book cards, a searchable publisher filter, condition badges, a grid/list switch, and administrator table actions.

The catalog list and book page show a copy-availability bar based on available and total copies. A separate, labeled wear scale uses the book's condition category (New, Good, Fair, or Damaged) without presenting it as a measured percentage. The reusable animated progress bar also marks each step of the library workflow and guide.

On a book page, small **About the author** and **About the publisher** buttons open read only profiles with country, description, and works. Reviews appear below. A reusable information card near the title shows publisher, publication date, ISBN, and condition. Administrators can change an existing book's price in a compact dialog. Other book fields and existing creator profiles are fixed after creation.

The information card also shows the price as a badge, the book's real description from the server, copy availability, and purchase, PDF, borrowing, and rental actions. Purchase and PDF appear together near the book facts. On narrow screens, the details and actions come before the cover so readers can act without scrolling past a tall image. A small **How it works** guide lives in the navbar. Reviews hide soft-deleted entries by default. Administrators can turn on **Show deleted reviews** to inspect marked, read-only deleted entries; the server rejects this filter for other roles.

## Screenshots

Current captures from the client and an isolated local Flask demo (19 October 2026). Desktop and tablet views use light mode; phone views use dark mode. The borrowing screenshots follow a real loan created in that demo database. The purchase image stops at confirmation before gateway checkout. The transaction card is a **seeded failed sandbox example**, not a completed payment or receipt. Password recovery shows the request form without live email delivery.

| Experience | Wider view | Smaller view |
| --- | --- | --- |
| Home | ![Home on desktop](docs/screenshots/current/home-desktop-light.png) | ![Home on phone](docs/screenshots/current/home-mobile-dark.png) |
| Catalog cards | ![Catalog cards on desktop](docs/screenshots/current/catalog-grid-desktop-light.png) | ![Catalog card on phone](docs/screenshots/current/catalog-cards-mobile-dark.png) |
| Catalog list and tablet layout | ![Catalog list on desktop](docs/screenshots/current/catalog-list-desktop-light.png) | ![Catalog cards on tablet](docs/screenshots/current/catalog-tablet-light.png) |
| Book details | ![Book details on desktop](docs/screenshots/current/book-desktop-light.png) | ![Book details on phone](docs/screenshots/current/book-mobile-dark.png) |
| Author information | ![Author profile dialog on desktop](docs/screenshots/current/author-dialog-desktop-light.png) | ![Author profile dialog on phone](docs/screenshots/current/author-dialog-mobile-dark.png) |
| Sign in | ![Sign in on desktop](docs/screenshots/current/login-desktop-light.png) | ![Sign in on phone](docs/screenshots/current/login-mobile-dark.png) |
| Registration | ![Registration on tablet](docs/screenshots/current/register-tablet-light.png) | ![Registration on phone](docs/screenshots/current/register-mobile-dark.png) |
| Password recovery | — | ![Password recovery on phone](docs/screenshots/current/password-reset-mobile-dark.png) |
| Library guide | — | ![Library guide on phone](docs/screenshots/current/library-guide-mobile-dark.png) |
| Borrowing terms | ![Borrowing terms step](docs/screenshots/current/borrow-terms-desktop-light.png) | — |
| Borrowing confirmation | ![Borrowing confirmation step](docs/screenshots/current/borrow-confirm-desktop-light.png) | — |
| Active loan | ![Active loan on desktop](docs/screenshots/current/profile-loans-desktop-light.png) | ![Active loan card on phone](docs/screenshots/current/profile-loan-card-mobile-dark.png) |
| Return confirmation | — | ![Return confirmation on phone](docs/screenshots/current/return-confirm-mobile-dark.png) |
| Purchase confirmation | ![Purchase step before sandbox checkout](docs/screenshots/current/purchase-confirm-desktop-light.png) | — |
| Seeded failed transaction | ![Failed sandbox transaction on desktop](docs/screenshots/current/profile-transactions-desktop-light.png) | ![Failed sandbox transaction on phone](docs/screenshots/current/profile-transaction-card-mobile-dark.png) |
| Administration | ![Inventory administration on desktop](docs/screenshots/current/admin-inventory-desktop-light.png) | ![Access management on phone](docs/screenshots/current/admin-access-mobile-dark.png) |

The [screenshot index](docs/screenshots/README.md) links to every current capture, including filters, reviews, activity, publisher information, price editing, and responsive role management.

## Run locally

Use Node.js 24 for this project (pinned in `.nvmrc` and `package.json`). The client build and type checks are verified on Node 24. On this Windows environment, Node 25.2.1 produced `EPERM` errors writing build output. Select Node 24 in your terminal before running npm commands.

Development and production builds use separate generated directories, so `npm run build` can run while the development server is open.

1. Follow the [server setup](https://github.com/HussainALAradi5/books_build_minds_server/blob/main/README.md) to run Flask and seed the test accounts.
2. Install client dependencies and create local configuration:

   ```powershell
   Copy-Item .env.example .env.local
   npm ci
   ```

3. Set both `BACKEND_URL` and `NEXT_PUBLIC_BACKEND_URL` in `.env.local` to the Flask origin, normally `http://127.0.0.1:5000`. The first is used by server functions; the second loads media and connects Socket.IO in the browser.
4. Start Next.js with `npm run dev`, then open `http://localhost:3000`.

Start Flask before opening the client. Check `http://127.0.0.1:5000/api/?per_page=3` in your browser; it should return JSON. If Flask is stopped or `BACKEND_URL` points to another port, the home page shows a connection message and **Try again** instead of crashing. Restart the server and reload the page.

The client has no separate demo catalog; `flask --app app seed-demo --test-accounts` populates server data. Never commit `.env.local`.

Catalog search, sorting, pagination, and **Reset filters** request fresh results from Flask through Next.js's same-origin `/catalog-data` proxy. They update the book results in place without navigating or reloading the page.

## Test the user journeys

After running `seed-demo --test-accounts` on the server, sign in at `/login`:

| Role | Username | Password | Try this |
| --- | --- | --- | --- |
| Administrator | `demo_admin` | `LibraryAdmin2026!` | Open **Admin** to add books and manage catalog records, roles, groups, and permissions; change an existing book's price from its detail page. |
| Employee | `demo_employee` | `LibraryStaff2026!` | Browse books, borrow or rent, purchase, and manage your own profile. Admin pages remain restricted. |
| Client | `demo_client` | `LibraryReader2026!` | Borrow or rent a book, return it, purchase a book, download its receipt, then write a review. |

Anonymous visitors can browse the catalog and reviews, and register as a client. The seeded `demo_visitor` record is inactive and cannot sign in. Employees currently start with the same member permissions as clients; an admin can assign extra roles or groups through access management.

Sign in with email, username, or an optional international mobile number and a required password. **Forgot password?** sends a six-digit code to the account's saved email, even when the username or mobile number identifies it. Configure server-side email delivery before using the reset page; the client never receives the code from the API.

## Structure

| Path | Purpose |
| --- | --- |
| `src/app` | Thin Next.js route pages and layouts |
| `src/server/views` | Route-level data loading and access checks before rendering components |
| `src/config/backendUrl.ts` | Shared server-side backend origin and API URL construction |
| `src/Components/custom` | Reusable Chakra UI buttons, forms, tables, filters, pagination, dialogs, and upload controls |
| `src/Components/*` | Catalog, book, profile, and admin rendering components |
| `src/constants` | Typed form fields, catalog presentation values, and workflow steps |
| `src/hooks` and `src/providers` | State, actions, and feature context |
| `src/services` | Typed API functions using the shared `apiClient` |
| `src/interfaces`, `src/props`, `src/enums` | Client contracts, component props, enum labels and colors |
| `src/server/services` | Protected Next.js server actions and backend request forwarding |
| `docs/screenshots` | Desktop and mobile light/dark screenshots |

Catalog and book pages get their initial typed data through `src/server/services/bookQueryService.ts`. In the browser, `useBookCatalog` calls `bookService.catalog`, which requests server-filtered and paginated data. Profile and administration components call their typed hooks, which use the corresponding services in `src/services`. Table columns and form definitions live in `src/constants`; components render the results. Static headings and marketing copy are presentation text, while books, publishers, users, loans, requests, and reviews come from the server.

The browser uses typed service functions and an HttpOnly session cookie. Public catalog and review reads work without a session. The API enforces all protected actions; client guards only control what the user sees. Reviews combine a rating, comment, and optional description, and require a purchase.

## Verify

```powershell
npm run typecheck
npm run lint
npm run build
```

See the [feature documentation](https://github.com/HussainALAradi5/books_build_minds_documentation/blob/main/README.md).

## Print a book record

On a book page, choose **Download book PDF** or **Show QR and barcode**. The server generates both codes and the printable document. Use a keyboard-mode scanner in catalog search to find the printed inventory identifier. See [printing setup](https://github.com/HussainALAradi5/books_build_minds_documentation/blob/main/features/books/printing/README.md).

## Guided borrowing and BHD sandbox payments

Borrowing now requires a server quote, accepted library terms and final confirmation. Purchases and rentals use Tap's BHD sandbox with persisted transactions and immutable PDF receipts. Delete/bulk changes use confirmation dialogs; failed changes remain visible for retry.

See [payment setup, services, endpoint contracts and release limits](https://github.com/HussainALAradi5/books_build_minds_documentation/blob/main/features/payments/README.md). Configure `TAP_SECRET_KEY` and the public HTTPS `TAP_WEBHOOK_URL` on the server. Live keys are rejected. Real sandbox verification still requires your own provider account and webhook. No secrets belong in the client repository.
