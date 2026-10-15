import type { CustomButtonProps } from "./CustomButtonProps";

export interface GenericConfirmButtonProps extends Omit<CustomButtonProps, "onClick"> {
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => Promise<void>;
}
