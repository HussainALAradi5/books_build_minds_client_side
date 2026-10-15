import type { FormStep } from "@/interfaces/ui/workflow/FormStep";

export interface GenericStepperDialogProps {
  title: string;
  steps: FormStep[];
  confirmLabel: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}
