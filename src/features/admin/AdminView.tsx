import { redirect } from "next/navigation";
import AdminBookForm from "@/Components/admin/AdminBookForm";
import { getSessionUser } from "@/lib/session";

export default async function AdminView() {
  const user = await getSessionUser(); if (!user?.is_admin) redirect("/");
  return <div className="profile-shell"><span className="eyebrow">ADMINISTRATION</span><h1>Manage the collection.</h1><AdminBookForm /></div>;
}





