import type { ApiErrorResponse } from "@/interfaces/shared/ApiErrorResponse";
import { requestBackend } from "@/server/services/backendRequestService";

export class ApiError extends Error {
  constructor(message: string, readonly status: number) { super(message); this.name = "ApiError"; }
}

export const api = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const body = init?.body;
  if (body && typeof body !== "string" && !(body instanceof FormData)) throw new ApiError("Unsupported request body", 400);
  const response = await requestBackend(path, init?.method || "GET", body || undefined);
  const data = response.data as T & Partial<ApiErrorResponse>;
  if (!response.ok) throw new ApiError(data.error || `Request failed (${response.status})`, response.status);
  return data;
};

export const uploadFiles = <T>(path: string, files: File[]): Promise<T> => {
  const body = new FormData();
  for (const file of files) body.append("files", file);
  return api<T>(path, { method: "POST", body });
};
