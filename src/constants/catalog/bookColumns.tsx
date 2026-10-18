import Link from "next/link";
import { Box, Link as ChakraLink } from "@chakra-ui/react";
import BookConditionIndicator from "@/Components/books/BookConditionIndicator";
import GenericProgress from "@/Components/custom/feedback/GenericProgress";
import { availabilityTone } from "@/lib/progress/availabilityTone";
import type { TableColumn } from "@/props/custom/tables/TableColumn";
import type { BookSummary } from "@/interfaces/books/BookSummary";

export const bookColumns: TableColumn<BookSummary>[] = [
  { key: "title", header: "Book", render: (book) => <ChakraLink asChild fontWeight="semibold"><Link href={`/book/${book.slug}`}>{book.title}</Link></ChakraLink> },
  { key: "author", header: "Author", render: (book) => book.author },
  { key: "publisher", header: "Publisher", render: (book) => book.publisher },
  { key: "condition", header: "Condition", render: (book) => <BookConditionIndicator condition={book.condition} /> },
  { key: "price", header: "Price", render: (book) => `${book.price.toFixed(3)} BHD` },
  { key: "available", header: "Available copies", render: (book) => <Box minW="36" maxW="44">
    <GenericProgress label="Availability" value={book.availableCopies} max={Math.max(1, book.copiesTotal)}
      tone={availabilityTone(book.availableCopies, book.copiesTotal)}
      valueLabel={`${book.availableCopies} of ${book.copiesTotal}`} />
  </Box> },
];
