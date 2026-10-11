import { redirect } from "next/navigation";
import AdminContent from "@/Components/admin/AdminContent";
import { getSessionUser } from "@/lib/session";
import { AccountRole } from "@/enums/accounts/AccountRole";

const AdminView = async () => {
  const user = await getSessionUser();
  if (user?.role !== AccountRole.Admin) redirect("/");
  return <AdminContent />;
};

export default AdminView;
