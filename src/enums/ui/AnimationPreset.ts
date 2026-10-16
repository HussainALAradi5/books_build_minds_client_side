export enum AnimationPreset {
  Fade = "fade",
  Slide = "slide",
}

export const animationPresetLabels: Record<AnimationPreset, string> = {
  [AnimationPreset.Fade]: "Fade",
  [AnimationPreset.Slide]: "Slide",
};
export const animationPresetColors: Record<AnimationPreset, "blue" | "purple"> = {
  [AnimationPreset.Fade]: "blue",
  [AnimationPreset.Slide]: "purple",
};
