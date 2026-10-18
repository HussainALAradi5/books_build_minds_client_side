import type { ReactNode } from "react";

export interface GenericFormDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  size?: "sm" | "lg";
}
