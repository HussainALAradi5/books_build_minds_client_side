export enum AccountRole {
  Visitor = "visitor",
  Client = "client",
  Employee = "employee",
  Admin = "admin",
}

export const accountRoleLabels: Record<AccountRole, string> = {
  [AccountRole.Visitor]: "Visitor",
  [AccountRole.Client]: "Client",
  [AccountRole.Employee]: "Employee",
  [AccountRole.Admin]: "Administrator",
};

export const accountRoleColors: Record<AccountRole, "gray" | "blue" | "teal" | "purple"> = {
  [AccountRole.Visitor]: "gray",
  [AccountRole.Client]: "blue",
  [AccountRole.Employee]: "teal",
  [AccountRole.Admin]: "purple",
};
