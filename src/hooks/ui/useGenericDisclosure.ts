"use client";

import { useId, useState } from "react";

export const useGenericDisclosure = () => {
  const [open, setOpen] = useState(false);
  const contentId = useId();
  const toggle = () => setOpen((current) => !current);
  return { open, contentId, toggle };
};
