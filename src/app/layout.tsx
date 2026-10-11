import type { Metadata } from "next";
import SiteHeader from "@/Components/layout/SiteHeader";
import SessionProvider from "@/providers/SessionProvider";
import { getSessionUser } from "@/lib/session";
import "./globals.css";

export const metadata: Metadata = { title: "Books Build Minds", description: "Find your next great read." };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await getSessionUser();
  return <html lang="en"><body><SessionProvider key={user?.user_id ?? "guest"} initialUser={user}><SiteHeader /><main>{children}</main></SessionProvider><footer className="site-footer"><span className="brand"><span className="brand-mark">B.</span> BOOKS BUILD MINDS</span><span>Good books. Open minds. © {new Date().getFullYear()}</span></footer></body></html>;
}






