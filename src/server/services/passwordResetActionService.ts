"use server";

import { backendUrl } from "@/lib/server-api";
import { fromBackend, toBackend } from "@/lib/caseConversion";
import type { BackendResult } from "@/interfaces/shared/BackendResult";

const postReset = async (path: string, payload: object): Promise<BackendResult> => {
  try {
    const response = await fetch(backendUrl(path), {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toBackend(payload)), cache: "no-store",
    });
    return { ok: response.ok, status: response.status, data: fromBackend(await response.json()) };
  } catch {
    return { ok: false, status: 503, data: { error: "Server unavailable" } };
  }
};

export const requestResetCode = async (identifier: string): Promise<BackendResult> =>
  postReset("/password-reset/request", { identifier });

export const confirmResetCode = async (identifier: string, code: string, newPassword: string): Promise<BackendResult> =>
  postReset("/password-reset/confirm", { identifier, code, newPassword });
