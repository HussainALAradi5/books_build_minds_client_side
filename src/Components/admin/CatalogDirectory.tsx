"use client";

import { Box, Heading, Input, Stack, Text } from "@chakra-ui/react";
import GenericPagination from "@/Components/custom/GenericPagination";
import { useCatalogDirectory } from "@/hooks/admin/useCatalogDirectory";
import type { CatalogDirectoryProps } from "@/props/admin/CatalogDirectoryProps";

const CatalogDirectory = ({ kind, revision }: CatalogDirectoryProps) => {
  const state = useCatalogDirectory(kind, revision);
  return <Box as="section" borderWidth="1px" borderRadius="xl" bg="bg.panel" p={{ base: "5", md: "6" }}>
    <Heading as="h3" fontSize="xl" mb="3">{kind === "author" ? "Authors" : "Publishers"}</Heading>
    <Input aria-label={`Search ${kind}s`} placeholder={`Search ${kind}s…`} value={state.query}
      onChange={(event) => state.updateQuery(event.target.value)} maxLength={120} />
    {state.error && <Text role="alert" color="red.500" mt="3">{state.error}</Text>}
    <Stack gap="2" mt="4" aria-busy={state.loading}>
      {!state.loading && !state.error && state.items.length === 0 && <Text color="fg.muted">No matching {kind}s.</Text>}
      {state.items.map((item) => <Box key={"authorId" in item ? `author-${item.authorId}` : `publisher-${item.publisherId}`}
        borderWidth="1px" borderRadius="lg" p="3">
        <Text fontWeight="semibold">{item.name}</Text>
        <Text fontSize="sm" color="fg.muted">{item.country?.name || "Country not set"}{item.address ? ` · ${item.address}` : ""}</Text>
        {item.description && <Text fontSize="sm" lineClamp={2}>{item.description}</Text>}
      </Box>)}
    </Stack>
    {state.pagination && <GenericPagination pagination={state.pagination} onPageChange={state.setPage} loading={state.loading} />}
  </Box>;
};

export default CatalogDirectory;
