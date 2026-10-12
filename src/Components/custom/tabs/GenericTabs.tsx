"use client";

import { Box, Tabs } from "@chakra-ui/react";
import GenericAnimation from "@/Components/custom/animation/GenericAnimation";
import { useGenericTabs } from "@/hooks/ui/tabs/useGenericTabs";
import type { GenericTabsProps } from "@/props/custom/tabs/GenericTabsProps";

const GenericTabs = (props: GenericTabsProps) => {
  const { value, changeTab } = useGenericTabs(props);
  return <Tabs.Root value={value} onValueChange={changeTab} lazyMount unmountOnExit={false} colorPalette="green" variant="line" mt="6" minW="0">
    <Box overflowX="auto" pb="1">
      <Tabs.List aria-label={props.label} minW="max-content">
        {props.items.map((item) => <Tabs.Trigger key={item.value} value={item.value} disabled={item.disabled}
          px={{ base: "4", md: "6" }} py="4" fontWeight="semibold">{item.label}</Tabs.Trigger>)}
      </Tabs.List>
    </Box>
    {props.items.map((item) => <Tabs.Content key={item.value} value={item.value} tabIndex={0} pt="6" _focusVisible={{ outline: "2px solid", outlineColor: "green.500" }}>
      <GenericAnimation active={value === item.value}>{item.content}</GenericAnimation>
    </Tabs.Content>)}
  </Tabs.Root>;
};

export default GenericTabs;
