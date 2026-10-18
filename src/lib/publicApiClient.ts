import { fromBackend } from "./caseConversion";

export const publicApiGet = async <T>(path: string): Promise<T> => {
  if (!path.startsWith("/") || path.startsWith("//")) throw new Error("Invalid public API path.");
  const response = await fetch(path, { cache: "no-store", credentials: "omit" });
  if (!response.ok) throw new Error(`Could not load results (${response.status}).`);
  return fromBackend<T>(await response.json());
};
