import type { ReactNode } from "react";
export interface GenericFilterProps { children: ReactNode; onApply: () => void | Promise<void>; onClear: () => void; loading?: boolean }
