"use client";
import { Box, Collapsible, Flex, HStack, Text, chakra } from "@chakra-ui/react";
import { LuSlidersHorizontal, LuRotateCcw } from "react-icons/lu";
import CustomButton from "./CustomButton";
import type { GenericFilterProps } from "@/props/custom/forms/GenericFilterProps";
import { useFilterSubmit } from "@/hooks/ui/useFilterSubmit";
import { useFilterPanel } from "@/hooks/ui/useFilterPanel";

const GenericFilter = ({ children, advanced, summary, onApply, onClear, loading }: GenericFilterProps) => {
  const submit = useFilterSubmit(onApply);
  const state = useFilterPanel();
  return <chakra.form onSubmit={submit} borderWidth="1px" borderColor="border.subtle" bg="bg.subtle" borderRadius="2xl" p={{ base: "4", md: "5" }}>
    <Flex wrap="wrap" gap="3" align="end">{children}</Flex>
    <Collapsible.Root open={state.expanded}>
      {advanced && <Collapsible.Content><Box pt="5">{advanced}</Box></Collapsible.Content>}
      <Flex justify="space-between" gap="3" wrap="wrap" align="center" mt="4" pt="4" borderTopWidth="1px" borderColor="border.subtle">
        {advanced ? <Collapsible.Trigger asChild><CustomButton appearance="ghost" onClick={state.toggle}>
          <LuSlidersHorizontal />{state.expanded ? "Fewer filters" : "More filters"}
        </CustomButton></Collapsible.Trigger> : <Text fontSize="sm" color="fg.muted">Filter results</Text>}
        <HStack gap="2" flexWrap="wrap"><CustomButton type="button" appearance="ghost" disabled={loading} onClick={onClear}><LuRotateCcw />Reset</CustomButton>
          <CustomButton type="submit" loading={loading} loadingText="Searching">Show results</CustomButton></HStack>
      </Flex>
    </Collapsible.Root>
    {summary && <Box mt="4">{summary}</Box>}
  </chakra.form>;
};
export default GenericFilter;
