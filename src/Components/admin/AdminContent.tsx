import Link from "next/link";
import { Container, Heading, Link as ChakraLink, Text } from "@chakra-ui/react";
import AdminBookForm from "./AdminBookForm";
import AdminRequestsPanel from "./AdminRequestsPanel";
import AdminCatalogPanel from "./AdminCatalogPanel";
import AdminInventoryPanel from "./AdminInventoryPanel";

const AdminContent = () => <Container maxW="6xl" py={{ base: "8", md: "14" }}>
  <Text color="green.700" _dark={{ color: "green.300" }} fontSize="xs" fontWeight="bold" letterSpacing="widest">ADMINISTRATION</Text>
  <Heading as="h1" fontFamily="heading" fontWeight="medium" fontSize={{ base: "4xl", md: "5xl" }} mt="3">Manage the collection.</Heading>
  <ChakraLink asChild color="green.700" _dark={{ color: "green.300" }} fontWeight="semibold" mt="5"><Link href="/admin/access">Manage roles, permissions &amp; groups →</Link></ChakraLink>
  <AdminBookForm />
  <AdminInventoryPanel />
  <AdminCatalogPanel />
  <AdminRequestsPanel />
</Container>;

export default AdminContent;
