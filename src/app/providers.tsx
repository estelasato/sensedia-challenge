"use client";

import { AuthProvider } from "@/src/contexts/AuthContext";
import { BreadcrumbProvider } from "@/src/contexts/BreadcrumbContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <BreadcrumbProvider>{children}</BreadcrumbProvider>
    </AuthProvider>
  );
}
