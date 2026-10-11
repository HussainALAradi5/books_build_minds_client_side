export enum SortDirection {
  Asc = "asc",
  Desc = "desc",
}

export const sortDirectionLabels: Record<SortDirection, string> = {
  asc: "Ascending", desc: "Descending",
};
export const sortDirectionColors: Record<SortDirection, "blue" | "purple"> = {
  asc: "blue", desc: "purple",
};
