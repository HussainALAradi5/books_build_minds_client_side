import { Input, NativeSelect, SimpleGrid } from "@chakra-ui/react";
import FilterField from "@/Components/custom/forms/FilterField";
import PublisherFilter from "./PublisherFilter";
import { bookSortOptions } from "@/constants/catalog/bookFilters";
import { SortDirection, sortDirectionLabels } from "@/enums/shared/SortDirection";
import { enumOptions } from "@/lib/enumOptions";
import type { BookFiltersProps } from "@/props/catalog/BookFiltersProps";

const BookFilterFields = ({ form, update }: BookFiltersProps) => <SimpleGrid width="full" columns={{ base: 1, md: 2, xl: 4 }} gap="4" alignItems="end">
  <FilterField label="Find a book"><Input placeholder="Title, author or ISBN…" value={form.q} onChange={(event) => update("q", event.target.value)} bg="bg.panel" /></FilterField>
  <PublisherFilter value={form.publisher} onChange={(value) => update("publisher", value)} />
  <FilterField label="Sort by"><NativeSelect.Root bg="bg.panel"><NativeSelect.Field value={form.sort} onChange={(event) => update("sort", event.target.value as typeof form.sort)}>
    {bookSortOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
  </NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root></FilterField>
  <FilterField label="Order"><NativeSelect.Root bg="bg.panel"><NativeSelect.Field value={form.sortDirection} onChange={(event) => update("sortDirection", event.target.value as SortDirection)}>
    {enumOptions(SortDirection, sortDirectionLabels).map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
  </NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root></FilterField>
</SimpleGrid>;
export default BookFilterFields;
