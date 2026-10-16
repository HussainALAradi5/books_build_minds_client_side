import { HStack, Stack, Textarea } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import GenericStarRating from "@/Components/custom/ratings/GenericStarRating";
import type { ReviewEditorProps } from "@/props/books/reviews/ReviewEditorProps";

const ReviewEditor = ({ mode, rating, comment, description, busy, onRatingChange, onCommentChange,
  onDescriptionChange, onSubmit, onCancel }: ReviewEditorProps) => <form onSubmit={onSubmit}>
  <Stack gap="3">
    <GenericStarRating value={rating} onChange={onRatingChange} disabled={busy} />
    <Textarea aria-label="Review comment" placeholder="Your comment" required minLength={10} maxLength={2000}
      value={comment} onChange={(event) => onCommentChange(event.target.value)} minH="100px" />
    <Textarea aria-label="Review description" placeholder="More detail (optional)" maxLength={4000}
      value={description} onChange={(event) => onDescriptionChange(event.target.value)} minH="90px" />
    <HStack>
      <CustomButton type="submit" loading={busy} disabled={rating < 1 || comment.trim().length < 10}
        loadingText="Saving...">{mode === "edit" ? "Save review" : "Post review"}</CustomButton>
      {onCancel && <CustomButton appearance="ghost" disabled={busy} onClick={onCancel}>Cancel</CustomButton>}
    </HStack>
  </Stack>
</form>;

export default ReviewEditor;
