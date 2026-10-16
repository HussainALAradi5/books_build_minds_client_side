import Link from "next/link";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import AccountAvatar from "@/Components/custom/display/AccountAvatar";
import GenericImagePreview from "@/Components/custom/media/GenericImagePreview";
import { mediaUrl } from "@/lib/mediaUrl";
import GenericStatusBadge from "@/Components/custom/GenericStatusBadge";
import { accountRoleColors, accountRoleLabels } from "@/enums/accounts/AccountRole";
import { useProfileOverview } from "@/hooks/profile/useProfileOverview";
import type { ProfileContentProps } from "@/props/profile/ProfileContentProps";

const ProfileOverviewTab = ({ user }: ProfileContentProps) => {
  const { canManage } = useProfileOverview(user);
  return <Box maxW="3xl" bg="bg.panel" borderWidth="1px" borderColor="border.subtle" borderRadius="2xl" p={{ base: "5", md: "7" }} boxShadow="xs">
    <Stack gap="5">
      <Flex align="center" gap="4" wrap="wrap">
        {user.profilePictureUrl ? <GenericImagePreview src={mediaUrl(user.profilePictureUrl)} alt={`${user.userName}'s profile photo`}>
          <AccountAvatar name={user.userName} imageUrl={user.profilePictureUrl} size="16" fontSize="2xl" />
        </GenericImagePreview> : <AccountAvatar name={user.userName} size="16" fontSize="2xl" />}
        <Stack gap="1"><Text color="fg.muted" fontSize="sm">Library member</Text>
          <Heading as="h2" fontFamily="heading" fontSize="2xl">{user.userName}</Heading>
          <GenericStatusBadge value={user.role} labels={accountRoleLabels} colors={accountRoleColors} />
        </Stack>
      </Flex>
      <Box borderTopWidth="1px" borderColor="border.subtle" pt="4">
        <Text fontSize="xs" fontWeight="bold" letterSpacing="wide" color="fg.muted">EMAIL ADDRESS</Text>
        <Text mt="1" fontWeight="medium" overflowWrap="anywhere">{user.email}</Text>
      </Box>
      <Flex bg="bg.subtle" borderRadius="xl" p="4" align="center" justify="space-between" gap="4">
        <Box><Text fontSize="sm" color="fg.muted">Books you own</Text><Text fontSize="sm">Purchased books in your library</Text></Box>
        <Text fontSize="3xl" fontFamily="heading" fontWeight="semibold">{user.purchasedBooks.length}</Text>
      </Flex>
    </Stack>
  </Box>;
};

export default ProfileOverviewTab;
