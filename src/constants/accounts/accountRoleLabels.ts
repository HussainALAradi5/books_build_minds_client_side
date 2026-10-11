import { AccountRole } from "@/enums/accounts/AccountRole";

export const accountRoleLabels: Record<AccountRole, string> = {
  [AccountRole.Visitor]: "Visitor",
  [AccountRole.Client]: "Client",
  [AccountRole.Employee]: "Employee",
  [AccountRole.Admin]: "Administrator",
};
