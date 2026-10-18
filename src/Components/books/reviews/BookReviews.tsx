"use client";

import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import GenericDialog from "@/Components/custom/GenericDialog";
import GenericPagination from "@/Components/custom/GenericPagination";
import { useBookReviews } from "@/hooks/books/reviews/useBookReviews";
import type { BookReviewsProps } from "@/props/books/reviews/BookReviewsProps";
import ReviewCard from "./ReviewCard";
import ReviewEditor from "./ReviewEditor";

const BookReviews = (props: BookReviewsProps) => {
  const { userId, purchased } = props;
  const state = useBookReviews(props);
  return <Box as="section" id="reviews">
    <Flex justify="space-between" align="end" gap="4" mb="3"><Heading as="h2" fontFamily="heading" fontSize={{ base: "3xl", md: "4xl" }}>Reader reviews</Heading><Text color="fg.muted">{state.pagination.total} {state.pagination.total === 1 ? "review" : "reviews"}</Text></Flex>
    <Text color="fg.muted" mb="6">Average rating: <Text as="strong" color="fg">{state.average.toFixed(1)} / 5</Text></Text>
    {state.visibleItems.length > 0 ? <SimpleGrid columns={{ base: 1, md: 2 }} gap="5">{state.visibleItems.map((item) =>
      <ReviewCard key={item.reviewId} review={item} canEdit={state.canEdit(item)} canDelete={state.canDelete(item)}
        onEdit={state.startEdit} onDelete={state.setDeleteId}
        editor={state.editingId === item.reviewId ? <ReviewEditor mode="edit" rating={state.rating}
          comment={state.comment} description={state.description} busy={state.busy}
          onRatingChange={state.setRating} onCommentChange={state.setComment}
          onDescriptionChange={state.setDescription} onSubmit={state.submit} onCancel={state.clearForm} /> : undefined} />
    )}</SimpleGrid> : <Text bg="bg.subtle" p="7">No reviews yet.</Text>}
    <GenericPagination pagination={state.pagination} onPageChange={(page) => void state.load(page)} loading={state.busy} />
    {state.canCreate && <Box mt="8" maxW="xl"><Heading as="h3" fontSize="xl" mb="4">Write a review</Heading>
      <ReviewEditor mode="create" rating={state.rating} comment={state.comment} description={state.description}
        busy={state.busy} onRatingChange={state.setRating} onCommentChange={state.setComment}
        onDescriptionChange={state.setDescription} onSubmit={state.submit} />
    </Box>}
    {userId && !purchased && <Text color="fg.muted" mt="6">Purchase this book to write a review.</Text>}
    {!userId && <Text color="fg.muted" mt="6">Sign in and purchase this book to write a review.</Text>}
    <GenericDialog open={state.deleteId !== null} title="Delete review?" confirmLabel="Delete review" destructive
      onClose={() => state.setDeleteId(null)} onConfirm={state.removeSelected}>The review will be hidden while its record remains in the library history.</GenericDialog>
    {state.error && <Text mt="4" color="red.500" role="alert">{state.error}</Text>}
  </Box>;
};

export default BookReviews;
