import type { EnumOption } from "@/interfaces/shared/EnumOption";

export const enumOptions = <T extends string>(values: Record<string, T>, labels?: Record<T, string>): EnumOption<T>[] =>
  Object.values(values).map((value) => ({
    value,
    label: labels?.[value] || value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase()),
  }));
