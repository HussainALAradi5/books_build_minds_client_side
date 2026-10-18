import type { KeyboardEvent } from "react";

export const blockNegativeNumberKey = (event: KeyboardEvent<HTMLInputElement>) => {
  if (["-", "+", "e", "E"].includes(event.key)) event.preventDefault();
};

export const nonNegativeNumber = (value: string): string =>
  value.startsWith("-") || (value !== "" && Number(value) < 0) ? "" : value;
