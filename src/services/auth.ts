import { ApiError } from "@/lib/apiClient";
import { login, logout, register } from "@/server/services/authActionService";
import type { ApiMessage } from "@/interfaces/shared/ApiMessage";

const unwrap = <T>(result: { ok: boolean; status: number; data: unknown }): T => {
  if (!result.ok) throw new ApiError((result.data as { error?: string }).error || "Request failed", result.status);
  return result.data as T;
};

export const auth = {
  login: async (identifier: string, password: string) => unwrap<ApiMessage & { userId: number }>(await login(identifier, password)),
  register: async (userName: string, email: string, password: string) => unwrap<ApiMessage>(await register(userName, email, password)),
  logout: async () => unwrap<ApiMessage>(await logout()),
};
