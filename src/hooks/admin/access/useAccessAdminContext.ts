import { useContext } from "react";
import { AccessAdminContext } from "@/providers/access/AccessAdminContext";

export const useAccessAdminContext = () => {
  const value = useContext(AccessAdminContext);
  if (!value) throw new Error("Access admin provider is missing");
  return value;
};
