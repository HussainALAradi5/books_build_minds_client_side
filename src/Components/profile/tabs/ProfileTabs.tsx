import TransactionsTab from "./TransactionsTab";
import GenericTabs from "@/Components/custom/tabs/GenericTabs";
import type { ProfileContentProps } from "@/props/profile/ProfileContentProps";
import ProfileOverviewTab from "./ProfileOverviewTab";
import LoansTab from "./LoansTab";
import ActivityTab from "./ActivityTab";
import { FiActivity, FiBookOpen, FiCamera, FiCreditCard, FiUser } from "react-icons/fi";
import ProfilePhotoTab from "./ProfilePhotoTab";

const ProfileTabs = ({ user }: ProfileContentProps) => <GenericTabs label="Profile sections" appearance="segmented" items={[
  { value: "account", label: "Account", icon: <FiUser aria-hidden />, content: <ProfileOverviewTab user={user} /> },
  { value: "photo", label: "Photo", icon: <FiCamera aria-hidden />, content: <ProfilePhotoTab /> },
  { value: "loans", label: "Loans", icon: <FiBookOpen aria-hidden />, content: <LoansTab userId={user.userId} /> },
  { value: "transactions", label: "Transactions", icon: <FiCreditCard aria-hidden />, content: <TransactionsTab /> },
  { value: "activity", label: "Activity", icon: <FiActivity aria-hidden />, content: <ActivityTab userId={user.userId} /> },
]} />;

export default ProfileTabs;
