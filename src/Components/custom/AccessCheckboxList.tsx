import { Box, Checkbox, SimpleGrid, Text } from "@chakra-ui/react";
import type { AccessCheckboxListProps } from "@/props/custom/forms/AccessCheckboxListProps";

const AccessCheckboxList = <T extends string | number>({ label, items, selected, onToggle, disabled }: AccessCheckboxListProps<T>) =>
  <Box><Text fontSize="sm" fontWeight="semibold" mb="2">{label}</Text>
    <Box borderWidth="1px" borderRadius="md" p="3" maxH="220px" overflowY="auto">
      {items.length === 0 ? <Text color="fg.muted" fontSize="sm">No options available.</Text> :
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="3">{items.map((item) =>
          <Checkbox.Root key={String(item.value)} checked={selected.includes(item.value)} disabled={disabled} onCheckedChange={() => onToggle(item.value)}>
            <Checkbox.HiddenInput /><Checkbox.Control /><Checkbox.Label>{item.label}</Checkbox.Label>
          </Checkbox.Root>)}</SimpleGrid>}
    </Box>
  </Box>;

export default AccessCheckboxList;
