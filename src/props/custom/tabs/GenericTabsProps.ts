import type { TabItem } from "@/interfaces/ui/tabs/TabItem";

export interface GenericTabsProps {
  items: readonly TabItem[];
  label: string;
  defaultValue?: string;
  appearance?: "line" | "segmented";
}
