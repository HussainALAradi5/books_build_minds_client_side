import { Box, Image } from "@chakra-ui/react";
import { mediaUrl } from "@/lib/mediaUrl";
import type { AccountAvatarProps } from "@/props/custom/display/AccountAvatarProps";

const AccountAvatar = ({ name, imageUrl, size = "10", fontSize = "lg" }: AccountAvatarProps) =>
  <Box boxSize={size} flexShrink={0} borderRadius="full" bg="green.100" color="green.800"
    _dark={{ bg: "green.800", color: "green.100" }} overflow="hidden" display="grid" placeItems="center"
    fontFamily="heading" fontWeight="semibold" fontSize={fontSize}>
    {imageUrl ? <Image src={mediaUrl(imageUrl)} alt={`${name}'s profile photo`} boxSize="full" objectFit="cover" /> : name.charAt(0).toUpperCase()}
  </Box>;

export default AccountAvatar;
