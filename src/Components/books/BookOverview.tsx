import { Suspense } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import TransactionReturn from "@/Components/payments/TransactionReturn";
import BookEditAction from "./BookEditAction";
import BookInfoCard from "./BookInfoCard";
import type { BookDetailContentProps } from "@/props/books/BookDetailContentProps";

const BookOverview = ({ book, signedIn, purchased, isAdmin }: BookDetailContentProps) => <Box>
  <Text color="green.700" _dark={{ color: "green.300" }} fontSize="xs" fontWeight="bold" letterSpacing="widest">THE COLLECTION / {book.publisher.toUpperCase()}</Text>
  <Flex align="start" justify="space-between" gap="4" wrap="wrap" mt="4"><Heading as="h1" fontFamily="heading" fontWeight="medium" fontSize={{ base: "4xl", md: "6xl" }} lineHeight="1.1">{book.title}</Heading>
    {isAdmin && <BookEditAction book={book} />}</Flex>
  <Text color="fg.muted" fontSize="lg" mt="2">by {book.author}</Text>
  <Box mt="5"><BookInfoCard book={book} signedIn={signedIn} purchased={purchased} /></Box>
  {signedIn && <Suspense><TransactionReturn /></Suspense>}
</Box>;

export default BookOverview;
