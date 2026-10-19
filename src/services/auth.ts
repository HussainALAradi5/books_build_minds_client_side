import { ApiError } from "@/lib/apiClient";
import { login, logout, register } from "@/server/services/authActionService";
import { requestResetCode, confirmResetCode } from "@/server/services/passwordResetActionService";
import type { ApiMessage } from "@/interfaces/shared/ApiMessage";

const unwrap = <T>(result: { ok: boolean; status: number; data: unknown }): T => {
  if (!result.ok) throw new ApiError((result.data as { error?: string }).error || "Request failed", result.status);
  return result.data as T;
};

export const auth = {
  login: async (identifier: string, password: string) => unwrap<ApiMessage & { userId: number }>(await login(identifier, password)),
  register: async (userName: string, email: string, password: string, mobileNumber = "") => unwrap<ApiMessage>(await register(userName, email, password, mobileNumber)),
  requestResetCode: async (identifier: string) => unwrap<ApiMessage>(await requestResetCode(identifier)),
  confirmResetCode: async (identifier: string, code: string, newPassword: string) =>
    unwrap<ApiMessage>(await confirmResetCode(identifier, code, newPassword)),
  logout: async () => unwrap<ApiMessage>(await logout()),
};
