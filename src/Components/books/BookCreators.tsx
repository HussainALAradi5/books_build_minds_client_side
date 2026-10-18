import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import CatalogProfile from "@/Components/catalog/CatalogProfile";
import type { BookCreatorsProps } from "@/props/books/BookCreatorsProps";

const BookCreators = ({ book }: BookCreatorsProps) =>
  <Box as="section" aria-label="Author and publisher">
    <Heading as="h2" fontFamily="heading" fontSize={{ base: "xl", md: "2xl" }} mb="5">About the author & publisher</Heading>
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="5">
      <CatalogProfile label="Author" profile={book.authorDetails} />
      <CatalogProfile label="Publisher" profile={book.publisherDetails} />
    </SimpleGrid>
  </Box>;

export default BookCreators;
