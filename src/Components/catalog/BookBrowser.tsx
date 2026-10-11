"use client";

import BookCard from "@/Components/catalog/BookCard";
import { Box, Heading, Input, NativeSelect, SimpleGrid, Text, Flex } from "@chakra-ui/react";
import GenericFilter from "@/Components/custom/GenericFilter";
import GenericPagination from "@/Components/custom/GenericPagination";
import { BookStatus, bookStatusLabels } from "@/enums/books/BookStatus";
import { enumOptions } from "@/lib/enumOptions";
import { useBookCatalog } from "@/hooks/books/useBookCatalog";
import { SortDirection, sortDirectionLabels } from "@/enums/shared/SortDirection";
import type { BookBrowserProps } from "@/props/catalog/BookBrowserProps";

const BookBrowser = ({ initialPage }: BookBrowserProps) => {
  const { form, update, result, loading, error, apply, clear, pageChange } = useBookCatalog(initialPage);

  return <Box as="section" id="catalog" maxW="7xl" mx="auto" py={{ base: "14", md: "20" }} px={{ base: "4", md: "8" }}>
    <Flex align="end" justify="space-between" gap="4" mb="8"><Box><Text color="green.700" _dark={{ color: "green.300" }} fontSize="xs" fontWeight="bold" letterSpacing="widest">CURATED FOR CURIOUS MINDS</Text><Heading as="h2" fontFamily="heading" fontWeight="medium" fontSize={{ base: "3xl", md: "5xl" }} mt="3">Find your next great read.</Heading></Box><Text color="fg.muted" fontSize="sm" whiteSpace="nowrap">{result.pagination.total} books</Text></Flex>
    <GenericFilter onApply={apply} onClear={clear} loading={loading}>
      <Input aria-label="Search books" placeholder="Title, author, publisher, or ISBN" value={form.q} onChange={(event) => update("q", event.target.value)} flex={{ base: "1 1 100%", md: "2 1 250px" }} />
      <Input aria-label="Publisher" placeholder="Publisher" value={form.publisher} onChange={(event) => update("publisher", event.target.value)} flex="1 1 130px" />
      <NativeSelect.Root flex="1 1 140px"><NativeSelect.Field aria-label="Book condition" value={form.condition} onChange={(event) => update("condition", event.target.value as BookStatus | "")}>
        <option value="">All conditions</option>{enumOptions(BookStatus, bookStatusLabels).map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
      </NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root>
      <Input type="number" min="0" step="0.01" aria-label="Minimum price" placeholder="Min BHD" value={form.minPrice} onChange={(event) => update("minPrice", event.target.value)} flex="1 1 95px" maxW="130px" />
      <Input type="number" min="0" step="0.01" aria-label="Maximum price" placeholder="Max BHD" value={form.maxPrice} onChange={(event) => update("maxPrice", event.target.value)} flex="1 1 95px" maxW="130px" />
      <NativeSelect.Root flex="1 1 140px"><NativeSelect.Field aria-label="Sort books" value={form.sort} onChange={(event) => update("sort", event.target.value as typeof form.sort)}><option value="recent">Date added</option><option value="title">Title</option><option value="rating">Rating</option><option value="price">Price</option></NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root>
      <NativeSelect.Root flex="1 1 130px"><NativeSelect.Field aria-label="Sort direction" value={form.sortDirection} onChange={(event) => update("sortDirection", event.target.value as SortDirection)}>{Object.values(SortDirection).map((value) => <option key={value} value={value}>{sortDirectionLabels[value]}</option>)}</NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root>
    </GenericFilter>
    {error && <Text color="red.500" role="alert" mt="4">{error}</Text>}
    {result.items.length ? <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap="8" mt="8">{result.items.map((book) => <BookCard key={book.bookId} book={book} />)}</SimpleGrid> : <Box bg="bg.subtle" p="10" textAlign="center" mt="8">No books match these filters.</Box>}
    <GenericPagination pagination={result.pagination} onPageChange={(page) => void pageChange(page)} loading={loading} />
  </Box>;
};

export default BookBrowser;
