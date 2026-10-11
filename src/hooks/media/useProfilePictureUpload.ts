"use client";

import { useRouter } from "next/navigation";
import { media } from "@/services/media";

export const useProfilePictureUpload = () => {
  const router = useRouter();
  return async (files: File[]) => { await media.uploadProfilePicture(files); router.refresh(); };
};
