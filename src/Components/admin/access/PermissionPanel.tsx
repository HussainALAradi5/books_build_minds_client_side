"use client";

import { Box, Field, Heading, HStack, Input, NativeSelect, Stack, Text, Textarea } from "@chakra-ui/react";
import GenericConfirmButton from "@/Components/custom/actions/GenericConfirmButton";
import CustomButton from "@/Components/custom/CustomButton";
import GenericPagination from "@/Components/custom/GenericPagination";
import { useAccessAdminContext } from "@/hooks/admin/access/useAccessAdminContext";
import { usePermissionEditor } from "@/hooks/admin/access/usePermissionEditor";

const PermissionPanel = () => {
  const { permissions, loadPermissions } = useAccessAdminContext();
  const { selected, key, setKey, label, setLabel, description, setDescription, busy, error, message, choose, clear, submit, remove } = usePermissionEditor();
  return <Box as="section" bg="bg.panel" borderWidth="1px" borderRadius="lg" p={{ base: "5", md: "7" }}>
    <Heading as="h2" fontSize="2xl" fontFamily="heading" mb="2">Permissions</Heading>
    <Text color="fg.muted" fontSize="sm" mb="5">Action keys are checked by the server. Built-in keys cannot be deleted.</Text>
    <Field.Root mb="4"><Field.Label>Choose permission</Field.Label><NativeSelect.Root><NativeSelect.Field value={selected?.key ?? ""} onChange={(event) => {
      const item = permissions?.items.find((entry) => entry.key === event.target.value);
      if (item) choose(item); else clear();
    }}><option value="">Create new</option>{permissions?.items.map((item) => <option key={item.key} value={item.key}>{item.key}</option>)}</NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root></Field.Root>
    {permissions && <GenericPagination pagination={permissions.pagination} onPageChange={(page) => { void loadPermissions(page); clear(); }} />}
    <form onSubmit={submit}><Stack gap="4" mt="5">
      <Field.Root required><Field.Label>Key</Field.Label><Input value={key} onChange={(event) => setKey(event.target.value)} disabled={Boolean(selected)} placeholder="resource:action.scope" required /></Field.Root>
      <Field.Root required><Field.Label>Label</Field.Label><Input value={label} onChange={(event) => setLabel(event.target.value)} required /></Field.Root>
      <Field.Root><Field.Label>Description</Field.Label><Textarea value={description} onChange={(event) => setDescription(event.target.value)} /></Field.Root>
      <HStack wrap="wrap"><CustomButton type="submit" loading={busy}>Save permission</CustomButton>{selected && <CustomButton appearance="secondary" onClick={clear}>New</CustomButton>}{selected && !selected.isSystem && <GenericConfirmButton title="Delete permission?" description="This record will be soft deleted. Check its assignments before confirming." confirmLabel="Delete" appearance="ghost" disabled={busy} onConfirm={remove}>Delete</GenericConfirmButton>}</HStack>
    </Stack></form>
    {message && <Text mt="3" color="green.600" role="status">{message}</Text>}{error && <Text mt="3" color="red.500" role="alert">{error}</Text>}
  </Box>;
};

export default PermissionPanel;
