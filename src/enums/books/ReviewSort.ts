export enum ReviewSort {
  Recent = "recent",
  Rating = "rating",
}

export const reviewSortLabels: Record<ReviewSort, string> = {
  [ReviewSort.Recent]: "Most recent",
  [ReviewSort.Rating]: "Highest rated",
};
export const reviewSortColors: Record<ReviewSort, "blue" | "yellow"> = {
  [ReviewSort.Recent]: "blue",
  [ReviewSort.Rating]: "yellow",
};
