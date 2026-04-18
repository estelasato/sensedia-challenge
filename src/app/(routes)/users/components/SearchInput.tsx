"use client";

import { Input } from "@/src/components/ui/input";
import { useEffect, useState } from "react";

export type SearchInputProps = {
  onSearch: (search?: string) => void;
}

export function SearchInput({ onSearch }: SearchInputProps) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(search);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);


  return (
    <div className="relative ">
      <Input
        type="text"
        placeholder="Pesquisar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}