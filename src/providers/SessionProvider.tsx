"use client";

import { createContext, useMemo, useState } from "react";
import type { UserDto } from "@/lib/types";

export interface SessionContextValue {
  user: UserDto | null;
  setUser: (user: UserDto | null) => void;
}

export const SessionContext = createContext<SessionContextValue | null>(null);

export default function SessionProvider({ initialUser, children }: { initialUser: UserDto | null; children: React.ReactNode }) {
  const [user, setUser] = useState(initialUser);
  const value = useMemo(() => ({ user, setUser }), [user]);
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}



