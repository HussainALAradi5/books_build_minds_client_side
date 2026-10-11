import Link from "next/link";
import BookCover from "@/Components/catalog/BookCover";
import { Box, Flex, Link as ChakraLink, Text } from "@chakra-ui/react";
import type { BookCardProps } from "@/props/catalog/BookCardProps";

const BookCard = ({ book }: BookCardProps) => <ChakraLink asChild textDecoration="none" _hover={{ textDecoration: "none" }}>
  <Link href={`/book/${book.slug}`}><Box role="group" minW="0">
    <BookCover book={book} />
    <Flex justify="space-between" mt="4" fontSize="sm" color="fg.muted"><Text color="orange.600">★ {book.averageRating.toFixed(1)}</Text><Text>{book.price.toFixed(2)} BHD</Text></Flex>
    <Text fontFamily="heading" fontSize="xl" fontWeight="semibold" mt="2">{book.title}</Text>
    <Text color="fg.muted" fontSize="sm">{book.author}</Text>
    <Text color="green.700" _dark={{ color: "green.300" }} fontWeight="bold" fontSize="sm" mt="4">View book ↗</Text>
  </Box></Link>
</ChakraLink>;

export default BookCard;
