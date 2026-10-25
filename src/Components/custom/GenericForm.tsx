import { Box, Grid, Stack, Text } from "@chakra-ui/react";
import CustomButton from "./CustomButton";
import GenericFormField from "./GenericFormField";
import type { GenericFormProps } from "@/props/custom/forms/GenericFormProps";

const GenericForm = <T,>({ fields, onSubmit, submitLabel, loading, error, compact = false }: GenericFormProps<T>) =>
  <form onSubmit={onSubmit}><Stack gap="6" align={compact ? "start" : "stretch"}>
    <Grid templateColumns={compact ? "minmax(0, 1fr)" : "repeat(2, minmax(0, 1fr))"} gap="5"
      w={compact ? "full" : undefined} maxW={compact ? "56" : undefined}
      css={compact ? undefined : { "@media (max-width: 350px)": { gridTemplateColumns: "minmax(0, 1fr)" } }}>
      {fields.map((field) => <Box key={field.name} minW="0"
        gridColumn={compact ? "span 1" : field.layout === "half" ? "span 1" : "span 2"}
        css={compact ? undefined : { "@media (max-width: 350px)": { gridColumn: "span 1" } }}>
        <GenericFormField field={field} />
      </Box>)}
    </Grid>
    {error && <Text color="red.500" role="alert">{error}</Text>}
    <CustomButton type="submit" loading={loading} loadingText="Saving..." minW={compact ? "36" : undefined}>{submitLabel}</CustomButton>
  </Stack></form>;

export default GenericForm;
