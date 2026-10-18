import GenericTabs from "@/Components/custom/tabs/GenericTabs";
import BookOverview from "./BookOverview";
import BookCreators from "./BookCreators";
import type { BookDetailContentProps } from "@/props/books/BookDetailContentProps";

const BookInformationTabs = (props: BookDetailContentProps) => <GenericTabs label="Book information" items={[
  { value: "book", label: "Book details", content: <BookOverview {...props} /> },
  { value: "creators", label: "Author & publisher", content: <BookCreators book={props.book} /> },
]} />;

export default BookInformationTabs;
