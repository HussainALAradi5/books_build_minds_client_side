import type { FormFieldDefinition } from "@/interfaces/shared/FormFieldDefinition";

export const formDataToObject = <T extends object>(data: FormData, fields: readonly FormFieldDefinition<T>[]): T => {
  const output: Record<string, string | number | number[] | null> = {};
  for (const field of fields) {
    const raw = String(data.get(field.name) || "").trim();
    output[field.name] = field.valueType === "number" ? Number(raw) : field.valueType === "numberList"
      ? raw.split(",").filter(Boolean).map(Number) : field.nullable && !raw ? null : raw;
  }
  return output as T;
};
