import type { User } from "@/interfaces/accounts/User";

export interface AccountMenuProps {
  user: User;
  busy: boolean;
  canManage: boolean;
  onSignOut: () => Promise<void>;
}
