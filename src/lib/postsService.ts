import { API_URL } from "./api";

export interface Post {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export async function getPosts(): Promise<{ posts: Post[] }> {
  const res = await fetch(`${API_URL}/posts`, { cache: "no-store" });
  if (!res.ok) throw new Error("Erro ao buscar posts.");
  return res.json();
}

export async function getPostByUserId(
  userId: string,
): Promise<{ posts: Post[] }> {
  const res = await fetch(`${API_URL}/users/${userId}/posts`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Erro ao buscar posts do usuário.");
  return res.json();
}
