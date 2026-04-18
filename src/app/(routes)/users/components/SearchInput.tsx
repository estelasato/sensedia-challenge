"use client";

import { useEffect, useState } from "react";

import { Input } from "@/src/components/ui/input";

export type SearchInputProps = {
  defaultSearch?: string;
  onSearch: (search: string) => void;
};

export function SearchInput({
  defaultSearch = "",
  onSearch,
}: SearchInputProps) {
  const [search, setSearch] = useState(defaultSearch);

  useEffect(() => {
    setSearch(defaultSearch);
  }, [defaultSearch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(search);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search, onSearch]);

  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Pesquisar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
}
