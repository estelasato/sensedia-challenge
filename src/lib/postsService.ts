import { API_URL } from "./api";

export interface Post {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export async function getPostByUserId(
  userId: string,
): Promise<{ posts: Post[] }> {
  const res = await fetch(`${API_URL}/users/${userId}/posts`, {
    next: { revalidate: 60, tags: ["posts", `posts-${userId}`] },
  });
  if (!res.ok) throw new Error("Erro ao buscar posts do usuário.");
  return res.json();
}
