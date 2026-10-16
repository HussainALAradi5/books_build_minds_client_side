import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { FiBookOpen, FiHeart, FiRepeat } from "react-icons/fi";

const AuthIntro = () => <Flex display={{ base: "none", md: "flex" }} direction="column" justify="space-between" gap="8" h="full"
  bg="green.800" _dark={{ bg: "green.950" }} color="white" p={{ base: "7", md: "10", lg: "12" }}
  position="relative" overflow="hidden">
  <Box position="absolute" boxSize="72" borderWidth="1px" borderColor="whiteAlpha.300" borderRadius="full" top="-28" right="-24" pointerEvents="none" />
  <Box position="relative">
    <Text color="green.200" fontSize="xs" fontWeight="bold" letterSpacing="widest">BOOKS BUILD MINDS</Text>
    <Heading as="h1" fontFamily="heading" fontWeight="medium" fontSize={{ base: "3xl", md: "5xl" }} lineHeight="1.15" mt={{ base: "3", md: "9" }}>
      A better place to find your next chapter.
    </Heading>
    <Text color="green.100" lineHeight="tall" mt="5" maxW="sm">
      Discover books, keep track of your reading, and share the stories that stay with you.
    </Text>
  </Box>
  <Stack gap="4" position="relative" display={{ base: "none", md: "flex" }} fontSize="sm" color="green.100">
    <Flex align="center" gap="3"><FiBookOpen aria-hidden /> Explore the collection</Flex>
    <Flex align="center" gap="3"><FiRepeat aria-hidden /> Borrow and return with ease</Flex>
    <Flex align="center" gap="3"><FiHeart aria-hidden /> Build a library of your own</Flex>
  </Stack>
</Flex>;

export default AuthIntro;
