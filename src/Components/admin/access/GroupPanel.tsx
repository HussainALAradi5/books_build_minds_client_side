"use client";

import { Box, Field, Heading, HStack, Input, NativeSelect, Stack, Text, Textarea } from "@chakra-ui/react";
import AccessCheckboxList from "@/Components/custom/AccessCheckboxList";
import GenericConfirmButton from "@/Components/custom/actions/GenericConfirmButton";
import CustomButton from "@/Components/custom/CustomButton";
import GenericPagination from "@/Components/custom/GenericPagination";
import { useAccessAdminContext } from "@/hooks/admin/access/useAccessAdminContext";
import { useGroupEditor } from "@/hooks/admin/access/useGroupEditor";

const GroupPanel = () => {
  const { groups, roles, loadGroups } = useAccessAdminContext();
  const { selected, name, setName, description, setDescription, roleKeys, toggle, busy, error, message, choose, clear, submit, remove } = useGroupEditor();
  const options = roles?.items.map((item) => ({ value: item.key, label: item.name })) ?? [];
  return <Box as="section" bg="bg.panel" borderWidth="1px" borderRadius="lg" p={{ base: "5", md: "7" }}>
    <Heading as="h2" fontSize="2xl" fontFamily="heading" mb="2">Groups</Heading>
    <Text color="fg.muted" fontSize="sm" mb="5">A group grants its roles to every assigned member.</Text>
    <Field.Root mb="4"><Field.Label>Choose group</Field.Label><NativeSelect.Root><NativeSelect.Field value={selected?.groupId ?? ""} onChange={(event) => {
      const item = groups?.items.find((entry) => String(entry.groupId) === event.target.value);
      if (item) choose(item); else clear();
    }}><option value="">Create new</option>{groups?.items.map((item) => <option key={item.groupId} value={item.groupId}>{item.name} ({item.memberCount})</option>)}</NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root></Field.Root>
    {groups && <GenericPagination pagination={groups.pagination} onPageChange={(page) => { void loadGroups(page); clear(); }} />}
    <form onSubmit={submit}><Stack gap="4" mt="5">
      <Field.Root required><Field.Label>Name</Field.Label><Input value={name} onChange={(event) => setName(event.target.value)} required /></Field.Root>
      <Field.Root><Field.Label>Description</Field.Label><Textarea value={description} onChange={(event) => setDescription(event.target.value)} /></Field.Root>
      <AccessCheckboxList label="Roles in this group" items={options} selected={roleKeys} onToggle={toggle} />
      <HStack wrap="wrap"><CustomButton type="submit" loading={busy}>Save group</CustomButton>{selected && <CustomButton appearance="secondary" onClick={clear}>New</CustomButton>}{selected && <GenericConfirmButton title="Delete group?" description="This record will be soft deleted. Check its assignments before confirming." confirmLabel="Delete" appearance="ghost" disabled={busy} onConfirm={remove}>Delete</GenericConfirmButton>}</HStack>
    </Stack></form>
    {message && <Text mt="3" color="green.600" role="status">{message}</Text>}{error && <Text mt="3" color="red.500" role="alert">{error}</Text>}
  </Box>;
};

export default GroupPanel;
