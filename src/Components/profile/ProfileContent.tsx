import Link from "next/link";
import { Container, Flex, Heading, Link as ChakraLink, Text } from "@chakra-ui/react";
import GenericWorkflowGuide from "@/Components/custom/workflow/GenericWorkflowGuide";
import { libraryGuideSteps } from "@/constants/workflow/libraryGuideSteps";
import type { ProfileContentProps } from "@/props/profile/ProfileContentProps";
import ProfileTabs from "./tabs/ProfileTabs";

const ProfileContent = ({ user }: ProfileContentProps) => <Container maxW="6xl" py={{ base: "8", md: "14" }}>
  <ChakraLink asChild color="green.700" _dark={{ color: "green.300" }} fontSize="sm" fontWeight="semibold"><Link href="/">← Back to books</Link></ChakraLink>
  <Text color="green.700" _dark={{ color: "green.300" }} fontSize="xs" fontWeight="bold" letterSpacing="widest" mt="7">YOUR READING SPACE</Text>
  <Heading as="h1" fontFamily="heading" fontWeight="medium" fontSize={{ base: "3xl", md: "5xl" }} mt="3">Welcome back, {user.userName}.</Heading>
  <Flex justify="space-between" align="center" gap="4" wrap="wrap" mt="4">
    <Text color="fg.muted">Your account, loans, and activity, one tab at a time.</Text>
    <GenericWorkflowGuide title="Your library guide" steps={libraryGuideSteps} />
  </Flex>
  <ProfileTabs user={user} />
</Container>;

export default ProfileContent;
