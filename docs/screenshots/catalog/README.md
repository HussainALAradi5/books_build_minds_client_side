# Catalog screenshots

Captured on 16 October 2026 from the Next.js client with an isolated, server-seeded Flask database. The gallery shows the real catalog API and test accounts. Desktop width is 1440px; mobile width is 390px.

| View | Screenshot |
| --- | --- |
| Reader grid, light | ![Book cards](desktop.png) |
| Searchable publisher dropdown | ![Publisher search](publisher-dropdown.png) |
| Reader list, light | ![Book list](list-desktop.png) |
| Administrator list with row selection and import/export | ![Admin table actions](admin-list.png) |
| Reader grid, dark | ![Dark catalog](desktop-dark.png) |
| Mobile grid, light | ![Mobile catalog](mobile.png) |
| Mobile grid, dark | ![Dark mobile catalog](mobile-dark.png) |
| Mobile list, light | ![Mobile list](mobile-list.png) |

The grid/list switch and table action controls are reusable across `GenericTable` consumers. Export uses the server endpoint and respects selected rows; only an administrator with the corresponding permissions sees import and bulk actions. Import and bulk changes are enforced by the server.
