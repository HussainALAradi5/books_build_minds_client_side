"use client";

import { Box, Checkbox, Flex, NativeSelect, Table, Text } from "@chakra-ui/react";
import GenericConfirmButton from "./actions/GenericConfirmButton";
import CustomButton from "./CustomButton";
import { useTableActions } from "@/hooks/ui/useTableActions";
import type { GenericTableProps } from "@/props/custom/tables/GenericTableProps";
import CollectionViewSwitch from "./tables/CollectionViewSwitch";
import TableGrid from "./tables/TableGrid";
import { CollectionView } from "@/enums/shared/CollectionView";
import { useCollectionView } from "@/hooks/ui/useCollectionView";

const GenericTable = <T,>({ rows, columns, getKey, emptyMessage, actions, renderCard, initialView }: GenericTableProps<T>) => {
  const { selected, toggle, toggleAll, format, setFormat, bulkAction, setBulkAction, busy, error, fileInput, exportRows, importRows, bulk } = useTableActions(actions);
  const ids = rows.map(getKey);
  const { view, setView } = useCollectionView(initialView);
  const selectable = view === CollectionView.List && Boolean(actions?.onBulk || actions?.onExport);
  return <Box>
    <Flex justify="space-between" align="center" gap="3" mb="4" wrap="wrap"><Text color="fg.muted" fontSize="sm">{selected.length ? `${selected.length} selected` : `${rows.length} records on this page`}</Text><CollectionViewSwitch view={view} onChange={setView} /></Flex>
    {actions && view === CollectionView.List && <Flex gap="3" wrap="wrap" align="center" mb="4">
      {actions.onExport && <><NativeSelect.Root maxW="120px"><NativeSelect.Field aria-label="Export format" value={format} onChange={(event) => setFormat(event.target.value as typeof format)}><option value="xlsx">Excel</option><option value="pdf">PDF</option><option value="csv">CSV</option></NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root><CustomButton appearance="secondary" loading={busy} onClick={exportRows}>{selected.length ? `Export ${selected.length} selected` : "Export results"}</CustomButton></>}
      {actions.onImport && <><input ref={fileInput} type="file" accept=".csv,.xlsx" onChange={importRows} hidden aria-label="Import table file" /><CustomButton appearance="secondary" loading={busy} onClick={() => fileInput.current?.click()}>Import CSV/Excel</CustomButton></>}
      {actions.onBulk && <><NativeSelect.Root maxW="160px"><NativeSelect.Field aria-label="Bulk action" value={bulkAction} onChange={(event) => setBulkAction(event.target.value)}><option value="">Bulk action</option>{actions.bulkActions?.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</NativeSelect.Field><NativeSelect.Indicator /></NativeSelect.Root><GenericConfirmButton title="Apply bulk action?" description={`${bulkAction} will affect ${selected.length} selected records. Deletion keeps their history.`} confirmLabel="Apply changes" appearance="secondary" disabled={!selected.length || !bulkAction || busy} onConfirm={bulk}>Apply to {selected.length}</GenericConfirmButton></>}
    </Flex>}
    {error && <Text color="red.500" role="alert" mb="3">{error}</Text>}
    {view === CollectionView.List && rows.length > 0 && <Text display={{ base: "block", md: "none" }} fontSize="xs" color="fg.muted" mb="2">Swipe the table sideways to see all columns.</Text>}
    {!rows.length ? <Text bg="bg.subtle" p="8" textAlign="center" color="fg.muted">{emptyMessage}</Text> : view === CollectionView.Grid ?
      <TableGrid rows={rows} columns={columns} getKey={getKey} renderCard={renderCard} selected={selected} selectable={selectable} onToggle={toggle} /> :
      <Box overflowX="auto" width="full"><Table.Root variant="line" size="md" interactive>
        <Table.Header><Table.Row>{selectable && <Table.ColumnHeader><Checkbox.Root checked={ids.every((id) => selected.includes(id))} onCheckedChange={() => toggleAll(ids)} aria-label="Select all rows"><Checkbox.HiddenInput /><Checkbox.Control /></Checkbox.Root></Table.ColumnHeader>}{columns.map((column) => <Table.ColumnHeader key={column.key}>{column.header}</Table.ColumnHeader>)}</Table.Row></Table.Header>
        <Table.Body>{rows.map((item) => <Table.Row key={getKey(item)}>{selectable && <Table.Cell><Checkbox.Root checked={selected.includes(getKey(item))} onCheckedChange={() => toggle(getKey(item))} aria-label={`Select row ${getKey(item)}`}><Checkbox.HiddenInput /><Checkbox.Control /></Checkbox.Root></Table.Cell>}{columns.map((column) => <Table.Cell key={column.key}>{column.render(item)}</Table.Cell>)}</Table.Row>)}</Table.Body>
      </Table.Root></Box>}
  </Box>;
};

export default GenericTable;
