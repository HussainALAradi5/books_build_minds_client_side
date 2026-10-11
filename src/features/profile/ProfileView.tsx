import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session";
import LoansPanel from "@/Components/profile/LoansPanel";
import ProfilePictureUpload from "@/Components/profile/ProfilePictureUpload";

export default async function ProfileView() {
  const user = await getSessionUser(); if (!user) redirect("/login");
  return <div className="profile-shell"><Link href="/" className="back-link">← Back to books</Link><div className="profile-card"><div className="profile-avatar">{user.profile_picture_url ? <Image src={`/api/backend${user.profile_picture_url}`} alt={`${user.user_name}'s profile`} width={68} height={68} unoptimized /> : user.user_name.charAt(0).toUpperCase()}</div><span className="eyebrow">YOUR READING SPACE</span><h1>Welcome back, {user.user_name}.</h1><p>Your profile and collection live here.</p><dl className="book-facts"><div><dt>Email</dt><dd>{user.email}</dd></div><div><dt>Account</dt><dd>{user.is_admin ? "Administrator" : "Reader"}</dd></div><div><dt>Purchased books</dt><dd>{user.purchased_books.length}</dd></div></dl><ProfilePictureUpload />{user.is_admin && <Link className="primary-button" href="/admin">Open admin panel →</Link>}</div><LoansPanel userId={user.user_id} /></div>;
}







