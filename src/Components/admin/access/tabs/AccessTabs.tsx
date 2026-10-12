import GenericTabs from "@/Components/custom/tabs/GenericTabs";
import PermissionPanel from "../PermissionPanel";
import RolePanel from "../RolePanel";
import GroupPanel from "../GroupPanel";
import UserAccessPanel from "../UserAccessPanel";

const AccessTabs = () => <GenericTabs label="Access management sections" items={[
  { value: "permissions", label: "Permissions", content: <PermissionPanel /> },
  { value: "roles", label: "Roles", content: <RolePanel /> },
  { value: "groups", label: "Groups", content: <GroupPanel /> },
  { value: "users", label: "Users", content: <UserAccessPanel /> },
]} />;

export default AccessTabs;
