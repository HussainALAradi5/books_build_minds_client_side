import { Input, NativeSelect, SimpleGrid } from "@chakra-ui/react";
import FilterField from "@/Components/custom/forms/FilterField";
import PublisherFilter from "./PublisherFilter";
import { bookSortOptions } from "@/constants/catalog/bookFilters";
import { sortDirectionColors, sortDirectionLabels } from "@/enums/shared/SortDirection";
import GenericEnumSelect from "@/Components/custom/forms/GenericEnumSelect";
import type { BookFiltersProps } from "@/props/catalog/BookFiltersProps";

const BookFilterFields = ({ form, update }: BookFiltersProps) => <SimpleGrid width="full" columns={{ base: 1, md: 2, xl: 4 }} gap="4" alignItems="end">
  <FilterField label="Find a book"><Input placeholder="Title, author or ISBN…" value={form.q} onChange={(event) => update("q", event.target.value)} bg="bg.panel" /></FilterField>
  <PublisherFilter value={form.publisher} onChange={(value) => update("publisher", value)} />
  <FilterField label="Sort by"><NativeSelect.Root bg="bg.panel"><NativeSelect.Field value={form.sort} onChange={(event) => update("sort", event.target.value as typeof form.sort)}>
    {bookSortOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
  </NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root></FilterField>
  <GenericEnumSelect label="Order" includeAll={false} value={form.sortDirection} labels={sortDirectionLabels}
    colors={sortDirectionColors} onChange={(value) => { if (value) update("sortDirection", value); }} />
</SimpleGrid>;
export default BookFilterFields;
