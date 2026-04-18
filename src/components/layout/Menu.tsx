import Link from "next/link";
import { cn } from "../lib/utils";
import { UserAccountMenu } from "./UserAccountMenu";

export function Menu() {
  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur",
        "md:static md:bg-white md:shadow-none md:backdrop-blur-none",
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-6">
          <Link
            href="/"
            className="shrink-0 text-sm font-bold tracking-tight text-gray-900 transition-colors hover:text-blue-600"
          >
            Sensedia Challenge
          </Link>

        </div>

        <div className="shrink-0">
          <UserAccountMenu />
        </div>
      </div>
    </header>
  )
}