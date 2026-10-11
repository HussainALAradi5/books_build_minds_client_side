"use client";

import Link from "next/link";
import { Box, Heading, Input, Link as ChakraLink, Text } from "@chakra-ui/react";
import GenericFilter from "@/Components/custom/GenericFilter";
import GenericPagination from "@/Components/custom/GenericPagination";
import GenericTable from "@/Components/custom/GenericTable";
import GenericStatusBadge from "@/Components/custom/GenericStatusBadge";
import { GenericStatus, genericStatusColors, genericStatusLabels } from "@/enums/shared/GenericStatus";
import type { BookSummary } from "@/interfaces/books/BookSummary";
import type { TableColumn } from "@/props/custom/tables/TableColumn";
import { useAdminInventory } from "@/hooks/admin/useAdminInventory";

const columns: TableColumn<BookSummary>[] = [
  { key: "title", header: "Book", render: (book) => <ChakraLink asChild color="green.700" _dark={{ color: "green.300" }}><Link href={`/book/${book.slug}`}>{book.title}</Link></ChakraLink> },
  { key: "author", header: "Author", render: (book) => book.author },
  { key: "price", header: "Price", render: (book) => `${book.price.toFixed(2)} BHD` },
  { key: "copies", header: "Copies", render: (book) => book.copiesTotal },
  { key: "status", header: "Status", render: (book) => <GenericStatusBadge value={book.isArchived ? GenericStatus.Archived : GenericStatus.Active} labels={genericStatusLabels} colors={genericStatusColors} /> },
];

const AdminInventoryPanel = () => {
  const { search, setSearch, result, loading, error, message, apply, clear, pageChange, exportRows, importRows, bulk } = useAdminInventory();
  return <Box as="section" mt="12">
    <Heading as="h2" fontFamily="heading" fontSize="3xl" mb="5">Inventory</Heading>
    <GenericFilter onApply={apply} onClear={clear} loading={loading}>
      <Input aria-label="Search inventory" placeholder="Search title, author, publisher or ISBN" value={search} onChange={(event) => setSearch(event.target.value)} maxW="420px" />
    </GenericFilter>
    {error && <Text color="red.500" role="alert" mt="3">{error}</Text>}
    {message && <Text color="green.600" role="status" mt="3">{message}</Text>}
    <Box mt="6"><GenericTable rows={result.items} columns={columns} getKey={(book) => book.bookId} emptyMessage="No books in this view."
      actions={{ onExport: exportRows, onImport: importRows, onBulk: bulk,
        bulkActions: [{ value: "archive", label: "Archive" }, { value: "unarchive", label: "Unarchive" }, { value: "delete", label: "Soft delete" }] }} />
    </Box>
    <GenericPagination pagination={result.pagination} onPageChange={pageChange} loading={loading} />
  </Box>;
};

export default AdminInventoryPanel;
