import Link from "next/link";
import BookBrowser from "@/Components/catalog/BookBrowser";
import { getBooks } from "@/lib/server-api";

export default async function HomeView() {
  const { page, demo } = await getBooks();
  return <><section className="hero"><div className="hero-copy"><span className="eyebrow">A HOME FOR READERS & DREAMERS</span><h1>Every book opens<br /><em>a new world.</em></h1><p>Stories that stay with you. Ideas that move you. Find your next great read in our handpicked collection.</p><Link className="primary-button" href="#catalog">Explore the collection <span aria-hidden>↗</span></Link><div className="hero-stats"><div><strong>{page.pagination.total.toString().padStart(2,"0")}</strong><span>Books to explore</span></div><div><strong>∞</strong><span>Ideas to discover</span></div></div></div><div className="hero-art" aria-hidden><div className="art-circle"><span className="art-word art-word-one">READ</span><span className="art-star">✳</span><span className="art-word art-word-two">GROW</span></div><div className="floating-label">A little reading<br />goes a long way ↗</div></div></section>{demo && <div className="demo-banner" role="status">Preview catalog shown while the Flask API is offline. Account and purchase actions need the server.</div>}<BookBrowser initialPage={page} demo={demo} /><section className="closing-banner"><span className="eyebrow">TURN THE PAGE</span><h2>There&apos;s always room<br />for one more story.</h2><Link href="#catalog">Browse the books <span aria-hidden>↗</span></Link></section></>;
}





