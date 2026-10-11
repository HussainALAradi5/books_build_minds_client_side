"use client";

import { useState } from "react";
import type { Media } from "@/interfaces/media/Media";
import { media } from "@/services/media";

export const useMediaUpload = (bookId: number) => {
  const [uploaded, setUploaded] = useState<Media[]>([]);
  const upload = async (files: File[]) => {
    const result = await media.upload(bookId, files);
    setUploaded((previous) => [...previous, ...result.items]);
  };
  return { uploaded, upload };
};
