"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useUrlNavigation(
  startTransition: (fn: () => void) => void,
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      mutate(params);

      const nextQs = params.toString();
      if (nextQs === searchParams.toString()) return;

      startTransition(() => {
        router.replace(nextQs ? `${pathname}?${nextQs}` : pathname, {
          scroll: false,
        });
      });
    },
    [pathname, router, searchParams, startTransition],
  );
}
