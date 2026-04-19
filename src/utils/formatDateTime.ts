import { formatInTimeZone } from "date-fns-tz";

const BRAZIL_TZ = "America/Sao_Paulo";

export function formatDateTimePtBr(isoOrDate: string | Date): string {
  return formatInTimeZone(isoOrDate, BRAZIL_TZ, "dd/MM/yyyy HH:mm");
}
