import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session";
import ProfileContent from "@/Components/profile/ProfileContent";

const ProfileView = async () => {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return <ProfileContent user={user} />;
};

export default ProfileView;
