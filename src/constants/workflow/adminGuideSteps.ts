import type { WorkflowStep } from "@/interfaces/ui/workflow/WorkflowStep";

export const adminGuideSteps: readonly WorkflowStep[] = [
  { id: "catalog", title: "Prepare catalog records", description: "Open Catalog to sync country reference data and create author and publisher records. Add their descriptions and countries before assigning them to books." },
  { id: "book", title: "Add a book", description: "Open Add book, complete the required fields, select the author and publisher, set the condition and price, and upload a cover if needed. Submit once and wait for the result." },
  { id: "inventory", title: "Manage inventory", description: "Open Inventory to search, filter, sort, and page through books. Open a book to edit it. Select rows before applying an archive or soft-delete action, and check the confirmation before continuing." },
  { id: "files", title: "Import and export", description: "Use the Inventory import and export controls. Review the server's result for invalid rows or errors. Exports reflect the supported filters and format selected in the interface." },
  { id: "requests", title: "Review access requests", description: "Open Access requests to review pending applications. Approve or reject the selected request after checking the account. Use Manage roles, permissions & groups for detailed access assignments." },
];
