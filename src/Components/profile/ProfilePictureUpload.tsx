"use client";

import { useRouter } from "next/navigation";
import FileDropzone from "@/Components/media/FileDropzone";
import { media } from "@/services/media";

export default function ProfilePictureUpload() {
  const router = useRouter();
  return <div className="profile-upload"><FileDropzone label="Profile picture" accept="image/png,image/jpeg,image/gif,image/webp" maxFiles={1}
    onUpload={async (files) => { await media.uploadProfilePicture(files); router.refresh(); }} /></div>;
}



