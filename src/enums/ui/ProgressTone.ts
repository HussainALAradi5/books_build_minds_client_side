export enum ProgressTone {
  Info = "info",
  Accent = "accent",
  Success = "success",
  Warning = "warning",
  Danger = "danger",
}

export const progressToneLabels: Record<ProgressTone, string> = {
  info: "In progress",
  accent: "Keep going",
  success: "Ready",
  warning: "Limited",
  danger: "Unavailable",
};

export const progressToneColors: Record<ProgressTone, "blue" | "purple" | "green" | "orange" | "red"> = {
  info: "blue",
  accent: "purple",
  success: "green",
  warning: "orange",
  danger: "red",
};
