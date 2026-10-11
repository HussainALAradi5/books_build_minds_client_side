"use client";

import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import { useCountrySync } from "@/hooks/admin/useCountrySync";
import CatalogEditor from "./CatalogEditor";

const AdminCatalogPanel = () => {
  const { busy, message, sync } = useCountrySync();
  return <Box as="section" mt="12">
    <Heading as="h2" fontFamily="heading" fontSize="3xl" mb="4">Catalog people &amp; places</Heading>
    <Text color="fg.muted" mb="4">Refresh the country reference data before assigning author and publisher countries.</Text>
    <CustomButton appearance="secondary" loading={busy} loadingText="Syncing..." onClick={sync}>Sync countries</CustomButton>
    {message && <Text role="status" mt="3">{message}</Text>}
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap="5" mt="7"><CatalogEditor kind="author" /><CatalogEditor kind="publisher" /></SimpleGrid>
  </Box>;
};

export default AdminCatalogPanel;
