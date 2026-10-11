"use client";

import { Flex } from "@chakra-ui/react";
import CustomButton from "./CustomButton";
import type { GenericFilterProps } from "@/props/custom/forms/GenericFilterProps";
import { useFilterSubmit } from "@/hooks/ui/useFilterSubmit";

const GenericFilter = ({ children, onApply, onClear, loading }: GenericFilterProps) => {
  const submit = useFilterSubmit(onApply);
  return <form onSubmit={submit}><Flex wrap="wrap" gap="3" align="center">
    {children}
    <CustomButton type="submit" loading={loading}>Apply</CustomButton>
    <CustomButton appearance="secondary" disabled={loading} onClick={onClear}>Clear</CustomButton>
  </Flex></form>;
};

export default GenericFilter;
