import AppChrome from "@/Components/layout/AppChrome";
import UiProvider from "@/providers/UiProvider";
import type { RootLayoutProps } from "@/props/layout/RootLayoutProps";

const RootLayout = ({ children }: RootLayoutProps) => {
  return <html lang="en" suppressHydrationWarning><head><title>Books Build Minds</title><meta name="description" content="Find your next great read." /></head>
    <body><UiProvider><AppChrome>{children}</AppChrome></UiProvider></body>
  </html>;
};

export default RootLayout;
