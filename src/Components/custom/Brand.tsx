import Link from "next/link";
import { Box, HStack, Link as ChakraLink, Text } from "@chakra-ui/react";
import type { BrandProps } from "@/props/custom/brand/BrandProps";

const Brand = ({ inverse = false }: BrandProps) => <ChakraLink asChild color="inherit" textDecoration="none" _hover={{ textDecoration: "none" }}>
  <Link href="/"><HStack gap="3" fontWeight="bold" letterSpacing="wide" fontSize="sm">
    <Box bg={inverse ? "green.300" : "green.700"} color={inverse ? "green.950" : "white"} _dark={inverse ? undefined : { bg: "green.300", color: "green.950" }} borderRadius="full" w="9" h="9" display="grid" placeItems="center" fontFamily="heading" fontSize="xl">B.</Box>
    <Text whiteSpace="nowrap">BOOKS <Text as="span" color={inverse ? "green.300" : "green.600"} _dark={{ color: "green.300" }}>BUILD</Text> MINDS</Text>
  </HStack></Link>
</ChakraLink>;

export default Brand;
