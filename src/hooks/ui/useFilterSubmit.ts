"use client";

import type { FormEvent } from "react";
import type { GenericFilterProps } from "@/props/custom/forms/GenericFilterProps";

export const useFilterSubmit = (onApply: GenericFilterProps["onApply"]) =>
  (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); void onApply(); };
