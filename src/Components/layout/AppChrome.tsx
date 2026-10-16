import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { Box } from "@chakra-ui/react";
import SessionProvider from "@/providers/SessionProvider";
import { getSessionUser } from "@/lib/session";
import type { AppChromeProps } from "@/props/layout/AppChromeProps";

const AppChrome = async ({ children }: AppChromeProps) => {
  const user = await getSessionUser();
  return <SessionProvider key={user?.userId ?? "guest"} initialUser={user}>
    <SiteHeader />
    <Box as="main" minH="70vh">{children}</Box>
    <SiteFooter />
  </SessionProvider>;
};

export default AppChrome;
