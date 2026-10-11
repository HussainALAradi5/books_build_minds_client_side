"use client";

import { useState, type MouseEvent } from "react";
import type { CustomButtonProps } from "@/props/custom/actions/CustomButtonProps";

export const useAsyncButton = (onClick: CustomButtonProps["onClick"], loading = false) => {
  const [pending, setPending] = useState(false);
  const busy = loading || pending;
  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    if (!onClick || busy) return;
    const result = onClick(event);
    if (result instanceof Promise) {
      setPending(true);
      try { await result; } finally { setPending(false); }
    }
  };
  return { busy, handleClick };
};
