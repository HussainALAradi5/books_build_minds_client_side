export interface BaseEntity {
  createdBy: number | null;
  createdAt: string;
  updatedBy: number | null;
  updatedAt: string | null;
  isArchived: boolean;
  isDeleted: boolean;
}
