"use client";

import GenericFilter from "@/Components/custom/GenericFilter";
import GenericPagination from "@/Components/custom/GenericPagination";
import GenericTable from "@/Components/custom/GenericTable";
import GenericEnumSelect from "@/Components/custom/forms/GenericEnumSelect";
import { adminDecisionColors, adminDecisionLabels } from "@/enums/accounts/AdminDecision";
import { createAdminRequestColumns } from "@/constants/admin/adminRequestColumns";
import { useAdminRequests } from "@/hooks/admin/useAdminRequests";
import { Box, Heading, Text } from "@chakra-ui/react";

const AdminRequestsPanel = () => {
  const { status, setStatus, filters, result, loading, error, apply, clear, review } = useAdminRequests();

  const columns = createAdminRequestColumns(review);

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
