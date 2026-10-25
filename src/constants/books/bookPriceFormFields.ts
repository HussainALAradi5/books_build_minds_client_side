import type { UpdateBookPriceInput } from "@/interfaces/books/UpdateBookPriceInput";
import type { FormFieldDefinition } from "@/interfaces/shared/FormFieldDefinition";

export const bookPriceFormFields = [
  { name: "price", label: "New price in BHD", inputType: "number", valueType: "number", min: "0.001", step: "0.001", required: true },
] satisfies readonly FormFieldDefinition<UpdateBookPriceInput>[];
