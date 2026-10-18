import { Flex, Stack, Text } from "@chakra-ui/react";
import GenericStatusBadge from "@/Components/custom/GenericStatusBadge";
import GenericProgress from "@/Components/custom/feedback/GenericProgress";
import { bookConditionTones, bookStatusColors, bookStatusLabels, bookWearLevels } from "@/enums/books/BookStatus";
import type { BookConditionIndicatorProps } from "@/props/books/BookConditionIndicatorProps";

const BookConditionIndicator = ({ condition }: BookConditionIndicatorProps) => <Stack gap="2" minW="28" maxW="40">
  <Flex align="center" justify="space-between" gap="2"><GenericStatusBadge value={condition} labels={bookStatusLabels} colors={bookStatusColors} />
    <Text fontSize="xs" color="fg.muted">Wear</Text></Flex>
  <GenericProgress compact label="Book wear level" value={bookWearLevels[condition]} max={3}
    tone={bookConditionTones[condition]} valueLabel={bookStatusLabels[condition]} />
</Stack>;

export default BookConditionIndicator;
