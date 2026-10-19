"use server";

import { cookies } from "next/headers";
import { backendUrl } from "@/lib/server-api";
import { cookieOptions } from "@/lib/security";
import { TOKEN_COOKIE, USER_COOKIE } from "@/lib/session";
import { fromBackend, toBackend } from "@/lib/caseConversion";
import type { BackendResult } from "@/interfaces/shared/BackendResult";

export const login = async (identifier: string, password: string): Promise<BackendResult> => {
  if (!identifier || !password) return { ok: false, status: 400, data: { error: "Email, username, or mobile number and password are required" } };
  try {
    const response = await fetch(backendUrl("/login"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(toBackend({ identifier, password })), cache: "no-store" });
    const data = await response.json();
    if (!response.ok) return { ok: false, status: response.status, data };
    const jar = await cookies();
    jar.set(TOKEN_COOKIE, data.token, cookieOptions);
    jar.set(USER_COOKIE, String(data.user_id), cookieOptions);
    return { ok: true, status: 200, data: fromBackend({ message: data.message, user_id: data.user_id }) };
  } catch { return { ok: false, status: 503, data: { error: "Server unavailable" } }; }
};

export const register = async (userName: string, email: string, password: string, mobileNumber: string): Promise<BackendResult> => {
  if (!userName || !email || !password) return { ok: false, status: 400, data: { error: "All fields are required" } };
  try {
    const response = await fetch(backendUrl("/register"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(toBackend({ userName, email, password, mobileNumber: mobileNumber || null })), cache: "no-store" });
    return { ok: response.ok, status: response.status, data: fromBackend(await response.json()) };
  } catch { return { ok: false, status: 503, data: { error: "Server unavailable" } }; }
};

export const logout = async (): Promise<BackendResult> => {
  const jar = await cookies();
  const token = jar.get(TOKEN_COOKIE)?.value;
  if (token) {
    try {
      const response = await fetch(backendUrl("/logout"), { method: "POST", headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
      if (!response.ok && response.status !== 401) return { ok: false, status: response.status, data: { error: "Sign out failed. Please retry." } };
    } catch { return { ok: false, status: 503, data: { error: "Server unavailable. Please retry sign out." } }; }
  }
  jar.delete(TOKEN_COOKIE);
  jar.delete(USER_COOKIE);
  return { ok: true, status: 200, data: { message: "Logged out" } };
};
