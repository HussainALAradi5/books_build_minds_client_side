"use client";

import { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import GenericSearchSelect from "./GenericSearchSelect";
import type { GenericFormFieldProps } from "@/props/custom/forms/GenericFormFieldProps";

const GenericSearchFormField = <T,>({ field }: GenericFormFieldProps<T>) => {
  const [value, setValue] = useState(field.defaultValue || "");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const form = input.current?.form;
    if (!form) return;
    const reset = () => setValue(field.defaultValue || "");
    form.addEventListener("reset", reset);
    return () => form.removeEventListener("reset", reset);
  }, [field.defaultValue]);
  return <Box>
    <GenericSearchSelect label={field.label} value={value} onChange={setValue} loadOptions={field.loadOptions!}
      placeholder={`Search ${field.label.toLowerCase()}s…`} />
    <input ref={input} type="hidden" name={field.name} value={value} />
  </Box>;
};

export default GenericSearchFormField;
