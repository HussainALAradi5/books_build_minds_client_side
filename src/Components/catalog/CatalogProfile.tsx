import Link from "next/link";
import { Box, Heading, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import type { CatalogProfileProps } from "@/props/catalog/CatalogProfileProps";

const CatalogProfile = ({ label, profile, embedded = false }: CatalogProfileProps) => {
  if (!profile) return null;
  return <Box as="section" bg="bg.panel" borderWidth={embedded ? "0" : "1px"} borderRadius="lg" p={embedded ? "0" : "6"}>
    <Text color="green.700" _dark={{ color: "green.300" }} fontSize="xs" fontWeight="bold" textTransform="uppercase">{label}</Text>
    <Heading as="h3" fontFamily="heading" fontSize="2xl" mt="2">{profile.name}</Heading>
    {profile.country && <Text color="fg.muted" mt="1">Country: {profile.country.name}</Text>}
    {profile.description && <Text mt="4" whiteSpace="pre-wrap">{profile.description}</Text>}
    {profile.works.length > 0 && <Stack gap="1" mt="5"><Text fontWeight="bold">Works in this library</Text>
      {profile.works.slice(0, 5).map((work) => <ChakraLink asChild key={work.bookId} color="green.700" _dark={{ color: "green.300" }}><Link href={`/book/${work.slug}`}>{work.title}</Link></ChakraLink>)}
    </Stack>}
  </Box>;
};

export default CatalogProfile;
