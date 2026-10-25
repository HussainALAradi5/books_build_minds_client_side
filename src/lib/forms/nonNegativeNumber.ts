import type { KeyboardEvent } from "react";

export const blockNegativeNumberKey = (event: KeyboardEvent<HTMLInputElement>) => {
  if (["-", "+", "e", "E"].includes(event.key)) event.preventDefault();
};

export const nonNegativeNumber = (value: string, decimalPlaces = 3): string => {
  if (/[+\-eE]/.test(value)) return "";
  const match = value.match(/^(\d*)(?:\.(\d*))?$/);
  if (!match) return "";
  if (match[2] === undefined) return match[1];
  if (decimalPlaces === 0) return match[1];
  return `${match[1]}.${match[2].slice(0, decimalPlaces)}`;
};
