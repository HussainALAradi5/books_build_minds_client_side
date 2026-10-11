import type { BaseEntity } from "@/interfaces/shared/BaseEntity";
import type { LibraryActionType } from "@/enums/library/LibraryActionType";

export interface LibraryActivity extends BaseEntity {
  activityId: number;
  userId: number;
  bookId: number;
  bookTitle: string;
  bookSlug: string;
  actionType: LibraryActionType;
  occurredAt: string;
}
