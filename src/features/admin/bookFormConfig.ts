import type { CreateBookInput } from "@/interfaces/books/CreateBookInput";
import type { FormFieldDefinition } from "@/interfaces/shared/FormFieldDefinition";
import { BookStatus, bookStatusLabels } from "@/enums/books/BookStatus";
import { enumOptions } from "@/lib/enumOptions";

// This list supplies both the input names and the DTO conversion rules.
export const bookFormFields = [
  { name: "title", label: "Title", required: true },
  { name: "author", label: "Author", required: true },
  { name: "publisher", label: "Publisher", required: true },
  { name: "isbn", label: "ISBN", required: true },
  { name: "publishedAt", label: "Publication date", inputType: "date", required: true },
  { name: "price", label: "Price in BHD", inputType: "number", valueType: "number", min: "0.01", step: "0.01", required: true },
  { name: "copiesTotal", label: "Copies in library", inputType: "number", valueType: "number", min: "1", defaultValue: "1", required: true },
  { name: "condition", label: "Condition", required: true, options: enumOptions(BookStatus, bookStatusLabels) },
  { name: "bookImage", label: "Cover image URL", inputType: "url", nullable: true },
] satisfies readonly FormFieldDefinition<CreateBookInput>[];
