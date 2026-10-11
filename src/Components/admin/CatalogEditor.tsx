"use client";

import { Box, Field, Heading, HStack, Input, NativeSelect, Stack, Text, Textarea } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import { useCatalogEditor } from "@/hooks/admin/useCatalogEditor";
import type { CatalogEditorProps } from "@/props/admin/CatalogEditorProps";

const CatalogEditor = (props: CatalogEditorProps) => {
  const { kind } = props;
  const { items, selected, name, setName, description, setDescription, countryCode, setCountryCode, busy, error, message, choose, clear, submit } = useCatalogEditor(props);
  return <Box as="section" bg="bg.panel" borderWidth="1px" borderRadius="lg" p="6">
    <Heading as="h2" fontSize="2xl" fontFamily="heading" mb="4">{kind === "author" ? "Authors" : "Publishers"}</Heading>
    <Field.Root mb="5"><Field.Label>Existing profiles</Field.Label><NativeSelect.Root><NativeSelect.Field value={selected ? ("authorId" in selected ? selected.authorId : selected.publisherId) : ""} onChange={(event) => {
      const item = items.find((entry) => String("authorId" in entry ? entry.authorId : entry.publisherId) === event.target.value);
      if (item) choose(item); else clear();
    }}><option value="">Create new</option>{items.map((item) => <option key={"authorId" in item ? item.authorId : item.publisherId} value={"authorId" in item ? item.authorId : item.publisherId}>{item.name}</option>)}</NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root></Field.Root>
    <form onSubmit={submit}><Stack gap="4">
      <Field.Root required><Field.Label>Name</Field.Label><Input value={name} onChange={(event) => setName(event.target.value)} maxLength={255} required /></Field.Root>
      <Field.Root><Field.Label>Country code</Field.Label><Input value={countryCode} onChange={(event) => setCountryCode(event.target.value)} maxLength={2} placeholder="BH" textTransform="uppercase" /></Field.Root>
      <Field.Root><Field.Label>Description</Field.Label><Textarea value={description} onChange={(event) => setDescription(event.target.value)} maxLength={5000} minH="100px" /></Field.Root>
      <HStack><CustomButton type="submit" loading={busy} loadingText="Saving...">Save {kind}</CustomButton>{selected && <CustomButton appearance="ghost" onClick={clear}>New profile</CustomButton>}</HStack>
    </Stack></form>
    {message && <Text mt="3" color="green.600" role="status">{message}</Text>}
    {error && <Text mt="3" color="red.500" role="alert">{error}</Text>}
  </Box>;
};

export default CatalogEditor;
