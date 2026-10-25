"use client";
import { Portal, Select, Text } from "@chakra-ui/react";
import GenericStatusBadge from "../GenericStatusBadge";
import { useEnumSelect } from "@/hooks/ui/useEnumSelect";
import type { GenericEnumSelectProps } from "@/props/custom/forms/GenericEnumSelectProps";

const GenericEnumSelect = <T extends string>(props: GenericEnumSelectProps<T>) => {
  const state = useEnumSelect(props);
  return <Select.Root collection={state.collection} value={[props.value]} onValueChange={({ value }) => state.select(value)}>
    <Select.HiddenSelect /><Select.Label fontSize="sm" color="fg.muted">{props.label}</Select.Label>
    <Select.Control><Select.Trigger bg="bg.panel" borderRadius="lg">
      {props.value ? <GenericStatusBadge value={props.value} labels={props.labels} colors={props.colors} /> : <Text>{props.allLabel || "All"}</Text>}
    </Select.Trigger><Select.IndicatorGroup><Select.Indicator /></Select.IndicatorGroup></Select.Control>
    <Portal><Select.Positioner><Select.Content borderRadius="xl" bg="bg.panel" color="fg" borderWidth="1px" borderColor="border.emphasized" boxShadow="xl" zIndex="popover">
      {state.collection.items.map((item) => <Select.Item item={item} key={item.value} _highlighted={{ bg: "bg.muted" }}>
        <Select.ItemText>{item.value ? <GenericStatusBadge value={item.value as T} labels={props.labels} colors={props.colors} /> : item.label}</Select.ItemText>
        <Select.ItemIndicator />
      </Select.Item>)}
    </Select.Content></Select.Positioner></Portal>
  </Select.Root>;
};
export default GenericEnumSelect;
