"use client";

import { Box, Heading, Input, Text } from "@chakra-ui/react";
import GenericFilter from "@/Components/custom/GenericFilter";
import GenericPagination from "@/Components/custom/GenericPagination";
import GenericTable from "@/Components/custom/GenericTable";
import { inventoryColumns } from "@/constants/admin/inventoryColumns";
import { useAdminInventory } from "@/hooks/admin/useAdminInventory";

const AdminInventoryPanel = () => {
  const { search, setSearch, result, loading, error, message, apply, clear, pageChange, exportRows, importRows, bulk } = useAdminInventory();
  return <Box as="section">
    <Heading as="h2" fontFamily="heading" fontSize="3xl" mb="5">Inventory</Heading>
    <GenericFilter onApply={apply} onClear={clear} loading={loading}>
      <Input aria-label="Search inventory" placeholder="Search title, author, publisher or ISBN" value={search} onChange={(event) => setSearch(event.target.value)} maxW="420px" />
    </GenericFilter>
    {error && <Text color="red.500" role="alert" mt="3">{error}</Text>}
    {message && <Text color="green.600" role="status" mt="3">{message}</Text>}
    <Box mt="6"><GenericTable rows={result.items} columns={inventoryColumns} getKey={(book) => book.bookId} emptyMessage="No books in this view."
      actions={{ onExport: exportRows, onImport: importRows, onBulk: bulk,
        bulkActions: [{ value: "archive", label: "Archive" }, { value: "unarchive", label: "Unarchive" }, { value: "delete", label: "Soft delete" }] }} />
    </Box>
    <GenericPagination pagination={result.pagination} onPageChange={pageChange} loading={loading} />
  </Box>;
};

export default AdminInventoryPanel;
