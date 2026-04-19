import type { IPagination } from "../types/pagination";
import { API_URL } from "./api";

export interface IUser {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  days_of_week?: number[];
  cities?: string[];
  image?: string | null;
}

export interface GetUserRequest {
  sort?: string;
  order?: "asc" | "desc";
  search?: string;
  page?: number;
  limit?: number;
}

export type GetUsersResponse = {
  users: IUser[];
  pagination: IPagination;
};


export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
  confirm_password?: string;
  days_of_week?: number[];
  cities?: string[];
}

export async function getUsers(): Promise<{ users: IUser[] }> {
  // const t0 = performance.now();
  const res = await fetch(`${API_URL}/users`, {
    method: "GET",
    next: { revalidate: 60, tags: ["users"] },
  });

/*   const ms = (performance.now() - t0).toFixed(1);
  console.log(`testeeee ${ms}ms`);
 */
  if (!res.ok) throw new Error("Erro ao buscar users");

  const data = await res.json();
  return data;
}

export async function deleteUser(id: string) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erro ao deletar usuário");

  return res.json();
}

export async function createUser(user: CreateUserRequest) {
  const res = await fetch(`${API_URL}/users/create`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Erro ao criar usuário");

  return res.json();
}

export async function getUserById(id: string): Promise<{ user: IUser } | null> {
  const res = await fetch(`${API_URL}/users/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) return null;

  return res.json();
}