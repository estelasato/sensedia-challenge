import type { User } from "@/src/lib/userService";
import { formatDateTimePtBr } from "@/src/lib/formatDateTime";
import { daysOfWeek } from "@/src/utils/daysOfWeekOptions";
import { cn } from "@/src/components/lib/utils";
import { getUserInitials } from "@/src/lib/currentUser";
import { Avatar } from "@/src/components/avatar/Avatar";

function formatDaysOfWeek(values?: number[]): string {
  if (!values?.length) return "—";
  const map = new Map(daysOfWeek.map((d) => [d.value, d.short]));
  return [...values]
    .sort((a, b) => a - b)
    .map((v) => map.get(v) ?? String(v))
    .join(", ");
}

export function UserDetails({ user }: { user: User }) {
  const cities = user.cities?.filter(Boolean) ?? [];

  const userData = [
    { label: "Nome", value: user.name },
    { label: "E-mail", value: user.email },
    { label: "Dias da semana", value: formatDaysOfWeek(user?.days_of_week) },
    { label: "Cidades", value: cities.length > 0 ? cities.join(", ") : "—" },
    { label: "Data de cadastro", value: formatDateTimePtBr(user.created_at) },
    { label: "Última atualização", value: formatDateTimePtBr(user.updated_at) },
  ]
  return (
    <article
      className={cn(
        "w-full rounded-md border border-border bg-white p-6 shadow-sm",
      )}
    >
      <div className="mb-4 w-full flex justify-center">

        <Avatar
          src={user.image ?? null}
          alt={user.name}
          size="xl"
          className="bg-white ring-2 ring-border text-text-primary"
          initials={getUserInitials(user.name)}
        />
      </div>

      <dl>
        {userData.map((item) => (
          <div key={item.label} className="flex flex-col gap-0.5 border-b border-border py-3 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <dt className="text-xs font-medium  text-nowrap text-text-secondary">
              {item.label}
            </dt>
            <dd className="text-sm text-text-primary sm:text-right">{item.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
