import { getUsers, type GetUserRequest, type User } from "./userService";
import { getPostByUserId } from "./postsService";
import { getAlbumByUserId } from "./albumsService";
import type { Pagination } from "@/src/types/pagination";

export type UserWithCounts = User & {
  totalPosts: number;
  totalAlbums: number;
};

export type UsersWithCountsResult = {
  users: UserWithCounts[];
  pagination: Pagination;
};

export async function getUsersWithCounts(
  req?: GetUserRequest,
): Promise<UsersWithCountsResult> {
  const { users, pagination } = await getUsers(req);

  if (!users) {
    return {
      users: [],
      pagination: {
        page: 1,
        limit: 10,
        pageCount: 1,
        total: 0,
      },
    };
  }

  const enriched = await Promise.all(
    users?.map(async (u) => {
      const [posts, albums] = await Promise.all([
        getPostByUserId(u.id),
        getAlbumByUserId(u.id),
      ]);
      return {
        ...u,
        totalPosts: posts?.posts?.length ?? 0,
        totalAlbums: albums?.albums?.length ?? 0,
      };
    }),
  );

  return {
    users: enriched,
    pagination,
  };
}
