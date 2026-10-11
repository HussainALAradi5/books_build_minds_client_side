import type { BaseEntity } from "@/interfaces/shared/BaseEntity";
export interface AdminRequest extends BaseEntity {
  requestId: number;
  isAccepted: boolean | null;
  reviewTime: string | null;
  reviewedByUserId: number | null;
  reasonForRequest: string;
  requesterId: number;
}
