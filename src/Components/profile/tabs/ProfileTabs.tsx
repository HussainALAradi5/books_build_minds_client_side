import TransactionsTab from "./TransactionsTab";
import GenericTabs from "@/Components/custom/tabs/GenericTabs";
import type { ProfileContentProps } from "@/props/profile/ProfileContentProps";
import ProfileOverviewTab from "./ProfileOverviewTab";
import LoansTab from "./LoansTab";
import ActivityTab from "./ActivityTab";

const ProfileTabs = ({ user }: ProfileContentProps) => <GenericTabs label="Profile sections" items={[
  { value: "account", label: "Account", content: <ProfileOverviewTab user={user} /> },
  { value: "loans", label: "Loans", content: <LoansTab userId={user.userId} /> },
  { value: "transactions", label: "Transactions", content: <TransactionsTab /> },
  { value: "activity", label: "Activity", content: <ActivityTab userId={user.userId} /> },
]} />;

export default ProfileTabs;
