import { Badge, Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import GenericCard from "@/Components/custom/display/GenericCard";
import GenericProgress from "@/Components/custom/feedback/GenericProgress";
import GenericDisclosureText from "@/Components/custom/display/GenericDisclosureText";
import { availabilityTone } from "@/lib/progress/availabilityTone";
import BookActionBar from "./BookActionBar";
import LoanActions from "./LoanActions";
import BookConditionIndicator from "./BookConditionIndicator";
import type { BookInfoCardProps } from "@/props/books/BookInfoCardProps";

const BookInfoCard = ({ book, signedIn, purchased }: BookInfoCardProps) => <GenericCard>
  <Flex justify="space-between" align="center" gap="3" wrap="wrap">
    <Text fontWeight="semibold" fontSize="sm" color="green.700" _dark={{ color: "green.300" }}>Book information</Text>
    <Badge colorPalette="green" variant="subtle" borderRadius="full" px="3" py="1" fontWeight="bold" fontVariantNumeric="tabular-nums">
      {book.price.toFixed(2)} BHD
    </Badge>
  </Flex>
  <Text fontSize="sm" color="fg.muted"><Text as="span" color="orange.500">★</Text> {book.averageRating.toFixed(1)} reader rating</Text>
  <Box borderTopWidth="1px" borderColor="border.subtle" pt="4">
    <BookActionBar slug={book.slug} signedIn={signedIn} purchased={purchased} />
  </Box>
  <SimpleGrid columns={{ base: 2, sm: 2 }} gap={{ base: "4", md: "5" }} fontSize="sm">
    <Box minW="0"><Text color="fg.muted">Publisher</Text><Text fontWeight="semibold" overflowWrap="anywhere">{book.publisher}</Text></Box>
    <Box minW="0"><Text color="fg.muted">Published</Text><Text fontWeight="semibold">{book.publishedAt}</Text></Box>
    <Box minW="0"><Text color="fg.muted">ISBN</Text><Text fontWeight="semibold" overflowWrap="anywhere">{book.isbn}</Text></Box>
    <Box minW="0"><Text color="fg.muted" mb="2">Condition</Text><BookConditionIndicator condition={book.condition} /></Box>
  </SimpleGrid>
  <GenericDisclosureText title="About this book" content={book.description || "No description has been added yet."} />
  <GenericProgress label="Copies available" value={book.availableCopies} max={Math.max(1, book.copiesTotal)}
    tone={availabilityTone(book.availableCopies, book.copiesTotal)} valueLabel={`${book.availableCopies} of ${book.copiesTotal} copies`} />
  <Box borderTopWidth="1px" borderColor="border.subtle" pt="4" mt="1">
    <LoanActions book={book} signedIn={signedIn} />
  </Box>
</GenericCard>;

export default BookInfoCard;
