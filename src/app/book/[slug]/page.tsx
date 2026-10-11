import BookDetailView from "@/features/book/BookDetailView";
export default function Page(props: { params: Promise<{ slug: string }> }) { return <BookDetailView {...props} />; }




