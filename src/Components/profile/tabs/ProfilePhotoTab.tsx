import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import ProfilePictureUpload from "../ProfilePictureUpload";

const ProfilePhotoTab = () => <Box maxW="2xl" bg="bg.panel" borderWidth="1px" borderColor="border.subtle"
  borderRadius="2xl" p={{ base: "5", md: "7" }} boxShadow="xs">
  <Stack gap="3">
    <Heading as="h2" fontFamily="heading" fontSize="2xl">Profile photo</Heading>
    <Text color="fg.muted" fontSize="sm">Choose an image that represents you across the library.</Text>
    <ProfilePictureUpload />
  </Stack>
</Box>;

export default ProfilePhotoTab;
