"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setBusy(true);
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const payload = mode === "login" ? { user_name_or_email: values.identifier, password: values.password } : { user_name: values.user_name, email: values.email, password: values.password };
    try {
      const response = await fetch(`/api/auth/${mode}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Please try again.");
      router.push(mode === "login" ? "/profile" : "/login"); router.refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Please try again."); }
    finally { setBusy(false); }
  }
  return <div className="auth-shell"><div className="auth-aside"><span className="eyebrow">A NEW CHAPTER STARTS HERE</span><h1>Stories worth<br /><em>sharing.</em></h1><p>Explore a thoughtful collection of books and make space for your next favorite idea.</p><div className="aside-ornament" aria-hidden>✳</div></div><div className="auth-panel"><Link href="/" className="back-link">← Back to books</Link><span className="eyebrow">{mode === "login" ? "WELCOME BACK" : "JOIN THE COMMUNITY"}</span><h2>{mode === "login" ? "Sign in to your account" : "Create your account"}</h2><p>{mode === "login" ? "Your bookshelf is waiting." : "Your next great read is a few steps away."}</p><form onSubmit={submit} className="form-stack">
    {mode === "register" && <><label>Username<input name="user_name" autoComplete="username" required minLength={2} /></label><label>Email address<input name="email" type="email" autoComplete="email" required /></label></>}
    {mode === "login" && <label>Username or email<input name="identifier" autoComplete="username" required /></label>}
    <label>Password<input name="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} required minLength={8} /><small>At least 5 letters and 3 numbers.</small></label>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="primary-button" disabled={busy}>{busy ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"} <span aria-hidden>→</span></button>
  </form><p className="auth-switch">{mode === "login" ? "New to Books Build Minds?" : "Already have an account?"} <Link href={mode === "login" ? "/register" : "/login"}>{mode === "login" ? "Create an account" : "Sign in"}</Link></p></div></div>;
}



