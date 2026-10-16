"use client";

import Link from "next/link";
import GenericPagination from "@/Components/custom/GenericPagination";
import GenericConfirmButton from "@/Components/custom/actions/GenericConfirmButton";
import GenericTable from "@/Components/custom/GenericTable";
import GenericStatusBadge from "@/Components/custom/GenericStatusBadge";
import GenericEnumSelect from "@/Components/custom/forms/GenericEnumSelect";
import type { TableColumn } from "@/props/custom/tables/TableColumn";
import { LoanStatus, loanStatusColors, loanStatusLabels } from "@/enums/library/LoanStatus";
import { LoanKind, loanKindColors, loanKindLabels } from "@/enums/library/LoanKind";
import type { Loan } from "@/interfaces/library/Loan";
import type { LoansPanelProps } from "@/props/profile/LoansPanelProps";
import { useLoansPanel } from "@/hooks/profile/useLoansPanel";
import { Box, Flex, Heading, HStack, Link as ChakraLink, Text } from "@chakra-ui/react";

const LoansTab = ({ userId }: LoansPanelProps) => {
  const { setPage, status, changeStatus, result, error, loading, returnBook } = useLoansPanel(userId);
  const columns: TableColumn<Loan>[] = [
    { key: "book", header: "Book", render: (loan) => <ChakraLink asChild color="green.700" _dark={{ color: "green.300" }}><Link href={`/book/${loan.bookSlug}`}>{loan.bookTitle}</Link></ChakraLink> },
    { key: "status", header: "Status", render: (loan) => <GenericStatusBadge value={loan.status} labels={loanStatusLabels} colors={loanStatusColors} /> },
    { key: "due", header: "Due", render: (loan) => new Date(loan.dueAt).toLocaleDateString() },
    { key: "kind", header: "Type", render: (loan) => <HStack wrap="wrap">
      <GenericStatusBadge value={loan.loanKind} labels={loanKindLabels} colors={loanKindColors} />
      {loan.loanKind === LoanKind.Rent && <Text fontSize="sm">{loan.rentalFee.toFixed(2)} BHD</Text>}
    </HStack> },
    { key: "action", header: "Action", render: (loan) => loan.status !== LoanStatus.Returned &&
      <GenericConfirmButton title="Return book?" description="Confirm this book is being returned to the library." onConfirm={() => returnBook(loan.bookSlug)}>Return</GenericConfirmButton> },
  ];
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
