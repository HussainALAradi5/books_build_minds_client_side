import { cookies } from "next/headers";
import { backendUrl } from "./server-api";
import type { User } from "./types";

export const TOKEN_COOKIE = "bbm_session";
export const USER_COOKIE = "bbm_user";

export async function getSessionUser(): Promise<User | null> {
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
    return response.ok ? (await response.json()) as User : null;
  } catch { return null; }
}


