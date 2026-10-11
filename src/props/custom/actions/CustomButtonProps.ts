import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
export interface CustomButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  loading?: boolean; loadingText?: string; children: ReactNode;
  appearance?: "primary" | "secondary" | "ghost";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}
