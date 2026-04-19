"use client";

import { createContext, useState } from "react";

type BreadcrumbContextValue = {
  mapSegments: Record<string, { label: string; href: string }>;
  setMapSegments: (id: Record<string, { label: string; href: string }>) => void;
};

export const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null);

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [mapSegments, setMapSegments] = useState<Record<string, { label: string; href: string }>>({});

  return (
    <BreadcrumbContext.Provider value={{ mapSegments, setMapSegments }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}