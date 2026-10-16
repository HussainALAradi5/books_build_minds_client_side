"use client";

import { Box, Tabs } from "@chakra-ui/react";
import GenericAnimation from "@/Components/custom/animation/GenericAnimation";
import { useGenericTabs } from "@/hooks/ui/tabs/useGenericTabs";
import type { GenericTabsProps } from "@/props/custom/tabs/GenericTabsProps";

const GenericTabs = (props: GenericTabsProps) => {
  const { value, changeTab } = useGenericTabs(props);
  const segmented = props.appearance === "segmented";
  return <Tabs.Root value={value} onValueChange={changeTab} lazyMount unmountOnExit={false} colorPalette="green" variant={segmented ? "plain" : "line"} mt="6" minW="0">
    <Box overflowX={segmented ? "visible" : "auto"} pb="1">
      <Tabs.List aria-label={props.label} minW={segmented ? undefined : "max-content"} w={segmented ? "full" : undefined}
        display={segmented ? { base: "grid", md: "flex" } : undefined} gridTemplateColumns={segmented ? "repeat(3, minmax(0, 1fr))" : undefined}
        gap={segmented ? "2" : undefined}
        p={segmented ? "2" : undefined} bg={segmented ? "bg.subtle" : undefined}
        borderWidth={segmented ? "1px" : undefined} borderColor={segmented ? "border.subtle" : undefined} borderRadius={segmented ? "2xl" : undefined}>
        {props.items.map((item) => <Tabs.Trigger key={item.value} value={item.value} disabled={item.disabled}
          display="inline-flex" alignItems="center" justifyContent={segmented ? "center" : undefined} gap="2" whiteSpace="nowrap"
          borderRadius={segmented ? "xl" : undefined} px={segmented ? { base: "2", md: "6" } : { base: "4", md: "6" }}
          py="3" fontWeight="semibold" fontSize={segmented ? { base: "xs", sm: "sm" } : undefined}
          color={segmented ? "fg.muted" : undefined}
          _selected={segmented ? { bg: "bg.panel", color: "green.700", boxShadow: "sm", _dark: { color: "green.300" } } : undefined}
          _hover={segmented ? { color: "fg", bg: "bg.muted" } : undefined}>
          {item.icon && <Box as="span" display={segmented ? { base: "none", sm: "inline-flex" } : "inline-flex"}>{item.icon}</Box>}{item.label}
        </Tabs.Trigger>)}
      </Tabs.List>
    </Box>
    {props.items.map((item) => <Tabs.Content key={item.value} value={item.value} tabIndex={0} pt="6" _focusVisible={{ outline: "2px solid", outlineColor: "green.500" }}>
      <GenericAnimation active={value === item.value}>{item.content}</GenericAnimation>
    </Tabs.Content>)}
  </Tabs.Root>;
};

export default GenericTabs;
