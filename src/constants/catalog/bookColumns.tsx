import Link from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";
import GenericStatusBadge from "@/Components/custom/GenericStatusBadge";
import { bookStatusColors, bookStatusLabels } from "@/enums/books/BookStatus";
import type { TableColumn } from "@/props/custom/tables/TableColumn";
import type { BookSummary } from "@/interfaces/books/BookSummary";

export const bookColumns: TableColumn<BookSummary>[] = [
  { key: "title", header: "Book", render: (book) => <ChakraLink asChild fontWeight="semibold"><Link href={`/book/${book.slug}`}>{book.title}</Link></ChakraLink> },
  { key: "author", header: "Author", render: (book) => book.author },
  { key: "publisher", header: "Publisher", render: (book) => book.publisher },
  { key: "condition", header: "Condition", render: (book) => <GenericStatusBadge value={book.condition} labels={bookStatusLabels} colors={bookStatusColors} /> },
  { key: "price", header: "Price", render: (book) => `${book.price.toFixed(3)} BHD` },
  { key: "available", header: "Available copies", render: (book) => book.availableCopies },
];
