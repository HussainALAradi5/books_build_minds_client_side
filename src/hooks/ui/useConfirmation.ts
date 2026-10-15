"use client";
import { useState } from "react";

export const useConfirmation = () => {
  const [open, setOpen] = useState(false);
  return { open, show: () => setOpen(true), close: () => setOpen(false) };
};
