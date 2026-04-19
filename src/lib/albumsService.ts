import { API_URL } from "./api";

export interface Album {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export async function getAlbumByUserId(
  userId: string,
): Promise<{ albums: Album[] }> {
  const res = await fetch(`${API_URL}/users/${userId}/albums`, {
    next: { revalidate: 60, tags: ["albums", `albums-${userId}`] },
  });
  if (!res.ok) throw new Error("Erro ao buscar álbuns do usuário.");
  return res.json();
}
