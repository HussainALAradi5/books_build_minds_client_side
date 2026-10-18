export interface FormFieldDefinition<T> {
  name: Extract<keyof T, string>;
  label: string;
  inputType?: "text" | "date" | "number" | "url" | "textarea";
  valueType?: "text" | "number";
  required?: boolean;
  nullable?: boolean;
  min?: string;
  step?: string;
  defaultValue?: string;
  options?: readonly { value: string; label: string }[];
}
