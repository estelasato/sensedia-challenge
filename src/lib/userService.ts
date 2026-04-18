import { Pagination } from "../types/pagination";
import { API_URL } from "./api";


export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface GetUserRequest {
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  page?: number;
  limit?: number;
}

export async function getUsers(request?: GetUserRequest): Promise<{ users: User[], pagination: Pagination }> {
  const res = await fetch(`${API_URL}/users?${new URLSearchParams(request as Record<string, string>).toString()}`, {
    cache: "no-store",
    method: "GET",
  });

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
