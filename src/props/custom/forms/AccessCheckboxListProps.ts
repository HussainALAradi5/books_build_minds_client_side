export interface AccessCheckboxListProps<T extends string | number> {
  label: string;
  items: { value: T; label: string }[];
  selected: T[];
  onToggle: (value: T) => void;
  disabled?: boolean;
}
