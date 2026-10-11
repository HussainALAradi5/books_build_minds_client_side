import type { ErrorDto } from "./types";

export const API_BASE_URL = "/api/backend";

export class ApiError extends Error {
  constructor(message: string, readonly status: number) { super(message); this.name = "ApiError"; }
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { ...(init?.body && !(init.body instanceof FormData) ? { "Content-Type": "application/json" } : {}), ...init?.headers },
  });
  const data = await response.json().catch(() => ({})) as T & Partial<ErrorDto>;
  if (!response.ok) throw new ApiError(data.error || `Request failed (${response.status})`, response.status);
  return data;
}

export function uploadFiles<T>(path: string, files: File[]): Promise<T> {
  const body = new FormData();
  for (const file of files) body.append("files", file);
  return api<T>(path, { method: "POST", body });
}


