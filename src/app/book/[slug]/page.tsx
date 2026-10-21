import BookDetailView from "@/server/views/books/BookDetailView";
import type { BookPageProps } from "@/props/books/BookPageProps";

const Page = (props: BookPageProps) => <BookDetailView {...props} />;

export default Page;
