export type QueryValue = string | number | boolean | undefined | null;
import { toSnakeCase } from "./caseConversion";

export const buildQuery = <T extends object>(filters: T): string => {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== "") query.set(toSnakeCase(key), String(value as QueryValue));
  }
  const encoded = query.toString();
  return encoded ? `?${encoded}` : "";
};
