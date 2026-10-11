import Link from "next/link";
import { Box, Button, Container, Heading, HStack, Image, Link as ChakraLink, SimpleGrid, Text } from "@chakra-ui/react";
import GenericStatusBadge from "@/Components/custom/GenericStatusBadge";
import { accountRoleColors } from "@/constants/accounts/accountRoleColors";
import { accountRoleLabels } from "@/constants/accounts/accountRoleLabels";
import { Permission } from "@/enums/accounts/Permission";
import { AccountRole } from "@/enums/accounts/AccountRole";
import { hasPermission } from "@/lib/access";
import { mediaUrl } from "@/lib/mediaUrl";
import type { ProfileContentProps } from "@/props/profile/ProfileContentProps";
import LoansPanel from "./LoansPanel";
import ProfilePictureUpload from "./ProfilePictureUpload";
import ActivityPanel from "./ActivityPanel";

const ProfileContent = ({ user }: ProfileContentProps) => <Container maxW="6xl" py={{ base: "8", md: "14" }}>
  <ChakraLink asChild color="green.700" _dark={{ color: "green.300" }} fontSize="sm" fontWeight="semibold"><Link href="/">← Back to books</Link></ChakraLink>
  <Box bg="bg.panel" borderWidth="1px" borderRadius="lg" p={{ base: "6", md: "10" }} mt="7" maxW="2xl">
    <Box boxSize="20" borderRadius="full" bg="green.100" color="green.800" overflow="hidden" display="grid" placeItems="center" fontFamily="heading" fontSize="3xl" mb="6">
      {user.profilePictureUrl ? <Image src={mediaUrl(user.profilePictureUrl)} alt={`${user.userName}'s profile`} boxSize="full" objectFit="cover" /> : user.userName.charAt(0).toUpperCase()}
    </Box>
    <Text color="green.700" _dark={{ color: "green.300" }} fontSize="xs" fontWeight="bold" letterSpacing="widest">YOUR READING SPACE</Text>
    <Heading as="h1" fontFamily="heading" fontWeight="medium" fontSize={{ base: "3xl", md: "5xl" }} mt="3">Welcome back, {user.userName}.</Heading>
    <Text color="fg.muted" mt="3">Your profile and collection live here.</Text>
    <SimpleGrid columns={{ base: 1, sm: 2 }} gap="5" borderTopWidth="1px" borderBottomWidth="1px" py="5" my="7">
      <Box gridColumn={{ base: "auto", sm: "1 / -1" }}><Text fontSize="xs" color="fg.muted">Email</Text><Text fontWeight="semibold" overflowWrap="anywhere">{user.email}</Text></Box>
      <Box><Text fontSize="xs" color="fg.muted">Account</Text><GenericStatusBadge value={user.role} labels={accountRoleLabels} colors={accountRoleColors} /></Box>
      <Box><Text fontSize="xs" color="fg.muted">Purchased books</Text><Text fontWeight="semibold">{user.purchasedBooks.length}</Text></Box>
    </SimpleGrid>
    <ProfilePictureUpload />
    {user.role === AccountRole.Admin && hasPermission(user, Permission.BookReadAny) && <HStack mt="6"><Button asChild colorPalette="green"><Link href="/admin">Open admin panel →</Link></Button></HStack>}
  </Box>
  <LoansPanel userId={user.userId} />
  <ActivityPanel userId={user.userId} />
</Container>;

export default ProfileContent;
