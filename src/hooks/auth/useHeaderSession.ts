"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "./useSession";
import { auth } from "@/services/auth";

export const useHeaderSession = () => {
  const { user, setUser } = useSession();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const logout = async () => {
    setBusy(true); setError("");
    try { await auth.logout(); setUser(null); router.push("/"); router.refresh(); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not sign out."); }
    finally { setBusy(false); }
  };

  return { user, busy, error, logout };
};
