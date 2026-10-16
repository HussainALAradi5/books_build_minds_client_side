import Link from "next/link";
import { Box, Container, Flex, Heading, Link as ChakraLink, Text } from "@chakra-ui/react";
import GenericWorkflowGuide from "@/Components/custom/workflow/GenericWorkflowGuide";
import { libraryGuideSteps } from "@/constants/workflow/libraryGuideSteps";
import type { ProfileContentProps } from "@/props/profile/ProfileContentProps";
import ProfileTabs from "./tabs/ProfileTabs";

const ProfileContent = ({ user }: ProfileContentProps) => <Box bg="bg" minH="70vh"><Container maxW="6xl" py={{ base: "6", md: "8" }}>
  <ChakraLink asChild color="green.700" _dark={{ color: "green.300" }} fontSize="sm" fontWeight="semibold"><Link href="/">← Back to books</Link></ChakraLink>
  <Flex justify="space-between" align={{ base: "start", md: "end" }} gap="4" wrap="wrap" mt="4">
    <Box><Text color="green.700" _dark={{ color: "green.300" }} fontSize="xs" fontWeight="bold" letterSpacing="widest">YOUR READING SPACE</Text>
      <Heading as="h1" fontFamily="heading" fontWeight="medium" fontSize={{ base: "3xl", md: "4xl" }} mt="1">Your library</Heading>
      <Text color="fg.muted" mt="1">Manage your account and reading journey.</Text>
    </Box>
    <GenericWorkflowGuide title="Your library guide" steps={libraryGuideSteps} />
  </Flex>
  <ProfileTabs user={user} />
</Container></Box>;

export default ProfileContent;
