import { SimpleGrid } from "@chakra-ui/react";
import GenericTabs from "@/Components/custom/tabs/GenericTabs";
import CatalogProfile from "@/Components/catalog/CatalogProfile";
import AdminBookForm from "@/Components/admin/AdminBookForm";
import BookReviews from "../reviews/BookReviews";
import type { BookDetailContentProps } from "@/props/books/BookDetailContentProps";

const BookTabs = ({ book, userId, isAdmin, purchased }: BookDetailContentProps) => <GenericTabs label="Book sections" items={[
  { value: "reviews", label: "Reviews", content: <BookReviews slug={book.slug} userId={userId} isAdmin={isAdmin} purchased={purchased} averageRating={book.averageRating} /> },
  { value: "creators", label: "Author & publisher", content: <SimpleGrid columns={{ base: 1, md: 2 }} gap="5">
    <CatalogProfile label="Author" profile={book.authorDetails} />
    <CatalogProfile label="Publisher" profile={book.publisherDetails} />
  </SimpleGrid> },
  ...(isAdmin ? [{ value: "edit", label: "Edit book", content: <AdminBookForm initialBook={book} /> }] : []),
]} />;

export default BookTabs;
