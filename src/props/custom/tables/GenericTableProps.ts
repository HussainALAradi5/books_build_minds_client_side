import type { TableColumn } from "./TableColumn";
import type { TableActions } from "./TableActions";
export interface GenericTableProps<T> { rows: T[]; columns: TableColumn<T>[]; getKey: (item: T) => string | number; emptyMessage: string; actions?: TableActions }
