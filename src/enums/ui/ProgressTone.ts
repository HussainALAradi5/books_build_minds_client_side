export enum ProgressTone {
  Info = "info",
  Accent = "accent",
  Success = "success",
  Warning = "warning",
  Caution = "caution",
  Danger = "danger",
}

export const progressToneLabels: Record<ProgressTone, string> = {
  info: "In progress",
  accent: "Keep going",
  success: "Ready",
  warning: "Limited",
  caution: "Worn",
  danger: "Unavailable",
};

export const progressToneColors: Record<ProgressTone, "blue" | "purple" | "green" | "orange" | "yellow" | "red"> = {
  info: "blue",
  accent: "purple",
  success: "green",
  warning: "orange",
  caution: "yellow",
  danger: "red",
};
