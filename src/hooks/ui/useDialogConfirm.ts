"use client";

import type { GenericDialogProps } from "@/props/custom/actions/GenericDialogProps";

export const useDialogConfirm = (onConfirm: GenericDialogProps["onConfirm"], onClose: GenericDialogProps["onClose"]) =>
  async () => { await onConfirm(); onClose(); };
