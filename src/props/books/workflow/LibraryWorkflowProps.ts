import type { TransactionKind } from "@/enums/payments/TransactionKind";

export interface LibraryWorkflowProps {
  slug: string;
  action: TransactionKind | "borrow";
  label: string;
  disabled?: boolean;
  onCompleted?: () => Promise<void>;
}
