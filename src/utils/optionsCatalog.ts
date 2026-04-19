import type { IOption } from "@/src/types/option";

export type DayOfWeek = {
  label: string;
  short: string;
  value: number;
};

export type DayOfWeekGroup = {
  label: string;
  value: number[];
};

export const CITIES_OPTIONS: IOption[] = [
  { label: "São Paulo", value: "sp" },
  { label: "Rio de Janeiro", value: "rj" },
  { label: "Belo Horizonte", value: "bh" },
];

export const DAYS_OF_WEEK: DayOfWeek[] = [
  { label: "Domingo", short: "Dom", value: 0 },
  { label: "Segunda-feira", short: "Seg", value: 1 },
  { label: "Terça-feira", short: "Ter", value: 2 },
  { label: "Quarta-feira", short: "Qua", value: 3 },
  { label: "Quinta-feira", short: "Qui", value: 4 },
  { label: "Sexta-feira", short: "Sex", value: 5 },
  { label: "Sábado", short: "Sáb", value: 6 },
];

export const DAYS_OF_WEEK_GROUPS: DayOfWeekGroup[] = [
  { label: "Dias úteis", value: [1, 2, 3, 4, 5] },
  { label: "Fim de semana", value: [6, 0] },
  { label: "Todos", value: [0, 1, 2, 3, 4, 5, 6] },
];

export function cityLabel(value: string): string {
  return (
    CITIES_OPTIONS.find((c) => String(c.value) === value)?.label ?? value
  );
}

