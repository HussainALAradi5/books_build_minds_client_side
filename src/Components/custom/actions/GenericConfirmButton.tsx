"use client";
import CustomButton from "../CustomButton";
import GenericDialog from "../GenericDialog";
import { useConfirmation } from "@/hooks/ui/useConfirmation";
import type { GenericConfirmButtonProps } from "@/props/custom/actions/GenericConfirmButtonProps";

const GenericConfirmButton = ({ title, description, confirmLabel = "Confirm", onConfirm, children, ...button }: GenericConfirmButtonProps) => {
  const state = useConfirmation();
  return <><CustomButton {...button} onClick={state.show}>{children}</CustomButton>
    {state.open && <GenericDialog open title={title} confirmLabel={confirmLabel} onConfirm={onConfirm} onClose={state.close}>
      {description}
    </GenericDialog>}</>;
};
export default GenericConfirmButton;
