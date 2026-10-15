"use client";
import Link from "next/link";
import { Box, Button, Text } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import LibraryWorkflow from "./workflow/LibraryWorkflow";
import { TransactionKind } from "@/enums/payments/TransactionKind";
import { useReceiptDownload } from "@/hooks/receipts/useReceiptDownload";
import type { PurchaseActionsProps } from "@/props/books/PurchaseActionsProps";

const PurchaseActions = ({ slug, signedIn, purchased }: PurchaseActionsProps) => {
  const receipt = useReceiptDownload(slug);
  if (!signedIn) return <Button asChild colorPalette="green"><Link href="/login">Sign in to purchase</Link></Button>;
  return <Box my="6">
    {purchased ? <CustomButton loading={receipt.busy} onClick={receipt.download}>Download receipt</CustomButton> :
      <LibraryWorkflow slug={slug} action={TransactionKind.Purchase} label="Purchase book" />}
    {receipt.error && <Text role="alert" color="red.500" mt="3">{receipt.error}</Text>}
  </Box>;
};
export default PurchaseActions;
