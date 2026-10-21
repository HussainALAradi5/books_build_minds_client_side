import { redirect } from "next/navigation";
import AccessAdminContent from "@/Components/admin/access/AccessAdminContent";
import { getSessionUser } from "@/lib/session";
import { Permission } from "@/enums/accounts/Permission";
import { AccountRole } from "@/enums/accounts/AccountRole";
import { hasPermission } from "@/lib/access";

const AccessAdminView = async () => {
  const user = await getSessionUser();
  if (user?.role !== AccountRole.Admin || !hasPermission(user, Permission.AccessReadAny)) redirect("/");
  return <AccessAdminContent />;
};

export default AccessAdminView;
