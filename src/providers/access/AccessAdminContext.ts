import { createContext } from "react";
import type { AccessAdminContextValue } from "@/interfaces/access/AccessAdminContextValue";

export const AccessAdminContext = createContext<AccessAdminContextValue | null>(null);
