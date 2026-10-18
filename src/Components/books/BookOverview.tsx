import { Suspense } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import TransactionReturn from "@/Components/payments/TransactionReturn";
import PurchaseActions from "./PurchaseActions";
import LoanActions from "./LoanActions";
import BookEditAction from "./BookEditAction";
import BookInfoCard from "./BookInfoCard";
import BookPrintActions from "./printing/BookPrintActions";
import GenericWorkflowGuide from "@/Components/custom/workflow/GenericWorkflowGuide";
import GenericProgress from "@/Components/custom/feedback/GenericProgress";
import { libraryGuideSteps } from "@/constants/workflow/libraryGuideSteps";
import { availabilityTone } from "@/lib/progress/availabilityTone";
import type { BookDetailContentProps } from "@/props/books/BookDetailContentProps";

const BookOverview = ({ book, signedIn, purchased, isAdmin }: BookDetailContentProps) => <Box>
  <Text color="green.700" _dark={{ color: "green.300" }} fontSize="xs" fontWeight="bold" letterSpacing="widest">THE COLLECTION / {book.publisher.toUpperCase()}</Text>
  <Flex align="start" justify="space-between" gap="4" wrap="wrap" mt="4"><Heading as="h1" fontFamily="heading" fontWeight="medium" fontSize={{ base: "4xl", md: "6xl" }} lineHeight="1.1">{book.title}</Heading>
    {isAdmin && <BookEditAction book={book} />}</Flex>
  <Text color="fg.muted" fontSize="lg" mt="2">by {book.author}</Text>
  <Text borderBottomWidth="1px" py="5"><Text as="span" color="orange.500">★</Text> {book.averageRating.toFixed(1)} <Text as="span" color="fg.muted">reader rating</Text></Text>
  <Box mt="5"><BookInfoCard book={book} /></Box>
  <Text fontFamily="heading" fontSize="3xl" fontWeight="semibold" mt="5">{book.price.toFixed(2)} <Text as="span" fontFamily="body" fontSize="sm">BHD</Text></Text>
  <Text color="fg.muted" lineHeight="tall" maxW="lg" mt="4">A book worth making room for on your shelf. Discover new perspectives, memorable stories, and the joy of reading.</Text>
  {signedIn && <Suspense><TransactionReturn /></Suspense>}
  <BookPrintActions key={book.slug} slug={book.slug} />
  <Box mt="5" maxW="lg"><GenericProgress label="Copies available" value={book.availableCopies}
    max={Math.max(1, book.copiesTotal)} tone={availabilityTone(book.availableCopies, book.copiesTotal)}
    valueLabel={`${book.availableCopies} of ${book.copiesTotal} copies`} /></Box>
  <LoanActions book={book} signedIn={signedIn} />
  <PurchaseActions slug={book.slug} signedIn={signedIn} purchased={purchased} />
  <Box mt="4"><GenericWorkflowGuide title="Borrow, buy, and review" steps={libraryGuideSteps} /></Box>
</Box>;

export default BookOverview;
