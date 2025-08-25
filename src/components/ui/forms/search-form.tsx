"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, JSX, useState } from "react";

type SearchFormProps = {
  actionHref?: string;
};

export default function SearchForm({
  actionHref = "/search",
}: SearchFormProps): JSX.Element {
  const router = useRouter();
  const [q, setQ] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const query: string = q.trim();
    if (!query) return;
    router.push(`${actionHref}?q=${encodeURIComponent(query)}`);
  }

  return (
    <form
      role="search"
      aria-label="Site search"
      onSubmit={onSubmit}
      action={actionHref}
      className="bg-search-surface flex items-center gap-3 rounded-full py-3 px-4 w-[521px]
                 focus-within:outline focus-within:outline-search-placeholder"
    >
      <label htmlFor="site-search" className="sr-only">
        Search products
      </label>

      <Search
        className="flex-shrink-0 text-search-placeholder"
        aria-hidden="true"
      />

      <input
        id="site-search"
        name="q"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search all products..."
        autoComplete="search"
        inputMode="search"
        className="flex-1 bg-transparent outline-none placeholder:text-search-placeholder text-foreground/70"
        aria-describedby="search-help"
      />

      <button
        type="submit"
        className="flex h-10 min-w-10 items-center justify-center rounded-full px-4
                   bg-foreground text-background text-sm font-medium
                   disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Search"
        disabled={!q.trim()}
      >
        <span className="sr-only">Search</span>
      </button>

      <span id="search-help" className="sr-only">
        Press Enter or activate the Search button to submit your query.
      </span>
    </form>
  );
}
