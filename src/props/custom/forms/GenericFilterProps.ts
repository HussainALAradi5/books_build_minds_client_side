import type { ReactNode } from "react";
export interface GenericFilterProps {
  children: ReactNode;
  onApply: () => void | Promise<void>;
  onClear: () => void | Promise<void>;
  loading?: boolean;
  advanced?: ReactNode;
  summary?: ReactNode;
}
