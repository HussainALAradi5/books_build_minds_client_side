import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import GenericCard from "@/Components/custom/display/GenericCard";
import BookConditionIndicator from "./BookConditionIndicator";
import type { BookInfoCardProps } from "@/props/books/BookInfoCardProps";

const BookInfoCard = ({ book }: BookInfoCardProps) => <GenericCard>
  <Text fontWeight="semibold" fontSize="sm" color="green.700" _dark={{ color: "green.300" }}>Book information</Text>
  <SimpleGrid columns={{ base: 2, sm: 2 }} gap={{ base: "4", md: "5" }} fontSize="sm">
    <Box minW="0"><Text color="fg.muted">Publisher</Text><Text fontWeight="semibold" overflowWrap="anywhere">{book.publisher}</Text></Box>
    <Box minW="0"><Text color="fg.muted">Published</Text><Text fontWeight="semibold">{book.publishedAt}</Text></Box>
    <Box minW="0"><Text color="fg.muted">ISBN</Text><Text fontWeight="semibold" overflowWrap="anywhere">{book.isbn}</Text></Box>
    <Box minW="0"><Text color="fg.muted" mb="2">Condition</Text><BookConditionIndicator condition={book.condition} /></Box>
  </SimpleGrid>
</GenericCard>;

export default BookInfoCard;
