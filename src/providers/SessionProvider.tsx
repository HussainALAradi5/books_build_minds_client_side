"use client";

import { createContext, useMemo, useState } from "react";
import type { SessionContextValue } from "@/interfaces/accounts/SessionContextValue";
import type { SessionProviderProps } from "@/props/auth/SessionProviderProps";

export const SessionContext = createContext<SessionContextValue | null>(null);

const SessionProvider = ({ initialUser, children }: SessionProviderProps) => {
  const [user, setUser] = useState(initialUser);
  const value = useMemo(() => ({ user, setUser }), [user]);
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export default SessionProvider;
