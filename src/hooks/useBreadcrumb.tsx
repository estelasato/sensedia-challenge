import { useContext } from "react";
import { BreadcrumbContext } from "../contexts/BreadcrumbContext";

export function useBreadcrumb() {
  const ctx = useContext(BreadcrumbContext);

  if (!ctx) {
    throw new Error("useBreadcrumb deve ser usado dentro de BreadcrumbProvider");
  }

  return ctx;
}