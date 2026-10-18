import { ProgressTone } from "@/enums/ui/ProgressTone";

export enum BookStatus {
  New = "new",
  Good = "good",
  Fair = "fair",
  Damaged = "damaged",
}
export const bookStatusLabels: Record<BookStatus, string> = {
  new: "New",
  good: "Good",
  fair: "Fair",
  damaged: "Damaged",
};
export const bookStatusColors: Record<
  BookStatus,
  "green" | "blue" | "yellow" | "red"
> = { new: "green", good: "blue", fair: "yellow", damaged: "red" };

// Ordered wear categories for a visual scale, not a measured percentage.
export const bookWearLevels: Record<BookStatus, number> = {
  new: 0,
  good: 1,
  fair: 2,
  damaged: 3,
};

export const bookConditionTones: Record<BookStatus, ProgressTone> = {
  new: ProgressTone.Success,
  good: ProgressTone.Info,
  fair: ProgressTone.Caution,
  damaged: ProgressTone.Danger,
};
