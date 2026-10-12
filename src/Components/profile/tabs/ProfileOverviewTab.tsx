import Link from "next/link";
import { Box, Button, HStack, Image, SimpleGrid, Text } from "@chakra-ui/react";
import GenericStatusBadge from "@/Components/custom/GenericStatusBadge";
import { accountRoleColors } from "@/constants/accounts/accountRoleColors";
import { accountRoleLabels } from "@/constants/accounts/accountRoleLabels";
import { useProfileOverview } from "@/hooks/profile/useProfileOverview";
import type { ProfileContentProps } from "@/props/profile/ProfileContentProps";
import ProfilePictureUpload from "../ProfilePictureUpload";

const ProfileOverviewTab = ({ user }: ProfileContentProps) => {
  const { pictureUrl, initial, canManage } = useProfileOverview(user);
  return <Box bg="bg.panel" borderWidth="1px" borderRadius="lg" p={{ base: "6", md: "10" }} maxW="2xl">
    <Box boxSize="20" borderRadius="full" bg="green.100" color="green.800" overflow="hidden" display="grid" placeItems="center" fontFamily="heading" fontSize="3xl" mb="6">
      {pictureUrl ? <Image src={pictureUrl} alt={`${user.userName}'s profile`} boxSize="full" objectFit="cover" /> : initial}
    </Box>
    <SimpleGrid columns={{ base: 1, sm: 2 }} gap="5" borderTopWidth="1px" borderBottomWidth="1px" py="5" my="7">
      <Box gridColumn={{ base: "auto", sm: "1 / -1" }}><Text fontSize="xs" color="fg.muted">Email</Text><Text fontWeight="semibold" overflowWrap="anywhere">{user.email}</Text></Box>
      <Box><Text fontSize="xs" color="fg.muted">Account</Text><GenericStatusBadge value={user.role} labels={accountRoleLabels} colors={accountRoleColors} /></Box>
      <Box><Text fontSize="xs" color="fg.muted">Purchased books</Text><Text fontWeight="semibold">{user.purchasedBooks.length}</Text></Box>
    </SimpleGrid>
    <ProfilePictureUpload />
    {canManage && <HStack mt="6"><Button asChild colorPalette="green"><Link href="/admin">Open admin panel →</Link></Button></HStack>}
  </Box>;
};

export default ProfileOverviewTab;
