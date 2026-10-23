import AppChrome from "@/Components/layout/AppChrome";
import UiProvider from "@/providers/UiProvider";
import EmotionRegistry from "@/providers/EmotionRegistry";
import type { RootLayoutProps } from "@/props/layout/RootLayoutProps";

const RootLayout = ({ children }: RootLayoutProps) => {
  return <html lang="en" suppressHydrationWarning><head><title>Books Build Minds</title><meta name="description" content="Find your next great read." /></head>
    <body suppressHydrationWarning><EmotionRegistry><UiProvider><AppChrome>{children}</AppChrome></UiProvider></EmotionRegistry></body>
  </html>;
};

export default RootLayout;
