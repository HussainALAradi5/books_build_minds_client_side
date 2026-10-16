import { api, uploadFiles } from "@/lib/apiClient";
import { buildQuery } from "@/lib/query";
import type { Media } from "@/interfaces/media/Media";
import type { Page } from "@/interfaces/shared/Page";
import type { User } from "@/interfaces/accounts/User";

export const media = {
  forBook: (bookId: number, page = 1) => api<Page<Media>>(`/media/books/${bookId}${buildQuery({ page })}`),
  upload: (bookId: number, files: File[]) => uploadFiles<{ message: string; items: Media[] }>(`/media/books/${bookId}`, files),
  uploadProfilePicture: (files: File[]) => uploadFiles<{ message: string; media: Media; user: User }>("/media/profile-picture", files),
};
