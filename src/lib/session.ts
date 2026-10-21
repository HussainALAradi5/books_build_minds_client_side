import { cookies } from "next/headers";
import { backendUrl } from "@/config/backendUrl";
import { fromBackend } from "./caseConversion";
import type { User } from "@/interfaces/accounts/User";

export const TOKEN_COOKIE = "bbm_session";
export const USER_COOKIE = "bbm_user";

export const getSessionUser = async (): Promise<User | null> => {
  const jar = await cookies();
  const token = jar.get(TOKEN_COOKIE)?.value;
  const userId = jar.get(USER_COOKIE)?.value;
  if (!token || !userId || !/^\d+$/.test(userId)) return null;
  try {
    const response = await fetch(backendUrl(`/profile/${userId}`), {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    return response.ok ? fromBackend<User>(await response.json()) : null;
  } catch { return null; }
};
