import { useEffect, useState } from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

// pagefind will be added to the window object from SiteSearch.astro
declare global {
  interface Window {
    pagefind: any;
  }
}

type PagefindResult = {
  id: string;
  data: () => {};
  excerpt_range: number[];
  score: number;
  words: number[];
};

type PagefindData = {
  id: string;
  url: string;
  content: string;
  word_count: number;
  filters: object;
  meta: {
    title: string;
  };
  raw_content: string;
  excerpt: string;
  raw_url: string;
};

export function SiteSearchDialog() {
  const maxSearchResults = 5;
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<PagefindData[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  async function runSearch(searchVal: string) {
    setSearch(searchVal);
    try {
      const pagefindResults = await window.pagefind.search(searchVal);
      if (pagefindResults.results) {
        const dataArray: PagefindData[] = await Promise.all(
          pagefindResults.results
            .slice(0, maxSearchResults)
            .map(async (result: PagefindResult) => {
              const data = await result.data();
              return { id: result.id, ...data };
            }),
        );
        setResults(dataArray);
      } else {
        setErrorMsg("Search results could not be loaded");
      }
    } catch (error) {
      setErrorMsg("An error occurred while fetching search results");
    }
  }

  function navigateToResult(value: PagefindData) {
    const location = new URL(value.url, window.location.toString());
    window.location.href = location.href;
  }

  // Global keyboard event handler is setup in SieSearch.astro
  // You can also trigger search from any component with:
  // const event = new Event("openSearch");
  // document.dispatchEvent(event);
  useEffect(() => {
    document.addEventListener("openSearch", () => setOpen((open) => !open));
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Search anything..."
          value={search}
          onValueChange={runSearch}
        />

        <CommandList>
          {!errorMsg && <CommandEmpty>No results found.</CommandEmpty>}
          {errorMsg && <CommandEmpty>{errorMsg}</CommandEmpty>}

          <CommandSeparator />
          {results.length > 0 &&
            results.map((result) => {
              return (
                <CommandItem
                  key={result.id}
                  onSelect={() => navigateToResult(result)}
                >
                  <div className="pb-2 font-semibold">{result.meta.title}</div>
                  <div dangerouslySetInnerHTML={{ __html: result.excerpt }} />
                </CommandItem>
              );
            })}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
