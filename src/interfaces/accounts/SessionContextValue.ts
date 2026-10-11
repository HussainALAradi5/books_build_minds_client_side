import type { User } from "./User";

export interface SessionContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
}
