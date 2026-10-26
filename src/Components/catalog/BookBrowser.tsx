"use client";
import { Badge, Box, Heading, HStack, Text, Flex } from "@chakra-ui/react";
import BookCard from "./BookCard";
import BookFilterFields from "./filters/BookFilterFields";
import BookAdvancedFilters from "./filters/BookAdvancedFilters";
import GenericFilter from "@/Components/custom/GenericFilter";
import GenericPagination from "@/Components/custom/GenericPagination";
import CustomButton from "@/Components/custom/CustomButton";
import GenericStatusBadge from "@/Components/custom/GenericStatusBadge";
import { bookStatusLabels, bookStatusColors } from "@/enums/books/BookStatus";
import GenericTable from "@/Components/custom/GenericTable";
import { bookColumns } from "@/constants/catalog/bookColumns";
import { CollectionView } from "@/enums/shared/CollectionView";
import { useBookCatalog } from "@/hooks/books/useBookCatalog";
import type { BookBrowserProps } from "@/props/catalog/BookBrowserProps";
import TopCategoryBooks from "./TopCategoryBooks";

const BookBrowser = ({ initialPage }: BookBrowserProps) => {
  const state = useBookCatalog(initialPage);
  return <Box as="section" id="catalog" maxW="7xl" mx="auto" py={{ base: "10", md: "16" }} px={{ base: "4", md: "8" }}>
    <Flex align="end" justify="space-between" gap="4" mb="6" wrap="wrap"><Box><Text color="green.700" _dark={{ color: "green.300" }} fontSize="xs" fontWeight="bold" letterSpacing="widest">THE LIBRARY COLLECTION</Text>
      <Heading as="h2" fontFamily="heading" fontWeight="medium" fontSize={{ base: "3xl", md: "4xl" }} mt="2">Find your next great read.</Heading>
      <Text color="fg.muted" mt="2">Discover a book to keep, borrow, or enjoy for a while.</Text></Box>
    </Flex>
    <GenericFilter onApply={state.apply} onClear={state.clear} loading={state.loading}
      advanced={<BookAdvancedFilters form={state.form} update={state.update} />}
      summary={(state.activeFilters.length > 0 || state.appliedCondition) && <HStack wrap="wrap" gap="2" aria-label="Applied filters"><Text fontSize="xs" color="fg.muted">Applied:</Text>{state.activeFilters.map((label) => <Badge key={label} colorPalette="green" borderRadius="full" px="3" py="1">{label}</Badge>)}{state.appliedCondition && <GenericStatusBadge value={state.appliedCondition} labels={bookStatusLabels} colors={bookStatusColors} />}</HStack>}>
      <BookFilterFields form={state.form} update={state.update} />
    </GenericFilter>
    <TopCategoryBooks />
    {state.error && <Text color="red.600" _dark={{ color: "red.300" }} role="alert" mt="4">{state.error}</Text>}
    <Text role="status" aria-live="polite" fontSize="sm" color="fg.muted" my="5">{state.loading ? "Updating collection…" : `${state.result.pagination.total} books found · Page ${state.result.pagination.page} of ${Math.max(1, state.result.pagination.pages)}`}</Text>
    <Box aria-busy={state.loading} opacity={state.loading ? 0.6 : 1}>
      <GenericTable rows={state.result.items} columns={bookColumns} getKey={(book) => book.bookId}
        initialView={CollectionView.Grid} renderCard={(book) => <BookCard book={book} />} actions={state.actions}
        emptyMessage="Try a different publisher or a wider price range." />
      {!state.result.items.length && <Box textAlign="center" p="6"><Heading as="h3" size="md" mb="3">No books found</Heading><CustomButton appearance="secondary" onClick={state.clear}>Reset filters</CustomButton></Box>}
    </Box>
    <GenericPagination pagination={state.result.pagination} onPageChange={(page) => void state.pageChange(page)} loading={state.loading} />
  </Box>;
};
export default BookBrowser;
