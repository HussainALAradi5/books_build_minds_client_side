export enum LoanStatus {
  Active = "active",
  Returned = "returned",
  Overdue = "overdue",
}
export const loanStatusLabels: Record<LoanStatus, string> = {
  active: "Active",
  returned: "Returned",
  overdue: "Overdue",
};
export const loanStatusColors: Record<LoanStatus, "blue" | "green" | "red"> = {
  active: "blue",
  returned: "green",
  overdue: "red",
};
