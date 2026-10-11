export enum GenericStatus {
  Active = "active",
  Archived = "archived",
  Deleted = "deleted",
}

export const genericStatusLabels: Record<GenericStatus, string> = {
  active: "Active", archived: "Archived", deleted: "Deleted",
};
export const genericStatusColors: Record<GenericStatus, "green" | "orange" | "red"> = {
  active: "green", archived: "orange", deleted: "red",
};
