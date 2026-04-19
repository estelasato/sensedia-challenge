import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AppBreadcrumb } from "../AppBreadcrumb";

const pathname = vi.fn(() => "/users");
const mapSegments = vi.fn(() => ({} as Record<string, { label: string; href: string }>));

vi.mock("next/navigation", () => ({
  usePathname: () => pathname(),
}));

vi.mock("@/src/hooks/useBreadcrumb", () => ({
  useBreadcrumb: () => ({ mapSegments: mapSegments() }),
}));

describe("AppBreadcrumb", () => {
  it.each([
    ["/users", {}, ["Início", "Usuários"]],
    ["/users/new", {}, ["Início", "Usuários", "Cadastro"]],
    ["/user/123", {123: { label: "User teste", href: "user/teste" }}, ["Início", "Usuários", "User teste"]],
  ] as const)(
    "rota %s mostra os rótulos esperados",
    (path, segments, labels) => {
      pathname.mockReturnValue(path);
      mapSegments.mockReturnValue(segments);

      render(<AppBreadcrumb />);

      for (const label of labels) {
        expect(screen.getByText(label)).toBeInTheDocument();
      }
    },
  );
});
