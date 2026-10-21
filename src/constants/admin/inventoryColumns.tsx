import Link from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";
import GenericStatusBadge from "@/Components/custom/GenericStatusBadge";
import { GenericStatus, genericStatusColors, genericStatusLabels } from "@/enums/shared/GenericStatus";
import type { BookSummary } from "@/interfaces/books/BookSummary";
import type { TableColumn } from "@/props/custom/tables/TableColumn";

export const inventoryColumns: TableColumn<BookSummary>[] = [
  { key: "title", header: "Book", render: (book) => <ChakraLink asChild color="green.700" _dark={{ color: "green.300" }}><Link href={`/book/${book.slug}`}>{book.title}</Link></ChakraLink> },
  { key: "author", header: "Author", render: (book) => book.author },
  { key: "price", header: "Price", render: (book) => `${book.price.toFixed(2)} BHD` },
  { key: "copies", header: "Copies", render: (book) => book.copiesTotal },
  { key: "status", header: "Status", render: (book) => <GenericStatusBadge value={book.isArchived ? GenericStatus.Archived : GenericStatus.Active} labels={genericStatusLabels} colors={genericStatusColors} /> },
];
