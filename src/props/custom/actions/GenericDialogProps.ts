import type { ReactNode } from "react";
export interface GenericDialogProps { open: boolean; title: string; children: ReactNode; confirmLabel: string; onConfirm: () => Promise<void>; onClose: () => void; destructive?: boolean }
