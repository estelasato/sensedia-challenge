"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { createUser, type CreateUserRequest } from "@/src/lib/userService";

const REQUIRED = "Campo obrigatório";

const schema = z
  .object({
    name: z.string().min(1, REQUIRED),
    email: z.string().email("Email inválido"),
    days_of_week: z.array(z.number()),
    cities: z.array(z.string()),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirm_password: z.string().min(1, REQUIRED),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "As senhas não conferem",
  });

type UserSchema = z.infer<typeof schema>;

export function useUser() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<UserSchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      days_of_week: [],
      cities: [],
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = form.handleSubmit((data) => {
    const { confirm_password: _confirm, ...payload } = data;

    startTransition(async () => {
      try {
        const data = await createUser(payload satisfies CreateUserRequest);
        console.log(data, "data");
        toast.success("Usuário criado com sucesso.");
        form.reset();
        router.refresh();
        router.push("/users");
      } catch (err) {
        toast.error("Erro inesperado ao criar usuário.");
      }
    });
  });

  return {
    form,
    onSubmit,
    isSubmitting: isPending,
  };
}
