import { Flex, Progress, Text } from "@chakra-ui/react";
import { progressToneColors } from "@/enums/ui/ProgressTone";
import type { GenericProgressProps } from "@/props/custom/feedback/GenericProgressProps";

const GenericProgress = ({ label, value, max, tone, valueLabel, animated = false, compact = false }: GenericProgressProps) =>
  <Progress.Root value={value} max={max} colorPalette={progressToneColors[tone]} variant="subtle"
    shape="full" size="sm" striped={animated} animated={animated} aria-label={compact ? `${label}: ${valueLabel ?? value}` : undefined}>
    {!compact && <Flex justify="space-between" align="center" gap="3" mb="2">
      <Progress.Label fontSize="sm">{label}</Progress.Label>
      <Text fontSize="xs" fontWeight="semibold" color="fg.muted" aria-live="polite">{valueLabel ?? `${value} of ${max}`}</Text>
    </Flex>}
    <Progress.Track><Progress.Range _motionReduce={{ animation: "none", transition: "none" }} /></Progress.Track>
  </Progress.Root>;

export default GenericProgress;
