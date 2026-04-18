import type { Metadata } from "next";

import { getUsersWithCounts } from "@/src/lib/getUserWithCount";

import { UserSection } from "./components/UserSection";

export const metadata: Metadata = {
  title: "Usuários",
  description: "Lista de usuários",
};

type SearchParams = {
  sort?: string;
  order?: string;
  page?: string;
  limit?: string;
  search?: string;
};

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const sort = sp?.sort || "name";
  const order: "asc" | "desc" = sp?.order === "desc" ? "desc" : "asc";
  const page = Math.max(1, Number(sp?.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(sp?.limit) || 10));
  const search = sp?.search || "";

  const data = await getUsersWithCounts({
    sort,
    order,
    page,
    limit,
    search,
  });

  return <UserSection data={data} />;
}
