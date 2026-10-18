import { ProgressTone } from "@/enums/ui/ProgressTone";

export const workflowTone = (index: number, total: number): ProgressTone => {
  if (index >= total - 1) return ProgressTone.Success;
  return index === 0 ? ProgressTone.Info : ProgressTone.Accent;
};
