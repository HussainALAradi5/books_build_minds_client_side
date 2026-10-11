"use client";

import Link from "next/link";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import { useBookLoan } from "@/hooks/books/useBookLoan";
import type { LoanActionsProps } from "@/props/books/LoanActionsProps";

const LoanActions = (props: LoanActionsProps) => {
  const { book, loan, busy, message, bookError, change } = useBookLoan(props);
  return <Box bg="bg.subtle" borderLeftWidth="3px" borderColor="green.500" p="5" my="6" borderRadius="sm">
    <Text fontWeight="bold" mb="3">{book.availableCopies} copies available</Text>
    {!props.signedIn ? <Button asChild colorPalette="green" variant="outline"><Link href="/login">Sign in to borrow</Link></Button> : loan ?
      <HStack wrap="wrap"><Text>Due {new Date(loan.dueAt).toLocaleDateString()}</Text><CustomButton appearance="secondary" loading={busy} onClick={() => change("return")}>Return book</CustomButton></HStack> :
      <HStack wrap="wrap"><CustomButton appearance="secondary" loading={busy} disabled={book.availableCopies < 1} onClick={() => change("borrow")}>{book.availableCopies ? "Borrow for 14 days" : "No copies available"}</CustomButton>
        <CustomButton appearance="secondary" loading={busy} disabled={book.availableCopies < 1} onClick={() => change("rent")}>Rent for 7 days · {(book.price * 0.2).toFixed(2)} BHD</CustomButton></HStack>}
    {message && <Text role="status" mt="3">{message}</Text>}{bookError && <Text role="alert" color="red.500" mt="3">{bookError}</Text>}
  </Box>;
};

export default LoanActions;
