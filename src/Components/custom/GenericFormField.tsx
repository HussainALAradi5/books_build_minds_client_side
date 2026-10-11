import { Field, Input, NativeSelect } from "@chakra-ui/react";
import type { GenericFormFieldProps } from "@/props/custom/forms/GenericFormFieldProps";

const GenericFormField = <T,>({ field }: GenericFormFieldProps<T>) => <Field.Root required={field.required}>
  <Field.Label>{field.label}</Field.Label>
  {field.options ? <NativeSelect.Root><NativeSelect.Field name={field.name} defaultValue={field.defaultValue}>
    {field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
  </NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root> :
    <Input name={field.name} type={field.inputType || "text"} required={field.required} min={field.min} step={field.step} defaultValue={field.defaultValue} />}
</Field.Root>;

export default GenericFormField;
