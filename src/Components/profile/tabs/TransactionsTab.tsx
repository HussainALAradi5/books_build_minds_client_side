"use client";
import { Heading, NativeSelect, Stack, Text } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import GenericPagination from "@/Components/custom/GenericPagination";
import TransactionCard from "@/Components/payments/TransactionCard";
import { useTransactions } from "@/hooks/payments/useTransactions";
import { TransactionStatus, transactionStatusLabels } from "@/enums/payments/TransactionStatus";
import { enumOptions } from "@/lib/enumOptions";

const TransactionsTab = () => {
  const state = useTransactions();
  return <Stack gap="4"><Heading as="h2">Your transactions</Heading>
    <NativeSelect.Root><NativeSelect.Field aria-label="Transaction status" value={state.status}
      onChange={(event) => state.changeStatus(event.target.value as TransactionStatus | "")}><option value="">All statuses</option>
      {enumOptions(TransactionStatus, transactionStatusLabels).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root>
    <CustomButton appearance="secondary" onClick={state.load}>Refresh transactions</CustomButton>
    {state.error && <Text role="alert" color="red.500">{state.error}</Text>}
    {state.result?.items.map((item) => <TransactionCard key={item.transactionId} item={item} onChange={state.load} />)}
    {state.result && !state.result.items.length && <Text>No transactions in this view.</Text>}
    {state.result && <GenericPagination pagination={state.result.pagination} onPageChange={state.setPage} />}
  </Stack>;
};
export default TransactionsTab;
