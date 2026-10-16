import type { ReactNode } from "react";

export interface GenericImagePreviewProps {
  src: string;
  alt: string;
  children: ReactNode;
  triggerRadius?: string;
  fullWidth?: boolean;
}
