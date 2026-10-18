import { Suspense } from "react";
import TransactionReturn from "@/Components/payments/TransactionReturn";
import BookPrintActions from "./printing/BookPrintActions";
import Link from "next/link";
import { Box, Container, Grid, Heading, Link as ChakraLink, SimpleGrid, Text } from "@chakra-ui/react";
import BookCover from "@/Components/catalog/BookCover";
import PurchaseActions from "./PurchaseActions";
import LoanActions from "./LoanActions";
import GenericStatusBadge from "@/Components/custom/GenericStatusBadge";
import { bookStatusColors, bookStatusLabels } from "@/enums/books/BookStatus";
import type { BookDetailContentProps } from "@/props/books/BookDetailContentProps";
import BookTabs from "./tabs/BookTabs";
import GenericWorkflowGuide from "@/Components/custom/workflow/GenericWorkflowGuide";
import { libraryGuideSteps } from "@/constants/workflow/libraryGuideSteps";
import GenericProgress from "@/Components/custom/feedback/GenericProgress";
import { availabilityTone } from "@/lib/progress/availabilityTone";

const BookDetailContent = ({ book, signedIn, purchased, userId, isAdmin }: BookDetailContentProps) => <Container maxW="6xl" py={{ base: "8", md: "14" }}>
  <ChakraLink asChild color="green.700" _dark={{ color: "green.300" }} fontSize="sm" fontWeight="semibold"><Link href="/">← Back to books</Link></ChakraLink>
  <Grid templateColumns={{ base: "1fr", md: "minmax(280px, 430px) 1fr" }} gap={{ base: "7", md: "14" }} mt="7" alignItems="start">
    <BookCover book={book} large />
    <Box>
      <Text color="green.700" _dark={{ color: "green.300" }} fontSize="xs" fontWeight="bold" letterSpacing="widest">THE COLLECTION / {book.publisher.toUpperCase()}</Text>
      <Heading as="h1" fontFamily="heading" fontWeight="medium" fontSize={{ base: "4xl", md: "6xl" }} lineHeight="1.1" mt="4">{book.title}</Heading>
      <Text color="fg.muted" fontSize="lg" mt="2">by {book.author}</Text>
      <Text borderBottomWidth="1px" py="5"><Text as="span" color="orange.500">★</Text> {book.averageRating.toFixed(1)} <Text as="span" color="fg.muted">reader rating</Text></Text>
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
      <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4" borderTopWidth="1px" mt="8" pt="5" fontSize="sm">
        <Box><Text color="fg.muted">Publisher</Text><Text fontWeight="semibold">{book.publisher}</Text></Box>
        <Box><Text color="fg.muted">Published</Text><Text fontWeight="semibold">{book.publishedAt}</Text></Box>
        <Box><Text color="fg.muted">ISBN</Text><Text fontWeight="semibold">{book.isbn}</Text></Box>
        <Box><Text color="fg.muted">Condition</Text><GenericStatusBadge value={book.condition} labels={bookStatusLabels} colors={bookStatusColors} /></Box>
      </SimpleGrid>
    </Box>
  </Grid>
  <BookTabs book={book} signedIn={signedIn} purchased={purchased} userId={userId} isAdmin={isAdmin} />
</Container>;

export default BookDetailContent;
