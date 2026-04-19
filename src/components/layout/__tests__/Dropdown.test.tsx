import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserAccountMenu } from "../UserAccountMenu";

vi.mock("@/src/hooks/useAuth", () => ({
  useAuth: () => ({
    user: {
      id: "123",
      name: "teste",
      email: "teste@email.com",
      image: null,
    },
    isLoading: false,
  }),
}));


function renderMenu() {
  return render(
    <div>
      <UserAccountMenu />
      <button type="button">outside</button>
    </div>,
  );
}

const user = userEvent.setup({ pointerEventsCheck: 0 });
async function openMenu() {
  const trigger = screen.getByRole("button", { name: /teste/i });
  await user.click(trigger);

  expect(await screen.findByRole("menu")).toBeInTheDocument();
  return trigger;
}

describe("fechar dropdown do user no menu", () => {
  it("ao pressionar ESC", async () => {
    renderMenu();
    await openMenu();

    await user.keyboard("{Escape}");

    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
  });

  it("ao clicar fora", async () => {
    renderMenu();
    await openMenu();

    await user.click(
      screen.getByRole("button", { name: "outside", hidden: true }),
    );

    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
  });

  it("ao clicar no botão de novo", async () => {
    renderMenu();
    const trigger = await openMenu();

    await user.click(trigger);

    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
  });
});
