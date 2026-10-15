import type { BookFilterForm } from "@/interfaces/books/BookFilterForm";
export interface BookFiltersProps {
  form: BookFilterForm;
  update: <K extends keyof BookFilterForm>(key: K, value: BookFilterForm[K]) => void;
}
