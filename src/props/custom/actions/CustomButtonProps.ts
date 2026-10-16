import type { ButtonProps } from "@chakra-ui/react";
import type { MouseEvent, ReactNode } from "react";
export interface CustomButtonProps extends Omit<ButtonProps, "onClick" | "children"> {
  loading?: boolean; loadingText?: string; children: ReactNode;
  appearance?: "primary" | "secondary" | "ghost";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}
