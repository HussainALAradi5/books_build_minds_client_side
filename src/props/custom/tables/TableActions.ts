import type { TableBulkAction } from "@/interfaces/shared/TableBulkAction";

export interface TableActions {
  onExport?: (format: "pdf" | "xlsx" | "csv") => Promise<void>;
  onImport?: (file: File) => Promise<void>;
  onBulk?: (ids: (string | number)[], action: string) => Promise<void>;
  bulkActions?: TableBulkAction[];
}
