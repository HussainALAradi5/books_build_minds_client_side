"use client";
import { Box, Text } from "@chakra-ui/react";
import TransactionCard from "./TransactionCard";
import { useTransactionReturn } from "@/hooks/payments/useTransactionReturn";

const TransactionReturn = () => {
  const state = useTransactionReturn();
  return <Box my="5">{state.item && <TransactionCard item={state.item} onChange={state.load} />}
    {state.error && <Text role="alert" color="red.500">{state.error}</Text>}</Box>;
};
export default TransactionReturn;
