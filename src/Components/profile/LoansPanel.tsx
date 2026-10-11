"use client";

import Link from "next/link";
import GenericPagination from "@/Components/custom/GenericPagination";
import CustomButton from "@/Components/custom/CustomButton";
import GenericTable from "@/Components/custom/GenericTable";
import GenericStatusBadge from "@/Components/custom/GenericStatusBadge";
import type { TableColumn } from "@/props/custom/tables/TableColumn";
import { LoanStatus, loanStatusColors, loanStatusLabels } from "@/enums/library/LoanStatus";
import { enumOptions } from "@/lib/enumOptions";
import type { Loan } from "@/interfaces/library/Loan";
import type { LoansPanelProps } from "@/props/profile/LoansPanelProps";
import { useLoansPanel } from "@/hooks/profile/useLoansPanel";
import { Box, Field, Flex, Heading, Link as ChakraLink, NativeSelect, Text } from "@chakra-ui/react";

const LoansPanel = ({ userId }: LoansPanelProps) => {
  const { setPage, status, changeStatus, result, error, loading, returnBook } = useLoansPanel(userId);
  const columns: TableColumn<Loan>[] = [
    { key: "book", header: "Book", render: (loan) => <ChakraLink asChild color="green.700" _dark={{ color: "green.300" }}><Link href={`/book/${loan.bookSlug}`}>{loan.bookTitle}</Link></ChakraLink> },
    { key: "status", header: "Status", render: (loan) => <GenericStatusBadge value={loan.status} labels={loanStatusLabels} colors={loanStatusColors} /> },
    { key: "due", header: "Due", render: (loan) => new Date(loan.dueAt).toLocaleDateString() },
    { key: "kind", header: "Type", render: (loan) => loan.loanKind === "rent" ? `Rental · ${loan.rentalFee.toFixed(2)} BHD` : "Borrowed" },
    { key: "action", header: "Action", render: (loan) => loan.status !== LoanStatus.Returned &&
      <CustomButton appearance="secondary" onClick={() => returnBook(loan.bookSlug)}>Return</CustomButton> },
  ];
  return <Box as="section" mt="10"><Flex justify="space-between" align="center" wrap="wrap" gap="4" mb="5"><Heading as="h2" fontFamily="heading" fontSize="3xl">Your loans</Heading>
    <Field.Root maxW="180px"><Field.Label>Show</Field.Label><NativeSelect.Root><NativeSelect.Field value={status} onChange={(event) => changeStatus(event.target.value as LoanStatus | "all")}><option value="all">All</option>{enumOptions(LoanStatus, loanStatusLabels).map(({ value, label }) => <option key={value} value={value}>{label}</option>)}</NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root></Field.Root></Flex>
    {error && <Text role="alert" color="red.500">{error}</Text>}
    {loading && <Text color="fg.muted">Loading loans...</Text>}
    {result && <GenericTable rows={result.items} columns={columns} getKey={(loan) => loan.loanId} emptyMessage="No loans in this view." />}
    {result && <GenericPagination pagination={result.pagination} onPageChange={setPage} loading={loading} />}
  </Box>;
};

export default LoansPanel;
