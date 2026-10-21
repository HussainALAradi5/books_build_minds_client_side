"use client";

import GenericPagination from "@/Components/custom/GenericPagination";
import GenericTable from "@/Components/custom/GenericTable";
import GenericEnumSelect from "@/Components/custom/forms/GenericEnumSelect";
import { createLoanColumns } from "@/constants/profile/loanColumns";
import { loanStatusColors, loanStatusLabels } from "@/enums/library/LoanStatus";
import type { LoansPanelProps } from "@/props/profile/LoansPanelProps";
import { useLoansPanel } from "@/hooks/profile/useLoansPanel";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const LoansTab = ({ userId }: LoansPanelProps) => {
  const { setPage, status, changeStatus, result, error, loading, returnBook } = useLoansPanel(userId);
  const columns = createLoanColumns(returnBook);
  return <Box as="section"><Flex justify="space-between" align="center" wrap="wrap" gap="4" mb="5"><Heading as="h2" fontFamily="heading" fontSize="3xl">Your loans</Heading>
    <Box w={{ base: "full", sm: "190px" }}><GenericEnumSelect label="Loan status" allLabel="All loans"
      value={status === "all" ? "" : status} labels={loanStatusLabels} colors={loanStatusColors}
      onChange={(value) => changeStatus(value || "all")} /></Box></Flex>
    {error && <Text role="alert" color="red.500">{error}</Text>}
    {loading && <Text color="fg.muted">Loading loans...</Text>}
    {result && <GenericTable rows={result.items} columns={columns} getKey={(loan) => loan.loanId} emptyMessage="No loans in this view." />}
    {result && <GenericPagination pagination={result.pagination} onPageChange={setPage} loading={loading} />}
  </Box>;
};

export default LoansTab;
