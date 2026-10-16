import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import AccountAvatar from "@/Components/custom/display/AccountAvatar";
import GenericImagePreview from "@/Components/custom/media/GenericImagePreview";
import CustomButton from "@/Components/custom/CustomButton";
import { mediaUrl } from "@/lib/mediaUrl";
import type { ReviewCardProps } from "@/props/books/reviews/ReviewCardProps";

const ReviewCard = ({ review, canEdit, canDelete, editor, onEdit, onDelete }: ReviewCardProps) => <Box as="article"
  bg="bg.panel" borderWidth="1px" borderColor="border.subtle" borderRadius="2xl" p="5" boxShadow="xs">
  <Flex justify="space-between" align="start" gap="3" wrap="wrap">
    <HStack gap="3">
      {review.profilePictureUrl ? <GenericImagePreview src={mediaUrl(review.profilePictureUrl)} alt={`${review.userName}'s profile photo`}>
        <AccountAvatar name={review.userName} imageUrl={review.profilePictureUrl} size="10" />
      </GenericImagePreview> : <AccountAvatar name={review.userName} size="10" />}
      <Stack gap="0"><Text fontWeight="semibold">{review.userName}</Text>
        <Text fontSize="xs" color="fg.muted">{new Date(review.createdAt).toLocaleDateString()}</Text>
      </Stack>
    </HStack>
    <Text color="orange.500" aria-label={`${review.rating} out of 5 stars`}>★ {review.rating.toFixed(1)} / 5</Text>
  </Flex>
  {editor ? <Box mt="4">{editor}</Box> : <>
    <Text mt="4" whiteSpace="pre-wrap">{review.comment}</Text>
    {review.description && <Text color="fg.muted" whiteSpace="pre-wrap" mt="2">{review.description}</Text>}
    {(canEdit || canDelete) && <HStack mt="4">
      {canEdit && <CustomButton appearance="ghost" onClick={() => onEdit(review)}>Edit</CustomButton>}
      {canDelete && <CustomButton appearance="danger" size="sm" onClick={() => onDelete(review.reviewId)}>Delete</CustomButton>}
    </HStack>}
  </>}
</Box>;

export default ReviewCard;
