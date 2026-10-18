import { Flex } from "@chakra-ui/react";
import PurchaseActions from "./PurchaseActions";
import BookPrintActions from "./printing/BookPrintActions";
import type { BookActionBarProps } from "@/props/books/BookActionBarProps";

const BookActionBar = ({ slug, signedIn, purchased }: BookActionBarProps) => <Flex align="start" gap="2" wrap="wrap">
  <PurchaseActions slug={slug} signedIn={signedIn} purchased={purchased} />
  <BookPrintActions slug={slug} />
</Flex>;

export default BookActionBar;
