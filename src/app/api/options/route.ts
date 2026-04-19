import { NextResponse } from "next/server";

import {
  CITIES_OPTIONS,
  DAYS_OF_WEEK,
  DAYS_OF_WEEK_GROUPS,
  type DayOfWeek,
  type DayOfWeekGroup,
} from "@/src/utils/optionsCatalog";

export type IDayOfWeek = DayOfWeek;
export type IGroupOption = DayOfWeekGroup;

export const daysOfWeek: IDayOfWeek[] = DAYS_OF_WEEK;
export const daysOfWeekGroup: IGroupOption[] = DAYS_OF_WEEK_GROUPS;

export async function GET() {
  return NextResponse.json({
    cities: CITIES_OPTIONS,
    daysOfWeek: DAYS_OF_WEEK,
    daysOfWeekGroup: DAYS_OF_WEEK_GROUPS,
  })
}

