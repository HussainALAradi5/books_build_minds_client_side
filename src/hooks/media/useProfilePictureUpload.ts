"use client";

import { useRouter } from "next/navigation";
import { media } from "@/services/media";
import { useSession } from "@/hooks/auth/useSession";

export const useProfilePictureUpload = () => {
  const router = useRouter();
  const { setUser } = useSession();
  return async (files: File[]) => {
    const result = await media.uploadProfilePicture(files);
    setUser(result.user);
    router.refresh();
  };
};
