import { Box, Checkbox, SimpleGrid, Text } from "@chakra-ui/react";
import GenericCard from "../display/GenericCard";
import type { TableGridProps } from "@/props/custom/tables/TableGridProps";

const TableGrid = <T,>({ rows, columns, getKey, renderCard, selected, selectable, onToggle }: TableGridProps<T>) =>
  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">{rows.map((item) => <Box key={getKey(item)} minW="0">
    {selectable && <Checkbox.Root mb="3" checked={selected.includes(getKey(item))} onCheckedChange={() => onToggle(getKey(item))}>
      <Checkbox.HiddenInput /><Checkbox.Control /><Checkbox.Label>Select record {getKey(item)}</Checkbox.Label>
    </Checkbox.Root>}
    {renderCard ? renderCard(item) : <GenericCard>{columns.map((column) => <Box key={column.key} overflowWrap="anywhere">
      <Text color="fg.muted" fontSize="xs" mb="1">{column.header}</Text><Box>{column.render(item)}</Box>
    </Box>)}</GenericCard>}
  </Box>)}</SimpleGrid>;
export default TableGrid;
