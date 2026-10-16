import { Box, Button, Heading, Text } from "@chakra-ui/react";

const CatalogUnavailable = () => <Box as="section" maxW="2xl" mx="auto" px="5" py={{ base: "20", md: "28" }} textAlign="center" role="status">
  <Text color="green.700" _dark={{ color: "green.300" }} fontSize="sm" fontWeight="bold">LIBRARY CONNECTION</Text>
  <Heading as="h1" fontFamily="heading" fontSize={{ base: "3xl", md: "5xl" }} mt="3">The catalog is temporarily unavailable.</Heading>
  <Text color="fg.muted" mt="5">Start the library server, then reload this page to see the books.</Text>
  <Button asChild colorPalette="green" mt="7"><a href="/">Try again</a></Button>
</Box>;

export default CatalogUnavailable;
