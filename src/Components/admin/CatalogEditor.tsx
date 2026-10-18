"use client";

import { Box, Field, Heading, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import { useCatalogEditor } from "@/hooks/admin/useCatalogEditor";
import type { CatalogEditorProps } from "@/props/admin/CatalogEditorProps";

const CatalogEditor = (props: CatalogEditorProps) => {
  const { kind } = props;
  const { name, setName, description, setDescription, countryCode, setCountryCode, busy, error, message, submit } = useCatalogEditor(props);
  return <Box as="section" bg="bg.panel" borderWidth="1px" borderRadius="lg" p="6">
    <Heading as="h2" fontSize="2xl" fontFamily="heading" mb="4">Add {kind}</Heading>
    <form onSubmit={submit}><Stack gap="4">
      <Field.Root required><Field.Label>Name</Field.Label><Input value={name} onChange={(event) => setName(event.target.value)} maxLength={255} required /></Field.Root>
      <Field.Root><Field.Label>Country code</Field.Label><Input value={countryCode} onChange={(event) => setCountryCode(event.target.value)} maxLength={2} placeholder="BH" textTransform="uppercase" /></Field.Root>
      <Field.Root><Field.Label>Description</Field.Label><Textarea value={description} onChange={(event) => setDescription(event.target.value)} maxLength={5000} minH="100px" /></Field.Root>
      <CustomButton type="submit" loading={busy} loadingText="Saving...">Add {kind}</CustomButton>
    </Stack></form>
    {message && <Text mt="3" color="green.600" role="status">{message}</Text>}
    {error && <Text mt="3" color="red.500" role="alert">{error}</Text>}
  </Box>;
};

export default CatalogEditor;
