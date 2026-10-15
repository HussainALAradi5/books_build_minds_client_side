import type { SelectOptionPage } from "@/interfaces/ui/SelectOptionPage";
export interface GenericSearchSelectProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  loadOptions: (query: string, page: number) => Promise<SelectOptionPage>;
}
