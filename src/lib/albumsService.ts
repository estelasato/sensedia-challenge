import { API_URL } from "./api";

export interface Album {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export async function getAlbums(): Promise<{ albums: Album[] }> {
  const res = await fetch(`${API_URL}/albums`);
  if (!res.ok) throw new Error("Erro ao buscar albums");
  const data = await res.json();
  return data as { albums: Album[] };
}

export async function getAlbumByUserId(userId: string): Promise<{ albums: Album[] }> {
  const res = await fetch(`${API_URL}/users/${userId}/albums`);
  if (!res.ok) throw new Error("Erro ao buscar album");
  const data = await res.json();
  return data as { albums: Album[] };
}