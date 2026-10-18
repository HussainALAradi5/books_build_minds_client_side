"use client";

import { Dialog, Flex, Portal } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import type { GenericFormDialogProps } from "@/props/custom/forms/GenericFormDialogProps";

const GenericFormDialog = ({ open, title, onClose, children, size = "lg" }: GenericFormDialogProps) =>
  <Dialog.Root open={open} onOpenChange={({ open: next }) => { if (!next) onClose(); }} placement="center" size={size}>
    <Portal><Dialog.Backdrop /><Dialog.Positioner px="4"><Dialog.Content maxH="min(90dvh, 850px)" overflowY="auto">
      <Dialog.Header><Flex align="center" justify="space-between" width="full" gap="3"><Dialog.Title>{title}</Dialog.Title>
        <CustomButton appearance="ghost" onClick={onClose}>Close</CustomButton></Flex></Dialog.Header>
      <Dialog.Body pb="6">{children}</Dialog.Body>
    </Dialog.Content></Dialog.Positioner></Portal>
  </Dialog.Root>;

export default GenericFormDialog;
