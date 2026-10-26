"use client";

import { Box, Heading, HStack, Input, Stack, Text } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import GenericPagination from "@/Components/custom/GenericPagination";
import { useCategoryManager } from "@/hooks/admin/useCategoryManager";

const CategoryManager = () => {
  const state = useCategoryManager();
  return <Box as="section" mt="7" bg="bg.panel" borderWidth="1px" borderRadius="xl" p={{ base: "5", md: "6" }}>
    <Heading as="h3" fontSize="xl" mb="3">Book categories</Heading>
    <form onSubmit={state.submit}><HStack align="end" gap="3" wrap="wrap" mb="4">
      <Input aria-label="New category name" placeholder="New category name" value={state.name} onChange={(event) => state.setName(event.target.value)} maxLength={120} required maxW="72" />
      <CustomButton type="submit" loading={state.busy}>Add category</CustomButton>
    </HStack></form>
    <Input aria-label="Search categories" placeholder="Search categories…" value={state.query} onChange={(event) => state.updateQuery(event.target.value)} maxW="sm" />
    {state.error && <Text role="alert" color="red.500" mt="3">{state.error}</Text>}
    <Stack gap="2" mt="4" aria-busy={state.loading}>{state.items.map((item) => <Box key={item.categoryId} borderWidth="1px" borderRadius="lg" p="3">{item.name}</Box>)}</Stack>
    {state.pagination && <GenericPagination pagination={state.pagination} onPageChange={state.setPage} loading={state.loading} />}
  </Box>;
};

export default CategoryManager;
