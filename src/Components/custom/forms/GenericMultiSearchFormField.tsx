"use client";

import { useEffect, useRef, useState } from "react";
import { Badge, Box, HStack, Input, Stack, Text } from "@chakra-ui/react";
import CustomButton from "../CustomButton";
import { useSearchSelect } from "@/hooks/ui/useSearchSelect";
import type { SelectOption } from "@/interfaces/ui/SelectOption";
import type { GenericFormFieldProps } from "@/props/custom/forms/GenericFormFieldProps";

const GenericMultiSearchFormField = <T,>({ field }: GenericFormFieldProps<T>) => {
  const [selected, setSelected] = useState<SelectOption[]>([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const state = useSearchSelect({ label: field.label, value: "", onChange: () => {}, loadOptions: field.loadOptions! });
  useEffect(() => {
    const form = input.current?.form;
    if (!form) return;
    const reset = () => setSelected([]);
    form.addEventListener("reset", reset);
    return () => form.removeEventListener("reset", reset);
  }, []);
  const choose = (item: SelectOption) => {
    if (selected.length >= 5 && !selected.some((value) => value.value === item.value)) { setMessage("Choose up to 5 categories."); return; }
    setMessage("");
    setSelected((items) => items.some((value) => value.value === item.value) ? items : [...items, item]);
    state.setSearch(""); setOpen(false);
  };
  return <Box>
    <Text fontSize="sm" color="fg.muted" mb="1">{field.label}</Text>
    <Input aria-label={`Search ${field.label.toLowerCase()}`} placeholder={`Search ${field.label.toLowerCase()}…`}
      value={state.search} onChange={(event) => state.setSearch(event.target.value)} onFocus={() => setOpen(true)} bg="bg.panel" />
    {open && <Box borderWidth="1px" borderRadius="lg" mt="1" maxH="44" overflowY="auto" bg="bg.panel" zIndex="popover">
      {state.loading && <Text p="2">Loading…</Text>}
      {state.error && <Text p="2" color="red.500" role="alert">{state.error}</Text>}
      {!state.loading && !state.error && state.collection.items.length === 0 && <Text p="2">No matching options.</Text>}
      <Stack gap="0">{state.collection.items.map((item) => <CustomButton key={item.value} appearance="ghost" onClick={() => choose(item)} textAlign="left" justifyContent="start">{item.label}</CustomButton>)}</Stack>
      {state.hasMore && <CustomButton appearance="ghost" loading={state.loading} onClick={state.more}>Load more</CustomButton>}
    </Box>}
    {message && <Text fontSize="sm" color="orange.600" role="status">{message}</Text>}
    <HStack mt="2" wrap="wrap">{selected.map((item) => <Badge key={item.value} colorPalette="green" borderRadius="full" px="2">
      {item.label}<button type="button" aria-label={`Remove ${item.label}`} style={{ marginLeft: 8 }} onClick={() => setSelected((items) => items.filter((value) => value.value !== item.value))}>×</button>
    </Badge>)}</HStack>
    <input ref={input} type="hidden" name={field.name} value={selected.map((item) => item.value).join(",")} />
  </Box>;
};

export default GenericMultiSearchFormField;
