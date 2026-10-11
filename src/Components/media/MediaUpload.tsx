"use client";

import { useState } from "react";
import FileDropzone from "@/Components/media/FileDropzone";
import { media } from "@/services/media";
import type { MediaDto } from "@/lib/types";

export default function MediaUpload({ bookId }: { bookId: number }) {
  const [uploaded, setUploaded] = useState<MediaDto[]>([]);
  async function upload(files: File[]) {
    const result = await media.upload(bookId, files);
    setUploaded((previous) => [...previous, ...result.items]);
  }
  return <section className="media-upload"><h3>Add book images</h3><p>Images are verified and stored by the API. The first upload becomes the book cover.</p><FileDropzone label="Book images" accept="image/jpeg,image/png,image/gif,image/webp" maxFiles={10} onUpload={upload} />{uploaded.length > 0 && <p role="status">{uploaded.length} image{uploaded.length > 1 ? "s" : ""} uploaded.</p>}</section>;
}



