"use client";
import { Box, Checkbox, Stack, Text } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import GenericStepperDialog from "@/Components/custom/workflow/GenericStepperDialog";
import { useLibraryWorkflow } from "@/hooks/books/workflow/useLibraryWorkflow";
import { formatMoney } from "@/lib/payments/formatMoney";
import { TransactionKind } from "@/enums/payments/TransactionKind";
import type { LibraryWorkflowProps } from "@/props/books/workflow/LibraryWorkflowProps";

const LibraryWorkflow = (props: LibraryWorkflowProps) => {
  const state = useLibraryWorkflow(props);
  return <Box><CustomButton appearance={props.action === TransactionKind.Purchase ? "primary" : "secondary"} disabled={props.disabled} loading={state.loading} onClick={state.show}>{props.label}</CustomButton>
    {state.error && <Text color="red.500" role="alert" mt="2">{state.error}</Text>}
    {state.quote && <GenericStepperDialog title={props.label} onClose={state.close} onConfirm={state.confirm}
      confirmLabel={props.action === "borrow" ? "Confirm borrowing" : "Continue to Tap sandbox"} steps={[
        { title: "Review your selection", canContinue: state.quote.availableCopies > 0, content: <Stack>
          <Text fontWeight="bold">{state.quote.bookTitle}</Text><Text>{state.quote.availableCopies} copies available now</Text>
          <Text>{props.action === "borrow" ? `Free borrowing for ${state.quote.borrowDays} days` : props.action === TransactionKind.Rental
            ? `${state.quote.rentalDays}-day rental: ${formatMoney(state.quote.rentalAmountMinor, state.quote.currency, state.quote.currencyScale)}`
            : `Purchase: ${formatMoney(state.quote.purchaseAmountMinor, state.quote.currency, state.quote.currencyScale)}`}</Text>
        </Stack> },
        { title: "Library terms", canContinue: state.accepted, content: <Stack gap="4">
          {state.quote.terms.map((term) => <Text key={term}>{term}</Text>)}
          <Checkbox.Root checked={state.accepted} onCheckedChange={({ checked }) => state.setAccepted(checked === true)}>
            <Checkbox.HiddenInput /><Checkbox.Control /><Checkbox.Label>I have read and accept these terms</Checkbox.Label>
          </Checkbox.Root>
        </Stack> },
        { title: "Confirm", canContinue: state.accepted, content: <Text>{props.action === "borrow"
          ? "Confirm to create your loan. The server will recheck stock and set your due date."
          : "You will enter card details on Tap's BHD sandbox checkout. The book is reserved while payment is pending. Only verified payment completes this action; no real money is charged."}</Text> },
      ]} />}
  </Box>;
};
export default LibraryWorkflow;
