"use client";

import { useState } from "react";
import { countries } from "@/services/countries";

export const useCountrySync = () => {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const sync = async () => {
    setBusy(true);
    try {
      const result = await countries.sync();
      setMessage(`${result.count} countries synchronized.`);
    } catch (cause) { setMessage(cause instanceof Error ? cause.message : "Could not synchronize countries."); }
    finally { setBusy(false); }
  };
  return { busy, message, sync };
};
