import { notFound } from "next/navigation";
import BookDetailContent from "@/Components/books/BookDetailContent";
import { getBook } from "@/lib/server-api";
import { getSessionUser } from "@/lib/session";
import type { BookPageProps } from "@/props/books/BookPageProps";
import { Permission } from "@/enums/accounts/Permission";
import { hasPermission } from "@/lib/access";
import { AccountRole } from "@/enums/accounts/AccountRole";

const BookDetailView = async ({ params }: BookPageProps) => {
  const { slug } = await params;
  const book = await getBook(slug);
  if (!book) notFound();
  const user = await getSessionUser();
  const purchased = Boolean(user?.purchasedBooks.includes(book.bookId));
  return <BookDetailContent book={book} signedIn={Boolean(user)} purchased={purchased} userId={user?.userId ?? null}
    isAdmin={user?.role === AccountRole.Admin && hasPermission(user, Permission.BookEditAny)} />;
};

export default BookDetailView;
