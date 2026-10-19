"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/services/auth";

export const useAuthForm = (mode: "login" | "register") => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible((visible) => !visible);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError(""); setBusy(true);
    const values = new FormData(event.currentTarget);
    try {
      if (mode === "login") await auth.login(String(values.get("identifier")), String(values.get("password")));
      else await auth.register(String(values.get("userName")), String(values.get("email")), String(values.get("password")), String(values.get("mobileNumber") || ""));
      router.push(mode === "login" ? "/profile" : "/login"); router.refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Please try again."); }
    finally { setBusy(false); }
  };

  return { error, busy, passwordVisible, togglePasswordVisibility, submit };
};
