import { redirect } from "next/navigation";
import AdminContent from "@/Components/admin/AdminContent";
import { getSessionUser } from "@/lib/session";
import { Permission } from "@/enums/accounts/Permission";
import { AccountRole } from "@/enums/accounts/AccountRole";
import { hasPermission } from "@/lib/access";

const AdminView = async () => {
  const user = await getSessionUser();
  if (user?.role !== AccountRole.Admin || !hasPermission(user, Permission.BookReadAny)) redirect("/");
  return <AdminContent />;
};

export default AdminView;
