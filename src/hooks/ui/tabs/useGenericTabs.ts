"use client";

import { useState } from "react";
import type { TabsValueChangeDetails } from "@chakra-ui/react";
import type { GenericTabsProps } from "@/props/custom/tabs/GenericTabsProps";

export const useGenericTabs = ({ items, defaultValue }: GenericTabsProps) => {
  const [selected, setSelected] = useState(defaultValue);
  const enabledItems = items.filter((item) => !item.disabled);
  const value = enabledItems.find((item) => item.value === selected)?.value ?? enabledItems[0]?.value;
  const changeTab = ({ value: next }: TabsValueChangeDetails) => {
    if (enabledItems.some((item) => item.value === next)) setSelected(next);
  };

  return { value, changeTab };
};
