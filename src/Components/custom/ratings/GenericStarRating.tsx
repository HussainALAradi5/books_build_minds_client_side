import { HStack, IconButton } from "@chakra-ui/react";
import type { GenericStarRatingProps } from "@/props/custom/ratings/GenericStarRatingProps";

const GenericStarRating = ({ value, onChange, disabled }: GenericStarRatingProps) => <HStack role="group" aria-label="Rate this book" gap="1">
  {[1, 2, 3, 4, 5].map((rating) => <IconButton key={rating} aria-label={`Rate ${rating} stars`} variant="ghost"
    color={rating <= value ? "orange.500" : "fg.muted"} disabled={disabled} onClick={() => onChange(rating)}
    fontSize="2xl">★</IconButton>)}
</HStack>;

export default GenericStarRating;
