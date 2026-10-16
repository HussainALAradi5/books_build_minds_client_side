import type { FormEvent } from "react";

export interface ReviewEditorProps {
  mode: "create" | "edit";
  rating: number;
  comment: string;
  description: string;
  busy: boolean;
  onRatingChange: (rating: number) => void;
  onCommentChange: (comment: string) => void;
  onDescriptionChange: (description: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
}
