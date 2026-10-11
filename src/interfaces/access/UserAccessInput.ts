import type { AccountRole } from "@/enums/accounts/AccountRole";

export interface UserAccessInput { role: AccountRole; accessRoleKeys: string[]; groupIds: number[] }
