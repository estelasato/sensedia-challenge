import { API_URL } from "./api";

export interface Post {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export async function getPosts(): Promise<{ posts: Post[] }> {
  const res = await fetch(`${API_URL}/posts`);
  if (!res.ok) throw new Error("Erro ao buscar posts");
  const data = await res.json();
  return data as { posts: Post[] };
}

export async function getPostByUserId(userId: string): Promise<{ posts: Post[] }> {
  const res = await fetch(`${API_URL}/users/${userId}/posts`);
  if (!res.ok) throw new Error("Erro ao buscar post");
  const data = await res.json();
  return data as { posts: Post[] };
}