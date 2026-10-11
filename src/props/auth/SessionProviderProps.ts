import type { ReactNode } from "react";
import type { User } from "@/interfaces/accounts/User";

export interface SessionProviderProps {
  initialUser: User | null;
  children: ReactNode;
}
