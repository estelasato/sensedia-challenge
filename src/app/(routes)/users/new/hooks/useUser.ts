"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import type { CreateUserRequest } from "@/src/lib/userService";
import { createUserAction } from "@/src/lib/userActions";
import { IOption } from "@/src/types/option";
import { IDayOfWeek } from "@/src/app/api/options/route";

type IGroupOption = {
  label: string;
  value: number[];
};

const schema = z
  .object({
    name: z.string().min(1, "Campo obrigatório"),
    email: z.string().email("Email inválido"),
    days_of_week: z.array(z.number()),
    cities: z.array(z.string()),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirm_password: z.string().min(1, "Campo obrigatório"),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "As senhas não conferem",
  });

type UserSchema = z.infer<typeof schema>;

export function useUser() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [cities, setCities] = useState<IOption[]>([]);
  const [daysOfWeek, setDaysOfWeek] = useState<IDayOfWeek[]>([]);
  const [daysOfWeekGroup, setDaysOfWeekGroup] = useState<IGroupOption[]>([]);

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

  const getOptions = async () => {
    try {
      const res = await fetch("/api/options");
      if (!res.ok) throw new Error("Falha ao carregar opções");
      const data = await res.json();

      setCities(data.cities);
      setDaysOfWeek(data.daysOfWeek);
      setDaysOfWeekGroup(data.daysOfWeekGroup);
      return data;
    } catch {
      toast.error("Erro ao buscar opções de cidade e dias da semana");

    }
  }

  const onSubmit = form.handleSubmit((data) => {
    const { confirm_password: _confirm, ...payload } = data;

    startTransition(async () => {
      try {
        await createUserAction(payload satisfies CreateUserRequest);
        toast.success("Usuário criado com sucesso.");
        form.reset();
        router.push("/users");
      } catch {
        toast.error("Erro inesperado ao criar usuário.");
      }
    });
  });

  useEffect(() => {
    getOptions().then((data) => {
      setCities(data.cities);
      setDaysOfWeek(data.daysOfWeek);
    });
  }, []);

  return {
    form,
    onSubmit,
    isSubmitting: isPending,
    cities,
    daysOfWeek,
    daysOfWeekGroup,
  };
}
