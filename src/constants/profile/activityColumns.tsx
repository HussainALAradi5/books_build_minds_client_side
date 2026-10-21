import Link from "next/link";
import GenericStatusBadge from "@/Components/custom/GenericStatusBadge";
import { libraryActionColors, libraryActionLabels } from "@/enums/library/LibraryActionType";
import type { LibraryActivity } from "@/interfaces/library/LibraryActivity";
import { formatDate } from "@/lib/dates/formatDate";
import type { TableColumn } from "@/props/custom/tables/TableColumn";

export const activityColumns: TableColumn<LibraryActivity>[] = [
  { key: "book", header: "Book", render: (item) => <Link href={`/book/${item.bookSlug}`}>{item.bookTitle}</Link> },
  { key: "action", header: "Action", render: (item) => <GenericStatusBadge value={item.actionType} labels={libraryActionLabels} colors={libraryActionColors} /> },
  { key: "date", header: "Date", render: (item) => formatDate(item.occurredAt) },
];
