"use server";

import { cookies } from "next/headers";
import { backendUrl } from "@/lib/server-api";
import { TOKEN_COOKIE } from "@/lib/session";
import { fromBackend, toBackend } from "@/lib/caseConversion";
import type { BackendResult } from "@/interfaces/shared/BackendResult";

const publicGet = [/^\/book\/[a-zA-Z0-9_.-]+\/(?:print|codes)$/, /^\/$/, /^\/book\/(?!manage$|export$|import$|bulk$)[a-zA-Z0-9_.-]+$/, /^\/book\/[a-zA-Z0-9_.-]+\/review$/, /^\/media\/books\/\d+$/, /^\/(?:countries|authors|publishers)(?:\/\d+)?$/];
const allowed = [
  /^\/transactions(?:\/(?:checkout|[a-f0-9-]{36})(?:\/(?:sync|cancel|receipt))?)?$/,
  /^\/$/, /^\/book$/, /^\/book\/[a-zA-Z0-9_.-]+(?:\/(?:purchase|receipt|loan|borrow|rent|return|review|print|codes|quote))?$/,
  /^\/book\/[a-zA-Z0-9_.-]+\/review\/(?:\d+|mine)$/, /^\/profile\/\d+(?:\/(?:edit|books|activities|loans))?$/,
  /^\/admin-requests(?:\/\d+)?$/, /^\/media\/books\/\d+$/, /^\/media\/profile-picture$/,
  /^\/countries(?:\/sync)?$/, /^\/authors(?:\/\d+)?$/, /^\/publishers(?:\/\d+)?$/,
  /^\/access\/(?:permissions|roles|groups)(?:\/[^/]+)?$/, /^\/access\/users(?:\/\d+)?$/,
];

const backendPath = (path: string, method: string) => {
  if (path === "/books") return method === "GET" ? "/" : "/book";
  if (path.startsWith("/books/")) return path.replace(/^\/books\//, "/book/").replace(/\/reviews(?=\/|$)/, "/review");
  if (path.startsWith("/accounts/admin-requests")) return path.replace("/accounts", "");
  if (path.startsWith("/accounts/")) {
    const mapped = path.replace(/^\/accounts\//, "/profile/");
    return method === "PUT" && /^\/profile\/\d+$/.test(mapped) ? `${mapped}/edit` : mapped;
  }
  return path;
};

export const requestBackend = async (path: string, method: string, body?: string | FormData): Promise<BackendResult> => {
  const parsed = new URL(path, "http://internal.invalid");
  const upstreamPath = backendPath(parsed.pathname, method);
  if (!path.startsWith("/") || path.startsWith("//") || !allowed.some((rule) => rule.test(upstreamPath)) ||
      !["GET", "POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    return { ok: false, status: 400, data: { error: "Invalid request" } };
  }
  const token = (await cookies()).get(TOKEN_COOKIE)?.value;
  if (!token && !(method === "GET" && publicGet.some((rule) => rule.test(upstreamPath)))) {
    return { ok: false, status: 401, data: { error: "Sign in required" } };
  }
  try {
    const payload = typeof body === "string" ? JSON.stringify(toBackend(JSON.parse(body))) : body;
    const upstream = await fetch(backendUrl(`${upstreamPath}${parsed.search}`), {
      method,
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(typeof body === "string" ? { "Content-Type": "application/json" } : {}) },
      body: method === "GET" ? undefined : payload,
      cache: "no-store",
    });
    const contentType = upstream.headers.get("content-type") || "";
    if (contentType.includes("application/pdf") || contentType.includes("spreadsheetml") || contentType.includes("text/csv")) {
      return { ok: upstream.ok, status: upstream.status, data: { base64: Buffer.from(await upstream.arrayBuffer()).toString("base64") } };
    }
    return { ok: upstream.ok, status: upstream.status, data: fromBackend(await upstream.json().catch(() => ({ error: "Invalid server response" }))) };
  } catch { return { ok: false, status: 503, data: { error: "Server unavailable" } }; }
};
