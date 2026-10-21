import Link from "next/link";
import { HStack, Link as ChakraLink, Text } from "@chakra-ui/react";
import GenericConfirmButton from "@/Components/custom/actions/GenericConfirmButton";
import GenericStatusBadge from "@/Components/custom/GenericStatusBadge";
import { LoanKind, loanKindColors, loanKindLabels } from "@/enums/library/LoanKind";
import { LoanStatus, loanStatusColors, loanStatusLabels } from "@/enums/library/LoanStatus";
import type { Loan } from "@/interfaces/library/Loan";
import { formatDate } from "@/lib/dates/formatDate";
import type { TableColumn } from "@/props/custom/tables/TableColumn";

export const createLoanColumns = (returnBook: (slug: string) => Promise<void>): TableColumn<Loan>[] => [
  { key: "book", header: "Book", render: (loan) => <ChakraLink asChild color="green.700" _dark={{ color: "green.300" }}><Link href={`/book/${loan.bookSlug}`}>{loan.bookTitle}</Link></ChakraLink> },
  { key: "status", header: "Status", render: (loan) => <GenericStatusBadge value={loan.status} labels={loanStatusLabels} colors={loanStatusColors} /> },
  { key: "due", header: "Due", render: (loan) => formatDate(loan.dueAt) },
  { key: "kind", header: "Type", render: (loan) => <HStack wrap="wrap">
    <GenericStatusBadge value={loan.loanKind} labels={loanKindLabels} colors={loanKindColors} />
    {loan.loanKind === LoanKind.Rent && <Text fontSize="sm">{loan.rentalFee.toFixed(2)} BHD</Text>}
  </HStack> },
  { key: "action", header: "Action", render: (loan) => loan.status !== LoanStatus.Returned &&
    <GenericConfirmButton title="Return book?" description="Confirm this book is being returned to the library." onConfirm={() => returnBook(loan.bookSlug)}>Return</GenericConfirmButton> },
];
