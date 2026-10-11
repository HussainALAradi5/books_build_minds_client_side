import { api, uploadFiles } from "@/lib/apiClient";
import { buildQuery } from "@/lib/query";
import type { MediaDto, PageDto } from "@/lib/types";

export const media = {
  forBook: (bookId: number, page = 1) => api<PageDto<MediaDto>>(`/media/books/${bookId}${buildQuery({ page })}`),
  upload: (bookId: number, files: File[]) => uploadFiles<{ message: string; items: MediaDto[] }>(`/media/books/${bookId}`, files),
  uploadProfilePicture: (files: File[]) => uploadFiles<{ message: string; media: MediaDto }>("/media/profile-picture", files),
};


