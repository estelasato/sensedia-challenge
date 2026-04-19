"use client";

import Link from "next/link";
import { Fragment, useMemo } from "react";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import { useBreadcrumb } from "@/src/hooks/useBreadcrumb";

const labels: Record<string, { label: string; href?: string }> = {
  users: { label: "Usuários" },
  user: { label: "Usuários", href: "/users" },
  new: { label: "Cadastro" },
};

function humanize(segment: string): string {
  try {
    const s = decodeURIComponent(segment);
    if (!s) return segment;
    return s.charAt(0).toUpperCase() + s.slice(1);
  } catch {
    return segment;
  }
}

export function AppBreadcrumb() {
  const pathname = usePathname();
  const { mapSegments } = useBreadcrumb();

  const items = useMemo(() => {
    const path = pathname.replace(/\/$/, "") || "/";
    if (path === "/") return [];

    const segments = path.split("/").filter(Boolean);
    const out: { label: string; href: string }[] = [
      { label: "Início", href: "/" },
    ];

    segments.forEach((segment, index) => {
      const hrefPath = `/${segments.slice(0, index + 1).join("/")}`;

      const fromContext = mapSegments[segment];
      if (fromContext) {
        out.push({ label: fromContext.label, href: fromContext.href });
        return;
      }

      const stat = labels[segment];
      if (stat) {
        out.push({
          label: stat.label,
          href: stat.href ?? hrefPath,
        });
        return;
      }

      out.push({ label: humanize(segment), href: hrefPath });
    });

    return out;
  }, [pathname, mapSegments]);

  if (items.length <= 1) return null;

  return (
    <Breadcrumb className="mb-2">
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={`${item.href}-${index}`}>
              {index > 0 ? <BreadcrumbSeparator /> : null}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="max-w-48 truncate font-normal">
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
