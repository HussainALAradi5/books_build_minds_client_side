import { AccountRole } from "@/enums/accounts/AccountRole";

export const accountRoleColors: Record<AccountRole, "gray" | "blue" | "teal" | "purple"> = {
  [AccountRole.Visitor]: "gray",
  [AccountRole.Client]: "blue",
  [AccountRole.Employee]: "teal",
  [AccountRole.Admin]: "purple",
};
