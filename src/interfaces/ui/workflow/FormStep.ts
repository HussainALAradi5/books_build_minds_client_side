import type { ReactNode } from "react";

export interface FormStep {
  title: string;
  content: ReactNode;
  canContinue?: boolean;
}
