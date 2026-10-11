import SiteHeader from "./SiteHeader";
import Brand from "@/Components/custom/Brand";
import { Box, Flex, Text } from "@chakra-ui/react";
import SessionProvider from "@/providers/SessionProvider";
import { getSessionUser } from "@/lib/session";
import type { AppChromeProps } from "@/props/layout/AppChromeProps";

const AppChrome = async ({ children }: AppChromeProps) => {
  const user = await getSessionUser();
  return <SessionProvider key={user?.userId ?? "guest"} initialUser={user}>
    <SiteHeader />
    <Box as="main" minH="70vh">{children}</Box>
    <Flex as="footer" bg="green.950" color="green.50" px={{ base: "5", md: "10" }} py="7" justify="space-between" align="center" gap="4" wrap="wrap">
      <Brand /><Text fontSize="sm">Good books. Open minds. © {new Date().getFullYear()}</Text>
    </Flex>
  </SessionProvider>;
};

export default AppChrome;
