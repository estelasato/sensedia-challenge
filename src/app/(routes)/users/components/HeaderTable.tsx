"use client";

import { SearchInput } from "./SearchInput";
import { useState } from "react";

export function HeaderTable() {
  return (
    <header className="flex items-center justify-between gap-4">
      <h1 className="font-bold tracking-tight text-text-primary">
        Usuários
      </h1>
      <SearchInput onSearch={() => { }} />
    </header>
  )
}
