"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "@/hooks/auth/useSession";

export default function SiteHeader() {
  const { user, setUser } = useSession();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  async function logout() {
    setBusy(true);
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
    setBusy(false);
  }
  return <header className="site-header">
    <div className="header-inner">
      <Link href="/" className="brand"><span className="brand-mark">B.</span><span>BOOKS <em>BUILD</em> MINDS</span></Link>
      <nav aria-label="Main navigation">
        <Link href="/">Explore books</Link>
        {user ? <><Link href="/profile">My profile</Link>{user.is_admin && <Link href="/admin">Admin</Link>}<button type="button" onClick={logout} disabled={busy}>Sign out</button></> : <><Link href="/login">Sign in</Link><Link href="/register" className="nav-cta">Join the club <span aria-hidden>↗</span></Link></>}
      </nav>
    </div>
  </header>;
}




