import { Box, Grid, Input } from "@chakra-ui/react";
import FilterField from "@/Components/custom/forms/FilterField";
import { bookStatusLabels, bookStatusColors } from "@/enums/books/BookStatus";
import GenericEnumSelect from "@/Components/custom/forms/GenericEnumSelect";
import type { BookFiltersProps } from "@/props/catalog/BookFiltersProps";
import { blockNegativeNumberKey, nonNegativeNumber } from "@/lib/forms/nonNegativeNumber";
import GenericSearchSelect from "@/Components/custom/forms/GenericSearchSelect";
import { categoryFilterOptions } from "@/lib/catalog/categoryFilterOptions";

const BookAdvancedFilters = ({ form, update }: BookFiltersProps) => <Grid templateColumns={{ base: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))" }} gap="4"
  css={{ "@media (max-width: 350px)": { gridTemplateColumns: "minmax(0, 1fr)" } }}>
  <Box minW="0" gridColumn={{ base: "span 2", md: "span 1" }} css={{ "@media (max-width: 350px)": { gridColumn: "span 1" } }}>
    <GenericSearchSelect label="Category" placeholder="Search categories…" value={form.category} onChange={(value) => update("category", value)} loadOptions={categoryFilterOptions} />
  </Box>
  <Box minW="0" gridColumn={{ base: "span 2", md: "span 1" }} css={{ "@media (max-width: 350px)": { gridColumn: "span 1" } }}>
    <GenericEnumSelect label="Book condition" allLabel="All conditions" value={form.condition} labels={bookStatusLabels} colors={bookStatusColors} onChange={(value) => update("condition", value)} />
  </Box>
  <Box minW="0"><FilterField label="Minimum · BHD"><Input type="number" inputMode="decimal" min="0.001" step="0.001" placeholder="0.000" value={form.minPrice} onKeyDown={blockNegativeNumberKey} onChange={(event) => update("minPrice", nonNegativeNumber(event.target.value))} bg="bg.panel" /></FilterField></Box>
  <Box minW="0"><FilterField label="Maximum · BHD"><Input type="number" inputMode="decimal" min="0.001" step="0.001" placeholder="Any price" value={form.maxPrice} onKeyDown={blockNegativeNumberKey} onChange={(event) => update("maxPrice", nonNegativeNumber(event.target.value))} bg="bg.panel" /></FilterField></Box>
</Grid>;
export default BookAdvancedFilters;
