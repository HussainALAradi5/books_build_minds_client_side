"use client";
import { useState } from "react";
import { useDialogConfirm } from "@/hooks/ui/useDialogConfirm";
import type { GenericStepperDialogProps } from "@/props/custom/workflow/GenericStepperDialogProps";

export const useStepperDialog = (props: GenericStepperDialogProps) => {
  const [index, setIndex] = useState(0);
  const state = useDialogConfirm(props.onConfirm, props.onClose);
  const last = index === props.steps.length - 1;
  const next = async () => {
    if (state.busy || props.steps[index]?.canContinue === false) return;
    if (last) await state.confirm(); else setIndex((value) => value + 1);
  };
  return { ...state, index, last, next, previous: () => setIndex((value) => Math.max(0, value - 1)) };
};
