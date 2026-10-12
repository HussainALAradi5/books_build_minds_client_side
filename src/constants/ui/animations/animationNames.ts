import { AnimationPreset } from "@/enums/ui/AnimationPreset";

export const animationNames: Record<AnimationPreset, string> = {
  [AnimationPreset.Fade]: "content-fade",
  [AnimationPreset.Slide]: "content-enter",
};
