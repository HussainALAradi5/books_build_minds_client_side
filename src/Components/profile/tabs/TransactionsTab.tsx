"use client";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import GenericPagination from "@/Components/custom/GenericPagination";
import GenericEnumSelect from "@/Components/custom/forms/GenericEnumSelect";
import TransactionCard from "@/Components/payments/TransactionCard";
import { useTransactions } from "@/hooks/payments/useTransactions";
import { transactionStatusColors, transactionStatusLabels } from "@/enums/payments/TransactionStatus";

const TransactionsTab = () => {
  const state = useTransactions();
  return <Stack gap="4"><Heading as="h2">Your transactions</Heading>
    <Box maxW="230px"><GenericEnumSelect label="Transaction status" allLabel="All statuses" value={state.status}
      labels={transactionStatusLabels} colors={transactionStatusColors} onChange={state.changeStatus} /></Box>
    <CustomButton appearance="secondary" onClick={state.load}>Refresh transactions</CustomButton>
    {state.error && <Text role="alert" color="red.500">{state.error}</Text>}
    {state.result?.items.map((item) => <TransactionCard key={item.transactionId} item={item} onChange={state.load} />)}
    {state.result && !state.result.items.length && <Text>No transactions in this view.</Text>}
    {state.result && <GenericPagination pagination={state.result.pagination} onPageChange={state.setPage} />}
  </Stack>;
};
export default TransactionsTab;
