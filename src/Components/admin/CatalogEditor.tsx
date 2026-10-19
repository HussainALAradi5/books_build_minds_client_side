"use client";

import { Box, Field, Heading, Input, NativeSelect, Stack, Text, Textarea } from "@chakra-ui/react";
import CustomButton from "@/Components/custom/CustomButton";
import { useCatalogEditor } from "@/hooks/admin/useCatalogEditor";
import type { CatalogEditorProps } from "@/props/admin/CatalogEditorProps";
import { useCountryOptions } from "@/hooks/catalog/useCountryOptions";

const CatalogEditor = (props: CatalogEditorProps) => {
  const { kind } = props;
  const { name, setName, description, setDescription, countryCode, setCountryCode, busy, error, message, submit } = useCatalogEditor(props);
  const countryOptions = useCountryOptions();
  return <Box as="section" bg="bg.panel" borderWidth="1px" borderRadius="lg" p="6">
    <Heading as="h2" fontSize="2xl" fontFamily="heading" mb="4">Add {kind}</Heading>
    <form onSubmit={submit}><Stack gap="4">
      <Field.Root required><Field.Label>Name</Field.Label><Input value={name} onChange={(event) => setName(event.target.value)} maxLength={255} required /></Field.Root>
      <Field.Root><Field.Label>Country</Field.Label><NativeSelect.Root><NativeSelect.Field value={countryCode} onChange={(event) => setCountryCode(event.target.value)}>
        <option value="">{countryOptions.loading ? "Loading countries..." : "Select a country (optional)"}</option>
        {countryOptions.items.map((country) => <option key={country.code} value={country.code}>{country.name}</option>)}
      </NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root></Field.Root>
      <Field.Root><Field.Label>Description</Field.Label><Textarea value={description} onChange={(event) => setDescription(event.target.value)} maxLength={5000} minH="100px" /></Field.Root>
      <CustomButton type="submit" loading={busy} loadingText="Saving...">Add {kind}</CustomButton>
    </Stack></form>
    {message && <Text mt="3" color="green.600" role="status">{message}</Text>}
    {error && <Text mt="3" color="red.500" role="alert">{error}</Text>}
    {countryOptions.error && <Text mt="3" color="orange.600" role="status">{countryOptions.error}</Text>}
  </Box>;
};

export default CatalogEditor;
