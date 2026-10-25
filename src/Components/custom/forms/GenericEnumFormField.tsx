"use client";

import { useState } from "react";
import GenericEnumSelect from "./GenericEnumSelect";
import type { GenericFormFieldProps } from "@/props/custom/forms/GenericFormFieldProps";

const GenericEnumFormField = <T,>({ field }: GenericFormFieldProps<T>) => {
  const [value, setValue] = useState(field.defaultValue || field.options?.[0]?.value || "");
  const labels = Object.fromEntries((field.options || []).map((option) => [option.value, option.label]));
  return <>
    <input type="hidden" name={field.name} value={value} />
    <GenericEnumSelect label={field.label} includeAll={false} value={value}
      labels={labels} colors={field.optionColors || {}} onChange={setValue} />
  </>;
};

export default GenericEnumFormField;
