import type { BadgeProps } from "@chakra-ui/react";

export interface GenericStatusBadgeProps<T extends string> {
  value: T;
  labels: Record<T, string>;
  colors: Record<T, NonNullable<BadgeProps["colorPalette"]>>;
}
