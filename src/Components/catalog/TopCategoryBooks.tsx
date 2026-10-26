"use client";

import Link from "next/link";
import { Box, Heading, HStack, Link as ChakraLink, SimpleGrid, Text } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import GenericPagination from "@/Components/custom/GenericPagination";
import { useTopCategories } from "@/hooks/catalog/useTopCategories";

const TopCategoryBooks = () => {
  const state = useTopCategories();
  return <Box mt="5">
    <CustomButton appearance="secondary" onClick={state.toggle} aria-expanded={state.open}>{state.open ? "Hide" : "Show"} top 5 books in each category</CustomButton>
    {state.open && <Box mt="4" borderWidth="1px" borderRadius="xl" p={{ base: "4", md: "6" }} bg="bg.panel">
      <HStack gap="2" wrap="wrap" mb="5"><CustomButton appearance={state.sort === "most_rated" ? "primary" : "secondary"} onClick={() => state.chooseSort("most_rated")}>Most rated</CustomButton>
        <CustomButton appearance={state.sort === "best_selling" ? "primary" : "secondary"} onClick={() => state.chooseSort("best_selling")}>Best selling</CustomButton></HStack>
      {state.error && <Text role="alert" color="red.500">{state.error}</Text>}
      {state.loading && <Text role="status">Loading category rankings…</Text>}
      {!state.loading && <SimpleGrid columns={{ base: 1, md: 2 }} gap="5">
        {state.items.map((group) => <Box key={group.category.categoryId} borderWidth="1px" borderRadius="lg" p="4">
          <Heading as="h3" size="md" mb="3">{group.category.name}</Heading>
          {group.books.length === 0 && <Text color="fg.muted" fontSize="sm">No books yet.</Text>}
          {group.books.map((book, index) => <Text key={book.bookId} fontSize="sm" mb="2">{index + 1}. <ChakraLink asChild color="green.700" _dark={{ color: "green.300" }}><Link href={`/book/${book.slug}`}>{book.title}</Link></ChakraLink></Text>)}
        </Box>)}
      </SimpleGrid>}
      {state.pagination && <GenericPagination pagination={state.pagination} onPageChange={state.setPage} loading={state.loading} />}
    </Box>}
  </Box>;
};

export default TopCategoryBooks;
