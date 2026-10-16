"use client";
import { HStack, Text } from "@chakra-ui/react";
import GenericCard from "@/Components/custom/display/GenericCard";
import CustomButton from "@/Components/custom/CustomButton";
import GenericConfirmButton from "@/Components/custom/actions/GenericConfirmButton";
import GenericStatusBadge from "@/Components/custom/GenericStatusBadge";
import { TransactionStatus, transactionStatusColors, transactionStatusLabels } from "@/enums/payments/TransactionStatus";
import { transactionKindColors, transactionKindLabels } from "@/enums/payments/TransactionKind";
import { formatMoney } from "@/lib/payments/formatMoney";
import { useTransactionActions } from "@/hooks/payments/useTransactionActions";
import type { TransactionCardProps } from "@/props/payments/TransactionCardProps";

const TransactionCard = (props: TransactionCardProps) => {
  const { item } = props;
  const state = useTransactionActions(props);
  return <GenericCard>
    <HStack justify="space-between" wrap="wrap"><Text fontWeight="bold">{item.bookTitle}</Text>
      <GenericStatusBadge value={item.status} labels={transactionStatusLabels} colors={transactionStatusColors} /></HStack>
    <HStack mt="2" wrap="wrap"><GenericStatusBadge value={item.kind} labels={transactionKindLabels} colors={transactionKindColors} />
      <Text>{formatMoney(item.amountMinor, item.currency, item.currencyScale)}</Text></HStack>
    <Text fontSize="xs" color="fg.muted" overflowWrap="anywhere">Transaction {item.transactionId}</Text>
    {item.status === TransactionStatus.Pending && <Text mt="3">Payment has not been confirmed. A redirect alone does not complete your order.</Text>}
    {item.failureReason && <Text mt="3">{item.failureReason}</Text>}
    <HStack wrap="wrap" mt="4">
      {(item.status === TransactionStatus.Pending || item.status === TransactionStatus.RefundPending) && <CustomButton appearance="secondary" onClick={state.refresh}>Refresh payment</CustomButton>}
      {item.checkoutUrl && <CustomButton onClick={state.resume}>Resume checkout</CustomButton>}
      {item.status === TransactionStatus.Pending && <GenericConfirmButton title="Cancel checkout?" description="The server will check payment first. Cancel on the Tap page or wait for expiry. Stock is released only after Tap confirms checkout has ended." onConfirm={state.cancel}>Cancel checkout</GenericConfirmButton>}
      {item.receiptId && <CustomButton appearance="secondary" onClick={state.receipt}>Download receipt</CustomButton>}
    </HStack>
    {state.error && <Text color="red.500" role="alert" mt="3">{state.error}</Text>}
  </GenericCard>;
};
export default TransactionCard;
