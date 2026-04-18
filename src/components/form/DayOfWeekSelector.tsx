"use client";

import { useMemo } from "react";

import { cn } from "@/src/components/lib/utils";
import {
  daysOfWeek,
  daysOfWeekGroup,
  type DayOfWeek,
  type DayOfWeekGroup,
} from "@/src/utils/daysOfWeekOptions";

export type DayOfWeekSelectorProps = {
  value?: number[];
  onChange?: (value: number[]) => void;
  label?: string;
  errorMessage?: string;
  className?: string;
  disabled?: boolean;
  options?: DayOfWeek[];
  groups?: DayOfWeekGroup[];
};

const sortNumeric = (arr: number[]) => [...arr].sort((a, b) => a - b);

export function DayOfWeekSelector({
  value = [],
  onChange,
  label,
  errorMessage,
  className,
  disabled = false,
  options = daysOfWeek,
  groups = daysOfWeekGroup,
}: DayOfWeekSelectorProps) {
  const selected = useMemo(() => new Set(value), [value]);

  const toggleDay = (day: number) => {
    const next = new Set(selected);
    if (next.has(day)) next.delete(day);
    else next.add(day);
    onChange?.(sortNumeric([...next]));
  };

  const isGroupActive = (groupValues: number[]) =>
    groupValues.length > 0 && groupValues.every((d) => selected.has(d));

  const toggleGroup = (groupValues: number[]) => {
    const allActive = isGroupActive(groupValues);
    const next = new Set(selected);
    if (allActive) groupValues.forEach((d) => next.delete(d));
    else groupValues.forEach((d) => next.add(d));
    onChange?.(sortNumeric([...next]));
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}

      {groups.length > 0 && (
        <div
          className="flex flex-wrap gap-1.5"
          role="group"
          aria-label="Atalhos de seleção"
        >
          {groups.map((group) => {
            const active = isGroupActive(group.value);
            return (
              <button
                key={group.label}
                type="button"
                disabled={disabled}
                onClick={() => toggleGroup(group.value)}
                aria-pressed={active}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  active
                    ? "border-primary/30 bg-white text-primary "
                    : "border-border bg-muted/40 text-text-secondary ",
                )}
              >
                {group.label}
              </button>
            );
          })}
        </div>
      )}

      <div
        role="group"
        aria-label={label ?? "Dias da semana"}
        className="grid grid-cols-4 md:grid-cols-7 gap-1.5"
      >
        {options.map((d) => {
          const active = selected.has(d.value);
          return (
            <button
              key={d.value}
              type="button"
              disabled={disabled}
              onClick={() => toggleDay(d.value)}
              aria-pressed={active}
              aria-label={d.label}
              title={d.label}
              className={cn(
                "h-9 flex-1 min-w-12 rounded-md border px-2 text-sm font-medium transition-all cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                "disabled:cursor-not-allowed disabled:opacity-50",
                active
                  ? "border-primary bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                  : "border-border bg-white text-foreground hover:border-input hover:bg-muted",
              )}
            >
              {d.short}
            </button>
          );
        })}
      </div>

      {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
}
