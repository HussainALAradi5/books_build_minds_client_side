import { Field, Input, NativeSelect, Textarea } from "@chakra-ui/react";
import type { GenericFormFieldProps } from "@/props/custom/forms/GenericFormFieldProps";
import { blockNegativeNumberKey, nonNegativeNumber } from "@/lib/forms/nonNegativeNumber";
import GenericEnumFormField from "./forms/GenericEnumFormField";
import GenericSearchFormField from "./forms/GenericSearchFormField";
import GenericMultiSearchFormField from "./forms/GenericMultiSearchFormField";

const GenericFormField = <T,>({ field }: GenericFormFieldProps<T>) => field.loadOptions && field.multiple
  ? <GenericMultiSearchFormField field={field} /> : field.loadOptions
  ? <GenericSearchFormField field={field} /> : field.options && field.optionColors
  ? <GenericEnumFormField field={field} />
  : <Field.Root required={field.required}>
  <Field.Label>{field.label}</Field.Label>
  {field.options ? <NativeSelect.Root><NativeSelect.Field name={field.name} defaultValue={field.defaultValue}>
    {field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
  </NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root> : field.inputType === "textarea" ?
    <Textarea name={field.name} required={field.required} defaultValue={field.defaultValue} minH="28" maxLength={4000} /> :
    <Input name={field.name} type={field.inputType || "text"} required={field.required} min={field.min} step={field.step} defaultValue={field.defaultValue}
      onKeyDown={field.inputType === "number" ? blockNegativeNumberKey : undefined}
      onInput={field.inputType === "number" ? (event) => { event.currentTarget.value = nonNegativeNumber(event.currentTarget.value, field.step?.split(".")[1]?.length || 0); } : undefined} />}
</Field.Root>;

export default GenericFormField;
