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
