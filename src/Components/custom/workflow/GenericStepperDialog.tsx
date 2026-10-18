"use client";
import { Dialog, Portal, Text } from "@chakra-ui/react";
import CustomButton from "../CustomButton";
import { useStepperDialog } from "@/hooks/ui/workflow/useStepperDialog";
import type { GenericStepperDialogProps } from "@/props/custom/workflow/GenericStepperDialogProps";
import GenericProgress from "@/Components/custom/feedback/GenericProgress";

const GenericStepperDialog = (props: GenericStepperDialogProps) => {
  const state = useStepperDialog(props);
  return <Dialog.Root open placement="center" closeOnEscape={!state.busy} closeOnInteractOutside={!state.busy}
    onOpenChange={({ open }) => { if (!open) state.close(); }}>
    <Portal><Dialog.Backdrop /><Dialog.Positioner><Dialog.Content mx="4" maxW="lg">
      <Dialog.Header><Dialog.Title>{props.title}</Dialog.Title></Dialog.Header>
      <Dialog.Body><GenericProgress animated label="Your progress" value={state.index + 1} max={props.steps.length}
        tone={state.tone} valueLabel={`Step ${state.index + 1} of ${props.steps.length}`} />
        <Text fontWeight="bold" mt="5" mb="3">{props.steps[state.index]?.title}</Text>
        {props.steps[state.index]?.content}
        {state.error && <Text color="red.500" role="alert" mt="3">{state.error}</Text>}
      </Dialog.Body>
      <Dialog.Footer flexWrap="wrap">
        <CustomButton appearance="ghost" disabled={state.busy} onClick={state.close}>Cancel</CustomButton>
        <CustomButton appearance="secondary" disabled={state.busy || state.index === 0} onClick={state.previous}>Previous</CustomButton>
        <CustomButton loading={state.busy} disabled={props.steps[state.index]?.canContinue === false} onClick={state.next}>
          {state.last ? props.confirmLabel : "Next"}
        </CustomButton>
      </Dialog.Footer>
    </Dialog.Content></Dialog.Positioner></Portal>
  </Dialog.Root>;
};
export default GenericStepperDialog;
