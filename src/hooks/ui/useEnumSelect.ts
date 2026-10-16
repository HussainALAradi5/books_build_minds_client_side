"use client";
import { createListCollection } from "@chakra-ui/react";
import type { GenericEnumSelectProps } from "@/props/custom/forms/GenericEnumSelectProps";

export const useEnumSelect = <T extends string>(props: GenericEnumSelectProps<T>) => {
  const items = [
    ...(props.includeAll === false ? [] : [{ value: "", label: props.allLabel || "All" }]),
    ...Object.entries(props.labels).map(([value, label]) => ({ value, label: String(label) })),
  ];
  return { collection: createListCollection({ items }),
    select: (values: string[]) => props.onChange((values[0] || "") as T | "") };
};
