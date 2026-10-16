"use client";

import Link from "next/link";
import { Box, Button, Menu, Portal, Text } from "@chakra-ui/react";
import { FiChevronDown, FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import AccountAvatar from "@/Components/custom/display/AccountAvatar";
import type { AccountMenuProps } from "@/props/layout/account/AccountMenuProps";

const AccountMenu = ({ user, busy, canManage, onSignOut }: AccountMenuProps) => <Menu.Root positioning={{ placement: "bottom-end" }}>
  <Menu.Trigger asChild><Button variant="ghost" borderRadius="full" p="1" h="auto"
    aria-label={`Open account menu for ${user.userName}`}>
    <AccountAvatar name={user.userName} imageUrl={user.profilePictureUrl} size="9" fontSize="sm" />
    <Text display={{ base: "none", md: "block" }} maxW="28" truncate>{user.userName}</Text>
    <FiChevronDown aria-hidden />
  </Button></Menu.Trigger>
  <Portal><Menu.Positioner><Menu.Content minW="48" bg="bg.panel" borderColor="border.subtle" boxShadow="lg" borderRadius="xl" p="2">
    <Box px="3" py="2" borderBottomWidth="1px" borderColor="border.subtle" mb="1">
      <Text fontWeight="semibold" truncate>{user.userName}</Text>
      <Text fontSize="xs" color="fg.muted" truncate>{user.email}</Text>
    </Box>
    <Menu.Item value="profile" asChild><Link href="/profile"><FiUser aria-hidden /> My profile</Link></Menu.Item>
    {canManage && <Menu.Item value="admin" asChild><Link href="/admin"><FiSettings aria-hidden /> Admin panel</Link></Menu.Item>}
    <Menu.Item value="sign-out" disabled={busy} onClick={() => { void onSignOut(); }} color="red.600" _dark={{ color: "red.300" }}>
      <FiLogOut aria-hidden /> Sign out
    </Menu.Item>
  </Menu.Content></Menu.Positioner></Portal>
</Menu.Root>;

export default AccountMenu;
