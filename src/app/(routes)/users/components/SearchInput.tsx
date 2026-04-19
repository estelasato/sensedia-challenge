"use client";

import { useEffect, useRef, useState } from "react";

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
  const onSearchRef = useRef(onSearch);
  onSearchRef.current = onSearch;
  
  useEffect(() => {
    setSearch(defaultSearch);
  }, [defaultSearch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearchRef.current(search);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

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
