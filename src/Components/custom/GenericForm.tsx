import { SimpleGrid, Stack, Text } from "@chakra-ui/react";
import CustomButton from "./CustomButton";
import GenericFormField from "./GenericFormField";
import type { GenericFormProps } from "@/props/custom/forms/GenericFormProps";

const GenericForm = <T,>({ fields, onSubmit, submitLabel, loading, error }: GenericFormProps<T>) =>
  <form onSubmit={onSubmit}><Stack gap="6">
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="5">
      {fields.map((field) => <GenericFormField key={field.name} field={field} />)}
    </SimpleGrid>
    {error && <Text color="red.500" role="alert">{error}</Text>}
    <CustomButton type="submit" loading={loading} loadingText="Saving...">{submitLabel}</CustomButton>
  </Stack></form>;

export default GenericForm;
