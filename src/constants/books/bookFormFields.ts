import type { CreateBookInput } from "@/interfaces/books/CreateBookInput";
import type { FormFieldDefinition } from "@/interfaces/shared/FormFieldDefinition";
import { BookStatus, bookStatusColors, bookStatusLabels } from "@/enums/books/BookStatus";
import { enumOptions } from "@/lib/enumOptions";
import { authorOptions } from "@/lib/catalog/authorOptions";
import { publisherOptions } from "@/lib/catalog/publisherOptions";
import { categoryOptions } from "@/lib/catalog/categoryOptions";

// This list supplies both the input names and the DTO conversion rules.
export const bookFormFields = [
  { name: "title", label: "Title", required: true },
  { name: "description", label: "Description", inputType: "textarea", required: true },
  { name: "author", label: "Author", required: true, layout: "half", loadOptions: authorOptions },
  { name: "publisher", label: "Publisher", required: true, layout: "half", loadOptions: publisherOptions },
  { name: "categoryIds", label: "Categories (up to 5)", required: true, valueType: "numberList", loadOptions: categoryOptions, multiple: true },
  { name: "isbn", label: "ISBN", required: true },
  { name: "publishedAt", label: "Publication date", inputType: "date", required: true, layout: "half" },
  { name: "price", label: "Price in BHD", inputType: "number", valueType: "number", min: "0.001", step: "0.001", required: true, layout: "half" },
  { name: "copiesTotal", label: "Copies in library", inputType: "number", valueType: "number", min: "1", defaultValue: "1", required: true, layout: "half" },
  { name: "condition", label: "Condition", required: true, defaultValue: BookStatus.Good, options: enumOptions(BookStatus, bookStatusLabels), optionColors: bookStatusColors, layout: "half" },
  { name: "bookImage", label: "Cover image URL", inputType: "url", nullable: true },
] satisfies readonly FormFieldDefinition<CreateBookInput>[];
