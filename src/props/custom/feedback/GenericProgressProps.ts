import type { ProgressTone } from "@/enums/ui/ProgressTone";

export interface GenericProgressProps {
  label: string;
  value: number;
  max: number;
  tone: ProgressTone;
  valueLabel?: string;
  animated?: boolean;
  compact?: boolean;
}
