import type { BaseEntity } from "@/interfaces/shared/BaseEntity";
import type { MediaType } from "@/enums/media/MediaType";

export interface Media extends BaseEntity {
  mediaId: number;
  bookId: number | null;
  userId: number | null;
  mediaType: MediaType;
  uploadedByUserId: number;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  uploadedAt: string;
  url: string;
}
