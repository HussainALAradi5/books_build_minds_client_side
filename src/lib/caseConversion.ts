export const toSnakeCase = (value: string): string => value.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
export const toCamelCase = (value: string): string => value.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());

const convertObjectKeys = (value: unknown, convert: (key: string) => string): unknown => {
  if (Array.isArray(value)) return value.map((item) => convertObjectKeys(item, convert));
  if (value === null || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [convert(key), convertObjectKeys(item, convert)]));
};

export const fromBackend = <T>(value: unknown): T => convertObjectKeys(value, toCamelCase) as T;
export const toBackend = (value: unknown): unknown => convertObjectKeys(value, toSnakeCase);
