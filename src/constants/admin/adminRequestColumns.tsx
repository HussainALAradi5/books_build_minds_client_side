import { HStack } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import GenericStatusBadge from "@/Components/custom/GenericStatusBadge";
import { AdminDecision, adminDecisionColors, adminDecisionLabels } from "@/enums/accounts/AdminDecision";
import type { AdminRequest } from "@/interfaces/accounts/AdminRequest";
import type { TableColumn } from "@/props/custom/tables/TableColumn";

export const createAdminRequestColumns = (review: (id: number, accepted: boolean) => Promise<void>): TableColumn<AdminRequest>[] => [
  { key: "id", header: "Request", render: (item) => `#${item.requestId}` },
  { key: "reason", header: "Reason", render: (item) => item.reasonForRequest },
  { key: "status", header: "Status", render: (item) => <GenericStatusBadge value={item.isAccepted === null ? AdminDecision.Pending : item.isAccepted ? AdminDecision.Accepted : AdminDecision.Rejected} labels={adminDecisionLabels} colors={adminDecisionColors} /> },
  { key: "actions", header: "Actions", render: (item) => item.isAccepted === null && <HStack wrap="wrap">
    <CustomButton appearance="secondary" onClick={() => review(item.requestId, true)}>Approve</CustomButton>
    <CustomButton appearance="secondary" onClick={() => review(item.requestId, false)}>Reject</CustomButton>
  </HStack> },
];
