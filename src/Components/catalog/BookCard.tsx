import Link from "next/link";
import { Badge, Box, Button, Heading, HStack, Text } from "@chakra-ui/react";
import { LuArrowUpRight, LuStar } from "react-icons/lu";
import BookCover from "./BookCover";
import GenericCard from "@/Components/custom/display/GenericCard";
import GenericStatusBadge from "@/Components/custom/GenericStatusBadge";
import { bookStatusColors, bookStatusLabels } from "@/enums/books/BookStatus";
import type { BookCardProps } from "@/props/catalog/BookCardProps";

const BookCard = ({ book }: BookCardProps) => <GenericCard
  media={<Box position="relative" p="6"><Box maxW="44" mx="auto" boxShadow="lg" borderRadius="md" overflow="hidden"><BookCover book={book} compact /></Box>
    <Badge position="absolute" top="4" left="4" colorPalette={book.availableCopies > 0 ? "green" : "gray"} variant="solid" borderRadius="full" px="3" py="1">
      {book.availableCopies > 0 ? "Available" : "Unavailable"}
    </Badge></Box>}
  footer={<Button asChild width="full" variant="outline" colorPalette="green" borderRadius="lg"><Link href={`/book/${book.slug}`}>Explore book<LuArrowUpRight /></Link></Button>}>
  <HStack justify="space-between" gap="2" wrap="wrap"><GenericStatusBadge value={book.condition} labels={bookStatusLabels} colors={bookStatusColors} />
    <HStack gap="1" fontSize="sm" color="fg.muted"><LuStar aria-hidden="true" /><Text>{book.averageRating > 0 ? book.averageRating.toFixed(1) : "Not rated"}</Text></HStack>
  </HStack>
  <Box minH="16"><Heading as="h3" fontSize="xl" lineClamp={2}>{book.title}</Heading><Text color="fg.muted" fontSize="sm" mt="1" lineClamp={1}>{book.author}</Text></Box>
  <HStack justify="space-between" gap="3" pt="3" borderTopWidth="1px" borderColor="border.subtle"><Text fontWeight="bold" fontSize="lg">{book.price.toFixed(3)} <Text as="span" fontWeight="normal" fontSize="xs" color="fg.muted">BHD</Text></Text>
    <Text fontSize="xs" color="fg.muted">{book.availableCopies} available</Text></HStack>
</GenericCard>;
export default BookCard;
