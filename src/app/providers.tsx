"use client";

import { AuthProvider } from "@/src/app/hooks/useAuth";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
