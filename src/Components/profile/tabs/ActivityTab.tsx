"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import GenericFilter from "@/Components/custom/GenericFilter";
import GenericPagination from "@/Components/custom/GenericPagination";
import GenericTable from "@/Components/custom/GenericTable";
import GenericEnumSelect from "@/Components/custom/forms/GenericEnumSelect";
import { libraryActionColors, libraryActionLabels } from "@/enums/library/LibraryActionType";
import { activityColumns } from "@/constants/profile/activityColumns";
import type { ActivityPanelProps } from "@/props/profile/ActivityPanelProps";
import { useActivityPanel } from "@/hooks/profile/useActivityPanel";

const ActivityTab = ({ userId }: ActivityPanelProps) => {
  const { selected, setSelected, query, result, loading, error, apply, clear } = useActivityPanel(userId);
  return <Box as="section" maxW="3xl">
    <Heading as="h2" fontFamily="heading" fontSize="3xl" mb="6">Library activity</Heading>
    <GenericFilter onApply={() => apply(1)} onClear={clear} loading={loading}>
      <Box w={{ base: "full", sm: "190px" }}><GenericEnumSelect label="Action" allLabel="All actions"
        value={selected === "all" ? "" : selected} labels={libraryActionLabels} colors={libraryActionColors}
        onChange={(value) => setSelected(value || "all")} /></Box>
    </GenericFilter>
    {error && <Text color="red.500" role="alert" mt="4">{error}</Text>}
    <Box mt="5"><GenericTable rows={result.items} columns={activityColumns} getKey={(item) => item.activityId} emptyMessage="No activity yet." /></Box>
    <GenericPagination pagination={result.pagination} onPageChange={(page) => apply(page, query.action)} loading={loading} />
  </Box>;
};

export default ActivityTab;
