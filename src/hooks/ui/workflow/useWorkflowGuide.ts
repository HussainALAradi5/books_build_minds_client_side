"use client";

import { useState } from "react";
import type { DialogOpenChangeDetails } from "@chakra-ui/react";
import type { WorkflowStep } from "@/interfaces/ui/workflow/WorkflowStep";

export const useWorkflowGuide = (steps: readonly WorkflowStep[]) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const currentIndex = Math.min(index, Math.max(steps.length - 1, 0));
  const changeOpen = ({ open: next }: DialogOpenChangeDetails) => {
    if (next) setIndex(0);
    setOpen(next);
  };
  const previous = () => setIndex(Math.max(currentIndex - 1, 0));
  const next = () => setIndex(Math.min(currentIndex + 1, steps.length - 1));
  const close = () => setOpen(false);

  return { open, changeOpen, currentIndex, step: steps[currentIndex], previous, next, close,
    isFirst: currentIndex === 0, isLast: currentIndex === steps.length - 1 };
};
