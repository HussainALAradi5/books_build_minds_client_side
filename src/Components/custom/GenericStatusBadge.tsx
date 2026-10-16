import { Badge } from "@chakra-ui/react";
import type { GenericStatusBadgeProps } from "@/props/custom/display/GenericStatusBadgeProps";

const GenericStatusBadge = <T extends string>({ value, labels, colors }: GenericStatusBadgeProps<T>) =>
  <Badge colorPalette={colors[value]} variant="subtle" borderRadius="full" px="3" py="1"
    alignSelf="flex-start" w="fit-content" maxW="full" whiteSpace="nowrap">{labels[value]}</Badge>;

export default GenericStatusBadge;
