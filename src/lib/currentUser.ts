import type { AuthUser } from "@/src/types/auth";

const mock: AuthUser = {
  id: "session-user-1",
  name: "user teste",
  email: "user.teste@example.com",
  image: null,
};

export async function getCurrentUser(): Promise<AuthUser> {
  return { ...mock };
}

export function getUserInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) {
    const w = parts[0];
    return w.length >= 2 ? w.slice(0, 2).toUpperCase() : w.toUpperCase();
  }
  const first = parts[0][0] ?? "";
  const last = parts[parts.length - 1][0] ?? "";
  return `${first}${last}`.toUpperCase();
}
