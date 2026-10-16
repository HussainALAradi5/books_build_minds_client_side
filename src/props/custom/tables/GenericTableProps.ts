import type { TableColumn } from "./TableColumn";
import type { TableActions } from "./TableActions";
import type { ReactNode } from "react";
import type { CollectionView } from "@/enums/shared/CollectionView";
export interface GenericTableProps<T> {
  rows: T[];
  columns: TableColumn<T>[];
  getKey: (item: T) => string | number;
  emptyMessage: string;
  actions?: TableActions;
  renderCard?: (item: T) => ReactNode;
  initialView?: CollectionView;
}
