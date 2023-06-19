import { useState, useEffect } from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
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
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<PagefindData[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  async function runSearch(searchVal) {
    // setSearch(searcVal);
    console.log(searchVal);

    try {
      const pagefindResults = await window.pagefind.search(searchVal);
      if (pagefindResults.results) {
        const dataArray: PagefindData[] = await Promise.all(
          pagefindResults.results
            .slice(0, 5)
            .map(async (result: PagefindResult) => {
              const data = await result.data();
              return { id: result.id, ...data };
            })
        );
        setResults(dataArray);
        console.log(results);
      } else {
        setErrorMsg("Search results could not be loaded");
      }
    } catch (error) {
      setErrorMsg("An error occurred while fetching search results");
    }
  }

  useEffect(() => {
    document.addEventListener("openSearch", () => setOpen((open) => !open));
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Search anything..."
          onValueChange={runSearch}
        />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandItem>{results.length}</CommandItem>

          <CommandSeparator />
          <CommandGroup heading="Results">
            {results.length > 0 &&
              results.map((result) => {
                return (
                  <CommandItem key={result.id}>
                    <div>{result.meta.title}</div>
                    <div dangerouslySetInnerHTML={{ __html: result.excerpt }} />
                  </CommandItem>
                );
              })}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
