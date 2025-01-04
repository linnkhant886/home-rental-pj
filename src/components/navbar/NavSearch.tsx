"use client";
import { Input } from "../ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";

export default function NavSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleSearch = useDebouncedCallback((value: string) => {
    const param = new URLSearchParams(searchParams);

    if (value) {
      param.set("search", value);
    } else {
      param.delete("search");
    }

    replace(`${pathname}?${param.toString()}`);
  }, 500);

  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearch("");
    }
  }, [searchParams]);
  // console.log(searchParams.get("search"));
  
  return (
    <Input
      className="max-w-xs dark:bg-muted"
      type="search"
      placeholder="Find a property....."
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
      value={search}
    />
  );
}
