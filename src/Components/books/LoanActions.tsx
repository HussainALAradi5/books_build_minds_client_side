"use client";
import Link from "next/link";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import GenericConfirmButton from "@/Components/custom/actions/GenericConfirmButton";
import LibraryWorkflow from "./workflow/LibraryWorkflow";
import { TransactionKind } from "@/enums/payments/TransactionKind";
import { useBookLoan } from "@/hooks/books/useBookLoan";
import type { LoanActionsProps } from "@/props/books/LoanActionsProps";

const LoanActions = (props: LoanActionsProps) => {
  const { book, loan, message, bookError, returnBook, borrowed } = useBookLoan(props);
  return <Box bg="bg.subtle" borderLeftWidth="3px" borderColor="green.500" p="5" my="6" borderRadius="sm">
    <Text fontWeight="bold" mb="3">{book.availableCopies} copies available</Text>
    {!props.signedIn ? <Button asChild colorPalette="green" variant="outline"><Link href="/login">Sign in to borrow</Link></Button> : loan ?
      <HStack wrap="wrap"><Text>Due {new Date(loan.dueAt).toLocaleDateString()}</Text>
        <GenericConfirmButton title="Return book?" description="Confirm that this book is being returned to the library." onConfirm={returnBook}>Return book</GenericConfirmButton></HStack> :
      <HStack wrap="wrap"><LibraryWorkflow slug={book.slug} action="borrow" label="Borrow book" disabled={book.availableCopies < 1} onCompleted={borrowed} />
        <LibraryWorkflow slug={book.slug} action={TransactionKind.Rental} label="Rent book" disabled={book.availableCopies < 1} /></HStack>}
    {message && <Text role="status" mt="3">{message}</Text>}{bookError && <Text role="alert" color="red.500" mt="3">{bookError}</Text>}
  </Box>;
};
export default LoanActions;
