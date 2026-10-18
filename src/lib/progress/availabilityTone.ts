import { ProgressTone } from "@/enums/ui/ProgressTone";

export const availabilityTone = (available: number, total: number): ProgressTone => {
  if (available <= 0 || total <= 0) return ProgressTone.Danger;
  if (available / total <= 0.25) return ProgressTone.Warning;
  return ProgressTone.Success;
};
