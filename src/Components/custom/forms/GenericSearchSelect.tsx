"use client";
import { Combobox, Portal, Text } from "@chakra-ui/react";
import { LuChevronDown, LuX } from "react-icons/lu";
import CustomButton from "../CustomButton";
import { useSearchSelect } from "@/hooks/ui/useSearchSelect";
import type { GenericSearchSelectProps } from "@/props/custom/forms/GenericSearchSelectProps";

const GenericSearchSelect = (props: GenericSearchSelectProps) => {
  const state = useSearchSelect(props);
  return <Combobox.Root collection={state.collection} value={props.value ? [props.value] : []}
    inputValue={state.search} onInputValueChange={({ inputValue }) => state.setSearch(inputValue)}
    onValueChange={({ value }) => props.onChange(value[0] || "")} openOnClick minW="0">
    <Combobox.Label fontSize="sm" color="fg.muted">{props.label}</Combobox.Label>
    <Combobox.Control><Combobox.Input placeholder={props.placeholder || "Search and select"} bg="bg.panel" />
      <Combobox.IndicatorGroup>
        {props.value && <Combobox.ClearTrigger aria-label={`Clear ${props.label}`}><LuX /></Combobox.ClearTrigger>}
        <Combobox.Trigger aria-label={`Show ${props.label} options`}><LuChevronDown /></Combobox.Trigger>
      </Combobox.IndicatorGroup>
    </Combobox.Control>
    <Portal><Combobox.Positioner><Combobox.Content maxH="72" overflowY="auto" zIndex="popover">
      {state.loading && <Text px="3" py="2" role="status">Loading options…</Text>}
      {state.error ? <><Text px="3" role="alert" color="red.600">{state.error}</Text><CustomButton appearance="ghost" onClick={state.retry}>Retry</CustomButton></> :
        !state.loading && <Combobox.Empty>No matching options. Try another search.</Combobox.Empty>}
      {state.collection.items.map((item) => <Combobox.Item item={item} key={item.value}>
        <Combobox.ItemText>{item.label}</Combobox.ItemText><Combobox.ItemIndicator />
      </Combobox.Item>)}
      {state.hasMore && <CustomButton appearance="ghost" loading={state.loading} onClick={state.more}>Load more options</CustomButton>}
    </Combobox.Content></Combobox.Positioner></Portal>
  </Combobox.Root>;
};
export default GenericSearchSelect;
