import { Field } from "@chakra-ui/react";
import type { FilterFieldProps } from "@/props/custom/forms/FilterFieldProps";

const FilterField = ({ label, children }: FilterFieldProps) => <Field.Root minW="0">
  <Field.Label fontSize="sm" color="fg.muted">{label}</Field.Label>{children}
</Field.Root>;
export default FilterField;
