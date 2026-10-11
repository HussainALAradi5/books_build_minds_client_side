import Link from "next/link";
import { Box, Button, Flex, Grid, Heading, HStack, Text } from "@chakra-ui/react";
import BookBrowser from "./BookBrowser";
import type { HomeContentProps } from "@/props/catalog/HomeContentProps";

const HomeContent = ({ page }: HomeContentProps) => <>
  <Grid as="section" templateColumns={{ base: "1fr", md: "1fr 1fr" }} minH={{ md: "530px" }}>
    <Flex direction="column" align="start" justify="center" p={{ base: "8", md: "16" }} bg="green.50" _dark={{ bg: "green.950" }}>
      <Text color="green.700" _dark={{ color: "green.300" }} fontSize="xs" fontWeight="bold" letterSpacing="widest">A HOME FOR READERS &amp; DREAMERS</Text>
      <Heading as="h1" fontFamily="heading" fontWeight="medium" fontSize={{ base: "5xl", lg: "7xl" }} lineHeight="1.1" mt="7" mb="6">Every book opens<br /><Text as="em" color="green.600" _dark={{ color: "green.300" }}>a new world.</Text></Heading>
      <Text color="fg.muted" maxW="lg" lineHeight="tall" mb="7">Stories that stay with you. Ideas that move you. Find your next great read in our handpicked collection.</Text>
      <Button asChild colorPalette="green" bg="green.700" color="white" _dark={{ bg: "green.300", color: "green.950" }} size="lg"><Link href="#catalog">Explore the collection ↗</Link></Button>
      <HStack gap="10" mt="12"><Text fontFamily="heading" fontSize="3xl">{page.pagination.total.toString().padStart(2, "0")} <Text as="span" fontFamily="body" fontSize="xs" color="fg.muted">Books to explore</Text></Text><Text fontFamily="heading" fontSize="3xl">∞ <Text as="span" fontFamily="body" fontSize="xs" color="fg.muted">Ideas to discover</Text></Text></HStack>
    </Flex>
    <Flex bg="green.100" _dark={{ bg: "green.900" }} align="center" justify="center" minH={{ base: "300px", md: "530px" }} overflow="hidden" position="relative">
      <Flex borderRadius="full" boxSize={{ base: "250px", md: "390px" }} bg="green.300" _dark={{ bg: "green.700" }} boxShadow="0 0 0 50px var(--chakra-colors-green-200), 0 0 0 100px var(--chakra-colors-green-100)" align="center" justify="center" direction="column" transform="rotate(-12deg)" color="green.900" fontFamily="heading" fontWeight="bold" fontSize={{ base: "5xl", md: "7xl" }} lineHeight="1"><Text>READ</Text><Text color="yellow.100">✳</Text><Text as="em">GROW</Text></Flex>
      <Box position="absolute" bottom="8" right="6" bg="bg.panel" p="4" boxShadow="md" transform="rotate(5deg)" fontFamily="heading" display={{ base: "none", md: "block" }}>A little reading<br />goes a long way ↗</Box>
    </Flex>
  </Grid>
  <BookBrowser initialPage={page} />
  <Box as="section" bg="green.800" color="white" _dark={{ bg: "green.950" }} textAlign="center" py="20" px="5">
    <Text color="green.200" fontSize="xs" fontWeight="bold" letterSpacing="widest">TURN THE PAGE</Text>
    <Heading fontFamily="heading" fontWeight="medium" fontSize={{ base: "4xl", md: "5xl" }} my="5">There&apos;s always room<br />for one more story.</Heading>
    <Button asChild variant="outline" color="white" borderColor="green.200" _hover={{ bg: "green.700" }}><Link href="#catalog">Browse the books ↗</Link></Button>
  </Box>
</>;

export default HomeContent;
