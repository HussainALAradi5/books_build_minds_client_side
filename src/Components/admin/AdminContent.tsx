import Link from "next/link";
import { Container, Flex, Heading, Link as ChakraLink, Text } from "@chakra-ui/react";
import GenericWorkflowGuide from "@/Components/custom/workflow/GenericWorkflowGuide";
import { adminGuideSteps } from "@/constants/workflow/adminGuideSteps";
import AdminTabs from "./tabs/AdminTabs";

const AdminContent = () => <Container maxW="6xl" py={{ base: "8", md: "14" }}>
  <Text color="green.700" _dark={{ color: "green.300" }} fontSize="xs" fontWeight="bold" letterSpacing="widest">ADMINISTRATION</Text>
  <Heading as="h1" fontFamily="heading" fontWeight="medium" fontSize={{ base: "4xl", md: "5xl" }} mt="3">Manage the collection.</Heading>
  <Flex justify="space-between" align="center" gap="4" wrap="wrap" mt="5">
    <ChakraLink asChild color="green.700" _dark={{ color: "green.300" }} fontWeight="semibold"><Link href="/admin/access">Manage roles, permissions &amp; groups →</Link></ChakraLink>
    <GenericWorkflowGuide title="Manage your library" steps={adminGuideSteps} />
  </Flex>
  <AdminTabs />
</Container>;

export default AdminContent;
