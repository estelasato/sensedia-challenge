import { API_URL } from "./api";

export interface Album {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export async function getAlbums(): Promise<{ albums: Album[] }> {
  const res = await fetch(`${API_URL}/albums`, { cache: "no-store" });
  if (!res.ok) throw new Error("Erro ao buscar álbuns.");
  return res.json();
}

export async function getAlbumByUserId(
  userId: string,
): Promise<{ albums: Album[] }> {
  const res = await fetch(`${API_URL}/users/${userId}/albums`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Erro ao buscar álbuns do usuário.");
  return res.json();
}
