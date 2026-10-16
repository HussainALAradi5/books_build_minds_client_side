import type { GenericStatusBadgeProps } from "@/props/custom/display/GenericStatusBadgeProps";
export interface GenericEnumSelectProps<T extends string> {
  label: string;
  value: T | "";
  labels: GenericStatusBadgeProps<T>["labels"];
  colors: GenericStatusBadgeProps<T>["colors"];
  onChange: (value: T | "") => void;
  allLabel?: string;
  includeAll?: boolean;
}
