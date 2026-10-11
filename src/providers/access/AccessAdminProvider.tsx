"use client";

import { AccessAdminContext } from "./AccessAdminContext";
import { useAccessAdmin } from "@/hooks/admin/access/useAccessAdmin";
import type { AccessAdminProviderProps } from "@/props/admin/access/AccessAdminProviderProps";

const AccessAdminProvider = ({ children }: AccessAdminProviderProps) =>
  <AccessAdminContext.Provider value={useAccessAdmin()}>{children}</AccessAdminContext.Provider>;

export default AccessAdminProvider;
