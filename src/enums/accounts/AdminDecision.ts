export enum AdminDecision {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}
export const adminDecisionLabels: Record<AdminDecision, string> = {
  pending: "Pending",
  accepted: "Accepted",
  rejected: "Rejected",
};
export const adminDecisionColors: Record<
  AdminDecision,
  "yellow" | "green" | "red"
> = { pending: "yellow", accepted: "green", rejected: "red" };
