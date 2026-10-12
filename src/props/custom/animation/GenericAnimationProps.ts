import type { BoxProps } from "@chakra-ui/react";
import type { AnimationPreset } from "@/enums/ui/AnimationPreset";

export interface GenericAnimationProps extends BoxProps {
  preset?: AnimationPreset;
  active?: boolean;
}
