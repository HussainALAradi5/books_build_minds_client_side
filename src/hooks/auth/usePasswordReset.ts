"use client";

import { useState, type FormEvent } from "react";
import { auth } from "@/services/auth";

export const usePasswordReset = () => {
  const [identifier, setIdentifier] = useState("");
  const [step, setStep] = useState<"request" | "confirm">("request");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const restart = () => { setStep("request"); setError(""); setMessage(""); };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true); setError(""); setMessage("");
    const values = new FormData(event.currentTarget);
    try {
      if (step === "request") {
        const identity = String(values.get("identifier") || "").trim();
        const result = await auth.requestResetCode(identity);
        setIdentifier(identity); setStep("confirm"); setMessage(result.message);
      } else {
        const result = await auth.confirmResetCode(identifier, String(values.get("code") || ""), String(values.get("newPassword") || ""));
        setMessage(result.message);
        setStep("request");
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Please try again.");
    } finally { setBusy(false); }
  };

  return { identifier, step, busy, error, message, submit, restart };
};
