import type { Metadata } from "next";

import { UserForm } from "./components/UserForm";
import { NewUserHeader } from "./components/NewUserHeader";

export const metadata: Metadata = {
  title: "Novo usuário",
  description: "Cadastrar novo usuário",
};

export default function NewUserPage() {
  return (
    <div className="mx-auto mt-10 max-w-md">
      <NewUserHeader title="Novo usuário" backHref="/users" />
      <UserForm />
    </div>
  );
}
