import BookDetailView from "@/features/book/BookDetailView";
import type { BookPageProps } from "@/props/books/BookPageProps";

const Page = (props: BookPageProps) => <BookDetailView {...props} />;

export default Page;
