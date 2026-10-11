import type { PaginationDto } from "@/lib/types";

export default function PaginationControls({ pagination, onPageChange, loading }: { pagination: PaginationDto; onPageChange: (page: number) => void; loading?: boolean }) {
  if (pagination.pages <= 1) return null;
  return <nav className="pagination" aria-label="Pagination">
    <button type="button" disabled={!pagination.has_previous || loading} onClick={() => onPageChange(pagination.page - 1)}>← Previous</button>
    <span>Page {pagination.page} of {pagination.pages}</span>
    <button type="button" disabled={!pagination.has_next || loading} onClick={() => onPageChange(pagination.page + 1)}>Next →</button>
  </nav>;
}



