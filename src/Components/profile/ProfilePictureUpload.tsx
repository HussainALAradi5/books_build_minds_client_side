"use client";

import GenericUpload from "@/Components/custom/GenericUpload";
import { useProfilePictureUpload } from "@/hooks/media/useProfilePictureUpload";

const ProfilePictureUpload = () => {
  const upload = useProfilePictureUpload();
  return <GenericUpload label="Profile picture" accept="image/png,image/jpeg,image/gif,image/webp" maxFiles={1} onUpload={upload} />;
};

export default ProfilePictureUpload;
