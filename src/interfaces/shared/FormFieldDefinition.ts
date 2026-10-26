import type { BadgeProps } from "@chakra-ui/react";
import type { SelectOptionPage } from "@/interfaces/ui/SelectOptionPage";

export interface FormFieldDefinition<T> {
  name: Extract<keyof T, string>;
  label: string;
  inputType?: "text" | "date" | "number" | "url" | "textarea";
  valueType?: "text" | "number" | "numberList";
  required?: boolean;
  nullable?: boolean;
  min?: string;
  step?: string;
  defaultValue?: string;
  options?: readonly { value: string; label: string }[];
  layout?: "full" | "half";
  optionColors?: Record<string, NonNullable<BadgeProps["colorPalette"]>>;
  loadOptions?: (query: string, page: number) => Promise<SelectOptionPage>;
  multiple?: boolean;
}
