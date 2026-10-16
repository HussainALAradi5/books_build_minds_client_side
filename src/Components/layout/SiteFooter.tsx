import Link from "next/link";
import { Box, Button, Flex, Heading, Link as ChakraLink, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Brand from "@/Components/custom/Brand";

const SiteFooter = () => <Box as="footer" bg="green.950" color="green.50" position="relative" overflow="hidden">
  <Box position="absolute" top="-28" right="-20" boxSize="80" borderWidth="1px" borderColor="whiteAlpha.200" borderRadius="full" pointerEvents="none" />
  <Box maxW="7xl" mx="auto" px={{ base: "5", md: "8" }} pt={{ base: "12", md: "16" }} pb="7" position="relative">
    <Flex justify="space-between" align={{ base: "start", md: "center" }} direction={{ base: "column", md: "row" }} gap="8">
      <Stack gap="3" maxW="xl">
        <Text color="green.300" fontSize="xs" fontWeight="bold" letterSpacing="widest">KEEP THE STORY GOING</Text>
        <Heading as="h2" fontFamily="heading" fontWeight="medium" fontSize={{ base: "3xl", md: "4xl" }} lineHeight="shorter">Every shelf has a next chapter.</Heading>
        <Text color="green.100" lineHeight="tall">Find a book to borrow, make your own, or share with someone new.</Text>
      </Stack>
      <Button asChild bg="green.200" color="green.950" _hover={{ bg: "green.100" }} size="lg"><Link href="/#catalog">Explore the collection ↗</Link></Button>
    </Flex>
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={{ base: "8", md: "12" }} borderTopWidth="1px" borderColor="green.800" mt="12" pt="10">
      <Stack align="start" gap="4"><Brand inverse /><Text color="green.100" fontSize="sm" maxW="xs">A welcoming place for curious minds and the stories that stay with us.</Text></Stack>
      <Stack align="start" gap="3"><Text fontSize="xs" fontWeight="bold" letterSpacing="widest" color="green.300">EXPLORE</Text>
        <ChakraLink asChild color="green.50"><Link href="/#catalog">Browse books</Link></ChakraLink>
        <ChakraLink asChild color="green.50"><Link href="/">Featured collection</Link></ChakraLink>
      </Stack>
      <Stack align="start" gap="3"><Text fontSize="xs" fontWeight="bold" letterSpacing="widest" color="green.300">YOUR LIBRARY</Text>
        <ChakraLink asChild color="green.50"><Link href="/login">Sign in</Link></ChakraLink>
        <ChakraLink asChild color="green.50"><Link href="/register">Create an account</Link></ChakraLink>
        <ChakraLink asChild color="green.50"><Link href="/profile">My profile</Link></ChakraLink>
      </Stack>
    </SimpleGrid>
    <Flex borderTopWidth="1px" borderColor="green.800" mt="10" pt="6" justify="space-between" gap="3" wrap="wrap" color="green.200" fontSize="xs">
      <Text>© {new Date().getFullYear()} Books Build Minds</Text><Text>Good books. Open minds.</Text>
    </Flex>
  </Box>
</Box>;

export default SiteFooter;
