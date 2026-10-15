"use client";

import { Box, Field, Heading, HStack, Input, NativeSelect, Stack, Text, Textarea } from "@chakra-ui/react";
import AccessCheckboxList from "@/Components/custom/AccessCheckboxList";
import GenericConfirmButton from "@/Components/custom/actions/GenericConfirmButton";
import CustomButton from "@/Components/custom/CustomButton";
import GenericPagination from "@/Components/custom/GenericPagination";
import { useAccessAdminContext } from "@/hooks/admin/access/useAccessAdminContext";
import { useRoleEditor } from "@/hooks/admin/access/useRoleEditor";

const RolePanel = () => {
  const { roles, permissions, loadRoles } = useAccessAdminContext();
  const { selected, key, setKey, name, setName, description, setDescription, permissionKeys, toggle, busy, error, message, choose, clear, submit, remove } = useRoleEditor();
  const options = permissions?.items.map((item) => ({ value: item.key, label: item.label })) ?? [];
  return <Box as="section" bg="bg.panel" borderWidth="1px" borderRadius="lg" p={{ base: "5", md: "7" }}>
    <Heading as="h2" fontSize="2xl" fontFamily="heading" mb="2">Roles</Heading>
    <Text color="fg.muted" fontSize="sm" mb="5">Assign permission keys to a role. The administrator role always retains full access.</Text>
    <Field.Root mb="4"><Field.Label>Choose role</Field.Label><NativeSelect.Root><NativeSelect.Field value={selected?.key ?? ""} onChange={(event) => {
      const item = roles?.items.find((entry) => entry.key === event.target.value);
      if (item) choose(item); else clear();
    }}><option value="">Create new</option>{roles?.items.map((item) => <option key={item.key} value={item.key}>{item.name}</option>)}</NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root></Field.Root>
    {roles && <GenericPagination pagination={roles.pagination} onPageChange={(page) => { void loadRoles(page); clear(); }} />}
    <form onSubmit={submit}><Stack gap="4" mt="5">
      <Field.Root required><Field.Label>Key</Field.Label><Input value={key} onChange={(event) => setKey(event.target.value)} disabled={Boolean(selected)} placeholder="catalog-editor" required /></Field.Root>
      <Field.Root required><Field.Label>Name</Field.Label><Input value={name} onChange={(event) => setName(event.target.value)} required /></Field.Root>
      <Field.Root><Field.Label>Description</Field.Label><Textarea value={description} onChange={(event) => setDescription(event.target.value)} /></Field.Root>
      <AccessCheckboxList label="Permissions" items={options} selected={permissionKeys} onToggle={toggle} disabled={selected?.key === "admin"} />
      <HStack wrap="wrap"><CustomButton type="submit" loading={busy}>Save role</CustomButton>{selected && <CustomButton appearance="secondary" onClick={clear}>New</CustomButton>}{selected && !selected.isSystem && <GenericConfirmButton title="Delete role?" description="This record will be soft deleted. Check its assignments before confirming." confirmLabel="Delete" appearance="ghost" disabled={busy} onConfirm={remove}>Delete</GenericConfirmButton>}</HStack>
    </Stack></form>
    {message && <Text mt="3" color="green.600" role="status">{message}</Text>}{error && <Text mt="3" color="red.500" role="alert">{error}</Text>}
  </Box>;
};

export default RolePanel;
