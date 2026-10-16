"use client";
import { Dialog, Portal, Text } from "@chakra-ui/react";
import CustomButton from "./CustomButton";
import type { GenericDialogProps } from "@/props/custom/actions/GenericDialogProps";
import { useDialogConfirm } from "@/hooks/ui/useDialogConfirm";

const GenericDialog = ({ open, title, children, confirmLabel, onConfirm, onClose, destructive = false }: GenericDialogProps) => {
  const state = useDialogConfirm(onConfirm, onClose);
  return <Dialog.Root open={open} onOpenChange={({ open: next }) => { if (!next) state.close(); }}
    closeOnEscape={!state.busy} closeOnInteractOutside={!state.busy} role="alertdialog" placement="center">
    <Portal><Dialog.Backdrop /><Dialog.Positioner><Dialog.Content mx="4" maxW="lg">
      <Dialog.Header><Dialog.Title>{title}</Dialog.Title></Dialog.Header>
      <Dialog.Body>{children}{state.error && <Text role="alert" color="red.500" mt="3">{state.error}</Text>}</Dialog.Body>
      <Dialog.Footer><CustomButton appearance="secondary" disabled={state.busy} onClick={state.close}>Cancel</CustomButton>
        <CustomButton appearance={destructive ? "danger" : "primary"} loading={state.busy} onClick={state.confirm}>{confirmLabel}</CustomButton></Dialog.Footer>
    </Dialog.Content></Dialog.Positioner></Portal>
  </Dialog.Root>;
};
export default GenericDialog;
