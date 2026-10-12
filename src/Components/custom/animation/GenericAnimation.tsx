"use client";

import { Box } from "@chakra-ui/react";
import { AnimationPreset } from "@/enums/ui/AnimationPreset";
import { animationNames } from "@/constants/ui/animations/animationNames";
import type { GenericAnimationProps } from "@/props/custom/animation/GenericAnimationProps";

const GenericAnimation = ({ children, preset = AnimationPreset.Slide, active = true, ...props }: GenericAnimationProps) =>
  <Box {...props} animationName={active ? animationNames[preset] : "none"} animationDuration="200ms" animationTimingFunction="ease-out"
    _motionReduce={{ animation: "none" }}>
    {children}
  </Box>;

export default GenericAnimation;
