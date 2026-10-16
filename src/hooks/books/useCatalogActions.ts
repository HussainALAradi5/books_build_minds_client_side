"use client";
import { useSession } from "@/hooks/auth/useSession";
import { AccountRole } from "@/enums/accounts/AccountRole";
import { Permission } from "@/enums/accounts/Permission";
import { hasPermission } from "@/lib/access";
import { bookService } from "@/services/bookService";
import { downloadBase64 } from "@/lib/downloadBase64";
import type { BookFilters } from "@/interfaces/books/BookFilters";
import type { TableActions } from "@/props/custom/tables/TableActions";

export const useCatalogActions = (filters: BookFilters, reload: () => Promise<void>): TableActions | undefined => {
  const { user } = useSession();
  if (!user) return undefined;
  const admin = user.role === AccountRole.Admin;
  return {
    onExport: async (format, selected) => {
      const result = await bookService.export(filters, format, selected?.map(Number));
      const mime = format === "pdf" ? "application/pdf" : format === "csv" ? "text/csv" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      downloadBase64(result.base64, `library-books.${format}`, mime);
    },
    onImport: admin && hasPermission(user, Permission.BookImport) ? async (file) => { await bookService.import(file); await reload(); } : undefined,
    onBulk: admin && hasPermission(user, Permission.BookBulkEdit) ? async (ids, action) => {
      if (action !== "archive" && action !== "unarchive" && action !== "delete") throw new Error("Unsupported action.");
      await bookService.bulk(ids.map(Number), action); await reload();
    } : undefined,
    bulkActions: [{ value: "archive", label: "Archive" }, { value: "unarchive", label: "Unarchive" }, { value: "delete", label: "Soft delete" }],
  };
};
