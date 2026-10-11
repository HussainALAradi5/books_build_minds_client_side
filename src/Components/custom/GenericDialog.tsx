"use client";

import { Dialog, Portal } from "@chakra-ui/react";
import CustomButton from "./CustomButton";
import type { GenericDialogProps } from "@/props/custom/actions/GenericDialogProps";
import { useDialogConfirm } from "@/hooks/ui/useDialogConfirm";

const GenericDialog = ({ open, title, children, confirmLabel, onConfirm, onClose }: GenericDialogProps) => {
  const confirm = useDialogConfirm(onConfirm, onClose);
  return <Dialog.Root open={open} onOpenChange={({ open: next }) => { if (!next) onClose(); }} placement="center">
    <Portal><Dialog.Backdrop /><Dialog.Positioner><Dialog.Content>
      <Dialog.Header><Dialog.Title>{title}</Dialog.Title></Dialog.Header>
      <Dialog.Body>{children}</Dialog.Body>
      <Dialog.Footer><CustomButton appearance="secondary" onClick={onClose}>Cancel</CustomButton>
        <CustomButton appearance="primary" onClick={confirm}>{confirmLabel}</CustomButton></Dialog.Footer>
    </Dialog.Content></Dialog.Positioner></Portal>
  </Dialog.Root>;
};

export default GenericDialog;
