"use client";

import Link from "next/link";
import { Box, Container, Heading, Link as ChakraLink, Text } from "@chakra-ui/react";
import { useAccessAdminContext } from "@/hooks/admin/access/useAccessAdminContext";
import AccessTabs from "./tabs/AccessTabs";
import GenericWorkflowGuide from "@/Components/custom/workflow/GenericWorkflowGuide";
import { accessGuideSteps } from "@/constants/workflow/accessGuideSteps";

const AccessSections = () => {
  const { loading, error } = useAccessAdminContext();
  return <Container maxW="7xl" py={{ base: "8", md: "14" }}>
    <ChakraLink asChild color="green.700" _dark={{ color: "green.300" }} fontSize="sm" fontWeight="semibold"><Link href="/admin">← Admin dashboard</Link></ChakraLink>
    <Text color="green.700" _dark={{ color: "green.300" }} fontSize="xs" fontWeight="bold" letterSpacing="widest" mt="8">ADMINISTRATION</Text>
    <Heading as="h1" fontFamily="heading" fontWeight="medium" fontSize={{ base: "4xl", md: "5xl" }} mt="3">Access management.</Heading>
    <Text color="fg.muted" maxW="3xl" mt="3" mb="9">Manage permission keys, roles, groups, and user assignments. Changes are enforced by the API on the next request.</Text>
    <GenericWorkflowGuide title="Set up access" steps={accessGuideSteps} />
    {loading && <Text role="status">Loading access data…</Text>}
    {error && <Box role="alert" bg="red.50" color="red.700" _dark={{ bg: "red.950", color: "red.200" }} p="4" borderRadius="md" mb="6">{error}</Box>}
    {!loading && <AccessTabs />}
  </Container>;
};

export default AccessSections;
