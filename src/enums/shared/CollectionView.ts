export enum CollectionView { Grid = "grid", List = "list" }

export const collectionViewLabels: Record<CollectionView, string> = {
  [CollectionView.Grid]: "Grid",
  [CollectionView.List]: "List",
};
export const collectionViewColors: Record<CollectionView, "teal" | "blue"> = {
  [CollectionView.Grid]: "teal",
  [CollectionView.List]: "blue",
};
