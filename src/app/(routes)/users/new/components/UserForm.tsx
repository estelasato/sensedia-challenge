"use client";

import { Controller, FormProvider } from "react-hook-form";

import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { DayOfWeekSelector } from "@/src/components/form/DayOfWeekSelector";

import { useUser } from "../hooks/useUser";

export function UserForm() {
  const { form, onSubmit, isSubmitting } = useUser();
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <div className="max-w-md border border-border rounded-md p-6 shadow-sm flex flex-col gap-4 mx-auto mt-4">
          <Input
            label="Nome*"
            {...register("name")}
            placeholder="Nome"
            classNameContainer="w-full"
            errorMessage={errors.name?.message as string}
          />
          <Input
            label="Email*"
            {...register("email")}
            placeholder="Email"
            classNameContainer="w-full"
            errorMessage={errors.email?.message as string}
          />
          <Input
            label="Senha*"
            {...register("password")}
            placeholder="Senha"
            classNameContainer="w-full"
            errorMessage={errors.password?.message as string}
            isPassword
          />
          <Input
            label="Confirmar senha*"
            {...register("confirm_password")}
            placeholder="Confirmar senha"
            classNameContainer="w-full"
            errorMessage={errors.confirm_password?.message as string}
            isPassword
          />

          <Controller
            control={control}
            name="days_of_week"
            render={({ field, fieldState }) => (
              <DayOfWeekSelector
                label="Dias da semana"
                value={field.value ?? []}
                onChange={field.onChange}
                errorMessage={fieldState.error?.message}
                className="w-full"
              />
            )}
          />

          <Button
            type="submit"
            isLoading={isSubmitting}
            className="self-center w-24"
          >
            Salvar
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
