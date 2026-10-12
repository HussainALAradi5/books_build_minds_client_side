"use client";

import { Dialog, Heading, HStack, Portal, Text } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import GenericAnimation from "@/Components/custom/animation/GenericAnimation";
import { useWorkflowGuide } from "@/hooks/ui/workflow/useWorkflowGuide";
import type { GenericWorkflowGuideProps } from "@/props/custom/workflow/GenericWorkflowGuideProps";

const GenericWorkflowGuide = ({ title, steps, triggerLabel = "Step-by-step guide" }: GenericWorkflowGuideProps) => {
  const guide = useWorkflowGuide(steps);
  return <Dialog.Root open={guide.open} onOpenChange={guide.changeOpen} placement="center" scrollBehavior="inside">
    <Dialog.Trigger asChild><CustomButton appearance="secondary" disabled={!guide.step}>{triggerLabel}</CustomButton></Dialog.Trigger>
    <Portal><Dialog.Backdrop /><Dialog.Positioner p="4"><Dialog.Content maxW="lg" maxH="85dvh" borderRadius="xl">
      <Dialog.Header><Dialog.Title>{title}</Dialog.Title></Dialog.Header>
      <Dialog.Body>
        <Dialog.Description mb="5">Follow these instructions in the library. This guide does not submit actions for you.</Dialog.Description>
        <GenericAnimation key={guide.step?.id} aria-live="polite" aria-atomic="true">
          <Text fontSize="sm" color="fg.muted" mb="2">Step {guide.currentIndex + 1} of {steps.length}</Text>
          <Heading as="h2" size="lg" mb="3">{guide.step?.title}</Heading>
          <Text lineHeight="tall">{guide.step?.description}</Text>
        </GenericAnimation>
      </Dialog.Body>
      <Dialog.Footer flexWrap="wrap" justifyContent="space-between" gap="3">
        <CustomButton appearance="ghost" onClick={guide.close}>Close guide</CustomButton>
        <HStack gap="2"><CustomButton appearance="secondary" onClick={guide.previous} disabled={guide.isFirst}>Previous</CustomButton>
          <CustomButton onClick={guide.isLast ? guide.close : guide.next}>{guide.isLast ? "Done" : "Next"}</CustomButton></HStack>
      </Dialog.Footer>
    </Dialog.Content></Dialog.Positioner></Portal>
  </Dialog.Root>;
};

export default GenericWorkflowGuide;
