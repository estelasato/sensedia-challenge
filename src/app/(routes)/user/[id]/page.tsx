import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getUserById } from "@/src/lib/userService";

import { UserDetails } from "./components/UserDetails";
import { BasicHeader } from "@/src/components/header/BasicHeader";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Detalhes do Usuário",
};

export default async function UserDetailPage({ params }: PageProps) {
  const { id } = await params;
  const data = await getUserById(id);

  if (!data?.user) {
    notFound();
  }

  const { user } = data;

  return (
    <div className="mx-auto mt-10 max-w-md">
      <BasicHeader title="Dados do Usuário" backHref="/users" />
      <UserDetails user={user} />
    </div>
  );
}
