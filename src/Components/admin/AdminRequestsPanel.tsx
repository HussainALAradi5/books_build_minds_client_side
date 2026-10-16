"use client";

import CustomButton from "@/Components/custom/CustomButton";
import GenericFilter from "@/Components/custom/GenericFilter";
import GenericPagination from "@/Components/custom/GenericPagination";
import GenericTable from "@/Components/custom/GenericTable";
import GenericStatusBadge from "@/Components/custom/GenericStatusBadge";
import GenericEnumSelect from "@/Components/custom/forms/GenericEnumSelect";
import { AdminDecision, adminDecisionColors, adminDecisionLabels } from "@/enums/accounts/AdminDecision";
import type { TableColumn } from "@/props/custom/tables/TableColumn";
import type { AdminRequest } from "@/interfaces/accounts/AdminRequest";
import { useAdminRequests } from "@/hooks/admin/useAdminRequests";
import { Box, Heading, HStack, Text } from "@chakra-ui/react";

const AdminRequestsPanel = () => {
  const { status, setStatus, filters, result, loading, error, apply, clear, review } = useAdminRequests();

  const columns: TableColumn<AdminRequest>[] = [
    { key: "id", header: "Request", render: (item) => `#${item.requestId}` },
    { key: "reason", header: "Reason", render: (item) => item.reasonForRequest },
    { key: "status", header: "Status", render: (item) => <GenericStatusBadge value={item.isAccepted === null ? AdminDecision.Pending : item.isAccepted ? AdminDecision.Accepted : AdminDecision.Rejected} labels={adminDecisionLabels} colors={adminDecisionColors} /> },
    { key: "actions", header: "Actions", render: (item) => item.isAccepted === null && <HStack wrap="wrap">
      <CustomButton appearance="secondary" onClick={() => review(item.requestId, true)}>Approve</CustomButton>
      <CustomButton appearance="secondary" onClick={() => review(item.requestId, false)}>Reject</CustomButton>
    </HStack> },
  ];

  return <Box as="section"><Heading as="h2" fontFamily="heading" fontSize="3xl" mb="5">Access requests</Heading>
    <GenericFilter onApply={() => apply({ page: 1, status })} onClear={clear} loading={loading}>
      <Box w={{ base: "full", sm: "190px" }}><GenericEnumSelect label="Request status" allLabel="All requests"
        value={status === "all" ? "" : status} labels={adminDecisionLabels} colors={adminDecisionColors}
        onChange={(value) => setStatus(value || "all")} /></Box>
    </GenericFilter>
    {error && <Text color="red.500" role="alert">{error}</Text>}
    <GenericTable rows={result.items} columns={columns} getKey={(item) => item.requestId} emptyMessage="No requests in this view." />
    <GenericPagination pagination={result.pagination} onPageChange={(page) => apply({ ...filters, page })} loading={loading} />
  </Box>;
};

export default AdminRequestsPanel;
