import type { WorkflowStep } from "@/interfaces/ui/workflow/WorkflowStep";

export interface GenericWorkflowGuideProps {
  title: string;
  steps: readonly WorkflowStep[];
  triggerLabel?: string;
  triggerSize?: "xs" | "sm" | "md";
}
