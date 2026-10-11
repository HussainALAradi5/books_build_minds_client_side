import { HStack, Text } from "@chakra-ui/react";
import type { GenericPaginationProps } from "@/props/custom/navigation/GenericPaginationProps";
import CustomButton from "./CustomButton";

const GenericPagination = ({ pagination, onPageChange, loading }: GenericPaginationProps) => {
  if (pagination.pages <= 1) return null;
  return <HStack as="nav" aria-label="Pagination" justify="center" gap="4" mt="8">
    <CustomButton disabled={!pagination.hasPrevious} loading={loading} onClick={() => onPageChange(pagination.page - 1)}>← Previous</CustomButton>
    <Text>Page {pagination.page} of {pagination.pages}</Text>
    <CustomButton disabled={!pagination.hasNext} loading={loading} onClick={() => onPageChange(pagination.page + 1)}>Next →</CustomButton>
  </HStack>;
};

export default GenericPagination;
