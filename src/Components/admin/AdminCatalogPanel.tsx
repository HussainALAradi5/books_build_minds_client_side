"use client";

import { useState } from "react";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import { useCountrySync } from "@/hooks/admin/useCountrySync";
import CatalogEditor from "./CatalogEditor";
import CatalogDirectory from "./CatalogDirectory";
import CategoryManager from "./CategoryManager";

const AdminCatalogPanel = () => {
  const { busy, message, sync } = useCountrySync();
  const [revision, setRevision] = useState(0);
  return <Box as="section">
    <Heading as="h2" fontFamily="heading" fontSize="3xl" mb="4">Catalog people &amp; places</Heading>
    <Text color="fg.muted" mb="4">Refresh the country reference data before assigning author and publisher countries.</Text>
    <CustomButton appearance="secondary" loading={busy} loadingText="Syncing..." onClick={sync}>Sync countries</CustomButton>
    {message && <Text role="status" mt="3">{message}</Text>}
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap="5" mt="7"><CatalogEditor kind="author" onCreated={() => setRevision((value) => value + 1)} /><CatalogEditor kind="publisher" onCreated={() => setRevision((value) => value + 1)} /></SimpleGrid>
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap="5" mt="7"><CatalogDirectory kind="author" revision={revision} /><CatalogDirectory kind="publisher" revision={revision} /></SimpleGrid>
    <CategoryManager />
  </Box>;
};

export default AdminCatalogPanel;
