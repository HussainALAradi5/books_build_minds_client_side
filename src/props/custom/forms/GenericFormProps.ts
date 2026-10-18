import type { FormEvent } from "react";
import type { FormFieldDefinition } from "@/interfaces/shared/FormFieldDefinition";

export interface GenericFormProps<T> {
  fields: readonly FormFieldDefinition<T>[];
  onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  submitLabel: string;
  loading?: boolean;
  error?: string;
  compact?: boolean;
}
