"use client";

import { useState } from "react";

export const useEditDialog = () => {
  const [open, setOpen] = useState(false);
  return { open, openDialog: () => setOpen(true), closeDialog: () => setOpen(false) };
};
