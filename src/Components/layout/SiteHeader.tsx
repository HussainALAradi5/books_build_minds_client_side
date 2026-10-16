"use client";

import Link from "next/link";
import { useHeaderSession } from "@/hooks/auth/useHeaderSession";
import CustomButton from "@/Components/custom/CustomButton";
import Brand from "@/Components/custom/Brand";
import AccountMenu from "./account/AccountMenu";
import { Box, Flex, HStack, Link as ChakraLink, Text } from "@chakra-ui/react";
import { useColorMode } from "@/hooks/ui/useColorMode";

const SiteHeader = () => {
  const { user, busy, error, logout, canManage } = useHeaderSession();
  const { dark, mounted, toggle } = useColorMode();
  return <Box as="header" borderBottomWidth="1px" bg="bg.panel" position="relative" zIndex="10">
    <Flex maxW="7xl" mx="auto" px={{ base: "4", md: "8" }} py="4" align="center" justify="space-between" gap="4" wrap="wrap">
      <Brand />
      <HStack as="nav" aria-label="Main navigation" gap={{ base: "2", md: "5" }} wrap="wrap" fontSize="sm" fontWeight="semibold">
        <ChakraLink asChild><Link href="/">Explore books</Link></ChakraLink>
        <CustomButton appearance="ghost" onClick={toggle} disabled={!mounted}
          aria-label={mounted ? `Switch to ${dark ? "light" : "dark"} mode` : "Color mode loading"}>
          {mounted ? (dark ? "☀ Light" : "☾ Dark") : "◐ Theme"}
        </CustomButton>
        {user ? <AccountMenu user={user} busy={busy} canManage={canManage} onSignOut={logout} /> : <><ChakraLink asChild><Link href="/login">Sign in</Link></ChakraLink><ChakraLink asChild color="green.700" _dark={{ color: "green.300" }}><Link href="/register">Join the club ↗</Link></ChakraLink></>}
      </HStack>{error && <Text role="alert" color="red.500" fontSize="sm">{error}</Text>}
    </Flex>
  </Box>;
};

export default SiteHeader;
