import { Input, SimpleGrid } from "@chakra-ui/react";
import FilterField from "@/Components/custom/forms/FilterField";
import { bookStatusLabels, bookStatusColors } from "@/enums/books/BookStatus";
import GenericEnumSelect from "@/Components/custom/forms/GenericEnumSelect";
import type { BookFiltersProps } from "@/props/catalog/BookFiltersProps";

const BookAdvancedFilters = ({ form, update }: BookFiltersProps) => <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
  <GenericEnumSelect label="Book condition" allLabel="All conditions" value={form.condition} labels={bookStatusLabels} colors={bookStatusColors} onChange={(value) => update("condition", value)} />
  <FilterField label="Minimum price (BHD)"><Input type="number" inputMode="decimal" min="0" step="0.001" placeholder="0.000" value={form.minPrice} onChange={(event) => update("minPrice", event.target.value)} bg="bg.panel" /></FilterField>
  <FilterField label="Maximum price (BHD)"><Input type="number" inputMode="decimal" min="0" step="0.001" placeholder="Any price" value={form.maxPrice} onChange={(event) => update("maxPrice", event.target.value)} bg="bg.panel" /></FilterField>
</SimpleGrid>;
export default BookAdvancedFilters;
