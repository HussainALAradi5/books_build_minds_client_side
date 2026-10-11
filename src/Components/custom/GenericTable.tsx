"use client";

import { Box, Checkbox, Flex, NativeSelect, Table, Text } from "@chakra-ui/react";
import CustomButton from "./CustomButton";
import { useTableActions } from "@/hooks/ui/useTableActions";
import type { GenericTableProps } from "@/props/custom/tables/GenericTableProps";

const GenericTable = <T,>({ rows, columns, getKey, emptyMessage, actions }: GenericTableProps<T>) => {
  const { selected, toggle, toggleAll, format, setFormat, bulkAction, setBulkAction, busy, error, fileInput, exportRows, importRows, bulk } = useTableActions(actions);
  const ids = rows.map(getKey);
  return <Box>
    {actions && <Flex gap="3" wrap="wrap" align="center" mb="4">
      {actions.onExport && <><NativeSelect.Root maxW="120px"><NativeSelect.Field aria-label="Export format" value={format} onChange={(event) => setFormat(event.target.value as typeof format)}><option value="xlsx">Excel</option><option value="pdf">PDF</option><option value="csv">CSV</option></NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root><CustomButton appearance="secondary" loading={busy} onClick={exportRows}>Export</CustomButton></>}
      {actions.onImport && <><input ref={fileInput} type="file" accept=".csv,.xlsx" onChange={importRows} hidden aria-label="Import table file" /><CustomButton appearance="secondary" loading={busy} onClick={() => fileInput.current?.click()}>Import CSV/Excel</CustomButton></>}
      {actions.onBulk && <><NativeSelect.Root maxW="160px"><NativeSelect.Field aria-label="Bulk action" value={bulkAction} onChange={(event) => setBulkAction(event.target.value)}><option value="">Bulk action</option>{actions.bulkActions?.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root><CustomButton appearance="secondary" disabled={!selected.length || !bulkAction} loading={busy} onClick={bulk}>Apply to {selected.length}</CustomButton></>}
    </Flex>}
    {error && <Text color="red.500" role="alert" mb="3">{error}</Text>}
    {!rows.length ? <Text bg="bg.subtle" p="8" textAlign="center" color="fg.muted">{emptyMessage}</Text> :
      <Box overflowX="auto" width="full"><Table.Root variant="line" size="md" interactive>
        <Table.Header><Table.Row>{actions?.onBulk && <Table.ColumnHeader><Checkbox.Root checked={ids.every((id) => selected.includes(id))} onCheckedChange={() => toggleAll(ids)} aria-label="Select all rows"><Checkbox.HiddenInput /><Checkbox.Control /></Checkbox.Root></Table.ColumnHeader>}{columns.map((column) => <Table.ColumnHeader key={column.key}>{column.header}</Table.ColumnHeader>)}</Table.Row></Table.Header>
        <Table.Body>{rows.map((item) => <Table.Row key={getKey(item)}>{actions?.onBulk && <Table.Cell><Checkbox.Root checked={selected.includes(getKey(item))} onCheckedChange={() => toggle(getKey(item))} aria-label={`Select row ${getKey(item)}`}><Checkbox.HiddenInput /><Checkbox.Control /></Checkbox.Root></Table.Cell>}{columns.map((column) => <Table.Cell key={column.key}>{column.render(item)}</Table.Cell>)}</Table.Row>)}</Table.Body>
      </Table.Root></Box>}
  </Box>;
};

export default GenericTable;
