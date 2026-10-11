"use client";

import { Box } from "@chakra-ui/react";
import GenericUpload from "@/Components/custom/GenericUpload";
import { useProfilePictureUpload } from "@/hooks/media/useProfilePictureUpload";

const ProfilePictureUpload = () => {
  const upload = useProfilePictureUpload();
  return <Box mt="7"><GenericUpload label="Profile picture" accept="image/png,image/jpeg,image/gif,image/webp" maxFiles={1} onUpload={upload} /></Box>;
};

export default ProfilePictureUpload;
