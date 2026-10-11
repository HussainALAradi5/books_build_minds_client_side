export enum MediaType {
  BookCover = "book_cover",
  BookGallery = "book_gallery",
  ProfilePicture = "profile_picture",
}
export const mediaTypeLabels: Record<MediaType, string> = {
  "book_cover": "Book cover",
  "book_gallery": "Book gallery",
  "profile_picture": "Profile picture",
};
export const mediaTypeColors: Record<MediaType, "blue" | "teal" | "purple"> = {
  "book_cover": "blue",
  "book_gallery": "teal",
  "profile_picture": "purple",
};
