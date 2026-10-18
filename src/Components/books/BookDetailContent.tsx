import Link from "next/link";
import { Box, Container, Grid, Link as ChakraLink } from "@chakra-ui/react";
import BookCover from "@/Components/catalog/BookCover";
import BookInformationTabs from "./BookInformationTabs";
import BookReviews from "./reviews/BookReviews";
import type { BookDetailContentProps } from "@/props/books/BookDetailContentProps";

const BookDetailContent = (props: BookDetailContentProps) => <Container maxW="6xl" py={{ base: "8", md: "14" }}>
  <ChakraLink asChild color="green.700" _dark={{ color: "green.300" }} fontSize="sm" fontWeight="semibold"><Link href="/">← Back to books</Link></ChakraLink>
  <Grid templateColumns={{ base: "1fr", md: "minmax(280px, 430px) 1fr" }} gap={{ base: "7", md: "14" }} mt="7" alignItems="start">
    <BookCover book={props.book} large />
    <BookInformationTabs {...props} />
  </Grid>
  <Box mt={{ base: "10", md: "14" }} pt="8" borderTopWidth="1px" borderColor="border.subtle">
    <BookReviews slug={props.book.slug} userId={props.userId} isAdmin={props.isAdmin} purchased={props.purchased} averageRating={props.book.averageRating} />
  </Box>
</Container>;

export default BookDetailContent;
