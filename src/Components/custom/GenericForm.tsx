import { SimpleGrid, Stack, Text } from "@chakra-ui/react";
import CustomButton from "./CustomButton";
import GenericFormField from "./GenericFormField";
import type { GenericFormProps } from "@/props/custom/forms/GenericFormProps";

const GenericForm = <T,>({ fields, onSubmit, submitLabel, loading, error, compact = false }: GenericFormProps<T>) =>
  <form onSubmit={onSubmit}><Stack gap="6" align={compact ? "start" : "stretch"}>
    <SimpleGrid columns={compact ? 1 : { base: 1, md: 2 }} gap="5" w={compact ? "full" : undefined} maxW={compact ? "56" : undefined}>
      {fields.map((field) => <GenericFormField key={field.name} field={field} />)}
    </SimpleGrid>
    {error && <Text color="red.500" role="alert">{error}</Text>}
    <CustomButton type="submit" loading={loading} loadingText="Saving..." minW={compact ? "36" : undefined}>{submitLabel}</CustomButton>
  </Stack></form>;

export default GenericForm;
