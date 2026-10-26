import { Box, Grid, Input, NativeSelect } from "@chakra-ui/react";
import FilterField from "@/Components/custom/forms/FilterField";
import PublisherFilter from "./PublisherFilter";
import { bookSortOptions } from "@/constants/catalog/bookFilters";
import { sortDirectionColors, sortDirectionLabels } from "@/enums/shared/SortDirection";
import GenericEnumSelect from "@/Components/custom/forms/GenericEnumSelect";
import type { BookFiltersProps } from "@/props/catalog/BookFiltersProps";

const BookFilterFields = ({ form, update }: BookFiltersProps) => <Grid width="full" templateColumns={{ base: "repeat(2, minmax(0, 1fr))", xl: "repeat(4, minmax(0, 1fr))" }} gap="4" alignItems="end"
  css={{ "@media (max-width: 350px)": { gridTemplateColumns: "minmax(0, 1fr)" } }}>
  <Box minW="0" gridColumn={{ base: "span 2", xl: "span 1" }} css={{ "@media (max-width: 350px)": { gridColumn: "span 1" } }}><FilterField label="Find a book"><Input placeholder="Title, author or ISBN…" value={form.q} onChange={(event) => update("q", event.target.value)} bg="bg.panel" /></FilterField></Box>
  <Box minW="0" gridColumn={{ base: "span 2", xl: "span 1" }} css={{ "@media (max-width: 350px)": { gridColumn: "span 1" } }}><PublisherFilter value={form.publisher} onChange={(value) => update("publisher", value)} /></Box>
  <Box minW="0"><FilterField label="Sort by"><NativeSelect.Root bg="bg.panel"><NativeSelect.Field value={form.sort} onChange={(event) => update("sort", event.target.value as typeof form.sort)}>
    {bookSortOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
  </NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root></FilterField></Box>
  {form.sort !== "most_rated" && form.sort !== "best_selling" && <Box minW="0"><GenericEnumSelect label="Order" includeAll={false} value={form.sortDirection} labels={sortDirectionLabels}
    colors={sortDirectionColors} onChange={(value) => { if (value) update("sortDirection", value); }} /></Box>
  }
</Grid>;
export default BookFilterFields;
