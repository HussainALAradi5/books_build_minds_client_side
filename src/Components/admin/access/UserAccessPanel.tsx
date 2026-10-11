"use client";

import { Box, Field, Heading, NativeSelect, Stack, Text } from "@chakra-ui/react";
import AccessCheckboxList from "@/Components/custom/AccessCheckboxList";
import CustomButton from "@/Components/custom/CustomButton";
import GenericPagination from "@/Components/custom/GenericPagination";
import { AccountRole } from "@/enums/accounts/AccountRole";
import { accountRoleLabels } from "@/constants/accounts/accountRoleLabels";
import { useAccessAdminContext } from "@/hooks/admin/access/useAccessAdminContext";
import { useUserAccessEditor } from "@/hooks/admin/access/useUserAccessEditor";

const UserAccessPanel = () => {
  const { users, groups, roles, loadUsers } = useAccessAdminContext();
  const { selected, role, setRole, accessRoleKeys, groupIds, toggleRole, toggleGroup, busy, error, message, choose, submit } = useUserAccessEditor();
  const roleOptions = roles?.items.map((item) => ({ value: item.key, label: item.name })) ?? [];
  const groupOptions = groups?.items.map((item) => ({ value: item.groupId, label: item.name })) ?? [];
  return <Box as="section" bg="bg.panel" borderWidth="1px" borderRadius="lg" p={{ base: "5", md: "7" }}>
    <Heading as="h2" fontSize="2xl" fontFamily="heading" mb="2">User access</Heading>
    <Text color="fg.muted" fontSize="sm" mb="5">Set a base role, optional extra roles, and group membership.</Text>
    <Field.Root mb="4"><Field.Label>Choose user</Field.Label><NativeSelect.Root><NativeSelect.Field value={selected?.userId ?? ""} onChange={(event) => {
      const item = users?.items.find((entry) => String(entry.userId) === event.target.value);
      if (item) choose(item);
    }}><option value="">Select an account</option>{users?.items.map((item) => <option key={item.userId} value={item.userId}>{item.userName} · {item.role}{item.isActive ? "" : " · inactive"}</option>)}</NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root></Field.Root>
    {users && <GenericPagination pagination={users.pagination} onPageChange={(page) => { void loadUsers(page); }} />}
    {selected && <form onSubmit={submit}><Stack gap="4" mt="5">
      <Field.Root><Field.Label>Base role</Field.Label><NativeSelect.Root><NativeSelect.Field value={role} onChange={(event) => setRole(event.target.value as AccountRole)}>{Object.values(AccountRole).map((value) => <option key={value} value={value}>{accountRoleLabels[value]}</option>)}</NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root></Field.Root>
      <AccessCheckboxList label="Extra roles" items={roleOptions} selected={accessRoleKeys} onToggle={toggleRole} />
      <AccessCheckboxList label="Groups" items={groupOptions} selected={groupIds} onToggle={toggleGroup} />
      <CustomButton type="submit" loading={busy}>Save user access</CustomButton>
    </Stack></form>}
    {message && <Text mt="3" color="green.600" role="status">{message}</Text>}{error && <Text mt="3" color="red.500" role="alert">{error}</Text>}
  </Box>;
};

export default UserAccessPanel;
