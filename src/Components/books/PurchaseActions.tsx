"use client";

import Link from "next/link";
import { Box, Button, Text } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import { useBookPurchase } from "@/hooks/books/useBookPurchase";
import { useReceiptDownload } from "@/hooks/receipts/useReceiptDownload";
import type { PurchaseActionsProps } from "@/props/books/PurchaseActionsProps";

const PurchaseActions = ({ slug, signedIn, purchased }: PurchaseActionsProps) => {
  const { owned, message, busy, purchase } = useBookPurchase(slug, purchased);
  const receipt = useReceiptDownload(slug);
  if (!signedIn) return <Button asChild colorPalette="green"><Link href="/login">Sign in to purchase →</Link></Button>;
  return <Box my="6">
    {owned ? <CustomButton appearance="primary" loading={receipt.busy} onClick={receipt.download}>Download receipt ↓</CustomButton> :
      <CustomButton appearance="primary" loading={busy} onClick={purchase}>Purchase book →</CustomButton>}
    {message && <Text role="status" mt="3">{message}</Text>}
    {receipt.error && <Text role="alert" color="red.500" mt="3">{receipt.error}</Text>}
  </Box>;
};

export default PurchaseActions;
