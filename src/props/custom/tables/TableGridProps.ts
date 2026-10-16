import type { GenericTableProps } from "./GenericTableProps";
export interface TableGridProps<T> extends Pick<GenericTableProps<T>, "rows" | "columns" | "getKey" | "renderCard"> {
  selected: (string | number)[];
  selectable: boolean;
  onToggle: (id: string | number) => void;
}
