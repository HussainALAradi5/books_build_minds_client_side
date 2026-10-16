"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export const useColorMode = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const dark = resolvedTheme === "dark";
  const toggle = () => setTheme(dark ? "light" : "dark");
  return { dark, mounted, toggle };
};
