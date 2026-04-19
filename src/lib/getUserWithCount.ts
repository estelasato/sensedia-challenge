import { getUsers, type GetUserRequest, type IUser } from "./userService";
import { getPostByUserId } from "./postsService";
import { getAlbumByUserId } from "./albumsService";
import type { IPagination } from "@/src/types/pagination";
import { unstable_cache } from "next/cache";

export type UserWithCounts = IUser & {
  total_posts: number;
  total_albums: number;
};

export type UsersWithCountsResult = {
  users: UserWithCounts[];
  pagination: IPagination;
};

const keys = ["name", "created_at"] as const;

function isSortableUserKey(key: string | undefined) {
  return !!key && keys.includes(key as typeof keys[number]);
}

function compareUsers(a: IUser, b: IUser, key: typeof keys[number]): number {
  const va = a[key] ?? "";
  const vb = b[key] ?? "";

  if (key === "created_at") {
    return new Date(va).getTime() - new Date(vb).getTime();
  }

  return String(va).localeCompare(String(vb), "pt-BR", {
    sensitivity: "base",
  });
}

// sem cache
export async function _getUsersWithCounts(
  req?: GetUserRequest,
): Promise<UsersWithCountsResult> {
  console.log("teste cache")
  const page = Math.max(1, req?.page ?? 1);
  const limit = Math.min(100, Math.max(1, req?.limit ?? 10));
  const order: "asc" | "desc" = req?.order === "desc" ? "desc" : "asc";
  const sort = isSortableUserKey(req?.sort) ? req!.sort! : "name";
  const search = req?.search?.trim().toLowerCase() ?? "";
  
  const { users } = await getUsers();

  if (!users?.length) {
    return {
      users: [],
      pagination: { page: 1, limit, pageCount: 1, total: 0 },
    };
  }


  const filtered = search ? users.filter((u) => u.name.toLowerCase().includes(search)) : users;

  const direction = order === "desc" ? -1 : 1;
  const sorted = [...filtered].sort(
    (a, b) => compareUsers(a, b, sort as typeof keys[number]) * direction,
  );

  const total = sorted.length;
  const pageCount = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * limit;
  const pageItems = sorted.slice(start, start + limit);

  const enriched = await Promise.all(
    pageItems.map(async (u) => {
      const [posts, albums] = await Promise.all([
        getPostByUserId(u.id),
        getAlbumByUserId(u.id),
      ]);
      return {
        ...u,
        cities: u.cities ?? ['sp', 'rj'],
        days_of_week: u.days_of_week ?? [1,3,5],
        total_posts: posts?.posts?.length ?? 0,
        total_albums: albums?.albums?.length ?? 0,
      };
    }),
  );

  return {
    users: enriched,
    pagination: {
      page: safePage,
      limit,
      pageCount,
      total,
    },
  };
}

const cachedUsers = unstable_cache(
  _getUsersWithCounts,
  ["users-data"],
  {
    tags: ["users", "posts", "albums"],
    revalidate: 60,
  }
)

export async function getUsersWithCounts(req?: GetUserRequest): Promise<UsersWithCountsResult> {
  return cachedUsers(req);
}