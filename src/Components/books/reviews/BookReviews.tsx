"use client";

import { Box, Flex, Heading, HStack, SimpleGrid, Stack, Text, Textarea } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import GenericDialog from "@/Components/custom/GenericDialog";
import GenericPagination from "@/Components/custom/GenericPagination";
import GenericStarRating from "@/Components/custom/ratings/GenericStarRating";
import { useBookReviews } from "@/hooks/books/reviews/useBookReviews";
import type { BookReviewsProps } from "@/props/books/reviews/BookReviewsProps";

const BookReviews = (props: BookReviewsProps) => {
  const { userId, purchased } = props;
  const state = useBookReviews(props);
  return <Box as="section" id="reviews" mt="12" pt="10" borderTopWidth="1px">
    <Flex justify="space-between" align="end" gap="4" mb="3"><Heading as="h2" fontFamily="heading" fontSize={{ base: "3xl", md: "4xl" }}>Reader reviews</Heading><Text color="fg.muted">{state.pagination.total} reviews</Text></Flex>
    <Text color="fg.muted" mb="6">Average rating: <Text as="strong" color="fg">{state.average.toFixed(1)} / 5</Text></Text>
    {state.items.length > 0 ? <SimpleGrid columns={{ base: 1, md: 2 }} gap="5">{state.items.map((item) =>
      <Box as="article" key={item.reviewId} bg="bg.panel" borderWidth="1px" borderRadius="lg" p="5">
        <Flex justify="space-between" gap="4"><Text fontWeight="bold">{item.userName}</Text><Text fontSize="xs" color="fg.muted">{new Date(item.createdAt).toLocaleDateString()}</Text></Flex>
        <Text color="orange.500" mt="2" aria-label={`${item.rating} out of 5 stars`}>★ {item.rating.toFixed(1)} / 5</Text>
        <Text my="3" whiteSpace="pre-wrap">{item.comment}</Text>
        {item.description && <Text color="fg.muted" whiteSpace="pre-wrap">{item.description}</Text>}
        {state.canManage(item) && <HStack mt="4"><CustomButton appearance="ghost" onClick={() => state.startEdit(item)}>Edit</CustomButton><CustomButton appearance="ghost" onClick={() => state.setDeleteId(item.reviewId)}>Delete</CustomButton></HStack>}
      </Box>)}</SimpleGrid> : <Text bg="bg.subtle" p="7">No reviews yet.</Text>}
    <GenericPagination pagination={state.pagination} onPageChange={(page) => void state.load(page)} loading={state.busy} />
    {state.ownReview && !state.showForm && <CustomButton appearance="secondary" onClick={() => state.startEdit(state.ownReview!)}>Edit your review</CustomButton>}
    {state.showForm && <Box mt="8" maxW="xl"><Heading as="h3" fontSize="xl" mb="4">{state.editingId === null ? "Write a review" : "Edit review"}</Heading>
      <form onSubmit={state.submit}><Stack gap="3"><GenericStarRating value={state.rating} onChange={state.setRating} disabled={state.busy} />
        <Textarea aria-label="Review comment" placeholder="Your comment" required minLength={10} maxLength={2000} value={state.comment} onChange={(event) => state.setComment(event.target.value)} minH="100px" />
        <Textarea aria-label="Review description" placeholder="More detail (optional)" maxLength={4000} value={state.description} onChange={(event) => state.setDescription(event.target.value)} minH="90px" />
        <HStack><CustomButton type="submit" loading={state.busy} disabled={state.rating < 1 || state.comment.trim().length < 10} loadingText="Saving...">{state.editingId === null ? "Post review" : "Save review"}</CustomButton>{state.editingId !== null && <CustomButton appearance="ghost" onClick={state.clearForm}>Cancel</CustomButton>}</HStack>
      </Stack></form></Box>}
    {userId && !purchased && <Text color="fg.muted" mt="6">Purchase this book to write a review.</Text>}
    {!userId && <Text color="fg.muted" mt="6">Sign in and purchase this book to write a review.</Text>}
    <GenericDialog open={state.deleteId !== null} title="Delete review?" confirmLabel="Delete review" onClose={() => state.setDeleteId(null)} onConfirm={state.removeSelected}>The review will be hidden while its record remains in the library history.</GenericDialog>
    {state.error && <Text mt="4" color="red.500" role="alert">{state.error}</Text>}
  </Box>;
};

export default BookReviews;
